import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
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
            <p className="mt-3 text-sm text-neutral-500">
              Intelligent automation for modern teams — practical, scalable AI
              that helps businesses move faster.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="font-medium text-neutral-900">Company</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <Link href="/about" className="hover:text-neutral-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#approach" className="hover:text-neutral-900">
                    Approach
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-neutral-900">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Solutions</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <Link href="/#capabilities" className="hover:text-neutral-900">
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-neutral-900">
                    Get started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Connect</p>
              <ul className="mt-3 space-y-2 text-neutral-500">
                <li>
                  <Link href="/contact" className="hover:text-neutral-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-neutral-900">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 text-sm text-neutral-500 sm:flex-row">
          <p>© {year} MenteE. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <a href="#" className="transition-colors hover:text-neutral-900">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-neutral-900">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
