"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TocSection {
  id: string;
  label: string;
  group: string; // "" = standalone top-level
}

interface Props {
  sections: TocSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

/* Version colour tokens */
const groupStyle: Record<string, { dot: string; badge: string; header: string }> = {
  "mentee-embed-v1": {
    dot: "bg-neutral-400",
    badge: "bg-neutral-100 text-neutral-600",
    header: "text-neutral-500",
  },
  "mentee-embed-v3": {
    dot: "bg-neutral-900",
    badge: "bg-neutral-900 text-white",
    header: "text-neutral-800",
  },
  Shared: {
    dot: "bg-neutral-300",
    badge: "bg-neutral-100 text-neutral-600",
    header: "text-neutral-500",
  },
};

export function ResearchTOC({ sections, activeId, onSelect }: Props) {
  const groups = sections.reduce<string[]>((acc, s) => {
    if (s.group !== "" && !acc.includes(s.group)) acc.push(s.group);
    return acc;
  }, []);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(groups.map((g) => [g, true]))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleGroup(g: string) {
    setOpenGroups((prev) => ({ ...prev, [g]: !prev[g] }));
  }

  function handleSelect(id: string) {
    onSelect(id);
    setMobileOpen(false);
  }

  const standaloneItems = sections.filter((s) => s.group === "");

  const navContent = (
    <nav className="space-y-0.5">
      {/* Standalone top-level (Overview) */}
      {standaloneItems.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold transition-all duration-150 ease-out ${
              isActive
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
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
        <div className="my-2.5 border-t border-neutral-200" />
      )}

      {/* Grouped sections */}
      {groups.map((group) => {
        const items = sections.filter((s) => s.group === group);
        const isOpen = openGroups[group] ?? true;
        const groupHasActive = items.some((s) => s.id === activeId);
        const style = groupStyle[group] ?? groupStyle["Shared"];

        return (
          <div key={group} className="mb-0.5">
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group)}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-all duration-150 ease-out ${
                groupHasActive
                  ? "bg-neutral-100"
                  : "hover:bg-neutral-50"
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

            {/* Sub-items */}
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
                          onClick={() => handleSelect(s.id)}
                          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-all duration-150 ease-out ${
                            isActive
                              ? "bg-neutral-900 font-semibold text-white shadow-sm"
                              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
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

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────── */}
      <aside className="hidden md:block w-44 flex-shrink-0">
        <div className="sticky top-24">
          {/* Header */}
          <div className="mb-3 flex items-center gap-2 px-2.5">
            <span className="h-px flex-1 bg-neutral-200" />
            <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">
              Contents
            </p>
            <span className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-2">
            {navContent}
          </div>
        </div>
      </aside>

      {/* ── Mobile collapsible ───────────────────────────── */}
      <div className="mb-6 md:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors duration-150 hover:bg-neutral-100"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
            Contents
          </span>
          <motion.span
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-block text-neutral-400 text-xs"
          >
            ▾
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-xl border border-neutral-100 bg-white p-3">
                {navContent}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
