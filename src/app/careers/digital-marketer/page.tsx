import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobDetail } from "@/components/JobDetail";

export const metadata: Metadata = {
  title: "Digital Marketer — MenteE Careers",
  description:
    "Own MenteE's growth engine. Build and execute digital strategies across SEO, paid, content, and social — all remote.",
};

export default function DigitalMarketerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <JobDetail
          title="Digital Marketer"
          type="Full-time"
          location="Remote"
          slug="digital-marketer"
          description="MenteE is looking for a Digital Marketer to build our growth engine from the ground up. You will own the full digital strategy — from brand awareness to lead generation — across every channel. This is a founding marketing role: you set the playbook, not follow one."
          responsibilities={[
            "Develop and execute multi-channel digital marketing strategies (SEO, SEM, paid social, email, content)",
            "Build and manage paid campaigns across Google Ads, Meta, LinkedIn, and emerging platforms",
            "Own organic growth — SEO strategy, content planning, keyword research, and performance tracking",
            "Create and manage email marketing funnels for lead nurture and conversion",
            "Build and maintain the MenteE brand presence across social media platforms",
            "Analyze campaign performance and optimize for CAC, LTV, and conversion metrics",
            "Collaborate with design and engineering on landing pages, assets, and conversion optimization",
            "Set up analytics infrastructure — GA4, attribution, dashboards — from scratch",
          ]}
          requirements={[
            "3+ years in digital marketing, preferably in B2B SaaS or AI/tech",
            "Proven track record of building and scaling demand generation from early stage",
            "Strong understanding of SEO, paid acquisition, and marketing analytics",
            "Experience with marketing automation tools (HubSpot, Mailchimp, or similar)",
            "Comfort with data — you can analyze funnels, build dashboards, and make decisions from numbers",
            "Excellent written communication — you can write copy, not just manage campaigns",
            "Self-directed and comfortable operating without a marketing team above you",
          ]}
          niceToHave={[
            "Experience marketing AI products or developer tools",
            "Graphic design or video production skills",
            "Experience with product-led growth (PLG) motions",
            "Prior startup experience (founding or early employee)",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
