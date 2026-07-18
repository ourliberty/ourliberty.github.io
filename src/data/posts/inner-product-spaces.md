---
title: |-
  Linear Algebra Ch4
  Inner Product Spaces
excerpt: 'Length, distance, angle, and orthogonality from a single axiom: Cauchy-Schwarz, orthogonal complements, projection and best approximation, Gram-Schmidt, and the cross product.'
date: '2026-07-17'
category: study
subcategory: mathematics
keywords: ['linear algebra', 'inner product', 'orthogonality', 'Gram-Schmidt', 'projection']
---

Based on Anton & Rorres, "Elementary Linear Algebra with Supplemental Applications" (12th ed.), Larson, "Elementary Linear Algebra" (8th ed., metric version), and Stewart, "Calculus: Early Transcendentals" for the geometry of $\mathbb{R}^3$. A continuation of the essays on Chapters 1–3, whose notation and results are used freely.

The vector spaces of Chapter 3 have algebra but no geometry. One can add vectors and scale them, form spans and bases and dimensions, but one cannot ask how long a vector is, or what angle two vectors make, or whether they are perpendicular, because nothing in the eight axioms mentions such things. The present chapter installs the missing geometry, and it does so with characteristic economy: a single additional piece of structure, the inner product, from which length, distance, angle, and orthogonality all flow as definitions, and the classical theorems of Euclidean geometry (Pythagoras, the triangle inequality, the parallelogram law) as consequences. The chapter's arc runs from the axioms and a gallery of examples (including inner products on spaces of matrices, polynomials, and continuous functions), through the Cauchy–Schwarz inequality that makes angles well-defined, into the theory of orthogonal complements and projections, and culminates in the Gram–Schmidt process, which manufactures orthonormal bases at will. A coda on the cross product ties the algebra back to the concrete geometry of $\mathbb{R}^3$ and to the determinants of Chapter 2, and the master equivalence theorem receives two further faces. As before, I have proved what can be proved at this level and verified every computation more than once.

## 1. From the Dot Product to the Axioms

### 1.1 The Euclidean inner product

Definition 4.1. For vectors $\vec{u} = (u_1, \dots, u_n)$ and $\vec{v} = (v_1, \dots, v_n)$ in $\mathbb{R}^n$, the Euclidean inner product (or dot product) is

$$
\vec{u} \bullet \vec{v} = u_1v_1 + u_2v_2 + \cdots + u_nv_n = \sum_{i=1}^n u_iv_i,
$$

multiply matching components, add everything up, and receive a single number. That the output is a scalar, not a vector, is the first thing to fix in one's mind: the dot product is a machine that eats two vectors and reports one real number about their mutual disposition.

Theorem 4.2. For $\vec{u}, \vec{v}, \vec{w} \in \mathbb{R}^n$ and $k, l \in \mathbb{R}$:

1. $\vec{v} \bullet \vec{v} \geq 0$, with $\vec{v} \bullet \vec{v} = 0$ if and only if $\vec{v} = \vec{0}$;
2. $\vec{u} \bullet \vec{v} = \vec{v} \bullet \vec{u}$;
3. $\vec{u} \bullet (k\vec{v} + l\vec{w}) = k(\vec{u} \bullet \vec{v}) + l(\vec{u} \bullet \vec{w})$.

Each is a one-line componentwise check. Property (1) holds because $\vec{v} \bullet \vec{v} = v_1^2 + \cdots + v_n^2$ is a sum of squares, nonnegative always, and zero only when every summand, hence every component, vanishes. Property (2) is the commutativity of real multiplication; (3) is distributivity. Nothing deep, and, as with the eight laws of Chapter 3, that is the point. These three properties are about to be promoted from theorem to axiom.

### 1.2 The axioms of an inner product

Definition. Let $(V, +, \cdot)$ be a real vector space. A function

$$
\langle\,\cdot\,,\,\cdot\,\rangle : V \times V \to \mathbb{R}, \qquad (\vec{u}, \vec{v}) \mapsto \langle \vec{u}, \vec{v} \rangle
$$

is an inner product on $V$ if for all $\vec{u}, \vec{v}, \vec{w} \in V$ and $k, l \in \mathbb{R}$:

1. (positivity) $\langle \vec{u}, \vec{u} \rangle \geq 0$, and $\langle \vec{u}, \vec{u} \rangle = 0 \iff \vec{u} = \vec{0}$;
2. (symmetry) $\langle \vec{u}, \vec{v} \rangle = \langle \vec{v}, \vec{u} \rangle$;
3. (linearity in the first slot) $\langle k\vec{u} + l\vec{v}, \vec{w} \rangle = k\langle \vec{u}, \vec{w} \rangle + l\langle \vec{v}, \vec{w} \rangle$.

A vector space equipped with an inner product is an inner product space.

The abstraction repeats, deliberately, the maneuver of Chapter 3: observe which properties do the work, then define the class of all structures having them. Note that symmetry converts one-sided linearity into two-sided; combining (2) and (3),

$$
\langle \vec{w}, k\vec{u} + l\vec{v} \rangle = k\langle \vec{w}, \vec{u} \rangle + l\langle \vec{w}, \vec{v} \rangle,
$$

so an inner product is linear in each slot separately (it is bilinear), a fact used silently in every computation below. Two further consequences (Remark 4.3), each a specialization of bilinearity: $\langle \vec{u}, \vec{0} \rangle = \langle \vec{0}, \vec{u} \rangle = 0$ (take the scalar $0$; pairing with the zero vector always returns zero), and $\langle \vec{u} - \vec{v}, \vec{w} \rangle = \langle \vec{u}, \vec{w} \rangle - \langle \vec{v}, \vec{w} \rangle$ (take $k = 1$, $l = -1$).

### 1.3 Length, distance, and the norm

Geometry now enters, by definition.

Definition 4.4. In a real inner product space $V$: the norm (or length) of $\vec{u}$ is

$$
\|\vec{u}\| = \sqrt{\langle \vec{u}, \vec{u} \rangle};
$$

the distance between $\vec{u}$ and $\vec{v}$ is $d(\vec{u}, \vec{v}) = \|\vec{u} - \vec{v}\|$; and $\vec{u}$ is a unit vector if $\|\vec{u}\| = 1$.

The square root exists because positivity guarantees $\langle \vec{u}, \vec{u} \rangle \geq 0$; the axiom earns its keep in the very first definition. In $\mathbb{R}^2$ and $\mathbb{R}^3$ with the dot product, the norm is the Pythagorean length $\sqrt{u_1^2 + u_2^2}$ or $\sqrt{u_1^2 + u_2^2 + u_3^2}$ and the distance is the usual distance between points; the definitions are calibrated to reproduce the geometry we already trust, and then to export it to spaces where the eye fails: polynomials, matrices, functions.

Theorem 4.5 (properties of the norm). For vectors $\vec{u}, \vec{v}$ in an inner product space and $k \in \mathbb{R}$:

1. $\|\vec{u}\| \geq 0$, with $\|\vec{u}\| = 0 \iff \vec{u} = \vec{0}$;
2. $\|k\vec{u}\| = |k|\,\|\vec{u}\|$;
3. (parallelogram law) $\|\vec{u} + \vec{v}\|^2 + \|\vec{u} - \vec{v}\|^2 = 2\big(\|\vec{u}\|^2 + \|\vec{v}\|^2\big)$;
4. (polarization identity) $\displaystyle \langle \vec{u}, \vec{v} \rangle = \tfrac{1}{4}\big(\|\vec{u} + \vec{v}\|^2 - \|\vec{u} - \vec{v}\|^2\big)$.

Proof. (1) restates positivity through the square root; (2) follows from bilinearity, $\|k\vec{u}\|^2 = \langle k\vec{u}, k\vec{u} \rangle = k^2\|\vec{u}\|^2$, and $\sqrt{k^2} = |k|$, the absolute value being obligatory, since lengths do not go negative when vectors reverse. For (3) and (4), expand both squared norms by bilinearity and symmetry:

$$
\|\vec{u} \pm \vec{v}\|^2 = \langle \vec{u} \pm \vec{v},\, \vec{u} \pm \vec{v} \rangle = \|\vec{u}\|^2 \pm 2\langle \vec{u}, \vec{v} \rangle + \|\vec{v}\|^2.
$$

Adding the two expansions cancels the cross terms and yields (3); subtracting them isolates the cross term, $\|\vec{u}+\vec{v}\|^2 - \|\vec{u}-\vec{v}\|^2 = 4\langle \vec{u}, \vec{v} \rangle$, which is (4). $\square$

The displayed expansion $\|\vec{u} + \vec{v}\|^2 = \|\vec{u}\|^2 + 2\langle \vec{u}, \vec{v}\rangle + \|\vec{v}\|^2$ is the single most-used identity of the chapter, the vector analogue of $(a+b)^2 = a^2 + 2ab + b^2$, and the reader should be able to produce it in sleep. As for the two named identities: the parallelogram law says the diagonals and sides of a parallelogram satisfy $d_1^2 + d_2^2 = 2(a^2 + b^2)$, an honest theorem of plane geometry now valid in every inner product space; and the polarization identity says something conceptually striking, that the inner product is recoverable from the norm alone. Lengths determine angles. Whoever knows how long every vector is already knows, implicitly, the entire inner product.

### 1.4 Matrix multiplication, seen through the dot product

Example 4.6. If $A$ is $m \times r$ with rows $\vec{r}_1, \dots, \vec{r}_m$ and $B$ is $r \times n$ with columns $\vec{c}_1, \dots, \vec{c}_n$, then

$$
AB = \begin{bmatrix}
\vec{r}_1 \bullet \vec{c}_1 & \vec{r}_1 \bullet \vec{c}_2 & \cdots & \vec{r}_1 \bullet \vec{c}_n \\
\vec{r}_2 \bullet \vec{c}_1 & \vec{r}_2 \bullet \vec{c}_2 & \cdots & \vec{r}_2 \bullet \vec{c}_n \\
\vdots & \vdots & & \vdots \\
\vec{r}_m \bullet \vec{c}_1 & \vec{r}_m \bullet \vec{c}_2 & \cdots & \vec{r}_m \bullet \vec{c}_n
\end{bmatrix}.
$$

This is not a new theorem but a new pair of eyes: the sum $\sum_k a_{ik}b_{kj}$ defining $(AB)_{ij}$ in Chapter 1 is the dot product of the $i$-th row of $A$ with the $j$-th column of $B$. The "row against column" mnemonic taught to every beginner was the Euclidean inner product all along, and the identity $\vec{u} \bullet \vec{v} = \vec{v}^T\vec{u}$ (for columns $\vec{u}, \vec{v}$) will let us shuttle between inner-product language and matrix language whenever convenient, as in the very next section.

## 2. A Gallery of Inner Products

Example 4.7. The force of the axiomatization lies, as in Chapter 3, in the breadth of the examples. In each case the two easy axioms (symmetry, bilinearity) are routine; the axiom that must be watched is positivity, and the verifications below dwell on it deliberately.

(1) The Euclidean inner product on $\mathbb{R}^n$, the founding example, certified by Theorem 4.2.

(2) Weighted Euclidean inner products. Fix positive reals $w_1, \dots, w_n$, the weights, and set

$$
\langle \vec{u}, \vec{v} \rangle = w_1u_1v_1 + w_2u_2v_2 + \cdots + w_nu_nv_n.
$$

Symmetry and bilinearity are as before; positivity holds because $\langle \vec{u}, \vec{u} \rangle = \sum_i w_iu_i^2$ is a sum of nonnegative terms vanishing only when every $u_i = 0$, and this is exactly where the positivity of the weights is spent. Allow a single $w_i = 0$ and the vector $\vec{e}_i \neq \vec{0}$ has $\langle \vec{e}_i, \vec{e}_i \rangle = 0$; allow $w_i < 0$ and positivity fails outright. Weighted inner products are the natural tool when the components of a vector are measured in different units or carry different importance; the geometry of $\mathbb{R}^n$ is not unique, and the axioms tell us precisely which alternatives are legitimate.

(3) Inner products generated by matrices. For $A \in GL(n, \mathbb{R})$, define

$$
\langle \vec{u}, \vec{v} \rangle_A = (A\vec{u}) \bullet (A\vec{v}) = (A\vec{v})^T A\vec{u} = \vec{v}^T A^TA\,\vec{u} = (A^TA\,\vec{u}) \bullet \vec{v},
$$

the chain of equalities using $\vec{x} \bullet \vec{y} = \vec{y}^T\vec{x}$ and $(A\vec{v})^T = \vec{v}^TA^T$ from Chapter 1. In words: transform both vectors by $A$, then take the ordinary dot product. Symmetry and bilinearity are inherited from the dot product and the linearity of $\vec{x} \mapsto A\vec{x}$. Positivity: $\langle \vec{u}, \vec{u} \rangle_A = \|A\vec{u}\|^2 \geq 0$, with equality iff $A\vec{u} = \vec{0}$, which, because $A$ is invertible and only because of that, forces $\vec{u} = \vec{0}$ (the equivalence theorem: trivial null space). The hypothesis $A \in GL(n,\mathbb{R})$ is thus not decoration but the exact price of positivity. The weighted products of (2) are the special case $A = \mathrm{diag}(\sqrt{w_1}, \dots, \sqrt{w_n})$.

(4) The trace inner product on matrices. On $\mathrm{Mat}_{m\times n}(\mathbb{R})$,

$$
\langle A, B \rangle = \operatorname{tr}(A^TB) = \operatorname{tr}(B^TA) = \sum_{i=1}^m\sum_{j=1}^n a_{ij}b_{ij}.
$$

The rightmost expression identifies the recipe: multiply corresponding entries and sum, the Euclidean inner product of the two matrices read as vectors of $\mathbb{R}^{mn}$, which is why all three axioms hold at once (they hold in $\mathbb{R}^{mn}$). The trace formulas are verified by computing a diagonal entry: $(A^TB)_{jj} = \sum_i (A^T)_{ji}b_{ij} = \sum_i a_{ij}b_{ij}$, and summing over $j$ sweeps up every position; the second equality is $\operatorname{tr}(X^T) = \operatorname{tr}(X)$ applied to $X = A^TB$, or Theorem 1.27. The associated norm $\|A\| = \sqrt{\sum_{i,j}a_{ij}^2}$ is the Frobenius norm, ubiquitous in numerical work.

(5) A coefficientwise inner product on $\mathcal{P}_n[x]$. For $\vec{p} = a_0 + a_1x + \cdots + a_nx^n$ and $\vec{q} = b_0 + b_1x + \cdots + b_nx^n$,

$$
\langle \vec{p}, \vec{q} \rangle = a_0b_0 + a_1b_1 + \cdots + a_nb_n,
$$

the Euclidean inner product of the coefficient vectors, transported through the coordinate isomorphism $\mathcal{P}_n[x] \cong \mathbb{R}^{n+1}$ of Chapter 3. Positivity is immediate: a polynomial whose coefficients all vanish is the zero polynomial.

(6) The integral inner product on $C([a,b])$. On the space of continuous functions,

$$
\langle f, g \rangle = \int_a^b f(x)g(x)\,dx.
$$

Symmetry is the commutativity of pointwise multiplication; bilinearity is the linearity of the integral. Positivity is the subtle one, and its proof is worth spelling out because it is where continuity earns its place in the definition of the space. Certainly $\langle f, f \rangle = \int_a^b f(x)^2\,dx \geq 0$, the integrand being nonnegative. Suppose the integral is zero but $f \not\equiv 0$, say $f(x_0) \neq 0$; by continuity, $f^2 > \tfrac{1}{2}f(x_0)^2$ on some small interval about $x_0$, contributing strictly positive area that the nonnegative integrand elsewhere cannot cancel, a contradiction. Hence $\int f^2 = 0$ forces $f \equiv 0$. (Drop continuity and the argument dies: a function vanishing everywhere except at one point has $\int f^2 = 0$ without being the zero vector. The axioms police the hypotheses.) This example is the gateway to Fourier analysis, as Example 4.25 will hint, and it converts questions about functions (how far apart are two functions? in what sense do polynomials approximate a curve?) into the geometry of this chapter.

## 3. Cauchy–Schwarz and the Notion of Angle

### 3.1 The inequality

The plan is to define the angle between vectors by the formula $\cos\theta = \langle \vec{u}, \vec{v} \rangle / (\|\vec{u}\|\|\vec{v}\|)$, familiar from the plane. But a cosine must lie in $[-1, 1]$, so the plan is legal only if the quotient does, that is, only if the following inequality holds. It is the fundamental inequality of the subject.

Theorem 4.8 (Cauchy–Schwarz). In any real inner product space, for all $\vec{u}, \vec{v}$:

$$
|\langle \vec{u}, \vec{v} \rangle| \;\leq\; \|\vec{u}\|\,\|\vec{v}\|.
$$

Proof. If $\vec{u} = \vec{0}$ both sides vanish and there is nothing to prove. Suppose $\vec{u} \neq \vec{0}$, so $\|\vec{u}\| \neq 0$. For every real $t$, positivity of the inner product gives

$$
0 \;\leq\; \|t\vec{u} + \vec{v}\|^2 \;=\; \langle t\vec{u} + \vec{v},\, t\vec{u} + \vec{v} \rangle \;=\; \|\vec{u}\|^2\,t^2 + 2\langle \vec{u}, \vec{v} \rangle\,t + \|\vec{v}\|^2,
$$

expanding by bilinearity. The right side is a quadratic polynomial in $t$ with positive leading coefficient which never dips below the axis; a quadratic with two distinct real roots would dip below, so the discriminant must be nonpositive:

$$
\big(2\langle \vec{u}, \vec{v} \rangle\big)^2 - 4\|\vec{u}\|^2\|\vec{v}\|^2 \leq 0,
\qquad\text{i.e.}\qquad
\langle \vec{u}, \vec{v} \rangle^2 \leq \|\vec{u}\|^2\|\vec{v}\|^2,
$$

and taking square roots yields the claim. $\square$

The proof deserves admiration for its economy: a single application of positivity, the humblest axiom, to the cleverly chosen family of vectors $t\vec{u} + \vec{v}$, plus the high-school discriminant criterion. And because the argument uses only the axioms, the inequality holds in every inner product space simultaneously. Specializing to the integral inner product of Example 4.7(6) yields, gratis, an inequality of genuine analytic weight:

Corollary 4.9. For continuous $f, g$ on $[a, b]$,

$$
\left(\int_a^b f(x)g(x)\,dx\right)^{2} \;\leq\; \int_a^b f(x)^2\,dx \;\cdot\; \int_a^b g(x)^2\,dx.
$$

One abstract argument, infinitely many concrete inequalities, the dividend of axiomatics, paid in cash.

### 3.2 Angles

Definition. For nonzero vectors $\vec{u}, \vec{v}$ in an inner product space, Cauchy–Schwarz places the quotient $\langle \vec{u}, \vec{v} \rangle / (\|\vec{u}\|\|\vec{v}\|)$ in $[-1, 1]$; since $\cos : [0, \pi] \to [-1, 1]$ is a bijection, there is a unique $\theta \in [0, \pi]$ with

$$
\cos\theta = \frac{\langle \vec{u}, \vec{v} \rangle}{\|\vec{u}\|\,\|\vec{v}\|},
$$

and this $\theta$ is the angle between $\vec{u}$ and $\vec{v}$. The logical order matters and is worth saying once, plainly: in the plane, the angle came first and the cosine formula was a theorem; in a general inner product space, the formula is the definition, and Cauchy–Schwarz is what makes the definition legal. Rearranged, the definition reads $\langle \vec{u}, \vec{v} \rangle = \|\vec{u}\|\|\vec{v}\|\cos\theta$ (Theorem 4.12 for $\mathbb{R}^3$, where it agrees with the law-of-cosines computation of classical vector geometry), and it yields at once a sign dictionary (Theorem 4.13): for nonzero vectors, the inner product is positive exactly when the angle is acute, zero exactly when $\theta = \pi/2$, and negative exactly when the angle is obtuse, the inner product as a protractor reading, coarse but instant.

Example 4.10. Three angle computations, one per habitat.

(1) $\vec{u} = (3,3,3)$, $\vec{v} = (1,0,4)$ in $\mathbb{R}^3$: here $\vec{u} \bullet \vec{v} = 3 + 0 + 12 = 15$, $\|\vec{u}\| = \sqrt{27} = 3\sqrt{3}$, $\|\vec{v}\| = \sqrt{17}$, so

$$
\cos\theta = \frac{15}{3\sqrt{3}\sqrt{17}} = \frac{5}{\sqrt{51}} = \frac{5\sqrt{51}}{51} \approx 0.700.
$$

(2) $\vec{u} = (4,3,1,-2)$, $\vec{v} = (-2,1,2,3)$ in $\mathbb{R}^4$, a four-dimensional angle, invisible to the eye but unproblematic to the definition: $\vec{u} \bullet \vec{v} = -8 + 3 + 2 - 6 = -9$, $\|\vec{u}\| = \sqrt{30}$, $\|\vec{v}\| = \sqrt{18} = 3\sqrt{2}$, so

$$
\cos\theta = \frac{-9}{\sqrt{30}\cdot 3\sqrt{2}} = \frac{-3}{\sqrt{60}} = -\frac{3}{2\sqrt{15}} = -\frac{\sqrt{15}}{10} \approx -0.387,
$$

an obtuse angle, as the negative inner product foretold.

(3) $\vec{u} = x$, $\vec{v} = x^3$ in $C[-1,1]$ with the integral inner product, an angle between two functions:

$$
\langle x, x^3 \rangle = \int_{-1}^1 x^4\,dx = \frac{2}{5}, \qquad
\|x\| = \left(\int_{-1}^1 x^2\,dx\right)^{1/2} = \sqrt{\tfrac{2}{3}}, \qquad
\|x^3\| = \left(\int_{-1}^1 x^6\,dx\right)^{1/2} = \sqrt{\tfrac{2}{7}},
$$

so

$$
\cos\theta = \frac{2/5}{\sqrt{2/3}\,\sqrt{2/7}} = \frac{2/5}{2/\sqrt{21}} = \frac{\sqrt{21}}{5} \approx 0.917.
$$

The two odd functions $x$ and $x^3$ hug each other on $[-1,1]$, and the geometry quantifies the hug, dutifully staying below $1$, as Cauchy–Schwarz insists.

### 3.3 Orthogonality, Pythagoras, and the triangle inequality

Definition 4.11. Two nonzero vectors $\vec{u}, \vec{v}$ are orthogonal (perpendicular) if $\langle \vec{u}, \vec{v} \rangle = 0$, the angle-$\pi/2$ case of the dictionary, and by convention the zero vector is declared orthogonal to everything. At the opposite extreme, $\vec{u}$ and $\vec{v}$ are parallel, written $\vec{u} \,/\!/\, \vec{v}$, if one is a scalar multiple of the other.

Theorem 4.14. In any real inner product space:

1. (triangle inequality) $\|\vec{u} + \vec{v}\| \leq \|\vec{u}\| + \|\vec{v}\|$;
2. (generalized Pythagoras) if $\vec{u} \perp \vec{v}$, then $\|\vec{u} + \vec{v}\|^2 = \|\vec{u}\|^2 + \|\vec{v}\|^2$.

Proof. Both from the master expansion $\|\vec{u} + \vec{v}\|^2 = \|\vec{u}\|^2 + 2\langle \vec{u}, \vec{v} \rangle + \|\vec{v}\|^2$. For (1), bound the cross term by Cauchy–Schwarz:

$$
\|\vec{u} + \vec{v}\|^2 \leq \|\vec{u}\|^2 + 2\|\vec{u}\|\|\vec{v}\| + \|\vec{v}\|^2 = \big(\|\vec{u}\| + \|\vec{v}\|\big)^2,
$$

and take square roots. For (2), the cross term $2\langle \vec{u}, \vec{v} \rangle$ vanishes by orthogonality, and the expansion is the conclusion. $\square$

Observe the division of labor. The triangle inequality (no detour is shorter than the straight path) is Cauchy–Schwarz in kinetic form; Pythagoras is the observation that orthogonality kills the cross term, and this cross-term-killing is the mechanism behind every computation in the remainder of the chapter: it is why orthogonal expansions have clean coefficient formulas, why projections minimize distance, and why Gram–Schmidt works. A two-thousand-year-old theorem about right triangles, revealed as a bookkeeping identity about bilinear forms, and strengthened, since it now applies to polynomials and functions as readily as to legs and hypotenuses.

## 4. Orthogonal Complements and the Fundamental Subspaces

### 4.1 The orthogonal complement

Definition. Let $W$ be a subspace of an inner product space $V$. A vector $\vec{v} \in V$ is orthogonal to $W$ if it is orthogonal to every vector of $W$; the set of all such vectors,

$$
W^{\perp} = \{\vec{v} \in V \mid \langle \vec{v}, \vec{w} \rangle = 0 \ \text{for all } \vec{w} \in W\},
$$

is the orthogonal complement of $W$ (read "$W$ perp"). The extremes calibrate the definition (Remark 4.15): $\{\vec{0}\}^{\perp} = V$ (every vector is orthogonal to the zero vector) and $V^{\perp} = \{\vec{0}\}$ (a vector orthogonal to everything is orthogonal to itself, and $\langle \vec{v}, \vec{v} \rangle = 0$ forces $\vec{v} = \vec{0}$, positivity again). The pictures to carry (Example 4.16): in $\mathbb{R}^2$, the complement of a line through the origin is the perpendicular line through the origin; in $\mathbb{R}^3$, the complement of a plane through the origin is the perpendicular line, and vice versa.

Theorem 4.17. For a subspace $W$ of an inner product space $V$:

1. $W^{\perp}$ is a subspace of $V$;
2. $W \cap W^{\perp} = \{\vec{0}\}$;
3. if $W$ is finite-dimensional, $(W^{\perp})^{\perp} = W$.

Proof. (1) The zero vector qualifies, and if $\vec{v}_1, \vec{v}_2 \perp W$ then $\langle k_1\vec{v}_1 + k_2\vec{v}_2, \vec{w} \rangle = k_1\langle\vec{v}_1,\vec{w}\rangle + k_2\langle\vec{v}_2,\vec{w}\rangle = 0$ for every $\vec{w} \in W$, the subspace test, powered by bilinearity. (2) A vector $\vec{v}$ in both is orthogonal to itself: $\langle \vec{v}, \vec{v} \rangle = 0$, so $\vec{v} = \vec{0}$; a subspace and its complement share nothing but the origin. (3) One inclusion is formal: any $\vec{w} \in W$ satisfies $\langle \vec{u}, \vec{w} \rangle = 0$ for all $\vec{u} \in W^{\perp}$ by the very definition of $W^\perp$, hence $\vec{w} \in (W^{\perp})^{\perp}$, giving $W \subseteq (W^{\perp})^{\perp}$. The reverse inclusion borrows the projection theorem proved below (Theorem 4.34, whose proof is independent of this one): given $\vec{v} \in (W^{\perp})^{\perp}$, decompose $\vec{v} = \vec{w} + \vec{u}$ with $\vec{w} \in W$ and $\vec{u} \in W^{\perp}$; then, pairing with $\vec{u}$,

$$
0 = \langle \vec{v}, \vec{u} \rangle = \langle \vec{w} + \vec{u}, \vec{u} \rangle = \langle \vec{w}, \vec{u} \rangle + \langle \vec{u}, \vec{u} \rangle = 0 + \|\vec{u}\|^2,
$$

the first equality because $\vec{v} \perp W^{\perp} \ni \vec{u}$, the vanishing of $\langle \vec{w}, \vec{u} \rangle$ because $\vec{u} \perp W \ni \vec{w}$. Hence $\vec{u} = \vec{0}$ and $\vec{v} = \vec{w} \in W$. $\square$

The double-perp identity $(W^\perp)^\perp = W$ says that in finite dimensions, orthogonal complementation is a perfect involution, no information is lost in passing to the complement, and $W$ can be reconstituted from $W^\perp$. A practical companion (Theorem 4.18): to test membership of $W^\perp$ when $W = \mathrm{Span}\{\vec{w}_1, \dots, \vec{w}_r\}$, it suffices to check orthogonality against the spanning vectors,

$$
W^{\perp} = \{\vec{u} \in V \mid \langle \vec{w}_i, \vec{u} \rangle = 0 \ \text{for } i = 1, \dots, r\},
$$

since orthogonality to the $\vec{w}_i$ propagates by bilinearity to all their linear combinations. Finitely many equations, infinitely many consequences.

### 4.2 Direct sums

Definition 4.19. Subspaces $U, W$ of $V$ form a direct sum decomposition, written $V = U \oplus W$, if $U + W = V$ and $U \cap W = \{\vec{0}\}$.

Remark 4.20. $V = U \oplus W$ if and only if every $\vec{v} \in V$ can be written as $\vec{v} = \vec{v}_1 + \vec{v}_2$ with $\vec{v}_1 \in U$, $\vec{v}_2 \in W$ in exactly one way. Indeed, $U + W = V$ is existence of the decomposition, and trivial intersection is uniqueness: from two decompositions $\vec{v}_1 + \vec{v}_2 = \vec{v}_1' + \vec{v}_2'$, rearrangement gives $\vec{v}_1 - \vec{v}_1' = \vec{v}_2' - \vec{v}_2$, a vector belonging to both $U$ and $W$, hence $\vec{0}$; conversely a nonzero $\vec{z} \in U \cap W$ manufactures two decompositions of itself, $\vec{z} = \vec{z} + \vec{0} = \vec{0} + \vec{z}$. The symbol $\oplus$ thus flags something stronger than $+$: not merely that the parts jointly fill the whole, but that they do so without redundancy, every vector splitting uniquely.

Theorem 4.21. If $W$ is a subspace of an $n$-dimensional inner product space $V$, then

$$
\dim(W) + \dim(W^{\perp}) = n
\qquad\text{and}\qquad
V = W \oplus W^{\perp}.
$$

The direct-sum assertion is the projection theorem (existence of the split $\vec{v} = \mathrm{proj}_W\vec{v} + (\vec{v} - \mathrm{proj}_W\vec{v})$, §6) together with Theorem 4.17(2) (trivial intersection); the dimension count then follows by concatenating bases of the two summands into a basis of $V$, spanning because $W + W^\perp = V$, independent because a vanishing combination would exhibit a common nonzero element of $W$ and $W^\perp$. The subspace and its complement partition the dimension of the ambient space between them, a conservation law with the same flavor as rank-plus-nullity, and, as the next theorem shows, not merely the same flavor.

### 4.3 The fundamental subspaces of a matrix, orthogonally arranged

Theorem 4.22. For $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$, with the Euclidean inner product throughout:

1. $\mathrm{null}(A)$ and $\mathrm{row}(A)$ are orthogonal complements in $\mathbb{R}^n$;
2. $\mathrm{null}(A^T)$ and $\mathrm{col}(A)$ are orthogonal complements in $\mathbb{R}^m$;
3. consequently $\mathrm{row}(A) \oplus \mathrm{null}(A) = \mathbb{R}^n$ and $\mathrm{col}(A) \oplus \mathrm{null}(A^T) = \mathbb{R}^m$.

Proof of (1). We show $\mathrm{row}(A)^{\perp} = \mathrm{null}(A)$; the claim then follows by the double-perp identity. The pivot of the argument is a re-reading of the matrix–vector product: by Example 4.6, the entries of $A\vec{x}$ are the dot products of the rows of $A$ with $\vec{x}$, so

$$
A\vec{x} = \vec{0} \iff \begin{bmatrix} \vec{r}_1 \bullet \vec{x} \\ \vdots \\ \vec{r}_m \bullet \vec{x} \end{bmatrix} = \begin{bmatrix} 0 \\ \vdots \\ 0 \end{bmatrix} \iff \vec{x} \perp \vec{r}_i \ \text{for every row } \vec{r}_i.
$$

If $\vec{v} \in \mathrm{row}(A)^{\perp}$, then in particular $\vec{v}$ is orthogonal to each row, so by the display $A\vec{v} = \vec{0}$ and $\vec{v} \in \mathrm{null}(A)$. Conversely, if $A\vec{v} = \vec{0}$, then $\vec{v}$ is orthogonal to each row, hence, by Theorem 4.18 (orthogonality to spanning vectors sufficing), to all of $\mathrm{row}(A)$. Part (2) is part (1) applied to $A^T$, whose rows are the columns of $A$; part (3) combines (1), (2) with Theorem 4.21. $\square$

The theorem deserves a moment of stillness. A homogeneous linear system $A\vec{x} = \vec{0}$ has now been geometrized: to solve it is to find all vectors perpendicular to the row space. The null space is not merely "another subspace attached to $A$" but the exact orthogonal shadow of the row space, the two meeting only at the origin and jointly filling $\mathbb{R}^n$, and the rank–nullity theorem of Chapter 3, $\mathrm{rank}(A) + \mathrm{nullity}(A) = n$, is revealed as the dimension count of Theorem 4.21 for this particular complementary pair. Algebra (Chapter 1), dimension theory (Chapter 3), and geometry (this chapter) give three proofs of one identity, each illuminating the others.

Example 4.23. Let $W \leq \mathbb{R}^6$ be spanned by

$$
\vec{w}_1 = (1,3,-2,0,2,0), \quad
\vec{w}_2 = (2,6,-5,-2,4,-3), \quad
\vec{w}_3 = (0,0,5,10,0,15), \quad
\vec{w}_4 = (2,6,0,8,4,18).
$$

Find a basis for $W^{\perp}$.

The theorem converts the problem into Chapter 1 homework: stack the spanning vectors as the rows of a matrix $A$, so that $W = \mathrm{row}(A)$ and hence $W^{\perp} = \mathrm{null}(A)$, and null spaces are computed by row reduction. Eliminating (the reader is invited to reproduce: $r_2 - 2r_1$ and $r_4 - 2r_1$ clear the first column, yielding rows $(0,0,-1,-2,0,-3)$ and $(0,0,4,8,0,18)$; normalizing the former to $(0,0,1,2,0,3)$, the row $r_3 = (0,0,5,10,0,15)$ is exactly $5$ times it and vanishes, while $r_4' - 4\,(0,0,1,2,0,3) = (0,0,0,0,0,6)$ normalizes to $(0,0,0,0,0,1)$; back-elimination finishes) gives the reduced row echelon form

$$
R = \begin{bmatrix}
1 & 3 & 0 & 4 & 2 & 0 \\
0 & 0 & 1 & 2 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 1 \\
0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix},
$$

with leading variables $x_1, x_3, x_6$ and free variables $x_2, x_4, x_5$. Reading the equations $x_1 = -3x_2 - 4x_4 - 2x_5$, $x_3 = -2x_4$, $x_6 = 0$ and setting each free variable in turn to $1$:

$$
\vec{v}_1 = (-3, 1, 0, 0, 0, 0), \qquad
\vec{v}_2 = (-4, 0, -2, 1, 0, 0), \qquad
\vec{v}_3 = (-2, 0, 0, 0, 1, 0),
$$

and $\{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$ is a basis of $\mathrm{null}(A) = W^{\perp}$. Audits, which cost seconds and buy certainty: each $\vec{v}_j$ really is orthogonal to each spanning vector, for instance $\vec{v}_2 \bullet \vec{w}_1 = -4 + 0 + 4 + 0 + 0 + 0 = 0$ and $\vec{v}_3 \bullet \vec{w}_1 = -2 + 0 + 0 + 0 + 2 + 0 = 0$, and the dimensions obey Theorem 4.21: $\dim W = 3$ (three nonzero rows of $R$) and $\dim W^{\perp} = 3$, summing to $6$. $\square$

## 5. Orthogonal and Orthonormal Sets

### 5.1 Definitions and first examples

Definition. A subset $S$ of an inner product space is orthogonal if every pair of distinct vectors in $S$ is orthogonal, and orthonormal if in addition every vector of $S$ is a unit vector. ("Ortho" for the right angles, "normal" for the normalized lengths.) Any orthogonal set of nonzero vectors upgrades to an orthonormal one by dividing each vector by its own norm, a step called normalization, which changes no directions and disturbs no orthogonality, since $\langle \tfrac{\vec{u}}{\|\vec{u}\|}, \tfrac{\vec{v}}{\|\vec{v}\|} \rangle$ is a positive multiple of $\langle \vec{u}, \vec{v} \rangle$.

Example 4.24. In $\mathbb{R}^4$, the pair $\{(-2,3,1,4),\ (1,2,0,-1)\}$ is orthogonal: the dot product is $-2 + 6 + 0 - 4 = 0$. In $\mathbb{R}^3$, the standard basis $\{\vec{i}, \vec{j}, \vec{k}\}$ is orthonormal, mutually perpendicular unit vectors, the prototype the general definitions are modeled on.

Example 4.25. In $C([0, 2\pi])$ with $\langle f, g \rangle = \int_0^{2\pi} f(x)g(x)\,dx$, the trigonometric system

$$
S = \{1,\ \sin x,\ \cos x,\ \sin 2x,\ \cos 2x,\ \dots,\ \sin nx,\ \cos nx\}
$$

is orthogonal: every cross-integral over a full period vanishes ($\int_0^{2\pi}\sin mx\cos nx\,dx = 0$ always, and $\int_0^{2\pi}\sin mx \sin nx\,dx = \int_0^{2\pi}\cos mx\cos nx\,dx = 0$ for $m \neq n$, all by the product-to-sum identities). This unassuming example is the doorway to Fourier series: expanding a function in this orthogonal system, with coefficients computed by the projection formulas of §5.3 below, is Fourier analysis, and the entire apparatus of this chapter (coefficients as inner products, best approximation by projection) transfers verbatim.

### 5.2 Orthogonality implies independence

Theorem 4.26. An orthogonal set $S = \{\vec{v}_1, \dots, \vec{v}_n\}$ of nonzero vectors is linearly independent.

Proof. Suppose $k_1\vec{v}_1 + k_2\vec{v}_2 + \cdots + k_n\vec{v}_n = \vec{0}$. Take the inner product of both sides with a chosen $\vec{v}_i$:

$$
0 = \langle \vec{0}, \vec{v}_i \rangle = \big\langle k_1\vec{v}_1 + \cdots + k_n\vec{v}_n,\ \vec{v}_i \big\rangle = k_1\langle \vec{v}_1, \vec{v}_i\rangle + \cdots + k_n\langle \vec{v}_n, \vec{v}_i \rangle = k_i\langle \vec{v}_i, \vec{v}_i \rangle = k_i\|\vec{v}_i\|^2,
$$

every term with $j \neq i$ dying by orthogonality. Since $\vec{v}_i \neq \vec{0}$, positivity gives $\|\vec{v}_i\|^2 \neq 0$, whence $k_i = 0$; and $i$ was arbitrary. $\square$

The proof introduces the single most useful move in the chapter, pair the equation with a basis vector and watch orthogonality annihilate all terms but one, and the reader will see it again in Theorem 4.28, in the projection theorem, and in Fourier analysis, where it extracts one coefficient at a time from an infinite series. The hypothesis "nonzero" is not removable: any set containing $\vec{0}$ is orthogonal by convention yet dependent. Note also the direction of the theorem: orthogonality (plus nonzero-ness) implies independence, never conversely; $(1,0)$ and $(1,1)$ are independent without being orthogonal. Orthogonality is independence with a protractor: not merely "no vector is a combination of the others," but "every vector is at right angles to the others," a strictly stronger and computationally far friendlier condition.

### 5.3 Orthogonal bases and painless coordinates

Definition. A basis consisting of orthogonal vectors is an orthogonal basis; of orthonormal vectors, an orthonormal basis.

Example 4.27. In $\mathbb{R}^3$, take $\vec{v}_1 = (0,1,0)$, $\vec{v}_2 = (1,0,1)$, $\vec{v}_3 = (1,0,-1)$. Pairwise dot products: $\vec{v}_1 \bullet \vec{v}_2 = 0$, $\vec{v}_1 \bullet \vec{v}_3 = 0$, $\vec{v}_2 \bullet \vec{v}_3 = 1 + 0 - 1 = 0$; the set is orthogonal with nonzero members, hence independent by Theorem 4.26, and three independent vectors in the three-dimensional $\mathbb{R}^3$ form a basis by Theorem 3.44, with no spanning argument needed. This is the standard division of labor: orthogonality supplies independence, dimension count supplies basis-hood.

Why prize orthogonal bases? Because they abolish the labor of finding coordinates. Relative to a general basis, computing $[\vec{u}]_{\mathcal{B}}$ means solving a linear system (Example 3.49 solved one). Relative to an orthogonal basis, each coordinate is a quotient of two inner products, obtained instantly:

Theorem 4.28. Let $V$ be an inner product space and $\vec{u} \in V$.

1. If $\mathcal{B} = \{\vec{u}_1, \dots, \vec{u}_n\}$ is an orthogonal basis for $V$, then

$$
\vec{u} = \frac{\langle \vec{u}, \vec{u}_1 \rangle}{\langle \vec{u}_1, \vec{u}_1 \rangle}\vec{u}_1 + \frac{\langle \vec{u}, \vec{u}_2 \rangle}{\langle \vec{u}_2, \vec{u}_2 \rangle}\vec{u}_2 + \cdots + \frac{\langle \vec{u}, \vec{u}_n \rangle}{\langle \vec{u}_n, \vec{u}_n \rangle}\vec{u}_n.
$$

2. If $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$ is an orthonormal basis, the denominators are $1$ and

$$
\vec{u} = \langle \vec{u}, \vec{v}_1 \rangle\vec{v}_1 + \langle \vec{u}, \vec{v}_2 \rangle\vec{v}_2 + \cdots + \langle \vec{u}, \vec{v}_n \rangle\vec{v}_n.
$$

Proof. Being a basis, $\mathcal{B}$ represents $\vec{u}$ as $\vec{u} = c_1\vec{u}_1 + \cdots + c_n\vec{u}_n$ for unique scalars $c_j$; the only question is what they are. Pair both sides with $\vec{u}_i$, the annihilation move again:

$$
\langle \vec{u}, \vec{u}_i \rangle = c_1\langle \vec{u}_1, \vec{u}_i \rangle + \cdots + c_n\langle \vec{u}_n, \vec{u}_i \rangle = c_i\langle \vec{u}_i, \vec{u}_i \rangle,
$$

so $c_i = \langle \vec{u}, \vec{u}_i \rangle / \langle \vec{u}_i, \vec{u}_i \rangle$, and in the orthonormal case the denominator is $\|\vec{u}_i\|^2 = 1$. $\square$

Definition 4.29. For an orthonormal basis $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$, the coordinate vector of $\vec{u}$ is therefore simply

$$
(\vec{u})_{\mathcal{B}} = \big(\langle \vec{u}, \vec{v}_1 \rangle,\ \langle \vec{u}, \vec{v}_2 \rangle,\ \dots,\ \langle \vec{u}, \vec{v}_n \rangle\big),
$$

coordinates are inner products, one measurement per basis direction, no system solved.

Example 4.30. Find $(\vec{u})_{\mathcal{B}}$ for $\vec{u} = (1,1,1)$ relative to the orthonormal basis of $\mathbb{R}^3$

$$
\vec{v}_1 = (0,1,0), \qquad \vec{v}_2 = \big(-\tfrac{4}{5}, 0, \tfrac{3}{5}\big), \qquad \vec{v}_3 = \big(\tfrac{3}{5}, 0, \tfrac{4}{5}\big).
$$

(One first confirms the credentials: $\|\vec{v}_2\|^2 = \tfrac{16}{25} + \tfrac{9}{25} = 1$ and $\|\vec{v}_3\|^2 = \tfrac{9}{25} + \tfrac{16}{25} = 1$; the pairings $\vec{v}_1 \bullet \vec{v}_2 = \vec{v}_1 \bullet \vec{v}_3 = 0$ and $\vec{v}_2 \bullet \vec{v}_3 = -\tfrac{12}{25} + \tfrac{12}{25} = 0$. Orthonormal indeed.) Three dot products:

$$
\langle \vec{u}, \vec{v}_1 \rangle = 1, \qquad
\langle \vec{u}, \vec{v}_2 \rangle = -\tfrac{4}{5} + \tfrac{3}{5} = -\tfrac{1}{5}, \qquad
\langle \vec{u}, \vec{v}_3 \rangle = \tfrac{3}{5} + \tfrac{4}{5} = \tfrac{7}{5},
$$

so $(\vec{u})_{\mathcal{B}} = \big(1, -\tfrac{1}{5}, \tfrac{7}{5}\big)$. The reassembly check: $1\,\vec{v}_1 - \tfrac{1}{5}\vec{v}_2 + \tfrac{7}{5}\vec{v}_3 = (0,1,0) + \big(\tfrac{4}{25}, 0, -\tfrac{3}{25}\big) + \big(\tfrac{21}{25}, 0, \tfrac{28}{25}\big) = (1, 1, 1)$, on the nose.

## 6. Orthogonal Projection and Best Approximation

### 6.1 Projection onto a single vector

Theorem 4.31 (projection theorem, one-dimensional case). If $\vec{u}, \vec{v}$ are vectors in an inner product space with $\vec{v} \neq \vec{0}$, then $\vec{u}$ decomposes in exactly one way as $\vec{u} = \vec{w}_1 + \vec{w}_2$ where $\vec{w}_1$ is a scalar multiple of $\vec{v}$ and $\vec{w}_2 \perp \vec{v}$.

Proof. The proof is a solved equation. Any candidate has $\vec{w}_1 = k\vec{v}$ for some scalar $k$, and then necessarily $\vec{w}_2 = \vec{u} - k\vec{v}$; the orthogonality demand $\langle \vec{u} - k\vec{v}, \vec{v} \rangle = 0$ unfolds by bilinearity to $\langle \vec{u}, \vec{v} \rangle - k\langle \vec{v}, \vec{v} \rangle = 0$, which, since $\langle \vec{v}, \vec{v} \rangle \neq 0$, has the unique solution

$$
k = \frac{\langle \vec{u}, \vec{v} \rangle}{\langle \vec{v}, \vec{v} \rangle}.
$$

Uniqueness is thereby already proved (no other $k$ works), and existence too: with this $k$, the vectors $\vec{w}_1 = k\vec{v}$ and $\vec{w}_2 = \vec{u} - k\vec{v}$ satisfy both requirements by construction. $\square$

Definition. The two components have names: the orthogonal projection of $\vec{u}$ on $\vec{v}$, and the component of $\vec{u}$ orthogonal to $\vec{v}$,

$$
\mathrm{proj}_{\vec{v}}\vec{u} = \frac{\langle \vec{u}, \vec{v} \rangle}{\langle \vec{v}, \vec{v} \rangle}\,\vec{v},
\qquad
\vec{u} - \mathrm{proj}_{\vec{v}}\vec{u}.
$$

The picture: shine light perpendicular to the line through $\vec{v}$; $\mathrm{proj}_{\vec{v}}\vec{u}$ is the shadow of $\vec{u}$ on that line, and the orthogonal component is the perpendicular dropped from the tip of $\vec{u}$ to its shadow. Notice, too, that the coefficient $k$ is precisely the coefficient formula of Theorem 4.28; an orthogonal expansion is nothing but a sum of one-dimensional projections, a remark the projection theorem of §6.3 will make official.

Example 4.32. Project $\vec{u} = (4, 2)$ onto $\vec{v} = (3, 4)$ in Euclidean $\mathbb{R}^2$. Here $\vec{u} \bullet \vec{v} = 12 + 8 = 20$ and $\vec{v} \bullet \vec{v} = 25$, so

$$
\mathrm{proj}_{\vec{v}}\vec{u} = \frac{20}{25}(3,4) = \frac{4}{5}(3,4) = \Big(\frac{12}{5}, \frac{16}{5}\Big),
$$

with orthogonal component $\vec{u} - \mathrm{proj}_{\vec{v}}\vec{u} = \big(4 - \tfrac{12}{5},\ 2 - \tfrac{16}{5}\big) = \big(\tfrac{8}{5}, -\tfrac{6}{5}\big)$. The audit: $\big(\tfrac{8}{5}, -\tfrac{6}{5}\big) \bullet (3, 4) = \tfrac{24}{5} - \tfrac{24}{5} = 0$, orthogonal as promised, a check one should never skip, since it certifies the entire computation at the cost of one dot product.

Theorem 4.33. Among all multiples of $\vec{v}$, the projection is the nearest one to $\vec{u}$: for any scalar $c \neq \langle \vec{u},\vec{v}\rangle/\langle\vec{v},\vec{v}\rangle$,

$$
d(\vec{u},\, \mathrm{proj}_{\vec{v}}\vec{u}) < d(\vec{u},\, c\vec{v}).
$$

The shadow is the closest point of the line, the one-dimensional case of the best-approximation theorem below, and provable by the same Pythagorean argument, so we defer the proof to Theorem 4.35 and state here only the moral: projection is optimization. The formula does not merely decompose; it minimizes.

### 6.2 Interlude: direction angles and direction cosines

A classical application of the one-dimensional formulas in $\mathbb{R}^3$. The direction angles of a nonzero $\vec{a} = (a_1, a_2, a_3)$ are the angles $\alpha, \beta, \gamma \in [0, \pi]$ that $\vec{a}$ makes with the positive $x$-, $y$-, and $z$-axes; their cosines are its direction cosines. By the angle formula against the unit vectors $\vec{i}, \vec{j}, \vec{k}$,

$$
\cos\alpha = \frac{\vec{a} \bullet \vec{i}}{\|\vec{a}\|\,\|\vec{i}\|} = \frac{a_1}{\|\vec{a}\|}, \qquad
\cos\beta = \frac{a_2}{\|\vec{a}\|}, \qquad
\cos\gamma = \frac{a_3}{\|\vec{a}\|},
$$

whence

$$
\cos^2\alpha + \cos^2\beta + \cos^2\gamma = \frac{a_1^2 + a_2^2 + a_3^2}{\|\vec{a}\|^2} = 1,
$$

the three direction cosines are never independent data; they are constrained to the unit sphere. Indeed, assembling them,

$$
(\cos\alpha, \cos\beta, \cos\gamma) = \frac{1}{\|\vec{a}\|}\,\vec{a},
$$

the direction cosines of $\vec{a}$ are exactly the components of the unit vector in its direction: normalize a vector and its coordinates become the cosines of its tilts against the axes. A vector in space is thus completely specified by its length and its three direction cosines, $\vec{a} = \|\vec{a}\|(\cos\alpha, \cos\beta, \cos\gamma)$, magnitude and attitude.

### 6.3 Projection onto a subspace

Theorem 4.34 (projection theorem). Let $W$ be a finite-dimensional subspace of an inner product space $V$ and $\vec{u} \in V$. Then there exist unique vectors $\vec{w}_1 \in W$ and $\vec{w}_2 \in W^{\perp}$ with $\vec{u} = \vec{w}_1 + \vec{w}_2$. Moreover, if $\{\vec{v}_1, \dots, \vec{v}_m\}$ is an orthogonal basis for $W$, then

$$
\vec{w}_1 = \frac{\langle \vec{u}, \vec{v}_1 \rangle}{\langle \vec{v}_1, \vec{v}_1 \rangle}\vec{v}_1 + \frac{\langle \vec{u}, \vec{v}_2 \rangle}{\langle \vec{v}_2, \vec{v}_2 \rangle}\vec{v}_2 + \cdots + \frac{\langle \vec{u}, \vec{v}_m \rangle}{\langle \vec{v}_m, \vec{v}_m \rangle}\vec{v}_m,
$$

the denominators becoming $1$ when the basis is orthonormal.

Proof of existence. Let $\{\vec{v}_1, \dots, \vec{v}_m\}$ be an orthogonal basis of $W$ (one exists by Theorem 4.36 below, whose proof is independent). Define $\vec{w}_1$ by the displayed formula, a linear combination of basis vectors of $W$, hence in $W$, and set $\vec{w}_2 = \vec{u} - \vec{w}_1$. To see $\vec{w}_2 \in W^{\perp}$, it suffices (Theorem 4.18) to check orthogonality against the basis: for each $i$,

$$
\langle \vec{w}_2, \vec{v}_i \rangle = \langle \vec{u}, \vec{v}_i \rangle - \langle \vec{w}_1, \vec{v}_i \rangle
= \langle \vec{u}, \vec{v}_i \rangle - \Big\langle \frac{\langle \vec{u}, \vec{v}_i \rangle}{\langle \vec{v}_i, \vec{v}_i \rangle}\vec{v}_i,\ \vec{v}_i \Big\rangle
= \langle \vec{u}, \vec{v}_i \rangle - \langle \vec{u}, \vec{v}_i \rangle = 0,
$$

the middle equality because, in the pairing of the big sum $\vec{w}_1$ with $\vec{v}_i$, orthogonality annihilates every term except the $i$-th, the same one-survivor mechanism as always. Uniqueness is the direct-sum criterion (Remark 4.20): two decompositions would produce a nonzero vector in $W \cap W^{\perp}$, forbidden by Theorem 4.17(2). $\square$

Definition. In the situation of the theorem, $\vec{w}_1 =: \mathrm{proj}_W\vec{u}$ is the orthogonal projection of $\vec{u}$ on $W$ and $\vec{w}_2 =: \mathrm{proj}_{W^{\perp}}\vec{u}$ its component orthogonal to $W$, so that every vector splits as

$$
\vec{u} = \mathrm{proj}_W\vec{u} + \mathrm{proj}_{W^{\perp}}\vec{u},
$$

which is exactly the decomposition $V = W \oplus W^{\perp}$ of Theorem 4.21, now with formulas attached. One caution embedded in the formulas: the coefficient recipe presupposes an orthogonal basis of $W$. Fed a general basis, the sum of one-dimensional projections need not land on $\mathrm{proj}_W\vec{u}$ at all, which is one of the two reasons the Gram–Schmidt process of §7 exists.

### 6.4 The best approximation theorem

Theorem 4.35. Let $W$ be a finite-dimensional subspace of an inner product space $V$ and $\vec{b} \in V$. Then for every $\vec{w} \in W$ with $\vec{w} \neq \mathrm{proj}_W\vec{b}$,

$$
\|\vec{b} - \mathrm{proj}_W\vec{b}\| < \|\vec{b} - \vec{w}\|,
$$

the projection is the unique closest point of $W$ to $\vec{b}$.

Proof. Split the error against an arbitrary competitor $\vec{w}$ into two pieces:

$$
\vec{b} - \vec{w} = \big(\vec{b} - \mathrm{proj}_W\vec{b}\big) + \big(\mathrm{proj}_W\vec{b} - \vec{w}\big).
$$

The first piece lies in $W^{\perp}$ (it is the orthogonal component of $\vec{b}$); the second lies in $W$ (difference of two vectors of $W$). Orthogonal pieces obey Pythagoras (Theorem 4.14(2)):

$$
\|\vec{b} - \vec{w}\|^2 = \|\vec{b} - \mathrm{proj}_W\vec{b}\|^2 + \|\mathrm{proj}_W\vec{b} - \vec{w}\|^2,
$$

and since $\vec{w} \neq \mathrm{proj}_W\vec{b}$ the second summand is strictly positive, forcing $\|\vec{b} - \vec{w}\|^2 > \|\vec{b} - \mathrm{proj}_W\vec{b}\|^2$. $\square$

Three lines, resting entirely on Pythagoras, and carrying remarkable freight. This theorem is the engine of least squares: when a system $A\vec{x} = \vec{b}$ is inconsistent (as overdetermined data-fitting systems almost always are), the best one can do is solve $A\vec{x} = \mathrm{proj}_{\mathrm{col}(A)}\vec{b}$, replacing an unreachable target by the nearest reachable one, and Theorem 4.35 is the precise statement that "nearest" means what it says and is achieved uniquely. Regression lines, Fourier truncations, and every "closest fit" in applied mathematics are instances of this one geometric sentence: drop a perpendicular.

## 7. The Gram–Schmidt Process

### 7.1 Existence of orthonormal bases

Theorem 4.36. Every nonzero finite-dimensional inner product space has an orthonormal basis.

Proof. Since normalizing an orthogonal basis $\{\vec{v}_1, \dots, \vec{v}_n\}$ (replacing each $\vec{v}_i$ by $\vec{v}_i/\|\vec{v}_i\|$) produces an orthonormal one, it suffices to construct an orthogonal basis, and the construction proceeds by successive projection. Start from any ordered basis $\{\vec{u}_1, \dots, \vec{u}_n\}$ of $V$.

Step 1. Set $\vec{v}_1 = \vec{u}_1$.

Step 2. Let $W_1 = \mathrm{Span}\{\vec{v}_1\}$ and subtract from $\vec{u}_2$ its shadow on $W_1$:

$$
\vec{v}_2 = \vec{u}_2 - \mathrm{proj}_{W_1}\vec{u}_2 = \vec{u}_2 - \frac{\langle \vec{u}_2, \vec{v}_1 \rangle}{\langle \vec{v}_1, \vec{v}_1 \rangle}\vec{v}_1.
$$

By the projection theorem, $\vec{v}_2 \in W_1^{\perp}$, i.e. $\vec{v}_2 \perp \vec{v}_1$. And $\vec{v}_2 \neq \vec{0}$: otherwise $\vec{u}_2 = \mathrm{proj}_{W_1}\vec{u}_2 \in W_1 = \mathrm{Span}\{\vec{u}_1\}$, contradicting the independence of the original basis. Moreover $\mathrm{Span}\{\vec{v}_1, \vec{v}_2\} = \mathrm{Span}\{\vec{u}_1, \vec{u}_2\}$, since each pair is expressible through the other.

Step 3. Let $W_2 = \mathrm{Span}\{\vec{v}_1, \vec{v}_2\}$, for which $\{\vec{v}_1, \vec{v}_2\}$ is now an orthogonal basis (so the projection formula of Theorem 4.34 applies), and set

$$
\vec{v}_3 = \vec{u}_3 - \mathrm{proj}_{W_2}\vec{u}_3 = \vec{u}_3 - \frac{\langle \vec{u}_3, \vec{v}_1 \rangle}{\langle \vec{v}_1, \vec{v}_1 \rangle}\vec{v}_1 - \frac{\langle \vec{u}_3, \vec{v}_2 \rangle}{\langle \vec{v}_2, \vec{v}_2 \rangle}\vec{v}_2,
$$

which is orthogonal to $W_2$, nonzero by the same independence argument, and satisfies $\mathrm{Span}\{\vec{v}_1, \vec{v}_2, \vec{v}_3\} = \mathrm{Span}\{\vec{u}_1, \vec{u}_2, \vec{u}_3\}$.

Continuing through all $n$ vectors produces an orthogonal set $\{\vec{v}_1, \dots, \vec{v}_n\}$ of nonzero vectors, linearly independent by Theorem 4.26, hence, being $n$ independent vectors in the $n$-dimensional $V$, a basis (Theorem 3.44). $\square$

### 7.2 The algorithm, stated for use

Gram–Schmidt process. Given an ordered basis $\mathcal{B} = \{\vec{u}_1, \dots, \vec{u}_n\}$ of an inner product space $V$:

$$
\vec{v}_1 = \vec{u}_1, \qquad
\vec{v}_2 = \vec{u}_2 - \frac{\langle \vec{u}_2, \vec{v}_1 \rangle}{\langle \vec{v}_1, \vec{v}_1 \rangle}\vec{v}_1, \qquad
\dots, \qquad
\vec{v}_n = \vec{u}_n - \sum_{j=1}^{n-1}\frac{\langle \vec{u}_n, \vec{v}_j \rangle}{\langle \vec{v}_j, \vec{v}_j \rangle}\vec{v}_j,
$$

yielding the orthogonal basis $\mathcal{B}' = \{\vec{v}_1, \dots, \vec{v}_n\}$; normalizing, $\vec{w}_i = \vec{v}_i/\|\vec{v}_i\|$, yields the orthonormal basis $\mathcal{B}''$. The process is span-faithful at every stage: for each $k$,

$$
\mathrm{Span}\{\vec{u}_1, \dots, \vec{u}_k\} = \mathrm{Span}\{\vec{v}_1, \dots, \vec{v}_k\} = \mathrm{Span}\{\vec{w}_1, \dots, \vec{w}_k\},
$$

so the first $k$ output vectors always describe the same subspace as the first $k$ inputs, the process straightens the basis without ever leaving the nested subspaces it came with. Two practical remarks. Each new $\vec{v}_k$ is $\vec{u}_k$ minus its shadows on all previously built directions, one subtraction per prior vector, the projections computed against the $\vec{v}_j$ (already orthogonal), never against the raw $\vec{u}_j$. And hand-computation is eased by a licensed shortcut: since only directions matter until the final normalization, any $\vec{v}_k$ may be rescaled to clear fractions the moment it is born, without harm to orthogonality, a liberty the examples below exercise.

### 7.3 Three worked runs

Example 4.37. Orthogonalize the ordered basis $\vec{u}_1 = (1,1,1)$, $\vec{u}_2 = (0,1,1)$, $\vec{u}_3 = (0,0,1)$ of Euclidean $\mathbb{R}^3$.

$\vec{v}_1 = (1,1,1)$. Next, $\langle \vec{u}_2, \vec{v}_1 \rangle = 2$ and $\langle \vec{v}_1, \vec{v}_1 \rangle = 3$, so

$$
\vec{v}_2 = (0,1,1) - \tfrac{2}{3}(1,1,1) = \big(-\tfrac{2}{3},\ \tfrac{1}{3},\ \tfrac{1}{3}\big).
$$

For the third: $\langle \vec{u}_3, \vec{v}_1 \rangle = 1$, $\langle \vec{u}_3, \vec{v}_2 \rangle = \tfrac{1}{3}$, $\langle \vec{v}_2, \vec{v}_2 \rangle = \tfrac{4}{9} + \tfrac{1}{9} + \tfrac{1}{9} = \tfrac{2}{3}$, so

$$
\vec{v}_3 = (0,0,1) - \tfrac{1}{3}(1,1,1) - \frac{1/3}{2/3}\big(-\tfrac{2}{3}, \tfrac{1}{3}, \tfrac{1}{3}\big)
= (0,0,1) - \big(\tfrac{1}{3}, \tfrac{1}{3}, \tfrac{1}{3}\big) - \big(-\tfrac{1}{3}, \tfrac{1}{6}, \tfrac{1}{6}\big)
= \big(0,\ -\tfrac{1}{2},\ \tfrac{1}{2}\big).
$$

The full audit, three dot products: $\vec{v}_1 \bullet \vec{v}_2 = -\tfrac{2}{3} + \tfrac{1}{3} + \tfrac{1}{3} = 0$; $\vec{v}_1 \bullet \vec{v}_3 = 0 - \tfrac{1}{2} + \tfrac{1}{2} = 0$; $\vec{v}_2 \bullet \vec{v}_3 = 0 - \tfrac{1}{6} + \tfrac{1}{6} = 0$. Orthogonal. Normalizing ($\|\vec{v}_1\| = \sqrt{3}$, $\|\vec{v}_2\| = \sqrt{2/3}$, $\|\vec{v}_3\| = \sqrt{1/2}$) gives the orthonormal basis

$$
\vec{w}_1 = \tfrac{1}{\sqrt{3}}(1,1,1), \qquad
\vec{w}_2 = \tfrac{1}{\sqrt{6}}(-2, 1, 1), \qquad
\vec{w}_3 = \tfrac{1}{\sqrt{2}}(0, -1, 1).
$$

Example 4.38 (Legendre polynomials). In $\mathcal{P}_2$ with $\langle \vec{p}, \vec{q} \rangle = \int_{-1}^1 p(x)q(x)\,dx$, orthogonalize the standard basis $\{1, x, x^2\}$, the same algorithm, driven by integrals instead of dot products.

$\vec{v}_1 = 1$. Then $\langle x, 1 \rangle = \int_{-1}^1 x\,dx = 0$ (odd integrand, symmetric interval), so the projection vanishes and

$$
\vec{v}_2 = x - \frac{0}{2}\cdot 1 = x,
$$

$x$ was already orthogonal to $1$, and the process, honestly, does nothing. For the third: $\langle x^2, 1 \rangle = \int_{-1}^1 x^2\,dx = \tfrac{2}{3}$, $\langle 1, 1 \rangle = 2$, and $\langle x^2, x \rangle = \int_{-1}^1 x^3\,dx = 0$ (odd again), so

$$
\vec{v}_3 = x^2 - \frac{2/3}{2}\cdot 1 - 0\cdot x = x^2 - \frac{1}{3}.
$$

The orthogonal basis $\{1,\ x,\ x^2 - \tfrac{1}{3}\}$ consists, up to scalar multiples, of the first three Legendre polynomials $P_0 = 1$, $P_1 = x$, $P_2 = \tfrac{1}{2}(3x^2 - 1)$, a family classical in physics and approximation theory, here revealed as nothing more mysterious than Gram–Schmidt applied to $1, x, x^2, \dots$ on $[-1, 1]$. The verification integral: $\int_{-1}^1 1\cdot(x^2 - \tfrac13)\,dx = \tfrac{2}{3} - \tfrac{2}{3} = 0$, as required.

Example 4.39. Find an orthonormal basis for the solution space of

$$
\begin{cases} x_1 + x_2 \phantom{{}+ 2x_3} + 7x_4 = 0 \\ 2x_1 + x_2 + 2x_3 - 6x_4 = 0. \end{cases}
$$

A two-stage problem: Chapter 1 finds a basis, this chapter straightens it. Row-reducing the coefficient matrix, $\left[\begin{smallmatrix} 1 & 1 & 0 & 7 \\ 2 & 1 & 2 & -6 \end{smallmatrix}\right] \to \left[\begin{smallmatrix} 1 & 0 & 2 & -13 \\ 0 & 1 & -2 & 20 \end{smallmatrix}\right]$ (subtract twice row 1, negate, then clear upward), so $x_1 = -2x_3 + 13x_4$ and $x_2 = 2x_3 - 20x_4$ with $x_3, x_4$ free. Setting $(x_3, x_4) = (1,0)$ and $(0,1)$:

$$
\vec{u}_1 = (-2,\ 2,\ 1,\ 0), \qquad \vec{u}_2 = (13,\ -20,\ 0,\ 1),
$$

each verified in both original equations (e.g. for $\vec{u}_2$: $13 - 20 + 7 = 0$ and $26 - 20 - 6 = 0$). Now Gram–Schmidt: $\vec{v}_1 = \vec{u}_1$ with $\langle \vec{v}_1, \vec{v}_1 \rangle = 4 + 4 + 1 = 9$, and $\langle \vec{u}_2, \vec{v}_1 \rangle = -26 - 40 + 0 + 0 = -66$, so

$$
\vec{v}_2 = \vec{u}_2 - \frac{-66}{9}\vec{v}_1 = (13, -20, 0, 1) + \tfrac{22}{3}(-2, 2, 1, 0)
= \big(-\tfrac{5}{3},\ -\tfrac{16}{3},\ \tfrac{22}{3},\ 1\big),
$$

or, clearing thirds by the licensed rescaling, $\vec{v}_2 \parallel (-5, -16, 22, 3)$. Audits: $\vec{v}_1 \bullet \vec{v}_2 = \tfrac{10}{3} - \tfrac{32}{3} + \tfrac{22}{3} + 0 = 0$ (orthogonal), and $(-5, -16, 22, 3)$ satisfies equation 1 as $-5 - 16 + 21 = 0$ and equation 2 as $-10 - 16 + 44 - 18 = 0$ (still a solution: Gram–Schmidt never leaves the span). Normalizing ($\|\vec{v}_1\| = 3$ and $\|(-5,-16,22,3)\| = \sqrt{25 + 256 + 484 + 9} = \sqrt{774} = 3\sqrt{86}$) the orthonormal basis is

$$
\vec{w}_1 = \Big(-\tfrac{2}{3},\ \tfrac{2}{3},\ \tfrac{1}{3},\ 0\Big), \qquad
\vec{w}_2 = \frac{1}{3\sqrt{86}}\,(-5,\ -16,\ 22,\ 3).
$$

## 8. The Cross Product: Geometry Special to $\mathbb{R}^3$

### 8.1 Definition and the determinant mnemonic

Everything so far lives in arbitrary inner product spaces. The cross product is different in kind: it is a construction special to three dimensions, producing from two vectors of $\mathbb{R}^3$ a third vector (not a scalar, the essential contrast with the dot product).

Definition 4.40. For $\vec{u} = (u_1, u_2, u_3)$ and $\vec{v} = (v_1, v_2, v_3)$ in $\mathbb{R}^3$,

$$
\vec{u} \times \vec{v} = \big(u_2v_3 - u_3v_2,\ \ u_3v_1 - u_1v_3,\ \ u_1v_2 - u_2v_1\big).
$$

The formula is unmemorizable as it stands and unforgettable as a determinant (Remark 4.41): with the standard basis $\vec{i}, \vec{j}, \vec{k}$,

$$
\vec{u} \times \vec{v} =
\begin{vmatrix} u_2 & u_3 \\ v_2 & v_3 \end{vmatrix}\vec{i}
- \begin{vmatrix} u_1 & u_3 \\ v_1 & v_3 \end{vmatrix}\vec{j}
+ \begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix}\vec{k}
\;=:\;
\begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix},
$$

a "determinant" with vectors in its first row, an abuse of notation, since determinants were defined for numerical matrices, but a disciplined abuse: expand along the first row by the cofactor rules of Chapter 2 (signs $+,-,+$) and the correct formula falls out, minus sign on the $\vec{j}$-term included, which is exactly the term hand-computation always gets wrong.

Example 4.42. For $\vec{u} = (1,2,3)$ and $\vec{v} = (-1,0,2)$:

$$
\vec{u} \times \vec{v} = \big(2\cdot 2 - 3\cdot 0,\ \ 3\cdot(-1) - 1\cdot 2,\ \ 1\cdot 0 - 2\cdot(-1)\big) = (4,\ -5,\ 2),
$$

with the perpendicularity audit, the cheapest full check available, passing on both counts: $(4,-5,2)\bullet(1,2,3) = 4 - 10 + 6 = 0$ and $(4,-5,2)\bullet(-1,0,2) = -4 + 0 + 4 = 0$.

### 8.2 Algebraic laws and the geometric reading

Theorem 4.43. For $\vec{u}, \vec{v}, \vec{w} \in \mathbb{R}^3$ and $k \in \mathbb{R}$:

1. $\vec{v} \times \vec{u} = -\,\vec{u} \times \vec{v}$ (anticommutativity, order matters, to the point of a sign);
2. $\vec{u} \times (\vec{v} + \vec{w}) = \vec{u}\times\vec{v} + \vec{u}\times\vec{w}$ and $\vec{u} \times (k\vec{v}) = k(\vec{u}\times\vec{v})$ (bilinearity);
3. $\vec{u} \times \vec{v} = \vec{0}$ if $\vec{u} \,/\!/\, \vec{v}$, in particular $\vec{u} \times \vec{u} = \vec{0}$ always;
4. $(\vec{u}\times\vec{v}) \bullet \vec{u} = 0 = (\vec{u}\times\vec{v})\bullet\vec{v}$, the product is orthogonal to both factors;
5. (Lagrange's identity) $\|\vec{u}\times\vec{v}\|^2 = \|\vec{u}\|^2\|\vec{v}\|^2 - (\vec{u}\bullet\vec{v})^2 = \big(\|\vec{u}\|\|\vec{v}\|\sin\theta\big)^2$, $\theta$ the angle between the factors;
6. when $\vec{u} \not{/\!/}\ \vec{v}$, the triple $\{\vec{u}, \vec{v}, \vec{u}\times\vec{v}\}$ is a right-handed system, the determinant with these three vectors as rows is positive.

Properties (1)–(4) are componentwise checks, best organized through the determinant picture: swapping the factor rows of the symbolic determinant negates it (the alternating property of Chapter 2), which is (1); equal or proportional rows kill a determinant, which is (3); and (4) is the observation that $(\vec{u}\times\vec{v})\bullet\vec{u}$ is the honest numerical determinant with rows $\vec{u}, \vec{u}, \vec{v}$, two equal rows, hence zero. For (5), a direct expansion of both sides in coordinates confirms the first equality, and the second substitutes $\vec{u}\bullet\vec{v} = \|\vec{u}\|\|\vec{v}\|\cos\theta$: $\|\vec{u}\|^2\|\vec{v}\|^2(1 - \cos^2\theta) = \|\vec{u}\|^2\|\vec{v}\|^2\sin^2\theta$, the square root being harmless since $\sin\theta \geq 0$ on $[0, \pi]$.

Assembled, (4), (5), (6) give the complete geometric portrait of $\vec{u} \times \vec{v}$ for non-parallel factors: its direction is perpendicular to the plane of $\vec{u}$ and $\vec{v}$, on the side making $\{\vec{u}, \vec{v}, \vec{u}\times\vec{v}\}$ right-handed (curl the right hand's fingers from $\vec{u}$ toward $\vec{v}$; the thumb points along the product); its length is

$$
\|\vec{u} \times \vec{v}\| = \|\vec{u}\|\,\|\vec{v}\|\sin\theta = \text{the area of the parallelogram spanned by } \vec{u} \text{ and } \vec{v},
$$

base $\|\vec{u}\|$ times height $\|\vec{v}\|\sin\theta$. Direction and magnitude together determine the vector, the definition, opaque in coordinates, is transparent in geometry.

### 8.3 The scalar triple product and the geometry of determinants

Definition 4.44. For $\vec{u}, \vec{v}, \vec{w} \in \mathbb{R}^3$, the scalar triple product is $\vec{u}\bullet(\vec{v}\times\vec{w})$, and expanding the dot product against the cofactor form of $\vec{v}\times\vec{w}$ identifies it as a genuine $3\times 3$ determinant:

$$
\vec{u}\bullet(\vec{v}\times\vec{w}) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix}.
$$

Theorem 4.45 (geometric interpretation of determinants). The absolute value of a $2\times 2$ determinant with rows $\vec{u}, \vec{v}$ equals the area of the parallelogram in the plane spanned by $\vec{u}$ and $\vec{v}$; the absolute value of a $3\times 3$ determinant with rows $\vec{u}, \vec{v}, \vec{w}$ equals the volume of the parallelepiped in space spanned by them.

The three-dimensional statement follows from the triple product: the volume of the parallelepiped is (base area)$\times$(height) $= \|\vec{v}\times\vec{w}\| \cdot \|\vec{u}\||\cos\varphi|$, $\varphi$ the angle between $\vec{u}$ and the base's normal $\vec{v}\times\vec{w}$, and that product is exactly $|\vec{u}\bullet(\vec{v}\times\vec{w})|$ by the angle formula. The promise made at the close of the Chapter 2 essay, that the determinant is a signed volume, is hereby redeemed with a proof, at least in dimensions two and three; the vanishing of the determinant for dependent rows re-reads as the collapse of the parallelepiped into a plane, volume zero.

Example 4.46. The area of the triangle with vertices $P(1,4,6)$, $Q(-2,5,-1)$, $R(1,-1,1)$: form the edge vectors from $P$,

$$
\vec{PQ} = (-3, 1, -7), \qquad \vec{PR} = (0, -5, -5),
$$

whose cross product is

$$
\vec{PQ}\times\vec{PR} = \big(1\cdot(-5) - (-7)(-5),\ \ (-7)\cdot 0 - (-3)(-5),\ \ (-3)(-5) - 1\cdot 0\big) = (-40,\ -15,\ 15).
$$

Its norm is $\sqrt{1600 + 225 + 225} = \sqrt{2050} = 5\sqrt{82}$, the area of the parallelogram on the two edges; the triangle is half of it,

$$
\text{Area} = \tfrac{1}{2}\cdot 5\sqrt{82} = \tfrac{5\sqrt{82}}{2}.
$$

Example 4.47. The volume of the tetrahedron with vertices $P(-1,2,0)$, $Q(2,1,-3)$, $R(1,1,1)$, $S(3,-2,3)$: with edge vectors from $P$,

$$
\vec{PQ} = (3,-1,-3), \qquad \vec{PR} = (2,-1,1), \qquad \vec{PS} = (4,-4,3),
$$

the scalar triple product is

$$
\begin{vmatrix} 3 & -1 & -3 \\ 2 & -1 & 1 \\ 4 & -4 & 3 \end{vmatrix}
= 3\begin{vmatrix} -1 & 1 \\ -4 & 3 \end{vmatrix} + 1\begin{vmatrix} 2 & 1 \\ 4 & 3 \end{vmatrix} - 3\begin{vmatrix} 2 & -1 \\ 4 & -4 \end{vmatrix}
= 3(1) + 1(2) - 3(-4) = 17.
$$

The parallelepiped on the three edges has volume $17$; a tetrahedron is one sixth of its parallelepiped ($\tfrac13 \times$ base triangle $\times$ height, the triangle being half the base parallelogram), so

$$
\text{Volume} = \frac{17}{6}.
$$

## 9. The Equivalence Theorem, Two Faces Richer

Theorem 4.48. For an $n\times n$ matrix $A$, the following are equivalent: (1) $A$ is invertible; (2) $A\vec{x} = \vec{0}$ has only the trivial solution; (3) the RREF of $A$ is $I_n$; (4) $A$ is a product of elementary matrices; (5) $A\vec{x} = \vec{b}$ is consistent for every $\vec{b}$; (6) $A\vec{x} = \vec{b}$ has exactly one solution for every $\vec{b}$; (7) $\det(A) \neq 0$; (8)–(13) the columns (respectively rows) of $A$ are linearly independent, span $\mathbb{R}^n$, form a basis of $\mathbb{R}^n$; (14) $\mathrm{rank}(A) = n$; (15) $\mathrm{nullity}(A) = 0$; and now, in the language of this chapter,

(16) the orthogonal complement of the null space of $A$ is $\mathbb{R}^n$; (17) the orthogonal complement of the row space of $A$ is $\{\vec{0}\}$.

The two newcomers cost nothing, being Theorem 4.22 applied to conditions already on the list: $\mathrm{null}(A)^{\perp} = \mathrm{row}(A)$, so (16) says $\mathrm{row}(A) = \mathbb{R}^n$, which is (11); and $\mathrm{row}(A)^{\perp} = \mathrm{null}(A)$, so (17) says $\mathrm{null}(A) = \{\vec{0}\}$, which is (2) and (15). Their value is not novelty but perspective, the invertibility of $A$ read as a statement about perpendicularity: nothing (except $\vec{0}$) stands at right angles to all the rows. The theorem now shows seventeen faces, gathered across four chapters, and the parenthetical gloss the source attaches to condition (1) is worth quoting as the summary of the whole enterprise: an invertible $A$ is a transformation that loses no information, no direction collapsed (trivial null space, condition 15), no target missed (full column space, condition 10), no volume flattened (nonzero determinant, condition 7), no direction perpendicular to everything it reads (condition 17).

## 10. Retrospect

One structure, the inner product, was added to the vector spaces of Chapter 3, and an entire geometry unfolded from it in strict logical order: norm and distance from the product ($\|\vec{u}\| = \sqrt{\langle\vec{u},\vec{u}\rangle}$); the master expansion $\|\vec{u}+\vec{v}\|^2 = \|\vec{u}\|^2 + 2\langle\vec{u},\vec{v}\rangle + \|\vec{v}\|^2$ and, from it, the parallelogram law and the polarization identity; Cauchy–Schwarz by the discriminant trick, legalizing the definition of angle and delivering the triangle inequality; orthogonality as the vanishing of the cross term, hence Pythagoras; complements $W^{\perp}$ pairing with $W$ into direct sums $V = W \oplus W^{\perp}$, and, the chapter's finest structural insight, the null space and row space of any matrix revealed as exact orthogonal complements, geometrizing the solution of homogeneous systems; orthogonal bases with their one-line coordinate formulas, coefficients as inner products; projection as decomposition and, by a three-line Pythagorean argument, as best approximation, the seed of least squares; Gram–Schmidt manufacturing orthonormal bases by iterated shadow-subtraction, with the Legendre polynomials as its most distinguished output; and, special to $\mathbb{R}^3$, the cross product with its right-hand geometry, the triple product, and the long-promised proof that determinants measure area and volume.

A reader wishing to certify ownership should be able to reconstruct, unaided: the expansion of $\|\vec{u} \pm \vec{v}\|^2$ and both named identities that follow; why positive weights and invertible generating matrices are exactly what positivity demands, and why continuity is what rescues positivity for the integral inner product; the discriminant proof of Cauchy–Schwarz and its specialization to integrals; the one-survivor pairing argument in its three appearances (independence of orthogonal sets, the coefficient formulas, the projection theorem); the double-perp identity and where the projection theorem enters its proof; the proof that $\mathrm{row}(A)^{\perp} = \mathrm{null}(A)$ and the resulting geometric reading of $A\vec{x} = \vec{0}$; the Pythagorean three-liner behind best approximation; the span-faithfulness of Gram–Schmidt and the licensed mid-process rescaling; the sign on the $\vec{j}$-term of the cross product; and the base-times-height derivations of $\tfrac{5\sqrt{82}}{2}$ and $\tfrac{17}{6}$ in the closing examples. The next chapter puts this machinery in motion: linear transformations between inner product spaces, where projections become operators and the geometry built here becomes something that acts.
