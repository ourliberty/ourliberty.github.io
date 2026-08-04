---
title: |-
  A Cleaner Proxy for Classification-Based Investing
excerpt: 'Maximizing the risk-adjusted return of classification model-based investments(2026)'
date: '2026-08-03'
category: study
subcategory: computer-science
keywords: ['machine learning', 'quantitative finance', 'paper review', 'backtesting']
---

On "Maximizing the risk-adjusted return of classification model-based investments" (Yang and Chang, 2026).

## 1.

The setup comes from a familiar complaint. In equal-weight, classification-based investing, what you train on (likelihood) isn't what you actually care about (risk-adjusted return). Yang and Chang try to close that gap by mapping precision onto expected return and the positive prediction rate (ppr) onto risk, the latter through a diversification argument, and Eq. (4) does the mapping for the return side. From there they rewrite the training objective as 'maximize precision subject to ppr ≥ mpr,' and implement it in TFCO by minimizing false-positive proportion, with mpr fixed at 5%. Tested on US stocks from 1995 to 2024, across four architectures (ANN, CNN, LSTM, TF) and net of a 0.2% round-trip cost, the framework reports an average Sharpe of 7.5 and beats the same architectures trained on likelihood (the Standard models) across the board.

## 2. 

There are three things I'd defend without qualification. The metric-to-outcome mapping is genuinely clean and, unlike a lot of work in this space, interpretable ..:) The backtest hygiene is above average. Delisted names are kept in the CRSP universe so survivorship bias is handled, the 4-year sliding window gives 30 non-overlapping out-of-sample years, costs are applied, and significance is checked with a nonparametric Wilcoxon test rather than assumed. And the in-sample edge is real: on ADR and SR the Proposed model beats Standard in every one of the 30 years (the † in Table 6, where the test statistic hits 0).

## 3.

The headline number and the 'we lower risk & optimize directly' framing are both stated a bit more strongly than the paper's own data will carry. And the cracks aren't really separate. They all trace back to one fact… the fact that the model makes its money by loading up on high-volatility, high-friction, and already-known-anomaly stocks.

Where does the return come from?

The factor decomposition in §4.5 has rfp_gradient negative in every case, which the authors read (correctly) as the trained model preferring stocks with wider return dispersion than a random pick would. The trouble is that this is exactly the corner of the market where trading costs bite hardest. The universe screens out only names below $100k in 20-day average dollar volume, which still lets small and micro-caps through. The simulation then assumes no price impact while buying 122–259 stocks at the close and selling at the next open every single day. Layer on the well-documented fact that the overnight anomaly lives disproportionately in small, illiquid, high-volatility stocks, and the Sharpe of 7.5 starts to look like a number that only survives with the frictions switched off.

The abstract and Fig. 1 say ppr governs risk through diversification, but the actual comparison runs the other way. The Proposed model has lower ppr than Standard (so it holds fewer stocks) and daily volatility roughly 1.4 to 2 times higher. Given $\mathrm{SR} = (\mathrm{ADR} - r_f)/\mathrm{DV} \times \sqrt{252}$ and a DV that went up, the Sharpe improvement can only be coming from ADR, from the return side, by construction. The authors' defense is that MDD dropped significantly (the \* in Table 6), so the extra volatility must be upside. But MDD is precisely the metric you should trust least in a frictionless, loosely-screened backtest: realized drawdowns on illiquid, high-vol names will run worse than the simulation shows once slippage is real, so the same friction argument eats the MDD defense. And underneath all of this, the ppr → risk channel is never cleanly identified anywhere in the paper. Moving from Standard to Proposed changes ppr and the selected stocks at the same time, so you can't isolate the diversification effect from everything else. The honest version of the claim isn't 'mpr minimizes risk'. It's 'mpr keeps diversification from collapsing entirely.'

The $r = 0.88$ between precision and return is alignment, not causation, and the alignment is partly carried by a confounder. Two things to keep in mind. First, the 240 points are 8 models × 30 years pooled together, which mixes within-year variation (across models) with between-year variation (market regime). If good regimes lift both precision and returns, you'd get a strong correlation with no causal mechanism behind it, so the nominal $p \approx 1.42 \times 10^{-78}$ deserves a heavy discount. Second, as §4.5 shows, part of the co-movement comes not from predicting better but from holding more volatile stocks. Push precision harder and you amplify the very volatility loading that props up the correlation, which is Goodhart's recursion in miniature. The paper shows the total effect stays positive in sample (base + rtp offsetting the negative rfp), but that's an after-the-fact observation, not a guarantee that optimizing toward the proxy won't eventually break the link it depends on.

## 4. 

Therefore, direct optimization is mostly rhetoric. **What the loss actually differentiates is precision under a ppr constraint, not Sharpe.** The paper hasn't removed the proxy.. it has swapped one (likelihood) for a better-aligned one (precision). If anything, the SDF-based work that puts Sharpe straight into the loss (Kelly et al. [33]) is the more direct approach. The accurate phrasing would be 'optimization through a proxy that's better aligned with the financial objective.'

The 1% threshold versus the 0.2% cost. The class boundary is a 1% overnight return, but the round-trip cost is only 0.2%. So any stock returning between 0.2% and 1% is profitable yet gets labeled class 0, which means precision (the fraction clearing 1%) doesn't line up perfectly with profitability. In principle a lower-precision model that scoops up a lot of names just under the line could out-earn a higher-precision one. The intercept term $E[\,\mathrm{or} \mid \hat{y}=1,\, y=0\,]$ in Eq. (4) absorbs some of this, but with no sensitivity analysis on why the threshold is 1% or how much the conclusions hinge on it, the claim that precision is a faithful proxy for risk-adjusted return is looser than it reads.

## 5.

The benchmark is weak. The RL agent posts a full-period MDD of 96%, i.e. a track record that all but blew up once, and it's being held up as the stand-in for sophisticated active ML/DL strategies. The only risk knob, mpr, is pinned at 5% with no sweep or ablation, which leaves the selling point (= practitioners can dial their own risk) unsupported. On external validity, the authors' own SR uplift shrinks steadily across the decades (8.13 → 6.36 → 4.65), which fits their story that AI accessibility is eroding the alpha. And extrapolating that trend makes the case for a durable future edge weaker, not stronger. The whole thing is validated on one market, one horizon, one weighting scheme; the generality of the metric-to-performance link is claimed, not yet shown.

The conceptual move (aligning the training objective with the financial goal in classification-based investing) is elegant, and the in-sample edge over Standard is solidly established. But the size of the absolute performance, the 'we lower risk' claim, and the direct optimization framing all outrun what the data actually demand. The most accurate way to describe the contribution is not the discovery of new alpha but a training method that efficiently extracts known (high-volatility, low-liquidity) anomalies through a proxy aligned with the financial objective, with much of the reported performance tied to the in-sample, no-friction assumptions. That's still worth something… It's just a different kind of claim than the one the paper makes.
