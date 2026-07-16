---
title: 'Determinants: An Expository Account of Chapter 2'
excerpt: 'The cofactor definition, Laplace expansion, the row-operation calculus, the multiplicative law, and the classical formulas of the adjugate and Cramer.'
date: '2026-07-17'
category: study
subcategory: mathematics
keywords: ['linear algebra', 'determinants', 'cofactor expansion', "Cramer's rule"]
---

Based on Anton & Rorres, "Elementary Linear Algebra with Supplemental Applications" (12th ed.), and Larson, "Elementary Linear Algebra" (8th ed., metric version). A continuation of the essay on Chapter 1, whose notation and results are used freely.

Chapter 1 ended with an equivalence theorem: for a square matrix $A$, invertibility, the unique solvability of every system $A\vec{x} = \vec{b}$, the reduction of $A$ to the identity, all one and the same property. What the theorem did not provide is a formula: a quantity, computable from the entries of $A$, whose value announces on which side of the divide $A$ falls. For $2 \times 2$ matrices such a quantity appeared in passing, the expression $ad - bc$, whose non-vanishing characterized invertibility. The determinant is the generalization of $ad - bc$ to all orders, and this chapter develops it from scratch: its recursive definition by cofactors, the Laplace expansion theorem that makes the definition usable, the behavior of determinants under row operations (which converts their computation from a combinatorial nightmare into routine elimination), the multiplicative law $\det(AB) = \det(A)\det(B)$, and finally two classical applications, the adjugate formula for the inverse and Cramer's rule for solving systems. As before, I have tried to prove what can be proved at this level, to verify every computation more than once, and to say plainly which methods one should actually use in practice and which exist chiefly for the sake of theory.

## 1. The Definition

### 1.1 An inductive construction

The determinant is a function

$$
\det : \mathrm{Mat}_n(\mathbb{R}) \longrightarrow \mathbb{R}, \qquad A \mapsto \det(A),
$$

assigning a single real number to each square matrix. Alternative notations abound: $\det(A) = |A|$, and when the entries are displayed one writes vertical bars in place of brackets,

$$
\det(A) = \begin{vmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & & \vdots \\ a_{n1} & \cdots & a_{nn} \end{vmatrix}.
$$

(The bars carry no connotation of absolute value; determinants are frequently negative, and the sign will turn out to carry information.)

The definition proceeds by induction on the order $n$. For the base cases,

$$
\det[a_{11}] = a_{11}, \qquad \det\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix} = a_{11}a_{22} - a_{12}a_{21}.
$$

The $2 \times 2$ formula is exactly the quantity $ad - bc$ from Chapter 1: product of the main diagonal minus product of the anti-diagonal.

For the inductive step, suppose $n \geq 2$ and determinants of all $(n-1)\times(n-1)$ matrices have been defined. Two auxiliary quantities are attached to each entry of $A = [a_{ij}] \in \mathrm{Mat}_n(\mathbb{R})$:

Definition (minor and cofactor). Let $A_{ij}$ denote the $(n-1)\times(n-1)$ submatrix obtained from $A$ by deleting the $i$-th row and the $j$-th column. Then

$$
M_{ij} := \det(A_{ij})
$$

is the minor of the entry $a_{ij}$, and

$$
C_{ij} := (-1)^{i+j} M_{ij}
$$

is its cofactor. The minor is a determinant one size smaller, hence available by the inductive hypothesis, and the cofactor is the minor decorated with a sign. The sign pattern $(-1)^{i+j}$ is easiest to remember pictorially: it forms a checkerboard beginning with $+$ in the upper-left corner,

$$
\begin{bmatrix} + & - & + & - & \cdots \\ - & + & - & + & \cdots \\ + & - & + & - & \cdots \\ \vdots & & & & \ddots \end{bmatrix}.
$$

With these in hand, the determinant of $A$ is defined by expansion along the first row:

$$
\det(A) := a_{11}C_{11} + a_{12}C_{12} + \cdots + a_{1n}C_{1n}.
$$

Each first-row entry is multiplied by its cofactor, and the products are summed. Since each cofactor is (up to sign) a determinant of order $n-1$, the recursion bottoms out, after $n-2$ layers, in $2 \times 2$ determinants.

Two sanity checks on the definition. First, it is consistent with the base case: for a $2\times 2$ matrix, expansion along the first row gives (Remark 2.1)

$$
\det(A) = a_{11}C_{11} + a_{12}C_{12} = a_{11}(-1)^{1+1}\det[a_{22}] + a_{12}(-1)^{1+2}\det[a_{21}] = a_{11}a_{22} - a_{12}a_{21},
$$

as it should. Second, the $3 \times 3$ case, worked in full (Example 2.2): with $A = [a_{ij}] \in \mathrm{Mat}_3(\mathbb{R})$,

$$
C_{11} = +\begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} = a_{22}a_{33} - a_{23}a_{32}, \qquad C_{12} = -\begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} = -(a_{21}a_{33} - a_{23}a_{31}),
$$

$$
C_{13} = +\begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix} = a_{21}a_{32} - a_{22}a_{31},
$$

whence

$$
\det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31}).
$$

Multiplied out, this is a sum of six signed products,

$$
a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} \;-\; a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33},
$$

which admits the well-known mnemonic of Sarrus' rule: copy the first two columns to the right of the matrix, take the three "southeast" diagonal products with a plus sign and the three "southwest" diagonal products with a minus sign. A warning that cannot be repeated too often: Sarrus' rule is a $3 \times 3$ accident. It does not generalize; a $4 \times 4$ determinant is a signed sum of $24$ products, not $8$, and the diagonal picture simply fails to produce them. For orders four and above, only cofactor expansion and (better) row reduction are available.

It is also worth registering, from the start, how quickly brute-force expansion grows. Expanding an $n \times n$ determinant by cofactors, without exploiting any zeros, requires on the order of $n!$ multiplications, about $3.6$ million for $n = 10$. The definition is thus a definition, not an algorithm; the practical algorithm arrives in §3.

### 1.2 A first computation

Example 2.3. Compute the determinant of

$$
A = \begin{bmatrix} 3 & 1 & 0 \\ -2 & -4 & 3 \\ 5 & 4 & -2 \end{bmatrix}.
$$

Expanding along the first row (and gratefully noting the zero in position $(1,3)$, which kills one of the three terms):

$$
\det(A) = 3\begin{vmatrix} -4 & 3 \\ 4 & -2 \end{vmatrix} - 1\begin{vmatrix} -2 & 3 \\ 5 & -2 \end{vmatrix} + 0 = 3(8 - 12) - (4 - 15) = 3(-4) - (-11) = -12 + 11 = -1.
$$

Since the whole chapter turns on such computations, let us verify by an independent route: expansion along the third column, an option legitimized by the Laplace theorem of the next section. The third column has entries $0, 3, -2$, with cofactors

$$
C_{23} = (-1)^{2+3}\begin{vmatrix} 3 & 1 \\ 5 & 4 \end{vmatrix} = -(12 - 5) = -7, \qquad C_{33} = (-1)^{3+3}\begin{vmatrix} 3 & 1 \\ -2 & -4 \end{vmatrix} = -12 + 2 = -10,
$$

so that $\det(A) = 0 \cdot C_{13} + 3(-7) + (-2)(-10) = -21 + 20 = -1$. The two expansions agree, as the theory promises they must.

## 2. The Laplace Expansion Theorem

### 2.1 Any row, any column

The definition privileges the first row, which is aesthetically unsatisfying and computationally restrictive: one would like to expand along whichever row or column contains the most zeros. The chapter's first substantial theorem grants exactly this freedom. The route to it passes through a lemma.

Lemma 2.4. Let $A = [a_{ij}] \in \mathrm{Mat}_n(\mathbb{R})$.

1. The expansion along the first row equals the expansion along the first column:
   $$
   \det(A) = a_{11}C_{11} + a_{12}C_{12} + \cdots + a_{1n}C_{1n} = a_{11}C_{11} + a_{21}C_{21} + \cdots + a_{n1}C_{n1}.
   $$
2. If $B$ is obtained from $A$ by interchanging two rows (or two columns), that is, $B = E_{ij}A$ for some $i \neq j$, then $\det(B) = -\det(A)$.

Both parts are proved by induction on $n$, the base case $n = 2$ being a direct check (interchanging the rows of a $2\times 2$ matrix visibly negates $ad - bc$). Part (2) is the alternating property of the determinant, and it is the engine of everything that follows: a single swap of rows flips the sign.

Theorem 2.5 (Laplace; cofactor expansion). For $A = [a_{ij}] \in \mathrm{Mat}_n(\mathbb{R})$ and any fixed $i, j \in \{1, \dots, n\}$:

$$
\det(A) = a_{i1}C_{i1} + a_{i2}C_{i2} + \cdots + a_{in}C_{in} \qquad \text{(expansion along the $i$-th row)},
$$

$$
\det(A) = a_{1j}C_{1j} + a_{2j}C_{2j} + \cdots + a_{nj}C_{nj} \qquad \text{(expansion along the $j$-th column)}.
$$

Proof. Fix $i$, and let $B$ be the matrix obtained by moving the $i$-th row of $A$ to the top by means of $i - 1$ interchanges of adjacent rows: first swapping rows $i-1$ and $i$, then rows $i-2$ and $i-1$, and so on; in the notation of elementary matrices, $B = E_{12}\cdots E_{i-2,i-1}E_{i-1,i}\,A$. Adjacent swaps are used deliberately: they slide the $i$-th row upward without disturbing the relative order of the other rows. Consequently the first row of $B$ is the old $i$-th row of $A$ ($b_{1k} = a_{ik}$), and (this is the crucial bookkeeping) deleting the first row and $k$-th column of $B$ leaves exactly the same submatrix as deleting the $i$-th row and $k$-th column of $A$, so $B_{1k} = A_{ik}$.

By Lemma 2.4(2), each interchange negates the determinant, so $\det(B) = (-1)^{i-1}\det(A)$, i.e. $\det(A) = (-1)^{i-1}\det(B)$. Expanding $\det(B)$ along its first row (which is legitimate, being the definition),

$$
\det(A) = (-1)^{i-1}\sum_{k=1}^{n} b_{1k}(-1)^{1+k}\det(B_{1k}) = \sum_{k=1}^{n} a_{ik}\,(-1)^{i-1}(-1)^{1+k}\det(A_{ik}) = \sum_{k=1}^{n} a_{ik}(-1)^{i+k}\det(A_{ik}) = \sum_{k=1}^{n} a_{ik}C_{ik},
$$

where the signs combine as $(-1)^{i-1}(-1)^{1+k} = (-1)^{i+k}$. This proves the row expansions; the column expansions follow by the same argument applied to columns, using Lemma 2.4(1) to get started and the column version of Lemma 2.4(2) for the interchanges. $\square$

The theorem converts the checkerboard of signs from a definition into a genuine degree of freedom. The practical maxim it licenses: before expanding, scan the matrix for the row or column richest in zeros, and expand along that. Every zero entry deletes an entire branch of the recursion.

### 2.2 Transpose invariance

Theorem 2.6. For every $A \in \mathrm{Mat}_n(\mathbb{R})$, $\det(A^T) = \det(A)$.

One can see this as a corollary of the Laplace theorem's symmetry between rows and columns: expanding $A^T$ along its first row is the same computation as expanding $A$ along its first column, and induction does the rest. The consequence deserves emphasis because it silently doubles every theorem in the chapter: any statement about the behavior of determinants under row operations holds verbatim for column operations. Rows enjoy no privilege that columns lack, a symmetry emphatically false for the elimination theory of Chapter 1, where row operations preserved solution sets and column operations did not.

### 2.3 A larger example, done by expansion

Example 2.7. Compute the determinant of

$$
A = \begin{bmatrix} 2 & 3 & 5 & 1 \\ 3 & 0 & 1 & -1 \\ 1 & 2 & 0 & 0 \\ 4 & 0 & 3 & 2 \end{bmatrix}.
$$

Scanning for zeros: the second column contains two ($a_{22} = a_{42} = 0$), as does the third row ($a_{33} = a_{34} = 0$). Either is a good launch point; take the second column. Its surviving entries are $a_{12} = 3$ and $a_{32} = 2$, so

$$
\det(A) = 3\,C_{12} + 2\,C_{32} = -3\,M_{12} - 2\,M_{32},
$$

the signs coming from $(-1)^{1+2} = -1$ and $(-1)^{3+2} = -1$. The two minors are $3 \times 3$ determinants:

$$
M_{12} = \begin{vmatrix} 3 & 1 & -1 \\ 1 & 0 & 0 \\ 4 & 3 & 2 \end{vmatrix} \qquad\text{(delete row 1, column 2)}.
$$

Its second row has a lone nonzero entry, so expand there: $M_{12} = 1 \cdot (-1)^{2+1}\begin{vmatrix} 1 & -1 \\ 3 & 2 \end{vmatrix} = -(2 + 3) = -5$.

$$
M_{32} = \begin{vmatrix} 2 & 5 & 1 \\ 3 & 1 & -1 \\ 4 & 3 & 2 \end{vmatrix} = 2(2 + 3) - 5(6 + 4) + 1(9 - 4) = 10 - 50 + 5 = -35,
$$

by first-row expansion. Therefore

$$
\det(A) = -3(-5) - 2(-35) = 15 + 70 = 85.
$$

As a check, expand instead along the third row of $A$, whose entries are $1, 2, 0, 0$:

$$
C_{31} = +\begin{vmatrix} 3 & 5 & 1 \\ 0 & 1 & -1 \\ 0 & 3 & 2 \end{vmatrix} = 3(2 + 3) = 15, \qquad C_{32} = -M_{32} = 35,
$$

giving $\det(A) = 1 \cdot 15 + 2 \cdot 35 = 85$ again. (We will compute this same determinant a third way, by row reduction, in §3.4; the theory is only as trustworthy as one's arithmetic, and a $4 \times 4$ determinant is exactly the size at which arithmetic begins to deserve suspicion.)

### 2.4 Triangular matrices

Theorem 2.8. If $A \in \mathrm{Mat}_n(\mathbb{R})$ is triangular, upper or lower, then $\det(A)$ is the product of its diagonal entries:

$$
\det(A) = a_{11}a_{22}\cdots a_{nn}.
$$

In particular $\det(I_n) = 1$.

The proof is the pleasantest possible induction. For an upper triangular $A$, expand along the first column, all of whose entries below $a_{11}$ vanish: $\det(A) = a_{11}\det(A_{11})$, and $A_{11}$ is again upper triangular with diagonal $a_{22}, \dots, a_{nn}$. (For lower triangular matrices, expand along the first row instead, or simply transpose and invoke Theorem 2.6.) Diagonal matrices, being both upper and lower triangular, are covered as a special case.

This humble theorem is the key to efficient computation. Row echelon forms of square matrices are upper triangular; if elimination can carry $A$ to triangular shape while we keep track of how each step scales the determinant, then the determinant of $A$ is the (adjusted) product of the resulting diagonal. Making that bookkeeping precise is the business of the next section.

## 3. Determinants and Row Operations

### 3.1 Linearity in a single row

Theorem 2.9. Suppose the $i$-th row of $A$ decomposes entrywise as a sum, $(p_1 + q_1, \dots, p_n + q_n)$. Then

$$
\begin{vmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & & \vdots \\ p_1 + q_1 & \cdots & p_n + q_n \\ \vdots & & \vdots \\ a_{n1} & \cdots & a_{nn} \end{vmatrix}
=
\begin{vmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & & \vdots \\ p_1 & \cdots & p_n \\ \vdots & & \vdots \\ a_{n1} & \cdots & a_{nn} \end{vmatrix} + \begin{vmatrix} a_{11} & \cdots & a_{1n} \\ \vdots & & \vdots \\ q_1 & \cdots & q_n \\ \vdots & & \vdots \\ a_{n1} & \cdots & a_{nn} \end{vmatrix},
$$

all rows other than the $i$-th being identical across the three matrices.

The proof is immediate from Laplace expansion along the $i$-th row: the cofactors $C_{ik}$ do not involve the $i$-th row at all, so

$$
\sum_k (p_k + q_k)C_{ik} = \sum_k p_k C_{ik} + \sum_k q_k C_{ik}.
$$

One must read the theorem with care, for it invites a seductive misreading: it does not say $\det(A + B) = \det(A) + \det(B)$. That equation is false for essentially all pairs of matrices; already $\det(I_2 + I_2) = \det(2I_2) = 4 \neq 2 = \det(I_2) + \det(I_2)$. The determinant is additive in each row separately, with the other rows frozen; combined with the scaling property below, this is summarized by saying the determinant is multilinear in the rows. Multilinearity, together with the alternating property of Lemma 2.4(2) and the normalization $\det(I) = 1$, in fact characterizes the determinant uniquely, a viewpoint developed in more advanced treatments, but worth knowing exists.

### 3.2 The effect of each elementary operation

Theorem 2.10. For any $A \in \mathrm{Mat}_n(\mathbb{R})$:

1. $\det(E_{ij}A) = -\det(A)$: interchanging two rows negates the determinant;
2. $\det(E_i(k)A) = k\det(A)$: scaling a row by $k$ scales the determinant by $k$;
3. $\det(E_{ij}(k)A) = \det(A)$: adding a multiple of one row to another leaves the determinant unchanged.

Moreover:

(1-1) if two rows of $A$ are equal, then $\det(A) = 0$; (2-1) if one row of $A$ is a scalar multiple of another, then $\det(A) = 0$; (2-2) for any $k \in \mathbb{R}$, $\det(kA) = k^n \det(A)$.

The proofs interlock elegantly, and their order of deduction is instructive. Property (1) is Lemma 2.4(2). For (1-1): if rows $i$ and $j$ of $A$ are equal, interchanging them changes nothing (the matrix is the same matrix), yet by (1) the determinant is negated; hence $\det(A) = -\det(A)$, forcing $\det(A) = 0$. Property (2) follows from Laplace expansion along the scaled row: every term acquires the factor $k$. Then (2-1) combines (2) and (1-1): factoring the scalar out of the offending row leaves a matrix with two equal rows. Property (3) is where Theorem 2.9 earns its keep. Adding $k$ times row $j$ to row $i$ produces a matrix whose $i$-th row is a sum; by row-additivity its determinant splits into $\det(A)$ plus the determinant of a matrix whose $i$-th row is $k$ times its $j$-th row, and the latter vanishes by (2-1). Finally (2-2) is $n$ applications of (2), one per row: multiplying the entire matrix by $k$ scales each of the $n$ rows, and the factors accumulate to $k^n$.

Property (2-2) is a reliable generator of examination errors. For a $3 \times 3$ matrix $A$ with $\det(A) = 5$, the determinant of $2A$ is not $10$ but $2^3 \cdot 5 = 40$. The exponent is forced by multilinearity (the determinant sees a matrix one row at a time), and, as we will see in §6, it is also what dimensional analysis demands of a signed volume.

By transpose invariance (Theorem 2.6), every statement above holds with "row" replaced by "column."

### 3.3 The practical algorithm

Taken together, Theorems 2.8 and 2.10 yield the standard method: reduce $A$ toward triangular form by row operations, recording the effect of each step; then multiply the diagonal. Interchanges contribute factors of $-1$; scalings contribute their scalar (so that factoring $k$ out of a row multiplies the running external factor by $k$); the workhorse replacement operations $E_{ij}(k)$ cost nothing at all. Since elimination reaches triangular form in on the order of $n^3$ arithmetic operations, versus the $n!$ of raw cofactor expansion, this is not a marginal improvement but the difference between the feasible and the impossible. In practice one uses a hybrid: a few row or column operations to manufacture zeros, then a cofactor expansion along the newly cleaned line.

Example 2.11. Evaluate by row reduction:

$$
A = \begin{bmatrix} 3 & 1 & 2 \\ 5 & 4 & -3 \\ -2 & -4 & 2 \end{bmatrix}.
$$

Add row 3 to row 1 (operation $E_{13}(1)$; determinant unchanged) to create a leading $1$:

$$
\det(A) = \begin{vmatrix} 1 & -3 & 4 \\ 5 & 4 & -3 \\ -2 & -4 & 2 \end{vmatrix}.
$$

Clear the first column with $E_{21}(-5)$ and $E_{31}(2)$ (determinant unchanged):

$$
= \begin{vmatrix} 1 & -3 & 4 \\ 0 & 19 & -23 \\ 0 & -10 & 10 \end{vmatrix}.
$$

Factor $10$ out of the third row, i.e. write the row as $10 \cdot (0, -1, 1)$:

$$
= 10\begin{vmatrix} 1 & -3 & 4 \\ 0 & 19 & -23 \\ 0 & -1 & 1 \end{vmatrix}.
$$

Interchange rows 2 and 3 (a factor of $-1$), then add $19$ times the new row 2 to row 3 ($E_{32}(19)$, free):

$$
= -10\begin{vmatrix} 1 & -3 & 4 \\ 0 & -1 & 1 \\ 0 & 19 & -23 \end{vmatrix} = -10\begin{vmatrix} 1 & -3 & 4 \\ 0 & -1 & 1 \\ 0 & 0 & -4 \end{vmatrix} = -10 \cdot \big(1 \cdot (-1) \cdot (-4)\big) = -40.
$$

The triangular endgame multiplies the diagonal, and the external factors $10$ and $-1$ do the rest. Direct cofactor expansion along the first row confirms the value:

$$
\det(A) = 3\begin{vmatrix} 4 & -3 \\ -4 & 2 \end{vmatrix} - 1\begin{vmatrix} 5 & -3 \\ -2 & 2 \end{vmatrix} + 2\begin{vmatrix} 5 & 4 \\ -2 & -4 \end{vmatrix} = 3(8 - 12) - (10 - 6) + 2(-20 + 8) = -12 - 4 - 24 = -40. \checkmark
$$

### 3.4 The $4 \times 4$ example, revisited

Example 2.12. The matrix of Example 2.7 yields to elimination even more gracefully than to pure expansion. Its third row, $(1, 2, 0, 0)$, already begins with a $1$ and ends with two zeros: an ideal pivot row. Interchange rows 1 and 3 (one factor of $-1$):

$$
\det(A) = -\begin{vmatrix} 1 & 2 & 0 & 0 \\ 3 & 0 & 1 & -1 \\ 2 & 3 & 5 & 1 \\ 4 & 0 & 3 & 2 \end{vmatrix}.
$$

Clear the first column with the free operations $E_{21}(-3)$, $E_{31}(-2)$, $E_{41}(-4)$:

$$
\det(A) = -\begin{vmatrix} 1 & 2 & 0 & 0 \\ 0 & -6 & 1 & -1 \\ 0 & -1 & 5 & 1 \\ 0 & -8 & 3 & 2 \end{vmatrix} = -\begin{vmatrix} -6 & 1 & -1 \\ -1 & 5 & 1 \\ -8 & 3 & 2 \end{vmatrix},
$$

the last step being cofactor expansion along the now nearly empty first column. The remaining $3 \times 3$ determinant is a first-row expansion:

$$
\begin{vmatrix} -6 & 1 & -1 \\ -1 & 5 & 1 \\ -8 & 3 & 2 \end{vmatrix} = -6(10 - 3) - 1(-2 + 8) + (-1)(-3 + 40) = -42 - 6 - 37 = -85,
$$

whence $\det(A) = -(-85) = 85$, the third independent confirmation of the value obtained in §2.3. The moral is methodological rather than numerical: operations of type $E_{ij}(k)$ are free, and spending a few of them to hollow out a row or column before expanding is nearly always the cheapest route through a determinant of order four or more.

## 4. The Multiplicative Law

### 4.1 Determinants of elementary matrices

Setting $A = I_n$ in Theorem 2.10 and recalling $\det(I_n) = 1$ gives the determinants of the elementary matrices themselves (Remark 2.13):

$$
\det(E_{ij}) = -1, \qquad \det(E_i(k)) = k, \qquad \det(E_{ij}(k)) = 1.
$$

All three are nonzero, as they must be since elementary matrices are invertible, and comparing with Theorem 2.10 yields a tidy reformulation:

Theorem 2.14. If $A \in \mathrm{Mat}_n(\mathbb{R})$ and $E$ is elementary, then

$$
\det(EA) = \det(E)\det(A).
$$

That is, the three case-by-case rules of Theorem 2.10 are all instances of a single multiplicative statement, so far proved only when the left factor is elementary. The full multiplicative law is within reach, but it is efficient to first harvest the chapter's headline theorem.

### 4.2 The determinant criterion for invertibility

Theorem 2.15. For $A \in \mathrm{Mat}_n(\mathbb{R})$,

$$
A \text{ is invertible} \iff \det(A) \neq 0.
$$

Proof. Let $R$ be the reduced row echelon form of $A$. By Theorem 1.39 there are elementary matrices with $R = E_s \cdots E_1 A$, and repeated application of Theorem 2.14 gives

$$
\det(R) = \det(E_s)\cdots\det(E_1)\det(A),
$$

where every factor $\det(E_i)$ is nonzero. Hence $\det(A) \neq 0$ if and only if $\det(R) \neq 0$. Now invoke the dichotomy of Theorem 1.47: either $R = I_n$, in which case $\det(R) = 1 \neq 0$ and (by the equivalence theorem 1.54) $A$ is invertible; or $R$ has a row of zeros, in which case expansion along that row gives $\det(R) = 0$ and $A$ is singular. The two cases align exactly. $\square$

This is the promised computable criterion, and it is the seventh face of the equivalence theorem: to the six conditions of Theorem 1.54 we may now adjoin

$$
(7) \quad \det(A) \neq 0.
$$

For $2 \times 2$ matrices it recovers the condition $ad - bc \neq 0$ of Example 1.17, now revealed as the smallest case of a general law. Note also the contrapositive gloss on the corollaries of §3.2: a matrix with two equal rows, or proportional rows (or, by transposition, equal or proportional columns), has determinant zero and is therefore singular. One can often see non-invertibility at a glance.

### 4.3 $\det(AB) = \det(A)\det(B)$

Theorem 2.16. For all $A, B \in \mathrm{Mat}_n(\mathbb{R})$,

$$
\det(AB) = \det(A)\det(B).
$$

Proof. Two cases, according to the invertibility of $A$.

Case 1: $A$ is not invertible. Then $AB$ is not invertible either, for if $AB$ were invertible, Theorem 1.53 would force both factors, in particular $A$, to be invertible. By Theorem 2.15 both sides vanish:

$$
\det(AB) = 0 = \det(A)\det(B).
$$

Case 2: $A$ is invertible. By the equivalence theorem, $A$ factors into elementary matrices, $A = E_1E_2\cdots E_s$. Then $AB = E_1E_2\cdots E_sB$, and peeling off the elementary factors one at a time with Theorem 2.14,

$$
\det(AB) = \det(E_1)\det(E_2\cdots E_sB) = \cdots = \det(E_1)\det(E_2)\cdots\det(E_s)\det(B).
$$

Running the same telescoping in reverse on the product $E_1 \cdots E_s$ alone gives $\det(E_1)\cdots\det(E_s) = \det(E_1\cdots E_s) = \det(A)$, and the two displays combine to the claim. $\square$

The proof strategy rewards attention: a statement about all matrices is reduced to a statement about elementary matrices, using the factorization theorem as the bridge. This is the standard dividend of Chapter 1's structure theory, and the same maneuver reappears throughout linear algebra.

The theorem has a striking asymmetry with addition. The determinant utterly fails to respect sums, as noted in §3.1, yet respects products perfectly, and does so even though matrix multiplication is not commutative. Indeed, since $\det(A)\det(B) = \det(B)\det(A)$ as real numbers, the theorem yields the far-from-obvious identity

$$
\det(AB) = \det(BA),
$$

valid even when $AB \neq BA$: the determinant cannot tell the two products apart. (Compare $\operatorname{tr}(AB) = \operatorname{tr}(BA)$, Theorem 1.27: the two basic scalar invariants of a matrix are both blind to the order of multiplication.) In the language that Remark 2.17 gestures toward, $\det$ is a homomorphism from the multiplicative structure of $\mathrm{Mat}_n(\mathbb{R})$ to that of $\mathbb{R}$; restricted to invertible matrices it is a group homomorphism $GL(n,\mathbb{R}) \to \mathbb{R}^\times = \mathbb{R}\setminus\{0\}$, carrying matrix multiplication to ordinary multiplication of nonzero reals. Much of the determinant's usefulness flows from this single algebraic fact.

Theorem 2.18. If $A$ is invertible, then

$$
\det(A^{-1}) = \frac{1}{\det(A)}.
$$

Proof. Apply the multiplicative law to $AA^{-1} = I$: $\det(A)\det(A^{-1}) = \det(I) = 1$, and since $\det(A) \neq 0$ one may divide. $\square$

Notice how the pieces have begun to reinforce one another: Theorem 2.15 guarantees the division is legal, and Theorem 2.16 supplies the equation to divide. The formula also passes the only sanity check available at order two: for $A = \left[\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}\right]$, the inverse produced in Chapter 1 has determinant $\frac{1}{(ad-bc)^2}(da - bc) = \frac{1}{ad - bc}$, as predicted.

## 5. Two Classical Applications

### 5.1 The adjugate and an explicit inverse formula

The inversion algorithm of Chapter 1 computes $A^{-1}$ efficiently but opaquely: it produces the entries of the inverse without exhibiting them as formulas in the entries of $A$. The determinant machinery supplies such formulas.

Definition. For $A = [a_{ij}] \in \mathrm{Mat}_n(\mathbb{R})$, the adjoint (also adjugate, or matrix of cofactors transposed) of $A$ is

$$
\operatorname{adj}(A) = \big[C_{ij}\big]^T = \begin{bmatrix} C_{11} & C_{12} & \cdots & C_{1n} \\ C_{21} & C_{22} & \cdots & C_{2n} \\ \vdots & & & \vdots \\ C_{n1} & C_{n2} & \cdots & C_{nn} \end{bmatrix}^{T}.
$$

Form the matrix whose $(i,j)$ entry is the cofactor $C_{ij}$, then transpose. The transpose is not decorative; forgetting it is the canonical error in this topic, and the proof below shows precisely where it is needed.

Theorem 2.19. For any $A \in \mathrm{Mat}_n(\mathbb{R})$:

1. $A\operatorname{adj}(A) = \operatorname{adj}(A)\,A = \det(A)\,I_n$;
2. if $A$ is invertible, then
   $$
   A^{-1} = \frac{1}{\det(A)}\operatorname{adj}(A).
   $$

Proof of (1). Because of the transpose in the definition, the $(i,j)$ entry of $A\operatorname{adj}(A)$ is the $i$-th row of $A$ paired against the $j$-th row of cofactors:

$$
\big(A\operatorname{adj}(A)\big)_{ij} = a_{i1}C_{j1} + a_{i2}C_{j2} + \cdots + a_{in}C_{jn}.
$$

When $i = j$ this is $a_{i1}C_{i1} + \cdots + a_{in}C_{in}$, which is exactly the Laplace expansion of $\det(A)$ along the $i$-th row: the diagonal entries all equal $\det(A)$.

When $i \neq j$, the sum $a_{i1}C_{j1} + \cdots + a_{in}C_{jn}$ pairs the entries of row $i$ with the cofactors belonging to row $j$. But this mismatched sum is itself a Laplace expansion, namely the expansion along the $j$-th row of the modified matrix $A'$ obtained from $A$ by overwriting its $j$-th row with a copy of its $i$-th row. (The cofactors $C_{j1}, \dots, C_{jn}$ are computed by deleting the $j$-th row, so they cannot see the overwriting and are the same for $A$ and $A'$.) The matrix $A'$ has two equal rows, the $i$-th and the $j$-th, so by Theorem 2.10(1-1) its determinant vanishes:

$$
a_{i1}C_{j1} + \cdots + a_{in}C_{jn} = \det(A') = 0.
$$

Thus $A\operatorname{adj}(A)$ has $\det(A)$ down the diagonal and zeros elsewhere, which is the assertion; the computation for $\operatorname{adj}(A)\,A$ is the same argument run on columns. Part (2) follows by dividing (1) by the nonzero scalar $\det(A)$: the matrix $\frac{1}{\det(A)}\operatorname{adj}(A)$ multiplies $A$ to the identity, and by Theorem 1.52 it is therefore the inverse. $\square$

The identity underlying the off-diagonal case, that an "alien cofactor expansion" pairing a row with the cofactors of a different row always gives zero, is worth isolating in the mind: it is the mechanism that makes the adjugate work, and it is nothing but the equal-rows corollary in disguise.

For $n = 2$ the theorem reproduces an old friend. The cofactors of $\left[\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}\right]$ are $C_{11} = d$, $C_{12} = -c$, $C_{21} = -b$, $C_{22} = a$, so

$$
\operatorname{adj}(A) = \begin{bmatrix} d & -c \\ -b & a \end{bmatrix}^T = \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}, \qquad A^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix},
$$

which is Example 1.17. The mysterious swap-and-negate recipe of Chapter 1 was the $2 \times 2$ adjugate all along.

Example 2.20. Invert

$$
A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 10 \end{bmatrix}.
$$

(One should notice how close this matrix is to being singular: with $10$ replaced by $9$, the rows would satisfy $R_1 + R_3 = 2R_2$ and the determinant would vanish.) First the determinant, by the first row:

$$
\det(A) = 1(50 - 48) - 2(40 - 42) + 3(32 - 35) = 2 + 4 - 9 = -3 \neq 0,
$$

so $A$ is invertible. Now all nine cofactors:

$$
\begin{aligned}
C_{11} &= +\begin{vmatrix} 5 & 6 \\ 8 & 10 \end{vmatrix} = 2, & C_{12} &= -\begin{vmatrix} 4 & 6 \\ 7 & 10 \end{vmatrix} = 2, & C_{13} &= +\begin{vmatrix} 4 & 5 \\ 7 & 8 \end{vmatrix} = -3, \\[4pt]
C_{21} &= -\begin{vmatrix} 2 & 3 \\ 8 & 10 \end{vmatrix} = 4, & C_{22} &= +\begin{vmatrix} 1 & 3 \\ 7 & 10 \end{vmatrix} = -11, & C_{23} &= -\begin{vmatrix} 1 & 2 \\ 7 & 8 \end{vmatrix} = 6, \\[4pt]
C_{31} &= +\begin{vmatrix} 2 & 3 \\ 5 & 6 \end{vmatrix} = -3, & C_{32} &= -\begin{vmatrix} 1 & 3 \\ 4 & 6 \end{vmatrix} = 6, & C_{33} &= +\begin{vmatrix} 1 & 2 \\ 4 & 5 \end{vmatrix} = -3.
\end{aligned}
$$

Transposing the cofactor matrix,

$$
\operatorname{adj}(A) = \begin{bmatrix} 2 & 2 & -3 \\ 4 & -11 & 6 \\ -3 & 6 & -3 \end{bmatrix}^{T} = \begin{bmatrix} 2 & 4 & -3 \\ 2 & -11 & 6 \\ -3 & 6 & -3 \end{bmatrix}, \qquad A^{-1} = -\frac{1}{3}\begin{bmatrix} 2 & 4 & -3 \\ 2 & -11 & 6 \\ -3 & 6 & -3 \end{bmatrix} = \begin{bmatrix} -\tfrac23 & -\tfrac43 & 1 \\[2pt] -\tfrac23 & \tfrac{11}{3} & -2 \\[2pt] 1 & -2 & 1 \end{bmatrix}.
$$

Verification is obligatory, and Theorem 2.19(1) makes it pleasant: it suffices to check $A\operatorname{adj}(A) = -3I$. Row by row: $(1,2,3)$ against the columns of $\operatorname{adj}(A)$ gives $2 + 4 - 9 = -3$, then $4 - 22 + 18 = 0$, then $-3 + 12 - 9 = 0$; the row $(4,5,6)$ gives $8 + 10 - 18 = 0$, $16 - 55 + 36 = -3$, $-12 + 30 - 18 = 0$; the row $(7,8,10)$ gives $14 + 16 - 30 = 0$, $28 - 88 + 60 = 0$, $-21 + 48 - 30 = -3$. The product is $-3I_3$ exactly, and the inverse stands confirmed.

A candid word on method. For a general $n \times n$ matrix, the adjugate formula demands $n^2$ determinants of order $n - 1$ plus one of order $n$; for $n$ beyond $3$ or so this is dramatically more arithmetic than the Gauss–Jordan algorithm $[\,A \mid I\,] \to [\,I \mid A^{-1}\,]$ of Chapter 1. Its value is not computational but structural: it exhibits each entry of $A^{-1}$ as an explicit rational function of the entries of $A$ (a ratio of polynomials, with denominator $\det(A)$), from which one reads off, for instance, that the inverse varies continuously wherever the determinant does not vanish, and that a matrix with integer entries and determinant $\pm 1$ has an inverse with integer entries. Formulas and algorithms serve different masters.

### 5.2 Cramer's rule

The same philosophy, explicit formulas in place of algorithms, applies to the solutions of square systems.

Theorem 2.21 (Cramer's rule). Let $A\vec{x} = \vec{b}$ be a system of $n$ linear equations in $n$ unknowns with $\det(A) \neq 0$. Then the system has a unique solution, given by

$$
x_j = \frac{\det(A_j)}{\det(A)}, \qquad j = 1, 2, \dots, n,
$$

where $A_j$ is the matrix obtained from $A$ by replacing its $j$-th column with the constant vector $\vec{b}$.

Proof. Since $\det(A) \neq 0$, the matrix $A$ is invertible (Theorem 2.15) and the unique solution is $\vec{x} = A^{-1}\vec{b}$ (Theorem 1.51). Substituting the adjugate formula,

$$
\vec{x} = \frac{1}{\det(A)}\operatorname{adj}(A)\,\vec{b},
$$

so the $j$-th unknown is the $j$-th entry of this column:

$$
x_j = \frac{1}{\det(A)}\big(\operatorname{adj}(A)\,\vec{b}\big)_j = \frac{1}{\det(A)}\big(C_{1j}b_1 + C_{2j}b_2 + \cdots + C_{nj}b_n\big),
$$

the coefficients $C_{1j}, \dots, C_{nj}$ appearing because the $j$-th row of $\operatorname{adj}(A)$ is the $j$-th column of the cofactor matrix; the transpose at work once more. It remains to recognize the sum $b_1C_{1j} + \cdots + b_nC_{nj}$. It is a cofactor expansion along the $j$-th column, with the entries $b_k$ in place of the column entries $a_{kj}$; and since the cofactors $C_{kj}$ are computed by deleting the $j$-th column, they are insensitive to what that column contains. The sum is therefore precisely the expansion along the $j$-th column of the matrix $A_j$ whose $j$-th column has been overwritten by $\vec{b}$:

$$
x_j = \frac{\det(A_j)}{\det(A)}. \qquad \square
$$

The proof turns twice on the same observation, that cofactors of a line do not see that line: once to make the adjugate work and once to identify the numerator. It is a small idea with a long reach.

Example 2.22. Solve

$$
\begin{cases} x_1 \phantom{{}+ 4x_2} + 2x_3 = 6 \\ -3x_1 + 4x_2 + 6x_3 = 30 \\ -x_1 - 2x_2 + 3x_3 = 8. \end{cases}
$$

The coefficient matrix and the three column-replaced matrices are

$$
A = \begin{bmatrix} 1 & 0 & 2 \\ -3 & 4 & 6 \\ -1 & -2 & 3 \end{bmatrix}, \quad A_1 = \begin{bmatrix} 6 & 0 & 2 \\ 30 & 4 & 6 \\ 8 & -2 & 3 \end{bmatrix}, \quad A_2 = \begin{bmatrix} 1 & 6 & 2 \\ -3 & 30 & 6 \\ -1 & 8 & 3 \end{bmatrix}, \quad A_3 = \begin{bmatrix} 1 & 0 & 6 \\ -3 & 4 & 30 \\ -1 & -2 & 8 \end{bmatrix}.
$$

Four $3\times 3$ determinants, each expanded along a convenient line (the first row, whose zero helps in $A$, $A_1$, and $A_3$):

$$
\det(A) = 1\begin{vmatrix} 4 & 6 \\ -2 & 3 \end{vmatrix} + 2\begin{vmatrix} -3 & 4 \\ -1 & -2 \end{vmatrix} = (12 + 12) + 2(6 + 4) = 24 + 20 = 44 \neq 0,
$$

so Cramer's rule applies;

$$
\det(A_1) = 6(12 + 12) + 2\begin{vmatrix} 30 & 4 \\ 8 & -2 \end{vmatrix} = 144 + 2(-60 - 32) = 144 - 184 = -40;
$$

$$
\det(A_2) = 1\begin{vmatrix} 30 & 6 \\ 8 & 3 \end{vmatrix} - 6\begin{vmatrix} -3 & 6 \\ -1 & 3 \end{vmatrix} + 2\begin{vmatrix} -3 & 30 \\ -1 & 8 \end{vmatrix} = (90 - 48) - 6(-9 + 6) + 2(-24 + 30) = 42 + 18 + 12 = 72;
$$

$$
\det(A_3) = 1\begin{vmatrix} 4 & 30 \\ -2 & 8 \end{vmatrix} + 6\begin{vmatrix} -3 & 4 \\ -1 & -2 \end{vmatrix} = (32 + 60) + 6(6 + 4) = 92 + 60 = 152.
$$

Hence

$$
x_1 = \frac{-40}{44} = -\frac{10}{11}, \qquad x_2 = \frac{72}{44} = \frac{18}{11}, \qquad x_3 = \frac{152}{44} = \frac{38}{11}.
$$

Substituting back (the only certification that matters), with denominators cleared to elevenths: the first equation reads $-\tfrac{10}{11} + \tfrac{76}{11} = \tfrac{66}{11} = 6$; the second, $\tfrac{30}{11} + \tfrac{72}{11} + \tfrac{228}{11} = \tfrac{330}{11} = 30$; the third, $\tfrac{10}{11} - \tfrac{36}{11} + \tfrac{114}{11} = \tfrac{88}{11} = 8$. All three hold.

Cramer's rule invites the same verdict as the adjugate. As a computational device it is dominated by elimination for all but the smallest systems: solving an $n \times n$ system by Cramer requires $n + 1$ determinants of order $n$, where a single Gaussian elimination, costing roughly one determinant's worth of work, delivers all the unknowns at once. Its virtues lie elsewhere. It applies only when $\det(A) \neq 0$, and within that regime it displays each unknown as an explicit ratio of determinants, a closed form invaluable in theoretical arguments (perturbation and sensitivity analysis, integer solutions of integer systems, symbolic computation with parameters) precisely where algorithms are awkward. And it can be economical in the narrow case where one needs a single unknown from a small system: two determinants, and no elimination at all.

## 6. What the Determinant Means, and Where It Goes

A chapter of formulas deserves a closing paragraph of interpretation. The determinant of a real $n \times n$ matrix is, up to sign, the volume-scaling factor of the transformation $\vec{x} \mapsto A\vec{x}$: a region of area (or volume) $V$ is carried to a region of area $|\det(A)| \cdot V$, and the sign of $\det(A)$ records whether the transformation preserves or reverses orientation. Read against this interpretation, the chapter's theorems lose their air of coincidence. A singular matrix flattens space into something lower-dimensional, hence "volume zero, no inverse" (Theorem 2.15); performing one transformation after another multiplies the scaling factors (Theorem 2.16); scaling all of $\mathbb{R}^n$ by $k$ scales $n$-dimensional volume by $k^n$ (Theorem 2.10, (2-2)); interchanging two coordinate axes is a reflection, which reverses orientation (the sign flip of Lemma 2.4); and a shear, the geometric content of $E_{ij}(k)$, slides volumes without changing them (Theorem 2.10(3), and the familiar fact that triangles on the same base and height have equal area). The algebra of this chapter is the arithmetic of volume.

For the reader keeping accounts, the equivalence theorem of Chapter 1 now reads: for $A \in \mathrm{Mat}_n(\mathbb{R})$, the invertibility of $A$, the triviality of the null solutions of $A\vec{x} = \vec{0}$, the reduction of $A$ to $I_n$, the factorization of $A$ into elementary matrices, the unique (indeed, the mere) solvability of $A\vec{x} = \vec{b}$ for all $\vec{b}$, and the non-vanishing of $\det(A)$ are all one property, viewed from seven sides. Later chapters will add the linear independence of the rows and columns, the maximality of the rank, and the non-membership of $0$ among the eigenvalues, and it is in the theory of eigenvalues that the determinant performs its most consequential service, as the polynomial $\det(A - \lambda I)$ whose roots govern the deepest structure of the matrix. The reader who has internalized cofactor expansion, the row-operation calculus, and the multiplicative law is fully equipped for that encounter.
