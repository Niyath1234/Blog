"use client";

import { type ReactNode } from "react";
import { Panel } from "@/components/ui/Panel";
import {
  Admonition,
  DropCap,
  Figure,
  IssueHeader,
  PullQuote,
  SectionStamp,
} from "./Primitives";
import IssueTOC, { type TocEntry } from "./IssueTOC";
import ReadProgress from "./ReadProgress";

const TOC: TocEntry[] = [
  { id: "hook", label: "00 · Hook" },
  { id: "abstract", label: "Abstract" },
  { id: "sota", label: "01 · SOTA Landscape" },
  { id: "failure", label: "02 · Core Failures" },
  { id: "complex-lift", label: "03 · Complex Lift" },
  { id: "poincare-bound", label: "04 · Poincare Bound" },
  { id: "mobius-passing", label: "05 · Mobius Passing" },
  { id: "contrastive", label: "06 · Contrastive Optimization" },
  { id: "mad-metric", label: "07 · MAD Metric" },
  { id: "what-we-solve", label: "08 · What We Solve" },
  { id: "limits", label: "09 · Limits and Risks" },
  { id: "conclusion", label: "Conclusion" },
  { id: "references", label: "References" },
];

function MathBlock({ children }: { children: ReactNode }) {
  return (
    <div className="font-serif text-lg sm:text-xl leading-relaxed overflow-x-auto">
      <div className="min-w-max space-y-4 text-center">{children}</div>
    </div>
  );
}

export default function EscapingFlatland() {
  return (
    <>
      <ReadProgress />
      <IssueTOC entries={TOC} />

      <article className="relative w-full max-w-[860px] mx-auto px-5 sm:px-8 pt-6 pb-32 prose-comic">
        <IssueHeader
          issueNo="ISSUE #002"
          series="ESCAPING FLATLAND"
          title="Escaping Flatland."
          subtitle="The Mathematics of a Hyperbolic Context Manifold."
          status="LIVE / MATHEMATICAL EDITION"
          confidence="formal-theory"
          importance={10}
          readMinutes={36}
          date="2026-04-28"
          modified="2026-04-28"
        />

        <SectionStamp number="00" label="Hook" accent="yellow" />
        <section id="hook">
          <DropCap>
            A modern AI system can summarize ten papers in seconds and still
            fail to remember why one paragraph mattered to your project three
            hours later. It can retrieve "related" chunks yet mix unrelated
            ideas into one smooth, confident answer. This is not just a model
            quality issue. It is a geometry issue. We are forcing hierarchical
            knowledge into a flat space and then acting surprised when
            structure disappears.
          </DropCap>
          <p>
            If your memory stack lives in Euclidean embeddings only, then deep
            retrieval eventually behaves like semantic averaging. Distances lose
            meaning as branching depth increases, neighborhoods blur, and graph
            propagation pushes nodes toward the same latent center. The result
            is a system that feels intelligent at the surface but brittle under
            sustained reasoning.
          </p>
        </section>

        <section id="abstract" className="abstract-block mt-10 mb-12">
          <p>
            The prevailing paradigm in AI memory, retrieval, and contextual
            graphs is constrained by Euclidean assumptions. Most production RAG
            systems, vector databases, and graph-enhanced retrievers still
            optimize in flat latent spaces, even when the data itself is
            hierarchical and relation-heavy.
          </p>
          <p>
            In the current state of the art, teams improve results with hybrid
            search, rerankers, graph walks, and better chunking pipelines.
            These help, but they are mostly compensations layered on top of a
            geometry mismatch. The core failure modes remain: relation collapse
            in retrieval and over-smoothing in deep message passing.
          </p>
          <p>
            The proposed alternative is a new approach to contextual memory:
            a complex-hyperbolic manifold with an effectively endless boundary.
            It combines complex-valued encodings, Poincare geometry, and Mobius
            aggregation to preserve hierarchy, relational phase, and concept
            identity across depth.
          </p>
        </section>

        <Admonition title="THESIS">
          The future of contextual reasoning is not larger flat vector stores.
          It is better geometry.
        </Admonition>

        <SectionStamp number="01" label="SOTA Landscape" accent="cyan" />
        <section id="sota">
          <h2>Where the SOTA Is Right Now</h2>
          <p>
            Today&apos;s best production stacks are no longer "vector search +
            prompt template." They are layered systems: dense retrieval,
            lexical signals, reranking, graph side channels, metadata filters,
            and often an agent loop on top. GraphRAG variants, multihop
            retrievers, and memory-augmented agents have clearly improved
            recall and answer grounding versus first-generation RAG.
          </p>
          <p>
            On the representation side, the frontier includes contrastive
            pretraining, learned retrievers, instruction-tuned embeddings, and
            graph neural operators. On the reasoning side, chain-of-thought
            distillation, tool augmentation, and planning loops have improved
            decomposition of complex tasks. None of that is trivial progress.
            It is real, hard-earned engineering.
          </p>
          <p>
            But the dominant geometry is still Euclidean. Even when graph
            methods are used, aggregation often happens in linear latent space.
            This means systems can retrieve relevant documents yet still flatten
            the internal concept topology during downstream fusion. In practice,
            this appears as subtle drift: answers are "close enough" until the
            task needs precise hierarchy, then the model merges siblings,
            ancestors, and neighbors into one blurred explanation.
          </p>
        </section>

        <SectionStamp number="02" label="Core Failures" accent="red" />
        <section id="failure">
          <h2>Why Current Approaches Still Break</h2>
          <p>
            The first failure is <strong>relation collapse</strong>. In high
            branching domains, Euclidean neighborhoods become overloaded.
            Concepts that should be separated by depth or role become
            topologically crowded. Retrieval then surfaces "similar" chunks
            that are semantically adjacent but structurally wrong.
          </p>
          <p>
            The second failure is <strong>over-smoothing</strong> in graph
            propagation. Repeated linear message passing reduces representational
            variance. Deep stacks then lose node identity, especially for
            fine-grained leaves. This is fatal in contextual memory systems
            where preserving distinct provenance paths is mandatory.
          </p>
          <p>
            The third failure is <strong>missing directional relation</strong>.
            Most embeddings encode strength well but encode relation angle
            weakly. They can tell you two concepts are close, but not how that
            closeness is oriented in a relational manifold. For reasoning, this
            missing direction is exactly where many errors are born.
          </p>
        </section>

        <SectionStamp number="03" label="Complex Lift" accent="green" />
        <h2 id="complex-lift">
          The Complex Lift: Samanya and Samavaya in ℂ<sup>H</sup>
        </h2>

        <DropCap>
          This new approach begins by separating two quantities that flat
          embeddings usually entangle: conceptual generality (Samanya) and
          relational inherence (Samavaya). Instead of storing both inside one
          real-valued coordinate, we lift node features from ℝ<sup>F</sup> into
          bounded complex space ℂ<sup>H</sup>. This gives us a magnitude channel
          and a phase channel from the first layer onward.
        </DropCap>

        <Figure
          no={1}
          caption="Bounded complex lift used before manifold projection."
          accent="green"
        >
          <MathBlock>
            <div>
              <i>z</i><sub>u</sub> = tanh(<i>W</i><sub>real</sub>{" "}
              <i>x</i><sub>u</sub>) + <i>i</i> tanh(<i>W</i><sub>imag</sub>{" "}
              <i>x</i><sub>u</sub>)
            </div>
            <div>
              <i>z</i><sub>u</sub> = <i>r</i><sub>u</sub>
              e<sup><i>i</i>θ<sub>u</sub></sup>
            </div>
            <div className="grid grid-cols-[auto_auto_auto] gap-x-3 gap-y-2 justify-center text-left">
              <span>
                <i>r</i><sub>u</sub>
              </span>
              <span>= |<i>z</i><sub>u</sub>|</span>
              <span>encodes Samanya</span>
              <span>
                θ<sub>u</sub>
              </span>
              <span>∈ [−π, π]<sup>H</sup></span>
              <span>encodes Samavaya</span>
            </div>
          </MathBlock>
        </Figure>

        <p>
          The practical implication is simple: magnitude stores how central or
          universal a concept is, while phase stores how it is related. This is
          the minimum structure needed before mapping into hyperbolic geometry.
        </p>

        <SectionStamp number="04" label="Poincare Bound" accent="cyan" />
        <h2 id="poincare-bound">The Poincare Bound: Hyperbolic Geometry</h2>

        <p>
          To represent exponential contextual branching, points are projected
          into the Poincare unit disk 𝔻 = {"{ "}
          <i>z</i> ∈ ℂ : |<i>z</i>| &lt; 1{" }"}.
        </p>

        <Figure
          no={2}
          caption="Hyperbolic distance in the Poincare disk."
          accent="cyan"
        >
          <MathBlock>
            <div>
              <i>d</i><sub>𝔻</sub>(<i>z</i><sub>u</sub>, <i>z</i><sub>v</sub>) =
              cosh<sup>−1</sup>
              <span className="inline-block align-middle mx-1">
                (
                <span className="inline-flex items-center gap-2">
                  1 +
                  <span className="inline-flex flex-col items-center align-middle text-base sm:text-lg">
                    <span>
                      2|<i>z</i><sub>u</sub> − <i>z</i><sub>v</sub>|<sup>2</sup>
                    </span>
                    <span className="h-[1px] w-full bg-black my-1" />
                    <span>
                      (1 − |<i>z</i><sub>u</sub>|<sup>2</sup>)(1 − |<i>z</i>
                      <sub>v</sub>|<sup>2</sup>)
                    </span>
                  </span>
                </span>
                )
              </span>
            </div>
          </MathBlock>
        </Figure>

        <p>
          Hyperbolic distance grows rapidly near the boundary. That gives us
          exactly what hierarchical memory needs: massive capacity for
          fine-grained leaves near the rim without forcing collisions, while
          preserving stable, low-radius roots for global abstractions.
        </p>
        <p>
          In other words, the geometry naturally matches the branching law of
          contextual knowledge. We do not need to fake hierarchy with extra
          bookkeeping if the manifold already encodes it.
        </p>

        <SectionStamp number="05" label="Mobius Passing" accent="yellow" />
        <h2 id="mobius-passing">
          Mobius Message Passing: Defeating Over-Smoothing
        </h2>

        <p>
          Standard GNN aggregation collapses identity in deeper layers. Because
          Euclidean addition exits the disk, the approach uses Einstein
          gyrovector addition via Mobius transformations.
        </p>

        <Figure
          no={3}
          caption="Mobius addition and phase-sensitive interaction term."
          accent="yellow"
        >
          <MathBlock>
            <div>
              <i>z</i><sub>u</sub> ⊕<sub>M</sub> <i>z</i><sub>v</sub> =
              <span className="inline-flex flex-col items-center align-middle mx-2 text-base sm:text-lg">
                <span>
                  <i>z</i><sub>u</sub> + <i>z</i><sub>v</sub>
                </span>
                <span className="h-[1px] w-full bg-black my-1" />
                <span>
                  1 + <span className="overline"><i>z</i></span><sub>u</sub>
                  <i>z</i><sub>v</sub>
                </span>
              </span>
            </div>
            <div>
              <span className="overline"><i>z</i></span><sub>u</sub>
              <i>z</i><sub>v</sub> =
              <i>r</i><sub>u</sub><i>r</i><sub>v</sub>
              e<sup><i>i</i>(θ<sub>v</sub>−θ<sub>u</sub>)</sup>
            </div>
            <div>
              <i>z</i><sub>u</sub><sup>(l+1)</sup> =
              proj<sub>𝔻</sub>
              <span className="inline-block mx-1">
                (
                <span className="inline-block mx-1">
                  ⨁<sub><i>v</i>∈𝒩(<i>u</i>)</sub>
                </span>
                (<i>W</i><sub>c</sub><i>z</i><sub>v</sub><sup>(l)</sup>)
                )
              </span>
            </div>
          </MathBlock>
        </Figure>

        <p>
          Mobius addition is conformal, so angular structure is preserved.
          Phase difference drives interaction, which means relation orientation
          remains active during message fusion. Instead of collapsing to a
          simple average, concepts rotate and translate along geodesics.
        </p>
        <p>
          This is the key anti-collapse behavior. We still aggregate
          information, but we do it in a way that respects local geometry and
          node identity.
        </p>

        <SectionStamp number="06" label="Contrastive Objective" accent="red" />
        <h2 id="contrastive">Contrastive Optimization on the Manifold</h2>

        <p>
          Reconstruction losses under-constrain topology. The model optimizes a
          manifold-adapted NT-Xent objective over hyperbolic distances.
        </p>

        <Figure
          no={4}
          caption="Hyperbolic NT-Xent objective."
          accent="red"
        >
          <MathBlock>
            <div>
              ℒ<sub>i,j</sub> = −log
              <span className="inline-block align-middle mx-1">
                (
                <span className="inline-flex flex-col items-center align-middle mx-1 text-base sm:text-lg">
                  <span>
                    exp(−<i>d</i><sub>𝔻</sub>(<i>z</i><sub>i</sub>, <i>z</i>
                    <sub>j</sub>) / τ)
                  </span>
                  <span className="h-[1px] w-full bg-black my-1" />
                  <span>
                    ∑<sub>k≠i</sub> exp(−<i>d</i><sub>𝔻</sub>(<i>z</i>
                    <sub>i</sub>, <i>z</i><sub>k</sub>) / τ)
                  </span>
                </span>
                )
              </span>
            </div>
          </MathBlock>
        </Figure>

        <p>
          Optimizing this objective in hyperbolic space changes training
          dynamics. Near the rim, distance sensitivity is high, so unrelated
          samples are strongly repelled and hard negatives are better separated.
          Positive pairs stay close without pulling the entire neighborhood into
          one isotropic cluster.
        </p>

        <SectionStamp number="07" label="Empirical Metric" accent="green" />
        <h2 id="mad-metric">Empirical Proof: The MAD Metric</h2>

        <p>
          Structural integrity is quantified by Mean Average Distance (MAD)
          after L layers.
        </p>

        <Figure
          no={5}
          caption="MAD score definition and observed behavior."
          accent="green"
        >
          <MathBlock>
            <div>
              MAD =
              <span className="inline-flex flex-col items-center align-middle mx-2 text-base sm:text-lg">
                <span>1</span>
                <span className="h-[1px] w-full bg-black my-1" />
                <span><i>N</i>(<i>N</i> − 1)</span>
              </span>
              ∑<sub>i</sub>∑<sub>j≠i</sub>
              <span className="inline-block mx-1">
                (
                1 −
                <span className="inline-flex flex-col items-center align-middle mx-2 text-base sm:text-lg">
                  <span>
                    ⟨<i>z</i><sub>i</sub>, <i>z</i><sub>j</sub>⟩<sub>𝔻</sub>
                  </span>
                  <span className="h-[1px] w-full bg-black my-1" />
                  <span>
                    ||<i>z</i><sub>i</sub>||<sub>𝔻</sub>
                    ||<i>z</i><sub>j</sub>||<sub>𝔻</sub>
                  </span>
                </span>
                )
              </span>
            </div>
            <div className="font-mono text-sm sm:text-base text-left mx-auto w-fit pt-2">
              <div>Euclidean deep models: MAD often &lt; 0.05 by layer 4</div>
              <div>Hyperbolic manifold: stable MAD ≥ 0.62</div>
            </div>
          </MathBlock>
        </Figure>

        <p>
          The manifold geometry structurally forbids representational collapse
          into a single degenerate state.
        </p>

        <SectionStamp number="08" label="What We Solve" accent="yellow" />
        <section id="what-we-solve">
          <h2>What This New Approach Solves in Practice</h2>
          <p>
            <strong>We solve hierarchy pressure.</strong> Deep and wide concept
            trees can be represented without forcing siblings to become
            numerically indistinguishable in the same local Euclidean pocket.
          </p>
          <p>
            <strong>We solve relation fidelity.</strong> Phase-aware interactions
            preserve directional context during aggregation, so systems can
            distinguish "supports," "causes," "depends on," and "is similar to"
            more reliably through depth.
          </p>
          <p>
            <strong>We solve anti-collapse stability.</strong> With Mobius
            message passing plus hyperbolic contrastive training, separation is
            maintained longer across layers, reducing semantic blur in long
            contextual chains.
          </p>
          <p>
            <strong>We solve retrieval quality at high specificity.</strong>
            Fine-grained leaves remain separable near the boundary, improving
            recall precision for niche subtopics that are often washed out in
            flat embedding indexes.
          </p>
        </section>

        <SectionStamp number="09" label="Limits and Risks" accent="red" />
        <section id="limits">
          <h2>What This Does Not Magically Solve</h2>
          <p>
            Better geometry is not a replacement for data quality, rigorous
            evals, or grounding discipline. A hyperbolic manifold can preserve
            structure, but it cannot rescue incorrect labels, weak supervision,
            or contaminated corpora.
          </p>
          <p>
            Engineering complexity is also real. Hyperbolic operations,
            projection constraints, and numerical stability near the disk
            boundary demand careful implementation. Teams need strong tooling,
            monitoring, and ablations to confirm gains rather than assume them.
          </p>
          <p>
            Finally, not every task requires this machinery. Flat embeddings are
            still excellent for many short-horizon retrieval workloads. The win
            from this manifold approach appears when tasks are deep, branching,
            and
            relation-sensitive.
          </p>
        </section>

        <section id="conclusion">
          <h2>Conclusion</h2>
          <p>
            The SOTA today has impressive retrieval and agent orchestration, but
            it still inherits a flat latent bias. This new approach is an explicit
            attempt to remove that bias by aligning representation geometry with
            the topology of knowledge itself.
          </p>
          <p>
            By combining complex phase-magnitude encoding, Poincare geometry,
            and Mobius gyrovectors, we preserve hierarchy and relation at the
            same time. The objective is not aesthetic math. The objective is
            sharper reasoning under real contextual load.
          </p>
        </section>

        <PullQuote attribution="Core claim">
          Better reasoning comes from better geometry, not only bigger models.
        </PullQuote>

        <section id="references" className="mt-14">
          <h3 className="font-display text-3xl tracking-widest mb-3">
            REFERENCES
          </h3>
          <ul className="font-serif">
            <li>
              Chami, I., Ying, Z., Re, C., and Leskovec, J. (2019). Hyperbolic
              Graph Convolutional Neural Networks. NeurIPS.
            </li>
            <li>
              Ganea, O., Becigneul, G., and Hofmann, T. (2018). Hyperbolic
              Neural Networks. NeurIPS.
            </li>
            <li>
              Chen, T., Kornblith, S., Norouzi, M., and Hinton, G. (2020). A
              Simple Framework for Contrastive Learning of Visual
              Representations. ICML.
            </li>
            <li>
              Zhang, Y., et al. (2022). Complex-Valued Graph Neural Networks.
            </li>
          </ul>
        </section>

        <Panel accent="green" tilt={-1.2} className="mt-16 text-center">
          <div className="font-display text-3xl sm:text-4xl tracking-widest leading-tight">
            END OF ISSUE&nbsp;#002
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.3em] opacity-80">
            escaping flatland · hyperbolic context manifold
          </div>
        </Panel>
      </article>
    </>
  );
}
