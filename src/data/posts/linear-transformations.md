---
title: |-
  Linear Algebra Ch5
  Linear Transformations
excerpt: 'Structure-preserving maps between vector spaces: kernel and range, the dimension theorem, isomorphism, matrix representation, change of basis, and similarity.'
date: '2026-07-19'
category: study
subcategory: mathematics
keywords: ['linear algebra', 'linear transformations', 'isomorphism', 'similarity', 'change of basis']
---

Based on Anton & Rorres, "Elementary Linear Algebra with Supplemental Applications" (12th ed.), and Larson, "Elementary Linear Algebra" (8th ed., metric version). A continuation of the essays on Chapters 1–3, whose notation and results are used freely.

Chapter 3 studied vector spaces one at a time. The present chapter studies the maps between them, but not arbitrary maps. A vector space is a set with structure (addition and scaling), and the maps worth studying are those that respect the structure: the linear transformations. This single decision, to study structure-preserving maps rather than all maps, is the organizing principle not just of linear algebra but of modern mathematics generally, and the chapter is a first sustained encounter with it. The story has three movements. First, the definition and a gallery of examples, showing that differentiation, integration, projection, rotation, and coordinate-taking are all instances of one concept. Second, the fundamental invariants of a linear map, its kernel and range, its rank and nullity, culminating in the dimension theorem and the classification of finite-dimensional spaces up to isomorphism. Third, the representation theory: every linear map between finite-dimensional spaces is a matrix, once bases are chosen; changing the bases changes the matrix by an explicit conjugation formula; and the resulting equivalence relation on square matrices, similarity, together with its invariants, sets the stage for the eigenvalue theory of the next chapter. As before, I have proved what can be proved at this level and verified every computation more than once.

## 1. The Definition, and What It Excludes

### 1.1 Transformations and linearity

Definition 5.1. If $V$ and $W$ are vector spaces, any function $f : V \to W$ is called a transformation from $V$ to $W$; in the special case $V = W$ one also says operator on $V$. The words are synonyms for "function," retained for historical flavor; no condition is imposed yet.

The condition comes now, and it is the heart of the chapter.

Definition. A function $T : V \to W$ between vector spaces is a linear transformation if for all $\vec{u}, \vec{v} \in V$ and all $k \in \mathbb{R}$:

$$
\text{(i)}\quad T(\vec{u} + \vec{v}) = T(\vec{u}) + T(\vec{v}),
\qquad\qquad
\text{(ii)}\quad T(k\vec{u}) = k\,T(\vec{u}).
$$

A linear transformation $T : V \to V$ is a linear operator on $V$.

Read the two conditions as a slogan: the map commutes with the vector space operations. Whether one first adds and then applies $T$, or first applies $T$ and then adds, the result is the same; likewise for scaling. Note the quiet subtlety that the operations on the two sides of each equation live in different spaces: the $+$ inside $T(\vec{u} + \vec{v})$ is addition in $V$, the $+$ in $T(\vec{u}) + T(\vec{v})$ is addition in $W$, so linearity is genuinely a statement of compatibility between two structures, mediated by the map. The two conditions combine into one: $T$ is linear if and only if

$$
T(k_1\vec{u} + k_2\vec{v}) = k_1T(\vec{u}) + k_2T(\vec{v})
\quad\text{for all } \vec{u}, \vec{v} \in V,\ k_1, k_2 \in \mathbb{R},
$$

and, by induction, a linear map passes through arbitrary finite linear combinations:

$$
T(k_1\vec{v}_1 + \cdots + k_r\vec{v}_r) = k_1T(\vec{v}_1) + \cdots + k_rT(\vec{v}_r).
$$

Since Chapter 3 established that linear combinations are the fundamental act of the subject, this last identity explains why linear maps are the right maps: they are exactly the functions that preserve linear combinations, hence carry spans to spans, dependencies to dependencies, and, as we will see, subspaces to subspaces.

It is equally instructive to see what the definition excludes. The real function $f(x) = x + 1$, "linear" in the schoolroom sense of having a straight-line graph, is not a linear transformation: $f(0) = 1 \neq 0$, violating the theorem below. Nor is $f(x) = x^2$: additivity fails, since $(x+y)^2 \neq x^2 + y^2$ in general. Among the functions $\mathbb{R} \to \mathbb{R}$, the linear transformations are precisely the maps $x \mapsto cx$, lines through the origin. The schoolroom's affine functions will reappear in mathematics, but under their own name; in this subject, "linear" means homogeneous linear, and the origin is sacred.

Theorem 5.2. If $T : V \to W$ is linear, then (1) $T(\vec{0}) = \vec{0}$, and (2) $T(\vec{u} - \vec{v}) = T(\vec{u}) - T(\vec{v})$ for all $\vec{u}, \vec{v}$.

Proof. For (1), use homogeneity with the scalar $0$: $T(\vec{0}) = T(0\vec{0}) = 0\,T(\vec{0}) = \vec{0}$, the outer equality by Theorem 3.12. For (2), $T(\vec{u} - \vec{v}) = T(\vec{u} + (-1)\vec{v}) = T(\vec{u}) + (-1)T(\vec{v}) = T(\vec{u}) - T(\vec{v})$. $\square$

Assertion (1), small as it is, is the fastest disqualification test in the chapter: a map that fails to send zero to zero cannot be linear, and one should check this first, exactly as the zero-vector check led the subspace tests of Chapter 3. (The converse fails, of course: $x \mapsto x^2$ sends $0$ to $0$ and is still not linear. Passing the zero test earns a map nothing but the right to be examined further.)

### 1.2 A linear map is determined by its values on a basis

Theorem 5.3. Let $T : V \to W$ be linear, $V$ finite-dimensional with basis $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$. Then for any $\vec{v} \in V$,

$$
T(\vec{v}) = c_1T(\vec{v}_1) + c_2T(\vec{v}_2) + \cdots + c_nT(\vec{v}_n),
$$

where $c_1, \dots, c_n$ are the coordinates of $\vec{v}$ relative to $\mathcal{B}$.

The proof is nothing but the preservation of linear combinations applied to the representation $\vec{v} = c_1\vec{v}_1 + \cdots + c_n\vec{v}_n$, which exists and is unique by Theorem 3.47. But the consequence deserves emphasis: a linear transformation on a finite-dimensional space is completely determined by its values on a basis, finitely many pieces of data. An arbitrary function on an infinite set requires infinitely much information to specify; a linear map on an $n$-dimensional space requires only $n$ prescribed outputs, and those outputs may moreover be prescribed freely (any choice of $n$ target vectors extends, uniquely, to a linear map). This finiteness is what will make the matrix representation of §7 possible: an entire transformation compressed into an $m \times n$ array.

Example 5.4. Let $T : \mathcal{P}_1[x] \to \mathcal{P}_1[x]$ be the linear operator with $T(3 + 2x) = 1 - 2x$ and $T(3) = -4 + x$. Find $T(12 + 10x)$.

The set $\{3 + 2x,\ 3\}$ is a basis for $\mathcal{P}_1[x]$: two vectors in a two-dimensional space (recall $\dim \mathcal{P}_1 = 2$, the monomials $1, x$), and independent since neither is a scalar multiple of the other; Theorem 3.44 does the rest. So the two given values determine $T$ everywhere, and the recipe of Theorem 5.3 applies. First express the input in the basis: seek $a, b$ with

$$
12 + 10x = a(3 + 2x) + b \cdot 3.
$$

Comparing coefficients of $x$: $2a = 10$, so $a = 5$; comparing constants: $3a + 3b = 12$, so $15 + 3b = 12$ and $b = -1$. (Check: $5(3+2x) - 3 = 15 + 10x - 3 = 12 + 10x$.) Then linearity delivers the answer:

$$
T(12 + 10x) = 5\,T(3+2x) - 1\cdot T(3) = 5(1 - 2x) - (-4 + x) = 5 - 10x + 4 - x = 9 - 11x.
$$

The example rehearses in miniature the method of the whole chapter: convert to coordinates, use the prescribed data, reassemble.

### 1.3 A gallery of linear transformations

Example 5.5. The breadth of the following list is the point of the abstraction; each entry is verified against the two-part definition, and the verifications are worth doing once in one's own hand.

(1) The zero transformation $T : V \to W$, $T(\vec{u}) = \vec{0}$, is linear: both defining equations reduce to $\vec{0} = \vec{0}$.

(2) The identity operator $T : V \to V$, $T(\vec{u}) = \vec{u}$: both equations are tautologies.

(3) Dilations and contractions $T(\vec{u}) = k_0\vec{u}$ for a fixed scalar $k_0$: additivity is (SM1) and homogeneity is (SM3) of the vector space axioms. (For $k_0 > 1$ a dilation, for $0 < k_0 < 1$ a contraction; the identity and zero maps are the cases $k_0 = 1, 0$.)

(4) Orthogonal projection onto a finite-dimensional subspace $W$ of an inner product space, $T(\vec{u}) = \mathrm{proj}_W\vec{u}$, linear by the coordinate formulas for projection developed in the inner-product chapter; the special cases onto coordinate planes appear concretely in §3 below.

(5) The coordinate map relative to a basis $\mathcal{B}$ of an $n$-dimensional space, $T : V \to \mathbb{R}^n$, $T(\vec{u}) = (\vec{u})_{\mathcal{B}}$: linearity was checked in §8.2 of the Chapter 3 essay (coordinates of a sum are sums of coordinates, by collecting coefficients and invoking uniqueness of representation). This example will be promoted to a starring role in §6.

(6) Inner product against a fixed vector: for fixed $\vec{v}_0$ in an inner product space $V$, the map $T : V \to \mathbb{R}$, $T(\vec{u}) = \langle \vec{u}, \vec{v}_0 \rangle$, is linear by the linearity of the inner product in its first slot. (Maps into $\mathbb{R}$, the one-dimensional space, are called linear functionals; this is the prototype.)

(7) Transposition $T : \mathrm{Mat}_{m\times n}(\mathbb{R}) \to \mathrm{Mat}_{n\times m}(\mathbb{R})$, $T(A) = A^T$: linearity is exactly Theorem 1.15(2),(3), $(A + B)^T = A^T + B^T$ and $(kA)^T = kA^T$.

(8) Differentiation $T : C^1(\mathbb{R}) \to \mathcal{F}(\mathbb{R})$, $T(f) = f'$: linearity is the sum and constant-multiple rules of calculus, $(f + g)' = f' + g'$ and $(kf)' = kf'$.

(9) Integration $T : C^0(\mathbb{R}) \to C^1(\mathbb{R})$, $T(f) = \int_0^x f(t)\,dt$: linearity is the additivity and homogeneity of the definite integral.

Entries (8) and (9) repay a pause. The two central operations of calculus are linear transformations on function spaces, which means that everything proved in this chapter about kernels, ranges, and dimension applies to them, and conversely that the linear algebra of differential equations (solution spaces as kernels, "particular plus homogeneous" as the coset structure of Theorem 3.66) is not an analogy but an instance. The gallery is the abstraction paying rent.

## 2. Linear Maps on $\mathbb{R}^n$: Matrix Transformations

### 2.1 Every matrix gives a linear map

Theorem 5.6. For any $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$, the transformation

$$
T_A : \mathbb{R}^n \to \mathbb{R}^m, \qquad T_A(\vec{x}) = A\vec{x}
$$

is linear, a matrix transformation (a matrix operator when $m = n$).

The proof is the distributivity and homogeneity of matrix–vector multiplication from Chapter 1: $A(\vec{x} + \vec{y}) = A\vec{x} + A\vec{y}$ and $A(k\vec{x}) = kA\vec{x}$. Nothing new, which is precisely the observation: matrices act on column vectors, and their action is linear.

### 2.2 Every linear map on $\mathbb{R}^n$ comes from a matrix

The converse is the substantive theorem, and it converts the study of linear maps $\mathbb{R}^n \to \mathbb{R}^m$ into the study of matrices, entirely.

Theorem 5.7 (the standard matrix). For $T : \mathbb{R}^n \to \mathbb{R}^m$, the following are equivalent: (1) $T$ is a linear transformation; (2) $T = T_A$ for some $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$. In that case $A$ is unique, is called the standard matrix of $T$, and is given by

$$
A = \big[\; T(\vec{e}_1) \;\big|\; T(\vec{e}_2) \;\big|\; \cdots \;\big|\; T(\vec{e}_n) \;\big],
$$

its columns are the images of the standard basis vectors.

Proof. (2) $\Rightarrow$ (1) is Theorem 5.6. For (1) $\Rightarrow$ (2), let $\{\vec{e}_1, \dots, \vec{e}_n\}$ and $\{\vec{e}_1', \dots, \vec{e}_m'\}$ be the standard bases of $\mathbb{R}^n$ and $\mathbb{R}^m$. Each image $T(\vec{e}_j)$, being a vector of $\mathbb{R}^m$, expands as $T(\vec{e}_j) = a_{1j}\vec{e}_1' + a_{2j}\vec{e}_2' + \cdots + a_{mj}\vec{e}_m'$ for scalars $a_{ij}$, that is, the numbers $a_{1j}, \dots, a_{mj}$ are simply the components of $T(\vec{e}_j)$. Set $A = [a_{ij}]$, the matrix whose $j$-th column is $T(\vec{e}_j)$. Then for any $\vec{u} = (u_1, \dots, u_n) = \sum_j u_j\vec{e}_j$, linearity and an exchange of summation give

$$
T(\vec{u}) = \sum_{j=1}^n u_j\,T(\vec{e}_j) = \sum_{j=1}^n u_j\sum_{i=1}^m a_{ij}\vec{e}_i' = \sum_{i=1}^m\Big(\sum_{j=1}^n a_{ij}u_j\Big)\vec{e}_i',
$$

whose $i$-th component is $\sum_j a_{ij}u_j = (A\vec{u})_i$. Hence $T(\vec{u}) = A\vec{u}$ for all $\vec{u}$. Uniqueness: if $A\vec{x} = B\vec{x}$ for all $\vec{x}$, then testing on $\vec{x} = \vec{e}_j$ shows the $j$-th columns of $A$ and $B$ agree, for every $j$. $\square$

Two comments. First, the theorem is Theorem 5.3 in its natural habitat: a linear map is determined by its values on the basis $\{\vec{e}_j\}$, and the standard matrix is nothing but those values filed as columns. The recipe is worth stating as a reflex: to find the standard matrix, feed the map the standard basis vectors and record the outputs as columns. Second, the theorem finally names what Chapters 1 and 2 were about. A matrix is not merely a table of numbers; it is a linear transformation in coordinates, and statements about matrices (invertibility, rank, determinant) will turn out to be statements about the underlying maps.

Example 5.8. The orthogonal projection $T : \mathbb{R}^3 \to \mathbb{R}^3$ onto the $xy$-plane, $T(x, y, z) = (x, y, 0)$, is linear. Directly: for $\vec{u} = (x_1, y_1, z_1)$ and $\vec{v} = (x_2, y_2, z_2)$,

$$
T(\vec{u} + \vec{v}) = (x_1 + x_2,\ y_1 + y_2,\ 0) = (x_1, y_1, 0) + (x_2, y_2, 0) = T(\vec{u}) + T(\vec{v}),
$$

and $T(k\vec{u}) = (kx_1, ky_1, 0) = kT(\vec{u})$. Alternatively, and this is the labor-saving pattern Theorem 5.7 makes available, exhibit it as a matrix transformation: $T(\vec{x}) = A\vec{x}$ with $A = \mathrm{diag}(1, 1, 0)$, and linearity follows from Theorem 5.6 with no computation at all. To prove a concrete map linear, it often suffices to notice that it is multiplication by a matrix.

Example 5.9. Let $T : \mathbb{R}^2 \to \mathbb{R}^3$, $T(x, y) = (x + y,\ x,\ y)$.

(1) The standard matrix: $T(\vec{e}_1) = T(1, 0) = (1, 1, 0)$ and $T(\vec{e}_2) = T(0, 1) = (1, 0, 1)$, so

$$
A = \begin{bmatrix} 1 & 1 \\ 1 & 0 \\ 0 & 1 \end{bmatrix}.
$$

(2) For $\vec{v} = (5, 4)$:

$$
T(\vec{v}) = A\vec{v} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 5 \\ 4 \end{bmatrix} = \begin{bmatrix} 9 \\ 5 \\ 4 \end{bmatrix},
$$

in agreement with the defining formula $T(5,4) = (5 + 4,\ 5,\ 4) = (9, 5, 4)$, the obligatory cross-check between the matrix and the map it encodes.

## 3. The Geometry: Standard Operators on $\mathbb{R}^2$ and $\mathbb{R}^3$

Remark 5.10 assembles the basic geometric operators (reflections, projections, rotations, contractions and dilations, compressions and expansions) and their standard matrices. Rather than reproduce the tables, let us derive the entries, since each derivation is a one-line application of the column recipe: track where $\vec{e}_1, \vec{e}_2$ (and $\vec{e}_3$) go.

On $\mathbb{R}^2$. Reflection about the $y$-axis sends $(x, y) \mapsto (-x, y)$: the basis vectors go to $(-1, 0)$ and $(0, 1)$, so the matrix is $\left[\begin{smallmatrix} -1 & 0 \\ 0 & 1 \end{smallmatrix}\right]$. Reflection about the line $y = x$ swaps coordinates, $(x, y) \mapsto (y, x)$: matrix $\left[\begin{smallmatrix} 0 & 1 \\ 1 & 0 \end{smallmatrix}\right]$. Orthogonal projection onto the $x$-axis kills the second coordinate, $(x,y) \mapsto (x, 0)$: matrix $\left[\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\right]$. Counterclockwise rotation through the angle $\theta$ sends $\vec{e}_1 = (1,0)$ to $(\cos\theta, \sin\theta)$ and $\vec{e}_2 = (0,1)$ to $(-\sin\theta, \cos\theta)$, read both off the unit circle, giving the rotation matrix

$$
R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix},
\qquad
\begin{cases} w_1 = x\cos\theta - y\sin\theta \\ w_2 = x\sin\theta + y\cos\theta. \end{cases}
$$

Uniform contraction/dilation by $k$ has matrix $kI = \left[\begin{smallmatrix} k & 0 \\ 0 & k \end{smallmatrix}\right]$ (contraction for $0 \leq k < 1$, dilation for $k > 1$), while compression/expansion in the $x$-direction alone scales only the first coordinate, $(x, y) \mapsto (kx, y)$, with matrix $\left[\begin{smallmatrix} k & 0 \\ 0 & 1 \end{smallmatrix}\right]$, the difference between photographing an object from farther away and stretching it sideways.

On $\mathbb{R}^3$. Reflections about the coordinate planes flip the single coordinate perpendicular to the plane: about the $xy$-plane, $(x,y,z) \mapsto (x,y,-z)$ with matrix $\mathrm{diag}(1,1,-1)$; about the $xz$-plane, $(x,y,z) \mapsto (x,-y,z)$ with matrix $\mathrm{diag}(1,-1,1)$; about the $yz$-plane, $(x,y,z) \mapsto (-x,y,z)$ with matrix $\mathrm{diag}(-1,1,1)$. (A transcription of the source tables in circulation lists the $yz$-plane reflection with matrix $\mathrm{diag}(1,1,-1)$; that matrix belongs to the $xy$-plane reflection, and the equations $w_1 = -x,\ w_2 = y,\ w_3 = z$ printed beside it confirm that the intended matrix is $\mathrm{diag}(-1,1,1)$, a reminder that a standard matrix can always be audited against its equations, column by column.) Counterclockwise rotations about the three positive coordinate axes through $\theta$ fix the axis coordinate and rotate the complementary pair:

$$
R_{x,\theta} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{bmatrix},
\quad
R_{y,\theta} = \begin{bmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{bmatrix},
\quad
R_{z,\theta} = \begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix},
$$

the middle one's sign pattern differing because the ordered pair $(z, x)$, not $(x, z)$, is the right-handed frame in the plane perpendicular to the $y$-axis. Orthogonal projection onto the $xy$-plane is $\mathrm{diag}(1, 1, 0)$, as in Example 5.8.

The determinants of Chapter 2 annotate this menagerie perfectly, and the reader should verify each: every reflection above has determinant $-1$ (orientation reversed, volume preserved); every rotation has determinant $\cos^2\theta + \sin^2\theta = 1$ (orientation and volume both preserved); every projection has determinant $0$ (space flattened, and, consistently, projections are visibly not invertible, two different points sharing a shadow); the dilation $kI_n$ has determinant $k^n$, the volume-scaling law of §6 of the Chapter 2 essay made flesh.

## 4. Kernel and Range

### 4.1 The two fundamental subspaces of a map

Every linear transformation carries two distinguished sets, one in its domain and one in its codomain.

Definition. For a linear transformation $T : V \to W$, the kernel and range of $T$ are

$$
\ker(T) = \{\vec{u} \in V \mid T(\vec{u}) = \vec{0}\}, \qquad
R(T) = \{T(\vec{u}) \mid \vec{u} \in V\} \subseteq W.
$$

The kernel collects everything the map annihilates; the range collects everything the map achieves. The kernel is never empty, $T(\vec{0}) = \vec{0}$ puts the zero vector in it always, and the interesting question is whether it contains anything else.

Theorem 5.11. $\ker(T)$ is a subspace of $V$, and $R(T)$ is a subspace of $W$.

Proof. Both by the subspace test of Theorem 3.15. For the kernel: $\vec{0} \in \ker(T)$ as noted; and if $T(\vec{u}_1) = T(\vec{u}_2) = \vec{0}$, then $T(k_1\vec{u}_1 + k_2\vec{u}_2) = k_1T(\vec{u}_1) + k_2T(\vec{u}_2) = \vec{0}$, so the combination stays in the kernel. For the range: $\vec{0} = T(\vec{0}) \in R(T)$; and if $\vec{w}_1 = T(\vec{u}_1)$ and $\vec{w}_2 = T(\vec{u}_2)$ are in the range, then $k_1\vec{w}_1 + k_2\vec{w}_2 = T(k_1\vec{u}_1 + k_2\vec{u}_2)$ is again a value of $T$. In both computations the engine is linearity, the map's compatibility with combinations is exactly what makes its kernel and range closed under them. $\square$

Example 5.12. For the differentiation map $T : C^1(\mathbb{R}) \to \mathcal{F}(\mathbb{R})$, $T(f) = f'$: the kernel is the set of $f$ with $f' \equiv 0$, which by the mean value theorem is precisely the constant functions, a one-dimensional subspace, spanned by the constant function $1$. The range is the set of all derivatives of $C^1$ functions. By definition of $C^1$, every such derivative is continuous, so $R(T) \subseteq C^0(\mathbb{R})$; and conversely every continuous $g$ is a derivative, namely of its antiderivative $F(x) = \int_0^x g(t)\,dt$ (the fundamental theorem of calculus), which is $C^1$ because $F' = g$ is continuous. Hence $R(T) = C^0(\mathbb{R})$, exactly. The kernel computation is a fact every calculus student knows in other words: antiderivatives are unique up to a constant, two functions with the same derivative differ by an element of $\ker(T)$, and $\ker(T)$ is the constants. Linear algebra does not replace calculus here; it names its structure.

Example 5.13. The two extremes calibrate the definitions. For the zero transformation $T : V \to W$: everything is annihilated and nothing is achieved, $\ker(T) = V$ and $R(T) = \{\vec{0}\}$. For the identity operator on $V$: nothing is annihilated and everything is achieved, $\ker(T) = \{\vec{0}\}$ and $R(T) = V$. Every linear map lives between these poles, and the rank–nullity theorem below is the precise statement that the two measures trade off.

Theorem 5.14. For $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ and its matrix transformation $T_A : \mathbb{R}^n \to \mathbb{R}^m$:

$$
\ker(T_A) = \mathrm{null}(A), \qquad R(T_A) = \mathrm{col}(A).
$$

Both are unwindings of definitions. The kernel of $T_A$ is $\{\vec{x} \mid A\vec{x} = \vec{0}\}$, verbatim the null space. The range is $\{A\vec{x} \mid \vec{x} \in \mathbb{R}^n\}$, and by Theorem 1.12 the products $A\vec{x}$ are exactly the linear combinations of the columns of $A$, verbatim the column space. The chapter's abstract pair (kernel, range) thus specializes to Chapter 3's concrete pair (null space, column space); the fundamental subspaces of a matrix were the fundamental subspaces of a linear map all along.

### 4.2 Rank and nullity of a transformation

Definition. For a linear transformation $T : V \to W$: the rank of $T$ is $\mathrm{rank}(T) = \dim R(T)$, and the nullity of $T$ is $\mathrm{nullity}(T) = \dim\ker(T)$ (each defined when the space in question is finite-dimensional).

By Theorem 5.14 and Chapter 3, for a matrix transformation these agree with the matrix's own rank and nullity, the notation collides on purpose.

Example 5.15. Let $T : \mathcal{P}_3[x] \to \mathcal{P}_2[x]$ be given by

$$
T(a_0 + a_1x + a_2x^2 + a_3x^3) = 5a_0 + a_3x^2.
$$

(1) Linearity. Write $p = a_0 + a_1x + a_2x^2 + a_3x^3$ and $q = b_0 + b_1x + b_2x^2 + b_3x^3$. The coefficients of $p + q$ are the sums $a_i + b_i$, so

$$
T(p + q) = 5(a_0 + b_0) + (a_3 + b_3)x^2 = (5a_0 + a_3x^2) + (5b_0 + b_3x^2) = T(p) + T(q),
$$

and likewise $T(kp) = 5(ka_0) + (ka_3)x^2 = k\,T(p)$. The general principle at work: any map that acts on coordinates by fixed linear expressions ($5a_0$ and $a_3$ here) is linear, because coordinates of sums are sums of coordinates.

(2) Kernel. $T(p) = 0$ means $5a_0 + a_3x^2$ is the zero polynomial, i.e. $5a_0 = 0$ and $a_3 = 0$, i.e. $a_0 = a_3 = 0$, with $a_1, a_2$ unconstrained. Thus

$$
\ker(T) = \{a_1x + a_2x^2 \mid a_1, a_2 \in \mathbb{R}\} = \mathrm{Span}\{x, x^2\},
$$

and $\{x, x^2\}$, independent, being distinct monomials, is a basis. Nullity $2$.

(3) Range. As $a_0$ and $a_3$ range over $\mathbb{R}$, the values $5a_0 + a_3x^2$ sweep out exactly $\mathrm{Span}\{1, x^2\}$ (the factor $5$ is absorbed by the coefficient), and $\{1, x^2\}$ is a basis. Rank $2$.

The audit: $\mathrm{rank}(T) + \mathrm{nullity}(T) = 2 + 2 = 4 = \dim \mathcal{P}_3[x]$, which is no accident, but the next theorem.

### 4.3 The dimension theorem

Theorem 5.16 (dimension theorem for linear transformations). If $T : V \to W$ is linear and $\dim V = n$, then

$$
\mathrm{rank}(T) + \mathrm{nullity}(T) = n.
$$

Proof. Let $r = \mathrm{nullity}(T)$ and choose a basis $\vec{v}_1, \dots, \vec{v}_r$ of $\ker(T)$. If $r = n$, the kernel is all of $V$: then $T$ is the zero transformation, $R(T) = \{\vec{0}\}$, and the identity reads $0 + n = n$. So suppose $r < n$. By Theorem 3.45(2), independent sets extend to bases, there are vectors $\vec{v}_{r+1}, \dots, \vec{v}_n$ completing a basis $\vec{v}_1, \dots, \vec{v}_n$ of $V$. We claim $S = \{T(\vec{v}_{r+1}), \dots, T(\vec{v}_n)\}$ is a basis of $R(T)$; granting this, $\mathrm{rank}(T) = n - r$ and the theorem follows as $(n - r) + r = n$.

$S$ spans $R(T)$. Any element of the range is $T(\vec{v})$ for some $\vec{v} = k_1\vec{v}_1 + \cdots + k_n\vec{v}_n$; applying $T$ and using $T(\vec{v}_1) = \cdots = T(\vec{v}_r) = \vec{0}$ (these are kernel vectors),

$$
T(\vec{v}) = k_{r+1}T(\vec{v}_{r+1}) + \cdots + k_nT(\vec{v}_n) \in \mathrm{Span}(S).
$$

$S$ is independent. Suppose $k_{r+1}T(\vec{v}_{r+1}) + \cdots + k_nT(\vec{v}_n) = \vec{0}$. By linearity this says $T\big(k_{r+1}\vec{v}_{r+1} + \cdots + k_n\vec{v}_n\big) = \vec{0}$, i.e. the vector $k_{r+1}\vec{v}_{r+1} + \cdots + k_n\vec{v}_n$ lies in $\ker(T)$ and is therefore a combination of the kernel basis:

$$
k_{r+1}\vec{v}_{r+1} + \cdots + k_n\vec{v}_n = k_1\vec{v}_1 + \cdots + k_r\vec{v}_r
$$

for some scalars $k_1, \dots, k_r$. Rearranged,

$$
k_1\vec{v}_1 + \cdots + k_r\vec{v}_r + (-k_{r+1})\vec{v}_{r+1} + \cdots + (-k_n)\vec{v}_n = \vec{0},
$$

a relation among the full basis of $V$; independence forces every coefficient to vanish, in particular $k_{r+1} = \cdots = k_n = 0$. $\square$

The proof's architecture, start from a basis of the kernel, extend to a basis of the whole space, and show the images of the added vectors form a basis of the range, is one of the standard proof patterns of linear algebra, worth owning as a pattern and not just as this proof. And the theorem itself is the abstract ancestor of Chapter 3's matrix identity $\mathrm{rank}(A) + \mathrm{nullity}(A) = n$: apply it to $T_A : \mathbb{R}^n \to \mathbb{R}^m$ and invoke Theorem 5.14, and the matrix version drops out, this time with a conceptual proof in place of the count of leading and free variables. Both proofs are worth knowing; they illuminate each other. As an interpretive slogan: of the $n$ dimensions of the domain, $r$ are collapsed into the kernel and the remaining $n - r$ survive into the range, dimension is conserved, divided between what the map destroys and what it transmits.

## 5. Composition, Injectivity, Surjectivity, and Inverses

### 5.1 Composition

Definition 5.17. For linear maps $T_1 : U \to V$ and $T_2 : V \to W$, the composition $T_2 \circ T_1 : U \to W$ is $(T_2 \circ T_1)(\vec{u}) = T_2(T_1(\vec{u}))$, first $T_1$, then $T_2$, the right-to-left reading order that the notation shares with matrix products, and not by coincidence, as §7 will show.

Theorem 5.18. The composition of linear transformations is linear.

Proof. $(T_2 \circ T_1)(k_1\vec{u} + k_2\vec{v}) = T_2\big(k_1T_1(\vec{u}) + k_2T_1(\vec{v})\big) = k_1T_2(T_1(\vec{u})) + k_2T_2(T_1(\vec{v}))$, each equality by the linearity of one factor. $\square$

### 5.2 One-to-one and onto

Definition 5.19. A linear map $T : V \to W$ is one-to-one (injective) if distinct inputs have distinct outputs, $\vec{u} \neq \vec{v}$ implies $T(\vec{u}) \neq T(\vec{v})$; it is onto (surjective) if $R(T) = W$, every target vector being achieved; and bijective if both.

For arbitrary functions, injectivity is a condition about every pair of points and can be laborious to verify. For linear maps it collapses to a single check at the origin:

Theorem 5.20. A linear map $T$ is one-to-one if and only if $\ker(T) = \{\vec{0}\}$, i.e. $\mathrm{nullity}(T) = 0$.

Proof. If $T$ is one-to-one: $\vec{u} \in \ker(T)$ means $T(\vec{u}) = \vec{0} = T(\vec{0})$, and injectivity forces $\vec{u} = \vec{0}$. Conversely, if the kernel is trivial and $T(\vec{u}) = T(\vec{v})$, then $T(\vec{u} - \vec{v}) = T(\vec{u}) - T(\vec{v}) = \vec{0}$ (Theorem 5.2), so $\vec{u} - \vec{v} \in \ker(T) = \{\vec{0}\}$ and $\vec{u} = \vec{v}$. $\square$

The mechanism deserves a sentence: for a linear map, any collision $T(\vec{u}) = T(\vec{v})$ translates into a kernel element $\vec{u} - \vec{v}$, so all failures of injectivity are visible at the origin. The kernel is not merely one measure of non-injectivity; it is a complete inventory of it, indeed, the preimage of any achieved value $\vec{w} = T(\vec{x}_0)$ is exactly the coset $\vec{x}_0 + \ker(T)$, the "particular plus homogeneous" structure of Theorem 3.66 in fully general dress.

Theorem 5.21. If $W$ is finite-dimensional, then $T : V \to W$ is onto if and only if $\mathrm{rank}(T) = \dim W$.

For $R(T)$ is a subspace of $W$, and by Theorem 3.46(2) a subspace equals the whole space exactly when their dimensions agree.

Theorem 5.22. For a linear operator $T : V \to V$ on a finite-dimensional space, one-to-one and onto are equivalent.

Proof. By the dimension theorem with $\dim V = n$: $T$ one-to-one $\iff$ nullity $0$ $\iff$ rank $n$ $\iff$ $\dim R(T) = \dim V$ $\iff$ onto, the first equivalence by Theorem 5.20, the middle by rank $+$ nullity $= n$, the last by Theorem 5.21. $\square$

This equivalence is a genuinely finite-dimensional luxury, and the reader should see it fail once in infinite dimensions to appreciate it. On the space of infinite sequences, the right shift $(a_1, a_2, a_3, \dots) \mapsto (0, a_1, a_2, \dots)$ is one-to-one but not onto (nothing maps to $(1, 0, 0, \dots)$), while the left shift $(a_1, a_2, a_3, \dots) \mapsto (a_2, a_3, \dots)$ is onto but not one-to-one (its kernel contains $(1, 0, 0, \dots)$). Closer to home, the differentiation and integration operators of Example 5.5 exhibit the same asymmetry. In finite dimensions the counting of the dimension theorem forbids such behavior, the same counting that, for square matrices, made a one-sided inverse automatically two-sided (Theorem 1.52), a result this theorem now explains conceptually.

### 5.3 Inverse transformations

If $T : V \to W$ is one-to-one, then (Remark 5.23) the corestriction $T : V \to R(T)$ is bijective, and one may define

$$
T^{-1} : R(T) \to V, \qquad T^{-1}(\vec{w}) = \text{the unique } \vec{v} \text{ with } T(\vec{v}) = \vec{w}.
$$

Theorem 5.24. If $T : V \to W$ is a bijective linear transformation, then $T^{-1} : W \to V$ is linear.

Proof. Given $\vec{w}_1, \vec{w}_2 \in W$, let $\vec{v}_i = T^{-1}(\vec{w}_i)$, so $T(\vec{v}_i) = \vec{w}_i$. By the linearity of $T$,

$$
T(k_1\vec{v}_1 + k_2\vec{v}_2) = k_1\vec{w}_1 + k_2\vec{w}_2,
$$

which says precisely that $T^{-1}(k_1\vec{w}_1 + k_2\vec{w}_2) = k_1\vec{v}_1 + k_2\vec{v}_2 = k_1T^{-1}(\vec{w}_1) + k_2T^{-1}(\vec{w}_2)$. $\square$

Linearity of the inverse is not automatic-looking, the inverse of a continuous bijection need not be continuous, for instance, but here the structure cooperates: undoing a structure-preserving bijection preserves the structure.

## 6. Isomorphism: When Two Spaces Are "the Same"

Definition. A bijective linear transformation $T : V \to W$ is an isomorphism, and $V$ and $W$ are then isomorphic.

Isomorphic spaces are indistinguishable as vector spaces: the bijection matches their elements one-to-one, and its linearity (with that of its inverse, Theorem 5.24) matches their operations. Whatever is true of one, dimensions of subspaces, dependencies, solution structures, transfers verbatim to the other through the map. The word is from the Greek for "same shape," and it is exact.

Theorem 5.25. Every real $n$-dimensional vector space is isomorphic to $\mathbb{R}^n$.

Proof. Let $V$ be $n$-dimensional with basis $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$, and let $T : V \to \mathbb{R}^n$ be the coordinate map $T(\vec{u}) = (\vec{u})_{\mathcal{B}}$, linear by Example 5.5(5). One-to-one: if $T(\vec{u}) = \vec{0}$, the coordinates of $\vec{u}$ all vanish, so $\vec{u} = 0\vec{v}_1 + \cdots + 0\vec{v}_n = \vec{0}$; the kernel is trivial and Theorem 5.20 applies. Onto: given any $\vec{w} = (k_1, \dots, k_n) \in \mathbb{R}^n$, the vector $k_1\vec{v}_1 + \cdots + k_n\vec{v}_n \in V$ maps to it. Hence $T$ is an isomorphism. $\square$

This theorem redeems, with full rigor, the promissory note issued in the Chapter 3 essay: the coordinate map is an isomorphism, and every abstract $n$-dimensional space is a relabeled $\mathbb{R}^n$. Two natural instances are worth having by name. Example 5.26: relative to the monomial basis $\{1, x, \dots, x^n\}$,

$$
T : \mathcal{P}_n[x] \to \mathbb{R}^{n+1}, \qquad T(a_0 + a_1x + \cdots + a_nx^n) = (a_0, a_1, \dots, a_n)
$$

is an isomorphism, a polynomial is its coefficient list. Example 5.27: relative to the matrix-unit basis $\{E_1, E_2, E_3, E_4\}$ of $\mathrm{Mat}_2(\mathbb{R})$,

$$
\varphi : \mathrm{Mat}_2(\mathbb{R}) \to \mathbb{R}^4, \qquad \varphi\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix} = (a_{11}, a_{12}, a_{21}, a_{22})
$$

is an isomorphism, a matrix, qua vector, is its entry list read row by row. (Note the caveat "qua vector": $\varphi$ respects addition and scaling, which is all an isomorphism of vector spaces promises; matrix multiplication has no counterpart in $\mathbb{R}^4$ and is not preserved. Isomorphisms are faithful exactly to the structure they are defined to preserve.)

Theorem 5.28. For finite-dimensional spaces $V, W$: $\dim(V) = \dim(W)$ if and only if $V$ and $W$ are isomorphic.

If both have dimension $n$, each is isomorphic to $\mathbb{R}^n$ by Theorem 5.25, and composing one isomorphism with the inverse of the other (linear by Theorems 5.18 and 5.24, bijective as a composition of bijections) links them directly. Conversely, an isomorphism carries a basis of $V$ to a basis of $W$, images of independent vectors under a one-to-one linear map are independent, and images of a spanning set under an onto map span, so the dimensions agree. The theorem is a classification: finite-dimensional real vector spaces are completely classified by a single natural number. Thus $\mathcal{P}_3[x] \cong \mathbb{R}^4 \cong \mathrm{Mat}_2(\mathbb{R})$, all of dimension four; polynomials of degree at most three, quadruples of numbers, and $2 \times 2$ matrices are one structure in three costumes.

Theorem 5.29. If $T : V \to W$ is one-to-one and linear, then (1) $V \cong R(T)$, and (2) if both spaces are finite-dimensional, $\dim(V) \leq \dim(W)$.

For (1), the corestriction $T : V \to R(T)$ is bijective and linear. For (2), $\dim V = \dim R(T) \leq \dim W$, the inequality because $R(T)$ is a subspace of $W$ (Theorem 3.46). An injective linear map, in other words, embeds a faithful copy of its domain inside its codomain, so nothing $n$-dimensional embeds into anything smaller, the pigeonhole principle of linear algebra.

## 7. Every Linear Map Is a Matrix: Representation Relative to Bases

### 7.1 The representation theorem

Theorem 5.7 identified linear maps $\mathbb{R}^n \to \mathbb{R}^m$ with matrices. The isomorphism theory of §6 now extends the identification to all finite-dimensional spaces: choose bases, pass to coordinates, and any linear map becomes multiplication by a matrix.

Theorem 5.30 (matrices of linear transformations). Let $T : V \to W$ be linear, $\dim V = n$, $\dim W = m$, with bases $\mathcal{B} = \{\vec{v}_1, \dots, \vec{v}_n\}$ of $V$ and $\mathcal{B}' = \{\vec{w}_1, \dots, \vec{w}_m\}$ of $W$. Then for every $\vec{x} \in V$,

$$
\big[T(\vec{x})\big]_{\mathcal{B}'} = A\,[\vec{x}]_{\mathcal{B}},
$$

where $A = [a_{ij}]$ is the $m \times n$ matrix

$$
A = \Big[\; [T(\vec{v}_1)]_{\mathcal{B}'} \;\Big|\; \cdots \;\Big|\; [T(\vec{v}_n)]_{\mathcal{B}'} \;\Big] =: [T]_{\mathcal{B}',\mathcal{B}},
$$

the matrix of $T$ with respect to $\mathcal{B}$ and $\mathcal{B}'$, its $j$-th column being the $\mathcal{B}'$-coordinate column of the image of the $j$-th basis vector of $\mathcal{B}$. When $V = W$ and $\mathcal{B} = \mathcal{B}'$ one writes $[T]_{\mathcal{B}} = [T]_{\mathcal{B},\mathcal{B}}$.

Proof. Define the scalars $a_{ij}$ by expanding each image in the target basis, $T(\vec{v}_j) = \sum_{i=1}^m a_{ij}\vec{w}_i$, and let $\vec{x} = \sum_{j=1}^n k_j\vec{v}_j$, so $[\vec{x}]_{\mathcal{B}} = (k_1, \dots, k_n)^T$. Then, by linearity and an exchange of summations,

$$
T(\vec{x}) = \sum_{j=1}^n k_j\,T(\vec{v}_j) = \sum_{j=1}^n k_j\sum_{i=1}^m a_{ij}\vec{w}_i = \sum_{i=1}^m\Big(\sum_{j=1}^n a_{ij}k_j\Big)\vec{w}_i.
$$

By uniqueness of basis representation (Theorem 3.47), the $\mathcal{B}'$-coordinates of $T(\vec{x})$ are the inner sums $\sum_j a_{ij}k_j$, which are exactly the entries of the product $A[\vec{x}]_{\mathcal{B}}$. $\square$

(The computation is Theorem 5.7's proof word for word, with $\{\vec{v}_j\}, \{\vec{w}_i\}$ in place of the standard bases; the standard matrix is the special case $V = \mathbb{R}^n$, $W = \mathbb{R}^m$, standard bases throughout.)

The right way to hold the theorem in mind is as a commuting square. Down the left side, the coordinate isomorphism of $V$; down the right, that of $W$; across the top, $T$ itself; across the bottom, multiplication by $A$:

$$
\begin{array}{ccc}
V & \xrightarrow{\;\;T\;\;} & W \\
\downarrow{\scriptstyle[\,\cdot\,]_{\mathcal{B}}} & & \downarrow{\scriptstyle[\,\cdot\,]_{\mathcal{B}'}} \\
\mathbb{R}^n & \xrightarrow{\;\;A\;\;} & \mathbb{R}^m
\end{array}
$$

The theorem says the square commutes: coordinates-then-$A$ equals $T$-then-coordinates. Every abstract computation can therefore be shipped downstairs to matrix arithmetic and the answer shipped back up, the entire technology of Chapters 1 and 2 now applies to differentiation operators, transposition maps, and anything else linear.

One bookkeeping convention prevents all sign-of-the-arrows confusion later: in $[T]_{\mathcal{B}',\mathcal{B}}$ the input basis stands on the right (nearest the incoming coordinate column) and the output basis on the left, so that in the identity $[T(\vec{x})]_{\mathcal{B}'} = [T]_{\mathcal{B}',\mathcal{B}}[\vec{x}]_{\mathcal{B}}$ adjacent subscripts match, the same "inner indices cancel" pattern as the sizes in a matrix product.

### 7.2 Two worked representations

Example 5.31. The differentiation operator $D : \mathcal{P}_3[x] \to \mathcal{P}_2[x]$, with the standard (monomial) bases $\mathcal{B} = \{1, x, x^2, x^3\}$ and $\mathcal{B}' = \{1, x, x^2\}$. By the column recipe:

$$
D(1) = 0 = 0\cdot 1 + 0\cdot x + 0\cdot x^2, \qquad
D(x) = 1 = 1\cdot 1 + 0\cdot x + 0\cdot x^2,
$$

$$
D(x^2) = 2x = 0\cdot 1 + 2\cdot x + 0\cdot x^2, \qquad
D(x^3) = 3x^2 = 0\cdot 1 + 0\cdot x + 3\cdot x^2,
$$

so, filing the four coordinate columns,

$$
[D]_{\mathcal{B}',\mathcal{B}} =
\begin{bmatrix}
0 & 1 & 0 & 0 \\
0 & 0 & 2 & 0 \\
0 & 0 & 0 & 3
\end{bmatrix}.
$$

Equivalently, the isomorphism route, conjugating $D$ by the coordinate isomorphisms $\varphi : \mathcal{P}_3 \to \mathbb{R}^4$ and $\psi : \mathcal{P}_2 \to \mathbb{R}^3$ of Example 5.26 gives the concrete map

$$
(\psi \circ D \circ \varphi^{-1})(a_0, a_1, a_2, a_3) = \psi(a_1 + 2a_2x + 3a_3x^2) = (a_1,\ 2a_2,\ 3a_3),
$$

whose standard matrix is the same array. The matrix passes every audit one throws at it: multiplying it against $[5 + x - 2x^2 + 4x^3]_{\mathcal{B}} = (5, 1, -2, 4)^T$ gives $(1, -4, 12)^T$, and indeed $D(5 + x - 2x^2 + 4x^3) = 1 - 4x + 12x^2$. Its rank is $3$ (three pivots) and nullity $1$, matching what calculus says: $D$ maps onto $\mathcal{P}_2$ (every quadratic has a cubic antiderivative) and its kernel is the constants, one-dimensional. Calculus, compiled to a matrix.

Theorem 5.32 records the operator case of the representation theorem: for $T : V \to V$ and a single basis $\mathcal{B}$, $[T(\vec{v})]_{\mathcal{B}} = [T]_{\mathcal{B}}[\vec{v}]_{\mathcal{B}}$.

Example 5.33. Define $T : \mathrm{Mat}_2(\mathbb{R}) \to \mathrm{Mat}_2(\mathbb{R})$ by

$$
T(X) = \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}X + X\begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix},
$$

linear because matrix multiplication distributes over addition and commutes with scalars on either side. Expanding for $X = \left[\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}\right]$: the first product is $\left[\begin{smallmatrix} a + c & b + d \\ 0 & 0 \end{smallmatrix}\right]$, the second is $\left[\begin{smallmatrix} b & b \\ d & d \end{smallmatrix}\right]$, and their sum is

$$
T\begin{bmatrix} a & b \\ c & d \end{bmatrix} = \begin{bmatrix} a + b + c & 2b + d \\ d & d \end{bmatrix}.
$$

Through the isomorphism $\varphi$ of Example 5.27, the conjugated map on $\mathbb{R}^4$ is $(a, b, c, d) \mapsto (a + b + c,\ 2b + d,\ d,\ d)$, with standard matrix

$$
A = [T]_{\mathcal{B}} = \begin{bmatrix}
1 & 1 & 1 & 0 \\
0 & 2 & 0 & 1 \\
0 & 0 & 0 & 1 \\
0 & 0 & 0 & 1
\end{bmatrix},
$$

each row transcribing one output coordinate. The column recipe cross-checks all four columns: $T(E_1) = \left[\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\right] = E_1$, $T(E_2) = \left[\begin{smallmatrix} 1 & 2 \\ 0 & 0 \end{smallmatrix}\right] = E_1 + 2E_2$, $T(E_3) = \left[\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\right] = E_1$, $T(E_4) = \left[\begin{smallmatrix} 0 & 1 \\ 1 & 1 \end{smallmatrix}\right] = E_2 + E_3 + E_4$, precisely the four columns of $A$. (Set $a = 1$, others $0$, and so on, in the boxed formula to confirm each.) An operator on a space of matrices, itself now a matrix: the representation theorem is indifferent to what the vectors are made of.

### 7.3 Composition becomes multiplication

Theorem 5.34. Let $T_1 : U \to V$ and $T_2 : V \to W$ be linear, with bases $\mathcal{B}, \mathcal{B}', \mathcal{B}''$ of the finite-dimensional spaces $U, V, W$. Then

$$
[T_2 \circ T_1]_{\mathcal{B}'',\mathcal{B}} = [T_2]_{\mathcal{B}'',\mathcal{B}'}\,[T_1]_{\mathcal{B}',\mathcal{B}}.
$$

Proof. Write $\mathcal{B} = \{\vec{u}_1, \dots, \vec{u}_n\}$, $\mathcal{B}' = \{\vec{v}_1, \dots, \vec{v}_m\}$, $\mathcal{B}'' = \{\vec{w}_1, \dots, \vec{w}_\ell\}$, and let $[T_1]_{\mathcal{B}',\mathcal{B}} = [a_{ij}]_{m \times n}$ and $[T_2]_{\mathcal{B}'',\mathcal{B}'} = [b_{si}]_{\ell \times m}$, so that $T_1(\vec{u}_j) = \sum_{i=1}^m a_{ij}\vec{v}_i$ and $T_2(\vec{v}_i) = \sum_{s=1}^\ell b_{si}\vec{w}_s$. Then for each $j$,

$$
(T_2 \circ T_1)(\vec{u}_j) = T_2\Big(\sum_{i=1}^m a_{ij}\vec{v}_i\Big) = \sum_{i=1}^m a_{ij}\,T_2(\vec{v}_i) = \sum_{i=1}^m a_{ij}\sum_{s=1}^\ell b_{si}\vec{w}_s = \sum_{s=1}^\ell\Big(\sum_{i=1}^m b_{si}a_{ij}\Big)\vec{w}_s,
$$

so the $j$-th coordinate column of the composition is the column with entries $\sum_i b_{si}a_{ij}$, the $j$-th column of the product $[T_2][T_1]$. $\square$

This theorem is the reason matrix multiplication is defined as it is. The row-against-column rule of Definition 1.8, presented in Chapter 1 as the convention that makes linear substitution work, is here revealed as the unique rule under which the matrix of a composition is the product of the matrices. Associativity of matrix multiplication, checked by a double-sum computation in Chapter 1, becomes transparent: it mirrors the associativity of composition of functions, which is automatic. Even the reversed order, $T_2 \circ T_1$ corresponding to $[T_2][T_1]$, second map on the left, is the reversed order of $(AB)^{-1} = B^{-1}A^{-1}$ and $(AB)^T = B^TA^T$, all three reversals being one phenomenon: operations applied in sequence compose right-to-left in the notation.

## 8. Change of Basis and Similarity

### 8.1 The transition matrix as the matrix of the identity

Theorem 5.35. If $\mathcal{B}$ and $\mathcal{B}'$ are bases of a finite-dimensional space $V$ and $\mathrm{id} : V \to V$ is the identity operator, then

$$
P_{\mathcal{B}' \to \mathcal{B}} = [\mathrm{id}]_{\mathcal{B},\mathcal{B}'}
\qquad\text{and}\qquad
P_{\mathcal{B} \to \mathcal{B}'} = [\mathrm{id}]_{\mathcal{B}',\mathcal{B}}.
$$

Proof. By the column recipe, the $j$-th column of $[\mathrm{id}]_{\mathcal{B},\mathcal{B}'}$ is $[\mathrm{id}(\vec{u}_j')]_{\mathcal{B}} = [\vec{u}_j']_{\mathcal{B}}$, the old-basis coordinates of the $j$-th new basis vector, which is, verbatim, the $j$-th column of the transition matrix of Theorem 3.50. $\square$

A definition from Chapter 3 has become a theorem of Chapter 5: the transition matrix is not a new kind of object but the representing matrix of the simplest possible map, the identity, viewed with different bases on its two sides. It changes no vector; it only translates addresses. With this identification, Theorem 3.52 ($P$ invertible with $P^{-1}$ the reverse transition) is the composition theorem applied to $\mathrm{id} \circ \mathrm{id} = \mathrm{id}$.

### 8.2 How the matrix of an operator transforms

Theorem 5.36. Let $T : V \to V$ be a linear operator, $\mathcal{B}$ and $\mathcal{B}'$ bases of $V$, and $P = P_{\mathcal{B}' \to \mathcal{B}}$. Then

$$
[T]_{\mathcal{B}'} = P^{-1}\,[T]_{\mathcal{B}}\,P.
$$

Proof. Factor the identity through the other basis: $T = \mathrm{id}^{-1} \circ T \circ \mathrm{id}$, and apply Theorem 5.34 twice with the bookkeeping of Theorem 5.35:

$$
[T]_{\mathcal{B}'} = [\mathrm{id}]_{\mathcal{B}',\mathcal{B}}\,[T]_{\mathcal{B},\mathcal{B}}\,[\mathrm{id}]_{\mathcal{B},\mathcal{B}'} = P^{-1}\,[T]_{\mathcal{B}}\,P. \qquad\square
$$

Read the right-hand side as an itinerary for a $\mathcal{B}'$-coordinate column, right to left: $P$ translates it into $\mathcal{B}$-coordinates; $[T]_{\mathcal{B}}$ applies the operator there; $P^{-1}$ translates the answer back. Same operator, new address system, and the formula is forced.

Example 5.37. Let $T : \mathbb{R}^2 \to \mathbb{R}^2$, $T(x_1, x_2) = (x_1 + x_2,\ -2x_1 + 4x_2)$.

(1) Relative to the standard basis $\mathcal{B}$, the columns are $T(1,0) = (1,-2)$ and $T(0,1) = (1,4)$:

$$
[T]_{\mathcal{B}} = \begin{bmatrix} 1 & 1 \\ -2 & 4 \end{bmatrix}.
$$

(2) Now take $\mathcal{B}' = \{\vec{u}_1', \vec{u}_2'\}$ with $\vec{u}_1' = (1,1)$ and $\vec{u}_2' = (1,2)$. Computing images:

$$
T(1,1) = (1+1,\ -2+4) = (2,2) = 2\vec{u}_1' + 0\vec{u}_2',
\qquad
T(1,2) = (1+2,\ -2+8) = (3,6) = 0\vec{u}_1' + 3\vec{u}_2',
$$

so, filing coordinate columns,

$$
[T]_{\mathcal{B}'} = \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix},
$$

diagonal. The conjugation formula confirms it: with $P = P_{\mathcal{B}' \to \mathcal{B}} = \left[\begin{smallmatrix} 1 & 1 \\ 1 & 2 \end{smallmatrix}\right]$ (columns are the new basis vectors, the ambient basis being standard), $\det P = 1$, $P^{-1} = \left[\begin{smallmatrix} 2 & -1 \\ -1 & 1 \end{smallmatrix}\right]$, and

$$
P^{-1}[T]_{\mathcal{B}}P
= \begin{bmatrix} 2 & -1 \\ -1 & 1 \end{bmatrix}
\begin{bmatrix} 1 & 1 \\ -2 & 4 \end{bmatrix}
\begin{bmatrix} 1 & 1 \\ 1 & 2 \end{bmatrix}
= \begin{bmatrix} 2 & -1 \\ -1 & 1 \end{bmatrix}
\begin{bmatrix} 2 & 3 \\ 2 & 6 \end{bmatrix}
= \begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}. \checkmark
$$

The example is chosen with foresight, and the reader should linger on what happened. In the standard basis the operator looks like a generic mixing of coordinates; in the cunningly chosen basis $\mathcal{B}'$ it is revealed as something utterly simple, stretch by $2$ along $\vec{u}_1'$, stretch by $3$ along $\vec{u}_2'$, each basis vector merely rescaled ($T(\vec{u}_1') = 2\vec{u}_1'$, $T(\vec{u}_2') = 3\vec{u}_2'$). Directions that an operator merely rescales, and the scaling factors attached to them, are the eigenvectors and eigenvalues of the next chapter; the search for a basis making $[T]$ diagonal is diagonalization, and this example is its first sighting. The moral stands independently of the vocabulary to come: a matrix is a portrait of an operator in a basis, and a well-chosen basis can make an opaque operator transparent.

Theorem 5.38 states the general two-basis version, proved by the identical factor-through-the-identity argument: if $\mathcal{B}, \mathcal{B}_1$ are bases of $V$ and $\mathcal{B}', \mathcal{B}_1'$ bases of $W$, then

$$
[T]_{\mathcal{B}_1',\mathcal{B}_1} = \big(P_{\mathcal{B}_1' \to \mathcal{B}'}\big)^{-1}\,[T]_{\mathcal{B}',\mathcal{B}}\,P_{\mathcal{B}_1 \to \mathcal{B}},
$$

the operator case (Theorem 5.36) being the specialization $W = V$, $\mathcal{B}' = \mathcal{B}$, $\mathcal{B}_1' = \mathcal{B}_1$.

### 8.3 Similarity and its invariants

Definition. For $A, B \in \mathrm{Mat}_n(\mathbb{R})$: $B$ is similar to $A$ if $B = P^{-1}AP$ for some $P \in GL(n, \mathbb{R})$.

By Theorem 5.36, similarity is exactly the relation "represent the same linear operator in possibly different bases." Two similar matrices are two portraits of one subject.

Theorem 5.39. Similarity is an equivalence relation on $\mathrm{Mat}_n(\mathbb{R})$.

Proof. Reflexive: $A = I^{-1}AI$. Symmetric: if $B = P^{-1}AP$, then $A = PBP^{-1} = (P^{-1})^{-1}B(P^{-1})$, exhibiting $A$ as similar to $B$ via the invertible matrix $P^{-1}$. Transitive: if $B = P^{-1}AP$ and $C = Q^{-1}BQ$, then $C = Q^{-1}P^{-1}APQ = (PQ)^{-1}A(PQ)$, and $PQ$ is invertible with $(PQ)^{-1} = Q^{-1}P^{-1}$ by Theorem 1.19. $\square$

Definition 5.40. A property of square matrices is a similarity invariant if any two similar matrices share it. Since similar matrices portray one operator, the similarity invariants are precisely the quantities that belong to the operator itself, independent of the basis used to photograph it, the intrinsic features, as opposed to artifacts of coordinates.

Theorem 5.41. Determinant, invertibility, trace, rank, and nullity are similarity invariants: for $A \in \mathrm{Mat}_n(\mathbb{R})$ and $P \in GL(n,\mathbb{R})$,

$$
\det(P^{-1}AP) = \det(A), \qquad
\operatorname{tr}(P^{-1}AP) = \operatorname{tr}(A),
$$

$$
P^{-1}AP \text{ invertible} \iff A \text{ invertible}, \qquad
\mathrm{rank}(P^{-1}AP) = \mathrm{rank}(A), \qquad
\mathrm{nullity}(P^{-1}AP) = \mathrm{nullity}(A).
$$

Proof. Determinant: by the multiplicative law and Theorem 2.18,

$$
\det(P^{-1}AP) = \det(P^{-1})\det(A)\det(P) = \frac{1}{\det P}\det(A)\det(P) = \det(A),
$$

the scalar factors commuting as real numbers even though the matrices do not. Invertibility follows: $\det \neq 0$ on one side iff on the other. (Alternatively, $P^{-1}AP$ is a product of invertibles when $A$ is, and $A = P(P^{-1}AP)P^{-1}$ conversely.) Trace: by $\operatorname{tr}(XY) = \operatorname{tr}(YX)$ (Theorem 1.27) with $X = P^{-1}$ and $Y = AP$,

$$
\operatorname{tr}(P^{-1}\cdot AP) = \operatorname{tr}(AP \cdot P^{-1}) = \operatorname{tr}(A).
$$

Nullity: we show that if $\{\vec{v}_1, \dots, \vec{v}_m\}$ is a basis of $\mathrm{null}(A)$, then $\{P^{-1}\vec{v}_1, \dots, P^{-1}\vec{v}_m\}$ is a basis of $\mathrm{null}(P^{-1}AP)$, so the two null spaces have equal dimension. These vectors lie in the right space and span it: if $\vec{x} \in \mathrm{null}(P^{-1}AP)$, then $P^{-1}AP\vec{x} = \vec{0}$, and multiplying by $P$ gives $AP\vec{x} = \vec{0}$, so $P\vec{x} \in \mathrm{null}(A)$; writing $P\vec{x} = k_1\vec{v}_1 + \cdots + k_m\vec{v}_m$ and applying $P^{-1}$,

$$
\vec{x} = k_1P^{-1}\vec{v}_1 + \cdots + k_mP^{-1}\vec{v}_m \in \mathrm{Span}\{P^{-1}\vec{v}_1, \dots, P^{-1}\vec{v}_m\}.
$$

(That each $P^{-1}\vec{v}_i$ itself lies in $\mathrm{null}(P^{-1}AP)$ is the same computation run forward: $P^{-1}AP(P^{-1}\vec{v}_i) = P^{-1}A\vec{v}_i = P^{-1}\vec{0} = \vec{0}$.) They are independent: if $k_1P^{-1}\vec{v}_1 + \cdots + k_mP^{-1}\vec{v}_m = \vec{0}$, then $P^{-1}(k_1\vec{v}_1 + \cdots + k_m\vec{v}_m) = \vec{0}$, and applying the invertible $P$ gives $k_1\vec{v}_1 + \cdots + k_m\vec{v}_m = \vec{0}$; the independence of the $\vec{v}_i$ finishes. Rank: by rank–nullity on both sides, $\mathrm{rank} = n - \mathrm{nullity}$, and the nullities agree. $\square$

The theorem licenses unambiguous talk about the determinant, trace, rank, and nullity of a linear operator $T$ on a finite-dimensional space: compute them from $[T]_{\mathcal{B}}$ in any basis, and the answer is basis-independent. It also supplies the standard quick test for non-similarity: matrices with different traces, or different determinants, or different ranks, cannot be similar. In Example 5.37, one verifies $\operatorname{tr} = 1 + 4 = 5 = 2 + 3$ and $\det = 4 + 2 = 6 = 2 \cdot 3$ across the two representations, as the theorem demands; the next chapter will reveal these shared numbers as the sum and product of the eigenvalues, the deepest of the similarity invariants. (The converse caution: sharing all the invariants of Theorem 5.41 does not force similarity. $\left[\begin{smallmatrix} 1 & 1 \\ 0 & 1 \end{smallmatrix}\right]$ and $I_2$ agree in determinant, trace, rank, nullity, and invertibility, yet only $I_2$ is similar to $I_2$, since $P^{-1}I P = I$ for every $P$. Invariants separate; they do not classify.)

## 9. Retrospect

The chapter's three movements, replayed. First, the definition: linear maps are the functions compatible with the vector space operations, determined entirely by their values on a basis, and instantiated by rotations and projections, transposition and coordinates, differentiation and integration. Second, the invariants: kernel and range are subspaces measuring what a map destroys and what it achieves; their dimensions obey the conservation law $\mathrm{rank} + \mathrm{nullity} = \dim V$, proved by the extend-a-kernel-basis argument; injectivity is trivial kernel, surjectivity is full rank, the two coincide for operators in finite dimensions, and bijective linear maps (isomorphisms) classify finite-dimensional spaces completely by dimension, with the coordinate map exhibiting every $n$-dimensional space as $\mathbb{R}^n$ in costume. Third, the representation: relative to chosen bases every linear map is a matrix whose columns are coordinate images of basis vectors; composition of maps is multiplication of matrices, the origin story of the multiplication rule; transition matrices are the identity map's representations; changing basis conjugates the matrix of an operator, $[T]_{\mathcal{B}'} = P^{-1}[T]_{\mathcal{B}}P$; and the resulting equivalence, similarity, has determinant, trace, rank, and nullity among its invariants, the properties of the operator behind the matrix.

A reader wishing to certify ownership should be able to reconstruct, unaided: why $x \mapsto x + 1$ fails linearity and where $T(\vec{0}) = \vec{0}$ comes from; the coordinates-then-reassemble solution of Example 5.4; the column recipe for standard matrices and its use in the rotation matrix; the determinant signatures of reflections, rotations, and projections; the derivative operator's kernel as the constants and range as the continuous functions; the proof of the dimension theorem; the shift operators that break Theorem 5.22 in infinite dimensions; the proof that every $n$-dimensional space is isomorphic to $\mathbb{R}^n$; the commuting square behind $[T(\vec{x})]_{\mathcal{B}'} = [T]_{\mathcal{B}',\mathcal{B}}[\vec{x}]_{\mathcal{B}}$; the computation revealing $[T]_{\mathcal{B}'} = \mathrm{diag}(2,3)$ in Example 5.37 and why it whispers "eigenvalues"; and the trace-cycling and basis-transport proofs of the similarity invariants. The next chapter asks the question this one has made askable: given an operator, does a basis exist in which its matrix is diagonal, and how does one find it?
