import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cookie Policy — MenteE",
  description:
    "MenteE cookie policy — how we use cookies and similar technologies on our website.",
};

const cookies = [
  {
    t: "Essential Cookies",
    d: "Required for the Service to function. These enable core features like navigation and session management. Cannot be disabled.",
    examples: "Session ID, CSRF token, load balancer affinity",
  },
  {
    t: "Analytics Cookies",
    d: "Help us understand how visitors interact with the website — pages visited, bounce rate, traffic sources. Used to improve the Service.",
    examples: "Google Analytics (GA4), Plausible",
  },
  {
    t: "Preference Cookies",
    d: "Remember your settings and choices (language, region) to provide a more personalized experience.",
    examples: "Theme preference, locale",
  },
  {
    t: "Marketing Cookies",
    d: "Track visitors across websites to display relevant advertisements. Currently we do not run third-party ads, but these may be used in the future.",
    examples: "None currently active",
  },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pb-20 pt-20 md:pt-28">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
              Legal
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
              Cookie Policy
            </h1>
            <p className="mt-4 text-sm text-neutral-500">
              Last updated: August 20, 2026
            </p>
          </Reveal>

          <div className="mt-12 space-y-8 text-sm leading-relaxed text-neutral-600">
            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  1. What Are Cookies
                </h2>
                <p>
                  Cookies are small text files stored on your device when you
                  visit a website. They are widely used to make websites work
                  efficiently and to provide reporting and personalization
                  capabilities.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  2. How We Use Cookies
                </h2>
                <p>
                  We use cookies to maintain site functionality, analyze traffic,
                  remember your preferences, and improve the user experience.
                  Cookies set by the MenteE domain are &quot;first-party
                  cookies.&quot; Some cookies may be set by third-party services
                  embedded in our pages.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  3. Types of Cookies We Use
                </h2>
                <div className="mt-4 space-y-4">
                  {cookies.map((c, i) => (
                    <div key={i} className="rounded-xl border border-neutral-100 p-4">
                      <h3 className="font-medium text-neutral-900">{c.t}</h3>
                      <p className="mt-1">{c.d}</p>
                      <p className="mt-1 text-xs text-neutral-400">
                        Examples: {c.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  4. Managing Cookies
                </h2>
                <p>
                  You can control and manage cookies through your browser
                  settings. Most browsers allow you to block or delete cookies.
                  Note that disabling certain cookies may affect the functionality
                  of the Service.
                </p>
                <p className="mt-2">
                  Common browser cookie settings:
                </p>
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  <li>
                    <strong>Chrome:</strong> Settings &gt; Privacy and Security
                    &gt; Cookies
                  </li>
                  <li>
                    <strong>Firefox:</strong> Settings &gt; Privacy &amp; Security
                    &gt; Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Settings &gt; Privacy &gt; Manage
                    Website Data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings &gt; Privacy, Search, and
                    Services &gt; Cookies
                  </li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  5. Third-Party Cookies
                </h2>
                <p>
                  Some cookies are set by third-party services that appear on our
                  pages (e.g., analytics providers). These parties may collect
                  information about your online activity across websites. We
                  encourage you to review their privacy policies.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  6. Changes to This Policy
                </h2>
                <p>
                  We may update this Cookie Policy from time to time. Changes
                  will be posted on this page with an updated &quot;Last
                  updated&quot; date.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  7. Contact
                </h2>
                <p>
                  Questions about our use of cookies? Contact us at{" "}
                  <a
                    href="mailto:support@menteeai.org"
                    className="font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                  >
                    support@menteeai.org
                  </a>
                  .
                </p>
              </section>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
