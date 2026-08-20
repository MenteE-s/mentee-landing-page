import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service — MenteE",
  description:
    "MenteE terms of service — the rules governing your use of our website and services.",
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-neutral-500">
              Last updated: August 20, 2026
            </p>
          </Reveal>

          <div className="mt-12 space-y-8 text-sm leading-relaxed text-neutral-600">
            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the MenteE website and services
                  (the &quot;Service&quot;), you agree to be bound by these
                  Terms of Service. If you do not agree, do not use the Service.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  2. Use of the Service
                </h2>
                <p>
                  You may use the Service only for lawful purposes and in
                  accordance with these Terms. You agree not to:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>
                    Use the Service in any way that violates applicable law or
                    regulation
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any part of the
                    Service or its related systems
                  </li>
                  <li>
                    Interfere with or disrupt the Service or servers connected to
                    the Service
                  </li>
                  <li>
                    Use automated systems (bots, scrapers) to access the Service
                    without written permission
                  </li>
                  <li>
                    Misrepresent your identity or affiliation with any person or
                    entity
                  </li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  3. Intellectual Property
                </h2>
                <p>
                  The Service and its original content, features, and
                  functionality are owned by MenteE and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws. You may not copy, modify,
                  distribute, sell, or lease any part of the Service without
                  prior written consent.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  4. User Content
                </h2>
                <p>
                  If you submit content through the Service (forms, emails, or
                  other communications), you grant MenteE a non-exclusive,
                  worldwide, royalty-free license to use, reproduce, and process
                  that content solely for the purpose of operating and improving
                  the Service.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  5. Disclaimers
                </h2>
                <p>
                  The Service is provided &quot;as is&quot; and &quot;as
                  available&quot; without warranties of any kind, whether
                  express or implied. MenteE does not warrant that the Service
                  will be uninterrupted, error-free, or secure, or that any
                  defects will be corrected.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  6. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by law, MenteE shall not be
                  liable for any indirect, incidental, special, consequential, or
                  punitive damages arising from your use of the Service. Our total
                  liability shall not exceed the amount you paid us, if any, in
                  the twelve months preceding the claim.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  7. Third-Party Links
                </h2>
                <p>
                  The Service may contain links to third-party websites. MenteE
                  is not responsible for the content, privacy policies, or
                  practices of any third-party sites. Your use of third-party
                  sites is at your own risk.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  8. Termination
                </h2>
                <p>
                  We may suspend or terminate your access to the Service at any
                  time, without notice, for conduct that we determine violates
                  these Terms or is harmful to other users, us, or third parties.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  9. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms at any time. Changes
                  are effective upon posting. Your continued use of the Service
                  after changes are posted constitutes acceptance of the revised
                  Terms.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  10. Contact
                </h2>
                <p>
                  Questions about these Terms? Contact us at{" "}
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
