# FieldSim — The Gallery

Ten self-contained showcase websites, all drawn from one subject: **FieldSim**, an NFL
DFS tournament simulator (fitted outcome distributions → correlated Monte-Carlo worlds →
a 10,000-entry field → ROI against a top-heavy payout curve).

Every plate is a single static `index.html` with its own aesthetic, typography, and
interactive centerpiece. **No shared code, no frameworks, no stock assets — every visual
is computed live from the statistics it describes.** Designed & built by Claude Fable 5.

| № | Route | Title | The idea | The look | Signature interaction |
|---|-------|-------|----------|----------|----------------------|
| 01 | `/outcomes/` | **Outcome Space** | Per-player outcome distributions (the marginal) | Abyssal dark, Newsreader italic + IBM Plex Mono, leverage-green tail | 42k Three.js particles form a probability density; each grain keeps a fixed quantile *u*, so shape morphs are rank-preserving remaps. Cursor = percentile scrubber + 3D repeller; click draws an outcome. Adapted from the [Glyph Foundry build guide](https://fable-25.netlify.app/glyph/guide/), letter → distribution. |
| 02 | `/monte-carlo/` | **Fifty Thousand Worlds** | The Monte-Carlo simulator | Deep-space observatory, Michroma + Space Mono | Outcome rain earns a live histogram; p99 flares streak red; log-x law-of-large-numbers chart; a ρ slider that tethers QB×WR pair-rain via a Gaussian copula. |
| 03 | `/correlation/` | **The Stack Schematic** | The correlation matrix / copula | Cyanotype blueprint, Big Shoulders + Caveat annotations | Drag any player node ±2.5σ and every other node answers with E[z_j\|z_i] = ρ·z_i along real stack wires; hoverable ρ heatmap; drawing title block. |
| 04 | `/leverage/` | **Chalk & Leverage** | Ownership vs ROI (leverage) | Bone-white Swiss kinetic, Anton + Inter Tight, green/amber duality | An ownership seesaw calibrated to +58% ROI at 3% owned / −31% at 35%; ten decile panels that each print a negative own→ROI slope; manifesto tapes. |
| 05 | `/payout/` | **The Payout Cliff** | The top-heavy GPP payout curve | Alpine topo map, Bricolage Grotesque, contour paper | A 520svh scroll-flight along wireframe prize terrain from rank 10,000 to the №1 summit flag, with a live rank/prize altimeter and waypoint camps. |
| 06 | `/field/` | **The Ten-Thousand** | The field generator + exposure calibration | Warm textile (linen/indigo/madder), Instrument Serif + DM Mono | A jacquard loom weaves the field lineup-by-lineup with a real feedback-controlled sampler; a live thread inventory shows every player inside the min(2pts, 15%) tolerance band. |
| 07 | `/tails/` | **Not Normal** | Right-skewed shifted lognormal marginals | Risograph zine: riso blue × fluoro orange overprint, Syne | Misregistered two-ink density plates (pointer drifts the orange "reality" plate off the blue normal), halftone quantile ladder, house fitting recipe. |
| 08 | `/showdown/` | **Captain Theory** | The Showdown/Captain-Mode engine | Stadium night broadcast, Chakra Petch, floodlights + LED ticker | The captain dial: tap a player, his points AND salary ×1.5 — captaining Allen commits exactly $50,000, every dollar of the cap. Doctrine cards from the real engine. |
| 09 | `/duplication/` | **The Duplication Tax** | Size-biased Poisson duplication | Thermal receipt on a graphite desk, Unbounded + Courier Prime | A receipt that reprints per build style: λ, copies = λ/(1−e^−λ), prize split, chalk-tax stamp, and the three conservation laws. |
| 10 | `/terminal/` | **The Simulation Terminal** | The whole engine as an instrument | Green phosphor CRT, scanlines, IBM Plex Mono | A working shell: boots, repairs a matrix to PSD, runs 10,000 real Monte-Carlo draws in-browser, prints an ASCII histogram + ROI board. Type `help`. |

`/` is the gallery index tying all ten together in FieldSim's own design language
(Archivo + Spline Sans Mono, leverage-green/chalk-amber).

## Process

Each plate went through **three or more screenshot-driven iteration passes** (desktop
composition → interaction/statistical correctness → mobile), reviewed in a real browser.
Several passes fixed *statistical* bugs, not just visual ones — infeasible exposure
targets, a self-compositing weave smear, a payout model that disagreed with its own
hero copy — because on these pages the math **is** the design.

## Serving

Pure static files — any static host works. `python3 -m http.server` locally, or Render
static site (see `render.yaml`).
