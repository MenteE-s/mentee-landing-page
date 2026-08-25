import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | MenteE AI Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author, url: post.authorLink }],
    alternates: { canonical: `https://menteeai.org/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://menteeai.org/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author, url: post.authorLink },
    publisher: { "@type": "Organization", name: "MenteE AI", url: "https://menteeai.org", logo: { "@type": "ImageObject", url: "https://menteeai.org/MenteE.png" } },
    mainEntityOfPage: `https://menteeai.org/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    isPartOf: { "@type": "Blog", name: "MenteE AI Blog" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 pb-16 pt-20 md:pt-28">
          <Link href="/blog" className="text-sm text-neutral-500 hover:text-black">
            ← Back to Blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-neutral-900 px-2.5 py-1 font-medium text-white">{post.coverLabel}</span>
            <span className="text-neutral-500">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.readTime}
            </span>
            <span className="text-neutral-400">·</span>
            <a href={post.authorLink} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-700 hover:text-black">
              {post.author}
            </a>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{post.excerpt}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
                {t}
              </span>
            ))}
          </div>

          <div
            className="prose prose-neutral mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-4 prose-pre:rounded-2xl prose-pre:bg-neutral-900 prose-pre:text-neutral-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
            <strong className="text-neutral-900">Cite mentee-embed-v1:</strong> Shah et al. (2026). mentee-embed: Training Competitive Multilingual Text Embeddings from Scratch for Arabic, English, and Urdu. Zenodo.{" "}
            <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              doi:10.5281/zenodo.22087139
            </a>{" "}
            · <a href="/research" className="underline underline-offset-4">Technical Report</a> ·{" "}
            <a href="/embed-models" className="underline underline-offset-4">Model Card</a> ·{" "}
            <a href="https://syab.tech" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              syab.tech
            </a>{" "}
            · <a href="https://menteeai.org" className="underline underline-offset-4">menteeai.org</a>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-neutral-100 pt-8 sm:flex-row sm:justify-between">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group text-sm">
                <span className="text-neutral-400">Previous</span>
                <p className="font-medium text-neutral-900 group-hover:underline">← {prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group text-right text-sm">
                <span className="text-neutral-400">Next</span>
                <p className="font-medium text-neutral-900 group-hover:underline">{next.title} →</p>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
