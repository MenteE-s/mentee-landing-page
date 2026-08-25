import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — MenteE AI | AI Products, mentee-embed, syab.tech & menteeai.org",
  description:
    "SEO-rich blog from MenteE AI (menteeai.org) by Syed Syab Ahmad (syab.tech): mentee-embed-v1 research, Arabic & Urdu NLP, AI products, knowledge distillation and founder stories.",
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
    title: "MenteE AI Blog — syab.tech, menteeai.org, mentee-embed",
    description: "Research, products and AI insights from MenteE AI and founder Syed Syab Ahmad (syab.tech).",
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
              Blog — MenteE, menteeai.org & syab.tech
            </h1>
            <p className="mt-4 max-w-2xl text-neutral-600">
              SEO-rich writing on <strong>MenteE AI</strong> products at <a href="https://menteeai.org" className="underline underline-offset-4">menteeai.org</a>, research like{" "}
              <a href="/research" className="underline underline-offset-4">
                mentee-embed-v1
              </a>{" "}
              (DOI 10.5281/zenodo.22087139) and founder{" "}
              <a href="https://syab.tech" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Syed Syab Ahmad — syab.tech
              </a>
              . For the model card see <a href="/embed-models" className="underline underline-offset-4">/embed-models</a>.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
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
      </main>
      <Footer />
    </>
  );
}
