"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ResearchSidebar, ResearchMobileHeader } from "@/components/ResearchTOC";
import { ChapterBanner } from "./shared";
import { modelsMeta, modelSections, sharedSections, type ModelId } from "./data";
import { Overview } from "./Overview";
import { V1Approach, V1ProtocolA, V1ProtocolB, V1Efficiency, V1Strengths, V1Limitations } from "./V1Chapter";
import { V3Approach, V3Benchmarks, V3KeyFinding, V3Strengths, V3Limitations } from "./V3Chapter";
import { V4Approach, V4Benchmarks, V4Speed, V4Strengths, V4Limitations } from "./V4Chapter";
import {
  AcpApproach,
  AcpResults,
  AcpRouting,
  AcpAblation,
  AcpStrengths,
  AcpLimitations,
  AcpRoadmap,
  AcpReproduction,
} from "./AcpChapter";
import { Roadmap } from "./Roadmap";
import { Reproduction } from "./Reproduction";

const chapterMeta: Record<ModelId, { version: string; label: string }> = {
  acp: { version: "New preprint", label: "Think While You Speak — Adaptive Cognitive Processing" },
  v4: { version: "v4", label: "mentee-embed-v4" },
  v3: { version: "v3", label: "mentee-embed-v3" },
  v1: { version: "v1", label: "mentee-embed-v1" },
};

const chapterComponents: Record<ModelId, React.ReactNode> = {
  acp: (
    <>
      <AcpApproach />
      <AcpResults />
      <AcpRouting />
      <AcpAblation />
      <AcpStrengths />
      <AcpLimitations />
    </>
  ),
  v4: (
    <>
      <V4Approach />
      <V4Benchmarks />
      <V4Speed />
      <V4Strengths />
      <V4Limitations />
    </>
  ),
  v3: (
    <>
      <V3Approach />
      <V3Benchmarks />
      <V3KeyFinding />
      <V3Strengths />
      <V3Limitations />
    </>
  ),
  v1: (
    <>
      <V1Approach />
      <V1ProtocolA />
      <V1ProtocolB />
      <V1Efficiency />
      <V1Strengths />
      <V1Limitations />
    </>
  ),
};

function isModelId(m: string | null): m is ModelId {
  return m === "acp" || m === "v4" || m === "v3" || m === "v1";
}

export function ResearchPage() {
  const [selectedModel, setSelectedModel] = useState<ModelId>("acp");
  const [activeSection, setActiveSection] = useState("overview");

  /* Deep link: /research?model=acp | v4 | v3 | v1 */
  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("model");
    if (isModelId(m)) setSelectedModel(m);
  }, []);

  /* Keep the URL shareable when the chapter changes. */
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("model", selectedModel);
    window.history.replaceState(null, "", url.toString());
  }, [selectedModel]);

  const sections = useMemo(() => {
    const tail =
      selectedModel === "acp"
        ? []
        : sharedSections.filter((s) => s.id !== "overview");
    return [
      ...sharedSections.filter((s) => s.id === "overview"),
      ...modelSections[selectedModel],
      ...tail,
    ];
  }, [selectedModel]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  function handleTocClick(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleModelChange(m: ModelId) {
    if (m === selectedModel) return;
    setSelectedModel(m);
    setActiveSection(modelSections[m][0]?.id ?? "overview");
    requestAnimationFrame(() => {
      document
        .getElementById(`chapter-${m}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const chapter = chapterMeta[selectedModel];

  const tocProps = {
    sections,
    activeId: activeSection,
    onSelect: handleTocClick,
    models: modelsMeta,
    selectedModel,
    onModelChange: handleModelChange,
  };

  return (
    <>
      <ReadingProgress />
      <Navbar />

      {/* Mobile sticky header — full width, outside flex */}
      <ResearchMobileHeader {...tocProps} />

      <main className="flex-1 bg-neutral-50/50">
        <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-4 lg:pt-28">
          <div className="flex gap-6 lg:gap-8">
            {/* Desktop sidebar — hidden below lg */}
            <ResearchSidebar {...tocProps} />

            {/* Main content — full width on mobile */}
            <div className="min-w-0 flex-1">
              <div className="mx-auto max-w-3xl">
                <Overview model={selectedModel} />

                <div id={`chapter-${selectedModel}`} className="mt-16 scroll-mt-28 lg:mt-20">
                  <ChapterBanner version={chapter.version} label={chapter.label} />
                </div>
                {chapterComponents[selectedModel]}

                {selectedModel === "acp" ? (
                  <>
                    <AcpRoadmap />
                    <AcpReproduction />
                  </>
                ) : (
                  <>
                    <Roadmap />
                    <Reproduction />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-[1400px] px-4 py-5">
            <p className="text-[11px] leading-relaxed text-neutral-400">
              MenteE AI · Open research · mentee-embed: trilingual embeddings
              trained from scratch (Arabic · English · Urdu) · Think While You
              Speak: adaptive computational effort, NumPy-only · Every table on
              this page is generated from the evaluation JSON in the public
              repositories.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
