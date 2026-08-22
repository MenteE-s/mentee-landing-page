import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/MenteE.png"
                alt="MenteE"
                height={24}
                width={27}
                className="h-6 w-auto"
              />
              <span className="text-[15px] font-bold tracking-tight text-neutral-900">
                MenteE
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
              MenteE builds and deploys AI-powered platforms for real-world
              use. We do not consult — we ship products.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-[13px] sm:grid-cols-4">
            <div>
              <p className="font-medium text-neutral-900">Company</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <Link href="/about" className="hover:text-black">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:text-black">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-black">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Products</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <Link href="/products" className="hover:text-black">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/embed-models" className="hover:text-black">
                    Embed Models
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="hover:text-black">
                    Research
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Support</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <Link href="/support" className="hover:text-black">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-black">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Connect</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <a
                    href="https://www.linkedin.com/company/mentee1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/mentee.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-[12px] text-neutral-400 sm:flex-row">
          <p>© 2026 MenteE. All rights reserved.</p>
          <p>
            Founded by{" "}
            <a
              href="https://syab.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-black"
            >
              Syab
            </a>
          </p>
          <ul className="flex gap-6">
            <li>
              <a href="/privacy" className="transition-colors hover:text-black">
                Privacy
              </a>
            </li>
            <li>
              <a href="/terms" className="transition-colors hover:text-black">
                Terms
              </a>
            </li>
            <li>
              <a href="/cookies" className="transition-colors hover:text-black">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
