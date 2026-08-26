import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Embed Models — mentee-embed Model Card",
  description:
    "mentee-embed-v3 and mentee-embed-v1: open multilingual text embedding models for Arabic, English and Urdu trained entirely from scratch. 41M params, 384-dim, Apache 2.0. Load with transformers AutoModel.",
  keywords: [
    "mentee-embed-v3",
    "mentee-embed",
    "multilingual text embeddings",
    "Arabic embedding model",
    "Urdu embedding model",
    "sentence embeddings",
    "transformers AutoModel",
    "HuggingFace",
    "Apache 2.0",
    "MenteE AI",
    "menteeai.org",
  ],
  alternates: { canonical: "https://menteeai.org/embed-models" },
  openGraph: {
    title: "mentee-embed — Multilingual Embedding Models | MenteE AI",
    description:
      "Open embedding models for Arabic, English and Urdu. mentee-embed-v3: 41M params, 384-dim, Protocol A MRR@10 0.655. Load in 3 lines with transformers.",
    url: "https://menteeai.org/embed-models",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "mentee-embed model card" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "mentee-embed — Open Multilingual Embedding Models",
    description: "Arabic, English and Urdu embeddings trained from scratch. 41M params, Apache 2.0.",
    images: ["/MenteE.png"],
  },
};

export default function EmbedModelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
