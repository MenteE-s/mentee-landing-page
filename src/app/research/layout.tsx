import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research — MenteE AI",
  description:
    "mentee-embed-v1: a 41M-parameter multilingual embedding model for Arabic, English, and Urdu — trained from scratch, benchmarks included.",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
