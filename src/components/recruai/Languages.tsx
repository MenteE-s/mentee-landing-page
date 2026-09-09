import { Reveal } from "@/components/Reveal";

export function RecruAILanguages() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Global &amp; Multilingual — Coming Soon</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                Built for 7 countries today,
                <br />
                <span className="text-neutral-400">ready for every language tomorrow</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                RecruAI today serves Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain with
                English-first, Gulf-tuned matching — ATS scoring, keyword suggestions and mock interviews tuned
                for each market. Next, we&apos;re rolling out dedicated language support for{" "}
                <strong className="font-semibold text-neutral-900">Arabic, Urdu and more</strong> — so job
                seekers and organizations in every Gulf and Asian market can search, rewrite CVs, and practice
                interviews in their own language.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["English — Live", "العربية — Coming soon", "اردو — Coming soon", "More languages — On the way"].map((l) => (
                  <span key={l} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 rounded-3xl bg-neutral-900 p-6 text-white sm:p-8">
              <p className="text-sm font-semibold text-white">For other countries too</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-300">
                We&apos;re expanding beyond the Gulf — every new country gets specially tailored language
                support, localized job matching and CV optimization. Your market, your language, your perfect job.
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-neutral-500">Future-ready • Localized • Inclusive</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
