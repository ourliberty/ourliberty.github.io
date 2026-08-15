---
title: |-
  Linear Algebra Ch6
  Eigenvalues and Eigenvectors
excerpt: 'Invariant directions and the scalings along them: the characteristic polynomial, diagonalization, the spectral theorem for symmetric matrices, and the principal axes theorem.'
date: '2026-07-20'
category: study
subcategory: mathematics
keywords: ['linear algebra', 'eigenvalues', 'diagonalization', 'spectral theorem', 'quadratic forms']
---

Based on Anton & Rorres, "Elementary Linear Algebra with Supplemental Applications" (12th ed.), and Larson, "Elementary Linear Algebra" (8th ed., metric version). A continuation of the essays on Chapters 1–5, whose notation and results are used freely.

The chapter on linear transformations closed with a small miracle. The operator $T(x_1, x_2) = (x_1 + x_2,\ -2x_1 + 4x_2)$, whose standard matrix $\left[\begin{smallmatrix} 1 & 1 \\ -2 & 4 \end{smallmatrix}\right]$ mixes the coordinates opaquely, turned out to be, in the right basis, nothing but a pair of stretches: by $2$ along the direction $(1,1)$, by $3$ along $(1,2)$. Its matrix in that basis was diagonal, and everything about the operator became readable at sight. The present chapter turns that miracle into a theory. The directions an operator merely rescales are its eigenvectors, the scaling factors its eigenvalues; the systematic search for them passes through the characteristic polynomial; the question of whether enough such directions exist to form a basis is the problem of diagonalization, answered in general by a count of independent eigenvectors and answered perfectly, for symmetric matrices, by the spectral theorem, which supplies not merely a basis but an orthonormal one. The chapter ends where the theory earns its keep in classical geometry: the principal axes theorem, which rotates the coordinate cross until a tilted conic confesses its identity. As throughout this series, I have proved what can be proved at this level and verified every computation more than once.

## 1. The Definition, and What It Asks

### 1.1 Invariant directions

Definition. Let $A \in \mathrm{Mat}_n(\mathbb{R})$. A nonzero vector $\vec{x} \in \mathbb{R}^n$ is an eigenvector of $A$ if

$$
A\vec{x} = \lambda\vec{x}
$$

for some scalar $\lambda \in \mathbb{R}$; the scalar $\lambda$ is then an eigenvalue of $A$, and $\vec{x}$ is an eigenvector corresponding to $\lambda$. (The prefix is German, eigen, "own" or "characteristic", and the words are sometimes rendered "characteristic values and vectors.")

Read geometrically, the equation asks a pointed question. Multiplication by $A$ generally does two things to a vector: it changes the length and swings the direction. An eigenvector is a vector whose direction survives: $A$ maps it onto its own line, merely stretching by the factor $\lambda$ (reversing, if $\lambda < 0$; annihilating, if $\lambda = 0$). Eigenvectors are the directions along which a complicated transformation behaves like simple scalar multiplication, and the whole strategy of the chapter is to understand $A$ by finding all of them.

Two clauses of the definition repay pedantic attention, because each guards against a standard confusion. First, the eigenvector must be nonzero. This is not stinginess but necessity: $A\vec{0} = \lambda\vec{0}$ holds for every scalar $\lambda$, so admitting $\vec{0}$ would make every number an eigenvalue of every matrix and drain the definition of content. Second, the asymmetric counterpart, the eigenvalue is perfectly welcome to be zero: $A\vec{x} = 0\vec{x} = \vec{0}$ with $\vec{x} \neq \vec{0}$ says precisely that $\vec{x}$ is a nonzero vector of the null space, and we shall see in Theorem 6.7 that the eigenvalue $0$ is exactly the signature of a singular matrix. Nonzero vector, any scalar: the asymmetry is the point.

Example 6.1. For

$$
A = \begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix}, \qquad \vec{x} = \begin{bmatrix} 1 \\ 2 \end{bmatrix},
$$

one computes $A\vec{x} = (3\cdot 1 + 0\cdot 2,\ 8\cdot 1 - 1\cdot 2) = (3, 6) = 3\,(1, 2) = 3\vec{x}$. The single multiplication certifies both facts at once: $\lambda = 3$ is an eigenvalue of $A$, and $(1,2)$ is an eigenvector belonging to it. Verifying a proposed eigenpair is always this cheap, one matrix–vector product and a glance. Finding eigenpairs from scratch is the harder art, to which we now turn.

### 1.2 The characteristic polynomial

The search looks circular at first: the equation $A\vec{x} = \lambda\vec{x}$ has two unknowns, the scalar $\lambda$ and the vector $\vec{x}$, tangled together. The way out is a rearrangement that decouples them.

$$
A\vec{x} = \lambda\vec{x} \iff \lambda\vec{x} - A\vec{x} = \vec{0} \iff (\lambda I - A)\vec{x} = \vec{0},
$$

the last step writing $\lambda\vec{x}$ as $\lambda I\vec{x}$ so that the two terms share the factor $\vec{x}$. (One cannot write "$(\lambda - A)\vec{x}$", a scalar minus a matrix is undefined; the identity matrix is the obligatory chaperone.) An eigenvector of eigenvalue $\lambda$ is thus exactly a nontrivial solution of the homogeneous system with coefficient matrix $\lambda I - A$, and the equivalence theorem, assembled over five chapters, tells us precisely when such solutions exist.

Theorem 6.2. For $A \in \mathrm{Mat}_n(\mathbb{R})$, the following are equivalent:

1. $\lambda$ is an eigenvalue of $A$;
2. the system $(\lambda I - A)\vec{x} = \vec{0}$ has a nontrivial solution;
3. $\det(\lambda I - A) = 0$.

The equivalence of (2) and (3) is the equivalence theorem read contrapositively: a square homogeneous system has nontrivial solutions exactly when its coefficient matrix is singular, exactly when its determinant vanishes (conditions (2) and (7) of Theorem 4.48). The function $\lambda \mapsto \det(\lambda I - A)$ is called the characteristic polynomial of $A$, and the equation $\det(\lambda I - A) = 0$ its characteristic equation, and a polynomial it genuinely is: expanding the determinant of

$$
\lambda I - A = \begin{bmatrix} \lambda - a_{11} & -a_{12} & \cdots & -a_{1n} \\ -a_{21} & \lambda - a_{22} & \cdots & -a_{2n} \\ \vdots & & & \vdots \\ -a_{n1} & -a_{n2} & \cdots & \lambda - a_{nn} \end{bmatrix}
$$

produces a monic polynomial of degree exactly $n$ in $\lambda$ (the top-degree term $\lambda^n$ arising from the product of the diagonal entries and from nowhere else). The strategic consequence is immediate and organizes everything that follows: an $n \times n$ matrix has at most $n$ eigenvalues, since a degree-$n$ polynomial has at most $n$ roots; and the hunt for eigenvalues is reduced to the algebra of root-finding, a problem solved once, in $\lambda$ alone, with the vectors postponed to a second stage.

Two structural remarks are worth banking now, both read off the characteristic polynomial and both familiar as similarity invariants from Chapter 5. Writing the eigenvalues (with multiplicity, over $\mathbb{C}$) as $\lambda_1, \dots, \lambda_n$, comparison of coefficients in $\det(\lambda I - A) = (\lambda - \lambda_1)\cdots(\lambda - \lambda_n)$ gives

$$
\lambda_1 + \lambda_2 + \cdots + \lambda_n = \operatorname{tr}(A), \qquad \lambda_1\lambda_2\cdots\lambda_n = \det(A):
$$

the trace is the sum of the eigenvalues, the determinant their product. These identities are the fastest sanity checks in the subject, and the worked examples below will be audited against them without mercy.

### 1.3 Eigenspaces

Stage two of the hunt, the vectors, comes with its own vocabulary.

Definition. For an eigenvalue $\lambda$ of $A$, the eigenspace of $A$ corresponding to $\lambda$ is

$$
E_A(\lambda) = \mathrm{null}(\lambda I - A) = \{\vec{x} \in \mathbb{R}^n \mid A\vec{x} = \lambda\vec{x}\},
$$

the full solution space of $(\lambda I - A)\vec{x} = \vec{0}$.

Being a null space, $E_A(\lambda)$ is automatically a subspace of $\mathbb{R}^n$ (Theorem 3.16), a fact one can also see directly, and instructively, from linearity: if $A\vec{x}_1 = \lambda\vec{x}_1$ and $A\vec{x}_2 = \lambda\vec{x}_2$, then $A(k_1\vec{x}_1 + k_2\vec{x}_2) = \lambda(k_1\vec{x}_1 + k_2\vec{x}_2)$. Eigenvectors of a common eigenvalue may be combined freely and remain eigenvectors. One terminological subtlety, a favorite of examiners: the eigenspace consists of all the eigenvectors for $\lambda$ together with the zero vector, since $\vec{0}$ solves the homogeneous system but is barred from eigenvector status by definition. The eigenspace is a subspace; the set of eigenvectors is that subspace with its origin deleted. Computing an eigenspace is, operationally, Chapter 1 homework: row-reduce $\lambda I - A$, parameterize the solutions, read off a basis.

### 1.4 Four computations that calibrate the theory

Example 6.3. Find bases for the eigenspaces of $A = \left[\begin{smallmatrix} 3 & 0 \\ 8 & -1 \end{smallmatrix}\right]$.

The characteristic polynomial, from a triangular determinant (Theorem 2.8):

$$
\det(\lambda I - A) = \begin{vmatrix} \lambda - 3 & 0 \\ -8 & \lambda + 1 \end{vmatrix} = (\lambda - 3)(\lambda + 1),
$$

with roots $\lambda = 3$ and $\lambda = -1$. (Audit: sum $3 + (-1) = 2 = \operatorname{tr}(A)$; product $-3 = \det(A) = 3\cdot(-1) - 0\cdot 8$. Both pass.) For $\lambda = 3$: the system $(3I - A)\vec{x} = \vec{0}$ has matrix $\left[\begin{smallmatrix} 0 & 0 \\ -8 & 4 \end{smallmatrix}\right]$, one honest equation $-8x_1 + 4x_2 = 0$, i.e. $x_2 = 2x_1$; solutions $t(1, 2)$, so $E_A(3) = \mathrm{Span}\{(1,2)\}$ with basis $\{(1,2)\}$, recovering, now systematically, the eigenvector that Example 6.1 merely verified. For $\lambda = -1$: the matrix $\left[\begin{smallmatrix} -4 & 0 \\ -8 & 0 \end{smallmatrix}\right]$ forces $x_1 = 0$ with $x_2$ free, so $E_A(-1) = \mathrm{Span}\{(0,1)\}$. Two eigenvalues, two one-dimensional eigenspaces, and, a foretaste of §4, two independent eigenvectors in a two-dimensional space.

Example 6.4. The matrix $A = \left[\begin{smallmatrix} 0 & 1 \\ -1 & 0 \end{smallmatrix}\right]$ has no real eigenvalues: its characteristic polynomial is

$$
\det(\lambda I - A) = \begin{vmatrix} \lambda & -1 \\ 1 & \lambda \end{vmatrix} = \lambda^2 + 1,
$$

which is strictly positive for every real $\lambda$ and so has no real roots. The algebra deserves its geometric caption: $A$ sends $(x, y) \mapsto (y, -x)$, a rotation of the plane through $90°$, and a rotation (through any angle other than $0$ or $\pi$) leaves no direction pointing where it pointed. No invariant direction, no eigenvector; the algebra and the geometry refuse in unison. (Over the complex numbers, $\lambda^2 + 1$ has the roots $\pm i$, and the theory revives, a door this course points at without walking through. In this chapter "eigenvalue" means real eigenvalue.)

Example 6.5. Find bases for the eigenspaces of

$$
A = \begin{bmatrix} 0 & 0 & -2 \\ 1 & 2 & 1 \\ 1 & 0 & 3 \end{bmatrix}.
$$

The polynomial. Form

$$
\lambda I - A = \begin{bmatrix} \lambda & 0 & 2 \\ -1 & \lambda - 2 & -1 \\ -1 & 0 & \lambda - 3 \end{bmatrix},
$$

and expand the determinant along the second column, whose lone nonzero entry sits at position $(2,2)$ with cofactor sign $(-1)^{2+2} = +$:

$$
\det(\lambda I - A) = (\lambda - 2)\begin{vmatrix} \lambda & 2 \\ -1 & \lambda - 3 \end{vmatrix} = (\lambda - 2)\big(\lambda^2 - 3\lambda + 2\big) = (\lambda - 2)(\lambda - 1)(\lambda - 2) = (\lambda - 1)(\lambda - 2)^2.
$$

The eigenvalues are $\lambda = 1$ and $\lambda = 2$, the latter a double root. (Audit: sum with multiplicity $1 + 2 + 2 = 5 = \operatorname{tr}(A) = 0 + 2 + 3$; product $1 \cdot 2 \cdot 2 = 4$, and expanding $\det(A)$ along the first row gives $(-2)\left|\begin{smallmatrix} 1 & 2 \\ 1 & 0\end{smallmatrix}\right| = (-2)(-2) = 4$. Both pass.)

Eigenspace for $\lambda = 1$. Row-reduce $I - A = \left[\begin{smallmatrix} 1 & 0 & 2 \\ -1 & -1 & -1 \\ -1 & 0 & -2 \end{smallmatrix}\right]$: adding row 1 to rows 2 and 3 yields rows $(0, -1, 1)$ and $(0,0,0)$, so the system reads $x_1 + 2x_3 = 0$, $x_2 - x_3 = 0$. With $x_3 = t$ free,

$$
\begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = t\begin{bmatrix} -2 \\ 1 \\ 1 \end{bmatrix}, \qquad E_A(1) = \mathrm{Span}\{(-2, 1, 1)\},
$$

a line. The certifying product: $A(-2,1,1) = (0\cdot(-2) + 0 - 2,\ -2 + 2 + 1,\ -2 + 0 + 3) = (-2, 1, 1) = 1\cdot(-2,1,1)$.

Eigenspace for $\lambda = 2$. Now $2I - A = \left[\begin{smallmatrix} 2 & 0 & 2 \\ -1 & 0 & -1 \\ -1 & 0 & -1 \end{smallmatrix}\right]$, three rows all proportional to the single equation $x_1 + x_3 = 0$, with both $x_2$ and $x_3$ free:

$$
\begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = s\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix} + t\begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix}, \qquad E_A(2) = \mathrm{Span}\{(0,1,0),\ (-1,0,1)\},
$$

a plane: the double root has purchased a two-dimensional eigenspace. Certifications: $A(0,1,0) = (0, 2, 0) = 2(0,1,0)$ and $A(-1,0,1) = (-2, 0, 2) = 2(-1,0,1)$. Altogether: three independent eigenvectors in $\mathbb{R}^3$ (independence is checked in §4, or at sight, the matrix with these columns has nonzero determinant), a full house whose significance §4 will spell out. $\square$

Example 6.6. Find the eigenvalues and eigenspaces of $A = \left[\begin{smallmatrix} 1 & 0 \\ 1 & 1 \end{smallmatrix}\right]$.

The characteristic polynomial is $(\lambda - 1)^2$ (triangular matrix: eigenvalues on the diagonal), so $\lambda = 1$ is the only eigenvalue, a double root. But the eigenspace disappoints: $I - A = \left[\begin{smallmatrix} 0 & 0 \\ -1 & 0 \end{smallmatrix}\right]$ forces $x_1 = 0$, leaving only $E_A(1) = \mathrm{Span}\{(0,1)\}$, one dimension where the multiplicity of the root promised the possibility of two. The double eigenvalue delivered a single independent eigenvector, and there is no second eigenvalue to make up the shortfall. Hold this example in mind through §4: it is the standard specimen of a matrix that cannot be diagonalized, and the mismatch on display, root multiplicity $2$, eigenspace dimension $1$, is exactly the pathology the diagonalization theorem will diagnose. (Contrast Example 6.5, where the double root $\lambda = 2$ did earn a two-dimensional eigenspace. Whether a repeated root pays its dimensional debt is precisely the question.)

## 2. The Algebra of Eigenvalues

Before diagonalization, a cluster of theorems records how eigenvalues behave under the standard operations: inversion, powers, transposition, conjugation. Each is a short deduction from the definition, and together they are the working vocabulary of the subject.

Theorem 6.7. $A \in \mathrm{Mat}_n(\mathbb{R})$ is invertible if and only if $\lambda = 0$ is not an eigenvalue of $A$.

Proof. The scalar $0$ is an eigenvalue iff $(0\cdot I - A)\vec{x} = \vec{0}$, i.e. $A\vec{x} = \vec{0}$, has a nontrivial solution (Theorem 6.2), iff $A$ is singular. Contrapositively, invertible iff $0$ is not an eigenvalue. $\square$

This is less a new fact than a translation: "$0$ is an eigenvalue" and "$\det(A) = 0$" and "the null space is nontrivial" are one condition in three dialects, now joined by the eigenvalue dialect. It also confirms the product formula: $\det(A) = \prod \lambda_i$ vanishes exactly when some $\lambda_i = 0$.

Theorem 6.8 (powers and inverses). Suppose $A\vec{x} = \lambda\vec{x}$ with $\vec{x} \neq \vec{0}$.

1. For every positive integer $k$, $A^k\vec{x} = \lambda^k\vec{x}$, so $\lambda^k$ is an eigenvalue of $A^k$, with the same eigenvector.
2. If $A$ is invertible, then $A^{-1}\vec{x} = \lambda^{-1}\vec{x}$, so $\lambda^{-1}$ is an eigenvalue of $A^{-1}$, again with the same eigenvector.

Proof. (1) Induct: $A^k\vec{x} = A(A^{k-1}\vec{x}) = A(\lambda^{k-1}\vec{x}) = \lambda^{k-1}(A\vec{x}) = \lambda^k\vec{x}$. (2) Invertibility ensures $\lambda \neq 0$ by Theorem 6.7, so $\lambda^{-1}$ exists; applying $A^{-1}$ to $A\vec{x} = \lambda\vec{x}$ gives $\vec{x} = \lambda A^{-1}\vec{x}$, whence $A^{-1}\vec{x} = \lambda^{-1}\vec{x}$. $\square$

The content worth extracting: eigenvectors are preserved by every polynomial and rational operation on the matrix; only the eigenvalues transform, and they transform by the same operation applied to numbers. This is the germ of the functional calculus, to compute $A^{100}\vec{x}$ for an eigenvector one need not multiply a hundred matrices, only raise a number to the hundredth power, and it is the reason diagonalization, which expresses every vector in eigen-coordinates, makes matrix powers trivial (§4.4).

Theorem 6.9. $A$ and $A^T$ have the same eigenvalues.

Proof. They have the same characteristic polynomial, because $\det(\lambda I - A^T) = \det\big((\lambda I - A)^T\big) = \det(\lambda I - A)$, using $(\lambda I - A)^T = \lambda I - A^T$ and the transpose-invariance of the determinant (Theorem 2.6). Same polynomial, same roots. $\square$

(A caution the theorem invites and denies: $A$ and $A^T$ share eigenvalues but generally not eigenvectors. The row and column worlds agree on the scaling factors, not on the directions.)

Theorem 6.10. If $A\vec{x} = \lambda\vec{x}$ and $P \in GL(n, \mathbb{R})$, then $\lambda$ is an eigenvalue of $P^{-1}AP$, with eigenvector $P^{-1}\vec{x}$.

Proof. A direct computation: $(P^{-1}AP)(P^{-1}\vec{x}) = P^{-1}A\vec{x} = P^{-1}(\lambda\vec{x}) = \lambda(P^{-1}\vec{x})$, and $P^{-1}\vec{x} \neq \vec{0}$ because $P^{-1}$ is invertible. $\square$

This is the linchpin. Recall from Chapter 5 that $P^{-1}AP$ is the same operator seen in a new basis; the theorem says the eigenvalues are unchanged by the change of view, while the eigenvectors are merely re-coordinatized (by $P^{-1}$, the transition to the new basis). Eigenvalues, in other words, belong to the operator, not to any matrix representing it, and this is exactly the statement that they are similarity invariants.

Theorem 6.11 (similarity invariants, completed). For $A \in \mathrm{Mat}_n(\mathbb{R})$ and $P \in GL(n,\mathbb{R})$, the following are shared by $A$ and $P^{-1}AP$: determinant, invertibility, trace, nullity, rank, characteristic polynomial, eigenvalues, and the dimension of the eigenspace for each eigenvalue.

The first five were established in Chapter 5. The characteristic polynomial is invariant because, by the multiplicative law,

$$
\det(\lambda I - P^{-1}AP) = \det\big(P^{-1}(\lambda I - A)P\big) = \det(P^{-1})\det(\lambda I - A)\det(P) = \det(\lambda I - A),
$$

the scalar factors $\det(P^{-1})$ and $\det(P)$ cancelling; the eigenvalues follow as its roots; and the eigenspace dimensions follow from Theorem 6.10, which sets up a bijection $\vec{x} \mapsto P^{-1}\vec{x}$ between the eigenspaces (a linear isomorphism, hence dimension-preserving). This roster is the complete list of features that survive a change of basis, the intrinsic anatomy of the operator, stripped of coordinate accidents. Everything the next sections do is, in effect, to hunt for the basis in which this anatomy is displayed most nakedly.

## 3. Diagonalization

### 3.1 The definition and the master theorem

Definition. A square matrix $A$ is diagonalizable if it is similar to a diagonal matrix, if there exists $P \in GL(n,\mathbb{R})$ with $P^{-1}AP$ diagonal. The matrix $P$ is said to diagonalize $A$.

By the Chapter 5 dictionary, this asks whether the operator $\vec{x} \mapsto A\vec{x}$ has some basis in which its matrix is diagonal, a basis in which the operator acts by independent scalings along the axes. The following theorem tells us exactly when such a basis exists, and what it must be made of.

Theorem 6.12. $A \in \mathrm{Mat}_n(\mathbb{R})$ is diagonalizable if and only if $A$ has $n$ linearly independent eigenvectors.

Proof. The engine is a single observation about the equation $AP = PD$. Write the columns of $P$ as $\vec{p}_1, \dots, \vec{p}_n$ and let $D = \mathrm{diag}(\lambda_1, \dots, \lambda_n)$. Computing both products column by column (Chapter 1, Remark 1.13): the $j$-th column of $AP$ is $A\vec{p}_j$, while the $j$-th column of $PD$ is $\lambda_j\vec{p}_j$ (post-multiplication by a diagonal matrix scales the $j$-th column by the $j$-th diagonal entry). Hence

$$
AP = PD \iff A\vec{p}_j = \lambda_j\vec{p}_j \ \text{ for every } j.
$$

($\Rightarrow$) If $A$ is diagonalizable, $P^{-1}AP = D$ gives $AP = PD$, so each column $\vec{p}_j$ satisfies $A\vec{p}_j = \lambda_j\vec{p}_j$, an eigenvector (nonzero, being a column of the invertible $P$). And the columns of an invertible matrix are linearly independent (equivalence theorem). So $A$ has $n$ independent eigenvectors, namely the columns of $P$.

($\Leftarrow$) Conversely, given $n$ independent eigenvectors $\vec{p}_1, \dots, \vec{p}_n$ with $A\vec{p}_j = \lambda_j\vec{p}_j$, assemble them as the columns of $P$ and set $D = \mathrm{diag}(\lambda_1, \dots, \lambda_n)$. Independence makes $P$ invertible; the column computation gives $AP = PD$; hence $P^{-1}AP = D$. $\square$

The proof is worth more than the theorem, because it is constructive: it names the diagonalizing matrix. The columns of $P$ are the eigenvectors; the diagonal entries of $D$ are their eigenvalues, in matching order. Change the order of the eigenvectors in $P$ and the eigenvalues in $D$ permute to match, the pairing is rigid, the ordering free. And the theorem exposes the sole obstruction to diagonalizability with perfect clarity: it is a shortage of independent eigenvectors. A matrix fails to be diagonalizable precisely when its eigenvectors, however many eigenvalues it has, cannot be marshalled into a basis, the fate of Example 6.6, whose single eigenvalue offered only one independent direction where two were needed.

### 3.2 The procedure, and a worked case

Procedure. To diagonalize $A \in \mathrm{Mat}_n(\mathbb{R})$: (1) find a basis for each eigenspace and pool them into one set $S$; if $|S| < n$, stop, $A$ is not diagonalizable. (2) If $|S| = n$, form $P$ with the vectors of $S$ as columns. (3) Then $P^{-1}AP$ is diagonal, its entries the eigenvalues in the order the eigenvectors were placed. (That pooled eigenvectors from different eigenspaces are automatically independent, so that step (1)'s count is trustworthy, is the content of §3.3.)

Example 6.13. Diagonalize $A = \left[\begin{smallmatrix} 3 & 0 \\ 8 & -1 \end{smallmatrix}\right]$.

Example 6.3 already did the spadework: eigenvalues $3$ and $-1$, eigenvectors $\vec{p}_1 = (1, 2)$ and $\vec{p}_2 = (0, 1)$. Two independent eigenvectors in $\mathbb{R}^2$, diagonalizable. Assemble

$$
P = \begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}, \qquad P^{-1} = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}
$$

($\det P = 1$, so the inverse is the swap-and-negate of Chapter 1). The verification, multiplied out in full:

$$
P^{-1}AP = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}\begin{bmatrix} 3 & 0 \\ 8 & -1 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}\begin{bmatrix} 3 & 0 \\ 6 & -1 \end{bmatrix} = \begin{bmatrix} 3 & 0 \\ 0 & -1 \end{bmatrix},
$$

diagonal, with the eigenvalues $3, -1$ appearing in exactly the order their eigenvectors occupy the columns of $P$. Had we listed the eigenvectors in the reverse order, $D$ would read $\mathrm{diag}(-1, 3)$, same operator, relabeled axes.

### 3.3 Independence across distinct eigenvalues

The procedure's step (1) rests on a promise: that basis vectors gathered from different eigenspaces do not secretly overlap or depend on one another. Two theorems discharge it, and they are the theoretical heart of the section.

Theorem 6.14. Eigenvectors corresponding to distinct eigenvalues are linearly independent: if $A\vec{v}_i = \lambda_i\vec{v}_i$ with $\vec{v}_i \neq \vec{0}$ and the $\lambda_1, \dots, \lambda_k$ pairwise distinct, then $\{\vec{v}_1, \dots, \vec{v}_k\}$ is independent.

Proof. Suppose not, and let $r$ be the largest integer for which $\{\vec{v}_1, \dots, \vec{v}_r\}$ is independent (such an $r$ exists and is at least $1$, since $\{\vec{v}_1\}$ is independent, $\vec{v}_1$ being nonzero; and $r < k$ by the assumed dependence). Then $\{\vec{v}_1, \dots, \vec{v}_r, \vec{v}_{r+1}\}$ is dependent, so there are scalars $k_1, \dots, k_{r+1}$, not all zero, with

$$
k_1\vec{v}_1 + \cdots + k_r\vec{v}_r + k_{r+1}\vec{v}_{r+1} = \vec{0}. \tag{1}
$$

Apply $A$ to both sides, using $A\vec{v}_i = \lambda_i\vec{v}_i$:

$$
k_1\lambda_1\vec{v}_1 + \cdots + k_r\lambda_r\vec{v}_r + k_{r+1}\lambda_{r+1}\vec{v}_{r+1} = \vec{0}. \tag{2}
$$

Now subtract $\lambda_{r+1}$ times (1) from (2); the $\vec{v}_{r+1}$ term cancels exactly, leaving

$$
k_1(\lambda_1 - \lambda_{r+1})\vec{v}_1 + \cdots + k_r(\lambda_r - \lambda_{r+1})\vec{v}_r = \vec{0}.
$$

But $\{\vec{v}_1, \dots, \vec{v}_r\}$ is independent, so every coefficient vanishes: $k_i(\lambda_i - \lambda_{r+1}) = 0$ for $i = 1, \dots, r$. Since the eigenvalues are distinct, $\lambda_i - \lambda_{r+1} \neq 0$, forcing $k_1 = \cdots = k_r = 0$. Feeding this back into (1) leaves $k_{r+1}\vec{v}_{r+1} = \vec{0}$, and $\vec{v}_{r+1} \neq \vec{0}$ then forces $k_{r+1} = 0$, so all the coefficients vanish, contradicting their being not all zero. $\square$

The maneuver at the center, apply $A$, then subtract $\lambda_{r+1}$ times the original relation, to annihilate one term, is a standard and beautiful trick; it converts a relation among $r+1$ eigenvectors into a shorter relation among $r$, which independence then kills. An immediate and important corollary:

Theorem 6.15. If $A \in \mathrm{Mat}_n(\mathbb{R})$ has $n$ distinct eigenvalues, then $A$ is diagonalizable.

For then $A$ has $n$ eigenvectors (one per eigenvalue) that are independent by Theorem 6.14, and Theorem 6.12 applies. This is the common case, a "generic" matrix has distinct eigenvalues and is diagonalizable, and it is worth stating the logical direction with care, since students routinely invert it: distinct eigenvalues suffice for diagonalizability but are not necessary. Example 6.5 diagonalizes (three independent eigenvectors) despite a repeated eigenvalue; a repeated eigenvalue is merely an invitation to trouble, not trouble itself, trouble arrives only if the repetition is not matched by eigenspace dimension, as in Example 6.6.

Theorem 6.16. For two distinct eigenvalues $\lambda_1 \neq \lambda_2$: if $\{\vec{v}_1, \dots, \vec{v}_s\}$ are independent eigenvectors for $\lambda_1$ and $\{\vec{w}_1, \dots, \vec{w}_t\}$ independent eigenvectors for $\lambda_2$, then the pooled set $\{\vec{v}_1, \dots, \vec{v}_s, \vec{w}_1, \dots, \vec{w}_t\}$ is independent.

This is the promise the procedure needed, now delivered (and it extends, by the same reasoning, to any number of distinct eigenvalues): bases of different eigenspaces never interfere. The union of eigenspace bases is therefore an independent set of size $\sum_\lambda \dim E_A(\lambda)$, and the diagonalizability criterion refines to a clean numerical test: $A$ is diagonalizable iff the eigenspace dimensions sum to $n$. Since each $\dim E_A(\lambda)$ is at least $1$ and at most the multiplicity of $\lambda$ as a root of the characteristic polynomial, the test fails precisely when some repeated eigenvalue is deficient, its eigenspace too small for its multiplicity, the exact disease of Example 6.6 (multiplicity $2$, dimension $1$, sum $1 < 2$).

### 3.4 Why diagonalization matters: powers, made trivial

A word on the payoff, since the machinery is not built for its own sake. If $P^{-1}AP = D$, then $A = PDP^{-1}$, and telescoping,

$$
A^k = (PDP^{-1})^k = PD^{\,k}P^{-1},
$$

the interior factors $P^{-1}P$ collapsing at each junction. But $D^k = \mathrm{diag}(\lambda_1^k, \dots, \lambda_n^k)$ is computed by raising $n$ numbers to the $k$-th power, no matrix multiplication at all. A problem that looks like $k-1$ matrix products becomes $n$ scalar exponentiations sandwiched between two fixed matrices. This is the computational reason eigenvalues rule applied linear algebra: they linearize the study of repeated application, of dynamical systems, Markov chains, difference and differential equations, by decoupling an operator into independent one-dimensional actions, each of which iterates by mere multiplication. Diagonalization is the change of coordinates in which "do it $k$ times" costs nothing.

## 4. Orthogonal Diagonalization and the Spectral Theorem

### 4.1 Orthogonal matrices

Diagonalization is good; diagonalization by an orthogonal change of basis is better, because it preserves the geometry of Chapter 4, lengths, angles, right angles, while it simplifies the algebra. The matrices that effect such changes are singled out first.

Definition. A square matrix $P$ is orthogonal if $P^T P = I$, equivalently (Theorem 1.52, one-sided inverses suffice for square matrices) if $P$ is invertible with $P^{-1} = P^T$.

The condition $P^TP = I$ is more vivid than it looks. Its $(i,j)$ entry is the dot product of the $i$-th and $j$-th columns of $P$; demanding that this equal $\delta_{ij}$ (one on the diagonal, zero off it) says exactly that the columns of $P$ are an orthonormal set, mutually perpendicular unit vectors. So (Theorem 6.17) $P$ is orthogonal iff its columns form an orthonormal basis of $\mathbb{R}^n$, and, applying the same reasoning to $PP^T = I$, iff its rows do. An orthogonal matrix is the matrix form of an orthonormal basis.

Theorem 6.18. For an orthogonal matrix $P$ and vectors $\vec{x}, \vec{y} \in \mathbb{R}^n$:

$$
P\vec{x} \bullet P\vec{y} = \vec{x} \bullet \vec{y}, \qquad \|P\vec{x}\| = \|\vec{x}\|, \qquad \det(P) = \pm 1.
$$

Proof. Using $\vec{u} \bullet \vec{v} = \vec{v}^T\vec{u}$ and $P^TP = I$: $\ P\vec{x} \bullet P\vec{y} = (P\vec{y})^T(P\vec{x}) = \vec{y}^TP^TP\vec{x} = \vec{y}^T\vec{x} = \vec{x} \bullet \vec{y}$. Setting $\vec{y} = \vec{x}$ gives $\|P\vec{x}\|^2 = \|\vec{x}\|^2$, hence the norm identity. And $\det(P)^2 = \det(P^T)\det(P) = \det(P^TP) = \det(I) = 1$, so $\det(P) = \pm 1$. $\square$

The theorem's message is that orthogonal matrices are exactly the rigid motions fixing the origin, they preserve every dot product, hence every length and every angle. Geometrically they are the rotations (determinant $+1$) and reflections (determinant $-1$); an orthogonal change of basis rotates or reflects the coordinate frame without distorting it, which is why diagonalizing orthogonally keeps the geometry honest.

Definition. $A$ is orthogonally diagonalizable if there is an orthogonal $P$ with $P^TP = I$ (equivalently $P^{-1} = P^T$) and $P^TAP$ diagonal.

### 4.2 Symmetric matrices, and only symmetric matrices

Which matrices admit orthogonal diagonalization? The answer, one of the most satisfying theorems in elementary linear algebra, is a clean necessary-and-sufficient condition of a completely different character from the eigenvector-counting of §3: it is a symmetry condition, checkable at a glance.

Theorem 6.19. $A \in \mathrm{Mat}_n(\mathbb{R})$ is orthogonally diagonalizable if and only if $A$ is symmetric ($A^T = A$).

Proof of necessity. Suppose $A = PDP^T$ with $P$ orthogonal ($P^{-1} = P^T$) and $D$ diagonal. Then, using $(XYZ)^T = Z^TY^TX^T$ and $D^T = D$ (diagonal matrices are symmetric),

$$
A^T = (PDP^T)^T = (P^T)^T D^T P^T = PDP^T = A,
$$

so $A$ is symmetric. Sufficiency, that every symmetric matrix is orthogonally diagonalizable, is the spectral theorem of §4.4, whose proof requires the two structural facts developed next (Theorem 6.20). $\square$

Necessity is the easy half and already useful: a matrix that is not symmetric cannot be orthogonally diagonalized, full stop. The remarkable half is the converse, and it rests on two structural facts, gathered in the next theorem, that symmetric matrices enjoy and general matrices do not.

Theorem 6.20. Let $A$ be a real symmetric matrix. Then:

1. all eigenvalues of $A$ are real;
2. eigenvectors corresponding to distinct eigenvalues are not merely independent (Theorem 6.14) but orthogonal.

On part (1). For a symmetric matrix the characteristic polynomial, which for a general real matrix might have non-real complex roots as in Example 6.4, has only real roots, so the theory never leaves $\mathbb{R}$, and the pathology of the rotation matrix cannot occur. The proof passes through the complex numbers and the observation that $\overline{\vec{x}}^T A\vec{x}$ is real whenever $A$ is real symmetric; it lies beyond the elementary scope, but the fact is what guarantees a symmetric matrix a full real spectrum to diagonalize with.

Proof of (2). Let $A\vec{v}_1 = \lambda_1\vec{v}_1$ and $A\vec{v}_2 = \lambda_2\vec{v}_2$ with $\lambda_1 \neq \lambda_2$. Consider the scalar $\vec{v}_1^T A\vec{v}_2$, and evaluate it two ways. Directly, $\vec{v}_1^T A\vec{v}_2 = \vec{v}_1^T(\lambda_2\vec{v}_2) = \lambda_2\,(\vec{v}_1 \bullet \vec{v}_2)$. But also, using symmetry $A^T = A$,

$$
\vec{v}_1^T A\vec{v}_2 = (A^T\vec{v}_1)^T\vec{v}_2 = (A\vec{v}_1)^T\vec{v}_2 = (\lambda_1\vec{v}_1)^T\vec{v}_2 = \lambda_1\,(\vec{v}_1 \bullet \vec{v}_2).
$$

Equating the two evaluations, $\lambda_2(\vec{v}_1 \bullet \vec{v}_2) = \lambda_1(\vec{v}_1 \bullet \vec{v}_2)$, i.e. $(\lambda_1 - \lambda_2)(\vec{v}_1 \bullet \vec{v}_2) = 0$; since $\lambda_1 \neq \lambda_2$, we conclude $\vec{v}_1 \bullet \vec{v}_2 = 0$. $\square$

Part (2) is the crucial upgrade. For a general diagonalizable matrix, eigenvectors from distinct eigenvalues are independent but tilted at arbitrary angles; for a symmetric matrix they are automatically perpendicular. Perpendicular eigenvectors are exactly the raw material an orthonormal eigenbasis is built from, and where a single eigenspace has dimension greater than one, Gram–Schmidt (Chapter 4) orthonormalizes within it, without leaving the eigenspace (every vector of an eigenspace is still an eigenvector, so orthogonalizing produces orthogonal eigenvectors). The pieces are now in place.

### 4.3 The spectral theorem and the orthogonal diagonalization procedure

Theorem 6.21 (spectral theorem). Every real symmetric matrix $A$ is orthogonally diagonalizable: there exist an orthogonal $P$ and a diagonal $D$ with

$$
P^T A P = D,
$$

the diagonal of $D$ consisting of the (real) eigenvalues of $A$ and the columns of $P$ forming an orthonormal basis of $\mathbb{R}^n$ made of eigenvectors of $A$.

The theorem is the sufficiency half of Theorem 6.19, and its proof assembles the parts: Theorem 6.20 guarantees $n$ real eigenvalues (with multiplicity); within each eigenspace Gram–Schmidt produces an orthonormal basis; across distinct eigenvalues Theorem 6.20(2) guarantees the eigenspaces are mutually orthogonal, so the pooled orthonormal bases remain orthonormal; the total is $n$ orthonormal eigenvectors (the multiplicities summing correctly is the substantive point, secured by the real spectrum), which as columns build an orthogonal $P$ diagonalizing $A$. The name "spectral" comes from spectrum, the set of eigenvalues; the theorem says a symmetric operator is completely described by its spectrum together with a perpendicular set of axes, one bundle of axes per eigenvalue.

Procedure (orthogonal diagonalization of a symmetric $A$). (1) Find the eigenvalues and a basis for each eigenspace. (2) Apply Gram–Schmidt within each eigenspace to make its basis orthonormal; eigenvectors from distinct eigenspaces are already orthogonal by Theorem 6.20(2), so no cross-orthogonalization is needed. (3) Assemble the resulting $n$ orthonormal eigenvectors as the columns of $P$; then $P$ is orthogonal and $P^TAP = \mathrm{diag}(\lambda_1, \dots, \lambda_n)$.

### 4.4 A symmetric matrix, orthogonally diagonalized

Example 6.22. Orthogonally diagonalize the symmetric matrix

$$
A = \begin{bmatrix} 4 & 2 & 2 \\ 2 & 4 & 2 \\ 2 & 2 & 4 \end{bmatrix}.
$$

Eigenvalues. The characteristic polynomial is $\det(\lambda I - A)$ with

$$
\lambda I - A = \begin{bmatrix} \lambda - 4 & -2 & -2 \\ -2 & \lambda - 4 & -2 \\ -2 & -2 & \lambda - 4 \end{bmatrix}.
$$

A structural shortcut beats brute expansion here, and is worth seeing. Every row of $\lambda I - A$ sums to $\lambda - 8$; adding columns 2 and 3 into column 1 (a determinant-preserving operation) makes the first column constant, equal to $\lambda - 8$, which then factors out:

$$
\det(\lambda I - A) = (\lambda - 8)\begin{vmatrix} 1 & -2 & -2 \\ 1 & \lambda - 4 & -2 \\ 1 & -2 & \lambda - 4 \end{vmatrix}.
$$

Subtracting row 1 from rows 2 and 3 clears the first column below the corner and triangularizes the block:

$$
= (\lambda - 8)\begin{vmatrix} 1 & -2 & -2 \\ 0 & \lambda - 2 & 0 \\ 0 & 0 & \lambda - 2 \end{vmatrix} = (\lambda - 8)(\lambda - 2)^2.
$$

Eigenvalues: $\lambda = 8$ (simple) and $\lambda = 2$ (double). (Audit: sum $8 + 2 + 2 = 12 = \operatorname{tr}(A) = 4+4+4$; product $8 \cdot 4 = 32$, and $\det(A) = 32$ by direct expansion. Both pass.)

Eigenspace for $\lambda = 8$. Solve $(8I - A)\vec{x} = \vec{0}$ with $8I - A = \left[\begin{smallmatrix} 4 & -2 & -2 \\ -2 & 4 & -2 \\ -2 & -2 & 4 \end{smallmatrix}\right]$. Row reduction (divide row 1 by 2, clear) gives $x_1 = x_3$, $x_2 = x_3$, so the eigenspace is $\mathrm{Span}\{(1,1,1)\}$. Normalize: $\vec{p}_1 = \tfrac{1}{\sqrt 3}(1,1,1)$. (Check: $A(1,1,1) = (8,8,8) = 8(1,1,1)$.)

Eigenspace for $\lambda = 2$. Now $2I - A = \left[\begin{smallmatrix} -2 & -2 & -2 \\ -2 & -2 & -2 \\ -2 & -2 & -2 \end{smallmatrix}\right]$, three copies of the single equation $x_1 + x_2 + x_3 = 0$, a plane, with $x_2, x_3$ free:

$$
\vec{u}_1 = (-1, 1, 0), \qquad \vec{u}_2 = (-1, 0, 1)
$$

form a basis (setting $(x_2,x_3) = (1,0), (0,1)$). These are independent but not orthogonal ($\vec{u}_1 \bullet \vec{u}_2 = 1 \neq 0$), so Gram–Schmidt is required within the eigenspace. Take $\vec{v}_1 = \vec{u}_1 = (-1,1,0)$; then

$$
\vec{v}_2 = \vec{u}_2 - \frac{\vec{u}_2 \bullet \vec{v}_1}{\vec{v}_1 \bullet \vec{v}_1}\vec{v}_1 = (-1,0,1) - \frac{1}{2}(-1,1,0) = \Big(-\tfrac{1}{2}, -\tfrac{1}{2}, 1\Big),
$$

or, rescaling to clear fractions, $\vec{v}_2 \parallel (-1, -1, 2)$. Normalize both: $\vec{p}_2 = \tfrac{1}{\sqrt 2}(-1,1,0)$ and $\vec{p}_3 = \tfrac{1}{\sqrt 6}(-1,-1,2)$.

Assembly and audit. The orthonormal eigenbasis gives

$$
P = \begin{bmatrix} \tfrac{1}{\sqrt3} & -\tfrac{1}{\sqrt2} & -\tfrac{1}{\sqrt6} \\[4pt] \tfrac{1}{\sqrt3} & \tfrac{1}{\sqrt2} & -\tfrac{1}{\sqrt6} \\[4pt] \tfrac{1}{\sqrt3} & 0 & \tfrac{2}{\sqrt6} \end{bmatrix}, \qquad P^TAP = \begin{bmatrix} 8 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 2 \end{bmatrix}.
$$

Every promised property checks. The columns are orthonormal: each has norm $1$ (e.g. $\tfrac{1}{6}(1 + 1 + 4) = 1$ for $\vec{p}_3$), and they are mutually perpendicular, $\vec{p}_1 \bullet \vec{p}_2 = \tfrac{1}{\sqrt6}(-1 + 1 + 0) = 0$, $\vec{p}_1 \bullet \vec{p}_3 = \tfrac{1}{\sqrt{18}}(-1 - 1 + 2) = 0$, and $\vec{p}_2 \bullet \vec{p}_3 = \tfrac{1}{\sqrt{12}}(1 - 1 + 0) = 0$, the last two dot products confirming that the $\lambda = 8$ eigenvector really is orthogonal to the $\lambda = 2$ plane, exactly as Theorem 6.20(2) guaranteed before any computation. The construction did not have to force this orthogonality; symmetry supplied it. $\square$

## 5. Quadratic Forms and the Principal Axes Theorem

### 5.1 Quadratic forms

The spectral theorem's most classical application is to the geometry of second-degree equations, the conics and quadrics of analytic geometry. The bridge is the notion of a quadratic form.

Definition. A quadratic form in the variables $x_1, \dots, x_n$ is a homogeneous polynomial of degree two, a sum of terms each of degree exactly two, $\sum_{i \leq j} c_{ij}x_ix_j$. Every quadratic form is expressible as

$$
Q(\vec{x}) = \vec{x}^T A\vec{x}
$$

for a unique symmetric matrix $A$: the diagonal entry $a_{ii}$ is the coefficient of $x_i^2$, and each off-diagonal pair $a_{ij} = a_{ji}$ is half the coefficient of the cross term $x_ix_j$ (the halving so that $a_{ij}x_ix_j + a_{ji}x_jx_i$ reconstitutes the full cross term). In two variables,

$$
Q(x, y) = ax^2 + bxy + cy^2 = \begin{bmatrix} x & y \end{bmatrix}\begin{bmatrix} a & b/2 \\ b/2 & c \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix}.
$$

Insisting on the symmetric representative is what lets the spectral theorem enter: a symmetric matrix is orthogonally diagonalizable, and that is the fact about to be spent.

Example 6.23. Three translations into matrix notation, exercising the recipe.

(1) $2x^2 + 6xy - 7y^2$: diagonal entries $2$ and $-7$; the cross coefficient $6$ splits in half:

$$
2x^2 + 6xy - 7y^2 = \begin{bmatrix} x & y \end{bmatrix}\begin{bmatrix} 2 & 3 \\ 3 & -7 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix}.
$$

(2) The bare cross term $xy$, with no squares at all:

$$
xy = \begin{bmatrix} x & y \end{bmatrix}\begin{bmatrix} 0 & \tfrac12 \\ \tfrac12 & 0 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix},
$$

zeros on the diagonal and the coefficient $1$ halved off it.

(3) In three variables, $x_1^2 + 7x_2^2 - 3x_3^2 + 4x_1x_2 - 2x_1x_3 + 8x_2x_3$:

$$
A = \begin{bmatrix} 1 & 2 & -1 \\ 2 & 7 & 4 \\ -1 & 4 & -3 \end{bmatrix},
$$

the squares' coefficients $1, 7, -3$ down the diagonal, and the cross coefficients $4, -2, 8$ halved into the symmetric pairs $(1,2)$, $(1,3)$, $(2,3)$. The audit runs the multiplication backwards: $\vec{x}^TA\vec{x} = a_{11}x_1^2 + a_{22}x_2^2 + a_{33}x_3^2 + 2a_{12}x_1x_2 + 2a_{13}x_1x_3 + 2a_{23}x_2x_3$, and the doubled off-diagonal entries $2\cdot 2 = 4$, $2\cdot(-1) = -2$, $2\cdot 4 = 8$ restore precisely the original cross terms.

### 5.2 The principal axes theorem

Theorem 6.24 (principal axes theorem). Let $Q(\vec{x}) = \vec{x}^TA\vec{x}$ be a quadratic form with $A$ symmetric. Then there is an orthogonal change of variable $\vec{x} = P\vec{y}$ (with $P$ orthogonal) that eliminates all cross terms:

$$
Q = \vec{x}^TA\vec{x} = \vec{y}^T D\vec{y} = \lambda_1 y_1^2 + \lambda_2 y_2^2 + \cdots + \lambda_n y_n^2,
$$

where $\lambda_1, \dots, \lambda_n$ are the eigenvalues of $A$ and the columns of $P$, the principal axes of the form, are corresponding orthonormal eigenvectors.

Proof. By the spectral theorem choose orthogonal $P$ with $P^TAP = D = \mathrm{diag}(\lambda_1, \dots, \lambda_n)$. Substitute $\vec{x} = P\vec{y}$:

$$
Q = \vec{x}^TA\vec{x} = (P\vec{y})^TA(P\vec{y}) = \vec{y}^T(P^TAP)\vec{y} = \vec{y}^TD\vec{y} = \sum_{i=1}^n \lambda_i y_i^2,
$$

a form with no cross terms, its coefficients the eigenvalues. $\square$

The change of variable $\vec{x} = P\vec{y}$, with $P$ orthogonal, is a rotation (or reflection) of the coordinate axes, and the theorem says that the tangle of cross terms in $Q$ is an artifact of looking at the form through a tilted coordinate cross. Rotate the cross to align with the eigenvectors of $A$, and the form falls apart into a clean weighted sum of squares. The eigenvectors are the natural axes of the form; the eigenvalues are the coefficients along them.

### 5.3 Classifying a conic

Example 6.25. Perform a rotation of axes to eliminate the $xy$-term in the quadratic equation

$$
5x^2 - 4xy + 8y^2 - 36 = 0,
$$

and identify the curve.

The matrix. The quadratic part has squares' coefficients $5$ and $8$ and cross coefficient $-4$, halved:

$$
5x^2 - 4xy + 8y^2 = \begin{bmatrix} x & y \end{bmatrix}\begin{bmatrix} 5 & -2 \\ -2 & 8 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \vec{x}^TA\vec{x}.
$$

Eigenvalues and eigenvectors. The characteristic polynomial is

$$
\det(\lambda I - A) = (\lambda - 5)(\lambda - 8) - 4 = \lambda^2 - 13\lambda + 36 = (\lambda - 4)(\lambda - 9),
$$

so $\lambda = 4$ and $\lambda = 9$. (Audit: $4 + 9 = 13 = \operatorname{tr}(A)$; $4 \cdot 9 = 36 = 40 - 4 = \det(A)$. Both pass.) For $\lambda = 4$: the system $(4I - A)\vec{x} = \vec{0}$ has matrix $\left[\begin{smallmatrix} -1 & 2 \\ 2 & -4 \end{smallmatrix}\right]$, one equation $x_1 = 2x_2$, eigenvector $(2, 1)$; normalized,

$$
\vec{w}_1 = \begin{bmatrix} \tfrac{2}{\sqrt5} \\[2pt] \tfrac{1}{\sqrt5} \end{bmatrix}.
$$

For $\lambda = 9$: the matrix $\left[\begin{smallmatrix} 4 & 2 \\ 2 & 1 \end{smallmatrix}\right]$ gives $x_2 = -2x_1$, eigenvector $(1, -2)$, or its negative $(-1, 2)$, and the choice of sign is not idle, as the next paragraph explains; normalized,

$$
\vec{w}_2 = \begin{bmatrix} -\tfrac{1}{\sqrt5} \\[2pt] \tfrac{2}{\sqrt5} \end{bmatrix}.
$$

(The two eigenvectors are orthogonal, $\vec{w}_1 \bullet \vec{w}_2 = -\tfrac{2}{5} + \tfrac{2}{5} = 0$, exactly as Theorem 6.20(2) promised for a symmetric matrix.)

The orthogonal change of variables. Assemble

$$
P = \begin{bmatrix} \tfrac{2}{\sqrt5} & -\tfrac{1}{\sqrt5} \\[2pt] \tfrac{1}{\sqrt5} & \tfrac{2}{\sqrt5} \end{bmatrix} = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}, \qquad \theta = \tan^{-1}\!\big(\tfrac12\big),
$$

an honest rotation matrix: $\det P = \tfrac{4}{5} + \tfrac{1}{5} = +1$, and its columns match the rotation template with $\cos\theta = \tfrac{2}{\sqrt5}$, $\sin\theta = \tfrac{1}{\sqrt5}$. Here is where the sign choice for $\vec{w}_2$ paid off: taking $(1,-2)/\sqrt5$ instead would have produced $\det P = -1$, a reflection, still orthogonal, still diagonalizing, but not a rotation of the axes, which is what the problem requests. With $P$ orthogonal, the change of variables and its inverse read

$$
\vec{x} = P\vec{y}, \qquad \vec{y} = P^{-1}\vec{x} = P^T\vec{x} = \begin{bmatrix} \tfrac{2}{\sqrt5} & \tfrac{1}{\sqrt5} \\[2pt] -\tfrac{1}{\sqrt5} & \tfrac{2}{\sqrt5} \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix},
$$

writing $\vec{y} = (x', y')$ for the rotated coordinates.

The new equation. By the principal axes theorem,

$$
\vec{x}^TA\vec{x} = \vec{y}^TD\vec{y} = \begin{bmatrix} x' & y' \end{bmatrix}\begin{bmatrix} 4 & 0 \\ 0 & 9 \end{bmatrix}\begin{bmatrix} x' \\ y' \end{bmatrix} = 4(x')^2 + 9(y')^2,
$$

so the equation $5x^2 - 4xy + 8y^2 - 36 = 0$ becomes

$$
4(x')^2 + 9(y')^2 - 36 = 0, \qquad\text{i.e.}\qquad \frac{(x')^2}{3^2} + \frac{(y')^2}{2^2} = 1,
$$

an ellipse, semi-axis $3$ along the $\vec{w}_1$ direction and $2$ along $\vec{w}_2$. In the original coordinates the same curve is the tilted ellipse whose axes lie along the eigenvector lines $y = \tfrac12 x$ and $y = -2x$; the rotation through $\theta = \tan^{-1}(\tfrac12) \approx 26.57°$ swings those axes onto the coordinate cross, which is precisely what "eliminating the $xy$-term" means geometrically. For explicitness, the substitution $\vec{x} = P\vec{y}$ unpacks to

$$
x = \frac{2x' - y'}{\sqrt5}, \qquad y = \frac{x' + 2y'}{\sqrt5}
$$

(a transcription of this example in circulation prints the second denominator as $\sqrt2$; both denominators are $\sqrt5$, as the columns of $P$ dictate), and a patient reader may confirm by direct substitution that $5x^2 - 4xy + 8y^2$ collapses to $4(x')^2 + 9(y')^2$, the cross terms cancelling to the coefficient $0$, as the theorem promised in general. $\square$

The sign pattern of the eigenvalues is a complete classifier of the central conic $\lambda_1 (x')^2 + \lambda_2 (y')^2 = k$ ($k > 0$): both positive gives an ellipse, opposite signs a hyperbola, and one zero a degenerate pair of parallel lines. The eigenvalues of a $2\times 2$ symmetric matrix read off the shape of the conic at a glance, the geometry of the curve encoded in the spectrum of its matrix.

## 6. Retrospect

The chapter began with a question inherited from Chapter 5, when does an operator have a basis in which its matrix is diagonal, and answered it in widening circles. An eigenvector is a direction the operator merely scales; the scalings are the roots of the characteristic polynomial $\det(\lambda I - A)$, at most $n$ of them, summing to the trace and multiplying to the determinant; the eigenvectors for each are the null space of $\lambda I - A$. Diagonalizability is the existence of $n$ independent eigenvectors, equivalently the summing of the eigenspace dimensions to $n$; distinct eigenvalues force independence and hence suffice (but are not necessary), while a repeated eigenvalue diagonalizes only if its eigenspace is large enough to pay its multiplicity, the failure of which is the entire content of the standard non-diagonalizable example. The diagonalizing matrix is built columnwise from eigenvectors, and it renders matrix powers trivial. For the symmetric matrices, everything improves at once: their eigenvalues are all real, their eigenspaces mutually orthogonal, and the spectral theorem delivers not just a diagonalizing basis but an orthonormal one, orthogonal diagonalizability being, exactly and only, symmetry. The theory pays its final dividend in the principal axes theorem, which rotates the coordinate frame to strip a quadratic form of its cross terms and lay bare the conic or quadric beneath.

A reader wishing to certify ownership should be able to reconstruct, unaided: why eigenvectors must be nonzero while eigenvalues may vanish, and how the latter signals singularity; the rearrangement $A\vec{x} = \lambda\vec{x} \Leftrightarrow (\lambda I - A)\vec{x} = \vec{0}$ and the role of the equivalence theorem in producing the characteristic equation; the trace–sum and determinant–product identities and their use as audits; the difference between Example 6.5 (double root, two-dimensional eigenspace, diagonalizable) and Example 6.6 (double root, one-dimensional eigenspace, not); the column computation behind $AP = PD$ and the constructive reading of the diagonalization theorem; the apply-$A$-and-subtract argument for independence across distinct eigenvalues; the collapse $A^k = PD^kP^{-1}$; the columns-orthonormal characterization of orthogonal matrices and the $\vec{v}_1^TA\vec{v}_2$ argument proving symmetric eigenvectors orthogonal; the full orthogonal diagonalization of Example 6.22, Gram–Schmidt within the repeated eigenspace included; and the substitution $\vec{x} = P\vec{y}$ turning $\vec{x}^TA\vec{x}$ into $\sum\lambda_iy_i^2$, with Example 6.25's rotation through $\tan^{-1}(\tfrac12)$ and its ellipse as the reward. With eigenvalues in hand, the linear algebra of a single operator is complete: its action, its iterates, and, for the symmetric case, its geometry are all read from the spectrum. The subject's later chapters, and its applications across mathematics and science, build almost everything on this foundation.
