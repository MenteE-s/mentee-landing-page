"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Software Engineer",
    company: "Dubai, UAE (from Lahore)",
    content:
      "RecruAI's CV optimization boosted my ATS score from 52 to 91, and the AI job matching found me the perfect role in Dubai. I applied from Lahore and got hired in 3 weeks!",
    achievement: "Hired in Dubai",
  },
  {
    name: "Fatima Raza",
    role: "HR Manager",
    company: "Karachi, Pakistan",
    content:
      "As an HR professional, RecruAI has revolutionized our hiring. We've reduced screening time by 40% and the CV-ranked applicants from Pakistan & Gulf are top quality.",
    achievement: "40% Time Saved",
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    company: "Riyadh, Saudi Arabia",
    content:
      "The perfect-job matching is unreal. It understood my skills and suggested roles in Riyadh I would never have found. Plus the interview coaching prepared me perfectly.",
    achievement: "Perfect Match",
  },
  {
    name: "Bilal Ahmed",
    role: "Fresh Graduate, FAST",
    company: "Islamabad → Doha",
    content:
      "Being a fresh graduate from Pakistan, I was nervous. RecruAI optimized my CV, gave me mock interviews, and I landed my first job in Doha. Best job portal in Asia, honestly.",
    achievement: "First Job in Gulf",
  },
  {
    name: "Lisa Thompson",
    role: "Recruitment Manager",
    company: "Fortune 500 Co",
    content:
      "The enterprise features are outstanding. We can now standardize our interview process across all departments while maintaining flexibility for different roles.",
    achievement: "Process Standardized",
  },
  {
    name: "James Wilson",
    role: "Career Changer",
    company: "Freelancer",
    content:
      "Switching careers at 35 was daunting, but RecruAI helped me practice industry-specific questions. The AI understood my background and tailored questions perfectly.",
    achievement: "Career Pivot",
  },
];

export function RecruAITestimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-y border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            What our <span className="text-neutral-400">users say</span>
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Loved by job seekers across Pakistan, UAE, Saudi Arabia, Qatar &amp; the Gulf.
          </p>
        </Reveal>

        {/* Main */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-900">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <p className="mt-6 text-lg leading-relaxed text-neutral-800 sm:text-xl">&ldquo;{testimonials[active].content}&rdquo;</p>
            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-sm font-bold text-white">
                {testimonials[active].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <div>
                <div className="text-sm font-semibold text-neutral-900">{testimonials[active].name}</div>
                <div className="text-xs text-neutral-500">
                  {testimonials[active].role} · {testimonials[active].company}
                </div>
              </div>
              <span className="ml-auto hidden rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white sm:inline-flex">
                {testimonials[active].achievement}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${i === active ? "bg-neutral-900" : "bg-neutral-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-md">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor" className="text-amber-400">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-xs font-bold text-neutral-700">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <div className="text-xs font-semibold text-neutral-900">{t.name}</div>
                  <div className="text-[11px] text-neutral-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { k: "10,000+", v: "Happy Users" },
            { k: "95%", v: "Success Rate" },
            { k: "500+", v: "Companies" },
          ].map((s) => (
            <div key={s.v} className="rounded-3xl border border-neutral-200 bg-white p-6 text-center">
              <div className="text-3xl font-black tracking-tight text-neutral-900">{s.k}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
