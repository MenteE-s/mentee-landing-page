export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorLink: string;
  tags: string[];
  keywords: string[];
  readTime: string;
  coverLabel: string;
  content: string; // HTML
};

export const posts: BlogPost[] = [
  {
    slug: "introducing-mentee-embed-v1-multilingual-embeddings-from-scratch",
    title: "Introducing mentee-embed-v1: Training Competitive Multilingual Embeddings from Scratch for Arabic, English and Urdu",
    excerpt:
      "MenteE AI presents mentee-embed-v1 — a 41M-parameter trilingual embedding model for Arabic, English and Urdu trained entirely from scratch with relational knowledge distillation. Published at doi:10.5281/zenodo.22087139. Open weights, open code, honest benchmarks.",
    date: "2026-08-24",
    author: "Syed Syab Ahmad",
    authorLink: "https://syab.tech",
    tags: ["Research", "mentee-embed", "AI"],
    keywords: [
      "mentee-embed",
      "mentee-embed-v1",
      "multilingual embeddings",
      "Arabic NLP",
      "Urdu NLP",
      "MenteE AI",
      "menteeai.org",
      "syab.tech",
      "Syed Syab Ahmad",
      "text embeddings",
      "knowledge distillation",
    ],
    readTime: "7 min read",
    coverLabel: "Research",
    content: `
      <p><strong>MenteE AI</strong> is building <a href="https://menteeai.org">menteeai.org</a> as an AI product company — not an agency. Our first public research artifact is <strong>mentee-embed-v1</strong>, a 41M-parameter trilingual text embedding model for <strong>Arabic, English and Urdu</strong> trained <em>entirely from scratch</em> — no pretrained backbone, no fine-tuning of giants. The preprint is published and citable at <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener">doi:10.5281/zenodo.22087139</a> (Zenodo, CC BY 4.0, v1.0.0).</p>

      <h2>What is mentee-embed-v1?</h2>
      <p>mentee-embed-v1 is a compact Transformer encoder (12 layers, 384 hidden, 41M params, 128 tokens) with a custom 50K ByteLevel BPE tokenizer trained on our own trilingual corpus. It outputs 384-dimensional L2-normalized vectors via mean pooling — ready for retrieval, RAG, semantic search and deduplication. Find the model card at <a href="/embed-models">/embed-models</a> and the full technical report at <a href="/research">/research</a>.</p>

      <h2>How we trained it: MLM then relational distillation</h2>
      <p>Training competitive embeddings from random initialization is hard — small models collapse when given only sparse triplet labels. We solved it with a two-stage recipe: <strong>Stage A — Masked Language Modeling</strong> on 1.1M trilingual sentences (6,000 steps, public loss curve on the report), then <strong>Stage B — Relational Knowledge Distillation</strong> from <code>intfloat/multilingual-e5-base</code>. Instead of 1 bit per triplet, the student sees 960 dense numbers per batch (MSE on cosine similarity matrices + InfoNCE). That is how a 41M student learns the teacher's geometry. Code is at <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a>.</p>

      <h2>Honest benchmarks: strengths and where we lag</h2>
      <p>We report two protocols fully. <strong>Protocol A (in-batch, ~97 candidates)</strong>: mentee-embed-v1 reaches <strong>avg MRR@10 0.585</strong> beating <code>all-MiniLM-L6-v2</code> (0.396) and <strong>val acc@1 0.820</strong> even above paraphrase-MiniLM-L12-v2 (0.795), plus <strong>cross-lingual EN↔UR 0.757</strong> with no shared script. <strong>Protocol B (corpus-pool, 15K docs/lang)</strong>: MRR@10 ~0.19 per language and R@100 ~0.47 — usable as a re-ranker, not a billion-document standalone engine — while mpnet-base hits 0.94/0.68/0.58. We publish both wins and limits. See charts on <a href="/research">/research</a>.</p>

      <h2>How to use it</h2>
      <pre><code>from sentence_transformers import SentenceTransformer
model = SentenceTransformer("MenteEAI/mentee-embed-v1")
emb = model.encode(["How do I file a tax return?", "Steps to submit an annual filing"])</code></pre>
      <p>Today weights load via <code>src/model.py</code> in the repo; Sentence-Transformers export is planned. Hugging Face: <a href="https://huggingface.co/MenteEAI/mentee-embed-v1" target="_blank" rel="noopener">huggingface.co/MenteEAI/mentee-embed-v1</a>.</p>

      <h2>Why open?</h2>
      <p>At <strong>MenteE AI</strong> we ship products, not decks. Publishing mentee-embed-v1 preprint, code, weights and even failures is our way to earn trust like DeepSeek, BGE and sentence-transformers — not hide like closed APIs. If you use it, please cite:</p>
      <pre style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere; max-width: 100%; overflow-x: auto; background: #171717; color: #f5f5f5; padding: 16px; border-radius: 16px; font-size: 12px; line-height: 1.6;"><code style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;">@software{shah2026menteeembed,
  title = {mentee-embed: Training Competitive
    Multilingual Text Embeddings from Scratch
    for Arabic, English, and Urdu},
  author = {Shah, Syed Syab Ahmad and
    Sania, Shakeel and Hamza, Rustam and
    Mahboob, Khan},
  year = {2026},
  publisher = {Zenodo},
  version = {v1.0.0},
  doi = {10.5281/zenodo.22087139},
  url = {https://doi.org/10.5281/zenodo.22087139}
}</code></pre>

      <h2>What's next for MenteE and mentee-embed</h2>
      <p>Roadmap: v1.5 on the successful MLM foundation, public leaderboard vs MiniLM/E5/BGE, Apache 2.0 release, MTEB evaluation and Urdu-focused alignment — all tracked in the report. Follow <a href="https://menteeai.org">menteeai.org</a>, <a href="https://syab.tech">syab.tech</a> and the <a href="/blog">MenteE Blog</a> for updates.</p>
    `,
  },
  {
    slug: "why-urdu-arabic-low-resource-languages-matter-mentee-ai",
    title: "Why Urdu and Arabic Matter: Building AI for 300M+ Speakers the Industry Ignores",
    excerpt:
      "Urdu has 230M speakers yet almost no competitive open embedding model. Arabic is thin in the small-model tier. Why MenteE AI at menteeai.org, founded by Syed Syab Ahmad (syab.tech), treats Urdu and Arabic as first-class languages.",
    date: "2026-08-20",
    author: "Syed Syab Ahmad",
    authorLink: "https://syab.tech",
    tags: ["Urdu NLP", "Arabic NLP", "MenteE AI"],
    keywords: ["Urdu NLP", "Arabic NLP", "low resource languages", "MenteE AI", "menteeai.org", "syab.tech", "multilingual embeddings"],
    readTime: "6 min read",
    coverLabel: "Vision",
    content: `
      <p>At <strong>MenteE AI (menteeai.org)</strong> we start with a simple observation: <strong>Urdu has ~230 million speakers</strong> yet almost no open embedding model treats it as a first-class language. Arabic has coverage but almost nothing competitive under 100M parameters. That is not a data problem — it is a priority problem.</p>
      <h2>The gap in open embeddings</h2>
      <p>OpenAI, Cohere and Google hide their embeddings behind APIs. Open models like MiniLM, E5 and BGE are excellent for English but Urdu evaluation is an afterthought — often zero Urdu in the benchmark table. MenteE published <a href="/research">mentee-embed-v1</a> precisely to close this gap: 41M params, 50K BPE trained on Arabic+English+Urdu, beating all-MiniLM-L6-v2 on every in-batch slice and reaching <strong>EN↔UR cross-lingual acc@1 0.757</strong>.</p>
      <h2>Why we chose 50K BPE from scratch</h2>
      <p>Off-the-shelf tokenizers over-fragment Urdu (Nastaliq-influenced script) and Arabic. We trained a ByteLevel BPE on our trilingual corpus so Urdu and Arabic get fair vocabulary share. That plus 1.1M sentences of MLM gives the encoder real morphology, not transliteration hacks.</p>
      <h2>What this means for products at menteeai.org</h2>
      <p>MenteE does not sell consulting — we ship AI platforms. Urdu/Arabic-first embeddings unlock search, RAG and classification for fintech, legal and government workflows in Pakistan, MENA and diaspora. See <a href="/products">Products</a> and <a href="/embed-models">Embed Models</a>.</p>
      <h2>Open and honest</h2>
      <p>We also publish where we lag: corpus-pool MRR@10 ~0.19. That honesty is rare and intentional — read the full report at <a href="/research">/research</a> and cite the preprint <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener">doi:10.5281/zenodo.22087139</a>.</p>
    `,
  },
  {
    slug: "mentee-ai-product-company-not-agency",
    title: "MenteE AI Is a Product Company, Not an Agency: We Build AI Platforms That Ship",
      excerpt:
        "MenteE AI (menteeai.org) builds and deploys AI-powered platforms — we do not take briefs. How MenteE operates as a product lab, with open research like mentee-embed-v1 to prove it.",
    date: "2026-08-18",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Business", "MenteE AI", "Products"],
    keywords: ["MenteE", "MenteE AI", "menteeai.org", "AI product company", "AI platforms", "syab.tech", "Syed Syab Ahmad"],
    readTime: "5 min read",
    coverLabel: "Business",
    content: `
      <p class="lead">Search <strong>MenteE</strong> or <strong>menteeai.org</strong> and one line follows you everywhere across our site. This post explains what it means and how <strong>MenteE AI</strong> operates.</p>

      <blockquote style="border-left: 3px solid #111; padding-left: 16px; margin: 28px 0; font-size: 1.15rem; font-weight: 600; color: #111; line-height: 1.5;">
        MenteE builds and deploys AI-powered platforms. We do not consult — we ship products.
      </blockquote>
      <p>That is not marketing copy. It is how <strong>MenteE AI</strong> at <a href="https://menteeai.org">menteeai.org</a> operates: as a product lab, not a services agency.</p>

      <h2>Why not an agency?</h2>
      <p>Agencies and product companies optimize for different outcomes. Here is how we work:</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">
        <div style="border: 1px solid #e5e7eb; border-radius: 16px; padding: 16px; background: #fafafa;">
          <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9ca3af; font-weight: 600;">Agency</p>
          <p style="margin: 0; font-size: 14px; color: #52525b; line-height: 1.6;">Sells hours and decks. Bills by time. Ships a case study and moves on.</p>
        </div>
        <div style="border: 1px solid #111; border-radius: 16px; padding: 16px; background: #111; color: #fff;">
          <p style="margin: 0 0 6px; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #a1a1aa; font-weight: 600;">MenteE AI — Product Company</p>
          <p style="margin: 0; font-size: 14px; color: #e4e4e7; line-height: 1.6;">Sells systems that run in production. Cloud-native, observable, CI/CD-deployed — built for uptime, not demos.</p>
        </div>
      </div>
      <p>Agencies write case studies. We publish code at <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a> and a citable preprint at <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener">doi:10.5281/zenodo.22087139</a>. One ships narratives; the other ships artifacts you can run, fork and benchmark.</p>

      <h2>How we prove product taste: mentee-embed-v1</h2>
      <p>We could have wrapped an API in a week. Instead we trained <a href="/embed-models">mentee-embed-v1</a> — a 41M trilingual embedding model for Arabic, English and Urdu — <strong>entirely from scratch on a single consumer GPU</strong>.</p>
      <div style="border: 1px solid #e5e7eb; border-radius: 16px; padding: 20px; background: #fff; margin: 20px 0;">
        <p style="margin: 0 0 12px; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #71717a; font-weight: 600;">Result — honest numbers</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
          <div><div style="font-size: 22px; font-weight: 700; color: #111;">0.585</div><div style="font-size: 11px; color: #71717a; margin-top: 4px;">avg MRR@10<br/>vs 0.396 MiniLM-L6</div></div>
          <div><div style="font-size: 22px; font-weight: 700; color: #111;">41M</div><div style="font-size: 11px; color: #71717a; margin-top: 4px;">params<br/>single GPU</div></div>
          <div><div style="font-size: 22px; font-weight: 700; color: #111;">Open</div><div style="font-size: 11px; color: #71717a; margin-top: 4px;">code + weights<br/>+ report</div></div>
        </div>
        <p style="margin: 16px 0 0; font-size: 13px; color: #52525b;">That is product R&D — small, honest, reproducible. Read the full <a href="/research">Technical Report</a> and cite the paper if you build on it.</p>
      </div>

      <h2>What we sell</h2>
      <p>Not custom one-offs — hosted platforms at <strong>menteeai.org</strong>:</p>
      <ul>
        <li><strong>Intelligent automation</strong> — workflows that run without a human in the loop</li>
        <li><strong>Data at scale</strong> — pipelines that turn heterogeneous data into decisions</li>
        <li><strong>Decision engines</strong> — retrieval and ranking where latency and recall matter</li>
        <li><strong>Document processing</strong> — extraction, classification and routing at volume</li>
      </ul>
      <p>Careers at <a href="/careers">/careers</a> · Contact at <a href="/contact">/contact</a> · Explore <a href="/products">Products</a> and <a href="/research">Research</a>.</p>
    `,
  },
  {
    slug: "relational-knowledge-distillation-small-models-41m",
    title: "How Relational Knowledge Distillation Makes a 41M Model Beat 100M+ Giants",
    excerpt:
      "Contrastive training from scratch collapses. Relational distillation from multilingual-e5-base fixes it: a 41M mentee-embed student learns 960 dense numbers per batch to reach 0.585 MRR@10 vs 0.396 for all-MiniLM-L6-v2.",
    date: "2026-08-16",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Research", "AI", "Embeddings"],
    keywords: ["relational knowledge distillation", "knowledge distillation", "contrastive learning", "InfoNCE", "multilingual-e5-base", "small language models", "mentee-embed"],
    readTime: "8 min read",
    coverLabel: "Research",
    content: `
      <p>Small embedding models trained contrastively from scratch usually fail — embeddings spread on the sphere but carry zero retrieval signal (chance ~1/97). <strong>MenteE AI Research</strong> at <a href="https://menteeai.org">menteeai.org</a> fixed it for <a href="/embed-models">mentee-embed-v1</a> with <strong>relational knowledge distillation</strong>.</p>
      <h2>Teacher: intfloat/multilingual-e5-base</h2>
      <p>We distill a 768-dim teacher into our 41M, 384-dim student. For each batch we compute cosine matrices <em>C_student</em> and <em>C_teacher</em> and minimize <code>rel_weight·MSE(Cs, Ct) + ce_weight·InfoNCE</code>. One sparse label becomes 960 dense supervision signals per batch. That is why mentee-embed-v1 reaches <strong>rel_mse 0.046</strong> and <strong>avg MRR@10 0.585</strong> vs <strong>all-MiniLM-L6-v2 0.396</strong>.</p>
      <h2>Why MLM bootstrap matters</h2>
      <p>Stage A MLM (50K BPE, 1.1M sentences, 6,000 steps) gives language-aware initialization free of any pretrained backbone. Contrastive-only from random weights collapses regardless of learning rate — classic representation collapse. MLM breaks it cheaply. Chart on <a href="/research">/research</a>.</p>
      <h2>When distillation still lags</h2>
      <p>On 15K-doc corpus-pool, mentee-embed-v1 gets MRR@10 ~0.19 — fine as a re-ranker, not a billion-doc retriever. That is data scale (810K triplets vs billions), not method. We document it openly in the <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener">Zenodo preprint</a>.</p>
      <h2>Try it</h2>
      <p>Code: <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a> · Model: <a href="https://huggingface.co/MenteEAI/mentee-embed-v1" target="_blank" rel="noopener">MenteEAI/mentee-embed-v1</a> · Contact via <a href="/contact">/contact</a> for collaboration.</p>
    `,
  },
  {
    slug: "from-syab-tech-to-menteeai-org-founder-story",
    title: "Building MenteE AI in 2026: From Idea to Product Lab at menteeai.org",
    excerpt:
      "How MenteE AI at menteeai.org became a product lab in 2026 — building mentee-embed-v1, shipping AI platforms, and publishing open research at Zenodo.",
    date: "2026-08-14",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Culture", "MenteE AI", "Building in Public"],
    keywords: ["MenteE", "MenteE AI", "menteeai.org", "AI product lab", "building in public", "AI startup Pakistan"],
    readTime: "5 min read",
    coverLabel: "Culture",
    content: `
      <p><strong>MenteE AI (menteeai.org)</strong> started as a simple bet: stop selling services by the hour and start building systems that run. In 2026 that bet became a product lab that ships.</p>
      <h2>From prototype to product lab</h2>
      <p>The early work was engineering-led — full-stack, AI, shipping. The turning point was choosing to build platforms, not decks. The domain <strong>menteeai.org</strong> reflects that focus: a lab measured by production uptime, not presentation slides.</p>
      <h2>First proof: mentee-embed-v1</h2>
      <p>We chose a hard first demo: trilingual embeddings for Arabic, English and Urdu from absolute zero on a single GPU. Published at <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener">doi:10.5281/zenodo.22087139</a> with an honest benchmark report at <a href="/research">/research</a> — avg MRR@10 0.585 beating MiniLM-L6-v2 and cross-lingual EN↔UR 0.757 where many small models fail.</p>
      <h2>Building in public</h2>
      <p>MenteE is remote-first, product-focused and open by default. Code at <a href="https://github.com/MenteE-s" target="_blank" rel="noopener">github.com/MenteE-s</a>, model at <a href="https://huggingface.co/MenteEAI/mentee-embed-v1" target="_blank" rel="noopener">huggingface.co/MenteEAI/mentee-embed-v1</a>, and open roles at <a href="/careers">/careers</a>. We ship, we publish, we iterate.</p>
    `,
  },
  {
    slug: "choosing-embedding-model-mentee-embed-vs-minilm-e5-bge-2026",
    title: "Choosing an Embedding Model in 2026: mentee-embed vs MiniLM vs E5 vs BGE Compared",
    excerpt:
      "A 2026 guide to embedding models for Arabic, English and Urdu: compare mentee-embed-v1 (41M) vs all-MiniLM-L6-v2, paraphrase-MiniLM-L12-v2, mpnet-base-v2, E5 and BGE — benchmarks, size and when to use each.",
    date: "2026-08-12",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Guide", "Embeddings", "SEO"],
    keywords: ["embedding model comparison", "mentee-embed vs minilm", "all-MiniLM-L6-v2", "multilingual-e5", "BGE", "mpnet-base-v2", "vector search", "RAG embeddings"],
    readTime: "9 min read",
    coverLabel: "Guide",
    content: `
      <p>Choosing an embedding model for <strong>Arabic, English and Urdu</strong> in 2026? Compare <strong>mentee-embed-v1 (41M, 384-dim)</strong> from <a href="https://menteeai.org">MenteE AI</a> vs <code>all-MiniLM-L6-v2</code>, <code>paraphrase-MiniLM-L12-v2</code>, <code>all-mpnet-base-v2</code>, <code>multilingual-e5-base</code> and <code>BGE</code>. Benchmarks below are from our open report at <a href="/research">/research</a> and preprint <a href="https://doi.org/10.5281/zenodo.22087139" target="_blank" rel="noopener">doi:10.5281/zenodo.22087139</a>.</p>
      <h2>Quick comparison (honest numbers)</h2>
      <ul>
        <li><strong>In-batch MRR@10</strong>: mentee-embed 0.585 vs MiniLM-L6 0.396 vs MiniLM-L12 0.840 vs mpnet 0.867</li>
        <li><strong>Corpus-pool MRR@10 (15K docs)</strong>: mentee-embed ~0.19 per language vs mpnet 0.94/0.68/0.58 — re-ranker tier</li>
        <li><strong>Size</strong>: 41M vs 23M (L6) vs 118M (L12) vs 278M (mpnet) vs 278M (E5-base) vs 335M (BGE-m3)</li>
        <li><strong>Languages</strong>: mentee-embed focused on AR/EN/UR from scratch; E5/BGE cover 100+ but English-heavy</li>
      </ul>
      <h2>When to use mentee-embed-v1</h2>
      <p>Use <a href="/embed-models">mentee-embed-v1</a> if you need a tiny, fast, honest model for AR/EN/UR retrieval, RAG re-ranking or on-device search — single GPU training, Apache 2.0 weights at <a href="https://huggingface.co/MenteEAI/mentee-embed-v1" target="_blank" rel="noopener">MenteEAI/mentee-embed-v1</a>. Use mpnet/E5/BGE if you need billion-doc open-domain search today and can pay the size.</p>
      <h2>Try it from MenteE</h2>
      <p>Explore <a href="https://menteeai.org">menteeai.org</a> for platforms, <a href="/products">Products</a> and <a href="/blog">Blog</a> updates. Cite mentee-embed-v1 via Zenodo if you benchmark it.</p>
      <h2>FAQ</h2>
      <p><strong>Is mentee-embed open?</strong> Yes — code at <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a>, CC BY 4.0 preprint. <strong>Context length?</strong> 128 tokens — chunk longer docs. <strong>License?</strong> Apache 2.0 weights, CC BY 4.0 paper.</p>
    `,
  },
];
