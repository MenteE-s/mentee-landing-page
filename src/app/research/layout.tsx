import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — mentee-embed Technical Report",
  description:
    "Full technical report for mentee-embed-v1 and mentee-embed-v3: 41M trilingual embedding models for Arabic, English and Urdu trained from scratch. Benchmarks, training pipeline, honest gaps. DOI 10.5281/zenodo.22117673.",
  keywords: [
    "mentee-embed research",
    "mentee-embed-v3",
    "multilingual embeddings from scratch",
    "Arabic embedding model",
    "Urdu embedding model",
    "knowledge distillation",
    "MRR@10",
    "MS-MARCO",
    "MIRACL",
    "MenteE AI",
    "menteeai.org",
    "Syed Syab Ahmad",
  ],
  alternates: { canonical: "https://menteeai.org/research" },
  openGraph: {
    title: "Research — mentee-embed Technical Report | MenteE AI",
    description:
      "41M trilingual embedding models trained from scratch for Arabic, English and Urdu. Full benchmarks, training details and honest evaluation. v1: 0.585 MRR@10 · v3: 0.655 MRR@10.",
    url: "https://menteeai.org/research",
    type: "article",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "MenteE AI Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "mentee-embed Technical Report — MenteE AI",
    description:
      "41M trilingual embedding models trained from scratch. Full benchmarks for Arabic, English and Urdu.",
    images: ["/MenteE.png"],
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
