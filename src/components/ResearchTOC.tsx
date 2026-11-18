"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ModelId, TocSection } from "./research/data";

export interface TocModel {
  id: ModelId;
  label: string;
  tag?: string;
}

interface Props {
  sections: TocSection[];
  activeId: string;
  onSelect: (id: string) => void;
  models: TocModel[];
  selectedModel: ModelId;
  onModelChange: (m: ModelId) => void;
}

/* ── chapters ────────────────────────────────────────────── */

function ChapterList({
  models,
  selectedModel,
  onModelChange,
  onNavigate,
}: Pick<Props, "models" | "selectedModel" | "onModelChange"> & {
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-0.5">
      {models.map((m) => {
        const isActive = m.id === selectedModel;
        return (
          <button
            key={m.id}
            onClick={() => {
              onModelChange(m.id);
              onNavigate?.();
            }}
            aria-current={isActive ? "true" : undefined}
            className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors duration-150 ${
              isActive
                ? "bg-neutral-900 font-semibold text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <span className="truncate">{m.label}</span>
            {m.tag && (
              <span
                className={`flex-shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                  isActive
                    ? "bg-white/20 text-white"
                    : m.tag === "New"
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {m.tag}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── section list ────────────────────────────────────────── */

function SectionList({
  sections,
  activeId,
  onSelect,
}: Pick<Props, "sections" | "activeId" | "onSelect">) {
  return (
    <div className="space-y-px border-l border-neutral-200">
      {sections.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            aria-current={isActive ? "true" : undefined}
            className={`-ml-px block w-full border-l-2 py-1.5 pl-3 text-left text-[13px] leading-snug transition-colors duration-150 ${
              isActive
                ? "border-neutral-900 font-medium text-neutral-900"
                : "border-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-900"
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
      {children}
    </p>
  );
}

/* ── shared content (sidebar + drawer) ───────────────────── */

function TocContent(props: Props) {
  return (
    <>
      <div className="space-y-1">
        <Eyebrow>Research</Eyebrow>
        <ChapterList
          models={props.models}
          selectedModel={props.selectedModel}
          onModelChange={props.onModelChange}
        />
      </div>

      <div className="my-4 border-t border-neutral-200" />

      <div className="space-y-1.5">
        <Eyebrow>On this page</Eyebrow>
        <SectionList
          sections={props.sections}
          activeId={props.activeId}
          onSelect={props.onSelect}
        />
      </div>
    </>
  );
}

/* ── desktop sidebar ─────────────────────────────────────── */

export function ResearchSidebar(props: Props) {
  return (
    <aside className="hidden w-60 flex-shrink-0 lg:block">
      <div className="sticky top-24">
        <TocContent {...props} />
      </div>
    </aside>
  );
}

/* ── mobile sticky header ────────────────────────────────── */

export function ResearchMobileHeader(props: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSelect(id: string) {
    props.onSelect(id);
    setDrawerOpen(false);
  }

  function handleModelChange(m: ModelId) {
    props.onModelChange(m);
    setDrawerOpen(false);
  }

  const activeModel = props.models.find((m) => m.id === props.selectedModel);
  const activeSection = props.sections.find((s) => s.id === props.activeId)?.label ?? "";

  return (
    <div className="lg:hidden">
      {/* Sticky bar */}
      <div className="sticky top-16 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            Contents
          </button>
          <span className="truncate text-[11px] text-neutral-400">
            {activeModel?.label}
            {activeSection ? ` · ${activeSection}` : ""}
          </span>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-neutral-200 bg-white p-4 shadow-xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Contents
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <TocContent
                {...props}
                onModelChange={handleModelChange}
                onSelect={handleSelect}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
