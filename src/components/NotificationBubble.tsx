"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Phase = "idle" | "drop" | "expand" | "show" | "collapse" | "rise" | "gone";

export function NotificationBubble() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("drop"), 6200),
      setTimeout(() => setPhase("expand"), 6600),
      setTimeout(() => setPhase("show"), 6950),
      setTimeout(() => setPhase("collapse"), 9450),
      setTimeout(() => setPhase("rise"), 9800),
      setTimeout(() => setPhase("gone"), 10200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === "idle" || phase === "gone") return null;

  const isExpanded = phase === "expand" || phase === "show" || phase === "collapse";
  const showText = phase === "show";
  const isRising = phase === "rise";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isRising ? -80 : 90,
          opacity: 1,
          width: isExpanded ? "auto" : 44,
          paddingLeft: isExpanded ? 24 : 0,
          paddingRight: isExpanded ? 24 : 0,
        }}
        transition={{
          duration: isRising ? 0.4 : phase === "drop" ? 0.4 : 0.35,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="flex items-center justify-center overflow-hidden rounded-[22px] bg-neutral-900 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        style={{ height: 44, minWidth: 44 }}
      >
        <motion.div
          animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="absolute h-[6px] w-[6px] rounded-full bg-white/70"
        />
        <motion.span
          animate={{
            opacity: showText ? 1 : 0,
            maxWidth: showText ? 300 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="whitespace-nowrap text-[13px] font-semibold tracking-wide text-white"
        >
          We Smile and We Scroll
        </motion.span>
      </motion.div>
    </div>
  );
}
