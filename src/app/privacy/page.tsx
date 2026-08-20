import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy — MenteE",
  description:
    "MenteE privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-neutral-500">
              Last updated: August 20, 2026
            </p>
          </Reveal>

          <div className="mt-12 space-y-8 text-sm leading-relaxed text-neutral-600">
            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  1. Introduction
                </h2>
                <p>
                  MenteE (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                  operates the MenteE.ai website and related services (the
                  &quot;Service&quot;). This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our website and use our services.
                </p>
                <p className="mt-3">
                  By accessing or using the Service, you agree to the collection
                  and use of information in accordance with this policy. If you
                  do not agree, please discontinue use of the Service.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  2. Information We Collect
                </h2>
                <p>We may collect the following types of information:</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>
                    <strong>Personal Information:</strong> Name, email address,
                    and any information you voluntarily provide through contact
                    forms or account registration.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Browser type, operating system,
                    pages visited, time spent on pages, and other diagnostic data
                    collected automatically.
                  </li>
                  <li>
                    <strong>Cookies and Tracking:</strong> We use cookies and
                    similar technologies to maintain sessions, remember
                    preferences, and analyze usage patterns.
                  </li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  3. How We Use Your Information
                </h2>
                <p>We use collected information to:</p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>Provide, operate, and maintain the Service</li>
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Improve and personalize the Service</li>
                  <li>Analyze usage trends and monitor service performance</li>
                  <li>Communicate updates, security alerts, and support messages</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  4. How We Share Your Information
                </h2>
                <p>
                  We do not sell your personal information. We may share
                  information with:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-1">
                  <li>
                    <strong>Service Providers:</strong> Third parties that help us
                    operate the Service (hosting, analytics, email delivery)
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> If required by law, court
                    order, or governmental regulation
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In connection with a
                    merger, acquisition, or sale of assets
                  </li>
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  5. Data Security
                </h2>
                <p>
                  We implement industry-standard security measures to protect
                  your information. However, no method of transmission over the
                  Internet or electronic storage is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  6. Your Rights
                </h2>
                <p>
                  Depending on your jurisdiction, you may have rights to access,
                  correct, delete, or port your personal data. To exercise these
                  rights, contact us at{" "}
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

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  The Service is not intended for individuals under 13. We do not
                  knowingly collect personal information from children. If you
                  believe a child has provided us with personal information,
                  please contact us and we will delete it.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of significant changes by posting the new policy on
                  this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="mb-3 text-base font-semibold text-neutral-900">
                  9. Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please
                  contact us at{" "}
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
