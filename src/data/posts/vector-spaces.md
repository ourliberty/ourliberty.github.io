---
title: |-
  Linear Algebra Ch3
  Vector Spaces
excerpt: 'From arrows to axioms: subspaces, span, linear independence, basis, dimension, coordinates, and the fundamental subspaces of a matrix.'
date: '2026-07-17'
category: study
subcategory: mathematics
keywords: ['linear algebra', 'vector spaces', 'basis', 'dimension', 'rank']
---

Based on Anton & Rorres, "Elementary Linear Algebra with Supplemental Applications" (12th ed.), and Larson, "Elementary Linear Algebra" (8th ed., metric version). A continuation of the essays on Chapters 1 and 2, whose notation and results are used freely.

The first two chapters were concrete: matrices were rectangular arrays, and every theorem could in principle be checked by arithmetic on entries. The present chapter performs the characteristic maneuver of modern mathematics: abstraction. It observes that the eight algebraic laws governing matrix addition and scalar multiplication (Theorem 1.7) also govern arrows in the plane, $n$-tuples of numbers, polynomials, continuous functions, and infinite sequences; it then promotes those eight laws from theorems about particular objects to axioms defining a class of objects, the vector spaces. The payoff is enormous and immediate: every theorem proved from the axioms alone holds simultaneously in all of these settings, so that one argument about "vectors" is an argument about arrows, tuples, matrices, and functions at once. The chapter then develops the fundamental vocabulary of the subject (subspace, span, linear independence, basis, dimension, coordinates) and returns to matrices at the end with the four fundamental notions of row space, column space, rank, and null space, culminating in the rank–nullity theorem and a further enlargement of the great equivalence theorem. I have again tried to prove what can be proved at this level, to verify every computation at least twice, and to flag the places where beginners predictably stumble.

## 1. Vectors Before Coordinates: Arrows

### 1.1 Geometric vectors

Historically and pedagogically, vectors begin as directed line segments: arrows. The arrow from a point $A$ to a point $B$ is written $\vec{AB}$; the point $A$ is its initial point, $B$ its terminal point, and its length is denoted $|\vec{AB}|$. A degenerate arrow whose initial and terminal points coincide is the zero vector $\vec{0}$: it has length zero and, by convention, no particular direction.

Definition 3.1 (equivalence). Two geometric vectors $\vec{AB}$ and $\vec{CD}$ are equivalent (or simply equal), written $\vec{AB} = \vec{CD}$, if they have the same length and the same direction.

This definition embodies a decision with consequences: a vector does not care where it starts. Two arrows of the same length pointing the same way are the same vector, even if one is drawn in Seoul and the other in Busan. What a vector records is displacement, "three units northeast", not position. Because of this, one may slide any arrow parallel to itself without changing it, and in particular (Remark 3.2) one may assume all vectors under discussion emanate from a single common point $O$. This normalization is what will later let us identify vectors with coordinate tuples.

### 1.2 The arithmetic of arrows

Definition 3.3 (addition). Position $\vec{v}$ so that its initial point sits at the terminal point of $\vec{u}$; then $\vec{u} + \vec{v}$ is the arrow from the initial point of $\vec{u}$ to the terminal point of $\vec{v}$. This is the triangle rule: travel along $\vec{u}$, then along $\vec{v}$, and the sum is the net displacement. Equivalently, if $\vec{u}$ and $\vec{v}$ are drawn from a common initial point, $\vec{u} + \vec{v}$ is the diagonal of the parallelogram they span, the parallelogram rule. The two rules describe the same vector, the parallelogram being two copies of the triangle glued along the diagonal, and the equality of the two descriptions is precisely the geometric content of commutativity: traversing $\vec{u}$ then $\vec{v}$ lands where traversing $\vec{v}$ then $\vec{u}$ does.

Definition 3.4 (scalar multiplication). For a scalar $k$ and a vector $\vec{v}$, the vector $k\vec{v}$ has length $|k|\,|\vec{v}|$, points in the same direction as $\vec{v}$ if $k > 0$, and in the opposite direction if $k < 0$; if $k = 0$ or $\vec{v} = \vec{0}$, then $k\vec{v} = \vec{0}$. Multiplication by a scalar stretches, shrinks, or reverses, but never rotates: $k\vec{v}$ always lies on the line through $\vec{v}$.

Subtraction, as always in this subject, is not a new primitive: the negative $-\vec{v}$ is the vector of the same length pointing the opposite way, and

$$
\vec{u} - \vec{v} := \vec{u} + (-\vec{v}) = \vec{u} + (-1)\vec{v}.
$$

A picture worth internalizing: if $\vec{u}$ and $\vec{v}$ share an initial point, then $\vec{u} - \vec{v}$ is the arrow from the tip of $\vec{v}$ to the tip of $\vec{u}$, the "other diagonal" of the parallelogram. One checks this by verifying that $\vec{v}$ plus that arrow equals $\vec{u}$, which is the triangle rule read backwards.

Theorem 3.6. With these operations, geometric vectors satisfy the eight laws

$$
\begin{array}{llll}
\text{(A1)} & (\vec{u}+\vec{v})+\vec{w} = \vec{u}+(\vec{v}+\vec{w}) & \text{(SM1)} & k(\vec{v}+\vec{w}) = k\vec{v}+k\vec{w} \\
\text{(A2)} & \vec{u}+\vec{v} = \vec{v}+\vec{u} & \text{(SM2)} & (k+l)\vec{v} = k\vec{v}+l\vec{v} \\
\text{(A3)} & \vec{v}+\vec{0} = \vec{0}+\vec{v} = \vec{v} & \text{(SM3)} & (kl)\vec{v} = k(l\vec{v}) \\
\text{(A4)} & \vec{v}+(-\vec{v}) = \vec{0} & \text{(SM4)} & 1\vec{v} = \vec{v}
\end{array}
$$

The list should induce déjà vu: it is identical to Theorem 1.7 for matrices. Two entirely different kinds of object, arrows and arrays, obey the same algebra. This coincidence is the seed of the whole chapter, and we will shortly stop calling it a coincidence.

## 2. Vectors as Tuples: $\mathbb{R}^2$ and $\mathbb{R}^n$

### 2.1 Coordinatizing the plane

Fix perpendicular unit vectors $\vec{i}$ and $\vec{j}$ in the plane (unit meaning length $1$; the angle between them is $\pi/2$). Then every plane vector $\vec{a}$ decomposes uniquely as

$$
\vec{a} = a_1\vec{i} + a_2\vec{j}, \qquad a_1, a_2 \in \mathbb{R},
$$

and the scalars $a_1, a_2$ are the components of $\vec{a}$; one writes $\vec{a} = (a_1, a_2)$. Both existence and uniqueness of the decomposition are geometrically evident (drop perpendiculars from the tip of $\vec{a}$ onto the two axes), and uniqueness is what makes the notation well-defined: the pair $(a_1, a_2)$ is an unambiguous name for the arrow. Under this naming, the geometric operations become arithmetic (Theorem 3.7):

$$
(a_1, a_2) + (b_1, b_2) = (a_1 + b_1,\, a_2 + b_2), \qquad k(a_1, a_2) = (ka_1, ka_2).
$$

Adding arrows tip-to-tail is the same as adding components; stretching an arrow is the same as scaling components. Geometry has been converted into bookkeeping.

A small but essential computation shows how points and vectors interact. If $P$ and $Q$ are points, the components of the arrow $\vec{PQ}$ are obtained by subtracting the coordinates of the initial point from those of the terminal point: terminal minus initial, an order responsible for a steady trickle of sign errors. Example 3.8: for $P(3,5)$ and $Q(2,8)$,

$$
\vec{PQ} = (2 - 3,\ 8 - 5) = (-1, 3),
$$

and in space, for $P(5, -2, 1)$ and $Q(2, 4, 2)$,

$$
\vec{PQ} = (2 - 5,\ 4 - (-2),\ 2 - 1) = (-3, 6, 1).
$$

The reasoning behind the rule: writing $O$ for the origin, $\vec{OP} + \vec{PQ} = \vec{OQ}$ by the triangle rule, so $\vec{PQ} = \vec{OQ} - \vec{OP}$, and the components of $\vec{OP}, \vec{OQ}$ are just the coordinates of $P, Q$.

### 2.2 $n$-space

Nothing in the componentwise formulas cares that there are only two components, and so we generalize wholesale. An ordered $n$-tuple is a sequence $(v_1, \dots, v_n)$ of real numbers, its entries called components; two tuples are equal exactly when all corresponding components agree. The set of all of them is $n$-space,

$$
\mathbb{R}^n = \{(x_1, \dots, x_n) \mid x_1, \dots, x_n \in \mathbb{R}\},
$$

with the operations (Definition 3.9)

$$
\vec{u} + \vec{v} = (u_1 + v_1, \dots, u_n + v_n), \qquad k\vec{v} = (kv_1, \dots, kv_n),
$$

zero vector $\vec{0} = (0, \dots, 0)$, negative $-\vec{v} = (-v_1, \dots, -v_n)$, and subtraction $\vec{u} - \vec{v} = \vec{u} + (-1)\vec{v}$. For $n = 2, 3$ these are the coordinatized arrows just discussed; for $n \geq 4$ the geometric picture fails the eye but the algebra proceeds undisturbed, and it is precisely the algebra we care about. Theorem 3.10 records that the eight laws (A1)–(A4), (SM1)–(SM4) hold in $\mathbb{R}^n$, each verified componentwise from the corresponding law for real numbers, exactly as in the matrix case. Theorem 3.11 adds three consequences that will shortly be reproved in far greater generality:

$$
0\vec{v} = \vec{0}, \qquad k\vec{0} = \vec{0}, \qquad (-1)\vec{v} = -\vec{v}.
$$

One notational remark completes the picture. A tuple $(v_1, \dots, v_n)$ may equally be displayed as a $1 \times n$ row matrix or an $n \times 1$ column matrix, and under either display the vector operations of $\mathbb{R}^n$ coincide with the matrix operations of Chapter 1. The three notations (tuple, row, column) name the same object, and we pass among them freely, with the column form dominating whenever matrix multiplication is in play (as in $A\vec{x} = \vec{b}$).

## 3. The Axioms

### 3.1 The definition of a vector space

We have now seen the same eight laws hold for matrices (Theorem 1.7), for arrows (Theorem 3.6), and for $n$-tuples (Theorem 3.10). The economical response is to stop proving them over and over and instead define the class of all systems in which they hold.

Definition. Let $V$ be a nonempty set equipped with two functions,

$$
+ : V \times V \to V, \quad (\vec{u}, \vec{v}) \mapsto \vec{u} + \vec{v}, \qquad \cdot : \mathbb{R} \times V \to V, \quad (k, \vec{u}) \mapsto k\vec{u},
$$

such that for all $\vec{u}, \vec{v}, \vec{w} \in V$ and all $k, l \in \mathbb{R}$:

- (A1) $(\vec{u} + \vec{v}) + \vec{w} = \vec{u} + (\vec{v} + \vec{w})$;
- (A2) $\vec{u} + \vec{v} = \vec{v} + \vec{u}$;
- (A3) there exists $\vec{0} \in V$, a zero vector, with $\vec{u} + \vec{0} = \vec{0} + \vec{u} = \vec{u}$ for every $\vec{u} \in V$;
- (A4) for each $\vec{u} \in V$ there exists $\vec{v} \in V$ with $\vec{u} + \vec{v} = \vec{v} + \vec{u} = \vec{0}$; we write $-\vec{u}$ for such a $\vec{v}$, a negative of $\vec{u}$;
- (SM1) $k(\vec{u} + \vec{v}) = k\vec{u} + k\vec{v}$;
- (SM2) $(k + l)\vec{u} = k\vec{u} + l\vec{u}$;
- (SM3) $(kl)\vec{u} = k(l\vec{u})$;
- (SM4) $1\vec{u} = \vec{u}$.

Then $(V, +, \cdot)$ is a vector space (over $\mathbb{R}$), and its elements are called vectors.

Several points about this definition deserve unhurried attention.

First, the word "vector" has changed meaning. A vector is no longer an arrow or a tuple; it is any element of any set satisfying the axioms. A polynomial can be a vector. A continuous function can be a vector. A matrix can be a vector. The arrow notation $\vec{u}$ is retained as a typographical courtesy, not a claim about geometry.

Second, the closure requirements are hidden in plain sight: the operations are functions into $V$, so $\vec{u} + \vec{v}$ and $k\vec{u}$ are required to land in $V$. When we later test subsets for subspacehood, closure will be exactly the condition that can fail.

Third, note what the axioms do not include. There is no multiplication of two vectors, no length, no angle; those structures come later (inner product spaces) or never, depending on the space. The axioms isolate precisely the arithmetic of "add and scale," nothing more; the discipline of using only what the axioms grant is what makes theorems proved here so widely applicable.

Fourth, one small logical subtlety: axioms (A3) and (A4) assert existence of a zero and of negatives, not uniqueness. Uniqueness is a theorem. If $\vec{0}$ and $\vec{0}'$ both satisfy (A3), then $\vec{0} = \vec{0} + \vec{0}' = \vec{0}'$; and if $\vec{v}$ and $\vec{v}'$ are both negatives of $\vec{u}$, then

$$
\vec{v} = \vec{v} + \vec{0} = \vec{v} + (\vec{u} + \vec{v}') = (\vec{v} + \vec{u}) + \vec{v}' = \vec{0} + \vec{v}' = \vec{v}',
$$

the same five-step argument that proved inverse matrices unique in Chapter 1 (Theorem 1.18). Henceforth "the" zero vector and "the" negative are justified usages.

### 3.2 First consequences of the axioms

Theorem 3.12. In any vector space $V$, for all $\vec{u} \in V$ and $k \in \mathbb{R}$:

1. $0\vec{u} = \vec{0}$;
2. $k\vec{0} = \vec{0}$;
3. $(-1)\vec{u} = -\vec{u}$;
4. if $k\vec{u} = \vec{0}$, then $k = 0$ or $\vec{u} = \vec{0}$.

In $\mathbb{R}^n$ these were trivialities checked on components (Theorem 3.11). Here they are not trivialities: we no longer know what the vectors are, so componentwise checking is unavailable, and everything must be squeezed from the eight axioms. The proofs are short but instructive as first exercises in axiomatic reasoning.

Proof of (1). By (SM2), $0\vec{u} = (0 + 0)\vec{u} = 0\vec{u} + 0\vec{u}$. Add $-(0\vec{u})$ to both sides and use (A1), (A4), (A3):

$$
\vec{0} = 0\vec{u} + \big({-}(0\vec{u})\big) = \big(0\vec{u} + 0\vec{u}\big) + \big({-}(0\vec{u})\big) = 0\vec{u} + \vec{0} = 0\vec{u}.
$$

Proof of (2). Identical in shape, starting from $k\vec{0} = k(\vec{0} + \vec{0}) = k\vec{0} + k\vec{0}$ via (SM1).

Proof of (3). Using (SM4), (SM2), and part (1),

$$
\vec{u} + (-1)\vec{u} = 1\vec{u} + (-1)\vec{u} = \big(1 + (-1)\big)\vec{u} = 0\vec{u} = \vec{0},
$$

so $(-1)\vec{u}$ is a negative of $\vec{u}$; by the uniqueness of negatives established above, $(-1)\vec{u} = -\vec{u}$.

Proof of (4). Suppose $k\vec{u} = \vec{0}$ and $k \neq 0$. Then $k^{-1}$ exists in $\mathbb{R}$, and by (SM4), (SM3), and part (2),

$$
\vec{u} = 1\vec{u} = (k^{-1}k)\vec{u} = k^{-1}(k\vec{u}) = k^{-1}\vec{0} = \vec{0}. \qquad\square
$$

Part (4) is the vector-space analogue of "no zero divisors" for scalar-times-vector products, a sharp contrast with matrix multiplication, where $AB = O$ with both factors nonzero is possible. Scaling is better behaved than multiplying.

### 3.3 The menagerie: examples of vector spaces

Example 3.13. The following are vector spaces under the natural operations; each deserves a moment's inspection, since the whole force of the abstraction lies in the breadth of this list.

The zero vector space $V = \{\vec{0}\}$, a single element serving as its own zero and negative, degenerate but a legitimate space, and the base case of many inductions. The spaces $\mathbb{R}^n$ and $\mathrm{Mat}_{m\times n}(\mathbb{R})$, already certified by Theorems 3.10 and 1.7. The space of all real-valued functions on a set $X$,

$$
\mathcal{F}(X, \mathbb{R}) = \{f \mid f : X \to \mathbb{R}\},
$$

with pointwise operations: $(f + g)(x) = f(x) + g(x)$ and $(kf)(x) = k\,f(x)$; the zero vector is the zero function (the function constantly equal to $0$, not the number $0$, a distinction beginners should say aloud once), and $(-f)(x) = -f(x)$. Each axiom for $\mathcal{F}(X,\mathbb{R})$ reduces, at every point $x$ separately, to the corresponding law for real numbers. Inside it sit the spaces $C(-\infty, \infty)$ and $C[a,b]$ of continuous functions on the line and on an interval; sums and scalar multiples of continuous functions are continuous, which is why these are spaces in their own right. Taking $X = \mathbb{N}$ gives the space of infinite sequences of reals, a function $\mathbb{N} \to \mathbb{R}$ being nothing but a sequence $(a_n)$. Finally the polynomial spaces: $\mathcal{P} = \mathcal{P}[x]$, all real polynomials $a_0 + a_1x + \cdots + a_nx^n$ of arbitrary degree, and for each fixed $n$,

$$
\mathcal{P}_n = \mathcal{P}_n[x] = \{a_0 + a_1x + \cdots + a_nx^n \mid a_i \in \mathbb{R}\},
$$

the polynomials of degree at most $n$.

The phrase "at most" is doing load-bearing work. The set of polynomials of degree exactly $n$ is not a vector space: it misses the zero polynomial, and it is not closed under addition, since $x^n$ and $-x^n + 1$ both have degree $n$ while their sum has degree $0$. Only by admitting all lower degrees (and the zero polynomial, to which one assigns no degree or degree $-\infty$ by convention) does the set close up. This example is the first of many where the closure clauses, invisible in the axiom list, decide everything.

## 4. Subspaces

### 4.1 The definition, and what actually needs checking

Definition. Let $V$ be a vector space and $W \subseteq V$. Then $W$ is a subspace of $V$ if $W$ is itself a vector space under the addition and scalar multiplication it inherits from $V$. One writes $W \leq V$, and $W < V$ when moreover $W \neq V$.

Taken literally, verifying subspacehood means checking ten conditions: the eight axioms plus closure under the two operations. The pleasant surprise (Remark 3.14) is that most of the axioms are inherited automatically. Associativity, commutativity, and the four scalar laws (SM1)–(SM4) are universally quantified identities: they hold for all vectors of $V$, hence in particular for all vectors of $W$, with nothing to check. What survives as a genuine question is exactly what existence and closure assert about the subset itself: whether sums and scalar multiples of elements of $W$ stay in $W$; whether $W$ contains a zero vector; whether $W$ contains the negative of each of its elements. And even this short list collapses further, because closure under scalar multiplication delivers the last two for free: if $\vec{w} \in W$, then $0\vec{w} = \vec{0} \in W$ and $(-1)\vec{w} = -\vec{w} \in W$, by Theorem 3.12. The residue is the following test, which is the single most-used criterion in the chapter.

Theorem 3.15 (subspace test). Let $V$ be a vector space and $\emptyset \neq W \subseteq V$. The following are equivalent:

1. $W$ is a subspace of $V$;
2. $W$ is closed under addition and under scalar multiplication: for all $\vec{w}_1, \vec{w}_2 \in W$ and $k \in \mathbb{R}$, both $\vec{w}_1 + \vec{w}_2 \in W$ and $k\vec{w}_1 \in W$;
3. $W$ is closed under linear combinations of pairs: for all $\vec{w}_1, \vec{w}_2 \in W$ and $k_1, k_2 \in \mathbb{R}$, $k_1\vec{w}_1 + k_2\vec{w}_2 \in W$.

The hypothesis $W \neq \emptyset$ is not decorative: the empty set is closed under everything vacuously, yet contains no zero vector and is no vector space. In practice the standard opening move of any subspace verification is to exhibit $\vec{0} \in W$: this both certifies nonemptiness and serves as the quickest disqualification test. A subset that fails to contain the zero vector cannot be a subspace, and one should check this first, before anything else.

Theorem 3.16. The solution set of any homogeneous system $A\vec{x} = \vec{0}$ of $m$ equations in $n$ unknowns is a subspace of $\mathbb{R}^n$, the solution space of the system.

The verification is the subspace test verbatim: $\vec{0}$ is a solution (the trivial solution of Chapter 1, guaranteeing nonemptiness), and if $A\vec{x}_1 = \vec{0}$ and $A\vec{x}_2 = \vec{0}$ then

$$
A(k_1\vec{x}_1 + k_2\vec{x}_2) = k_1A\vec{x}_1 + k_2A\vec{x}_2 = \vec{0}.
$$

Note the essential role of homogeneity: for $\vec{b} \neq \vec{0}$ the solution set of $A\vec{x} = \vec{b}$ contains no zero vector and is not a subspace. What it is instead, a translated copy of a subspace, is the subject of §12.

### 4.2 A catalog of subspaces

Example 3.17. In $\mathbb{R}^2$ the complete list of subspaces is: $\{\vec{0}\}$, the lines through the origin, and $\mathbb{R}^2$ itself. In $\mathbb{R}^3$: $\{\vec{0}\}$, lines through the origin, planes through the origin, and $\mathbb{R}^3$. (That these lists are complete is best seen with the dimension theory of §7: a subspace of a $3$-dimensional space has dimension $0, 1, 2$, or $3$, and these are the four kinds.) The recurring phrase "through the origin" is Theorem 3.12 speaking: a subspace must contain $\vec{0}$, so a line or plane missing the origin is disqualified at the door. In the polynomial space $\mathcal{P}[x]$, each $\mathcal{P}_n[x]$ is a subspace, and these are nested: $\mathcal{P}_0 \leq \mathcal{P}_1 \leq \mathcal{P}_2 \leq \cdots$.

Example 3.18. Inside $\mathrm{Mat}_n(\mathbb{R})$, each of the distinguished families of Chapter 1 is a subspace: the symmetric matrices $\mathrm{Sym}_n(\mathbb{R}) = \{A \mid A^T = A\}$, the upper triangular matrices, the lower triangular matrices, and the diagonal matrices. In each case closure is a one-line check: for symmetry, $(k_1A + k_2B)^T = k_1A^T + k_2B^T = k_1A + k_2B$, which is Theorem 1.24 in the new vocabulary; for triangularity, the zero patterns are preserved by entrywise operations. It is instructive to notice which Chapter 1 family is absent from this list: the invertible matrices $GL(n,\mathbb{R})$ form no subspace, failing every clause at once, with no zero matrix and no closure under addition, since $I + (-I) = O$.

Example 3.19. Inside the function space $\mathcal{F}[a,b]$ sits a tower of subspaces ordered by increasing regularity:

$$
\mathcal{F}[a,b] \;\geq\; C[a,b] \;\geq\; C^1[a,b] \;\geq\; C^m[a,b] \;\geq\; C^\infty[a,b] \;\geq\; \mathcal{P}[x] \;\geq\; \mathcal{P}_n[x],
$$

where $C^m[a,b]$ consists of the functions with a continuous $m$-th derivative. Each containment is a subspace relation because each regularity property is preserved by sums and scalar multiples; the sum of two $m$-times continuously differentiable functions is again such, by the linearity of differentiation. This tower is the natural habitat of differential equations, whose solution sets (for linear homogeneous equations) turn out to be subspaces of it; the Wronskian of §6 belongs to this circle of ideas.

### 4.3 Three verdicts, worked in full

Example 3.20. Determine whether $W$ is a subspace of $V$.

(1) $W = \{(a,b,c) \in \mathbb{R}^3 \mid b = a + c\}$, $V = \mathbb{R}^3$. A subspace. The zero vector qualifies ($0 = 0 + 0$), so $W \neq \emptyset$. For closure, take $(a_1, b_1, c_1)$ and $(a_2, b_2, c_2)$ in $W$ and scalars $k_1, k_2$; the combination is $(k_1a_1 + k_2a_2,\; k_1b_1 + k_2b_2,\; k_1c_1 + k_2c_2)$, and its middle component satisfies

$$
k_1b_1 + k_2b_2 = k_1(a_1 + c_1) + k_2(a_2 + c_2) = (k_1a_1 + k_2a_2) + (k_1c_1 + k_2c_2),
$$

which is exactly the defining condition. Conceptually, $W$ is the solution space of the single homogeneous equation $a - b + c = 0$, hence a subspace by Theorem 3.16 without further ado, a plane through the origin in the taxonomy of Example 3.17. The general heuristic on display: conditions that are linear and homogeneous in the coordinates carve out subspaces.

(2) $W = \{A \in \mathrm{Mat}_n(\mathbb{R}) \mid \det(A) = 0\}$, $V = \mathrm{Mat}_n(\mathbb{R})$, $n \geq 2$. Not a subspace. It does contain the zero matrix and is even closed under scalar multiplication, since $\det(kA) = k^n\det(A) = 0$. Addition is where it fails, and one counterexample suffices:

$$
\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix} = I_2,
$$

two singular matrices summing to an invertible one. (For $n = 2$ as displayed; for larger $n$, pad with zeros, or note $\mathrm{diag}(1, \dots, 1, 0) + \mathrm{diag}(0, \dots, 0, 1) = I_n$.) The failure reflects a fact from Chapter 2 worth re-hearing: the determinant respects products but has no compatibility whatsoever with sums. Pedantry compels one footnote: in the trivial case $n = 1$, where $\det[a] = a$, the set $W$ is $\{0\}$ and is a subspace; the interesting claim is for $n \geq 2$.

(3) $W = \{f \in \mathcal{F}(-\infty,\infty) \mid f(1) = 0\}$, $V = \mathcal{F}(-\infty, \infty)$. A subspace. The zero function vanishes at $1$; and if $f(1) = g(1) = 0$, then $(k_1f + k_2g)(1) = k_1f(1) + k_2g(1) = 0$. The condition "$f(1) = 0$" is linear and homogeneous in $f$, and the same argument shows more generally that prescribing the vanishing of $f$ at any fixed set of points yields a subspace. By contrast, and this is the instructive companion, the set $\{f \mid f(1) = 1\}$ is not a subspace: it misses the zero function, and the sum of two of its members takes the value $2$ at the point $1$. Homogeneity of the constraint, once again, is everything.

### 4.4 New subspaces from old: intersections and sums

Theorem 3.21. If $W_1, \dots, W_m$ are subspaces of $V$, then so is $W_1 \cap W_2 \cap \cdots \cap W_m$.

The intersection is nonempty ($\vec{0}$ lies in every $W_i$), and a linear combination of two vectors belonging to all the $W_i$ belongs to each $W_i$ by that subspace's own closure, hence to the intersection. Geometrically in $\mathbb{R}^3$: two distinct planes through the origin intersect in a line through the origin, one subspace meeting another in a third.

Remark 3.22. Unions behave badly. The union of the two coordinate axes in $\mathbb{R}^2$ contains $(1,0)$ and $(0,1)$ but not their sum $(1,1)$, which lies on neither axis; so $W_1 \cup W_2$ is in general no subspace. (In fact $W_1 \cup W_2$ is a subspace only in the degenerate case where one of the two contains the other, a pleasant exercise.) The union is the wrong notion of "smallest space containing both"; the right notion is the following.

Theorem 3.23. For subspaces $W_1, \dots, W_m$ of $V$, define their sum

$$
W = W_1 + \cdots + W_m = \{\vec{w}_1 + \cdots + \vec{w}_m \mid \vec{w}_i \in W_i \text{ for each } i\},
$$

the set of all vectors decomposable as a sum of one contribution from each $W_i$. Then (1) $W$ is a subspace of $V$ containing $W_1 \cup \cdots \cup W_m$, and (2) $W$ is the smallest such subspace: any subspace of $V$ containing all the $W_i$ contains $W$.

For (1): $\vec{0} = \vec{0} + \cdots + \vec{0} \in W$; closure follows by regrouping, $(\vec{w}_1 + \cdots + \vec{w}_m) + (\vec{w}_1' + \cdots + \vec{w}_m') = (\vec{w}_1 + \vec{w}_1') + \cdots + (\vec{w}_m + \vec{w}_m')$ with each bracket in its $W_i$, and similarly for scalars; and each $W_i$ sits inside $W$ because any $\vec{w}_i$ can be padded with zeros from the other summands. For (2): a subspace $U$ containing every $W_i$ contains each $\vec{w}_i$, hence, being closed under addition, contains their sum. In $\mathbb{R}^2$, the sum of the two axes is all of $\mathbb{R}^2$, the honest repair of the defective union.

The characterization in (2), "the smallest subspace containing such-and-such," is a pattern about to recur, and the reader should mark its logical shape: smallestness is proved by showing that every competitor contains the candidate.

## 5. Span

### 5.1 Linear combinations, revisited in general

Definition. For vectors $\vec{v}_1, \dots, \vec{v}_r$ in a vector space $V$ and scalars $k_1, \dots, k_r$, the vector

$$
k_1\vec{v}_1 + k_2\vec{v}_2 + \cdots + k_r\vec{v}_r
$$

is a linear combination of $\vec{v}_1, \dots, \vec{v}_r$ with coefficients $k_1, \dots, k_r$.

This is Definition 1.11 transplanted from matrices to arbitrary vector spaces, and it remains the fundamental act of the subject: everything a vector space can "do" with a set of vectors, it does through linear combinations.

Theorem 3.24. Let $S$ be a nonempty set of vectors in $V$ and let $W$ be the set of all linear combinations of vectors in $S$. Then (1) $W$ is a subspace of $V$ containing $S$, and (2) $W$ is the smallest subspace of $V$ containing $S$: any subspace containing the vectors of $S$ contains $W$.

The proofs are the expected ones. A sum of two linear combinations of vectors from $S$ is again one (collect terms), as is a scalar multiple; each $\vec{v} \in S$ is the combination $1\vec{v}$; and any subspace $U \supseteq S$ contains, by closure, every combination of its elements, hence all of $W$. Note the exact parallel with Theorem 3.23: same statement shape, same proof shape; the sum of subspaces and the span of a set are two instances of one idea, "close up under the operations."

Definition. The subspace of Theorem 3.24 is the span of $S$, written $\mathrm{Span}(S)$; one says the vectors of $S$ span it. For a finite set (Corollary 3.25),

$$
\mathrm{Span}\{\vec{v}_1, \dots, \vec{v}_r\} = \{k_1\vec{v}_1 + \cdots + k_r\vec{v}_r \mid k_1, \dots, k_r \in \mathbb{R}\}.
$$

Geometric intuition: the span of a single nonzero vector in $\mathbb{R}^3$ is the line through the origin it determines; the span of two non-parallel vectors is the plane through the origin containing both; and generally $\mathrm{Span}(S)$ is "everything reachable from $S$ by scaling and adding." Theorem 3.26 records a pleasant reconciliation of §4.4 with the present section:

$$
\mathrm{Span}\{\vec{v}_1, \dots, \vec{v}_r\} = \mathrm{Span}\{\vec{v}_1\} + \cdots + \mathrm{Span}\{\vec{v}_r\},
$$

the span of a set being the sum of the lines (or $\{\vec{0}\}$'s) spanned by its members, immediate from unwinding both sides to the same set of combinations.

### 5.2 When do two sets span the same subspace?

Theorem 3.27. For nonempty subsets $S, S'$ of $V$, the following are equivalent: (1) $\mathrm{Span}(S) = \mathrm{Span}(S')$; (2) $S \subseteq \mathrm{Span}(S')$ and $S' \subseteq \mathrm{Span}(S)$.

The forward direction is immediate since $S \subseteq \mathrm{Span}(S)$ always. For the converse, suppose (2); then $\mathrm{Span}(S')$ is a subspace containing $S$, so by the minimality clause of Theorem 3.24 it contains $\mathrm{Span}(S)$; symmetrically $\mathrm{Span}(S) \supseteq \mathrm{Span}(S')$, and the two are equal. The practical force of the theorem: to prove two spans equal, one never computes the spans; one merely expresses each spanning vector of either set as a combination of the other set. Minimality does the heavy lifting.

Example 3.28. In $\mathbb{R}^3$, we claim

$$
\mathrm{Span}\{(1,0,0), (0,1,0)\} = \mathrm{Span}\{(1,1,0), (2,1,0)\}.
$$

Each vector of the second set is visibly a combination of the first:

$$
(1,1,0) = (1,0,0) + (0,1,0), \qquad (2,1,0) = 2(1,0,0) + (0,1,0).
$$

Each vector of the first set is a combination of the second; this direction requires solving, and one finds

$$
(1,0,0) = (2,1,0) - (1,1,0), \qquad (0,1,0) = 2(1,1,0) - (2,1,0),
$$

both verified by componentwise arithmetic: $(2-1,\ 1-1,\ 0) = (1,0,0)$ and $(2-2,\ 2-1,\ 0) = (0,1,0)$. By Theorem 3.27 the spans coincide; both, of course, are the $xy$-plane $\{(a, b, 0)\}$, but the proof never needed to say so. $\square$

## 6. Linear Independence

### 6.1 The definition, and what it is really about

Definition. Let $S$ be a nonempty subset of a vector space $V$.

1. $S$ is linearly independent if for every finite subset $\{\vec{v}_1, \dots, \vec{v}_r\}$ of distinct vectors of $S$, the equation
   $$
   k_1\vec{v}_1 + k_2\vec{v}_2 + \cdots + k_r\vec{v}_r = \vec{0}
   $$
   forces $k_1 = k_2 = \cdots = k_r = 0$.
2. $S$ is linearly dependent if it is not linearly independent, that is, if some finite collection of distinct vectors of $S$ admits a vanishing combination with at least one nonzero coefficient (a nontrivial relation).

The definition through finite subsets allows $S$ to be infinite (as it will be for bases of infinite-dimensional spaces); for a finite set $S = \{\vec{v}_1, \dots, \vec{v}_r\}$, Theorem 3.29 confirms the expected simplification: $S$ is independent if and only if the single equation $k_1\vec{v}_1 + \cdots + k_r\vec{v}_r = \vec{0}$ has only the trivial solution.

The trivial combination, all coefficients zero, always produces $\vec{0}$; that is Theorem 3.12 and no information at all. Independence asserts that this forced way is the only way: the zero vector cannot be manufactured from the set by any cleverness. Three degenerate cases calibrate the definition and are worth settling once and for all. Any set containing $\vec{0}$ is dependent, since $1 \cdot \vec{0} = \vec{0}$ is already a nontrivial relation. A single-vector set $\{\vec{v}\}$ is independent precisely when $\vec{v} \neq \vec{0}$, by Theorem 3.12(4). And a two-vector set is dependent precisely when one vector is a scalar multiple of the other, "parallel" in geometric language.

That last observation generalizes into the statement that best explains what dependence means:

Theorem 3.30. For a set $S$ with at least two vectors, the following are equivalent: (1) $S$ is linearly dependent; (2) some $\vec{v} \in S$ lies in $\mathrm{Span}(S - \{\vec{v}\})$, that is, some member of $S$ is a linear combination of the others.

For (1) $\Rightarrow$ (2): a nontrivial relation $k_1\vec{v}_1 + \cdots + k_r\vec{v}_r = \vec{0}$ has some $k_j \neq 0$; solving for that vector,

$$
\vec{v}_j = -\tfrac{k_1}{k_j}\vec{v}_1 - \cdots - \tfrac{k_{j-1}}{k_j}\vec{v}_{j-1} - \tfrac{k_{j+1}}{k_j}\vec{v}_{j+1} - \cdots - \tfrac{k_r}{k_j}\vec{v}_r,
$$

exhibits it inside the span of the rest. Conversely, if $\vec{v} = c_1\vec{u}_1 + \cdots + c_s\vec{u}_s$ with the $\vec{u}_i \in S - \{\vec{v}\}$, then $c_1\vec{u}_1 + \cdots + c_s\vec{u}_s + (-1)\vec{v} = \vec{0}$ is a nontrivial relation (the coefficient $-1$ is nonzero regardless of the $c_i$). $\square$

The moral vocabulary: dependence means redundancy. A dependent set carries at least one vector that contributes nothing to the span, being already reachable from its colleagues; an independent set is one in which every vector earns its place. The whole theory of bases in §7 is the systematic pursuit of spanning sets with no redundancy.

One caution about the quantifier in (2): dependence guarantees that some vector is a combination of the others, not that every vector is. In $\{(1,0), (2,0), (0,1)\}$ the first two vectors are each combinations of the rest, while $(0,1)$ is a combination of no multiple of $(1,0)$ and $(2,0)$ whatsoever.

### 6.2 Independence in $\mathbb{R}^n$ is a linear system

Remark 3.31. For vectors $\vec{v}_1, \dots, \vec{v}_r \in \mathbb{R}^n$, written as columns, the defining equation of independence is a homogeneous linear system:

$$
c_1\vec{v}_1 + c_2\vec{v}_2 + \cdots + c_r\vec{v}_r = \vec{0} \iff \begin{bmatrix} \vec{v}_1 & \vec{v}_2 & \cdots & \vec{v}_r \end{bmatrix} \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_r \end{bmatrix} = \vec{0},
$$

by the column-combination interpretation of matrix–vector products (Theorem 1.12): the left side is the product of the $n \times r$ matrix with columns $\vec{v}_j$ against the coefficient column. Independence of the vectors is thus exactly the statement that this homogeneous system has only the trivial solution, and the entire machinery of Chapter 1 comes online. In particular:

Theorem 3.32. Any set of $r > n$ vectors in $\mathbb{R}^n$ is linearly dependent.

For the associated homogeneous system has $n$ equations in $r$ unknowns with $r > n$; by Theorem 1.43 (more unknowns than equations, homogeneous) it has nontrivial solutions, each of which is a nontrivial relation. The geometric content for small $n$: three vectors in a plane cannot avoid redundancy; four vectors in space cannot either.

Example 3.33. (1) The set $\{(1,2), (2,3), (4,5)\}$ in $\mathbb{R}^2$ is dependent: three vectors, two dimensions, and Theorem 3.32 applies. The theorem is nonconstructive, but here the relation is easy to extract: solving the system of Remark 3.31 yields the one-parameter family $(c_1, c_2, c_3) = t(2, -3, 1)$, and indeed

$$
2(1,2) - 3(2,3) + 1(4,5) = (2 - 6 + 4,\; 4 - 9 + 5) = (0,0).
$$

(2) The set $\{(1,2,3), (2,3,3), (3,4,5), (3,1,3)\}$ in $\mathbb{R}^3$ is dependent: four vectors in $\mathbb{R}^3$, and $4 > 3$. No computation is required, which is precisely the charm of the theorem.

### 6.3 Independence of functions: the Wronskian

In $\mathbb{R}^n$, testing independence is a matter of row reduction. In function spaces the vectors are functions, a relation $k_1f_1 + \cdots + k_nf_n = 0$ is an identity required to hold at every point, and no finite computation obviously settles the matter. Calculus supplies a tool.

Definition 3.34. For functions $f_1, \dots, f_n$ of class $C^{n-1}$ on $\mathbb{R}$ (that is, possessing continuous derivatives up to order $n - 1$), their Wronskian is the function

$$
W(f_1, \dots, f_n)(x) = \begin{vmatrix} f_1(x) & f_2(x) & \cdots & f_n(x) \\ f_1'(x) & f_2'(x) & \cdots & f_n'(x) \\ \vdots & \vdots & & \vdots \\ f_1^{(n-1)}(x) & f_2^{(n-1)}(x) & \cdots & f_n^{(n-1)}(x) \end{vmatrix},
$$

at each $x$ the determinant of the $n \times n$ matrix whose columns list a function and its first $n - 1$ derivatives.

Theorem 3.35. If the Wronskian of $C^{n-1}$ functions $f_1, \dots, f_n$ is not identically zero on $\mathbb{R}$, that is, if it is nonzero at even a single point, then $\{f_1, \dots, f_n\}$ is linearly independent in $C^{n-1}(\mathbb{R}, \mathbb{R})$.

Proof. We argue the contrapositive: dependence forces the Wronskian to vanish everywhere. Suppose there are scalars $k_1, \dots, k_n$, not all zero, with $k_1f_1 + \cdots + k_nf_n = 0$ as functions. An identity of functions may be differentiated, and differentiating $n - 1$ times yields, for every $x \in \mathbb{R}$, the simultaneous equations

$$
\begin{cases} k_1f_1(x) + \cdots + k_nf_n(x) = 0 \\ k_1f_1'(x) + \cdots + k_nf_n'(x) = 0 \\ \qquad\vdots \\ k_1f_1^{(n-1)}(x) + \cdots + k_nf_n^{(n-1)}(x) = 0, \end{cases}
$$

that is, for every $x$ the Wronskian matrix times the fixed nonzero column $(k_1, \dots, k_n)^T$ equals $\vec{0}$. So at every $x$ the homogeneous system with the Wronskian matrix as coefficient matrix has a nontrivial solution, whence by the equivalence theorem (in its Chapter 2 form: nontrivial null solutions force vanishing determinant) $W(f_1, \dots, f_n)(x) = 0$ for all $x$. This contradicts the hypothesis that $W$ is somewhere nonzero. $\square$

The logic deserves a caution posted in large letters. The theorem is a one-way test:

$$
W \not\equiv 0 \implies \text{independent}, \qquad\text{equivalently}\qquad \text{dependent} \implies W \equiv 0.
$$

The converse fails: an identically vanishing Wronskian does not certify dependence. The classical counterexample is the pair $f_1(x) = x^3$ and $f_2(x) = |x|^3$ on $\mathbb{R}$ (the latter is of class $C^2$, so the hypotheses apply). For $x \geq 0$ the two functions are equal and for $x \leq 0$ they are negatives, so on each half-line the $2 \times 2$ Wronskian has proportional columns and vanishes; thus $W \equiv 0$ on $\mathbb{R}$. Yet no single pair of constants works globally: $k_1x^3 + k_2|x|^3 = 0$ evaluated at $x = 1$ gives $k_1 + k_2 = 0$ while at $x = -1$ it gives $-k_1 + k_2 = 0$, forcing $k_1 = k_2 = 0$. Independent, Wronskian identically zero. A vanishing Wronskian is therefore a verdict of "test inconclusive," never "dependent." If one independently knows the functions to be dependent, the theorem does predict $W \equiv 0$, a useful consistency check.

Example 3.36. We apply the test to three sets in $\mathcal{F}(\mathbb{R}, \mathbb{R})$.

(1) $S = \{x, \sin x\}$. The Wronskian is

$$
W(x) = \begin{vmatrix} x & \sin x \\ 1 & \cos x \end{vmatrix} = x\cos x - \sin x,
$$

and $W(\pi) = \pi(-1) - 0 = -\pi \neq 0$. One nonzero value suffices: the set is linearly independent. (Geometrically plausible: no constant multiple of a straight line is a sine wave.)

(2) $S = \{1, e^x, e^{2x}\}$. Here

$$
W(x) = \begin{vmatrix} 1 & e^x & e^{2x} \\ 0 & e^x & 2e^{2x} \\ 0 & e^x & 4e^{2x} \end{vmatrix} = 1 \cdot \begin{vmatrix} e^x & 2e^{2x} \\ e^x & 4e^{2x} \end{vmatrix} = 4e^{3x} - 2e^{3x} = 2e^{3x},
$$

expanding along the first column, whose lower entries vanish because the derivative of the constant $1$ is $0$. Since $2e^{3x} > 0$ for every $x$, the set is independent, a fact of standing importance, since $\{1, e^x, e^{2x}\}$ is exactly the kind of solution family produced by constant-coefficient differential equations, and its independence is what makes general solutions genuinely general.

(3) $S = \{6,\; 3\sin^2 x,\; 2\cos^2 x\}$. No Wronskian is needed, for the Pythagorean identity $\sin^2 x + \cos^2 x = 1$ furnishes an explicit nontrivial relation:

$$
1 \cdot 6 \;+\; (-2)\cdot 3\sin^2 x \;+\; (-3) \cdot 2\cos^2 x \;=\; 6 - 6\sin^2 x - 6\cos^2 x \;=\; 6 - 6 \;=\; 0
$$

identically in $x$, with coefficients $(1, -2, -3)$ visibly not all zero. The set is linearly dependent, and, in accordance with the theorem's contrapositive, its Wronskian must vanish identically, as the diligent reader may confirm by direct (if tedious) computation. The example also illustrates the correct division of labor: to prove dependence, exhibit a relation; to prove independence, the Wronskian (or a direct argument) is the tool.

## 7. Basis and Dimension

### 7.1 Finite-dimensionality, and the definition of a basis

Definition 3.37. A vector space $V$ is finite-dimensional if some finite set of vectors spans it, and infinite-dimensional otherwise.

Example 3.38. Finite-dimensional: $\mathbb{R}^n$, $\mathcal{P}_n[x]$, and $\mathrm{Mat}_{m\times n}(\mathbb{R})$; finite spanning sets are exhibited momentarily. Infinite-dimensional: $\mathcal{F}(\mathbb{R},\mathbb{R})$, $C(\mathbb{R},\mathbb{R})$, $C^m$, $C^\infty$, and $\mathcal{P}[x]$. For the last of these the reason is within reach of present tools: any finite set of polynomials has a maximum degree $N$, so its span lies inside $\mathcal{P}_N[x]$ and misses $x^{N+1}$; no finite set can span all of $\mathcal{P}[x]$. Since $\mathcal{P}[x]$ sits inside each of the function spaces listed, and (by Theorem 3.46 below, applied contrapositively) a space containing an infinite-dimensional subspace is itself infinite-dimensional, the rest of the list follows.

Definition. A nonempty set $\mathcal{B}$ of vectors in $V$ is a basis for $V$ if (i) $\mathcal{B}$ is linearly independent and (ii) $\mathcal{B}$ spans $V$.

The two requirements pull in opposite directions, and a basis is their equilibrium. Spanning says the set is big enough: everything in $V$ is reachable. Independence says it is not too big: no member is redundant. A basis is a minimal spanning set, and equally a maximal independent set: a set of vectors exactly sufficient to coordinatize the space, as §8 will make literal.

Example 3.39 (standard bases). In $\mathbb{R}^n$, the set $\{\vec{e}_1, \dots, \vec{e}_n\}$ of standard basis vectors ($\vec{e}_k$ having $1$ in position $k$ and $0$ elsewhere) is a basis: it spans because $(v_1, \dots, v_n) = v_1\vec{e}_1 + \cdots + v_n\vec{e}_n$, and a vanishing combination $k_1\vec{e}_1 + \cdots + k_n\vec{e}_n = (k_1, \dots, k_n) = \vec{0}$ visibly forces all $k_i = 0$. In $\mathcal{P}_n[x]$, the monomials $\{1, x, x^2, \dots, x^n\}$ form the standard basis: they span by the very definition of polynomial, and independence is the statement that a polynomial with some nonzero coefficient is not the zero function, true because a nonzero polynomial of degree $d$ has at most $d$ roots and so cannot vanish identically. In $\mathrm{Mat}_{m\times n}(\mathbb{R})$, the matrix units $M_{ij}$ (the matrix with $1$ in position $(i,j)$ and $0$ elsewhere, for $1 \leq i \leq m$, $1 \leq j \leq n$) form the standard basis: every matrix is the combination $\sum_{i,j} a_{ij}M_{ij}$ of them with its own entries as coefficients, uniquely so.

Counting these bases foreshadows the notion of dimension: $n$ vectors for $\mathbb{R}^n$, $mn$ for $\mathrm{Mat}_{m\times n}(\mathbb{R})$, and, a trap for the unwary, $n + 1$ (not $n$) for $\mathcal{P}_n[x]$, the monomials running from $x^0$ through $x^n$ inclusive.

### 7.2 All bases have the same size

The definition of dimension about to be given, the number of vectors in a basis, is only legitimate if that number does not depend on which basis one counts. This is the fundamental theorem of the section.

Theorem 3.40. Let $V$ be finite-dimensional with basis $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$. Then (1) any set with more than $n$ vectors is linearly dependent, and (2) any set with fewer than $n$ vectors fails to span $V$.

Proof of (2). Suppose, for contradiction, that some set $S = \{\vec{w}_1, \dots, \vec{w}_l\}$ spans $V$ with $l < n$. Since $S$ spans, each basis vector is expressible through it: for each $j = 1, \dots, n$,

$$
\vec{v}_j = a_{1j}\vec{w}_1 + a_{2j}\vec{w}_2 + \cdots + a_{lj}\vec{w}_l
$$

for some scalars $a_{ij}$. Now consider any candidate relation $k_1\vec{v}_1 + \cdots + k_n\vec{v}_n = \vec{0}$ among the basis vectors. Substituting the expressions above and collecting the coefficient of each $\vec{w}_i$,

$$
\vec{0} = (k_1a_{11} + k_2a_{12} + \cdots + k_na_{1n})\vec{w}_1 + \cdots + (k_1a_{l1} + k_2a_{l2} + \cdots + k_na_{ln})\vec{w}_l.
$$

This certainly holds if all $l$ coefficients vanish, i.e. if $(k_1, \dots, k_n)$ solves the homogeneous system

$$
\begin{cases} a_{11}k_1 + a_{12}k_2 + \cdots + a_{1n}k_n = 0 \\ \qquad\vdots \\ a_{l1}k_1 + a_{l2}k_2 + \cdots + a_{ln}k_n = 0, \end{cases}
$$

which has $l$ equations in $n$ unknowns with $n > l$, and therefore, by Theorem 1.43, a nontrivial solution. That nontrivial $(k_1, \dots, k_n)$ makes $k_1\vec{v}_1 + \cdots + k_n\vec{v}_n = \vec{0}$ a nontrivial relation among $\vec{v}_1, \dots, \vec{v}_n$, contradicting the linear independence of the basis $\mathcal{B}$. $\square$

(Part (1) is proved by the same counting argument with the roles reversed: express each vector of the too-large set through the basis, and the resulting homogeneous system again has more unknowns than equations.) It is worth savoring what carried the proof: the humble Theorem 1.43 (a homogeneous system with more unknowns than equations has nontrivial solutions), which we proved in Chapter 1 by counting free variables. That elementary counting fact is the engine underneath the entire concept of dimension.

Theorem 3.41. All bases of a finite-dimensional vector space contain the same number of vectors.

For if $\mathcal{B}$ and $\mathcal{B}'$ are bases with $|\mathcal{B}| = n$ and $|\mathcal{B}'| = m$, then $\mathcal{B}'$, being independent, has at most $n$ vectors by Theorem 3.40(1), so $m \leq n$; symmetrically $n \leq m$; hence $m = n$. $\square$

Definition 3.42. The dimension of a finite-dimensional space $V$, written $\dim(V)$, is the number of vectors in any (hence every) basis; for the zero space one sets $\dim\{\vec{0}\} = 0$. (The zero space needs its own clause because it has no basis under our definitions, its only spanning set being $\{\vec{0}\}$, which is dependent, and the convention $\dim = 0$ is the coherent extension.)

From the standard bases: $\dim \mathbb{R}^n = n$, $\dim \mathcal{P}_n[x] = n + 1$, and $\dim \mathrm{Mat}_{m\times n}(\mathbb{R}) = mn$. Two further examples the reader can verify against Example 3.18: $\dim \mathrm{DiagMat}_n(\mathbb{R}) = n$ (the units $M_{ii}$ form a basis), and $\dim \mathrm{Sym}_n(\mathbb{R}) = \tfrac{n(n+1)}{2}$: a symmetric matrix is freely determined by its entries on and above the diagonal, of which there are $n + (n-1) + \cdots + 1$.

### 7.3 Growing and shrinking sets: the Plus/Minus theorem

Theorem 3.43 (Plus/Minus). Let $S$ be a nonempty set of vectors in $V$.

1. If $S$ is linearly independent and $\vec{w} \in V$ lies outside $\mathrm{Span}(S)$, then $S \cup \{\vec{w}\}$ is still linearly independent.
2. If $\vec{w} \in S$ lies inside $\mathrm{Span}(S - \{\vec{w}\})$, then removing it changes nothing: $\mathrm{Span}(S - \{\vec{w}\}) = \mathrm{Span}(S)$.

Proof of (2). One inclusion is automatic: $S - \{\vec{w}\} \subseteq S$, so every combination of the smaller set is a combination of the larger, and $\mathrm{Span}(S - \{\vec{w}\}) \subseteq \mathrm{Span}(S)$. For the reverse, take $\vec{v} \in \mathrm{Span}(S)$; then

$$
\vec{v} = k_1\vec{u}_1 + \cdots + k_s\vec{u}_s + k\vec{w}
$$

for some $\vec{u}_1, \dots, \vec{u}_s \in S - \{\vec{w}\}$ and scalars $k_1, \dots, k_s, k$ (with $k = 0$ if $\vec{w}$ happens not to appear). By hypothesis $\vec{w}$ is itself a combination of vectors of $S - \{\vec{w}\}$, say $\vec{w} = l_1\vec{v}_1 + \cdots + l_r\vec{v}_r$; substituting,

$$
\vec{v} = k_1\vec{u}_1 + \cdots + k_s\vec{u}_s + k(l_1\vec{v}_1 + \cdots + l_r\vec{v}_r),
$$

which upon distributing is a linear combination of vectors of $S - \{\vec{w}\}$ alone. Hence $\mathrm{Span}(S) \subseteq \mathrm{Span}(S - \{\vec{w}\})$, and the spans are equal. $\square$

(For (1), the sketch: a vanishing combination $k_1\vec{v}_1 + \cdots + k_r\vec{v}_r + k\vec{w} = \vec{0}$ with vectors $\vec{v}_i \in S$ must have $k = 0$, since otherwise one could solve for $\vec{w}$ and place it inside $\mathrm{Span}(S)$ against hypothesis; and once $k = 0$, the independence of $S$ kills the remaining coefficients.)

The theorem is the precise license for two natural operations: an independent set may safely absorb any vector not already in its reach, and a spanning set may safely shed any redundant member. Iterating them yields the structural theorems that organize the whole subject:

Theorem 3.44. In an $n$-dimensional space $V$, a set $S$ of exactly $n$ vectors is a basis as soon as it satisfies either defining condition: if $S$ spans $V$, or if $S$ is independent, then it is a basis.

The logic: an independent $n$-set that failed to span could absorb an outside vector (Plus), producing an independent set of $n + 1$ vectors and contradicting Theorem 3.40(1); a spanning $n$-set that was dependent could shed a redundant vector (Minus), producing a spanning set of $n - 1$ vectors and contradicting 3.40(2). When the count is exactly right, each half of the basis definition implies the other, a genuine labor-saving device, used constantly. In $\mathbb{R}^n$ it combines with the equivalence theorem into the practical test: $n$ vectors in $\mathbb{R}^n$ form a basis exactly when the matrix having them as columns is invertible, i.e. has nonzero determinant.

Theorem 3.45. In a finite-dimensional $V$: (1) any finite spanning set can be reduced to a basis by deleting suitable vectors; (2) any independent set can be enlarged to a basis by adjoining suitable vectors.

For (1), repeatedly apply Minus: while the spanning set is dependent, some member is a combination of the others and may be removed without shrinking the span; the process halts (the set is finite) at a spanning set with no redundancy: a basis. For (2), repeatedly apply Plus: while the independent set fails to span, some vector lies outside its span and may be adjoined preserving independence; the process halts because independent sets cannot exceed $\dim(V)$ vectors. Every basis, in this light, sits at the meeting point of two processes, pruning spanning sets downward and growing independent sets upward.

Theorem 3.46. If $W$ is a subspace of a finite-dimensional space $V$, then (1) $W$ is finite-dimensional with $\dim(W) \leq \dim(V)$, and (2) $W = V$ if and only if $\dim(W) = \dim(V)$.

Assertion (1) follows by growing an independent set inside $W$ (any independent subset of $W$ is independent in $V$, hence has at most $\dim V$ members; a maximal one spans $W$, by Plus applied within $W$). For (2), the nontrivial direction: if $\dim(W) = \dim(V) = n$, a basis of $W$ is an independent set of $n$ vectors in $V$, hence by Theorem 3.44 a basis of $V$; so $W \supseteq \mathrm{Span}(\text{that basis}) = V$. This theorem retroactively certifies the completeness of the subspace catalog of Example 3.17: subspaces of $\mathbb{R}^3$ have dimension $0, 1, 2$, or $3$, and these are precisely the origin, the lines and planes through it, and the whole space.

## 8. Coordinates

### 8.1 Uniqueness of representation

Theorem 3.47. If $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$ is a basis for $V$, then every $\vec{u} \in V$ is expressible in the form $\vec{u} = c_1\vec{v}_1 + \cdots + c_n\vec{v}_n$ in exactly one way.

Both halves of the basis definition are consumed, one per half of the claim. Existence of a representation is the spanning property verbatim. For uniqueness, suppose two representations

$$
\vec{u} = c_1\vec{v}_1 + \cdots + c_n\vec{v}_n = d_1\vec{v}_1 + \cdots + d_n\vec{v}_n;
$$

subtracting,

$$
(c_1 - d_1)\vec{v}_1 + \cdots + (c_n - d_n)\vec{v}_n = \vec{0},
$$

and independence forces every coefficient $c_i - d_i$ to vanish, i.e. $c_i = d_i$ for all $i$. $\square$

The theorem explains, in retrospect, why the basis definition demands exactly its two conditions and no others: spanning is what makes coordinates exist, independence is what makes them unique, and a basis is precisely a set relative to which every vector acquires a well-defined address.

### 8.2 Coordinate vectors and the coordinate map

Definition 3.48. Let $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$ be an ordered basis for $V$ (the order now matters: the first coordinate belongs to the first basis vector) and $\vec{u} \in V$. Writing $\vec{u} = c_1\vec{v}_1 + \cdots + c_n\vec{v}_n$ with the unique scalars of Theorem 3.47, the $c_i$ are the coordinates of $\vec{u}$ relative to $\mathcal{B}$, assembled either as the coordinate vector

$$
(\vec{u})_{\mathcal{B}} = (c_1, c_2, \dots, c_n) \in \mathbb{R}^n
$$

or as the coordinate matrix (column form)

$$
[\vec{u}]_{\mathcal{B}} = \begin{bmatrix} c_1 \\ c_2 \\ \vdots \\ c_n \end{bmatrix}.
$$

The assignment $\varphi : V \to \mathbb{R}^n$, $\vec{u} \mapsto (\vec{u})_{\mathcal{B}}$, is the coordinate map.

The coordinate map is the philosophical center of the chapter, and its significance is easy to state: it converts the abstract space $V$ into the concrete space $\mathbb{R}^n$, faithfully. One checks readily that it respects the operations, $(\vec{u} + \vec{w})_{\mathcal{B}} = (\vec{u})_{\mathcal{B}} + (\vec{w})_{\mathcal{B}}$ and $(k\vec{u})_{\mathcal{B}} = k(\vec{u})_{\mathcal{B}}$, both by collecting coefficients, and Theorem 3.47 makes it a bijection. In later vocabulary $\varphi$ is an isomorphism: every $n$-dimensional real vector space, whatever its vectors "are," is structurally indistinguishable from $\mathbb{R}^n$. Polynomials in $\mathcal{P}_2[x]$, symmetric $2\times 2$ matrices, solutions of a differential equation: once a basis is chosen, all computations reduce to column vectors and the matrix technology of Chapters 1 and 2. This is why those chapters were worth the effort: they are not a special case but, up to coordinates, the general case.

Example 3.49. Let $\mathcal{B} = \{\vec{v}_1, \vec{v}_2, \vec{v}_3\}$ with $\vec{v}_1 = (1,2,1)$, $\vec{v}_2 = (2,9,0)$, $\vec{v}_3 = (3,3,4)$, a basis for $\mathbb{R}^3$. (That it is a basis can be certified by Theorem 3.44 plus Chapter 2: the matrix with these columns has determinant $-1 \neq 0$, as the reader may check.)

(1) Find $(\vec{v})_{\mathcal{B}}$ for $\vec{v} = (5, -1, 9)$. We must solve $c_1\vec{v}_1 + c_2\vec{v}_2 + c_3\vec{v}_3 = \vec{v}$, which componentwise is the linear system

$$
\begin{cases} c_1 + 2c_2 + 3c_3 = 5 \\ 2c_1 + 9c_2 + 3c_3 = -1 \\ c_1 \phantom{{}+2c_2} + 4c_3 = 9. \end{cases}
$$

From the third equation $c_1 = 9 - 4c_3$; substituting into the first gives $2c_2 - c_3 = -4$, i.e. $c_3 = 2c_2 + 4$, whence $c_1 = -7 - 8c_2$; the second equation then reads

$$
2(-7 - 8c_2) + 9c_2 + 3(2c_2 + 4) = -2 - c_2 = -1,
$$

so $c_2 = -1$, and back-substituting, $c_3 = 2$ and $c_1 = 1$. Thus $(\vec{v})_{\mathcal{B}} = (1, -1, 2)$, and the obligatory check confirms it:

$$
1(1,2,1) - 1(2,9,0) + 2(3,3,4) = (1 - 2 + 6,\; 2 - 9 + 6,\; 1 - 0 + 8) = (5, -1, 9). \checkmark
$$

(2) Find the vector $\vec{v}$ with $(\vec{v})_{\mathcal{B}} = (-1, 3, 2)$. This direction requires no solving, only assembling:

$$
\vec{v} = -1(1,2,1) + 3(2,9,0) + 2(3,3,4) = (-1 + 6 + 6,\; -2 + 27 + 6,\; -1 + 0 + 8) = (11, 31, 7).
$$

The asymmetry of the two parts is worth registering: coordinates to vector is a matrix–vector multiplication, while vector to coordinates is the solution of a linear system, the two directions of the same equation $[\vec{v}_1, \vec{v}_2, \vec{v}_3]\,[\vec{v}]_{\mathcal{B}} = \vec{v}$, read forwards and backwards.

## 9. Change of Basis

### 9.1 The problem and its solution

A vector is one thing; its coordinates are another, and they depend on the basis. The natural question, the change of basis problem, is how the addresses transform when the address system does: if the basis of $V$ is changed from $\mathcal{B}$ to $\mathcal{B}'$, how are $[\vec{u}]_{\mathcal{B}}$ and $[\vec{u}]_{\mathcal{B}'}$ related, for one and the same vector $\vec{u}$?

Theorem 3.50. Let $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$ (the "old" basis) and $\mathcal{B}' = \{\vec{v}_1', \dots, \vec{v}_n'\}$ (the "new") be bases of $V$. Then for every $\vec{u} \in V$,

$$
[\vec{u}]_{\mathcal{B}} = P\,[\vec{u}]_{\mathcal{B}'},
$$

where $P = P_{\mathcal{B}' \to \mathcal{B}}$, the transition matrix from $\mathcal{B}'$ to $\mathcal{B}$, is the $n \times n$ matrix whose columns are the old-basis coordinate columns of the new basis vectors:

$$
P_{\mathcal{B}' \to \mathcal{B}} = \big[\; [\vec{v}_1']_{\mathcal{B}} \;\big|\; [\vec{v}_2']_{\mathcal{B}} \;\big|\; \cdots \;\big|\; [\vec{v}_n']_{\mathcal{B}} \;\big].
$$

Proof. Write $[\vec{u}]_{\mathcal{B}'} = (c_1', \dots, c_n')^T$, so $\vec{u} = \sum_j c_j'\vec{v}_j'$, and let $p_{ij}$ be the entries of $P$, so that $\vec{v}_j' = \sum_i p_{ij}\vec{v}_i$ (the $j$-th column of $P$ lists the $\mathcal{B}$-coordinates of $\vec{v}_j'$). Substituting and exchanging the order of summation,

$$
\vec{u} = \sum_j c_j' \sum_i p_{ij}\vec{v}_i = \sum_i \Big(\sum_j p_{ij}c_j'\Big)\vec{v}_i.
$$

By uniqueness of representation (Theorem 3.47), the $\mathcal{B}$-coordinates of $\vec{u}$ are the bracketed sums, which are exactly the entries of the product $P[\vec{u}]_{\mathcal{B}'}$. $\square$

A word on conventions, since this topic breeds more sign-of-the-times confusion than any other in the course. The matrix carrying new coordinates to old is built from the new basis vectors expressed in the old basis. The mnemonic that survives contact with examination conditions: the subscript arrow of $P_{\mathcal{B}' \to \mathcal{B}}$ points the same way the matrix moves coordinates (it eats $\mathcal{B}'$-coordinates and returns $\mathcal{B}$-coordinates), and its columns describe the basis at the arrow's tail. When in doubt, test the formula on a basis vector itself: $[\vec{v}_1']_{\mathcal{B}'} = (1, 0, \dots, 0)^T$, and $P$ applied to it must return $[\vec{v}_1']_{\mathcal{B}}$, i.e. the first column of $P$, which the definition confirms.

Theorem 3.52. The transition matrix $P = P_{\mathcal{B}' \to \mathcal{B}}$ is invertible, and $P^{-1} = P_{\mathcal{B} \to \mathcal{B}'}$.

The two matrices undo one another on every coordinate column: for all $\vec{u}$,

$$
P_{\mathcal{B}' \to \mathcal{B}}\,P_{\mathcal{B} \to \mathcal{B}'}\,[\vec{u}]_{\mathcal{B}} = P_{\mathcal{B}' \to \mathcal{B}}\,[\vec{u}]_{\mathcal{B}'} = [\vec{u}]_{\mathcal{B}},
$$

so the product fixes every column of $\mathbb{R}^n$ (coordinate columns exhaust $\mathbb{R}^n$ as $\vec{u}$ ranges over $V$), and is therefore $I_n$; Theorem 1.52 upgrades this one-sided identity to full invertibility. Changing an address system, reassuringly, loses no information.

### 9.2 Worked examples

Example 3.51. In $\mathbb{R}^2$, let $\mathcal{B} = \{(1,0), (0,1)\}$ (the standard basis) and $\mathcal{B}' = \{(1,1), (2,1)\}$.

(1) Relative to the standard basis, the coordinates of any vector are its own components, so the columns of $P_{\mathcal{B}' \to \mathcal{B}}$ are simply the new basis vectors themselves:

$$
P_{\mathcal{B}' \to \mathcal{B}} = \begin{bmatrix} 1 & 2 \\ 1 & 1 \end{bmatrix}.
$$

(2) By Theorem 3.52 the reverse transition is the inverse, computed from the $2\times 2$ formula with determinant $1 \cdot 1 - 2 \cdot 1 = -1$:

$$
P_{\mathcal{B} \to \mathcal{B}'} = \begin{bmatrix} 1 & 2 \\ 1 & 1 \end{bmatrix}^{-1} = \frac{1}{-1}\begin{bmatrix} 1 & -2 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} -1 & 2 \\ 1 & -1 \end{bmatrix},
$$

and the product of the two matrices is indeed $I_2$, as multiplication confirms.

(3) Given $[\vec{u}]_{\mathcal{B}'} = \begin{bmatrix} -3 \\ 5 \end{bmatrix}$, the appropriate formula is $[\vec{u}]_{\mathcal{B}} = P_{\mathcal{B}' \to \mathcal{B}}[\vec{u}]_{\mathcal{B}'}$:

$$
[\vec{u}]_{\mathcal{B}} = \begin{bmatrix} 1 & 2 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} -3 \\ 5 \end{bmatrix} = \begin{bmatrix} 7 \\ 2 \end{bmatrix}.
$$

Sanity check straight from the definitions: the claim is that $-3(1,1) + 5(2,1) = 7(1,0) + 2(0,1)$, and indeed both sides equal $(7, 2)$.

Example 3.53. Coordinates are not confined to $\mathbb{R}^n$; here is the same computation in a polynomial space. In $\mathcal{P}_1[x]$, let $\mathcal{B} = \{\vec{p}_1, \vec{p}_2\}$ with $\vec{p}_1 = 6 + 3x$, $\vec{p}_2 = 10 + 2x$, and $\mathcal{B}' = \{\vec{q}_1, \vec{q}_2\}$ with $\vec{q}_1 = 2$, $\vec{q}_2 = 3 + 2x$. To build $P_{\mathcal{B}' \to \mathcal{B}}$ we express each $\vec{q}_j$ through $\mathcal{B}$. For $\vec{q}_1$: seeking $a, b$ with $2 = a(6 + 3x) + b(10 + 2x)$, compare coefficients of $1$ and of $x$:

$$
6a + 10b = 2, \qquad 3a + 2b = 0.
$$

The second gives $a = -\tfrac{2b}{3}$; substituting, $-4b + 10b = 2$, so $b = \tfrac13$ and $a = -\tfrac29$. For $\vec{q}_2$: $3 + 2x = a(6+3x) + b(10+2x)$ yields

$$
6a + 10b = 3, \qquad 3a + 2b = 2,
$$

whence $a = \tfrac{2 - 2b}{3}$ and $4 + 6b = 3$, so $b = -\tfrac16$ and $a = \tfrac79$. Therefore

$$
P_{\mathcal{B}' \to \mathcal{B}} = \begin{bmatrix} -\tfrac29 & \tfrac79 \\[2pt] \tfrac13 & -\tfrac16 \end{bmatrix},
$$

and both columns check against the original polynomials: $-\tfrac29(6+3x) + \tfrac13(10+2x) = (-\tfrac43 + \tfrac{10}{3}) + (-\tfrac23 + \tfrac23)x = 2$, and $\tfrac79(6+3x) - \tfrac16(10+2x) = (\tfrac{14}{3} - \tfrac53) + (\tfrac73 - \tfrac13)x = 3 + 2x$. The mechanics are identical to the $\mathbb{R}^2$ case (comparing coefficients of $1$ and $x$ is working in coordinates relative to the standard basis $\{1, x\}$), which is the coordinate-map philosophy of §8.2 in action.

### 9.3 An algorithm in $\mathbb{R}^n$

In $\mathbb{R}^n$ the computation of transition matrices reduces to a single row reduction.

Procedure. To compute $P_{\mathcal{B}' \to \mathcal{B}}$ for bases $\mathcal{B}, \mathcal{B}'$ of $\mathbb{R}^n$: form the $n \times 2n$ array $[\,\mathcal{B} \mid \mathcal{B}'\,]$ whose left block has the vectors of $\mathcal{B}$ as columns and right block the vectors of $\mathcal{B}'$; row-reduce to reduced row echelon form; the result is $[\,I \mid P_{\mathcal{B}' \to \mathcal{B}}\,]$.

Why it works. Write $B$ and $B'$ for the two column-block matrices. The defining property of the $j$-th column $\vec{p}_j$ of $P$ is $\vec{v}_j' = p_{1j}\vec{v}_1 + \cdots + p_{nj}\vec{v}_n$, which in matrix form reads $B\vec{p}_j = \vec{v}_j'$, a linear system with coefficient matrix $B$, one for each $j$, all sharing that coefficient matrix. Since $\mathcal{B}$ is a basis, $B$ is invertible and $\vec{p}_j = B^{-1}\vec{v}_j'$, i.e. $P = B^{-1}B'$. The procedure computes exactly this: reducing $[\,B \mid B'\,]$ to $[\,I \mid P\,]$ is left-multiplication by $B^{-1}$ throughout, the same logic as the inversion algorithm $[\,A \mid I\,] \to [\,I \mid A^{-1}\,]$ of Chapter 1, of which that algorithm is now the special case with $\mathcal{B}'$ the standard basis, run in reverse.

Example 3.54. In $\mathbb{R}^2$, let $\mathcal{B} = \{(1,0), (1,1)\}$ and $\mathcal{B}' = \{(-1,2), (-2,1)\}$.

(1) Assemble and reduce:

$$
[\,\mathcal{B} \mid \mathcal{B}'\,] = \left[\begin{array}{cc|cc} 1 & 1 & -1 & -2 \\ 0 & 1 & 2 & 1 \end{array}\right] \;\longrightarrow\; \left[\begin{array}{cc|cc} 1 & 0 & -3 & -3 \\ 0 & 1 & 2 & 1 \end{array}\right],
$$

the single step being the subtraction of row 2 from row 1. Hence

$$
P_{\mathcal{B}' \to \mathcal{B}} = \begin{bmatrix} -3 & -3 \\ 2 & 1 \end{bmatrix},
$$

and the columns verify against the definition:

$$
(-1, 2) = -3(1,0) + 2(1,1), \qquad (-2, 1) = -3(1,0) + 1(1,1),
$$

both immediate to check ($(-3+2, 2) = (-1,2)$ and $(-3+1, 1) = (-2,1)$).

(2) By Theorem 3.52, $P_{\mathcal{B} \to \mathcal{B}'} = P^{-1}$; with $\det P = (-3)(1) - (-3)(2) = 3$,

$$
P_{\mathcal{B} \to \mathcal{B}'} = \frac{1}{3}\begin{bmatrix} 1 & 3 \\ -2 & -3 \end{bmatrix},
$$

and multiplying the two matrices gives $\tfrac13\left[\begin{smallmatrix} -3+6 & -9+9 \\ 2-2 & 6-3 \end{smallmatrix}\right] = I_2$, as it must.

## 10. The Fundamental Subspaces of a Matrix

### 10.1 Row space, column space, and what row operations preserve

The chapter now closes the loop and turns its new vocabulary back onto the matrices of Chapter 1. Let $A = [a_{ij}] \in \mathrm{Mat}_{m \times n}(\mathbb{R})$, with row vectors $\vec{r}_1, \dots, \vec{r}_m \in \mathbb{R}^n$ (its rows, read as $n$-tuples) and column vectors $\vec{c}_1, \dots, \vec{c}_n \in \mathbb{R}^m$. Two subspaces arise at once:

$$
\mathrm{row}(A) = \mathrm{Span}\{\vec{r}_1, \dots, \vec{r}_m\} \;\leq\; \mathbb{R}^n, \qquad \mathrm{col}(A) = \mathrm{Span}\{\vec{c}_1, \dots, \vec{c}_n\} \;\leq\; \mathbb{R}^m,
$$

the row space and column space of $A$. Mark the asymmetry of habitats: for a nonsquare matrix the two spaces live in different ambient spaces ($\mathbb{R}^n$ versus $\mathbb{R}^m$) and cannot even be compared as sets. Example 3.55 displays the case of a $3 \times 4$ matrix, whose row space sits in $\mathbb{R}^4$ and column space in $\mathbb{R}^3$. The column space, incidentally, has already appeared in disguise: by Theorem 1.12, $\mathrm{col}(A)$ is exactly the set of vectors $\vec{b}$ for which $A\vec{x} = \vec{b}$ is consistent.

Theorem 3.56. Elementary row operations do not change the row space of a matrix.

Each operation replaces rows by linear combinations of rows, so the new rows lie in the old row space, giving $\mathrm{row}(EA) \subseteq \mathrm{row}(A)$; and since row operations are reversible, the inclusion runs the other way too. Example 3.57 illustrates: with $A = \left[\begin{smallmatrix} 3 & 1 & 2 \\ 1 & 1 & 2 \end{smallmatrix}\right]$ and $B = E_{12}(-2)A = \left[\begin{smallmatrix} 1 & -1 & -2 \\ 1 & 1 & 2 \end{smallmatrix}\right]$ (adding $-2$ times row 2 to row 1: $(3,1,2) - 2(1,1,2) = (1,-1,-2)$),

$$
\mathrm{Span}\{(3,1,2), (1,1,2)\} = \mathrm{Span}\{(1,-1,-2), (1,1,2)\},
$$

which one may confirm independently by the two-inclusions criterion of Theorem 3.27.

Columns behave differently, and the difference is instructive. Row operations do change the column space in general: reducing $\left[\begin{smallmatrix} 1 & 1 \\ 1 & 1\end{smallmatrix}\right]$ to $\left[\begin{smallmatrix} 1 & 1 \\ 0 & 0 \end{smallmatrix}\right]$ replaces a column space spanned by $(1,1)^T$ with one spanned by $(1,0)^T$. What they preserve is subtler and, for our purposes, better:

Theorems 3.58–3.59. If $B = EA$ for an elementary matrix $E$, then a given selection of columns of $A$ is linearly independent if and only if the corresponding columns of $B$ are; and a selection of columns of $A$ is a basis for $\mathrm{col}(A)$ if and only if the corresponding columns of $B$ form a basis for $\mathrm{col}(B)$.

The reason lies in Chapter 1's very first theorem about row operations: $A\vec{x} = \vec{0}$ and $EA\vec{x} = \vec{0}$ have the same solutions (Theorem 1.41), and by Remark 3.31 a linear relation among selected columns is a solution of the homogeneous system supported on those columns. Same solutions, same relations: the columns of $A$ and of $B$ satisfy identical dependency equations, coefficient for coefficient, even though the columns themselves move. Row reduction thus preserves the row space itself but only the dependency structure of the columns, a distinction that dictates the algorithms below.

Theorem 3.60. If $R$ is in row echelon form, then (1) the nonzero rows of $R$ (those with leading 1's) form a basis for $\mathrm{row}(R)$, and (2) the columns of $R$ containing the leading 1's form a basis for $\mathrm{col}(R)$.

Sketch: the nonzero rows span $\mathrm{row}(R)$ trivially, and the staircase of leading 1's makes them independent: in a vanishing combination, look at the position of the first leading 1; only one row has a nonzero entry there, killing its coefficient, and induct rightward. Similarly the pivot columns are independent (each introduces a $1$ in a row where its predecessors have zeros) and every non-pivot column is a combination of the pivot columns to its left, so they span.

Theorem 3.61. For every $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$, the row space and the column space have the same dimension.

This is genuinely surprising, since the two spaces inhabit different universes and no natural map between them is in sight, yet the elimination theory makes it almost bookkeeping. Reduce $A$ to a row echelon form $R$. Then $\dim \mathrm{row}(A) = \dim \mathrm{row}(R) =$ number of nonzero rows of $R$ (Theorems 3.56 and 3.60(1)) $=$ number of leading 1's; and $\dim \mathrm{col}(A) = \dim \mathrm{col}(R) =$ number of pivot columns (Theorems 3.59 and 3.60(2)) $=$ number of leading 1's again, each nonzero row carrying exactly one leading 1, each pivot column exactly one. The two dimensions are both counting the same staircase.

Definition. The common value is the rank of $A$, written $\mathrm{rank}(A)$.

### 10.2 The algorithms, executed in full

Example 3.62. Find bases for the row space and column space of

$$
A = \begin{bmatrix} 1 & -3 & 4 & -2 & 5 & 4 \\ 2 & -6 & 9 & -1 & 8 & 2 \\ 2 & -6 & 9 & -1 & 9 & 7 \\ -1 & 3 & -4 & 2 & -5 & -4 \end{bmatrix}.
$$

Row reduction (the reader is encouraged to reproduce it: $r_2 - 2r_1$, $r_3 - 2r_1$, $r_4 + r_1$ clear the first column, giving new rows $(0,0,1,3,-2,-6)$, $(0,0,1,3,-1,-1)$, $\vec{0}$; then $r_3 - r_2$ produces $(0,0,0,0,1,5)$; back-substitution upward finishes) yields the reduced row echelon form

$$
R = \begin{bmatrix} 1 & -3 & 0 & -14 & 0 & -37 \\ 0 & 0 & 1 & 3 & 0 & 4 \\ 0 & 0 & 0 & 0 & 1 & 5 \\ 0 & 0 & 0 & 0 & 0 & 0 \end{bmatrix},
$$

with leading 1's in columns $1, 3, 5$. Three conclusions, each drawn from its own theorem:

(1) Row space. Since $\mathrm{row}(A) = \mathrm{row}(R)$, the nonzero rows of $R$ serve directly:

$$
\mathcal{B}_{\mathrm{row}} = \{(1,-3,0,-14,0,-37),\; (0,0,1,3,0,4),\; (0,0,0,0,1,5)\}.
$$

(2) Column space. Here the preservation statement is about dependency structure, not the space itself, so one reads off which columns from $R$ but takes the columns from $A$. The pivot columns of $R$ are the standard vectors $\vec{e}_1, \vec{e}_2, \vec{e}_3$ of $\mathbb{R}^4$; the corresponding columns of $A$, the first, third, and fifth, form a basis for $\mathrm{col}(A)$:

$$
\mathcal{B}_{\mathrm{col}} = \left\{ \begin{bmatrix} 1 \\ 2 \\ 2 \\ -1 \end{bmatrix}, \begin{bmatrix} 4 \\ 9 \\ 9 \\ -4 \end{bmatrix}, \begin{bmatrix} 5 \\ 8 \\ 9 \\ -5 \end{bmatrix} \right\}.
$$

Taking the pivot columns of $R$ itself would be the classic error: they span $\mathrm{col}(R)$, which is generally a different subspace of $\mathbb{R}^4$ than $\mathrm{col}(A)$.

(3) Dependency equations. The non-pivot columns of $R$ announce their own recipes: column 2 of $R$ is $-3$ times column 1; column 4 is $-14 \cdot(\text{col }1) + 3\cdot(\text{col }3)$; column 6 is $-37\cdot(\text{col }1) + 4\cdot(\text{col }3) + 5\cdot(\text{col }5)$; the coefficients are simply the entries of the non-pivot column, read against the pivots above them. By Theorem 3.58 the same equations bind the columns of $A$:

$$
\vec{c}_2 = -3\vec{c}_1, \qquad \vec{c}_4 = -14\vec{c}_1 + 3\vec{c}_3, \qquad \vec{c}_6 = -37\vec{c}_1 + 4\vec{c}_3 + 5\vec{c}_5,
$$

and all three verify against the actual columns of $A$: for instance $-14(1,2,2,-1) + 3(4,9,9,-4) = (-2,-1,-1,2)$, which is precisely $\vec{c}_4$, and $-37(1,2,2,-1) + 4(4,9,9,-4) + 5(5,8,9,-5) = (4, 2, 7, -4) = \vec{c}_6$. In every direction, $\mathrm{rank}(A) = 3$.

A procedure for bases of $\mathrm{Span}(S)$. Given $S = \{\vec{v}_1, \dots, \vec{v}_k\} \subset \mathbb{R}^n$, two flavors of basis for $W = \mathrm{Span}(S)$ are available, corresponding to the two fundamental subspaces. If any convenient basis will do, place the vectors as rows of a matrix and row-reduce: the nonzero rows of the echelon form are a basis of $W$ (Theorems 3.56, 3.60), typically a pleasant one full of zeros. If instead the basis must consist of vectors from $S$ itself, place the vectors as columns, reduce, locate the pivot columns, and select the corresponding original vectors (Theorems 3.58–3.60); the non-pivot columns of the reduced form then hand over, as in the example above, the dependency equations expressing the discarded vectors through the kept ones.

Example 3.63. Let $S = \{\vec{v}_1, \vec{v}_2, \vec{v}_3, \vec{v}_4\} \subset \mathbb{R}^5$ with

$$
\vec{v}_1 = (1,-2,0,0,3), \quad \vec{v}_2 = (2,-5,-3,-2,6), \quad \vec{v}_3 = (0,5,15,10,0), \quad \vec{v}_4 = (2,6,18,8,6).
$$

(1) Any basis for $\mathrm{Span}(S)$. Rows method. With the four vectors as rows: $r_2 - 2r_1 = (0,-1,-3,-2,0)$ and $r_4 - 2r_1 = (0,10,18,8,0)$ clear the first column; negating the new second row to $(0,1,3,2,0)$, one finds $r_3 - 5 \cdot(0,1,3,2,0) = \vec{0}$ (the third vector evaporates) and $r_4' - 10\cdot(0,1,3,2,0) = (0,0,-12,-12,0)$, which normalizes to $(0,0,1,1,0)$; back-elimination gives the reduced form with nonzero rows

$$
\mathcal{B} = \{(1,0,0,-2,3),\; (0,1,0,-1,0),\; (0,0,1,1,0)\},
$$

a basis for $\mathrm{Span}(S)$, which therefore has dimension $3$.

(2) A basis for $\mathrm{Span}(S)$ drawn from $S$. Columns method. With the vectors as columns of a $5 \times 4$ matrix,

$$
B = \begin{bmatrix} 1 & 2 & 0 & 2 \\ -2 & -5 & 5 & 6 \\ 0 & -3 & 15 & 18 \\ 0 & -2 & 10 & 8 \\ 3 & 6 & 0 & 6 \end{bmatrix} \;\longrightarrow\; R' = \begin{bmatrix} 1 & 0 & 10 & 0 \\ 0 & 1 & -5 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}
$$

(reduction: $r_2 + 2r_1$, $r_5 - 3r_1$; then, with second row normalized to $(0,1,-5,-10)$, the operations $r_3 + 3r_2$ and $r_4 + 2r_2$ both leave $(0,0,0,-12)$, one of which is eliminated and the other normalized to $(0,0,0,1)$; back-elimination finishes). The pivots stand in columns $1, 2, 4$, so

$$
\mathcal{B}' = \{\vec{v}_1, \vec{v}_2, \vec{v}_4\} = \{(1,-2,0,0,3),\; (2,-5,-3,-2,6),\; (2,6,18,8,6)\}
$$

is a basis for $\mathrm{Span}(S)$ consisting of vectors of $S$, three of them, in agreement with part (1), as any two bases of one space must agree in count. The non-pivot third column of $R'$ delivers the dependency equation $\vec{v}_3 = 10\vec{v}_1 - 5\vec{v}_2$, which checks in all five components:

$$
10(1,-2,0,0,3) - 5(2,-5,-3,-2,6) = (10-10,\; -20+25,\; 15,\; 10,\; 30-30) = (0,5,15,10,0) = \vec{v}_3. \checkmark
$$

(A transcription of this example in circulation records the second row of $R'$ as $(0,1,-4,0)$; the correct entry is $-5$, as both the row reduction and the verified dependency equation above confirm, a reminder that dependency equations, being checkable, should always be checked.)

## 11. Null Space, Nullity, and the Rank–Nullity Theorem

### 11.1 The third fundamental subspace

Definition. For $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$, the null space of $A$ is the solution space of the homogeneous system:

$$
\mathrm{null}(A) = \mathcal{N}(A) = \{\vec{x} \in \mathbb{R}^n \mid A\vec{x} = \vec{0}\},
$$

a subspace of $\mathbb{R}^n$ by Theorem 3.16. Its dimension is the nullity of $A$, written $\mathrm{nullity}(A)$.

Theorem 3.64. Elementary row operations do not change the null space of a matrix.

This is Theorem 1.41 wearing new clothes: $A\vec{x} = \vec{0}$ and $EA\vec{x} = \vec{0}$ have identical solution sets when $E$ is invertible. It completes a tidy accounting of what elimination preserves: the row space (Theorem 3.56), the null space (here), and the dependency structure of the columns (Theorem 3.58), while the column space itself is the one casualty. The null space and the row space, note, share the habitat $\mathbb{R}^n$; and the sharp-eyed reader may notice from the RREF that every null space vector is orthogonal to every row, a relationship (the row space and null space as orthogonal complements) belonging to the next chapter but already visible in embryo.

### 11.2 Rank plus nullity

Theorem 3.65 (Dimension theorem for matrices). For every $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$,

$$
\mathrm{rank}(A) + \mathrm{nullity}(A) = n,
$$

the sum of the two dimensions being the number of columns of $A$.

Proof. The homogeneous system $A\vec{x} = \vec{0}$ has $n$ unknowns, and in the reduced row echelon form every unknown is exactly one of two kinds:

$$
(\text{number of leading variables}) + (\text{number of free variables}) = n.
$$

The leading variables are counted by the leading 1's of the RREF, and that count is $\mathrm{rank}(A)$, the dimension of the row space, by Theorems 3.56 and 3.60. The free variables are counted by the parameters in the general solution of $A\vec{x} = \vec{0}$; writing the general solution as $\vec{x} = t_1\vec{u}_1 + \cdots + t_k\vec{u}_k$ with one vector $\vec{u}_i$ per free variable, the $\vec{u}_i$ span the null space by construction and are independent (each has a $1$ in its own free-variable slot where the others have $0$), so their count is $\mathrm{nullity}(A)$. Substituting the two identifications into the displayed equation yields the theorem. $\square$

Underneath the formality this is the Free Variable Theorem of Chapter 1 (Theorem 1.42), upgraded from a count of parameters to a statement about dimensions, the parameters now recognized as coordinates relative to a basis of the null space. The theorem functions as a conservation law: the $n$ columns of a matrix divide their allegiance between rank and nullity, and information gained by one is lost by the other. A quick audit against Example 3.62: there $n = 6$, the rank was $3$, and indeed the RREF had three free variables (columns $2, 4, 6$), so the nullity is $3$ and $3 + 3 = 6$. One caution about the constant: the sum is the number of columns, always: not the number of rows, and not $\max(m,n)$, because rank and nullity are both facts about how the $n$ columns interact.

## 12. The Structure of Solution Sets

We can now say precisely what the solution set of a non-homogeneous system looks like, the promised repair of the observation, made in §4.1, that such sets are not subspaces.

Theorem 3.66. Let $A\vec{x} = \vec{b}$ be consistent, let $\vec{x}_0$ be any one of its solutions, and let $\{\vec{v}_1, \dots, \vec{v}_m\}$ be a basis for the solution space of the associated homogeneous system $A\vec{x} = \vec{0}$. Then the solutions of $A\vec{x} = \vec{b}$ are exactly the vectors of the form

$$
\vec{x} = k_1\vec{v}_1 + k_2\vec{v}_2 + \cdots + k_m\vec{v}_m + \vec{x}_0, \qquad k_1, \dots, k_m \in \mathbb{R}:
$$

every solution is of this form, and every vector of this form is a solution.

Proof. Both directions ride on one computation. If $\vec{x}$ solves $A\vec{x} = \vec{b}$, then

$$
A(\vec{x} - \vec{x}_0) = A\vec{x} - A\vec{x}_0 = \vec{b} - \vec{b} = \vec{0},
$$

so the difference $\vec{x} - \vec{x}_0$ lies in the null space and is therefore a combination $k_1\vec{v}_1 + \cdots + k_m\vec{v}_m$ of the basis; adding $\vec{x}_0$ back gives the displayed form. Conversely, for any scalars $k_i$,

$$
A(k_1\vec{v}_1 + \cdots + k_m\vec{v}_m + \vec{x}_0) = k_1A\vec{v}_1 + \cdots + k_mA\vec{v}_m + A\vec{x}_0 = \vec{0} + \cdots + \vec{0} + \vec{b} = \vec{b}. \qquad\square
$$

The attendant vocabulary: $\vec{x}_0$ is a particular solution of $A\vec{x} = \vec{b}$; the expression $k_1\vec{v}_1 + \cdots + k_m\vec{v}_m$ is the general solution of the homogeneous system; and their sum is the general solution of the non-homogeneous system. In slogan form:

$$
\text{(general solution of } A\vec{x} = \vec{b}\text{)} = \text{(particular solution)} + \text{(general solution of } A\vec{x} = \vec{0}\text{)}.
$$

Geometrically, the solution set of $A\vec{x} = \vec{b}$ is the null space translated by $\vec{x}_0$: a point, line, plane, or higher flat that is parallel to a subspace but, unless $\vec{b} = \vec{0}$, passes through $\vec{x}_0$ rather than the origin. This is why it fails the subspace test (no zero vector) while retaining all the shape of a subspace. The reader may recognize the principle from Example 1.44, where the solutions of a non-homogeneous system emerged in exactly the form $t(\tfrac12, \tfrac12, 1) + (-\tfrac92, -\tfrac52, 0)$ (homogeneous part plus particular solution), and will meet it again in differential equations, where "general = particular + homogeneous" is the organizing principle of the linear theory. It is the same theorem, because it is the same linearity.

## 13. The Equivalence Theorem, Again Enlarged

The chapter's new vocabulary attaches naturally to square matrices, and the master theorem grows accordingly.

Theorem 3.67. For an $n \times n$ matrix $A$, the following are equivalent:

1. $A$ is invertible;
2. the column vectors of $A$ are linearly independent;
3. the row vectors of $A$ are linearly independent;
4. the column vectors of $A$ span $\mathbb{R}^n$;
5. the row vectors of $A$ span $\mathbb{R}^n$;
6. the column vectors of $A$ form a basis for $\mathbb{R}^n$;
7. the row vectors of $A$ form a basis for $\mathbb{R}^n$;
8. $\mathrm{rank}(A) = n$;
9. $\mathrm{nullity}(A) = 0$.

The web of implications is worth tracing once, since every strand is a theorem already in hand. Independence of the columns means $A\vec{x} = \vec{0}$ has only the trivial solution (Remark 3.31), which is condition (2) of the original Theorem 1.54, so (2) here is invertibility by Chapter 1. Spanning by the columns means every $\vec{b} \in \mathbb{R}^n$ is a combination of the columns, i.e. every system $A\vec{x} = \vec{b}$ is consistent (Theorem 1.12), which is condition (6) of Theorem 1.54. That for a square matrix independence and spanning of the columns imply one another, rather than being separate demands, is Theorem 3.44: $n$ vectors in the $n$-dimensional space $\mathbb{R}^n$ form a basis on the strength of either property alone. Conditions (3), (5), (7) for rows reduce to the column statements applied to $A^T$, which is invertible exactly when $A$ is (Theorem 1.21). And (8), (9) are the same coin's two faces: $\mathrm{rank}(A) = n$ says the RREF has $n$ leading 1's, forcing it to be $I_n$ (Theorem 1.47); $\mathrm{nullity}(A) = 0$ says the null space is trivial; and rank–nullity makes each equivalent to the other.

Keeping cumulative accounts across the three essays: invertibility of $A$ is now one property with some fifteen faces: the six of Theorem 1.54, the determinant criterion $\det(A) \neq 0$ of Chapter 2, and the eight of the present theorem concerning the independence, spanning, and basis properties of the rows and columns, the maximality of the rank, and the triviality of the null space. A practicing linear algebraist holds this theorem the way a chess player holds the board: not as a list, but as a single position seen from many angles, with the freedom to reason from whichever face makes the problem at hand transparent.

## 14. Retrospect

The chapter executes one long ascent and one descent. The ascent: from arrows to tuples to the bare axioms, at which point "vector" means any element of any structure obeying the eight laws, and polynomials, matrices, functions, and sequences enter the theory on equal footing. On the plateau, the fundamental notions are built in strict logical order (subspace, the substructures; span, the smallest subspace through given vectors; independence, the absence of redundancy; basis, spanning without redundancy; dimension, the invariant count, guarded by Theorem 3.40's exchange argument, itself powered by nothing deeper than Chapter 1's free-variable count) and crowned by the coordinate map, which certifies that every $n$-dimensional space is, up to relabeling, $\mathbb{R}^n$, so that the concrete matrix technology of Chapters 1 and 2 is secretly the general theory. The descent: back to matrices, where the new concepts organize themselves into the row space, column space, and null space, the rank, the conservation law $\mathrm{rank} + \mathrm{nullity} = n$, the structure theorem "particular plus homogeneous" for solution sets, and eight new faces of the equivalence theorem.

A reader wishing to certify ownership of the chapter should be able to reconstruct, unaided: the proof from the axioms that $0\vec{u} = \vec{0}$ and its three companions; the subspace test and the reason the zero-vector check comes first; the counterexample of two singular matrices summing to the identity; why the union of two subspaces fails and the sum repairs it; the redundancy characterization of dependence and the quantifier trap inside it; the Wronskian's one-way logic, with $x^3$ and $|x|^3$ standing guard against the false converse; the exchange argument behind the invariance of dimension; the Plus/Minus theorem and its two corollaries on shrinking spanning sets and growing independent ones; the trap $\dim \mathcal{P}_n = n + 1$; the direction convention for transition matrices and the test that resolves any doubt; the reason column bases are taken from $A$ but located via $R$; the counting proof of rank–nullity; and the translation picture of non-homogeneous solution sets. The next chapter will add geometry to the algebra (lengths, angles, and orthogonality), and the coordinate map built here is the bridge it will cross.
