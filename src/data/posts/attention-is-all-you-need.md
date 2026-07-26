---
title: '"Attention Is All You Need" (Vaswani et al., 2017)'
excerpt: 'Rebuilding the Transformer from the paper''s own text: scaled dot-product attention, multi-head attention, sinusoidal positions, and an honest read of what holds up and what deserves an asterisk.'
date: '2026-07-26'
category: study
subcategory: computer-science
keywords: ['transformer', 'attention', 'deep learning', 'paper review']
---

> TL;DR for the impatient. In 2017 the standard way to process a sentence was to read it word by word, in order (RNNs). This paper throws that out and says: let every word look at every other word *at the same time* through a mechanism called attention. That one change makes training massively parallel (so much faster on GPUs), makes long-range word relationships easier to learn, and, almost as a side effect, beats the state of the art in machine translation. Every model you've heard of since (BERT, GPT, ViT, and so on) is built on this idea.

## Why I keep coming back to this paper

Almost every model I touch in my research lineage, BERT, GPT, T5, ViT, Whisper, AlphaFold's Evoformer, is a descendant of this eight-page NIPS 2017 paper. The title is a joke that turned out to be a thesis: you can build a state-of-the-art sequence transduction model out of attention alone, throwing away recurrence and convolution entirely.

("Sequence transduction" just means turning one sequence into another, e.g. an English sentence into a German one. "Recurrence" means RNNs, which read left-to-right. "Convolution" means CNNs, which slide small filters over the sequence. The paper's claim is that you need neither.)

This log is my attempt to reconstruct the architecture from first principles, verify every number against the text, and be honest about which design choices are load-bearing versus incidental. Where I add context that postdates the paper, I flag it explicitly so as not to smuggle hindsight into the original claims.

A note on authorship worth remembering: all eight authors are marked as equal contributors, with listing order randomized. The footnote breaks down who did what: Uszkoreit proposed replacing RNNs with self-attention; Vaswani and Polosukhin built the first models; Shazeer proposed scaled dot-product attention, multi-head attention, and the parameter-free position representation. It's an unusually candid contribution statement.

## 1. The problem: reading in order is a bottleneck

In plain terms: the old models had to finish processing word #1 before they could start word #2, before word #3, and so on. That's slow, and computers with thousands of parallel cores (GPUs) sit mostly idle waiting.

More precisely: recurrent models compute a hidden state $h_t$, a running summary of everything seen so far, as a function of the previous summary $h_{t-1}$ and the current word. That dependency chain is *inherently sequential*: you cannot compute $h_t$ until $h_{t-1}$ is done. So within a single training example you can't parallelize along the time axis, and at long sequence lengths, memory limits also cap how much you can batch across examples.

The authors acknowledge that clever tricks had chipped away at this, but the fundamental constraint remains. Why does this framing matter? Because the Transformer's headline advantage is that its core computation is parallel across positions: all words processed at once. That lets it use GPUs far more fully. The quality improvements almost fall out for free: because training is faster, you can afford to train bigger models.

Attention itself was not new. It had already become a standard add-on that let a model connect two words regardless of how far apart they sit in the sentence. The novelty here is the word *entirely*. Before this paper, attention was bolted onto a recurrent network in almost every case. The Transformer removes the recurrent backbone completely and keeps only attention plus some simple per-word processing.

### The convolutional alternative it dethrones

Section 2 positions the work against three earlier convolution-based attempts (Extended Neural GPU, ByteNet, ConvS2S). Their shared weakness: to relate two words that are far apart, the number of operations *grows with the distance* between them, linearly for ConvS2S, logarithmically for ByteNet. The farther apart two words are, the harder it is to link them.

In plain terms: in those models, connecting the first and last word of a long sentence is expensive. Self-attention makes it a *constant* cost: every word is directly connected to every other word, no matter the distance. The price is a subtle loss of resolution (you're blending many positions together), which the paper fixes with multi-head attention, more on that below.

## 2. The architecture, rebuilt from the description

### 2.1 Encoder–decoder skeleton

The big picture first. The model has two halves. The encoder reads the whole input sentence and produces a rich numerical representation of it. The decoder then writes the output sentence one word at a time, consulting the encoder's representation as it goes. This encoder–decoder split is standard for translation; the Transformer keeps it and swaps out the internals.

Formally: the encoder maps an input sequence $(x_1, \dots, x_n)$ to continuous representations $z = (z_1, \dots, z_n)$; the decoder generates output symbols $(y_1, \dots, y_m)$ one at a time, auto-regressively: each word it produces is fed back in as input when producing the next word.

Both halves are stacks of $N = 6$ identical layers.

Encoder layer, two sub-layers:
1. Multi-head self-attention (words look at each other).
2. A position-wise feed-forward network (each word is processed on its own).

Decoder layer, three sub-layers: the two above, plus a middle one that does attention over the *encoder's* output (so the decoder can look back at the input sentence).

Every sub-layer is wrapped the same way, a residual connection followed by layer normalization:

$$\text{LayerNorm}\big(x + \text{Sublayer}(x)\big)$$

(A residual connection means "add the input back to the output", $x + \text{Sublayer}(x)$, which gives gradients a shortcut path and makes deep stacks trainable. Layer normalization rescales each vector to keep the numbers in a stable range. Both are standard stabilizers borrowed from earlier work.)

For the residual addition to even make sense, every sub-layer and every embedding must output vectors of the same width, $d_{\text{model}} = 512$. This uniform width is a quiet but important constraint: it's what lets you stack blocks on top of each other without gluing projection layers in between.

> A careful reader's footnote. The paper puts LayerNorm *after* the residual addition ("post-LN"). Later work (Xiong et al., 2020, among others) showed that moving it *inside* the residual branch ("pre-LN") gives more stable gradients and often removes the need for the learning-rate warmup discussed in Section 4. This isn't a knock on the original, it's a subtlety that wasn't understood in 2017. But if you ever reimplement the paper literally and it won't train, post-LN is usually why.

### 2.2 Scaled dot-product attention, the atom

This is *the* piece to understand cold. Everything else is scaffolding around it.

The intuition (a library analogy). Imagine each word issues a query: "I'm a verb, where's my subject?" Every other word advertises a key: a little label saying what it is. You compare your query against all the keys to see which match best. Then you pull in the values (the actual content) of the words that matched, weighted by how well they matched. That's attention: *query* asks, *keys* are searched, *values* are retrieved.

Now the mechanics. Queries and keys are vectors of dimension $d_k$; values have dimension $d_v$. Stack all the queries into a matrix $Q$, all keys into $K$, all values into $V$. The entire operation is one formula:

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V$$

Let me walk through it slowly so it's not just symbols:

- $QK^{\top}$: multiply every query by every key. Entry $(i, j)$ is a single number, how similar query $i$ is to key $j$ (their dot product). Big number means good match.
- Divide by $\sqrt{d_k}$: a rescaling step, explained in a moment.
- softmax: turn each row of similarity scores into percentages that add up to 100%. (Softmax is just the function that converts a list of raw scores into a probability distribution, bigger scores get exponentially bigger shares.) These percentages are the attention weights: how much each word should pay attention to each other word.
- Multiply by $V$: for each word, take the weighted average of all the value vectors, using those percentages. Words you attended to strongly contribute more.

Why divide by $\sqrt{d_k}$? This is the single most quoted line in the paper, and it's worth understanding rather than memorizing. The paper compares two attention styles: *additive* (a tiny neural net computes the match score) and *dot-product* (just multiply, as above). They're about equally powerful in theory, but dot-product is much faster in practice because it's a plain matrix multiply, which GPUs love.

The problem: for large $d_k$, unscaled dot products get *too big*. Here's the argument (footnote 4). Suppose each component of $q$ and $k$ is random with mean 0 and variance 1. Then their dot product

$$q \cdot k = \sum_{i=1}^{d_k} q_i k_i$$

is a sum of $d_k$ such terms, so it has variance $d_k$ and standard deviation $\sqrt{d_k}$. In words: *the more dimensions you add up, the wider the spread of possible scores.* When the scores get very large, softmax becomes nearly "all-or-nothing" and its gradient shrinks to almost zero, so the model stops learning. Dividing by $\sqrt{d_k}$ shrinks the spread back to about 1, keeping softmax in a healthy range. A one-line fix from a clean piece of statistics.

The optional mask in Figure 2 (left) is how the decoder is stopped from peeking at future words; I'll return to it in Section 2.4.

### 2.3 Multi-head attention, several viewpoints at once

In plain terms: instead of doing attention once, do it 8 times in parallel, each time looking at a different "aspect" of the words (one head might track grammatical subjects, another might track pronoun references), then combine the results. A single averaged view blurs everything together; multiple heads let each one specialize.

Mechanically, the model runs $h$ attention functions in parallel, each on its own linearly projected, lower-dimensional slice of Q/K/V:

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\,W^{O}$$
$$\text{head}_i = \text{Attention}(QW_i^{Q}, KW_i^{K}, VW_i^{V})$$

The $W$'s are learned projection matrices: $W_i^{Q}, W_i^{K} \in \mathbb{R}^{d_{\text{model}} \times d_k}$, $W_i^{V} \in \mathbb{R}^{d_{\text{model}} \times d_v}$, and a final $W^{O} \in \mathbb{R}^{hd_v \times d_{\text{model}}}$ that mixes the heads' outputs back together.

The concrete numbers: $h = 8$ heads, each with $d_k = d_v = d_{\text{model}}/h = 64$. Here's the clever accounting: because each head is only $1/8$ as wide, running 8 of them costs about the same as running one full-width head. You get eight viewpoints essentially for free.

Do the heads really specialize? The appendix (Figures 3–5) shows attention maps where different heads clearly do different jobs: one follows a long-distance verb dependency ("making … more difficult"), another sharply links the pronoun "its" to what it refers to, others track sentence structure. I'd read these as suggestive illustrations, not proof, since attention weights are famously slippery as explanations, but they line up with the design intent.

### 2.4 The three places attention is used

Easy to blur together on a first read, but they're genuinely three different setups of the *same* machinery:

1. Encoder–decoder attention. Queries come from the decoder; keys and values come from the encoder's output. This is how the decoder "looks back" at the input sentence while translating, the classic role attention played in older seq2seq models.
2. Encoder self-attention. Queries, keys, and values all come from the encoder itself. Every word can look at every other word, fully bidirectional, because when reading the input, seeing ahead is fine.
3. Decoder self-attention. Same idea, but each word may only look at itself and earlier words, never ahead. This is essential: when the model is generating word $i$, it must not cheat by looking at words it hasn't produced yet.

That "no peeking" rule in (3) is enforced *inside* the attention formula with a beautifully simple trick: before the softmax, set every "illegal" (future) score to $-\infty$. After softmax, $-\infty$ becomes a weight of exactly 0. Combined with shifting the output by one position, this guarantees the prediction for position $i$ depends only on positions before $i$. No structural surgery needed, just one additive mask on the score matrix.

### 2.5 Position-wise feed-forward networks

After attention mixes information *between* words, each word gets processed *on its own* by a small two-layer network, the same network applied identically at every position:

$$\text{FFN}(x) = \max(0,\, x W_1 + b_1)\,W_2 + b_2$$

(That's: expand to a wider hidden layer, apply a ReLU nonlinearity, $\max(0, \cdot)$ zeroes out negatives, then shrink back down.) The inner width is $d_{ff} = 2048$, the outer width $d_{\text{model}} = 512$. The paper notes this is equivalent to two convolutions with kernel size 1. Parameters are shared across positions within a layer, but differ from layer to layer.

I find this sub-layer underappreciated. Attention moves information sideways between words; the FFN does the actual per-word "thinking" with a nonlinearity. Roughly two-thirds of the model's parameters live here, and later interpretability work argues these blocks behave like key-value memories. It's not filler around the attention, it's where a lot of the real computation happens.

### 2.6 Embeddings, softmax, and weight tying

Words aren't numbers, so learned embeddings convert each token into a $d_{\text{model}}$-dimensional vector; at the end, a linear layer plus softmax converts the decoder's output into probabilities over the next word. Two efficiency choices worth noting:

- Three-way weight sharing. The same weight matrix is reused for the input embedding, the output embedding, and the final pre-softmax layer (following Press & Wolf, 2016). This ties a huge number of parameters together, standard practice today.
- Embedding scaling. The embedding weights are multiplied by $\sqrt{d_{\text{model}}}$. Easy to miss, and easy to get wrong when reimplementing; it puts the embeddings on a comparable scale to the positional encodings they're about to be added to.

### 2.7 Positional encoding, putting word order back in

Here's a subtle problem. Attention treats the input as a bag of words: it has no built-in sense of order. Shuffle the words and, mathematically, the outputs just shuffle the same way (this property is called *permutation-equivariance*). But "dog bites man" and "man bites dog" are not the same sentence. So order has to be injected by hand.

The fix: add a positional encoding vector to each word's embedding, a numerical fingerprint of *where* the word sits. These are built from sine and cosine waves of different frequencies:

$$PE_{(pos,\,2i)} = \sin\!\left(pos / 10000^{2i/d_{\text{model}}}\right)$$
$$PE_{(pos,\,2i+1)} = \cos\!\left(pos / 10000^{2i/d_{\text{model}}}\right)$$

In plain terms: think of it like a binary clock made of waves, some dimensions oscillate fast (distinguishing neighbors), others slowly (distinguishing far-apart regions). Together they give every position a unique signature. Wavelengths range from $2\pi$ up to $10000 \cdot 2\pi$.

The clever hypothesis, stated without proof in the paper (so I worked it out myself), is that this design lets the model reason about *relative* position (e.g. "3 words back"), because for any fixed offset $k$, $PE_{pos+k}$ is a linear function of $PE_{pos}$.

Here's why. Take one frequency $\omega = 10000^{-2i/d_{\text{model}}}$ and its sine/cosine pair, and use the high-school angle-addition formulas:

$$
\begin{aligned}
\sin(\omega(pos+k)) &= \sin(\omega\,pos)\cos(\omega k) + \cos(\omega\,pos)\sin(\omega k)\\
\cos(\omega(pos+k)) &= \cos(\omega\,pos)\cos(\omega k) - \sin(\omega\,pos)\sin(\omega k)
\end{aligned}
$$

Written as a matrix, this is exactly a 2-D rotation:

$$
\begin{bmatrix} \sin(\omega(pos+k)) \\ \cos(\omega(pos+k)) \end{bmatrix}
=
\begin{bmatrix} \cos(\omega k) & \sin(\omega k) \\ -\sin(\omega k) & \cos(\omega k) \end{bmatrix}
\begin{bmatrix} \sin(\omega\,pos) \\ \cos(\omega\,pos) \end{bmatrix}
$$

The key point: that rotation matrix depends only on the offset $k$, not on the absolute position $pos$. So "shift by $k$ words" is always the *same* fixed operation, which the model's linear layers can learn to exploit. Deriving this myself is what made the design feel motivated rather than arbitrary. (Not coincidentally, this exact insight is the seed of modern rotary position embeddings, RoPE.)

The authors also tried simply *learning* the position vectors and got nearly identical results (Table 3, row E: 25.7 vs. 25.8 BLEU). They kept the sine/cosine version on the *hope* it might handle sentences longer than any seen in training. Note that this is a speculative benefit, not a measured one.

## 3. "Why Self-Attention", the complexity argument examined

Section 4 is the analytical heart. It compares layer types on three things: total computation per layer, how much can be parallelized (measured as the minimum number of *sequential* steps), and the path length between any two words, how many hops a signal must travel to connect them. That last one matters most: short paths make long-range relationships easier to learn.

Here's Table 1, with $n$ = sentence length, $d$ = vector width, $k$ = convolution kernel size, $r$ = restricted-attention neighborhood:

| Layer type | Compute per layer | Sequential steps | Max path length |
|---|---|---|---|
| Self-Attention | $O(n^2 \cdot d)$ | $O(1)$ | $O(1)$ |
| Recurrent | $O(n \cdot d^2)$ | $O(n)$ | $O(n)$ |
| Convolutional | $O(k \cdot n \cdot d^2)$ | $O(1)$ | $O(\log_k n)$ |
| Self-Attention (restricted) | $O(r \cdot n \cdot d)$ | $O(1)$ | $O(n/r)$ |

Two things I want to get exactly right:

The $n$ vs. $d$ trade-off (an important asterisk). Self-attention costs $O(n^2 \cdot d)$; a recurrent layer costs $O(n \cdot d^2)$. So self-attention is *cheaper per layer* only when $n < d$, the sentence is shorter than the vector width. That's usually true for translation sentences, which is why it works here. But when $n \gg d$ (long documents, high-res images, audio), that $n^2$ term explodes and becomes the bottleneck. This is the single caveat most summaries drop, and it's crucial: the entire later subfield of "efficient / sparse / linear attention" exists to attack exactly this quadratic cost. The seed of a decade of research is sitting quietly in this table.

The path-length payoff. Self-attention connects any two words in $O(1)$, one hop, always. A recurrent layer needs $O(n)$ hops (information has to walk down the whole chain). This is the clean, hardware-independent reason self-attention learns long-range structure so well: every word is a direct neighbor of every other word.

The paper also floats restricted self-attention (each word only attends to a nearby window of size $r$) as a way to tame very long sequences, at the cost of longer paths, $O(n/r)$. They mark it as future work; it's essentially a preview of the local-attention methods that arrived later.

There's also a modest bonus claim: attention weights might make models more *interpretable*, with heads that specialize. Presented as a side benefit, appropriately hedged.

## 4. Training regime, the reproducible details

This is where a reimplementer lives or dies, so I transcribed the numbers precisely.

Data. WMT 2014 English–German: ~4.5M sentence pairs, byte-pair encoding, shared vocabulary of ~37,000 tokens. English–French: the much bigger 36M-sentence set, with a 32,000 word-piece vocabulary. (Byte-pair / word-piece encoding splits rare words into common sub-word chunks, so the vocabulary stays small but nothing is truly "unknown.") Batches were grouped by similar length, ~25,000 source and ~25,000 target tokens each.

Hardware and schedule. One machine, 8 NVIDIA P100 GPUs. Base models: ~0.4 s/step, 100,000 steps, ~12 hours. Big models: 1.0 s/step, 300,000 steps, ~3.5 days. (For 2017, translating at state of the art in half a day on one box was remarkable.)

Optimizer. Adam with $\beta_1 = 0.9$, $\beta_2 = 0.98$, $\epsilon = 10^{-9}$, and a custom learning-rate schedule:

$$lrate = d_{\text{model}}^{-0.5} \cdot \min\!\left(step\_num^{-0.5},\; step\_num \cdot warmup\_steps^{-1.5}\right)$$

with $warmup\_steps = 4000$. In plain terms: start with a tiny learning rate, ramp it *up* linearly for the first 4,000 steps (a "warmup"), then let it decay slowly (as $1/\sqrt{\text{step}}$) for the rest of training. The two pieces of the $\min$ cross exactly at step 4,000, which is where the rate peaks. This warmup is basically mandatory for the post-LN architecture to train stably, another spot where the architecture choice and the optimizer choice are quietly linked.

Regularization (techniques that prevent overfitting), three kinds:

- Residual dropout: randomly zero out parts of each sub-layer's output during training, plus dropout on the embedding+positional sums. Base rate $P_{drop} = 0.1$. (Dropout forces the model not to rely too heavily on any one feature.)
- Label smoothing of $\epsilon_{ls} = 0.1$: instead of training the model to be 100% certain of the correct word, aim for, say, 90%. The paper is refreshingly precise about the trade-off: this hurts perplexity (the model is deliberately made less confident) but improves accuracy and BLEU. A good reminder that these metrics can move in opposite directions.

(Two quick glossary items: BLEU is the standard 0–100 score for translation quality, higher is better, it measures overlap with human reference translations. Perplexity measures how "surprised" the model is by the true next word, lower is better.)

## 5. Results, reading the tables carefully

### 5.1 Machine translation (Table 2)

On English–German, the big Transformer scores 28.4 BLEU, beating the previous best (including ensembles of multiple models) by more than 2.0 BLEU, a large jump. Even the *base* model beats everything published before it, at a fraction of the cost.

On English–French, the big model sets a new single-model record. Here's a genuine internal inconsistency worth flagging, because a careful review shouldn't gloss over it: the abstract and Table 2 both report 41.8 BLEU, but the prose in Section 6.1 says 41.0. The two numbers disagree *within the same paper*. The 41.8 figure is the one that matches the table and spread into the literature; the 41.0 in the body text is a real, documented discrepancy, the kind you only catch by reading the results against the table line by line instead of trusting the abstract.

The efficiency is the real story. Table 2 also estimates training cost in FLOPs (training time × GPUs × estimated per-GPU throughput; footnote 5 gives the numbers: 2.8/3.7/6.0/9.5 TFLOPS for K80/K40/M40/P100). The Transformer's cost is one to two orders of magnitude below the strongest prior systems. That, not the couple of BLEU points, is what made the field switch over.

Inference details, for completeness: base models averaged the last 5 checkpoints, big models the last 20; beam search with beam size 4 and length penalty $\alpha = 0.6$; max output length set to input + 50. (Beam search keeps several candidate translations alive at once instead of greedily committing to one word at a time.) The EN-FR big model used $P_{drop} = 0.1$ instead of 0.3, an easy detail to overlook.

### 5.2 Ablations (Table 3)

This is where they stress-test each design choice by changing one thing at a time on the EN-DE dev set. The base config anchors at 25.8 dev BLEU, 65M parameters. Highlights:

- Rows (A), number of heads. One head is 0.9 BLEU worse than the best setting, but *too many* heads (32) also hurts. So there's a sweet spot; more heads isn't automatically better once each head gets too thin.
- Rows (B), key size. Shrinking $d_k$ hurts quality. The authors read this as a sign that judging word compatibility is genuinely hard, and that a plain dot product might be a limitation, not the final word, a nice bit of honesty.
- Rows (C) and (D). As expected, bigger models help and dropout helps. Unsurprising, but good to see confirmed rather than assumed.
- Row (E). Learned position vectors ≈ sinusoidal ones (25.7 vs. 25.8).
- Big model. $N=6$, $d_{\text{model}}=1024$, $d_{ff}=4096$, $h=16$, $P_{drop}=0.3$, 300K steps, 213M parameters.

### 5.3 Constituency parsing (Table 4)

The "does it generalize?" test. Translation is one task; would this architecture work on something structurally very different? They tried English constituency parsing: building the grammatical tree of a sentence, where the output is longer than the input and must obey strict structural rules, and where RNN seq2seq models had historically struggled without huge datasets.

A 4-layer Transformer ($d_{\text{model}} = 1024$) trained on just the ~40K-sentence WSJ treebank, and separately with ~17M semi-supervised sentences. With almost no task-specific tuning, it hit 91.3 F1 (WSJ only) and 92.7 F1 (semi-supervised). (F1 here is the standard parsing accuracy score, 0–100.)

Two takeaways. First, it beat every prior model *except* the Recurrent Neural Network Grammar (Dyer et al., 2016), stated honestly, not oversold. Second, and more convincing: in the small-data (40K sentence) regime it beat the BerkeleyParser, directly refuting the belief that attention models need big data to compete. That's stronger evidence of generality than the raw score.

## 6. What holds up, what to read critically

What has aged extremely well.

- The central bet, attention alone, no recurrence, no convolution, was right, and then some. The architecture spread far past translation into essentially every modality.
- Optimizing for parallelism (hardware utilization) over marginal accuracy is exactly why this scaled.
- Multi-head attention, scaled dot-product, residual + LayerNorm blocks, and weight tying are all still standard today.

What deserves an asterisk.

- The $O(n^2 \cdot d)$ cost is sold as a virtue *only when $n < d$*. The quadratic-in-$n$ blowup is the vanilla architecture's biggest limitation, and a decade of "efficient attention" work exists to fight it. Read Table 1 as much as a problem statement as a result.
- Post-LN plus mandatory warmup make the original recipe more fragile than necessary. Not understood in 2017; pre-LN came later. If a from-scratch reimplementation won't train, this is usually the culprit.
- The interpretability claims from the attention pictures are suggestive, not conclusive. Attention weights are a contested form of "explanation."
- The EN-FR 41.8 / 41.0 mismatch is a small but real inconsistency.

What's easy to miss.

- The $\sqrt{d_{\text{model}}}$ embedding scaling and the three-way weight tying are load-bearing details, not decoration.
- The FFN sub-layer holds most of the parameters and does the per-word "thinking", not an afterthought to attention.
- The linear-function-of-offset property of sinusoidal encodings is provable via rotation matrices and directly foreshadows rotary embeddings.

## 7. Closing

*Attention Is All You Need* is unusual in that its most important contribution is a *removal*: delete recurrence and convolution, keep attention, and design the rest of the block so everything computes in parallel across positions. Almost every specific choice (scaling by $\sqrt{d_k}$, splitting attention into cheap parallel heads, the sinusoidal positions, the warmup schedule) exists to make that removal actually trainable. The paper is short, the ablations are honest about limits, and the few rough edges (post-LN fragility, the quadratic cost, one inconsistent BLEU number) are exactly the seams a decade of follow-up work has been unpicking. Rebuilding it from the text, deriving the variance argument and the rotation-matrix identity by hand rather than taking them on faith, is the single most useful afternoon I've spent understanding modern deep learning.

Reference: Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention Is All You Need. Advances in Neural Information Processing Systems 30 (NIPS 2017). arXiv:1706.03762.
