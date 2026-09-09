"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type Plan = {
  name: string;
  description: string;
  price: number | string;
  duration: string;
  features: string[];
  popular: boolean;
  cta: string;
};

const individualPlans: Plan[] = [
  {
    name: "Free Forever",
    description: "Perfect for getting started with RecruAI",
    price: 0,
    duration: "forever",
    features: [
      "3 mock interviews per month",
      "Basic AI feedback",
      "Progress tracking",
      "Mobile app access",
      "Community support",
    ],
    popular: false,
    cta: "Start Free",
  },
  {
    name: "Individual Pro",
    description: "For serious job seekers",
    price: 30,
    duration: "month",
    features: [
      "Unlimited mock interviews",
      "Advanced AI feedback",
      "Industry-specific questions",
      "Performance analytics",
      "Video interview practice",
      "Resume optimization tips",
      "Earn $3 per successful referral",
      "Priority support",
    ],
    popular: true,
    cta: "Start 14-Day Free Trial",
  },
];

const organizationPlans: Plan[] = [
  {
    name: "For Organizations",
    description: "Custom hiring solutions for startups, SMEs & enterprises",
    price: "Contact us",
    duration: "for pricing",
    features: [
      "Post unlimited jobs across Pakistan & Gulf",
      "AI candidate screening & matching",
      "Pipeline, analytics & team collaboration",
      "ATS integrations & custom workflows",
      "Dedicated support & onboarding",
      "Flexible plans for every team size",
    ],
    popular: true,
    cta: "Contact Us for Pricing",
  },
];

export function RecruAIPricing() {
  const [userType, setUserType] = useState<"individual" | "organization">("individual");
  const currentPlans = userType === "individual" ? individualPlans : organizationPlans;

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Choose your <span className="text-neutral-400">success plan</span>
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600">Start free, scale as you grow. No hidden fees, cancel anytime.</p>
      </Reveal>

      {/* Toggle */}
      <div className="mt-10 flex justify-center">
        <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 p-1">
          <button
            onClick={() => setUserType("individual")}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              userType === "individual" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Job Seekers
          </button>
          <button
            onClick={() => setUserType("organization")}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              userType === "organization" ? "bg-neutral-900 text-white shadow-sm" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Organizations
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        className={`mx-auto mt-10 grid gap-6 ${
          currentPlans.length === 1 ? "max-w-md grid-cols-1" : "max-w-4xl grid-cols-1 md:grid-cols-2"
        }`}
      >
        {currentPlans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-3xl border bg-white p-8 ${
              plan.popular ? "border-neutral-900 shadow-xl" : "border-neutral-200"
            }`}
          >
            {plan.popular && (
              <span className="mb-4 inline-flex w-fit rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold tracking-tight text-neutral-900">{plan.name}</h3>
            <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>

            <div className="mt-6 flex items-baseline gap-2">
              {typeof plan.price === "number" ? (
                <>
                  <span className="text-4xl font-black tracking-tight text-neutral-900">${plan.price}</span>
                  <span className="text-sm text-neutral-500">/{plan.duration}</span>
                </>
              ) : (
                <>
                  <span className="text-3xl font-black tracking-tight text-neutral-900">{plan.price}</span>
                  <span className="text-sm text-neutral-500">/{plan.duration}</span>
                </>
              )}
            </div>

            <button
              className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition-colors ${
                plan.popular
                  ? "bg-neutral-900 text-white hover:bg-black"
                  : "border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              {plan.cta}
            </button>

            <ul className="mt-8 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-neutral-500">
        Start with our forever free plan. Upgrade anytime for unlimited AI interviews.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-neutral-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Cancel anytime
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> 30-day money back
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> 24/7 support
        </span>
      </div>
    </section>
  );
}
