import { Reveal } from "@/components/Reveal";

export function Method() {
  return (
    <section id="method" className="scroll-mt-20 border-b border-neutral-100">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            The method
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Measure first. Then publish everything, including what failed.
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 text-lg leading-relaxed text-neutral-600">
            MenteE is not an AI company. It is an umbrella for research aimed
            at humanity — AI is simply where the answers can be checked today.
            We take on fields where the answer is not settled yet, build the
            smallest thing that can actually be checked, and report the result
            with the method attached. No pilots, no demos, no numbers without
            the recipe that produced them.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 border-l-2 border-neutral-200 pl-6 text-base leading-relaxed text-neutral-600 sm:pl-8">
            <p>
              <span className="font-semibold text-neutral-900">Language</span>{" "}
              first. Arabic, English and Urdu trained as three first-class
              languages, not one English model with two translations bolted on —
              because that is what every available model actually is, and
              roughly a billion people search in languages the field decided
              were edge cases.
            </p>
            <p>
              <span className="font-semibold text-neutral-900">
                Software engineering
              </span>
              , where the tools are still being worked out and nobody has agreed
              on what competent looks like.
            </p>
            <p>
              <span className="font-semibold text-neutral-900">Learning</span>.{" "}
              <span className="font-semibold text-neutral-900">
                Living systems
              </span>
              .{" "}
              <span className="font-semibold text-neutral-900">Matter</span>.{" "}
              <span className="font-semibold text-neutral-900">Medicine</span>.
              The same approach, applied to questions with more at stake and
              longer proofs.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-base leading-relaxed text-neutral-600">
            The order is not a roadmap. It is the sequence in which a small lab
            can be honest about what it can verify.
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            What it costs to work this way is public embarrassment when a run
            collapses. What it buys is the only kind of credibility that
            compounds: every MenteE project ships its method, its numbers and
            its failed runs alongside it. A lab that never reports a collapsed
            experiment is not doing research — it is doing marketing.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
