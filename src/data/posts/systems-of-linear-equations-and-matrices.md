---
title: 'Linear Algebra Ch1  Systems of Linear Equations and Matrices'
excerpt: 'The algebra of matrices, elimination made rigorous, and the theory of invertibility: a complete pass through a standard first chapter of linear algebra.'
date: '2026-07-14'
category: study
subcategory: mathematics
keywords: ['linear algebra', 'matrices', 'Gaussian elimination', 'invertibility']
---

Based on Anton & Rorres, "Elementary Linear Algebra with Supplemental Applications" (12th ed.), and Larson, "Elementary Linear Algebra" (8th ed., metric version).

Linear algebra begins, historically and pedagogically, with a problem every reader has already met: solving simultaneous linear equations. What distinguishes the subject from school algebra is not the problem itself but the insistence on a method that scales, one that works identically whether there are two unknowns or two thousand, and whose correctness can be argued once and for all rather than checked case by case. The device that makes this possible is the matrix. This essay works through the whole of a standard first chapter: the algebra of matrices, the translation of linear systems into matrix equations, the elimination algorithms, and the theory of invertibility that ties everything together. I have tried to prove or at least motivate everything, since in this subject the proofs are usually shorter than the intuitions they encode.

## 1. Matrices and Their Basic Algebra

### 1.1 The definition

Definition 1.1. An $m \times n$ matrix over $\mathbb{R}$ is a rectangular array

$$
A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}, \qquad a_{ij} \in \mathbb{R},
$$

abbreviated $A = [a_{ij}]_{m\times n}$ or simply $[a_{ij}]$. The scalar $(A)_{ij} := a_{ij}$ is the $(i,j)$ component of $A$; the horizontal $n$-tuple $a_{i1}, \dots, a_{in}$ is the $i$-th row; the vertical $m$-tuple $a_{1j}, \dots, a_{mj}$ is the $j$-th column. When $m = n$ we speak of a square matrix of order $n$.

Two conventions deserve emphasis, because nearly every early computational error traces back to one of them. First, indices are always read row first, column second: $a_{23}$ lives in the second row and third column, never the reverse. Second, the phrase "$m \times n$" counts rows before columns. A $3 \times 1$ matrix is a column of three numbers; a $1 \times 3$ matrix is a row of three. These extreme cases, matrices with a single row or a single column, are called row vectors and column vectors respectively, and the column vectors will soon carry the unknowns and constants of our linear systems.

Notation 1.3. The set of all $m \times n$ real matrices is written $\mathrm{Mat}_{m\times n}(\mathbb{R})$, with the abbreviation $\mathrm{Mat}_n(\mathbb{R}) = \mathrm{Mat}_{n\times n}(\mathbb{R})$ for the square case.

Definition 1.4 (Equality). For $A = [a_{ij}]$ and $B = [b_{ij}]$ of the same size, $A = B$ if and only if $a_{ij} = b_{ij}$ for all $i$ and $j$. Matrices of different sizes are never equal.

The definition is unremarkable on its face, but it carries a useful shift in perspective: a single equation between $m \times n$ matrices is a compressed statement of $mn$ scalar equations. Much of the power of matrix notation lies precisely in this compression; one line of matrix algebra can encode, and manipulate simultaneously, an entire system of numerical relationships.

### 1.2 Addition and scalar multiplication

Definition 1.5. For $A = [a_{ij}], B = [b_{ij}] \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ and $k \in \mathbb{R}$, define

$$
A + B := [a_{ij} + b_{ij}], \qquad kA := [k\,a_{ij}], \qquad O := [0], \qquad -A := [-a_{ij}], \qquad A - B := A + (-B).
$$

Addition is entrywise and is defined only between matrices of identical size; scalar multiplication rescales every entry; $O$ denotes the zero matrix of whatever size the context demands. Note that subtraction is not introduced as a primitive operation but derived from addition and negation, a small economy of definitions that becomes standard practice throughout algebra.

A quick illustration:

$$
\begin{bmatrix} 2 & 1 & 0 \\ -1 & 0 & 2 \end{bmatrix} + \begin{bmatrix} -4 & 3 & 5 \\ 2 & 2 & 0 \end{bmatrix} = \begin{bmatrix} -2 & 4 & 5 \\ 1 & 2 & 2 \end{bmatrix}, \qquad 2\begin{bmatrix} 2 & 1 & 0 \\ -1 & 0 & 2 \end{bmatrix} = \begin{bmatrix} 4 & 2 & 0 \\ -2 & 0 & 4 \end{bmatrix}.
$$

Theorem 1.7. For all $A, B, C \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ and $k, \ell \in \mathbb{R}$:

$$
\begin{array}{llll}
\text{(A1)} & (A+B)+C = A+(B+C) & \text{(SM1)} & k(A+B) = kA + kB \\
\text{(A2)} & A+B = B+A & \text{(SM2)} & (k+\ell)A = kA + \ell A \\
\text{(A3)} & A+O = O+A = A & \text{(SM3)} & k(\ell A) = (k\ell)A = \ell(kA) \\
\text{(A4)} & A+(-A) = O & \text{(SM4)} & 1A = A
\end{array}
$$

Each identity is verified by comparing an arbitrary $(i,j)$ entry of both sides; the entries are real numbers, and the corresponding law for real numbers finishes the argument. There is nothing deep here, and that is rather the point. What deserves attention is the list itself: these eight properties are exactly the axioms of a vector space, an abstraction introduced in a later chapter. When that abstraction arrives, $\mathrm{Mat}_{m\times n}(\mathbb{R})$ will already be a familiar example, and the reader who has internalized Theorem 1.7 will recognize the axioms as old acquaintances rather than arbitrary demands.

## 2. Matrix Multiplication

### 2.1 The definition, and why it must be so

Given the entrywise character of addition, a newcomer naturally expects multiplication to be entrywise as well. It is not, and the reason is that an entrywise product would be almost useless for the purposes matrices are meant to serve.

Definition 1.8. For $A = [a_{ij}]_{m\times n}$ and $B = [b_{k\ell}]_{n\times r}$, the product $AB$ is the $m \times r$ matrix whose entries are

$$
(AB)_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}.
$$

In words: the $(i,j)$ entry of $AB$ is the "dot product" of the $i$-th row of $A$ with the $j$-th column of $B$. The definition imposes a compatibility condition, namely that the number of columns of $A$ must equal the number of rows of $B$, and the sizes compose according to the mnemonic $(m \times n)(n \times r) = m \times r$: the inner dimensions must match and then cancel, leaving the outer ones.

Where does this rule come from? Consider the system

$$
\begin{cases} a_{11}x_1 + a_{12}x_2 = b_1 \\ a_{21}x_1 + a_{22}x_2 = b_2. \end{cases}
$$

If we wish to write this as a single equation $A\vec{x} = \vec{b}$, with $A$ the array of coefficients and $\vec{x}, \vec{b}$ column vectors, then the product $A\vec{x}$ is forced to mean "each row of $A$ paired against the column $\vec{x}$, products summed", which is precisely Definition 1.8 in the case $r = 1$. The general definition then extends this so that multiplication composes properly (a fact recorded below as associativity, and interpreted in later chapters as composition of linear transformations). Matrix multiplication, in short, is not an arbitrary convention but the unique operation that makes linear substitution into algebra.

### 2.2 A complete worked product

Let

$$
A = \begin{bmatrix} 1 & 2 & 4 \\ 2 & 6 & 0 \end{bmatrix}, \qquad B = \begin{bmatrix} 4 & 1 & 4 & 3 \\ 0 & -1 & 3 & 1 \\ 2 & 7 & 5 & 2 \end{bmatrix}.
$$

Since $A$ is $2 \times 3$ and $B$ is $3 \times 4$, the product $AB$ exists and is $2 \times 4$. Computing each entry from the definition:

$$
\begin{aligned}
(AB)_{11} &= 1\cdot 4 + 2\cdot 0 + 4\cdot 2 = 12, &\quad (AB)_{12} &= 1\cdot 1 + 2\cdot(-1) + 4\cdot 7 = 27,\\
(AB)_{13} &= 1\cdot 4 + 2\cdot 3 + 4\cdot 5 = 30, &\quad (AB)_{14} &= 1\cdot 3 + 2\cdot 1 + 4\cdot 2 = 13,\\
(AB)_{21} &= 2\cdot 4 + 6\cdot 0 + 0\cdot 2 = 8, &\quad (AB)_{22} &= 2\cdot 1 + 6\cdot(-1) + 0\cdot 7 = -4,\\
(AB)_{23} &= 2\cdot 4 + 6\cdot 3 + 0\cdot 5 = 26, &\quad (AB)_{24} &= 2\cdot 3 + 6\cdot 1 + 0\cdot 2 = 12,
\end{aligned}
$$

so that

$$
AB = \begin{bmatrix} 12 & 27 & 30 & 13 \\ 8 & -4 & 26 & 12 \end{bmatrix}.
$$

Observe that $BA$ is not merely different from $AB$; it fails to exist, since a $3\times 4$ matrix cannot be multiplied by a $2 \times 3$ one.

### 2.3 What survives and what fails

Theorem 1.10. Whenever the indicated sizes are compatible,

$$
A(BC) = (AB)C, \qquad A(B+C) = AB + AC, \qquad (B+C)A = BA + CA.
$$

Associativity is proved by writing both sides of $(A(BC))_{ij}$ as the double sum $\sum_k \sum_\ell a_{ik} b_{k\ell} c_{\ell j}$ and noting that the order of summation is immaterial. The two distributive laws are entrywise computations. That distributivity must be stated twice, once from the left and once from the right, is the first symptom of the central pathology of matrix algebra:

Multiplication is not commutative. In general $AB \neq BA$, even when both products exist and have the same size. The standard minimal example:

$$
A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \quad B = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} \quad\Longrightarrow\quad AB = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}, \quad BA = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}.
$$

The same example exposes two further failures, both invisible in ordinary arithmetic. The product of two nonzero matrices can be the zero matrix ($AB = O$ above, with $A \neq O$ and $B \neq O$); in the language of ring theory, $\mathrm{Mat}_n(\mathbb{R})$ has zero divisors. And consequently the cancellation law fails: from $AB = AC$ one may not conclude $B = C$. Cancellation will be restored, but only under an additional hypothesis, the invertibility of $A$, which occupies the second half of the chapter. A reader trained on the algebra of real numbers should treat these three failures as the reflexes to retrain before anything else; virtually every subtle error in elementary matrix work is a covert appeal to commutativity or cancellation.

## 3. Linear Combinations and the Anatomy of a Product

### 3.1 Linear combinations

Definition 1.11. If $A_1, \dots, A_r$ are matrices of a common size and $c_1, \dots, c_r$ are scalars, the expression

$$
c_1 A_1 + c_2 A_2 + \cdots + c_r A_r
$$

is a linear combination of $A_1, \dots, A_r$ with coefficients $c_1, \dots, c_r$.

The operation is humble, nothing more than rescaling and adding, but it is the fundamental act of the entire subject. Spans, subspaces, bases, dimension: all of the later architecture is built from linear combinations, and it is worth acquiring the habit now of asking, whenever a new object appears, "what can be written as a linear combination of what?"

### 3.2 The product $A\vec{x}$ as a combination of columns

Theorem 1.12. If $A$ is $m \times n$ with columns $\vec{c}_1, \dots, \vec{c}_n$, and $\vec{x}$ is the $n \times 1$ column with entries $x_1, \dots, x_n$, then

$$
A\vec{x} = x_1 \vec{c}_1 + x_2 \vec{c}_2 + \cdots + x_n \vec{c}_n.
$$

The proof is a direct unwinding of Definition 1.8, but the statement repays contemplation. In the $2 \times 2$ case,

$$
\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} x_1 + 2x_2 \\ 3x_1 + 4x_2 \end{bmatrix} = x_1\begin{bmatrix} 1 \\ 3 \end{bmatrix} + x_2\begin{bmatrix} 2 \\ 4 \end{bmatrix}.
$$

The consequence for linear systems is immediate and important: the system $A\vec{x} = \vec{b}$ is solvable exactly when $\vec{b}$ can be expressed as a linear combination of the columns of $A$. Solvability, in other words, is a question about the reach of the columns, a formulation that will mature into the notion of column space.

### 3.3 Products computed by columns and by rows (Remark 1.13)

Let $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ and $B \in \mathrm{Mat}_{n\times \ell}(\mathbb{R})$. Partitioning $B$ into its columns $\vec{b}_1, \dots, \vec{b}_\ell$, one finds

$$
AB = \big[\, A\vec{b}_1 \;\big|\; A\vec{b}_2 \;\big|\; \cdots \;\big|\; A\vec{b}_\ell \,\big];
$$

that is, the $j$-th column of $AB$ is $A$ applied to the $j$-th column of $B$. Dually, partitioning $A$ into its rows $\vec{a}_1, \dots, \vec{a}_m$,

$$
AB = \begin{bmatrix} \vec{a}_1 B \\ \vec{a}_2 B \\ \vdots \\ \vec{a}_m B \end{bmatrix},
$$

so the $i$-th row of $AB$ is the $i$-th row of $A$ times $B$. Both identities follow from Definition 1.8 by inspection, yet they are far more than computational conveniences. The column-by-column formula, in particular, is the engine of the most elegant proof in this chapter (Theorem 1.54, §10.4 below), and the general technique of partitioned or block multiplication that these formulas exemplify pervades both theory and numerical practice.

## 4. The Transpose

Definition 1.14. The transpose of $A = [a_{ij}] \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ is the $n \times m$ matrix $A^T = [b_{ij}]$ with $b_{ij} = a_{ji}$: the reflection of $A$ across its main diagonal, under which rows become columns and columns become rows. For instance,

$$
\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}^{T} = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}.
$$

Theorem 1.15. For matrices of compatible sizes and $k \in \mathbb{R}$:

$$
(A^T)^T = A, \qquad (A+B)^T = A^T + B^T, \qquad (kA)^T = kA^T, \qquad (AB)^T = B^T A^T.
$$

The first three assert that transposition is an involution compatible with the linear structure. The fourth is the one to be careful with: transposition reverses the order of products. One can see that the reversal is unavoidable before doing any computation, simply by counting sizes. If $A$ is $m \times n$ and $B$ is $n \times r$, then $(AB)^T$ is $r \times m$; the product $B^T A^T$ is $(r \times n)(n \times m) = r \times m$ and fits, whereas $A^T B^T$ is $(n \times m)(r \times n)$, which is not even defined unless $m = r$. For the proof one checks entries: $\big((AB)^T\big)_{ij} = (AB)_{ji} = \sum_k a_{jk} b_{ki} = \sum_k (B^T)_{ik} (A^T)_{kj} = (B^T A^T)_{ij}$.

## 5. Distinguished Families of Square Matrices

Within $\mathrm{Mat}_n(\mathbb{R})$ several families recur so often that they deserve names at the outset (Definition 1.16). The entries $a_{11}, a_{22}, \dots, a_{nn}$ form the main diagonal of $A$, and each family is characterized by where zeros are required to sit relative to it.

A diagonal matrix has $a_{ij} = 0$ whenever $i \neq j$: all activity is confined to the diagonal, though the diagonal entries themselves are unrestricted. The identity matrix $I = I_n$ is the diagonal matrix whose diagonal entries all equal $1$; it is the multiplicative identity, satisfying $AI = A$ and $IA = A$ for every $A$ of compatible size, and thus plays the role of the number $1$ in matrix arithmetic. A scalar matrix is one of the form $kI$ for some $k \in \mathbb{R}$; multiplication by it simply rescales, which explains the name. An upper triangular matrix has $a_{ij} = 0$ for all $i > j$ (zeros below the diagonal); a lower triangular matrix has $a_{ij} = 0$ for all $i < j$ (zeros above). Schematically:

$$
\underbrace{\begin{bmatrix} * & 0 & 0 \\ 0 & * & 0 \\ 0 & 0 & * \end{bmatrix}}_{\text{diagonal}} \qquad \underbrace{\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}}_{I_3} \qquad \underbrace{\begin{bmatrix} k & 0 & 0 \\ 0 & k & 0 \\ 0 & 0 & k \end{bmatrix}}_{kI_3} \qquad \underbrace{\begin{bmatrix} * & * & * \\ 0 & * & * \\ 0 & 0 & * \end{bmatrix}}_{\text{upper triangular}} \qquad \underbrace{\begin{bmatrix} * & 0 & 0 \\ * & * & 0 \\ * & * & * \end{bmatrix}}_{\text{lower triangular}}
$$

The families are nested: every scalar matrix is diagonal, and the diagonal matrices are precisely those that are simultaneously upper and lower triangular. Triangular matrices are not idle curiosities; they are the natural terminus of elimination (a row echelon form of a square matrix is upper triangular), and much of numerical linear algebra consists of factoring general matrices into triangular pieces.

## 6. Invertibility

### 6.1 Definition and first examples

To solve the scalar equation $ax = b$ with $a \neq 0$, one multiplies by $a^{-1}$. The corresponding notion for matrices is the subject of the following definition, and its ramifications occupy the remainder of the chapter.

Definition. A matrix $A \in \mathrm{Mat}_n(\mathbb{R})$ is invertible (or nonsingular) if there exists $B \in \mathrm{Mat}_n(\mathbb{R})$ with

$$
AB = BA = I.
$$

Such a $B$ is called an inverse of $A$ and written $A^{-1}$. If no such $B$ exists, $A$ is singular. The collection of invertible matrices is denoted

$$
GL(n, \mathbb{R}) = \{ A \in \mathrm{Mat}_n(\mathbb{R}) : A \text{ is invertible} \},
$$

the general linear group. It is indeed a group under multiplication, as Theorem 1.19 below implicitly verifies.

The definition demands both $AB = I$ and $BA = I$; since multiplication is not commutative, neither equation obviously implies the other. (Remarkably, for square matrices one does imply the other, but this is a theorem, proved at the end of the chapter, not a triviality.) A more immediate departure from scalar arithmetic: among real numbers only $0$ fails to have a reciprocal, whereas plenty of nonzero matrices are singular. The matrix $\left[\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\right]$ is a case in point: any product $\left[\begin{smallmatrix} 1 & 0 \\ 0 & 0 \end{smallmatrix}\right]B$ has a zero second row and so cannot equal $I$. Deciding which matrices are invertible is thus a genuine problem, and its complete solution (Theorem 1.54) is the chapter's culmination.

Example 1.17 (the $2 \times 2$ case). The matrix $A = \left[\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}\right]$ is invertible if and only if $ad - bc \neq 0$, in which case

$$
A^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}.
$$

The recipe (exchange the diagonal entries, negate the off-diagonal entries, divide by $ad - bc$) is easily confirmed:

$$
\begin{bmatrix} a & b \\ c & d \end{bmatrix}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix} = \begin{bmatrix} ad - bc & 0 \\ 0 & ad - bc \end{bmatrix} = (ad-bc)\,I.
$$

The quantity $ad - bc$ is the determinant of $A$; the next chapter generalizes it to all orders and shows that non-vanishing of the determinant characterizes invertibility in general.

### 6.2 Uniqueness, and the calculus of inverses

Theorem 1.18. If $B$ and $C$ are both inverses of $A$, then $B = C$.

Proof. $B = BI = B(AC) = (BA)C = IC = C$. $\square$

Five equalities, using only the definition of the identity and associativity: a proof worth memorizing as a specimen of how much associativity alone can do. Its significance is grammatical as well as mathematical: it licenses the definite article in "the inverse of $A$" and makes the notation $A^{-1}$ unambiguous.

Theorem 1.19. If $A, B \in GL(n,\mathbb{R})$ and $k \in \mathbb{R}$ with $k \neq 0$, then $I_n$, $A^{-1}$, $AB$, and $kA$ are all invertible, with

$$
I_n^{-1} = I_n, \qquad (A^{-1})^{-1} = A, \qquad (AB)^{-1} = B^{-1}A^{-1}, \qquad (kA)^{-1} = k^{-1}A^{-1}.
$$

Each formula is verified by multiplying the claimed inverse against the matrix in question; for the product,

$$
(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I,
$$

and symmetrically on the other side. The reversal of order in $(AB)^{-1} = B^{-1}A^{-1}$ mirrors the reversal in $(AB)^T = B^TA^T$ and has the same everyday logic: operations performed in sequence must be undone in the opposite sequence, as anyone who has put on socks and then shoes understands.

### 6.3 Powers

For $A \in \mathrm{Mat}_n(\mathbb{R})$, integer powers are defined inductively: $A^0 = I$, $A^{m+1} = A\,A^m$ for $m \geq 0$, and, provided $A$ is invertible, $A^{-m} = (A^{-1})^m$ for $m > 0$. Within their domain of definition the familiar exponent laws hold (Remark 1.20):

$$
A^n A^m = A^{n+m}, \qquad (A^n)^m = A^{nm}.
$$

One law conspicuously absent from the list is $(AB)^m = A^m B^m$, and its absence is again the fault of non-commutativity: $(AB)^2 = ABAB$, which equals $A^2B^2$ only if $A$ and $B$ happen to commute.

Theorem 1.21. If $A \in GL(n,\mathbb{R})$, then for every integer $m$ the power $A^m$ is invertible with $(A^m)^{-1} = (A^{-1})^m$; moreover $A^T$ is invertible with $(A^T)^{-1} = (A^{-1})^T$.

The second assertion follows by transposing the equations $AA^{-1} = A^{-1}A = I$ and using $(AB)^T = B^TA^T$ together with $I^T = I$: one obtains $(A^{-1})^T A^T = A^T (A^{-1})^T = I$, which exhibits $(A^{-1})^T$ as the inverse of $A^T$. Thus inversion and transposition commute, a small fact used constantly.

## 7. Symmetric Matrices and the Trace

### 7.1 Symmetry

Definition 1.22. $A \in \mathrm{Mat}_n(\mathbb{R})$ is symmetric if $A^T = A$, i.e. $a_{ij} = a_{ji}$ for all $i,j$: the matrix is invariant under reflection across its main diagonal.

Every diagonal matrix is trivially symmetric. A more substantial family of examples (Example 1.23): for any $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$, square or not, both $AA^T$ and $A^TA$ are symmetric, since

$$
(AA^T)^T = (A^T)^T A^T = AA^T,
$$

and likewise for $A^TA$. Note the sizes: $AA^T$ is $m \times m$ while $A^TA$ is $n \times n$. These two products, sometimes called Gram matrices, are ubiquitous in statistics and applied mathematics, where symmetry is the first of their many good properties.

Theorem 1.24. If $A$ and $B$ are symmetric matrices of the same order, then $A + B$, $kA$ for any scalar $k$, $A^T$, and (when $A$ is invertible) $A^{-1}$ are all symmetric.

For the inverse: $(A^{-1})^T = (A^T)^{-1} = A^{-1}$, using Theorem 1.21 and the symmetry of $A$. Conspicuously missing from the list is the product $AB$, and the omission is deliberate. One computes $(AB)^T = B^TA^T = BA$, so $AB$ is symmetric precisely when $AB = BA$; that is, symmetry of a product is equivalent to commutativity of its factors, which cannot be taken for granted.

### 7.2 The trace

Definition 1.25. The trace of $A \in \mathrm{Mat}_n(\mathbb{R})$ is the sum of its diagonal entries:

$$
\operatorname{tr}(A) = \sum_{i=1}^n a_{ii}.
$$

Theorems 1.26–1.27. For $A, B$ of appropriate sizes and $k \in \mathbb{R}$:

$$
\operatorname{tr}(A+B) = \operatorname{tr}(A) + \operatorname{tr}(B), \qquad \operatorname{tr}(kA) = k\operatorname{tr}(A), \qquad \operatorname{tr}(A^T) = \operatorname{tr}(A), \qquad \operatorname{tr}(AB) = \operatorname{tr}(BA).
$$

The first three are immediate. The fourth is the interesting one, and it is stated in surprising generality: it holds for $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ and $B \in \mathrm{Mat}_{n\times m}(\mathbb{R})$, so that $AB$ is $m \times m$ and $BA$ is $n \times n$, matrices that need not even share a size, let alone be equal. The proof is a single exchange of summation order:

$$
\operatorname{tr}(AB) = \sum_{i=1}^{m}\sum_{k=1}^{n} a_{ik}b_{ki} = \sum_{k=1}^{n}\sum_{i=1}^{m} b_{ki}a_{ik} = \operatorname{tr}(BA).
$$

That so coarse an invariant as the diagonal sum should be blind to the order of multiplication is a first hint that the trace carries structural information; readers who continue in the subject will meet it again as the sum of eigenvalues.

## 8. Linear Systems: Language and Geometry

### 8.1 Vocabulary

A linear equation in the unknowns $x_1, \dots, x_n$ is one of the form

$$
a_1 x_1 + a_2 x_2 + \cdots + a_n x_n = b, \tag{*}
$$

where $a_1, \dots, a_n, b$ are constants and the $a_i$ are not all zero. The defining restriction is that each unknown appears only to the first power and only multiplied by a constant: no products of unknowns, no powers, no functions of them. Thus $3x + 2y = 5$ qualifies while $x^2 + y = 1$, $xy = 3$, and $\sin x + y = 0$ do not. A solution of $(*)$ is a sequence of numbers $s_1, \dots, s_n$ whose substitution $x_i = s_i$ satisfies the equation; the set of all solutions is its solution set or general solution. The equation is homogeneous if $b = 0$.

A finite collection of linear equations in the same unknowns is a system of linear equations, or a linear system. A solution of the system is a sequence satisfying every equation simultaneously. A system with no solutions is inconsistent; one with at least one solution is consistent.

Example 1.28. The system $x + y = 4$, $2x + 2y = 6$ is inconsistent: halving the second equation yields $x + y = 3$, which cannot hold alongside $x + y = 4$. The system $x + y = 4$, $2x + 3y = 5$ is consistent with the unique solution $(x,y) = (7,-3)$, as substitution of $x = 4 - y$ into the second equation shows. And the system $x + y = 4$, $2x + 2y = 8$ is consistent with infinitely many solutions, the second equation being merely a disguise of the first.

### 8.2 Geometry, and a conjecture

We have just witnessed three outcomes: no solution, one solution, infinitely many. They are not an accident of the examples, and geometry explains why.

With two unknowns, each equation $ax + by = p$ describes a line in the plane, and solving the system means locating the common points of the lines (Example 1.29). Two lines are either parallel and distinct (no common point), or meet in exactly one point, or coincide (a line's worth of common points). No pair of lines meets in exactly two points.

With three unknowns, each equation describes a plane in space (Example 1.30), and the taxonomy of configurations is richer: three mutually parallel planes, or two parallel and one transverse, or three planes arranged like the faces of a triangular prism, all give inconsistent systems; three planes in general position meet in a single point, the way two walls and the floor of a room meet at a corner; three planes through a common line, or coincident planes, give infinitely many solutions, with solution sets that are lines or planes. But however elaborate the configuration, the count of solutions is always $0$, $1$, or $\infty$.

This trichotomy holds for every linear system in any number of unknowns (Theorem 1.50, §9.5), and one can already see the algebraic germ of the proof: if $\vec{x}_1 \neq \vec{x}_2$ are two distinct solutions of $A\vec{x} = \vec{b}$, then for every real $t$ the vector $\vec{x}_1 + t(\vec{x}_2 - \vec{x}_1)$ is again a solution, since

$$
A\big(\vec{x}_1 + t(\vec{x}_2 - \vec{x}_1)\big) = A\vec{x}_1 + t(A\vec{x}_2 - A\vec{x}_1) = \vec{b} + t(\vec{b} - \vec{b}) = \vec{b}.
$$

Two solutions thus breed a full line of them: linearity forbids finite plurality.

### 8.3 The matrix formulation

A general system of $m$ equations in $n$ unknowns,

$$
\begin{cases} a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\ \quad\vdots \\ a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m, \end{cases}
$$

is encoded by three objects: the coefficient matrix $A = [a_{ij}]_{m\times n}$, the vector of unknowns $\vec{x} = [x_1, \dots, x_n]^T$, and the constant vector $\vec{b} = [b_1, \dots, b_m]^T$. By the very design of matrix multiplication (§2.1), the entire system collapses to

$$
A\vec{x} = \vec{b}.
$$

For computational purposes one goes a step further and discards the unknowns altogether. Since the symbols $x_1, \dots, x_n$ serve only as placeholders, all information in the system resides in the coefficients and constants, which we assemble into the augmented matrix

$$
[\,A \mid \vec{b}\,] = \left[\begin{array}{cccc|c} a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\ \vdots & & & \vdots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} & b_m \end{array}\right].
$$

Example 1.31. The systems

$$
\begin{cases} 3x_1 - 2x_2 = -1 \\ 4x_1 + 5x_2 = 3 \\ 7x_1 + 3x_2 = 2 \end{cases} \qquad\text{and}\qquad \begin{cases} x_1 + x_2 + 2x_3 = 9 \\ 2x_1 + 4x_2 - 3x_3 = 1 \\ 3x_1 + 6x_2 - 5x_3 = 0 \end{cases}
$$

have augmented matrices

$$
\left[\begin{array}{cc|c} 3 & -2 & -1 \\ 4 & 5 & 3 \\ 7 & 3 & 2 \end{array}\right] \qquad\text{and}\qquad \left[\begin{array}{ccc|c} 1 & 1 & 2 & 9 \\ 2 & 4 & -3 & 1 \\ 3 & 6 & -5 & 0 \end{array}\right].
$$

Two clerical warnings: every equation must first be arranged with the unknowns on the left and the constant on the right, and any unknown absent from an equation contributes a coefficient of $0$, not a blank.

### 8.4 Homogeneous systems

The system $A\vec{x} = \vec{b}$ is homogeneous when $\vec{b} = \vec{0}$. Homogeneous systems enjoy a privilege denied to systems in general: they are never inconsistent, since $x_1 = x_2 = \cdots = x_n = 0$ is always a solution, called the trivial solution. The interesting question about a homogeneous system is therefore not whether it has solutions but whether it has any besides the trivial one; by the trichotomy, the answer is either "no" (unique solution) or "infinitely many." This dichotomy, trivial solution only versus nontrivial solutions in abundance, turns out to be precisely the dividing line between invertible and singular coefficient matrices, as Theorem 1.54 will show.

## 9. Elimination, Made Rigorous

### 9.1 Elementary row operations and row equivalence

Everyone who has solved simultaneous equations by hand has used three moves: reordering the equations, scaling an equation by a nonzero constant, and adding a multiple of one equation to another. Transcribed to augmented matrices, these become the elementary row operations:

1. interchange two rows;
2. multiply a row through by a nonzero constant;
3. add a multiple of one row to another row.

The nonzero proviso in the second operation is not pedantry. Multiplying an equation by zero annihilates it, and information once destroyed cannot be recovered; the resulting system may acquire solutions the original never had. The three operations as stated share a subtler and more important property: each is reversible. An interchange is undone by the same interchange; scaling by $k$ is undone by scaling by $1/k$; adding $k$ times row $j$ to row $i$ is undone by subtracting it. Reversibility is what guarantees that no operation can enlarge or shrink the solution set, a claim we will convert into a theorem shortly.

Definition 1.32. Matrices $A$ and $B$ are row equivalent, written $A \sim B$, if one can be obtained from the other by a finite sequence of elementary row operations. (By reversibility, "one from the other" is symmetric, so the definition is unambiguous.) Row equivalence is an equivalence relation on $\mathrm{Mat}_{m\times n}(\mathbb{R})$ (Remark 1.37): it is reflexive (the empty sequence of operations), symmetric (reverse each operation and traverse the sequence backwards), and transitive (concatenate sequences).

### 9.2 Elementary matrices: row operations as multiplication

The decisive conceptual step of the chapter is to recognize hand manipulation as algebra.

Definition 1.33. An elementary matrix is a matrix obtained from the identity $I_n$ by a single elementary row operation. The three operations yield three species:

$$
E_{ij} \ (\text{rows } i, j \text{ interchanged}), \qquad E_i(k) \ (\text{row } i \text{ scaled by } k \neq 0), \qquad E_{ij}(k) \ (k \times \text{row } j \text{ added to row } i).
$$

In the $3 \times 3$ case, for instance,

$$
E_{23} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}, \qquad E_3(2) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix}, \qquad E_{23}(-2) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & -2 \\ 0 & 0 & 1 \end{bmatrix}.
$$

Theorem 1.34. If $B$ results from performing a certain elementary row operation on $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$, and $E$ is the elementary matrix obtained by performing that same operation on $I_m$, then $B = EA$.

Performing a row operation is left-multiplication by an elementary matrix. One verification from Example 1.35 conveys the pattern. With

$$
A = \begin{bmatrix} 1 & 0 & 2 & 3 \\ 2 & -1 & 3 & 6 \\ 1 & 4 & 4 & 0 \end{bmatrix},
$$

adding $-2$ times row 3 to row 2 gives, on the one hand, the matrix with second row $(0, -9, -5, 6)$, since $2 - 2(1) = 0$, $-1 - 2(4) = -9$, $3 - 2(4) = -5$, $6 - 2(0) = 6$; and on the other hand,

$$
E_{23}(-2)\,A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & -2 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 2 & 3 \\ 2 & -1 & 3 & 6 \\ 1 & 4 & 4 & 0 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 2 & 3 \\ 0 & -9 & -5 & 6 \\ 1 & 4 & 4 & 0 \end{bmatrix},
$$

in agreement. The interchange and scaling operations check out identically.

Theorem 1.36. Every elementary matrix is invertible, and its inverse is again elementary:

$$
E_{ij}^{-1} = E_{ij}, \qquad E_i(k)^{-1} = E_i(1/k), \qquad E_{ij}(k)^{-1} = E_{ij}(-k).
$$

This is the reversibility of §9.1 recast as algebra: the elementary matrix of the undoing operation inverts the elementary matrix of the operation. With Theorems 1.34 and 1.36 in hand, an entire elimination, which is just a sequence of row operations, becomes a product $E_s \cdots E_2 E_1$ of invertible matrices applied on the left, and the informal claim "elimination doesn't change the answers" is ready to be proved.

### 9.3 Echelon forms

How far should elimination be carried? The chapter fixes two target shapes. Consider four conditions on a matrix:

(i) any rows consisting entirely of zeros are grouped at the bottom; (ii) in each nonzero row, the first nonzero entry is a $1$, called a leading 1; (iii) in any two successive nonzero rows, the leading $1$ of the lower row lies strictly to the right of the leading $1$ of the upper row; (iv) each column containing a leading $1$ has zeros in all its other positions.

A matrix satisfying (i)–(iii) is in row echelon form (REF); the leading 1's descend in a staircase, with everything below the staircase zero. A matrix satisfying all of (i)–(iv) is in reduced row echelon form (RREF); the columns of the leading 1's have additionally been cleared above the staircase. Thus

$$
\begin{bmatrix} 1 & 2 & -3 \\ 0 & 1 & -2 \\ 0 & 0 & 1 \end{bmatrix}
$$

is in REF but not RREF (condition (iv) fails in the second and third columns), while

$$
\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \qquad\text{and}\qquad \begin{bmatrix} 1 & 3 & 0 & 8 \\ 0 & 0 & 1 & 4 \\ 0 & 0 & 0 & 0 \end{bmatrix}
$$

are in RREF. The second example makes two permissions explicit: leading 1's may skip columns, and columns without a leading 1 may contain arbitrary entries.

Remark 1.38 (uniqueness). Here the two forms part company. The reduced row echelon form of a matrix is unique: every sequence of row operations, carried to completion, arrives at the same RREF, so one may speak of the RREF of $A$. Row echelon forms, by contrast, are not unique. The textbook offers the matrix $\left[\begin{smallmatrix} 1 & 2 & -3 \\ 2 & -1 & 4 \\ 1 & -1 & 1 \end{smallmatrix}\right]$, which different eliminations carry to the distinct REFs

$$
\begin{bmatrix} 1 & 2 & -3 \\ 0 & 1 & -2 \\ 0 & 0 & 1 \end{bmatrix} \qquad\text{and}\qquad \begin{bmatrix} 1 & -1 & 1 \\ 0 & 1 & -2/3 \\ 0 & 0 & 1 \end{bmatrix};
$$

continued reduction of either yields one and the same RREF. The uniqueness of the RREF is what makes it a genuine invariant of the matrix, a canonical form for row equivalence, and it quietly underwrites every argument below that begins "consider the RREF of $A$."

Theorem 1.39. For every $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ there exist elementary matrices $E_1, \dots, E_s$ and a matrix $R$ in reduced row echelon form with

$$
R = E_s \cdots E_1 A,
$$

and the product $P = E_s \cdots E_1$ is invertible.

Existence of the reduction is the content of the elimination algorithm itself; invertibility of $P$ follows because each $E_i$ is invertible (Theorem 1.36) and products of invertible matrices are invertible (Theorem 1.19). In one sentence: every matrix is carried to its reduced row echelon form by left-multiplication by some invertible matrix.

Example 1.40. To reduce

$$
A = \begin{bmatrix} 1 & 3 & -2 & 0 & 1 \\ 2 & 6 & -3 & 4 & 4 \\ 3 & 9 & -4 & 8 & 7 \end{bmatrix},
$$

apply $E_{21}(-2)$ and $E_{31}(-3)$ to clear the first column below its leading 1, obtaining rows $(0,0,1,4,2)$ and $(0,0,2,8,4)$; then $E_{32}(-2)$ annihilates the third row; finally $E_{12}(2)$ clears the entry above the second leading 1, giving

$$
R = \begin{bmatrix} 1 & 3 & 0 & 8 & 5 \\ 0 & 0 & 1 & 4 & 2 \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix} = E_{12}(2)\,E_{32}(-2)\,E_{31}(-3)\,E_{21}(-2)\,A,
$$

which the reader may check against conditions (i)–(iv).

### 9.4 Why elimination is legitimate

Theorem 1.41. Let $A \in \mathrm{Mat}_{m\times n}(\mathbb{R})$ and $\vec{b} \in \mathrm{Mat}_{m\times 1}(\mathbb{R})$.

1. For any invertible $E \in GL(m,\mathbb{R})$, the systems $A\vec{x} = \vec{b}$ and $EA\vec{x} = E\vec{b}$ have the same solutions.
2. If $[\,B \mid \vec{c}\,]$ is the reduced row echelon form of $[\,A \mid \vec{b}\,]$, then $A\vec{x} = \vec{b}$ and $B\vec{x} = \vec{c}$ have the same solutions.

Proof of (1). If $A\vec{x} = \vec{b}$, then left-multiplication by $E$ gives $EA\vec{x} = E\vec{b}$. Conversely, if $EA\vec{x} = E\vec{b}$, left-multiplication by $E^{-1}$ recovers $A\vec{x} = \vec{b}$. The second direction is the entire point, and it is exactly here that invertibility earns its keep: multiplication by a singular matrix could create spurious solutions, with no way to argue back. Assertion (2) follows from (1) via Theorem 1.39. $\square$

This short theorem is the license under which every elimination below operates. When we replace an augmented matrix by its RREF, we are provably solving the same system.

### 9.5 The algorithms at work

Two procedures are standard. Gauss–Jordan elimination reduces the augmented matrix all the way to RREF and reads off the solutions. Gaussian elimination with back-substitution stops at an REF and recovers the solutions by solving from the bottom equation upward. They give identical answers; the choice between them is one of taste and circumstance.

Example 1.44 (Gauss–Jordan). Consider

$$
\begin{cases} 3x_1 - 7x_2 + 2x_3 = 4 \\ 2x_1 - 4x_2 + x_3 = 1. \end{cases}
$$

Reduce the augmented matrix:

$$
\left[\begin{array}{ccc|c} 3 & -7 & 2 & 4 \\ 2 & -4 & 1 & 1 \end{array}\right] \xrightarrow{E_{12}(-1)} \left[\begin{array}{ccc|c} 1 & -3 & 1 & 3 \\ 2 & -4 & 1 & 1 \end{array}\right] \xrightarrow{E_{21}(-2)} \left[\begin{array}{ccc|c} 1 & -3 & 1 & 3 \\ 0 & 2 & -1 & -5 \end{array}\right]
$$

$$
\xrightarrow{E_{2}(1/2)} \left[\begin{array}{ccc|c} 1 & -3 & 1 & 3 \\ 0 & 1 & -\tfrac12 & -\tfrac52 \end{array}\right] \xrightarrow{E_{12}(3)} \left[\begin{array}{ccc|c} 1 & 0 & -\tfrac12 & -\tfrac92 \\ 0 & 1 & -\tfrac12 & -\tfrac52 \end{array}\right].
$$

(The opening move $E_{12}(-1)$, subtracting the second row from the first, is a small artifice to produce a leading $1$ without introducing fractions prematurely.) The final matrix is in RREF, and translating back into equations,

$$
x_1 = \tfrac12 x_3 - \tfrac92, \qquad x_2 = \tfrac12 x_3 - \tfrac52.
$$

The unknowns $x_1, x_2$, sitting over leading 1's, are leading variables; $x_3$, whose column carries no leading 1, is a free variable. Assigning it a parameter, $x_3 = t$, the general solution is

$$
\begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = t\begin{bmatrix} \tfrac12 \\ \tfrac12 \\ 1 \end{bmatrix} + \begin{bmatrix} -\tfrac92 \\ -\tfrac52 \\ 0 \end{bmatrix}, \qquad t \in \mathbb{R},
$$

a line in $\mathbb{R}^3$, hence infinitely many solutions. It is prudent to verify: substituting into the first equation, $3(\tfrac12 t - \tfrac92) - 7(\tfrac12 t - \tfrac52) + 2t = (\tfrac32 - \tfrac72 + 2)t - \tfrac{27}{2} + \tfrac{35}{2} = 0\cdot t + 4 = 4$; into the second, $2(\tfrac12 t - \tfrac92) - 4(\tfrac12 t - \tfrac52) + t = (1 - 2 + 1)t - 9 + 10 = 1$. Both hold for every $t$, as they must.

Example 1.45 (Gaussian elimination with back-substitution). For the same system, stop at the REF obtained after $E_2(1/2)$:

$$
x_1 - 3x_2 + x_3 = 3, \qquad x_2 - \tfrac12 x_3 = -\tfrac52.
$$

From the second equation, with $x_3 = t$: $x_2 = \tfrac12 t - \tfrac52$. Substituting upward into the first: $x_1 = 3x_2 - x_3 + 3 = \tfrac32 t - \tfrac{15}{2} - t + 3 = \tfrac12 t - \tfrac92$. The same solution set, as promised.

Example 1.46 (an inconsistent system). For

$$
\begin{cases} 3x_1 + 4x_2 - 2x_3 = 4 \\ 2x_1 + 3x_2 + 2x_3 = 1 \\ 4x_1 + 5x_2 - 6x_3 = 8, \end{cases}
$$

elimination proceeds

$$
\left[\begin{array}{ccc|c} 3 & 4 & -2 & 4 \\ 2 & 3 & 2 & 1 \\ 4 & 5 & -6 & 8 \end{array}\right] \xrightarrow{E_{12}(-1)} \left[\begin{array}{ccc|c} 1 & 1 & -4 & 3 \\ 2 & 3 & 2 & 1 \\ 4 & 5 & -6 & 8 \end{array}\right] \xrightarrow[E_{31}(-4)]{E_{21}(-2)} \left[\begin{array}{ccc|c} 1 & 1 & -4 & 3 \\ 0 & 1 & 10 & -5 \\ 0 & 1 & 10 & -4 \end{array}\right] \xrightarrow{E_{32}(-1)} \left[\begin{array}{ccc|c} 1 & 1 & -4 & 3 \\ 0 & 1 & 10 & -5 \\ 0 & 0 & 0 & 1 \end{array}\right].
$$

The last row asserts $0x_1 + 0x_2 + 0x_3 = 1$, an impossibility; the system is inconsistent. The general diagnostic is worth stating: the appearance, at any stage of elimination, of a row of the form $[\,0 \ \cdots \ 0 \mid c\,]$ with $c \neq 0$ certifies that the system has no solution.

### 9.6 Counting free variables

Theorem 1.42 (Free Variable Theorem for homogeneous systems). If a homogeneous linear system has $n$ unknowns, and the reduced row echelon form of its augmented matrix has $r$ nonzero rows, then the system has $n - r$ free variables.

The argument is bookkeeping of the right kind. Each nonzero row of the RREF carries exactly one leading 1, and each leading 1 designates one leading variable; hence $r$ leading variables, and the remaining $n - r$ unknowns are free. Writing out the equations of the RREF,

$$
x_{k_1} + \textstyle\sum(\cdot) = 0,\quad x_{k_2} + \textstyle\sum(\cdot) = 0,\quad \dots,\quad x_{k_r} + \textstyle\sum(\cdot) = 0,
$$

where each $\sum(\cdot)$ involves only free variables, one sees that the leading variables are completely determined by the free ones, while the free ones may take arbitrary real values.

Theorem 1.43. A homogeneous linear system with more unknowns than equations has infinitely many solutions.

For if there are $m$ equations in $n > m$ unknowns, the number $r$ of nonzero rows in the RREF cannot exceed the number of rows available: $r \leq m < n$, whence $n - r > 0$ and at least one free variable exists. A free variable ranging over $\mathbb{R}$ produces a solution for each of its values, and, homogeneity guaranteeing consistency, these are infinitely many genuine solutions.

The hypothesis of homogeneity is essential and is a favorite trap in examinations. A non-homogeneous system with more unknowns than equations may perfectly well be inconsistent: the pair $x + y + z = 1$, $x + y + z = 2$ has three unknowns, two equations, and no solutions at all. What Theorem 1.43 exploits is that a homogeneous system starts with consistency for free.

### 9.7 The trichotomy, and square matrices

Theorem 1.47. If $R$ is the reduced row echelon form of an $n \times n$ matrix, then either $R = I_n$ or $R$ has a row of zeros.

Suppose $R$ has no zero row. Then each of its $n$ rows contains a leading 1; by condition (iii) the leading 1's march strictly rightward down the rows, and with only $n$ columns to accommodate $n$ of them, they are forced onto the diagonal positions $(1,1), (2,2), \dots, (n,n)$. Condition (iv) then clears every other entry of those columns, that is, of all columns, and $R = I_n$.

Theorem 1.50. A system of linear equations has zero, one, or infinitely many solutions; there are no other possibilities.

The proof was sketched in §8.2: two distinct solutions generate a one-parameter family of solutions, so any plurality is infinite. The theorem elevates the geometric observations about lines and planes into a fact about linear systems of every size.

## 10. The Theory of Invertible Matrices, Completed

### 10.1 Four characterizations

Theorem 1.48. For $A \in \mathrm{Mat}_n(\mathbb{R})$, the following are equivalent:

1. $A$ is invertible;
2. $A\vec{x} = \vec{0}$ has only the trivial solution;
3. the reduced row echelon form of $A$ is $I_n$;
4. $A$ is expressible as a product of elementary matrices.

The equivalences are established cyclically, and each implication is instructive. (1)$\Rightarrow$(2): multiply $A\vec{x} = \vec{0}$ on the left by $A^{-1}$ to obtain $\vec{x} = \vec{0}$. (2)$\Rightarrow$(3): a unique solution means no free variables, so by Theorem 1.42 the RREF of $A$ has $n$ nonzero rows, and Theorem 1.47 forces the RREF to be $I_n$. (3)$\Rightarrow$(4): from $E_s \cdots E_1 A = I_n$ one solves $A = E_1^{-1} \cdots E_s^{-1}$, a product of elementary matrices since inverses of elementary matrices are elementary (Theorem 1.36). (4)$\Rightarrow$(1): elementary matrices are invertible and products of invertible matrices are invertible.

### 10.2 The inversion algorithm

Characterization (3) hands us an algorithm. If $A$ is invertible, there are elementary matrices with $E_s \cdots E_1 A = I_n$, and then

$$
A^{-1} = E_s \cdots E_1 = E_s \cdots E_1 \, I_n.
$$

Read the right-hand side as a set of instructions: the same sequence of row operations that reduces $A$ to $I$ transforms $I$ into $A^{-1}$. To execute both transformations simultaneously, adjoin $I$ to $A$ and row-reduce the combined array:

$$
[\,A \mid I\,] \longrightarrow [\,I \mid A^{-1}\,].
$$

If instead the left block develops a row of zeros, so that its RREF cannot be $I_n$, then by Theorem 1.48 the matrix $A$ is singular, and the algorithm reports this fact rather than an inverse. The procedure thus decides invertibility and computes the inverse in a single pass.

Example 1.49. For

$$
A = \begin{bmatrix} 1 & 0 & 1 \\ 1 & 1 & 3 \\ 2 & 5 & 13 \end{bmatrix}:
$$

$$
\left[\begin{array}{ccc|ccc} 1 & 0 & 1 & 1 & 0 & 0 \\ 1 & 1 & 3 & 0 & 1 & 0 \\ 2 & 5 & 13 & 0 & 0 & 1 \end{array}\right] \xrightarrow[E_{31}(-2)]{E_{21}(-1)} \left[\begin{array}{ccc|ccc} 1 & 0 & 1 & 1 & 0 & 0 \\ 0 & 1 & 2 & -1 & 1 & 0 \\ 0 & 5 & 11 & -2 & 0 & 1 \end{array}\right] \xrightarrow{E_{32}(-5)} \left[\begin{array}{ccc|ccc} 1 & 0 & 1 & 1 & 0 & 0 \\ 0 & 1 & 2 & -1 & 1 & 0 \\ 0 & 0 & 1 & 3 & -5 & 1 \end{array}\right]
$$

$$
\xrightarrow[E_{13}(-1)]{E_{23}(-2)} \left[\begin{array}{ccc|ccc} 1 & 0 & 0 & -2 & 5 & -1 \\ 0 & 1 & 0 & -7 & 11 & -2 \\ 0 & 0 & 1 & 3 & -5 & 1 \end{array}\right], \qquad\text{so}\qquad A^{-1} = \begin{bmatrix} -2 & 5 & -1 \\ -7 & 11 & -2 \\ 3 & -5 & 1 \end{bmatrix}.
$$

A computation of this length should never be trusted unverified. Multiplying back: the first row of $A$ against the columns of the candidate inverse gives $(-2 + 0 + 3,\ 5 + 0 - 5,\ -1 + 0 + 1) = (1, 0, 0)$; the second row gives $(-2 - 7 + 9,\ 5 + 11 - 15,\ -1 - 2 + 3) = (0, 1, 0)$; the third gives $(-4 - 35 + 39,\ 10 + 55 - 65,\ -2 - 10 + 13) = (0, 0, 1)$. Thus $AA^{-1} = I_3$, and the answer stands. That checking one product suffices, rather than both $AA^{-1}$ and $A^{-1}A$, is justified by Theorem 1.52 below.

### 10.3 Consequences for linear systems

Theorem 1.51. If $A$ is invertible, then for every $n \times 1$ vector $\vec{b}$ the system $A\vec{x} = \vec{b}$ has exactly one solution, namely $\vec{x} = A^{-1}\vec{b}$.

Existence: $A(A^{-1}\vec{b}) = (AA^{-1})\vec{b} = \vec{b}$. Uniqueness: any solution $\vec{x}_0$ satisfies $A\vec{x}_0 = \vec{b}$, and left-multiplication by $A^{-1}$ yields $\vec{x}_0 = A^{-1}\vec{b}$. The structure is identical to the scalar case $ax = b$, $x = a^{-1}b$, which is, of course, the entire reason the inverse was defined as it was.

Theorem 1.52. Let $A \in \mathrm{Mat}_n(\mathbb{R})$. If there exists $B$ with $BA = I$, then $A$ is invertible and $B = A^{-1}$; likewise if there exists $B$ with $AB = I$.

The definition of invertibility demanded a two-sided inverse. For square matrices, this theorem discharges half the burden: a one-sided inverse is automatically two-sided. The result is genuinely a theorem; it fails for non-square matrices, and its proof routes through the machinery of this chapter rather than through formal manipulation. It is also of daily practical value, since it halves the work of every verification.

Theorem 1.53. If $AB$ is invertible, then $A$ and $B$ are both invertible.

Combined with Theorem 1.19, this yields a clean equivalence for square matrices: $AB$ is invertible if and only if both factors are.

### 10.4 The equivalence theorem

Theorem 1.54. For $A \in \mathrm{Mat}_n(\mathbb{R})$, the following are equivalent:

1. $A$ is invertible;
2. $A\vec{x} = \vec{0}$ has only the trivial solution;
3. the reduced row echelon form of $A$ is $I_n$;
4. $A$ is expressible as a product of elementary matrices;
5. $A\vec{x} = \vec{b}$ has exactly one solution for every $n \times 1$ vector $\vec{b}$;
6. $A\vec{x} = \vec{b}$ is consistent for every $n \times 1$ vector $\vec{b}$.

Statements (1)–(4) are Theorem 1.48; (1)$\Rightarrow$(5) is Theorem 1.51; (5)$\Rightarrow$(6) is trivial. The cycle closes with (6)$\Rightarrow$(1), whose proof is the most elegant argument in the chapter and merits full display.

Proof that (6) implies (1). Let $\vec{e}_k$ denote the $k$-th standard basis vector of $\mathbb{R}^n$, the column with $1$ in position $k$ and $0$ elsewhere. By hypothesis, each of the $n$ systems $A\vec{x} = \vec{e}_k$ is consistent; choose a solution $\vec{x}_k$ of each, and assemble the solutions as the columns of a matrix $B = [\vec{x}_1 \mid \vec{x}_2 \mid \cdots \mid \vec{x}_n]$. Computing the product column by column (Remark 1.13),

$$
AB = [\,A\vec{x}_1 \mid A\vec{x}_2 \mid \cdots \mid A\vec{x}_n\,] = [\,\vec{e}_1 \mid \vec{e}_2 \mid \cdots \mid \vec{e}_n\,] = I_n.
$$

By Theorem 1.52, $A$ is invertible with $A^{-1} = B$. $\square$

Notice what the proof accomplishes: mere consistency, the weakest imaginable hypothesis about the systems $A\vec{x} = \vec{b}$, is parlayed into full invertibility, and the partitioned view of multiplication from §3.3, which may have seemed a bookkeeping remark when first stated, turns out to be exactly the tool required.

Theorem 1.54 is less a single result than a growing organism. In the chapter on determinants it acquires the further equivalent condition $\det A \neq 0$; in the chapters on vector spaces, conditions about the rank of $A$, the independence of its columns, and the injectivity and surjectivity of the associated transformation join the list. A working knowledge of linear algebra consists, to a considerable degree, in the ability to move fluently among these equivalent conditions, choosing whichever formulation makes a given problem transparent.

## 11. Retrospect

The chapter, viewed whole, executes a single strategy. A linear system is compressed into the equation $A\vec{x} = \vec{b}$ and further into the augmented matrix $[\,A \mid \vec{b}\,]$; the three elementary row operations, being reversible, transform this matrix without disturbing its solution set (Theorem 1.41); carried to completion, they produce the unique reduced row echelon form, from which the solutions (none, one, or a parametrized infinity of them) can be read off directly. The algebraization of row operations as left-multiplication by elementary matrices (Theorem 1.34) converts this algorithm into theory: it yields the inversion algorithm $[\,A \mid I\,] \to [\,I \mid A^{-1}\,]$, and it culminates in the equivalence theorem, which identifies invertibility of a square matrix with the unique solvability, indeed with the bare solvability, of all the systems it governs.

A reader who can reconstruct, without notes, the counterexample to commutativity, the reversal laws for $(AB)^T$ and $(AB)^{-1}$, the proof that inverses are unique, the reason a row $[\,0 \cdots 0 \mid c\,]$, $c \neq 0$, kills a system, the counting argument behind the free variable theorem, and the column-by-column proof that consistency for all right-hand sides implies invertibility, has not merely covered the chapter but owns it. The determinant, waiting in the next chapter, will add a seventh face to Theorem 1.54 and give the phrase "$ad - bc \neq 0$" its proper generalization.
