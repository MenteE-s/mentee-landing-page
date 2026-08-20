import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — MenteE",
  description:
    "Get in touch with the MenteE team to explore how intelligent automation can help your organization.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Contact
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                Let&apos;s talk automation.
              </h1>
              <p className="mt-4 max-w-md text-neutral-600">
                Tell us about your goals and we&apos;ll outline how MenteE could help.
                Our team typically responds within one business day.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-neutral-900">Email</dt>
                  <dd className="mt-1 text-neutral-600">hello@menteE.ai</dd>
                </div>
                <div>
                  <dt className="font-medium text-neutral-900">Partnerships</dt>
                  <dd className="mt-1 text-neutral-600">
                    partners@menteE.ai
                  </dd>
                </div>
              </dl>
            </Reveal>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
