import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — MenteE",
  description:
    "Get in touch with the MenteE team — hiring, support, partnerships, and general inquiries.",
};

const contacts = [
  {
    t: "General inquiries",
    email: "support@menteeai.org",
    desc: "Questions about MenteE, our products, or how we can help your organization.",
  },
  {
    t: "Careers & hiring",
    email: "hr@menteeai.org",
    desc: "Applications, open roles, and anything related to joining the team.",
  },
  {
    t: "Support",
    email: "support@menteeai.org",
    desc: "Technical help, account issues, or product troubleshooting.",
  },
];

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
                Get in touch.
              </h1>
              <p className="mt-4 max-w-md text-neutral-600">
                Reach out to the right team. We typically respond within one
                business day.
              </p>

              <div className="mt-10 space-y-6">
                {contacts.map((c, i) => (
                  <Reveal key={c.t} delay={i * 0.08}>
                    <div>
                      <h2 className="font-medium text-neutral-900">{c.t}</h2>
                      <a
                        href={`mailto:${c.email}`}
                        className="mt-1 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                      >
                        {c.email}
                      </a>
                      <p className="mt-1 text-sm text-neutral-500">{c.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <div className="mt-10 rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                  <p className="text-sm text-neutral-500">
                    <span className="font-medium text-neutral-900">
                      Response time:
                    </span>{" "}
                    We aim to respond within one business day. For urgent matters,
                    email is the fastest way to reach us.
                  </p>
                </div>
              </Reveal>
            </Reveal>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
