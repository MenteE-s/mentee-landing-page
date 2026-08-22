import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ResearchTeaser } from "@/components/ResearchTeaser";
import { WhatWeBuild } from "@/components/WhatWeBuild";
import { Capabilities } from "@/components/Capabilities";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { NotificationBubble } from "@/components/NotificationBubble";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <ResearchTeaser />
        <WhatWeBuild />
        <Capabilities />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <NotificationBubble />
    </>
  );
}
