import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — mentee-embed & Adaptive Cognitive Processing | MenteE AI",
  description:
    "Open research from MenteE AI: mentee-embed v1–v4 (41M trilingual embedding models for Arabic, English and Urdu trained from scratch) and Think While You Speak (adaptive computational effort, NumPy-only). Full benchmarks, ablations, honest limitations.",
  keywords: [
    "mentee-embed research",
    "mentee-embed-v3",
    "mentee-embed-v4",
    "multilingual embeddings from scratch",
    "Arabic embedding model",
    "Urdu embedding model",
    "knowledge distillation",
    "MRR@10",
    "MS-MARCO",
    "MIRACL",
    "Think While You Speak",
    "adaptive cognitive processing",
    "adaptive computation",
    "test-time compute",
    "routing",
    "MenteE AI",
    "menteeai.org",
  ],
  alternates: { canonical: "https://menteeai.org/research" },
  openGraph: {
    title: "Research — mentee-embed & Adaptive Cognitive Processing | MenteE AI",
    description:
      "Trilingual embeddings trained from scratch (v1–v4) and a memory-aware architecture that decides when to think. Full benchmarks, ablations and honest limitations.",
    url: "https://menteeai.org/research",
    type: "article",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "MenteE AI Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MenteE AI Research — mentee-embed & Adaptive Cognitive Processing",
    description:
      "Trilingual embeddings trained from scratch. A model that learns when to think. Full benchmarks and ablations.",
    images: ["/MenteE.png"],
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
