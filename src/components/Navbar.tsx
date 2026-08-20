"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Approach", href: "/#approach" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/MenteE.png"
            alt="MenteE"
            height={28}
            width={32}
            priority
            className="h-7 w-auto"
          />
        </Link>
        <ul className="hidden items-center gap-7 text-sm text-neutral-600 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors hover:text-neutral-900"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
        >
          Contact us
        </Link>
      </nav>
    </motion.header>
  );
}
