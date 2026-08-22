import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Approach } from "@/components/Approach";
import { Capabilities } from "@/components/Capabilities";
import { ResearchTeaser } from "@/components/ResearchTeaser";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Approach />
        <Capabilities />
        <ResearchTeaser />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
