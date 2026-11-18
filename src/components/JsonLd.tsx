const ORG_URL = "https://menteeai.org";

const organization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ResearchOrganization"],
  "@id": `${ORG_URL}/#organization`,
  name: "MenteE",
  alternateName: ["MenteE AI", "MENTEE"],
  url: ORG_URL,
  logo: {
    "@type": "ImageObject",
    url: `${ORG_URL}/MenteE.png`,
  },
  description:
    "MenteE is an umbrella for research aimed at humanity. We take on fields where the answer is not settled, build the smallest thing that can be checked, and publish the method, the numbers and the failures.",
  founder: [
    {
      "@type": "Person",
      name: "Syed Syab Ahmad Shah",
      jobTitle: "Founder & Lead Engineer",
      url: "https://syab.tech",
    },
    {
      "@type": "Person",
      name: "Sania Shakeel",
      jobTitle: "Co-Founder & Data Scientist",
    },
    {
      "@type": "Person",
      name: "Ashfaq Ahmad",
      jobTitle: "Co-Founder, CAO & Research Scientist",
    },
  ],
  sameAs: [
    "https://github.com/MenteE-s",
    "https://huggingface.co/MenteEAI",
    "https://www.linkedin.com/company/menteeai",
    "https://x.com/menteeaiorg",
    "https://www.instagram.com/mentee.ai",
  ],
  knowsAbout: [
    "multilingual embeddings",
    "information retrieval",
    "Arabic natural language processing",
    "Urdu natural language processing",
    "knowledge distillation",
    "autonomous software agents",
    "low-resource language modelling",
  ],
  keyword: [
    "research organization",
    "open research",
    "applied research",
    "reproducible research",
  ],
  citation: [
    {
      "@type": "ScholarlyArticle",
      name: "mentee-embed: Training Competitive Multilingual Text Embeddings from Scratch for Arabic, English, and Urdu",
      doi: "10.5281/zenodo.22087139",
      url: "https://doi.org/10.5281/zenodo.22087139",
      datePublished: "2026-08-24",
      publisher: { "@type": "Organization", name: "Zenodo" },
      inLanguage: ["ar", "en", "ur"],
      creators: ["Syed Syab Ahmad Shah", "Shakeel Sania", "Rustam Hamza", "Khan Mahboob"],
    },
    {
      "@type": "ScholarlyArticle",
      name: "How Far Can Multilingual Text Embeddings Be Trained From Scratch? A Compute-Efficient Study of Arabic, English, and Urdu",
      doi: "10.5281/zenodo.22117673",
      url: "https://doi.org/10.5281/zenodo.22117673",
      datePublished: "2026-08-26",
      publisher: { "@type": "Organization", name: "Zenodo" },
      inLanguage: ["ar", "en", "ur"],
      creators: ["Syed Syab Ahmad Shah", "Shakeel Sania", "Rustam Hamza", "Iqbal Mahboob"],
    },
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${ORG_URL}/#website`,
  url: ORG_URL,
  name: "MenteE",
  publisher: { "@id": `${ORG_URL}/#organization` },
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
