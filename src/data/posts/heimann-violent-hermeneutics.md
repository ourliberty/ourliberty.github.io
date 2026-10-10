---
title: 'estaging Heidegger and Lacan in the transformer, and the weak technical event'
excerpt: 'Violent Hermeneutics: AI and the Weak Technical Event(2026)'
date: '2026-10-10'
category: study
keywords: ['AI', '언어철학', '하이데거', '라캉']
---


## Study Log: Heimann, "Violent Hermeneutics: AI and the Weak Technical Event"


Marc Heimann's Violent Hermeneutics makes one claim I want to keep: a prompt can change what a frozen language model is able to say without changing what the model is. He calls the result a "weak technical event". It is not a Badiouian rupture but "a temporary redrawing of adjacency and accessibility within latent space" (abstract, p. 332). Having checked the paper against its sources in both of my fields, I think this concept survives, but the routes the paper takes to it are uneven.

The Heidegger mapping is the most textually exposed. Read against Being and Time, the hermeneutic "as" relates things in use, not words, and §34 has words accruing to meanings rather than meanings arising between words. Read against the later Heidegger, the paper's emphasis on the word fares better, although the decisive relation there is still between word and thing. The Lacan mapping, which assigns metonymy to learned vectors and metaphor to attention, is suggestive; but transformer operations do not divide cleanly along Jakobson's axes, so neither that assignment nor its inverse is forced by the architecture.

The three demonstrations are offered as illustrations, yet they carry conclusions that only controlled experiments could support. The Badiouian conclusion is compatible with the mathematics of language models, which give every admissible token sequence some probability, but the mathematics does not settle it, because everything depends on what one takes the model's "count" to be. And the closing thesis, that metaphor is the only non-calculable intervention left under Gestell, survives the objections I first raised against it, but only by moving the non-calculable from metaphor to the setting of ends.

I study across a computer science department and a philosophy department, and most writing on language models stays on one side. This paper at least tries to say what in-context conditioning is. That deserves a reading that checks both halves, which is what the rest of this post attempts. A referee-style report on the first version of this post, with everything I corrected, is in the second tab.

### The paper, and how I read it

The article appears in M. Nyírő, Zs. Lurcza and P. Makai (eds.), EVENT and Its Mediation: Interdisciplinary Perspectives in Philosophy, Religious Studies, Literary Studies, and Cultural Theory (Miskolc University Press, 2026), pp. 332–349, with the DOI [10.70832/EVENTanditsMediation.18](https://doi.org/10.70832/EVENTanditsMediation.18). The press's platform lists it as published on 28 August 2026, and the PDF carries a CC BY-NC 4.0 licence. Its author, Marc Heimann, is affiliated with Hochschule Niederrhein in Krefeld and Mönchengladbach. The text runs to seven sections, thirty footnotes, twenty-seven bibliography entries and one figure. It builds on two articles co-written with Anne-Friederike Hübener: "Material Calculation and Its Unconscious" (Psychoanalysis, Culture & Society, 2023) and "Circling the Void" (Cognitive Systems Research, 2025). I could not access the second, so some of my objections may already be answered there.

I read the PDF twice, once for the argument and once footnote by footnote. Bibliographic corrections were checked against publisher, proceedings or catalogue records, listed at the end, and quotations from the paper were checked against the PDF together with their page numbers. Philosophical claims were checked against the passages they lean on: Being and Time §§27 and 32–35, Heidegger's late essays on language, Lacan's "The Instance of the Letter in the Unconscious", Meditation 17 of Being and Event and Book V of Logics of Worlds. Technical claims were checked against the papers that define the terms and, in one case, against library source code.

I also tried to re-run the paper's one quantitative measurement. The model weights could not be downloaded from the environment I was working in, so Close reading III proposes a protocol rather than reporting numbers. Nothing in this post reports a result I did not obtain.

Page numbers in parentheses refer to the volume's pagination. I cite Being and Time by section and by the German pagination ("H.") that the standard translations print in their margins, rather than by the Stambaugh page numbers the paper uses, and I keep quotations short.

### The argument, section by section

The paper runs one long inference: transformers re-stage a continental theory of language, so prompting is a kind of hermeneutics, and its effects are event-like without being an Event.

The introduction (pp. 332–334) claims that LLMs "accidentally instantiate" two features of Heidegger's and Lacan's accounts of language: a word- and association-based picture of language and a central role for metaphor, with sentences, logic and grammar treated as their epiphenomena (p. 333). The comparison is deliberately confined to language in its automatic, non-authentic mode, Lacan's automatism and Heidegger's das Man; the subject comes later, and for the machine not at all. Against readings of LLMs as machines of ideology (the paper cites Öhman 2024), the author calls them "extraordinarily weak to language" (p. 333).

The section on Heidegger (pp. 334–335) starts from the hermeneutic "something-as-something", which lies before any thematic statement, reads it as saying that words are defined chiefly by their relations to other words, and maps it onto vector embeddings, in which relation becomes distance. It then turns to what it calls Heidegger's later account of historical modes of articulation, antiquity's physis and the medieval esse creatum, and leaves a question open: why should an epoch's articulation crystallize in a word?

The section on Lacan (pp. 335–338) adds that signifiers refer to other signifiers, and that a web of fixed relations could only repeat, like the "stochastic parrot"; language needs an operation that relinks. On the paper's account, Lacan follows Jakobson in dividing the associative link into metonymy and metaphor, and the paper assigns metonymy to learned vector proximity and metaphor to attention. Its evidence is a figure (p. 337) in which the cosine similarity between "neon" and "loneliness" in Llama 3.2 1B rises across layers. Footnote 22 adds a mechanistic gloss that draws on work on feed-forward layers as key-value memories and on model editing.

The fourth section (pp. 338–339) draws a limit. LLMs are engineering models, a form of thought about language that is not philosophy, and the decisive difference is ontological. Das Nichts and the objet petit a belong to Heidegger's and Lacan's inquiries, while for computer science such absent objects cannot exist, because the machine's zero is a default, "fundamentally a positive state" (p. 339).

The fifth section (pp. 339–342) makes the central move. If attention is where metaphor happens, prompt engineering is "violent hermeneutics" (p. 339). A three-sentence Yoda instruction makes a model abandon standard grammar, which the paper reads as the installation of a local master signifier at inference time rather than a style transfer. A bracketed reference to Maldoror makes GPT-3.5 describe a book it had just said it did not know, which the paper reads as a shift in what can be said at all. The model has no inner world; it "performs articulating a world" (p. 341). This also answers the question left open earlier: the prompt compels the model to attend to a new Urwort.

The sixth section (pp. 342–345) brings in Badiou, who reserves the Event for truth procedures that produce a subject. The machine can be wrenched into a new articulation but cannot originate its own Urwort, so the metaphor comes from the interaction. What appears is a "weak technical Event", a re-indexing of relations among existing elements, "a permutation of its topology" (p. 344), and calculability becomes situational, redrawn by attention in each session. The section closes with the line that the model gives "the schematics of the Event. But not the engine" (p. 345).

The last section (pp. 345–346) draws the consequence. If machine worlds are rearranged by metaphor, the relation between humans and technology becomes literary, closer to Borges and Lem than to Terminator. Encyclopedic professional knowledge is open to automation, while close reading and metaphorical invention become operationally powerful. All of this stays within Gestell, but the only non-calculable intervention left is metaphorical, what Heidegger would call poetic saying (dichtendes Sagen), and literary practice has become infrastructural.

### Toolkit 1: the philosophical terms, stated precisely

The paper moves quickly through three vocabularies, so before judging its mappings I wrote down what each term means in its home text.

#### Heidegger

In Being and Time the hermeneutic "as" (§32, H. 148–149) is the structure of interpretation. Circumspection takes what it encounters as something, so that we see it "as a table, a door, a carriage, or a bridge" (H. 149), in terms of a whole of involvements, and this articulation lies before any thematic statement about the thing. Its relata are things in use and their purposes, not words; Heidegger even insists that pre-predicative seeing of the ready-to-hand already understands and interprets. The apophantic "as" of the assertion, as in "the hammer is heavy", is derived from it by levelling the thing down to something present-at-hand that bears properties (§33, H. 158).

Section 34 (H. 160–162) distinguishes discourse, Rede, which articulates intelligibility and is equiprimordial with attunement and understanding, from language, Sprache, which is discourse spoken out, a totality of words. Two sentences there matter for this paper: "To significations, words accrue", not the other way round, and language "can be broken up into word-Things which are present-at-hand" (both in the Macquarrie–Robinson translation). The "they", das Man (§27, H. 126–130), is the who of everyday Dasein, marked by averageness and levelling. Heidegger calls it the "realest subject" of everydayness (H. 128) and an existentiale belonging to Dasein's positive constitution (H. 129). Falling (§38) is Dasein's absorption in it, and authentic selfhood is an existentiell modification of the they rather than an escape from it (H. 130). Idle talk, Gerede (§35, H. 167–170), is discourse that circulates by being passed along and has lost its primary relation to what it talks about; Heidegger says the term carries no disparaging sense.

The later texts move the weight toward the word itself. The "Letter on Humanism" calls language the house of being, and the essays collected in On the Way to Language meditate on Stefan George's line Kein ding sei wo das wort gebricht, "where word breaks off no thing may be". In "The Question Concerning Technology" (1953), finally, Gestell names the gathering of the challenging that orders everything as standing-reserve, Bestand; the prefix Ge- marks a gathering, as in Gebirg, a mountain range.

#### Lacan

"The Instance of the Letter in the Unconscious" (1957) rewrites Saussure's sign as S over s, signifier over signified, with a bar that resists signification, and it locates the production of meaning in the relations of signifiers to other signifiers. Metonymy is the word-to-word connection along the chain, as when "thirty sails" stands for thirty ships. In its formula the minus sign records that the bar is maintained, so no new signification crosses it. Lacan aligns metonymy with Freud's displacement, Verschiebung, and with desire.

$$
f(S \ldots S')\,S \;\cong\; S\,(-)\,s
$$

Metaphor is "one word for another". One signifier takes the place of another, the displaced signifier passes below the bar, and that crossing, written with a plus sign, produces a new signification. Lacan aligns metaphor with Freud's condensation, Verdichtung, and with the symptom.

$$
f\left(\frac{S'}{S}\right)S \;\cong\; S\,(+)\,s
$$

Three more terms recur below. The quilting point, point de capiton, introduced in Seminar III (1955–56), is where signifier and signified are knotted together; meaning is fixed retroactively, and "The Subversion of the Subject" (1960) puts this by saying that a sentence completes its signification only with its last term. The master signifier of Seminar XVII (1969–70), S1, is the signifier that represents the subject for another signifier, S2, the battery of knowledge, and it orders a discourse. And the "Seminar on 'The Purloined Letter'" (1956) opens by grounding Freud's repetition compulsion in the insistence of the signifying chain, which is the background of the paper's remark that Lacan "calls language an automatism" (p. 333).

#### Badiou

In Being and Event a situation is a presented multiple structured by a count-as-one. Elements belong to it, parts are included in it, and the state of the situation re-counts the parts. The void, written ∅, is the "proper name of being" (Meditation 4); it is never presented, only named. The event (Meditation 17) is the multiple formed by the elements of its site and by itself:

$$
e_X = \{\, x \in X,\ e_X \,\}
$$

Because it belongs to itself, the event is "ultra-one" and falls outside what set-theoretic ontology, which obeys the axiom of foundation, can present. Whether it belongs to the situation is undecidable from within the situation, so an intervention has to decide, and a subject is constituted in fidelity to that decision. Truths unfold only in science, art, politics and love. Knowledge classifies parts by their properties, forming the encyclopedia of the situation, while a truth is a generic part that no encyclopedic determinant captures.

Logics of Worlds (2006; English 2009) adds a theory of appearing. Each world has a transcendental, an ordered structure of the Heyting-algebra kind in which degrees of identity and of existence between appearing beings are measured. Book V distinguishes four forms of change: modification, ordinary becoming that is change "without real change"; and three forms defined by a site's intensity of existence and the reach of its consequences, namely the fact, whose existence is not maximal, the weak singularity, maximal in existence but not in consequences, and the strong singularity or event, maximal in both. The paper does not cite this book, and I will argue that it should.

### Toolkit 2: what a decoder-only transformer actually computes

Everything the paper calls the model's worlding happens in one fixed computation, run the same way for every prompt. I use the paper's own model, Llama 3.2 1B, as the running example. It has sixteen layers, a hidden size of 2,048, thirty-two query heads sharing eight key-value heads, a vocabulary of 128,256 tokens, and input and output embeddings tied to each other. Because Meta's repository is gated, I took these numbers from a public copy of the configuration that records its origin in meta-llama/Llama-3.2-1B.

Text enters the model as tokens produced by byte-pair encoding, which merges frequent byte or character sequences. Tokens are therefore units of frequency, and only sometimes morphemes. The paper's remark about "subwords, like the German prefix Ge- in 'Gestell'" (p. 334) is a good Heideggerian point, but nothing guarantees that a BPE tokenizer will cut Ge-stell where Heidegger hyphenates it.

Inside each layer, attention projects every position's current vector into a query, a key and a value, and computes

$$
\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}\right)V
$$

Two consequences matter later. Only queries and keys enter the dot product, and the values are what gets averaged, so footnote 22's phrase about "queries, keys, and values, and their dot products" (p. 337) blurs the mechanism. And attention weights are themselves similarity scores: attention selects, by learned similarity, among the positions present in the context.

The mask is causal. Position i attends only to positions 1 through i, so when a new token arrives every earlier position's states stay exactly as they were, which is why key-value caching works. Llama is also a pre-norm residual network. For layer l,

$$
h_l = x_l + \mathrm{Attn}_l\big(\mathrm{RMSNorm}(x_l)\big), \qquad x_{l+1} = h_l + \mathrm{FFN}_l\big(\mathrm{RMSNorm}(h_l)\big)
$$

so each sublayer reads a normalized copy of the residual stream and adds its output back. Elhage et al. (2021) describe the stream as "the sum of the output of all the previous layers and the original embedding", and Geva et al. (2022) read each feed-forward output as "an additive update" that promotes concepts in the vocabulary space. An addition can still cancel what is already there, and Elhage et al. discuss components that seem to delete information by writing its negative, so overwriting is not impossible in effect. It is, however, not the mechanism footnote 22 attributes to Geva et al. (2021), whose abstract describes memories composed and then refined through residual connections.

At the top, a softmax over the whole vocabulary gives every token a strictly positive probability, in exact arithmetic and leaving floating-point underflow aside. Under untruncated sampling, then, every token sequence that fits in the context window has positive probability. Greedy decoding, top-k and nucleus sampling set some probabilities to zero in effect, so whatever is "impossible" for a deployed model is impossible because of its decoding rule, not its distribution.

Finally, prompts condition the model without training it: the weights do not change during in-context learning. What happens instead is disputed. Xie et al. (2022) model in-context learning as implicit Bayesian inference, in which the model infers a latent concept already learned in pretraining. Other work shows that transformers trained from scratch can learn unseen linear functions in context with performance comparable to least squares (Garg et al. 2022), that a single linear self-attention layer can implement a step of gradient descent on a regression loss (von Oswald et al. 2023), and that large models, unlike small ones, follow labels flipped against their semantic priors (Wei et al. 2023). Hendel et al. (2023) find that demonstrations are compressed into a single task vector that then modulates the model. These results bear directly on the paper's thesis, and I return to them in Close readings IV and V.

Two reproducibility notes. The forward pass is deterministic apart from floating-point effects, so footnote 21 is right that reading hidden states involves no randomization. And the Hugging Face implementation, which I checked in transformers 4.46.3, returns seventeen hidden-state tensors for this model: the embedding output, the outputs of the first fifteen layers, and the sixteenth layer's output after the final normalization. The figure plots sixteen points, labeled 0 to 15, and the paper does not say which tensor was left out.

### Close reading I: Heidegger, and what the "as" relates

The Heidegger mapping holds at the level of form, as a parallel between two relational wholes, but it fails at the level of content, and it has to be judged against two different Heideggers.

#### Against Being and Time

The paper reads the something-as-something as a relation between words (p. 334). In §32, however, the "as" articulates what circumspection encounters, the table, door, carriage or bridge of H. 149, in terms of a whole of involvements, and Heidegger insists that even pre-predicative seeing of the ready-to-hand already understands and interprets. Nothing verbal is needed for the "as" to be in play.

Section 34 then runs the dependency the other way: "To significations, words accrue. But word-Things do not get supplied with significations" (H. 161). Meaning comes first and words grow onto it. The picture the paper attributes to Heidegger, meaning fixed by word-to-word relations, is closer to Saussure and Lacan, so the claim that both thinkers share "the same idea of a web of relations" (p. 335) needs qualifying. The paper also says that in Being and Time language is characterized by articulation (p. 334). In §34 it is discourse that articulates intelligibility, while language is discourse spoken out, a totality of words that can be broken up into present-at-hand word-things.

#### Against the later Heidegger

Here the paper does better, and the first version of this post did not say so. The paper's question about why an epoch's articulation crystallizes in a word (p. 335), and its answer about the Urwort (p. 342), belong to a line of thought that the later Heidegger develops in texts the paper does not cite, where language becomes the house of being and where Heidegger keeps returning to George's line Kein ding sei wo das wort gebricht. In those texts the word does seem to be constitutive of things in a way §34 denies. Even so, the relation the late texts care about holds between word and thing, a saying that lets something appear as what it is; it is not a relation among words. The objection therefore survives in a weaker form. The later Heidegger supports the paper's emphasis on the word, but not its reading of that emphasis as associative structure.

Two further points concern the paper's use of Heidegger. Its evidence for the "later philosophy" of historical articulation (p. 335) includes a lecture course from 1923–24 (GA 17) and one from 1929–30 (GA 29/30), which are early or transitional by any standard periodization; only the 1937–38 course (GA 45) is late. And there is a genuine parallel that the paper could have claimed more carefully. Heidegger's significance, Bedeutsamkeit (§18), is a relational whole of references, in-order-to, towards-which and for-the-sake-of-which, outside of which no item means anything, and distributional representations are holistic in the same formal sense. The parallel is between two relational wholes, not between the hermeneutic "as" and cosine distance.

My own reading, which I mark as mine, pushes further. An LLM is trained on exactly what §34 describes, language broken up into present-at-hand word-things, a corpus of tokens. It models the deposit of discourse without the attunement and understanding that discourse articulates. That supports the paper's limitation thesis, that the machine has no inner world (p. 334), better than its own mapping does.

#### Das Man, idle talk, and the Urwort

The comparison with language's automatic, non-authentic mode (p. 333) is the paper's best Heideggerian move, and two refinements would sharpen it. Heidegger's wording at H. 128 is that the they is the "realest subject" of everydayness; the paper renders this with the scholastic ens realissimum (p. 333), which in metaphysics names God, so it is a gloss and not a quotation. The closer analogue, moreover, is probably idle talk rather than the they as such. Idle talk spreads by being passed along and has lost its primary relation to what it is about, which is suggestive as a description of text produced from text, with the caveat that Gerede is a way Dasein understands, not a property of strings.

The Urwort analogy contains a twist the paper does not draw out. For the later Heidegger the basic words of an epoch, physis or aletheia, are not chosen by anyone; language speaks, and humans respond. In the paper's analogy the user installs the word and the model responds, so the model sits where Heidegger puts the human, and the prompter occupies, relative to the model, something like the position Heidegger reserves for language itself. The prompter is of course also a speaker responding to language, so the analogy doubles the structure rather than inverting it. The paper half-sees this when it writes that metaphors "happen to" LLMs (p. 345), but it does not ask what that makes of the person who writes the prompt.

#### A missing interlocutor

The paper never mentions Hubert Dreyfus, whose Heideggerian critique of AI targeted exactly the rule-and-representation picture that the paper says LLMs escape (p. 334). Dreyfus also anticipated the escape. In "Making a Mind Versus Modeling the Brain" (Daedalus, Winter 1988), written with Stuart Dreyfus, he granted that neural networks can produce intelligent behavior without explicit rules or stored representations. He doubted that they could generalize as we do, because what counts as the same kind of thing depends on needs, purposes and bodies. Answering that objection would strengthen the paper's claim that the machine has no inner world more than any of its demonstrations do.

### Close reading II: Lacan, Jakobson and Saussure

The paper assigns metonymy to learned vector proximity and metaphor to attention (pp. 336–338). In the first version of this post I argued that Jakobson's axes invert that assignment. The better conclusion is that transformer operations do not decompose along those axes at all, which leaves the paper's mapping unforced rather than wrong.

#### The axes, and a word about "associative"

Jakobson's "Two Aspects of Language and Two Types of Aphasic Disturbances" (1956), whose closing section is the chapter on the metaphoric and metonymic poles that the paper cites, opposes two operations. Selection substitutes one term for another on the basis of similarity, which is the metaphoric pole; combination links terms into a context on the basis of contiguity, which is the metonymic pole. Lacan transposes the pair: metaphor is substitution, and metonymy is the word-to-word connection along the chain.

Saussure's own vocabulary adds a complication the paper does not notice. In the Course in General Linguistics the two kinds of relation are syntagmatic and associative, and the associative relations, which hold in absentia among terms linked in memory, are the ones later narrowed and renamed paradigmatic, relations among terms that could fill the same slot. When the paper describes metonymy as marking the "associative vicinity" of vectors (p. 336), it uses "associative" in a non-Saussurean sense. For a paper that frames its whole mapping as associationism, the point is not merely terminological.

#### Where learned vectors sit

Two words get close vectors when they occur in similar contexts, that is, when they can stand in for one another, which is the paradigmatic relation. Sahlgren (2006) showed that word spaces encode syntagmatic or paradigmatic relations depending on how context is defined. Levy and Goldberg (2014) make the contrast concrete: with dependency-based contexts the nearest neighbors of Hogwarts are other fictional schools such as sunnydale and collinwood, while with a five-word bag-of-words window they include dumbledore and snape.

That evidence comes from static embeddings, not from a transformer's embedding layer, so it cannot be transferred directly. There is, however, a structural reason to expect something similar in the paper's own model. Llama 3.2 1B ties its input and output embeddings, and two tokens with similar output vectors receive similar logits in every context, which means they are predicted where they could replace one another. On that argument the learned geometry leans toward Jakobson's similarity axis, though the claim remains to be measured.

#### Why attention straddles both axes

Attention operates over positions that are co-present in a context, which is Jakobson's domain of combination. Its weights, however, are query–key similarities, so within that domain it selects by learned similarity. Attention therefore straddles both of Jakobson's operations, and so does the representation it produces. That is why I no longer think the paper's assignment is simply inverted: neither the assignment nor its inverse is forced by the architecture.

The paper's mapping can still be defended at a different level. Lacan's metaphor is not similarity in general but a substitution within a chain that produces a new signification, the crossing of the bar written with a plus sign. On that reading, metonymy is the trained statistics of contiguity and metaphor is the inference-time shift of a token's state under an unusual context. The difficulty is evidential. The paper would then need to show a crossing of the bar, a new signification, whereas it shows a rising cosine similarity that a purely metonymic chain would also produce.

#### A slip in footnote 22

Footnote 22 says that Lacan's metaphor formula captures "substitution via displacement", comparable to Freud's "fusion between two groups of ideas" (p. 337). In Lacan's pairing displacement goes with metonymy, while a fusion of ideas reads like the vocabulary of condensation, which goes with metaphor. The Freud citation fits the paper's claim, and the word "displacement" points the other way.

#### Causal attention and retroaction

For Lacan meaning is fixed retroactively: a sentence completes its signification only with its last term. In a decoder-only transformer earlier positions are never revised, but later positions read the whole prefix, so the signification of a chain is fixed at its end, which is arguably where Lacan places the quilting effect. What a decoder cannot do is revise the earlier signifiers' own states, whereas in a bidirectional encoder such as BERT every position is computed with access to what follows it.

This matters for footnote 22's example. In "my lawyer is a shark", the position of lawyer cannot attend to shark in a causal model. It is the position of shark that integrates lawyer, so at that point in the chain the shark acquires features of the lawyer, not the reverse.

#### Lacan's own sequence machine

The paper also leaves unused the passage in which Lacan comes closest to a sequence model. In the material that accompanies the "Seminar on 'The Purloined Letter'" in Écrits, Lacan codes a random series of pluses and minuses into overlapping groups of three and shows that the coded chain obeys strict laws. With his classes, for instance, a group of three identical signs can never be followed directly by an alternating group. Lydia H. Liu (Critical Inquiry, 2010) reads this alongside Shannon's analysis of constraints on telegraphic symbols, and she documents Lacan's public lecture of 22 June 1955, "Psychoanalysis and Cybernetics, or On the Nature of Language". This is the most direct historical bridge from Lacan to sequence models. It would also have given the paper a precise notion of the impossible, a succession forbidden by the code, as distinct from one that is merely improbable.

#### "Machinic unconscious"

The paper calls the hidden states what "psychoanalysis might call the machinic unconscious" (p. 341). The term is Félix Guattari's, from L'inconscient machinique (1979), and it was coined within his schizoanalytic break with psychoanalysis, so in a Lacanian argument it carries the wrong lineage. There is also a technical objection. Hidden states are fully inspectable, and probes, the logit lens and sparse autoencoders make them appear to us. They are unconscious only relative to the model.

### Close reading III: the three demonstrations, read as experiments

None of the three demonstrations isolates the variable the paper's argument needs. In fairness, the paper presents them modestly: the neon case shows similarity only "in a very broad sense" (p. 336), the Yoda case is a "humorous example" (p. 339), and the jailbreak case is called anecdotal (footnote 27). The conclusions drawn from them are not modest, though, so it is worth asking what each would need.

#### Neon and loneliness

The figure on p. 337 plots cosine similarity across layers 0 to 15 of Llama 3.2 1B for the two occurrences of "neon loneliness" in a short noir passage, which footnotes 21 and 22 reproduce. Read off the plot, both curves start near 0.1; the lowercase pair peaks near 0.5 and the capitalized pair near 0.64, both around layer 13, and both fall back afterwards. Four problems stand between this figure and the paper's reading of it.

The first is the absence of a baseline. Ethayarajh (2019) found contextual representations anisotropic in every non-input layer of ELMo, BERT and GPT-2, and generally more so in higher layers; in GPT-2's last layer two random words have on average an almost perfect cosine similarity. Sun et al. (2024) report, across a range of large language models, a handful of "massive activations" up to roughly 100,000 times larger than the rest and largely constant across inputs. Neither finding was established for Llama 3.2 1B in particular, but together they make a curve that rises with depth the default expectation for many token pairs, which is exactly what a baseline would test.

The second problem is the measure itself. Timkey and van Schijndel (2021) found that often just one to three "rogue dimensions" dominate cosine similarity in transformer language models, that these dimensions correlate strongly with absolute position and punctuation rather than with what drives the model's behavior, and that simple standardization corrects for them.

The third problem is direction. Under the causal mask, the "neon" of the first pair cannot see the "loneliness" right after it, while that "loneliness" does see "neon". Cosine is symmetric, so the figure cannot say which vector moved toward which, and the paper's phrasing, "'neon' becomes more similar" (p. 336), picks a direction the measurement does not support. The second pair's higher late-layer values fit the idea that the second "Neon" has read the first phrase and its gloss, but position and capitalization are not ruled out.

*In the first pair, only "loneliness" can read "neon". The second "Neon" can read the whole first phrase and its gloss, and the figure's cosine curves cannot tell these flows apart.*

The fourth problem is missing detail. The paper does not say which sixteen of the seventeen hidden-state tensors are plotted, whether a beginning-of-sequence token was prepended, how the two paragraphs were joined, or how any word split into several tokens was pooled.

Since I could not download the weights, I can only describe the experiment I would run. I would feed the exact passage with a beginning-of-sequence token, log token ids and offsets, and keep all seventeen tensors. At each layer I would compute the raw cosine, the cosine after standardizing each dimension over the passage's tokens, and the percentile rank of "loneliness" among all tokens of the passage by similarity to "neon". As controls I would use the same phrase in a literal context, the noir passage with "neon" replaced by a neutral word, and random token pairs. As a causal check I would block attention from "loneliness" to "neon", and from the second "Neon" to the first phrase, and measure the drop. If the paper is right, standardized similarity and percentile rank should rise more in the noir passage than in the controls, and the knockouts should shrink the effect. If anisotropy explains the figure, raw similarity will rise for random pairs too and the percentile rank will stay flat.

#### Yoda-speak

In the Yoda case (pp. 339–342), a three-sentence instruction made a model summarize the authors' 2023 article in Yoda-speak, and the paper concludes that grammar is "contingent" and that it is "simply false to say that LLMs possess grammar" (p. 342). The register is famous, and the paper grants that it likely has a good statistical basis (p. 340). What matters is not its frequency relative to standard prose but whether the mode was learned, and a prompt that selects a learned mode is the ordinary picture of in-context learning. Chat models are, moreover, trained to follow system instructions, and recent work trains them explicitly to give those instructions priority over users and third parties (Wallace et al. 2024). Obedience to a style instruction is therefore plasticity by design rather than evidence of fragility.

A parity argument cuts deeper. People can imitate Yoda on request, and nobody concludes that they lack grammar. If the inference fails for humans, it needs an additional premise to succeed for models.

Whether Yoda mode displaces grammar or exercises it is an empirical question. The output is systematic rather than random, applying a small set of reordering patterns consistently, as in "Uploaded, a paper you have", which suggests sensitivity to phrase structure. Some of its inversions, though, front a bare verb and leave the rest of the phrase behind, as in "Center, the authors do, on how computers and AI fail". Probing studies have recovered parse-tree distances from the representation geometry of ELMo and BERT (Hewitt and Manning 2019), but a probe can also learn a task by itself, which is why control tasks are needed (Hewitt and Liang 2019), and none of this was shown for the model the paper used.

The paper contrasts a surface-level style transfer with "a reconfiguration of the generative conditions themselves" (p. 342). In an autoregressive model every output, styled or not, comes from the same conditional generation, so the contrast becomes meaningful only as a mechanistic question, for instance whether syntax-bearing directions stay active in Yoda mode, and the paper does not test it. Nor does it report the exact model behind "ChatGPT-5", any platform-level instructions around the custom configuration, the sampling settings, or the number of runs.

#### The Maldoror prefix

The Maldoror case (pp. 341–342) is the thinnest. GPT-3.5 answered "Tell me about: Book 'How to blow up a pipeline'" by saying that no widely known book of that title existed as of its January 2022 update; with "[Maldoror~" prefixed, it described Andreas Malm's book correctly. The paper reads the first answer as a "refusal pattern" that the prefix disables. But the first answer declines nothing; it asserts that the book is not known. Since the book was published by Verso in 2021, inside the model's self-reported training window, the first answer was a failure of recall. That alignment training caused it is a reasonable hypothesis, and one the paper does not test.

ChatGPT's answers also vary between regenerations, so one output per prompt cannot separate the prefix's effect from sampling noise. The case needs many samples per condition, with a neutral bracketed prefix, a random-token prefix and other literary names as controls. Because nothing disallowed was elicited, it is also not a jailbreak in the sense of the literature footnote 27 cites, and the closest source, Yan et al. (2025) on jailbreaking through adversarial metaphors, is the one bibliography entry the text never cites. What the case shows is that one change to a prompt altered one output. The conclusion that the prefix "changes what can be said at all" (p. 342) would need distributions over outputs.

### Close reading IV: Badiou, the weak event, and the void

The paper's formal claim is that a prompt adds no element but re-indexes relations among existing ones (p. 344). In the first version I said that the mathematics of language models confirms this. It is more accurate to say that the mathematics is compatible with it, and that the question is decided by the choice of mapping.

#### What the mathematics shows, and what it leaves open

Take the mapping I used before, on which the model's count is the support of its output distribution. Under untruncated sampling every token sequence that fits in the context window already has positive probability, so nothing in the model's output space has escaped the count, and nothing could play the role of Badiou's supernumerary, self-belonging multiple. A prompt moves probability mass; it cannot create support. On this mapping the paper's phrase "a permutation of its topology" (p. 344) is itself a metaphor, and "a reweighting of a fixed support" says the same thing literally. Borges, whom the paper names but does not develop (p. 345), supplies the image. In "The Library of Babel" every possible book of 410 pages, with 40 lines to a page and 80 characters to a line in 25 symbols, already stands on some shelf, so discovery is only ever search. A full-support language model is a probability measure over such a library, and a prompt does not add a book; it changes which shelves are near.

A Badiouian need not accept that mapping. A situation is not the set of all strings but a structured presentation, and one could identify the count with the structure the model has learned, its regions of high probability, rather than with the bare support. Sequences of negligible probability would then be presented without being re-counted, and an inscription that drives the model into them could be argued to touch something like a site. I do not think this rival mapping succeeds, since nothing in such an inscription belongs to itself and nothing about its belonging is undecidable. It shows, however, that the formal argument has to be made rather than read off the softmax.

Research on in-context learning cuts both ways here. On the Bayesian account of Xie et al. (2022), a prompt shifts the posterior over latent concepts acquired in pretraining, which is the paper's re-indexing stated as a formal hypothesis. But transformers trained from scratch learn unseen functions in context (Garg et al. 2022), attention can implement steps of gradient descent (von Oswald et al. 2023), and large models follow flipped labels against their priors (Wei et al. 2023). A prompt can thus make a model compute a mapping it never represented as such. Whether that counts as an uncounted element or as a new pattern of linkage among counted ones is precisely the question the paper needs to argue, and its own distinction between "a new pattern of linkage between already-existent elements" and a genuine element (p. 344) is the right place to argue it.

#### Four senses of "impossible"

The paper says that before the external input a novel metaphorical shift is "strictly impossible", and that what is absent from the training data is "structurally excluded" (p. 343). Four senses of impossibility are run together here. Badiou's is structural: the event is not counted by the situation, and the elements of its site are not presented in it. Lacan's coded chain gives a syntactic sense, a succession that the code forbids, which a language model exhibits only under constrained decoding. A decoding rule such as top-k or nucleus sampling gives a third sense, which belongs to the sampler rather than the model. And there is mere improbability, the actual case of an unseen metaphor, since absence from the training data does not mean zero probability; generalization just is the assignment of probability to unseen sequences. Read as improbability, the paper's claim supports its own conclusion that no Event occurs, but the word "impossible" should go.

#### Badiou's own theory of weak change

Badiou already has a theory of weak change, and the paper does not cite it. Book V of Logics of Worlds separates modification from three forms of change defined by a site's intensity of existence and the reach of its consequences. My reading, which I mark as mine, is that the paper's "redrawing of adjacency and accessibility" (p. 332) is naturally described as a change in what that book calls degrees of appearing, with adjacency resembling a degree of identity between appearing beings and accessibility a degree of existence. Most prompt effects would then be modifications, changes that the world's transcendental already regulates. The paper's showcase cases might be argued to be weak singularities, maximally present within a session but with consequences that end with the context window (p. 340).

The analogy is loose in one important respect. Badiou's transcendental is an ordered algebraic structure of the Heyting kind, and cosine similarities do not obviously form one, so turning the analogy into a formal reading would take work that the paper does not attempt.

The paper's own Badiou is loose in two places. When it says the Event supplements the situation with an "inconsistent multiple" (p. 344), it compresses Being and Event, where inconsistent multiplicity is being before the count and the event is the self-belonging multiple of Meditation 17 whose belonging the situation cannot decide. And when it says the technical is "subordinated to knowledge" (p. 343), the citations around the sentence, to pages 16 and 328 of Being and Event, concern philosophy's four conditions and the encyclopedia of knowledge. The step from knowledge to the technical is the author's own extrapolation, reasonable but unmarked.

#### The machine's zero and the void's name

The paper's fourth section belongs here, because its limit argument concerns the void. It says that even the mathematical zero, "as the name of the void", is not accessible for a machine, because the computer's zero is a default, "fundamentally a positive state" (p. 339). Floating-point arithmetic even has two zeros, +0 and −0, which nicely illustrates that a machine zero is a bit pattern rather than a lack. But the argument proves less than it seems. For Badiou the void is never presented; it is accessible to thought only through its proper name, the mark ∅, and a mark written in chalk is as positive as a bit pattern. The paper itself says that the object it has in mind appears "on the blackboard only" (p. 338), and a computer handles marks just as a blackboard does. The asymmetry the paper wants therefore cannot lie in the positivity of the mark. If it exists, it lies in a subject who reads a mark as the name of a lack, which is a stronger and more interesting claim than the one the paper makes.

### Close reading V: Gestell, poetics, and "the only remaining non-calculable intervention"

The closing claim is that under the new Gestell "the only remaining non-calculable intervention is metaphorical" (p. 346). In the first version I offered four techniques as counterexamples. All four are calculable, so none of them contradicts a claim about what is non-calculable, and I withdraw that framing. What they show is narrower, and it still matters.

#### What calculation can do

Zou et al. (2023), whom the paper cites in footnote 27, produce adversarial suffixes "automatically" by greedy and gradient-based search, in contrast with earlier jailbreaks that needed human ingenuity. Prompt tuning (Lester et al. 2021) and prefix-tuning (Li and Liang 2021) condition a frozen model with learned continuous vectors that need not correspond to any word, which is the weights-untouched reconfiguration the paper credits to inscription, achieved without inscription. Activation addition (Turner et al. 2023) adds to the forward pass a vector computed by contrasting activations on a pair of prompts such as "Love" and "Hate", with no optimization at all. Anthropic's Golden Gate Claude (23 May 2024) turned up a single internal feature in Claude 3 Sonnet, after which the bridge kept surfacing in its answers, relevant or not; Anthropic described this as a change to internal activations rather than a prompt or fine-tuning. If anything deserves the paper's phrase "a small, localized master signifier" (p. 340), it is this, installed by arithmetic. Automatic prompt engineering (Zhou et al. 2023) treats an instruction as a program and optimizes it by searching over candidates that a model proposes. And on the findings about task vectors (Hendel et al. 2023), in-context demonstrations are compressed into a single vector that modulates the model, which suggests that what a prompt does can be carried by an activation state.

Two things follow. First, the same reconfigurations of a model's output space can be reached by calculation as well as by metaphor, which weakens the step from "metaphor is a powerful lever" to "literary practice has become infrastructural". A lever that calculation can replace is not infrastructural in the strong sense the paper intends. Second, automatic prompt engineering computes linguistic prompts, and nothing prevents its candidates from being metaphorical, which puts pressure on the non-calculability of metaphor itself.

#### The paper's reply, and its cost

The paper has a reply, and it is a good one. Its notion of quasi-endogenous inscription (p. 344) already covers loops in which outputs re-enter as prompts: such loops remain engineered protocols whose targets someone has set. Steering vectors are extracted from word prompts, soft prompts are trained on tasks that people define, and adversarial search optimizes toward a string that someone chose. Language and human purpose sit upstream of every case.

The reply has a cost, however. What remains non-calculable is then the positing of ends, what anyone wants the model to say, and not metaphor as a medium. "The Question Concerning Technology" is precisely about that distinction, since it grants that the instrumental definition of technology is correct while denying that it reaches technology's essence. Whether positing ends escapes Gestell is Heidegger's question, and language models do not settle it.

#### Poetics as standing-reserve

Heidegger's essay ends by locating the saving power in a realm akin to the essence of technology and yet fundamentally different from it, namely art, and it cites Hölderlin's "Patmos": Wo aber Gefahr ist, wächst / Das Rettende auch. The paper's ending repeats that gesture with language models as the occasion.

My reading, which I mark as mine, is that the repetition has a twist the paper does not register. Heidegger makes art a saving realm only on condition that reflection on art does not close its eyes to the constellation of truth; he anticipated that poiesis could itself be absorbed. For the paper, metaphor matters because it reliably reconfigures output, and literary practice has become "infrastructural" (p. 346). A practice valued as a dependable lever on a system is a practice ordered as standing-reserve. That is Gestell absorbing poetics, the very danger Heidegger names, rather than an exception to it. The paper concedes that session-level reconfiguration stays within Gestell (p. 346) and then exempts metaphor, and I do not think the exemption survives its own word "infrastructural".

#### The labor-market paragraph

The paragraph on work (p. 346) makes claims about computer-science graduates, medicine, law and the humanities without citations. Some early evidence is consistent with the first claim. Using records from the largest payroll-software provider in the United States, Brynjolfsson, Chandar and Chen (Stanford, August 2025) report a 13 percent relative decline in employment for workers aged 22 to 25 in the occupations most exposed to AI, while less exposed and more experienced workers held steady or grew, and they present this as early evidence consistent with that hypothesis. Nothing comparable is offered for the renewed centrality of philosophy and literature. And if prompt optimization automates the lever, that centrality may be shorter-lived than the paper hopes.

### What the paper gets right

My objections concern mappings and evidence. The paper's core distinctions are sound, and several are better than much of what is written on the subject.

It locates the action correctly. Prompting works at inference time, through hidden states, while the weights stay fixed, and the paper keeps that distinction in view throughout (pp. 333, 340, 342). Its concept of a weak technical event names what in-context conditioning does without inflating it into an Event or a subject and without deflating it into mere statistics, and Close reading IV suggests that the concept can be given formal content. It starts from a productive baseline, language in its automatic, non-authentic mode (p. 333), which asks what language does when nobody in particular is speaking rather than whether machines are conscious.

Its description of models as "extraordinarily weak to language" (p. 333) fits measured work. Sclar et al. (ICLR 2024) found few-shot accuracy differences of up to 76 points for LLaMA-2-13B from formatting changes alone, even if the paper's own demonstrations still need controls. And by drawing on the philosophy of engineering (footnote 23), the paper treats LLMs as implicit theories of language built for a function rather than as explanations of language, which keeps it from asking the models for more than they can give.

The paper is also honest about the status of its examples, calling the jailbreak case anecdotal (footnote 27) and trying, in footnote 22, to ground the metaphor claim in mechanism rather than in analogy alone. Its argument about the machine's zero is less secure than it looks, as Close reading IV argues, but it points at a real question: where the difference between handling a mark and reading it as a lack is located. And the summary line is right. Language models give "the schematics of the Event. But not the engine" (p. 345). After all my corrections, I would still sign that sentence.

### Errata and bibliographic notes

The bibliographic items below were checked against the catalogue, publisher and proceedings records listed under References, and the typos against the PDF.

Five bibliographic details need correcting. In footnote 22 and entry 20 of the bibliography, Meng et al. are cited from Advances in Neural Information Processing Systems 36 (NeurIPS 2022); the proceedings of NeurIPS 2022, the thirty-sixth conference, form volume 35, which probably explains the slip, and the page range 17359–17372 is correct. In footnote 6 and entry 16, Kramer's preprint appears as arXiv 2502.0190, a truncated identifier; the correct one is arXiv:2502.01901. In footnote 16 and entry 15, the volume containing Jakobson's chapter appears as Metaphor and Metonymy in Contrast, edited by René Dirven and "Ralf Pöring"; the title is Metaphor and Metonymy in Comparison and Contrast and the editor's name is Ralf Pörings (Mouton de Gruyter, hardcover 2002, paperback 2003). Entry 25, Yan et al. (ACL 2025), is never cited in the text or the notes, although it is the source closest to the Maldoror case. And in footnote 15 and entry 2 the title of Bender et al. is cut short; it continues "Can Language Models Be Too Big?".

The bibliography also omits the translators of Being and Time (Joan Stambaugh) and of both Lacan seminars (Russell Grigg). One item I first suspected turned out to be defensible: the paper dates the Norton translation of Seminar XVII to 2006, and bookseller metadata gives 17 December 2006 for the hardcover, although many catalogues give 2007.

There are four typos. Footnote 21 has "where extracted" for "were extracted"; page 343 has "an input that confirms closely to the existing baseline" for "conforms"; footnote 27 has "a well know jailbreak" for "well-known"; and page 345 has "the models pliability" for "the model's".

The substantive slips are discussed in the close readings and are gathered here only so they can be found. Footnote 22 says that feed-forward layers "overwrite" embeddings, a mechanism its source does not describe (Toolkit 2), and that metaphor substitutes "via displacement", whereas Lacan pairs metaphor with condensation (Close reading II). Page 334 attributes articulation to language where §34 attributes it to discourse, and page 333 renders Heidegger's "realest subject" as ens realissimum (Close reading I). Page 335 cites lecture courses from 1923–24 and 1929–30 as evidence of Heidegger's later philosophy (Close reading I). Page 341 calls a failure of recall a refusal (Close reading III). Page 343 calls an improbable shift "strictly impossible" (Close reading IV). Page 341 credits the term "machinic unconscious" to psychoanalysis rather than to Guattari (Close reading II). And page 335 speaks of a "complex Euclidean space", although embeddings are real-valued and their similarity is usually measured by angle; presumably "complex" means complicated, but the wording invites misreading.

### Open questions, and what I would run next

The paper's thesis is testable in places, which is rare in this genre, and several questions follow from the corrections above.

The empirical ones come first. The neon protocol of Close reading III should be run over many items, novel metaphors, conventional metaphors, literal pairs and random pairs, with standardized similarity and percentile rank; the paper predicts a distinctive convergence for metaphors, while anisotropy predicts none. A second experiment would decide the Yoda question: train a structural probe, with control tasks, on a model's ordinary-prose activations and test it on Yoda-mode activations. If the tree geometry survives, the claim that grammar "can be displaced" (p. 340) fails; if it collapses, the paper gains real support. The Maldoror case needs to become a distribution, with each prompt sampled many times against neutral, random and literary prefixes. Garden-path sentences, which fix their meaning only at the last word, would test the claim in Close reading II that decoders quilt only at the end of a chain, by comparing where a decoder and an encoder resolve them. And task vectors offer a direct test of the inscription thesis. If the effect of a metaphorical prompt can be patched into the model as an activation without the prompt, what remains of the claim that metaphor works only as inscription?

The philosophical questions are harder. Can attention weights, or standardized similarities, serve as a working stand-in for Badiou's degrees of identity, so that the weak technical event could be stated in his own formal terms? Does architectural invariance settle anything? The paper argues that scaffolding changes only "the circuitry of inscription", because everything still passes through the same invariant process of tokenizing, attending and predicting (p. 342). Brains are not invariant in that way, since synaptic plasticity changes them while they run, but every physical system runs on some invariant dynamics, so invariance alone cannot be what rules out world-disclosure, and the paper needs to say which further feature does. Finally, is the self-feeding loop that the paper calls quasi-endogenous (p. 344) a candidate site? A process whose outputs re-enter its own inputs at least resembles a multiple that counts itself, and I do not know whether the resemblance survives scrutiny.

<iframe src="/files/heimann-violent-hermeneutics.pdf" title="Violent Hermeneutics (PDF)" style="width:100%;height:80vh;border:1px solid #e5e5e5;border-radius:8px;margin:1.5rem 0;" loading="lazy"></iframe>

