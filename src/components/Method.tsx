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
            MenteE is an umbrella for research aimed at humanity. AI is simply
            where the answers can be checked today. We take on fields where the
            answer is not yet settled, build the smallest thing that can be
            measured, and report the result with the method attached: the
            numbers, the code, and the recipe that produced them.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 border-l-2 border-neutral-200 pl-6 text-base leading-relaxed text-neutral-600 sm:pl-8">
            <p>
              <span className="font-semibold text-neutral-900">
                Software engineering
              </span>
              , where the tooling and the standards for competent performance
              are still taking shape.
            </p>
            <p>
              <span className="font-semibold text-neutral-900">Learning</span>.{" "}
              <span className="font-semibold text-neutral-900">
                Living systems
              </span>
              .{" "}
              <span className="font-semibold text-neutral-900">Matter</span>.{" "}
              <span className="font-semibold text-neutral-900">Medicine</span>.
              The same approach, applied to questions where more is at stake and
              verification takes longer.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 text-base leading-relaxed text-neutral-600">
            The order is deliberate. It reflects the scale at which a small lab
            can work rigorously and verify its own results.
          </p>
          <p className="mt-6 text-base leading-relaxed text-neutral-600">
            Working this way means publishing collapsed runs alongside
            successful ones. That is the cost of the method, and it is also the
            reason the results can be trusted: every MenteE project ships with
            its method, its numbers, and its complete record.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
