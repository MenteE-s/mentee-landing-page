import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — MenteE AI",
  description:
    "Insights from MenteE AI: product updates, research behind mentee-embed-v1, and notes on building AI platforms for Arabic, English and Urdu — from the team at menteeai.org and founder Syed Syab Ahmad.",
  keywords: [
    "MenteE AI blog",
    "menteeai.org",
    "syab.tech",
    "Syed Syab Ahmad",
    "mentee-embed",
    "multilingual embeddings",
    "Arabic NLP",
    "Urdu NLP",
    "AI products",
  ],
  alternates: { canonical: "https://menteeai.org/blog" },
  openGraph: {
    title: "MenteE AI Blog",
    description: "Product updates, research and founder notes from MenteE AI.",
    url: "https://menteeai.org/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">MenteE AI · Blog</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              Product updates, research notes and building in public — from the{" "}
              <strong>MenteE AI</strong> team. Read the{" "}
              <a href="/research" className="underline underline-offset-4">
                technical report
              </a>{" "}
              and{" "}
              <a href="/embed-models" className="underline underline-offset-4">
                model card
              </a>{" "}
              for mentee-embed-v1, or explore work by founder{" "}
              <a href="https://syab.tech" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Syed Syab Ahmad
              </a>
              .
            </p>
          </Reveal>
        </section>

        {/* Featured post */}
        {(() => {
          const featured = posts[0];
          const rest = posts.slice(1);
          return (
            <>
              <section className="mx-auto max-w-6xl px-6 pb-10">
                <Reveal>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group grid overflow-hidden rounded-2xl border border-neutral-200 bg-white md:grid-cols-5"
                  >
                    <div className="flex flex-col p-8 md:col-span-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">Featured</span>
                        <span className="text-neutral-500">
                          {new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {featured.readTime}
                        </span>
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold leading-tight text-neutral-900 group-hover:underline underline-offset-4 sm:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{featured.excerpt}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {featured.tags.map((t) => (
                          <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-6 inline-flex items-center text-sm font-medium text-neutral-900">
                        Read article <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                    <div className="hidden bg-neutral-50 p-8 md:col-span-2 md:flex md:flex-col md:justify-center">
                      <p className="text-sm font-medium text-neutral-900">Published Research</p>
                      <p className="mt-2 text-sm text-neutral-600">mentee-embed-v1 preprint — Zenodo DOI 10.5281/zenodo.22087139</p>
                      <div className="mt-4 h-px bg-neutral-200" />
                      <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">By {featured.author}</p>
                    </div>
                  </Link>
                </Reveal>
              </section>

              <section className="mx-auto max-w-6xl px-6 pb-20">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500">Latest articles</h3>
                  <span className="text-xs text-neutral-400">{rest.length} articles</span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 0.06}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-900"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">{p.coverLabel}</span>
                          <span className="text-neutral-500">{new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {p.readTime}</span>
                        </div>
                        <h2 className="mt-4 line-clamp-3 text-lg font-semibold leading-snug text-neutral-900 group-hover:underline underline-offset-4">
                          {p.title}
                        </h2>
                        <p className="mt-3 line-clamp-3 flex-1 text-sm text-neutral-600">{p.excerpt}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </section>
            </>
          );
        })()}
      </main>
      <Footer />
    </>
  );
}
