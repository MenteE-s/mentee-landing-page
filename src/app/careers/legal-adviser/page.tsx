import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobDetail } from "@/components/JobDetail";

export const metadata: Metadata = {
  title: "Legal Adviser — MenteE Careers",
  description:
    "Advise MenteE on legal, compliance, and regulatory matters as we scale — IP, contracts, data privacy, and corporate structure.",
};

export default function LegalAdviserPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <JobDetail
          title="Legal Adviser"
          type="Contract"
          location="Remote"
          slug="legal-adviser"
          description="MenteE is looking for a Legal Adviser to provide strategic and operational legal guidance as we scale. You will be the legal backbone of the company — handling everything from IP protection and contracts to data privacy and corporate governance. This is a contract-based role with potential to evolve as the company grows."
          responsibilities={[
            "Advise on intellectual property strategy — patents, trademarks, trade secrets, and open-source licensing",
            "Draft, review, and negotiate commercial contracts, vendor agreements, and customer MSAs",
            "Guide compliance with data privacy regulations (GDPR, CCPA, and emerging AI-specific regulation)",
            "Support corporate governance — bylaws, board resolutions, equity structures, and fundraising documentation",
            "Develop and maintain internal legal policies and frameworks",
            "Advise on AI-specific legal risks — model licensing, output liability, content policies, and regulatory exposure",
            "Manage outside counsel relationships when specialized expertise is needed",
            "Provide day-to-day legal counsel to the founding team on operational decisions",
          ]}
          requirements={[
            "J.D. from an accredited law school and active bar membership",
            "5+ years of legal experience, with focus on technology, IP, or startup law",
            "Experience with data privacy law (GDPR, CCPA) and technology contracts",
            "Familiarity with AI/ML legal landscape — model licensing, output ownership, regulatory trends",
            "Ability to work independently and provide practical, business-oriented legal advice",
            "Comfort with ambiguity and fast-moving environments — you can advise without perfect information",
            "Excellent drafting and negotiation skills",
          ]}
          niceToHave={[
            "In-house legal experience at a startup or scale-up",
            "Experience with AI-specific regulation or policy work",
            "Knowledge of open-source licensing models",
            "Experience supporting fundraising (SAFEs, priced rounds, cap table management)",
            "Prior experience in a technical or engineering role before law",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
