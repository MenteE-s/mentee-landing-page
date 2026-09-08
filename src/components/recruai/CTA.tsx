import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function RecruAICTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="rounded-3xl bg-neutral-900 px-8 py-16 text-center text-white sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">RecruAI is live — by MenteE</h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-300">AI hiring and interview platform built for Pakistan and expanding across the Gulf. Job seekers, organizations, and hiring managers — the platform is open.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition-transform hover:scale-105">Get in touch</Link>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">See all products</Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
