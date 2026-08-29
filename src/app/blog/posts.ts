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
  // ── NEW v4 + SWE posts (newest first) ──────────────────────────────
  {
    slug: "introducing-mentee-swe-autonomous-coding-agent",
    title: "Introducing MenteE SWE: An Autonomous Coding Agent for Your Terminal",
    excerpt:
      "MenteE SWE is a model-agnostic autonomous software-engineering agent. It investigates, edits, verifies with your tests, and reports with evidence. Install via npm, bring your own API key.",
    date: "2026-08-29",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Product", "MenteE SWE", "Developer Tools"],
    keywords: [
      "MenteE SWE", "autonomous coding agent", "terminal agent",
      "AI software engineering", "@menteeai/menteeswe", "SWE agent",
    ],
    readTime: "6 min read",
    coverLabel: "Product",
    content: `
      <p><strong>MenteE SWE</strong> is our autonomous software-engineering agent. It lives in your terminal, investigates your repository, plans the change, edits files with surgical precision, verifies with your own tests, and reports back with evidence — never claiming success without proof.</p>

      <h2>What it is</h2>
      <p>MenteE SWE is a <strong>model-agnostic</strong> autonomous SWE agent. You bring your own model key; MenteE supplies the brain-to-editor harness: the tool layer, the verification loop, context management, and orchestration. The product is the harness — not the underlying LLM.</p>
      <ul>
        <li><strong>Autonomous by default</strong> — describe a task in plain English; it explores, edits, and verifies on its own.</li>
        <li><strong>Model-agnostic</strong> — switch providers without changing how you work.</li>
        <li><strong>Safe by design</strong> — no silent deletions, no unbounded reads, no destructive commands without approval.</li>
        <li><strong>Persistent</strong> — remembers prior conversations and project knowledge across restarts.</li>
      </ul>

      <h2>Install and go</h2>
      <pre><code>npm i -g @menteeai/menteeswe
mentee config
cd your-project
mentee "fix the failing auth tests"</code></pre>
      <p>Or try without installing: <code>npx @menteeai/menteeswe "your task"</code>. Requires Node 20+. MIT licensed.</p>

      <h2>The tool suite</h2>
      <p>MenteE SWE ships with a complete tool layer: filesystem (read, write, patch, move), search (regex, files, list), git (status, diff, log, branches), execution (with safe auto-approve for reads), testing (run tests, linter, typecheck), environment inspection, persistent memory, and web search. There is no <code>delete_file</code> tool — deletion is never automatic.</p>

      <h2>Supported providers</h2>
      <p>Z.ai Coding is the default. Also supports Kimi Moonshot, GLM Zhipu, and Z.ai GLM international. All configurable via <code>mentee config</code> or environment variables.</p>

      <h2>What's next</h2>
      <p>Subagents for parallel investigation, PR creation workflows, and team/shared memory scopes are on the roadmap. Install it today from <a href="https://www.npmjs.com/package/@menteeai/menteeswe" target="_blank" rel="noopener">npm</a> or visit <a href="/products/swe">/products/swe</a> for details.</p>
    `,
  },
  {
    slug: "mentee-embed-v4-41m-model-benchmarks",
    title: "mentee-embed-v4: 146% Custom Bench Improvement, 18K sents/sec, mMARCO Arabic",
    excerpt:
      "MenteE AI publishes mentee-embed-v4 — 2.6M triplets, 3-round distillation, mMARCO Arabic data. Custom bench MRR@10 0.252 (+146% vs v3), MIRACL AR 0.874, 18,115 sents/sec on RTX 5090.",
    date: "2026-08-28",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Research", "mentee-embed", "AI"],
    keywords: [
      "mentee-embed-v4", "trilingual embeddings", "mMARCO Arabic",
      "embedding benchmarks", "MenteE AI", "knowledge distillation",
    ],
    readTime: "8 min read",
    coverLabel: "Research",
    content: `
      <p><strong>MenteE AI</strong> publishes <strong>mentee-embed-v4</strong>, the latest model in our trilingual embedding series for Arabic, English, and Urdu. v4 retains the 41M architecture from v3 but expands training data to <strong>2.6M triplets</strong> with mMARCO Arabic retrieval data (500K) and adds a <strong>third distillation round</strong> with re-mined hard negatives.</p>

      <h2>What changed from v3 to v4</h2>
      <ul>
        <li>Training data: 2.1M → <strong>2.6M triplets</strong> (+500K mMARCO Arabic)</li>
        <li>Distillation rounds: 2 → <strong>3 rounds</strong> with progressive hard negative mining</li>
        <li>Custom bench MRR@10: 0.103 → <strong>0.252 (+146%)</strong></li>
        <li>MIRACL AR: 0.475 → <strong>0.825 (acc@1) / 0.874 (MRR@10)</strong></li>
        <li>Throughput: <strong>18,115 sents/sec</strong> on RTX 5090 — 3.5× faster than mpnet-base</li>
        <li>Cost: <strong>$7.15 per 1B sentences</strong></li>
      </ul>

      <h2>Training pipeline</h2>
      <p>Stage A: 50K-step MLM pretraining (6× more than v3). Stage B: three distillation rounds with GPU-accelerated hard negative mining between each. Teacher: multilingual-e5-base. The third round polished performance on dialect Arabic and Roman Urdu — the hardest slices.</p>

      <h2>Key finding: Arabic is strong</h2>
      <p>v4 scores 0.825/0.874 on MIRACL Arabic — close to pretrained mpnet-base (0.860/0.898) at <strong>6.8× fewer parameters</strong>. This is the first sub-50M model to approach pretrained performance on Arabic retrieval from random initialization.</p>

      <h2>How to use v4</h2>
      <pre><code>from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v4", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v4",    trust_remote_code=True)

embeddings = model.encode(texts, tokenizer=tok)
# torch.Tensor of shape (N, 384), L2-normalised</code></pre>

      <h2>Full report</h2>
      <p>All benchmarks, charts, and reproduction steps at <a href="/research">/research</a>. Model: <a href="https://huggingface.co/MenteEAI/mentee-embed-v4" target="_blank" rel="noopener">MenteEAI/mentee-embed-v4</a>. GitHub: <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a>.</p>
    `,
  },
  {
    slug: "using-mentee-swe-in-ci-cd-pipelines",
    title: "Using MenteE SWE in CI/CD: Headless Mode for Automated Code Fixes",
    excerpt:
      "MenteE SWE supports headless mode for CI/CD pipelines. Run tasks without the terminal UI, get structured output, and integrate autonomous code fixes into your workflow.",
    date: "2026-08-27",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Guide", "MenteE SWE", "DevOps"],
    keywords: [
      "MenteE SWE CI/CD", "headless mode", "automated code fixes",
      "pipeline automation", "@menteeai/menteeswe",
    ],
    readTime: "5 min read",
    coverLabel: "Guide",
    content: `
      <p>MenteE SWE is not just a terminal tool — it supports <strong>headless mode</strong> for scripted and CI/CD workflows. Here is how to integrate it into your pipeline.</p>

      <h2>Headless mode</h2>
      <pre><code>mentee --yes --no-tui "fix the failing tests"</code></pre>
      <p>The <code>--yes</code> flag auto-approves restricted operations. <code>--no-tui</code> disables the interactive terminal UI and outputs plain text. This is ideal for GitHub Actions, GitLab CI, or any scripted environment.</p>

      <h2>Example: GitHub Actions</h2>
      <pre><code>- name: Auto-fix lint issues
  run: |
    npx @menteeai/menteeswe --yes --no-tui "fix all ESLint errors in src/"</code></pre>
      <p>MenteE SWE will explore the codebase, identify the lint errors, apply fixes, run your linter to verify, and report what changed — all without human intervention.</p>

      <h2>Safety in automation</h2>
      <p>Even in headless mode, the safety model applies. Dangerous commands are blocked. Deletion is never automatic. The agent is scoped to your workspace. In CI, this means it can fix code but cannot push — you review and merge.</p>

      <h2>Provider configuration for CI</h2>
      <p>Set your API key as a CI secret: <code>MENTEE_ZAI_API_KEY: \${{ secrets.MENTEE_ZAI_API_KEY }}</code>. The agent reads it from the environment — no config file needed in CI.</p>

      <h2>Learn more</h2>
      <p>Full CLI reference and provider setup at <a href="/products/swe">/products/swe</a>. Package: <a href="https://www.npmjs.com/package/@menteeai/menteeswe" target="_blank" rel="noopener">@menteeai/menteeswe</a>.</p>
    `,
  },
  {
    slug: "arabic-embedding-benchmark-2026-mentee-embed-v4",
    title: "Arabic Embedding Benchmark 2026: How mentee-embed-v4 Approaches Pretrained Performance",
    excerpt:
      "mentee-embed-v4 scores 0.874 MRR@10 on MIRACL Arabic — close to mpnet-base (0.898) at 6.8× fewer parameters. A deep dive into Arabic retrieval from scratch.",
    date: "2026-08-26",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Research", "Arabic NLP", "Embeddings"],
    keywords: [
      "Arabic embeddings", "MIRACL Arabic", "mentee-embed-v4",
      "Arabic NLP 2026", "multilingual retrieval", "MenteE AI",
    ],
    readTime: "7 min read",
    coverLabel: "Research",
    content: `
      <p>Arabic is one of the hardest languages for small embedding models. Most sub-100M models either ignore it entirely or score poorly. <strong>mentee-embed-v4</strong> from <a href="https://menteeai.org">MenteE AI</a> changes that — scoring <strong>0.874 MRR@10 on MIRACL Arabic</strong>, close to pretrained mpnet-base (0.898) at 6.8× fewer parameters.</p>

      <h2>The Arabic problem in small models</h2>
      <p>all-MiniLM-L6-v2 (23M, pretrained on 1B+ English pairs) scores 0.084 on dialect Arabic in our custom bench. That is effectively random. Arabic has complex morphology, diglossia (MSA vs dialect), and right-to-left script — none of which English-pretrained models handle well.</p>

      <h2>How v4 solves it</h2>
      <ul>
        <li>Custom 50K BPE tokenizer trained on trilingual corpus — Arabic gets fair vocabulary share</li>
        <li>500K mMARCO Arabic retrieval triplets added to training data</li>
        <li>3-round distillation with progressive hard negative mining</li>
        <li>50K MLM pretraining steps (6× more than v3) for deeper language understanding</li>
      </ul>

      <h2>Results</h2>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:20px 0; text-align:center;">
        <div style="border:1px solid #e5e7eb; border-radius:16px; padding:20px;">
          <div style="font-size:26px; font-weight:800; color:#111;">0.874</div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:#737373;">MIRACL AR MRR@10</div>
          <div style="font-size:12px; color:#a3a3a3;">vs 0.898 mpnet</div>
        </div>
        <div style="border:1px solid #e5e7eb; border-radius:16px; padding:20px;">
          <div style="font-size:26px; font-weight:800; color:#111;">41M</div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:#737373;">Parameters</div>
          <div style="font-size:12px; color:#a3a3a3;">vs 278M mpnet</div>
        </div>
        <div style="border:1px solid #e5e7eb; border-radius:16px; padding:20px;">
          <div style="font-size:26px; font-weight:800; color:#111;">3.5×</div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:#737373;">Faster inference</div>
          <div style="font-size:12px; color:#a3a3a3;">18,115 sents/sec</div>
        </div>
      </div>

      <h2>What this means</h2>
      <p>For the first time, a sub-50M model trained from scratch approaches pretrained performance on Arabic retrieval. This unlocks Arabic-first search, RAG, and classification for fintech, legal, and government workflows in MENA — at a fraction of the compute cost.</p>

      <h2>Full report</h2>
      <p>Per-language breakdowns, charts, and reproduction steps at <a href="/research">/research</a>. Model: <a href="https://huggingface.co/MenteEAI/mentee-embed-v4" target="_blank" rel="noopener">MenteEAI/mentee-embed-v4</a>.</p>
    `,
  },
  {
    slug: "why-we-train-from-scratch-instead-of-fine-tuning",
    title: "Why We Train From Scratch Instead of Fine-Tuning: The MenteE Embed Philosophy",
    excerpt:
      "Most embedding models fine-tune a pretrained backbone. MenteE Embed trains from random initialization. Here is why we chose the harder path and what it gives us.",
    date: "2026-08-25",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Research", "AI", "Philosophy"],
    keywords: [
      "train from scratch", "embedding training", "knowledge distillation",
      "MenteE AI", "MLM pretraining", "contrastive learning",
    ],
    readTime: "6 min read",
    coverLabel: "Research",
    content: `
      <p>Every major embedding model — MiniLM, E5, BGE, mpnet — fine-tunes a pretrained backbone. <strong>MenteE Embed</strong> trains from random initialization. This is harder, slower, and produces smaller numbers on English benchmarks. We chose it anyway. Here is why.</p>

      <h2>The fine-tuning trap</h2>
      <p>Fine-tuning gives you strong English performance for free — the backbone already knows English. But it also means your model inherits the backbone's biases: English-heavy vocabulary, limited Arabic/Urdu morphology, and a fixed architecture that may not fit your latency budget. When we tested MiniLM-L6-v2 on Arabic, it scored 0.084 on dialect — effectively random despite being "pretrained on 1B+ pairs."</p>

      <h2>What training from scratch gives us</h2>
      <ul>
        <li><strong>Custom tokenizer</strong> — 50K BPE trained on our trilingual corpus, giving Arabic and Urdu fair vocabulary share</li>
        <li><strong>Controlled architecture</strong> — 41M params, 384-dim, 512-token context — exactly what we need, nothing more</li>
        <li><strong>Language parity</strong> — no English head start means the model must learn all three languages equally</li>
        <li><strong>Full reproducibility</strong> — random seed → trained model, no pretrained dependencies</li>
      </ul>

      <h2>The cost</h2>
      <p>Training from scratch requires more data, more steps, and careful bootstrap. Our two-stage recipe (MLM → relational distillation) solves the collapse problem that kills most from-scratch attempts. Stage A gives language awareness; Stage B gives retrieval geometry. The v1→v4 progression proves the method scales.</p>

      <h2>The result</h2>
      <p>v4 scores 0.874 MIRACL AR from random init — approaching pretrained mpnet (0.898) at 6.8× fewer parameters. That is not a coincidence — it is what happens when you design the model for the task instead of adapting someone else's model to the task.</p>

      <h2>Read more</h2>
      <p>Full training details at <a href="/research">/research</a>. Code: <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a>. Model: <a href="https://huggingface.co/MenteEAI/mentee-embed-v4" target="_blank" rel="noopener">MenteEAI/mentee-embed-v4</a>.</p>
    `,
  },
  // ── NEW v3 posts (prepended — newest first) ──────────────────────────────
  {
    slug: "introducing-mentee-embed-v3-how-far-can-you-train-from-scratch",
    title: "Introducing mentee-embed-v3: How Far Can Multilingual Embeddings Be Trained from Scratch?",
    excerpt:
      "MenteE AI publishes mentee-embed-v3 — a 41M trilingual embedding model for Arabic, English and Urdu trained from random init with 2.1M triplets, MS-MARCO retrieval data, hard negatives and batch size 512. Protocol A avg MRR@10 0.655. Published at doi:10.5281/zenodo.22117673.",
    date: "2026-08-26",
    author: "Syed Syab Ahmad",
    authorLink: "https://syab.tech",
    tags: ["Research", "mentee-embed", "AI"],
    keywords: [
      "mentee-embed-v3",
      "mentee-embed",
      "multilingual embeddings from scratch",
      "Arabic NLP",
      "Urdu NLP",
      "MenteE AI",
      "menteeai.org",
      "MS-MARCO",
      "hard negatives",
      "knowledge distillation",
      "text embeddings",
    ],
    readTime: "9 min read",
    coverLabel: "Research",
    content: `
      <p><strong>MenteE AI</strong> publishes <strong>mentee-embed-v3</strong>, the latest model in our open trilingual embedding series for <strong>Arabic, English and Urdu</strong>. The preprint is citable at <a href="https://doi.org/10.5281/zenodo.22117673" target="_blank" rel="noopener">doi:10.5281/zenodo.22117673</a> and the model weights are live at <a href="https://huggingface.co/MenteEAI/mentee-embed-v3" target="_blank" rel="noopener">huggingface.co/MenteEAI/mentee-embed-v3</a>.</p>

      <h2>What changed from v1 to v3?</h2>
      <p>Same 41M architecture. Completely different data and training regime. v1 used ~810K triplets (NLI + XNLI + OPUS), batch 192, one distillation round. v3 uses <strong>2.1M triplets</strong>, batch 512, two distillation rounds with hard negative mining between rounds, and adds <strong>700K MS-MARCO BM25 + 200K MS-MARCO hard negative</strong> passages that v1 never saw. The table below tells the story:</p>

      <div style="overflow:hidden; border-radius:16px; border:1px solid #e5e7eb; margin:24px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead style="background:#fafafa; border-bottom:1px solid #e5e7eb;">
            <tr>
              <th style="padding:10px 14px; text-align:left; font-weight:600; color:#525252;">Version</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Params</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Batch</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Prot-A MRR@10</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Prot-C MRR@10</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#737373;">v1</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">41M</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">192</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.585</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">~0.20</td>
            </tr>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#737373;">v2</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">125M</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">128</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.429 ↓</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.215</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:10px 14px; font-weight:700; color:#111;">v3</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">41M</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">512</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.655</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.645</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>The key scientific finding: batch size beats model size</h2>
      <p>v2 was our biggest bet — 125M parameters with a bigger hidden dimension, hoping scale would win. It didn't: Protocol A dropped from 0.585 to 0.429 and Protocol C stayed at 0.215. The culprit? The extra parameters consumed so much VRAM that batch size was forced down from 192 to 128. Fewer negatives per batch means less contrastive signal, and the model suffered for it.</p>
      <p>v3 returned to 41M, raised batch to 512, and the result is unambiguous: <strong>Protocol C jumped from 0.215 to 0.645 — a 3× improvement</strong> while model size decreased. Under a fixed VRAM budget, choose a smaller model that enables a larger batch. That is the headline finding.</p>

      <h2>Training pipeline in full</h2>
      <p><strong>Stage A — MLM (8,000 steps, batch 32, lr 5×10⁻⁴, bf16).</strong> Custom 50K BPE tokenizer trained from scratch on 1.1M trilingual sentences. Produces a language-aware backbone with no pretrained weights anywhere. ~45 minutes on RTX 5090.</p>
      <p><strong>Stage B — Distillation Round 1 (4K steps, batch 512, temp 0.05).</strong> Teacher is <code>intfloat/multilingual-e5-base</code> (768-dim), frozen. Student learns to reproduce the teacher's full batch cosine similarity matrix via MSE + InfoNCE. No hard negatives yet.</p>
      <p><strong>Stage B — Distillation Round 2 (10K steps, batch 512, temp 0.05).</strong> Hard negatives mined GPU-side via chunk-wise dot products after Round 1. Top-5 hardest negatives per anchor injected into training. This is where the MS-MARCO gap closes.</p>

      <h2>Benchmark results — honest numbers</h2>
      <p><strong>Protocol A (in-batch, ~97 candidates):</strong> avg MRR@10 <strong>0.655</strong>. The only sub-50M model functional across all three languages — <code>all-MiniLM-L6-v2</code> scores 0.144 AR and 0.140 UR (pretrained, 23M). mentee-embed-v3 scores 0.475 AR and 0.443 UR from random initialization.</p>
      <p><strong>Protocol B (MIRACL Wikipedia corpus, up to 15,201 passages):</strong> avg MRR@10 0.260. This is out-of-domain by design — zero Wikipedia passages in training. Pretrained mpnet-base-v2 reaches 0.670 here. We document the gap openly.</p>
      <p><strong>Protocol C (MS-MARCO, 10,296 passages):</strong> MRR@10 <strong>0.645</strong>, R@100 <strong>0.957</strong>. In-domain, strong. The 3× jump from v2 isolates MS-MARCO retrieval data and batch size as the causal factors.</p>
      <p><strong>STS-B (Spearman ρ):</strong> 0.683. Training was optimized for retrieval, not graded similarity — yet v3 generalizes to STS with no similarity supervision.</p>

      <h2>How to use v3 — three lines</h2>
      <pre><code>from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v3", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v3",    trust_remote_code=True)

embeddings = model.encode(texts, tokenizer=tok)
# torch.Tensor of shape (N, 384), L2-normalised</code></pre>
      <p><code>trust_remote_code=True</code> is standard for custom-architecture HuggingFace models — the code runs locally on your machine.</p>

      <h2>What's honest and what's a gap</h2>
      <p>We beat <code>all-MiniLM-L6-v2</code> on Protocol A and C despite training from scratch. We lag pretrained models on Protocol B (Wikipedia, out-of-domain) and STS-B (not our training objective). Single-seed results — variance unquantified. Full breakdown on <a href="/research">/research</a>.</p>

      <h2>Cite v3</h2>
      <pre style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere; max-width: 100%; overflow-x: auto; background: #171717; color: #f5f5f5; padding: 16px; border-radius: 16px; font-size: 12px; line-height: 1.6;"><code style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;">@misc{mentee-embed-v3-2026,
  title   = {mentee-embed-v3: Trilingual Text Embeddings Trained from Scratch},
  author  = {Syed Syab Ahmad Shah and Team MenteE AI},
  year    = {2026},
  url     = {https://huggingface.co/MenteEAI/mentee-embed-v3},
  note    = {Apache-2.0 License. DOI: 10.5281/zenodo.22117673}
}</code></pre>
      <p>Model card: <a href="/embed-models">/embed-models</a> · Full technical report: <a href="/research">/research</a> · GitHub: <a href="https://github.com/MenteE-s/mentee-embeddings" target="_blank" rel="noopener">github.com/MenteE-s/mentee-embeddings</a></p>
    `,
  },
  {
    slug: "batch-size-beats-model-size-contrastive-learning-lesson",
    title: "Batch Size Beats Model Size: The Lesson from Training mentee-embed-v2 and v3",
    excerpt:
      "MenteE AI scaled up to 125M parameters for v2 and performance dropped. Returning to 41M with batch 512 produced a 3× Protocol C improvement. Here is exactly why batch size dominates over parameter count in from-scratch contrastive embedding training.",
    date: "2026-08-27",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Research", "AI", "Embeddings"],
    keywords: [
      "contrastive learning batch size",
      "knowledge distillation",
      "mentee-embed-v3",
      "in-batch negatives",
      "InfoNCE",
      "embedding training",
      "MenteE AI",
      "menteeai.org",
      "from scratch embeddings",
    ],
    readTime: "7 min read",
    coverLabel: "Research",
    content: `
      <p>When <strong>MenteE AI</strong> published <a href="/embed-models">mentee-embed-v1</a> the most common question was: <em>what happens if you make the model bigger?</em> We answered it empirically with v2. The answer was: <strong>performance drops</strong>. This post explains why, and what v3 proves instead.</p>

      <h2>The v2 experiment: 125M, batch forced to 128</h2>
      <p>v2 increased the Transformer hidden dim to match a 125M parameter count — a 3× scale-up. On paper this should win: more capacity, more representation power. In practice, 125M parameters consume significantly more VRAM, which forced our training batch size down from 192 (v1) to 128 (v2). The results:</p>
      <ul>
        <li>Protocol A avg MRR@10: 0.585 (v1) → <strong>0.429 ↓</strong> (v2)</li>
        <li>Protocol C MRR@10: ~0.20 (v1) → 0.215 (v2) — barely moved</li>
      </ul>
      <p>Bigger model, worse retrieval. That is not noise — it is a systematic signal.</p>

      <h2>Why batch size matters more than parameters in contrastive training</h2>
      <p>In InfoNCE-style contrastive learning, each training step asks the model to rank one positive against <em>N−1</em> in-batch negatives. With batch size 128, N−1 = 127. With batch size 512, N−1 = 511. More negatives per step means:</p>
      <ul>
        <li><strong>Harder gradient signal</strong> — easy negatives don't contribute meaningful loss</li>
        <li><strong>Better calibration</strong> — the model must rank against a diverse, large pool every step</li>
        <li><strong>More efficient training</strong> — each GPU forward pass does the work of ~4× smaller batches</li>
      </ul>
      <p>Our relational distillation loss compounds this: we compute a full <em>batch × batch</em> cosine similarity matrix and MSE it against the teacher's. At batch 128 that is 16,384 similarity pairs. At batch 512 that is <strong>262,144</strong> — 16× more dense supervision per step. The 125M model simply couldn't access that regime because VRAM was exhausted by its parameters.</p>

      <h2>The v3 solution: smaller model, bigger batch</h2>
      <p>v3 returned to 41M parameters — freeing enough VRAM to run batch 512. Add 2.1M triplets (vs ~810K in v1), two distillation rounds, and 700K MS-MARCO passages, and the results speak clearly:</p>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:20px 0; text-align:center;">
        <div style="border:1px solid #e5e7eb; border-radius:16px; padding:20px; background:#fff;">
          <div style="font-size:26px; font-weight:800; color:#111;">3×</div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:#737373; margin-top:4px;">Protocol C improvement</div>
          <div style="font-size:12px; color:#a3a3a3; margin-top:2px;">0.215 → 0.645</div>
        </div>
        <div style="border:1px solid #e5e7eb; border-radius:16px; padding:20px; background:#fff;">
          <div style="font-size:26px; font-weight:800; color:#111;">512</div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:#737373; margin-top:4px;">Batch size unlocked</div>
          <div style="font-size:12px; color:#a3a3a3; margin-top:2px;">vs 128 in v2</div>
        </div>
        <div style="border:1px solid #e5e7eb; border-radius:16px; padding:20px; background:#fff;">
          <div style="font-size:26px; font-weight:800; color:#111;">41M</div>
          <div style="font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:#737373; margin-top:4px;">Model size ↓</div>
          <div style="font-size:12px; color:#a3a3a3; margin-top:2px;">125M → 41M</div>
        </div>
      </div>
      <p>The 3× Protocol C jump happened while the model got <em>smaller</em>. That isolates batch size and MS-MARCO data as the two causal factors — not model capacity.</p>

      <h2>Practical rule for from-scratch embedding training</h2>
      <p>Under a fixed VRAM budget: <strong>pick the smallest model that fits your downstream latency requirement, then maximize batch size with the freed memory</strong>. Add in-domain retrieval data (MS-MARCO or domain-specific pairs) before scaling parameters. Our v1→v2→v3 ablation is a controlled experiment that demonstrates this on a real multilingual task.</p>

      <h2>What's next</h2>
      <p>The next question is whether Arabic and Urdu Protocol B (Wikipedia corpus retrieval) can be improved with domain-matched multilingual retrieval data. We have the pipeline — it is a data question now. Full numbers and reproduction steps at <a href="/research">/research</a>. Model at <a href="https://huggingface.co/MenteEAI/mentee-embed-v3" target="_blank" rel="noopener">MenteEAI/mentee-embed-v3</a>. Preprint: <a href="https://doi.org/10.5281/zenodo.22117673" target="_blank" rel="noopener">doi:10.5281/zenodo.22117673</a>.</p>
    `,
  },
  {
    slug: "mentee-embed-v3-vs-minilm-mpnet-arabic-urdu-benchmark-2026",
    title: "mentee-embed-v3 vs MiniLM vs mpnet: Arabic, English and Urdu Benchmark 2026",
    excerpt:
      "Side-by-side benchmark: mentee-embed-v3 (41M, random init) vs all-MiniLM-L6-v2, paraphrase-MiniLM-L12-v2 and mpnet-base-v2 across in-batch retrieval, Wikipedia corpus and MS-MARCO. The only sub-50M model that works across all three languages.",
    date: "2026-08-28",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Research", "Guide", "Embeddings"],
    keywords: [
      "mentee-embed-v3 benchmark",
      "mentee-embed vs minilm",
      "mentee-embed vs mpnet",
      "Arabic embedding model 2026",
      "Urdu embedding model 2026",
      "multilingual embedding comparison",
      "MenteE AI",
      "menteeai.org",
      "MRR@10",
      "text retrieval",
    ],
    readTime: "8 min read",
    coverLabel: "Guide",
    content: `
      <p>If you need an embedding model that works across <strong>Arabic, English and Urdu</strong> without paying for a closed API, your options in 2026 are limited. This post benchmarks <strong>mentee-embed-v3</strong> from <a href="https://menteeai.org">MenteE AI</a> against the most common open alternatives on three protocols. All numbers are from our open technical report at <a href="/research">/research</a> and preprint <a href="https://doi.org/10.5281/zenodo.22117673" target="_blank" rel="noopener">doi:10.5281/zenodo.22117673</a>.</p>

      <h2>The models compared</h2>
      <ul>
        <li><strong>mentee-embed-v3</strong> — 41M, 384-dim, random init, Apache 2.0. <a href="https://huggingface.co/MenteEAI/mentee-embed-v3" target="_blank" rel="noopener">MenteEAI/mentee-embed-v3</a></li>
        <li><strong>all-MiniLM-L6-v2</strong> — 23M, 384-dim, pretrained on 1B+ English pairs</li>
        <li><strong>paraphrase-MiniLM-L12-v2</strong> — 118M, 384-dim, pretrained</li>
        <li><strong>paraphrase-mpnet-base-v2</strong> — 278M, 768-dim, pretrained</li>
      </ul>

      <h2>Protocol A — In-batch retrieval (MRR@10, ~97 candidates)</h2>
      <p>Each query is ranked against ~97 in-batch candidates. This tests embedding quality in a realistic retrieval scenario.</p>

      <div style="overflow:hidden; border-radius:16px; border:1px solid #e5e7eb; margin:20px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead style="background:#fafafa; border-bottom:1px solid #e5e7eb;">
            <tr>
              <th style="padding:10px 14px; text-align:left; color:#525252; font-weight:600;">Model</th>
              <th style="padding:10px 14px; text-align:right; color:#525252; font-weight:600;">EN</th>
              <th style="padding:10px 14px; text-align:right; color:#525252; font-weight:600;">AR</th>
              <th style="padding:10px 14px; text-align:right; color:#525252; font-weight:600;">UR</th>
              <th style="padding:10px 14px; text-align:right; color:#525252; font-weight:600;">xling</th>
              <th style="padding:10px 14px; text-align:right; color:#525252; font-weight:600;">avg</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#525252;">mpnet-base-v2</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.931</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.839</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.806</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.880</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">0.864</td>
            </tr>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#525252;">MiniLM-L12-v2</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.924</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.819</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.753</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.841</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">0.836</td>
            </tr>
            <tr style="border-bottom:1px solid #f5f5f5; background:#fafafa;">
              <td style="padding:10px 14px; font-weight:700; color:#111;">mentee-v3 ★</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.766</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.475</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.443</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.848</td>
              <td style="padding:10px 14px; text-align:right; font-weight:700; color:#111;">0.655</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; color:#525252;">MiniLM-L6-v2</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.927</td>
              <td style="padding:10px 14px; text-align:right; color:#d97706;">0.144</td>
              <td style="padding:10px 14px; text-align:right; color:#d97706;">0.140</td>
              <td style="padding:10px 14px; text-align:right; color:#d97706;">0.186</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#737373;">0.479</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Key takeaway: <strong>MiniLM-L6-v2 is effectively broken for Arabic and Urdu</strong> despite being pretrained on 1B+ English pairs. mentee-embed-v3 starts from random initialization and scores 0.475 AR / 0.443 UR — the only sub-50M model that works across all three languages. We trail pretrained models on English (0.766 vs 0.924–0.931), which is expected given the English-heavy baselines.</p>

      <h2>Protocol B — Wikipedia corpus (up to 15,201 passages, out-of-domain)</h2>
      <p>Honest gap: mentee-embed-v3 scores avg MRR@10 <strong>0.260</strong> vs 0.633–0.670 for pretrained models. Zero Wikipedia passages were in our training data. This is a domain boundary, not a method failure — fine-tuning on Wikipedia-style passages would close this. If your use case is open-domain Wikipedia search, use mpnet or E5-base.</p>

      <h2>Protocol C — MS-MARCO (10,296 in-domain passages)</h2>
      <p>When the evaluation domain matches the training data, mentee-embed-v3 is strong: MRR@10 <strong>0.645</strong>, R@100 <strong>0.957</strong>. MiniLM-L6-v2 reaches 0.951 here because it was pretrained on massive English-only data including MSMARCO. We're 0.306 points behind with a 7× smaller model trained from scratch — not bad.</p>

      <h2>When to use mentee-embed-v3</h2>
      <ul>
        <li>✅ You need <strong>Arabic and/or Urdu</strong> retrieval — no other open sub-100M model is functional on both</li>
        <li>✅ You need a tiny, fast, on-device model (41M, 384-dim)</li>
        <li>✅ Your retrieval domain is <strong>conversational, NLI-style or MS-MARCO-style</strong></li>
        <li>✅ You want an open, reproducible model (Apache 2.0, full training code on GitHub)</li>
        <li>⚠️ Your use case is open-domain Wikipedia search — use mpnet-base-v2 instead</li>
        <li>⚠️ You need graded similarity (STS) as primary metric — retrieval-first trade-off</li>
      </ul>

      <h2>Get started</h2>
      <pre><code>from transformers import AutoModel, AutoTokenizer

tok   = AutoTokenizer.from_pretrained("MenteEAI/mentee-embed-v3", trust_remote_code=True)
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v3",    trust_remote_code=True)

embeddings = model.encode(texts, tokenizer=tok)  # (N, 384)</code></pre>
      <p>Full model card: <a href="/embed-models">/embed-models</a> · Technical report with all numbers: <a href="/research">/research</a> · Cite: <a href="https://doi.org/10.5281/zenodo.22117673" target="_blank" rel="noopener">doi:10.5281/zenodo.22117673</a></p>
    `,
  },
  // ── existing posts below ─────────────────────────────────────────────────
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
      <p>We report two protocols fully. <strong>Protocol A (in-batch, ~97 candidates)</strong>: mentee-embed-v1 reaches <strong>avg MRR@10 0.585</strong> beating <code>all-MiniLM-L6-v2</code> (0.449) and <strong>val acc@1 0.820</strong> even above paraphrase-MiniLM-L12-v2 (0.795), plus <strong>cross-lingual EN↔UR 0.757</strong> with no shared script. <strong>Protocol B (corpus-pool, 15K docs/lang)</strong>: MRR@10 ~0.19 per language and R@100 ~0.47 — usable as a re-ranker, not a billion-document standalone engine — while mpnet-base hits 0.94/0.68/0.58. We publish both wins and limits. See charts on <a href="/research">/research</a>.</p>

      <h2>How to use it</h2>
      <pre><code>import torch
from huggingface_hub import hf_hub_download
from src.model import build_embedder

model_pt = hf_hub_download("MenteEAI/mentee-embed-v1", "model.pt")
tok_path = hf_hub_download("MenteEAI/mentee-embed-v1", "tokenizer.json")

payload = torch.load(model_pt, map_location="cpu", weights_only=False)
model = build_embedder(payload["encoder_config"], payload["vocab_size"])
model.load_state_dict(payload["state_dict"])</code></pre>
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
          <div><div style="font-size: 22px; font-weight: 700; color: #111;">0.585</div><div style="font-size: 11px; color: #71717a; margin-top: 4px;">avg MRR@10<br/>vs 0.449 MiniLM-L6</div></div>
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
      "Contrastive training from scratch collapses. Relational distillation from multilingual-e5-base fixes it: a 41M mentee-embed student learns 960 dense numbers per batch to reach 0.585 MRR@10 vs 0.449 for all-MiniLM-L6-v2.",
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
      <p>We distill a 768-dim teacher into our 41M, 384-dim student. For each batch we compute cosine matrices <em>C_student</em> and <em>C_teacher</em> and minimize <code>rel_weight·MSE(Cs, Ct) + ce_weight·InfoNCE</code>. One sparse label becomes 960 dense supervision signals per batch. That is why mentee-embed-v1 reaches <strong>rel_mse 0.046</strong> and <strong>avg MRR@10 0.585</strong> vs <strong>all-MiniLM-L6-v2 0.449</strong>.</p>
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
        <li><strong>In-batch MRR@10</strong>: mentee-embed 0.585 vs MiniLM-L6 0.449 vs MiniLM-L12 0.840 vs mpnet 0.867</li>
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
