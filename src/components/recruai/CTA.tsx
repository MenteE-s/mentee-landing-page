import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function RecruAICTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] bg-neutral-900 px-8 py-12 text-white sm:px-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready to Find Your Perfect Job?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
              Join Pakistan&apos;s fastest-growing job portal — expanding across the Gulf &amp; Asia. Optimize your CV, get
              matched, and get hired. Start free forever.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">For Job Seekers</h3>
              <p className="mt-2 text-sm text-neutral-300">Find jobs in Pakistan &amp; Gulf + optimize your CV with AI</p>
              <Link
                href="/contact"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-transform hover:scale-[1.02]"
              >
                Find Jobs &amp; Optimize CV
              </Link>
              <p className="mt-3 text-center text-xs text-neutral-400">Free CV review · No credit card required</p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">For Organizations</h3>
              <p className="mt-2 text-sm text-neutral-300">Revolutionize your recruitment process</p>
              <Link
                href="/contact"
                className="mt-6 flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                Schedule Demo
              </Link>
              <p className="mt-3 text-center text-xs text-neutral-400">Free trial · Custom pricing available</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-neutral-400">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Free forever plan available
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> 14-day premium trial
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> 24/7 customer support
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Cancel anytime
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
