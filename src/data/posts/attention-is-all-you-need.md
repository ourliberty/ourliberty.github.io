---
title: You got me looking for'
excerpt: 'Attention Is All You Need(Vaswani et al., 2017)'
date: '2026-07-26'
category: study
subcategory: computer-science
youtube: js1CtxSY38I
---

A study log. I rebuild the architecture from the text, verify the numbers, and separate load-bearing choices from incidental ones. Context that postdates the paper (2017) is flagged as such so hindsight isn't smuggled into the original claims.

Almost everything downstream, BERT, GPT, T5, ViT, Whisper, AlphaFold's Evoformer, descends from this eight-page paper. The title is a joke that turned out to be a thesis: a state-of-the-art sequence transduction model can be built from attention alone, discarding recurrence (RNNs, read left-to-right) and convolution (CNNs, sliding local filters) entirely.

One authorship detail worth remembering, since it's unusually candid: all eight authors are equal contributors, order randomized. Uszkoreit proposed replacing RNNs with self-attention; Vaswani and Polosukhin built the first models; Shazeer contributed scaled dot-product attention, multi-head attention, and the parameter-free positional representation.

## 1. What is actually being removed

A recurrent model computes a hidden state $h_t = f(h_{t-1}, x_t)$. The dependency chain is inherently sequential: $h_t$ cannot be computed before $h_{t-1}$. So within one training example you cannot parallelize along time, and at long lengths memory caps how much you can batch across examples.

The Transformer's headline advantage is that its core computation is parallel across positions: every token is processed simultaneously, so GPUs sit idle far less. One distinction the paper (and most summaries) blurs and worth stating plainly: this parallelism is a training-time property. At inference, generation is still auto-regressive, the decoder emits one token at a time, feeding each back in. What the Transformer removes is the sequential bottleneck in training, not in decoding. The quality gains largely fall out of this: cheaper training buys bigger models.

Attention itself was not new, it was already the standard way to link two tokens regardless of distance. The novelty is the word alone: prior work bolted attention onto a recurrent backbone; here the backbone is deleted, leaving attention plus simple per-token processing.

Against the convolutional alternatives (Extended Neural GPU, ByteNet, ConvS2S), the argument is about path length: to relate two distant tokens, their required operations grow with distance (linearly for ConvS2S, logarithmically for ByteNet). Self-attention makes every pair a direct neighbor, constant cost, at the price of blending many positions together, a resolution loss that multi-head attention is meant to offset.

## 2. The architecture

### 2.1 Encoder–decoder skeleton

The encoder maps $(x_1, \dots, x_n)$ to continuous representations $z = (z_1, \dots, z_n)$; the decoder generates $(y_1, \dots, y_m)$ auto-regressively. Both halves are stacks of $N = 6$ identical layers.

Encoder layer: multi-head self-attention, then a position-wise feed-forward network. Decoder layer: the same two, plus a middle sub-layer attending over the encoder output.

Every sub-layer is wrapped as $\mathrm{LayerNorm}(x + \mathrm{Sublayer}(x))$, a residual shortcut for gradient flow, plus normalization for stable scale. For the residual sum to typecheck, every sub-layer and embedding must emit vectors of width $d_{\text{model}} = 512$. This uniform width is a quiet constraint: it's what lets blocks stack without gluing projections between them.

> Postdates the paper. The paper places LayerNorm after the residual add (post-LN). Xiong et al. (2020) showed that moving it inside the residual branch (pre-LN) stabilizes gradients and often removes the need for learning-rate warmup (§4). If a literal reimplementation won't train, post-LN is usually why.

### 2.2 Scaled dot-product attention, the atom

Everything else is scaffolding around this. Stack queries into $Q$, keys into $K$, values into $V$:

$$
\mathrm{Attention}(Q, K, V) = \mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V
$$

$QK^{\top}$ scores every query against every key; softmax turns each row into attention weights; multiplying by $V$ takes the corresponding weighted average of values.

Why $\sqrt{d_k}$. The paper contrasts additive attention (a small network scores compatibility) with dot-product attention (a bare matmul, which GPUs prefer). They are comparable in theory, but for large $d_k$ the dot products grow. The argument, stated precisely: assume the components of $q, k$ are independent with mean $0$ and variance $1$. Then

$$
q \cdot k = \sum_{i=1}^{d_k} q_i k_i, \qquad E[q \cdot k] = 0, \qquad \mathrm{Var}(q \cdot k) = \sum_i E[q_i^2]\,E[k_i^2] = d_k,
$$

so the logits have standard deviation $\sqrt{d_k}$, their spread grows with dimension. Large logits drive softmax toward a one-hot regime where its Jacobian, and hence the gradient, vanishes. Dividing by $\sqrt{d_k}$ renormalizes the spread to $O(1)$. A one-line fix from clean statistics.

### 2.3 Multi-head attention

Run $h$ attention functions in parallel, each on a low-dimensional projected slice of $Q, K, V$:

$$
\mathrm{MultiHead}(Q, K, V) = \mathrm{Concat}(\text{head}_1, \dots, \text{head}_h)\,W^{O}, \qquad \text{head}_i = \mathrm{Attention}(QW_i^{Q}, KW_i^{K}, VW_i^{V}).
$$

With $h = 8$ and $d_k = d_v = d_{\text{model}}/h = 64$, the accounting is the point: each head is $1/8$ as wide, so eight heads cost about as much as one full-width head. Eight viewpoints, essentially free. The appendix shows heads that appear to specialize (long-range verb dependencies, pronoun resolution), which I read as suggestive of the design intent rather than proof, attention weights are a contested form of explanation.

### 2.4 Three uses of attention, and the mask

The same machinery, wired three ways:

- Encoder–decoder attention: queries from the decoder, keys/values from the encoder output. The decoder "looks back" at the source.
- Encoder self-attention: all from the encoder; fully bidirectional, since seeing ahead in the input is fine.
- Decoder self-attention: each position may attend only to itself and earlier positions.

The last constraint is enforced by setting every future score to $-\infty$ before softmax, so those weights become exactly $0$. Combined with shifting the output one position, this guarantees position $i$'s prediction depends only on positions $< i$, with no structural surgery, just an additive mask. Its underappreciated payoff: because the mask blocks illegal information rather than serializing computation, the decoder can also be trained in parallel (all target positions at once, under teacher forcing). The sequentiality returns only at inference.

### 2.5 Position-wise feed-forward network

After attention mixes information *across* tokens, each token is transformed on its own by the same two-layer network:

$$
\mathrm{FFN}(x) = \max(0,\, xW_1 + b_1)\,W_2 + b_2,
$$

with inner width $d_{ff} = 2048$, outer $d_{\text{model}} = 512$ (equivalently two kernel-size-1 convolutions). Attention moves information sideways; the FFN does the per-token nonlinear computation. It is not filler around attention: **the FFN sub-layers hold more parameters than the attention sub-layers**, roughly $2 \cdot 512 \cdot 2048$ per layer against $\sim 4 \cdot 512^2$ for attention, i.e. a bit over half the non-embedding parameters (about 40% of the 65M total once tied embeddings are counted). Later interpretability work (Geva et al., 2021, postdates the paper) argues these blocks act like key–value memories.

### 2.6 Embeddings, weight tying, scaling

Three efficiency choices. The same matrix serves the input embedding, output embedding, and pre-softmax projection (three-way tying, after Press & Wolf, 2016), coupling a large parameter block. And the embedding weights are multiplied by $\sqrt{d_{\text{model}}}$, easy to miss, easy to break on reimplementation, to put embeddings on a scale comparable to the positional encodings they're added to.

### 2.7 Positional encoding

Without positional information, self-attention is **permutation-equivariant**: permute the inputs and the outputs permute identically. But *dog bites man* $\neq$ *man bites dog*, so order must be injected. The paper adds a fixed sinusoidal code to each embedding:

$$
PE_{(pos,\,2i)} = \sin\!\left(pos / 10000^{2i/d_{\text{model}}}\right), \qquad PE_{(pos,\,2i+1)} = \cos\!\left(pos / 10000^{2i/d_{\text{model}}}\right),
$$

with wavelengths from $2\pi$ to $10000 \cdot 2\pi$, fast dimensions separate neighbors, slow ones separate regions.

The paper *asserts without proof* that this lets the model attend by relative position, since $PE_{pos+k}$ is a linear function of $PE_{pos}$ for fixed $k$. The proof is one application of angle-addition. For a single frequency $\omega = 10000^{-2i/d_{\text{model}}}$,

$$
\begin{bmatrix} \sin(\omega(pos+k)) \\ \cos(\omega(pos+k)) \end{bmatrix}
=
\begin{bmatrix} \cos(\omega k) & \sin(\omega k) \\ -\sin(\omega k) & \cos(\omega k) \end{bmatrix}
\begin{bmatrix} \sin(\omega\,pos) \\ \cos(\omega\,pos) \end{bmatrix}.
$$

The matrix depends only on the offset $k$, not on $pos$: "shift by $k$" is a fixed rotation the linear layers can exploit. The same rotation-by-offset structure is what RoPE (Su et al., 2021, postdates the paper) later makes *explicit and central*, rotating $Q$/$K$ so their dot product depends only on relative offset; the sinusoidal design prefigures it rather than being its direct ancestor.

Ablation (Table 3, row E): learned positional embeddings score essentially the same (25.7 vs 25.8 BLEU). The paper keeps sinusoids on the speculative, *not measured*, hope of extrapolating to longer sequences.

## 3. "Why self-attention": the complexity argument

§4 compares layer types on compute per layer, sequential steps (parallelizability), and maximum path length between two positions. Path length matters most: short paths make long-range dependencies easier to learn. With $n$ = length, $d$ = width, $k$ = kernel, $r$ = attention window:

| Layer type | Compute / layer | Sequential steps | Max path length |
|---|---|---|---|
| Self-attention | $O(n^2 \cdot d)$ | $O(1)$ | $O(1)$ |
| Recurrent | $O(n \cdot d^2)$ | $O(n)$ | $O(n)$ |
| Convolutional | $O(k \cdot n \cdot d^2)$ | $O(1)$ | $O(\log_k n)$ |
| Self-attention (restricted) | $O(r \cdot n \cdot d)$ | $O(1)$ | $O(n/r)$ |

Two things to get exactly right:

**The $n$ vs $d$ asterisk.** Self-attention is $O(n^2 d)$, recurrence $O(n d^2)$, so self-attention is cheaper per layer *only when $n < d$*, true for translation sentences, which is why it works here. When $n \gg d$ (long documents, high-res images, audio), the $n^2$ term dominates. This is the caveat most summaries drop, and the entire later subfield of efficient/sparse/linear attention exists to attack exactly this cost. Read Table 1 as a problem statement as much as a result.

The path-length payoff. Self-attention connects any two positions in $O(1)$; recurrence needs $O(n)$ hops. This is the hardware-independent reason self-attention captures long-range structure well. Restricted self-attention (window $r$) is floated as future work to tame long $n$ at the cost of $O(n/r)$ paths, a preview of later local-attention methods.

## 4. Training regime (the reproducible core)

Data. WMT'14 EN–DE: ~4.5M pairs, shared BPE vocabulary ~37k. EN–FR: ~36M sentences, 32k word-pieces. Batches grouped by length, ~25k source / ~25k target tokens.

Hardware. One machine, 8 P100s. Base: 100k steps, ~12h. Big: 300k steps, ~3.5 days.

Optimizer. Adam ($\beta_1 = 0.9$, $\beta_2 = 0.98$, $\epsilon = 10^{-9}$) with

$$
lrate = d_{\text{model}}^{-0.5} \cdot \min\!\left(step^{-0.5},\; step \cdot warmup^{-1.5}\right), \qquad warmup = 4000.
$$

Linear ramp for 4000 steps (the two branches cross exactly at the peak), then $\sim 1/\sqrt{step}$ decay. This warmup is effectively mandatory for post-LN to train, architecture choice and optimizer choice are quietly coupled.

Regularization. Residual + embedding dropout ($P_{\text{drop}} = 0.1$); label smoothing $\epsilon_{ls} = 0.1$. The paper is precise about the trade-off: label smoothing hurts perplexity (the model is deliberately less confident) but helps accuracy and BLEU, a reminder that these metrics can move in opposite directions.

## 5. Results

Translation. Big Transformer: 28.4 BLEU EN–DE, beating the prior best (including ensembles) by more than 2.0. Even the base model beats everything published before it, at a fraction of the cost. On EN–FR it sets a single-model record, reported as 41.8 in the abstract and Table 2. There is a genuine internal inconsistency worth flagging: in the widely-cited version, the §6.1 body text reads 41.0. The 41.8 figure is the one that matches the table and propagated into the literature; the discrepancy is the kind you only catch reading prose against tables line by line.

The efficiency, not the couple of BLEU points, is the real story: Table 2's FLOP estimates put training cost one to two orders of magnitude below the strongest prior systems. That is what made the field switch.

Ablations (Table 3, EN–DE dev, base = 25.8 BLEU / 65M params). Single-head attention is ~0.9 BLEU worse than the best, but too many heads (32) also hurts, a sweet spot, not "more is better." Shrinking $d_k$ hurts, which the authors read as evidence that scoring compatibility is genuinely hard and a bare dot product may be a limitation. Bigger models and dropout help, as expected. Big config: $d_{\text{model}} = 1024$, $d_{ff} = 4096$, $h = 16$, $P_{\text{drop}} = 0.3$, 213M params.

Generalization, constituency parsing (Table 4). A 4-layer Transformer on the ~40k-sentence WSJ treebank reached 91.3 F1, and 92.7 F1 semi-supervised, with almost no task-specific tuning, beating every prior model except Dyer et al.'s RNN Grammar (stated honestly). The stronger evidence of generality isn't the top score but the small-data result: in the 40k regime it beat the BerkeleyParser, refuting the belief that attention models need large corpora to compete.

## 6. What holds up, what deserves an asterisk

Aged well. The central bet, attention alone, no recurrence, no convolution, was right and generalized far past translation. Optimizing for parallelism over marginal accuracy is exactly why it scaled. Multi-head attention, scaled dot-product, residual + LayerNorm blocks, and weight tying are all still standard.

Asterisks. The $O(n^2 d)$ cost is a virtue only for $n < d$; the quadratic-in-$n$ blowup is the vanilla architecture's central limitation and the reason a decade of efficient-attention work exists. Post-LN plus mandatory warmup make the original recipe more fragile than necessary (pre-LN came later). The interpretability claims from attention maps are suggestive, not conclusive. The 41.0/41.8 mismatch is small but real.

Easy to miss. The $\sqrt{d_{\text{model}}}$ embedding scaling and three-way weight tying are load-bearing, not decoration. The FFN holds most of the model's non-embedding parameters and does the per-token computation. The parallelism advantage is a training-time property, not an inference one. And the relative-position-as-rotation identity, provable in two lines, is the structure RoPE later builds on directly.

The paper's most important contribution is a removal: delete recurrence and convolution, keep attention, and design the block so everything computes in parallel across positions. Nearly every specific choice, the $\sqrt{d_k}$ scaling, cheap parallel heads, sinusoidal positions, the warmup schedule, exists to make that removal trainable. Its few rough edges are exactly the seams a decade of follow-up work has been unpicking.
