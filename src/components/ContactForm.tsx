"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <Reveal>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="rounded-2xl border border-neutral-100 p-6 sm:p-8"
      >
        {sent ? (
          <div className="py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
              ✓
            </div>
            <h3 className="mt-4 text-lg font-medium text-neutral-900">
              Thanks — we&apos;ll be in touch.
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Our team typically responds within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Jane Doe" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
              />
            </div>
            <Field label="Company" name="company" placeholder="Company name" />
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-800"
              >
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us about your goals or workflows."
                className="mt-2 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Send message
            </button>
          </form>
        )}
      </motion.div>
    </Reveal>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-neutral-800"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900"
      />
    </div>
  );
}
