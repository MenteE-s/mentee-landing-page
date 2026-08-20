import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobDetail } from "@/components/JobDetail";

export const metadata: Metadata = {
  title: "Full Stack AI Engineer — MenteE Careers",
  description:
    "Design and ship end-to-end AI products — from model integration to frontend interfaces. Own the full loop.",
};

export default function FullStackAIEngineerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <JobDetail
          title="Full Stack AI Engineer"
          type="Full-time"
          location="Remote"
          slug="full-stack-ai-engineer"
          description="MenteE is hiring a Full Stack AI Engineer to build and ship AI-powered products end-to-end. You will work across the entire stack — from model integration and backend pipelines to the interfaces users interact with. This is a founding engineering role with high ownership and zero bureaucracy."
          responsibilities={[
            "Design, build, and ship AI-powered features and products across the full stack",
            "Integrate LLMs, ML models, and AI APIs into production applications",
            "Build and maintain backend services, APIs, and data pipelines",
            "Develop responsive, performant frontend interfaces with modern frameworks (Next.js, React)",
            "Own the deployment lifecycle — CI/CD, containerization, monitoring, and incident response",
            "Collaborate directly with the founding team on product direction and technical architecture",
            "Write production-quality code with proper testing, documentation, and observability",
            "Evaluate and integrate new AI tools, frameworks, and APIs as the ecosystem evolves",
          ]}
          requirements={[
            "3+ years of full stack development experience (frontend + backend)",
            "Strong proficiency in TypeScript, React/Next.js, and at least one backend language (Python, Node.js, Go)",
            "Hands-on experience integrating AI/ML models or LLM APIs into applications (OpenAI, Anthropic, open-source models)",
            "Familiarity with cloud platforms (AWS, GCP, or Azure) and containerization (Docker)",
            "Understanding of databases (PostgreSQL, Redis) and data modeling",
            "Comfort with ambiguity — you can take a vague problem and ship a working solution",
            "Strong product sense — you care about what you build, not just how you build it",
          ]}
          niceToHave={[
            "Experience with vector databases and RAG architectures",
            "Familiarity with MLOps, model serving, and inference optimization",
            "Experience building multi-agent or agentic AI systems",
            "Prior startup or founding engineer experience",
            "Open-source contributions or technical writing",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
