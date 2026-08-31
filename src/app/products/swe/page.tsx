import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SWEHero } from "@/components/swe/Hero";
import { SWEFeatures } from "@/components/swe/Features";
import { SWEHowItWorks } from "@/components/swe/HowItWorks";
import { SWEInstall } from "@/components/swe/Install";
import { SWEProviders } from "@/components/swe/Providers";
import { SWESafety } from "@/components/swe/Safety";
import { SWEUseCases } from "@/components/swe/UseCases";
import { SWETechStack } from "@/components/swe/TechStack";
import { SWERoadmap } from "@/components/swe/Roadmap";
import { SWECTA } from "@/components/swe/CTA";

export const metadata: Metadata = {
  title: "MenteE SWE — Autonomous Software Engineering Agent — MenteE",
  description:
    "Model-agnostic autonomous SWE agent. Investigates your repo, plans changes, edits files, verifies with your tests, and reports with evidence.",
  keywords: [
    "MenteE SWE", "SWE agent", "autonomous coding", "terminal agent",
    "AI software engineering", "@menteeai/menteeswe",
  ],
  alternates: { canonical: "https://menteeai.org/products/swe" },
  openGraph: {
    title: "MenteE SWE — Autonomous Software Engineering Agent",
    description:
      "Model-agnostic autonomous SWE agent. Investigates, edits, verifies, reports.",
    url: "https://menteeai.org/products/swe",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "MenteE SWE" }],
  },
};

export default function SWEDevicePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <SWEHero />
        <SWEFeatures />
        <SWEHowItWorks />
        <SWEInstall />
        <SWEProviders />
        <SWESafety />
        <SWEUseCases />
        <SWETechStack />
        <SWERoadmap />
        <SWECTA />
      </main>
      <Footer />
    </>
  );
}
