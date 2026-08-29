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

/* Version colour tokens */
const groupStyle: Record<string, { dot: string; badge: string; header: string }> = {
  "mentee-embed-v4": {
    dot: "bg-neutral-900",
    badge: "bg-neutral-900 text-white",
    header: "text-neutral-800",
  },
  "mentee-embed-v3": {
    dot: "bg-neutral-700",
    badge: "bg-neutral-700 text-white",
    header: "text-neutral-700",
  },
  "mentee-embed-v1": {
    dot: "bg-neutral-400",
    badge: "bg-neutral-100 text-neutral-600",
    header: "text-neutral-500",
  },
  Shared: {
    dot: "bg-neutral-300",
    badge: "bg-neutral-100 text-neutral-600",
    header: "text-neutral-500",
  },
};

/* ── model dropdown ──────────────────────────────────────── */

function ModelDropdown({
  models,
  selectedModel: selected,
  onModelChange: onChange,
}: Pick<Props, "models" | "selectedModel" | "onModelChange">) {
  return (
    <div className="px-2 pb-2">
      <label htmlFor="research-model-select" className="sr-only">
        Select model version
      </label>
      <div className="relative">
        <select
          id="research-model-select"
          value={selected}
          onChange={(e) => onChange(e.target.value as ModelId)}
          className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-neutral-900 transition-colors hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
              {m.tag ? ` — ${m.tag}` : ""}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── nav list (shared by sidebar & drawer) ───────────────── */

function NavList({ sections, activeId, onSelect, models, selectedModel, onModelChange }: Props) {
  const groups = sections.reduce<string[]>((acc, s) => {
    if (s.group !== "" && !acc.includes(s.group)) acc.push(s.group);
    return acc;
  }, []);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(groups.map((g) => [g, true]))
  );

  function toggleGroup(g: string) {
    setOpenGroups((prev) => ({ ...prev, [g]: !prev[g] }));
  }

  const standaloneItems = sections.filter((s) => s.group === "");

  return (
    <nav aria-label="Report contents" className="space-y-0.5">
      <ModelDropdown
        models={models}
        selectedModel={selectedModel}
        onModelChange={onModelChange}
      />

      {standaloneItems.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            aria-current={isActive ? "true" : undefined}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium transition-all duration-150 ${
              isActive
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <span
              className={`inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-150 ${
                isActive ? "bg-white" : "bg-neutral-300"
              }`}
            />
            {s.label}
          </button>
        );
      })}

      {standaloneItems.length > 0 && groups.length > 0 && (
        <div className="my-2 border-t border-neutral-200" />
      )}

      {groups.map((group) => {
        const items = sections.filter((s) => s.group === group);
        const isOpen = openGroups[group] ?? true;
        const groupHasActive = items.some((s) => s.id === activeId);
        const style = groupStyle[group] ?? groupStyle["Shared"];

        return (
          <div key={group} className="mb-0.5">
            <button
              onClick={() => toggleGroup(group)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1 text-left transition-all duration-150 ${
                groupHasActive ? "bg-neutral-100" : "hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`inline-block h-2 w-2 flex-shrink-0 rounded-sm ${style.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest truncate ${style.header}`}>
                  {group}
                </span>
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="inline-block flex-shrink-0 text-[9px] text-neutral-400 ml-1"
              >
                ▶
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-neutral-100 pb-1 pl-2.5">
                    {items.map((s) => {
                      const isActive = s.id === activeId;
                      return (
                        <button
                          key={s.id}
                          onClick={() => onSelect(s.id)}
                          aria-current={isActive ? "true" : undefined}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-all duration-150 ${
                            isActive
                              ? "bg-neutral-900 font-semibold text-white shadow-sm"
                              : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                          }`}
                        >
                          <span
                            className={`inline-block h-1 w-1 flex-shrink-0 rounded-full transition-colors duration-150 ${
                              isActive ? "bg-white" : "bg-neutral-300"
                            }`}
                          />
                          <span className="truncate leading-snug">{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

/* ── Desktop sidebar ─────────────────────────────────────── */

export function ResearchSidebar(props: Props) {
  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-24">
        <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
          <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Report
          </p>
          <NavList {...props} />
        </div>
      </div>
    </aside>
  );
}

/* ── Mobile sticky header (renders OUTSIDE flex) ─────────── */

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

  const activeLabel = props.sections.find((s) => s.id === props.activeId)?.label ?? "";

  return (
    <div className="lg:hidden">
      {/* Sticky bar — full width, not inside flex */}
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
          <span className="text-[11px] text-neutral-400 truncate">{activeLabel}</span>
        </div>
      </div>

      {/* Drawer overlay */}
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
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Report</p>
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
              <NavList {...props} onSelect={handleSelect} onModelChange={handleModelChange} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
