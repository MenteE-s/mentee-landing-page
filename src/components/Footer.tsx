import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center">
              <Image
                src="/MenteE.png"
                alt="MenteE"
                height={24}
                width={27}
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
              MenteE.ai is the parent company behind a family of AI-powered
              companies building practical, production-ready technology for
              businesses and individuals.
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
                  <Link href="/about" className="hover:text-black">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-black">
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
                  <Link href="/solutions" className="hover:text-black">
                    Solutions
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
                  <a href="#" className="hover:text-black">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Twitter
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
          <p>© {year} MenteE.ai. All rights reserved.</p>
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
              <a href="#" className="transition-colors hover:text-black">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-black">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-black">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
