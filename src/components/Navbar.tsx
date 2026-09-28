"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    label: "MenteE Embed",
    href: "/research",
    desc: "41M-param multilingual embeddings, trained from scratch",
  },
  {
    label: "MenteE SWE",
    href: "/products/swe",
    desc: "Autonomous SWE agent in your terminal",
  },
  {
    label: "RecruAI",
    href: "/products/recruai",
    desc: "AI hiring, screening and interview platform",
  },
];

const navLinks = [
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
];

const rightLinks = [
  { label: "Careers", href: "/careers" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openProducts = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 140);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseLeave={scheduleClose}
      className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/MenteE.png"
            alt="MenteE"
            height={24}
            width={27}
            priority
            className="h-6 w-auto"
          />
          <span className="text-[15px] font-bold tracking-tight text-neutral-900">
            MenteE
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-[13px] font-medium text-neutral-600 md:flex">
          <li onMouseEnter={openProducts}>
            <button
              type="button"
              aria-expanded={productsOpen}
              className="flex items-center gap-1 transition-colors hover:text-black"
            >
              Products
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: productsOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>
          </li>

          {navLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="transition-colors hover:text-black">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 text-[13px] font-medium text-neutral-600 md:flex">
          {rightLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="transition-colors hover:text-black"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 bg-neutral-900"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[1.5px] w-5 bg-neutral-900"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 bg-neutral-900"
          />
        </button>
      </nav>

      <AnimatePresence>
        {productsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full hidden border-t border-neutral-200 bg-white md:block"
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                    Products
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-600">
                    Three platforms and one open model, built by a two-person
                    team and shipped in production.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setProductsOpen(false)}
                    className="mt-4 inline-block text-[13px] font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                  >
                    View all products →
                  </Link>
                </div>

                <div className="md:col-span-8">
                  {products.map((p) => (
                    <Link
                      key={p.label}
                      href={p.href}
                      onClick={() => setProductsOpen(false)}
                      className="group flex items-center gap-4 border-t border-neutral-100 px-3 py-4 transition-colors hover:bg-neutral-50"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 bg-neutral-300 transition-colors group-hover:bg-neutral-900" />
                      <span className="text-[13px] font-semibold text-neutral-900">
                        {p.label}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] text-neutral-500">
                        {p.desc}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 -translate-x-1 text-neutral-300 opacity-0 transition-all group-hover:translate-x-0 group-hover:text-neutral-900 group-hover:opacity-100"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                  <div className="border-t border-neutral-100" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-neutral-100 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              <p className="pb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Products
              </p>
              {products.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-[15px] font-medium text-neutral-700 transition-colors hover:text-black"
                >
                  {p.label}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="pb-2 text-[15px] font-medium text-neutral-500 transition-colors hover:text-black"
              >
                All products
              </Link>

              <div className="mt-2 border-t border-neutral-100 pt-2">
                {[...navLinks, ...rightLinks].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-[15px] font-medium text-neutral-700 transition-colors hover:text-black"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
