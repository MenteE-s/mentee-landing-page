import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RecruAIHero } from "@/components/recruai/Hero";
import { RecruAIFeatures } from "@/components/recruai/Features";
import { RecruAIHowItWorks } from "@/components/recruai/HowItWorks";
import { RecruAICustomerSegments } from "@/components/recruai/CustomerSegments";
import { RecruAIFeaturedJobs } from "@/components/recruai/FeaturedJobs";
import { RecruAIPricing } from "@/components/recruai/Pricing";
import { RecruAITestimonials } from "@/components/recruai/Testimonials";
import { RecruAILanguages } from "@/components/recruai/Languages";
import { RecruAICTA } from "@/components/recruai/CTA";

export const metadata: Metadata = {
  title: "RecruAI — AI Hiring & Interview Platform by MenteE",
  description:
    "RecruAI by MenteE: AI-powered hiring and interview platform for Pakistan and the Gulf (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman). AI job matching, ATS-optimized CV rewrites, mock interviews, pipeline automation, and AI screening agents for organizations.",
  keywords: [
    "RecruAI", "MenteE", "AI hiring platform", "AI interview platform",
    "job portal Pakistan", "jobs UAE Saudi Arabia Qatar Kuwait Bahrain Oman",
    "AI job matching", "ATS scoring CV", "mock interview AI",
    "recruitment automation", "hiring pipeline software",
    "CV optimization AI", "resume builder AI", "organization hiring dashboard",
    "team hiring management", "AI screening agents",
    "post unlimited job listings", "candidate search filter",
    "interview scheduling platform", "billing analytics hiring",
    "multilingual job portal", "Arabic jobs", "Urdu jobs", "Gulf languages",
  ],
  alternates: { canonical: "https://menteeai.org/products/recruai" },
  openGraph: {
    title: "RecruAI — AI Hiring & Interview Platform by MenteE",
    description:
      "AI-powered hiring and interview platform for Pakistan and the Gulf. Job matching, CV optimization, mock interviews, pipeline automation.",
    url: "https://menteeai.org/products/recruai",
    images: [{ url: "/MenteE.png", width: 1200, height: 630, alt: "RecruAI by MenteE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecruAI — AI Hiring & Interview Platform by MenteE",
    description: "AI hiring and interview platform for Pakistan and the Gulf.",
    images: ["/MenteE.png"],
  },
};

export default function RecruAIDetailPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <RecruAIHero />
        <RecruAIFeatures />
        <RecruAIHowItWorks />
        <RecruAICustomerSegments />
        <RecruAIFeaturedJobs />
        <RecruAIPricing />
        <RecruAITestimonials />
        <RecruAILanguages />
        <RecruAICTA />
      </main>
      <Footer />
    </>
  );
}
