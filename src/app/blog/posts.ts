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
  /** Optional citation box (HTML). When present it replaces the default cite block. */
  citationHtml?: string;
};

export const posts: BlogPost[] = [
  // ── NEW research posts (newest first) ──────────────────────────────
  {
    slug: "think-while-you-speak-adaptive-computation-preprint",
    title: "Think While You Speak: A Preprint on Teaching Models When to Think, Not Just What to Answer",
    excerpt:
      "Our new preprint trains a model to decide per input whether to think. A fast linear path answers by default, an episodic memory gates a deliberate pathway, and the routing gradient is measured: 2.8% of easy inputs trigger deliberation, 99.7% of medium and 99.2% of hard. Pure NumPy, CPU only, DOI 10.5281/zenodo.24353178.",
    date: "2026-11-18",
    author: "Syed Syab Ahmad",
    authorLink: "https://syab.tech",
    tags: ["Research", "Adaptive Computation", "Preprint", "AI"],
    keywords: [
      "adaptive computation", "test-time compute", "when should AI think",
      "System 1 System 2 AI", "adaptive inference", "routing network",
      "episodic memory neural network", "memory-augmented neural network",
      "overthinking in AI models", "reasoning mode cost",
      "early exit vs routing", "NumPy neural network from scratch",
      "CPU-only model training", "Think While You Speak preprint",
      "adaptive cognitive processing", "MenteE AI research",
    ],
    readTime: "9 min read",
    coverLabel: "Research",
    citationHtml:
      '<strong>Cite the preprint:</strong> Shah, Syed Syab Ahmad &amp; Team MenteE AI (2026). Think While You Speak: Adaptive Computational Effort in Neural Dialogue Systems. Zenodo. <a href="https://doi.org/10.5281/zenodo.24353178" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">doi:10.5281/zenodo.24353178</a> · <a href="/research?model=acp" class="underline underline-offset-4">Read the full technical chapter</a>',
    content: `
      <p>Today most AI systems operate with a binary switch. Reasoning is either on for every question, or off for every question. Ask a reasoning model what two plus two is and it will happily spend a minute of compute and a thousand tokens proving it. Ask a small fast model a multi-step problem and it will fail confidently in half a second. Both failure modes come from the same design decision: the amount of thinking is fixed, not learned.</p>
      <p>Our new preprint, <a href="https://doi.org/10.5281/zenodo.24353178" target="_blank" rel="noopener noreferrer"><strong>Think While You Speak: Adaptive Computational Effort in Neural Dialogue Systems</strong></a>, trains that decision instead. This post walks through the architecture, the measured results, and the honest limitations.</p>

      <h2>The architecture: two paths and a monitor</h2>
      <p>The system, which we call Adaptive Cognitive Processing (ACP), has four components:</p>
      <ul>
        <li><strong>A fast pathway</strong>, deliberately linear. It answers by default and cannot fit nonlinear targets, which makes the capability gap between the two paths provable rather than assumed.</li>
        <li><strong>A deliberate pathway</strong>, a 48-unit MLP that can fit everything the fast path cannot, at roughly 54 times the multiply-accumulates.</li>
        <li><strong>A monitor</strong>, a linear gate over the input plus one explicit novelty scalar, producing a routing probability p. At inference, p above 0.5 means the deliberate answer ships.</li>
        <li><strong>An episodic memory</strong> of 30 keys. Novelty is one minus the maximum cosine similarity, so familiar inputs answer instantly and novel inputs escalate.</li>
      </ul>
      <p>Training combines task loss, routed cross-entropy against the ground-truth route, and a compute penalty. Every gradient is hand-derived in NumPy and verified against finite differences; the maximum relative error is 1.7e-9. The whole thing runs on a CPU.</p>

      <h2>The measured results</h2>
      <p>Five thousand examples, three difficulty levels, ten seeds. Task accuracy counts a prediction as correct when the absolute error is below 0.5.</p>
      <div style="overflow:hidden; border-radius:16px; border:1px solid #e5e7eb; margin:24px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead style="background:#fafafa; border-bottom:1px solid #e5e7eb;">
            <tr>
              <th style="padding:10px 14px; text-align:left; font-weight:600; color:#525252;">Model</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Accuracy</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Routing Acc.</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Delib. Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#fafafa;">
              <td style="padding:10px 14px; font-weight:700; color:#111;">ACP (ours)</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.935 ± 0.012</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.987 ± 0.002</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">0.672</td>
            </tr>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#737373;">Fixed MLP (no routing)</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.947 ± 0.007</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.667</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">1.000</td>
            </tr>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#737373;">Always Deliberate</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.937 ± 0.006</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.667</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">1.000</td>
            </tr>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#737373;">Random Router</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.653 ± 0.043</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.501 ± 0.008</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.499</td>
            </tr>
            <tr>
              <td style="padding:10px 14px; color:#737373;">Always Fast (linear)</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.370 ± 0.081</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.333</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">0.000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>The routing gradient is the headline. ACP deliberates on <strong>2.8% of easy inputs, 99.7% of medium inputs, and 99.2% of hard inputs</strong>. The ground-truth base rate is 66.7%, and ACP lands at 67.2%: it recovers the optimal policy almost exactly. Accuracy is 93.5%, within 0.2 points of the always-deliberate model, at two-thirds of the deliberation.</p>

      <h2>The ablation: memory is doing real work</h2>
      <p>A fair question about any memory-augmented architecture is whether the memory actually matters, or whether a plain gate on the input would do the same job. So we retrained the model with the novelty feature removed, leaving the monitor to route from the raw input alone. Across three seeds:</p>
      <ul>
        <li>Task accuracy dropped from <strong>94.3% to 73.7%</strong>.</li>
        <li>Routing accuracy dropped from 98.7% to 92.1%.</li>
        <li>The overall deliberation rate barely moved (66.2% vs 67.2%), but the allocation got worse: the x-only gate deliberated on 11.2% of easy inputs and only 87.9% of hard inputs.</li>
      </ul>
      <p>That last line is the mechanism. The misroutes land exactly where they cost the most: hard inputs sent to a linear path that cannot fit them. The memory feature is not decorative; it stabilizes the routing decision at the margin where an error hurts.</p>

      <h2>What we are not claiming</h2>
      <p>The preprint states its own boundaries, and we repeat them here. This is a mechanism study on a synthetic task, not a language model evaluation; dialogue is the motivating application and the next step. The router trains on ground-truth route labels, which a deployed system would not have, so label-free routing is the obvious follow-up. And the monitor itself is not free: the 30-key memory scan costs about 496 multiply-accumulates per input against 864 for the deliberate path, so at this operating point there is no net FLOP saving yet. A smaller memory or a low-dimensional sketch would move that crossover.</p>

      <h2>Read it, run it, break it</h2>
      <p>The preprint is open access at <a href="https://doi.org/10.5281/zenodo.24353178" target="_blank" rel="noopener noreferrer">doi:10.5281/zenodo.24353178</a>. The full implementation, including the hand-derived gradients, the gradient checker, the evaluation harness, and every chart generator, is at <a href="https://github.com/MenteE-s/adaptive-cognitive-processing" target="_blank" rel="noopener noreferrer">github.com/MenteE-s/adaptive-cognitive-processing</a> under MIT. The complete chapter with every table is on our <a href="/research?model=acp">research page</a>.</p>
      <p>If you build on it, disagree with it, or find a cheaper monitor that closes the FLOP gap, we want to hear about it. That is what publishing the method is for.</p>
    `,
  },
  {
    slug: "when-should-an-ai-model-think-adaptive-vs-fixed-compute",
    title: "When Should an AI Model Think? Adaptive Computation vs Fixed Compute, Explained",
    excerpt:
      "Reasoning on every query burns compute. Reasoning off fails hard questions. A plain-language guide to adaptive computation: early exit, model cascades, mixture-of-experts routing, memory-based novelty, and what changes when the decision to think is learned instead of configured.",
    date: "2026-11-19",
    author: "Syed Syab Ahmad",
    authorLink: "https://syab.tech",
    tags: ["Research", "Explainer", "Adaptive Computation", "AI"],
    keywords: [
      "adaptive computation explained", "when should AI think",
      "test-time compute explained", "why AI models overthink",
      "reasoning tokens cost", "early exit neural networks",
      "conditional computation", "model cascade routing",
      "mixture of experts routing", "LLM cost optimization",
      "when to use reasoning mode", "efficient inference",
      "System 1 System 2 cognitive architecture",
      "cheap model vs big model routing", "adaptive vs fixed compute",
    ],
    readTime: "8 min read",
    coverLabel: "Research",
    citationHtml:
      '<strong>Go deeper:</strong> our preprint measures this end to end. Shah, Syed Syab Ahmad &amp; Team MenteE AI (2026). Think While You Speak: Adaptive Computational Effort in Neural Dialogue Systems. Zenodo. <a href="https://doi.org/10.5281/zenodo.24353178" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">doi:10.5281/zenodo.24353178</a> · <a href="/research?model=acp" class="underline underline-offset-4">Technical chapter</a>',
    content: `
      <p>There is a question hiding inside every modern AI product roadmap, and almost nobody budgets for it: <strong>when should the model think?</strong> Reasoning mode on means every query pays the full price, including the ones that need none. Reasoning mode off means the hard queries fail quietly. Most teams pick one setting and live with both failure modes. This post explains the alternative, adaptive computation, in plain terms: what it is, the four main ways to do it, what each one costs, and what we measured when we built our own.</p>

      <h2>What adaptive computation means</h2>
      <p>Fixed compute means every input takes the same path through the same amount of machinery. Adaptive computation means the amount of processing depends on the input: easy inputs finish early, hard inputs get more work. Humans do this without noticing. You answer a familiar question reflexively and slow down only when something is unfamiliar. Cognitive scientists call the two modes System 1 and System 2; the analogy is useful as long as you remember that a two-path neural network is not a cognitive science proof, it is an engineering pattern.</p>

      <h2>Four ways to make compute adaptive</h2>
      <h3>1. Early exit</h3>
      <p>Attach small classifiers to intermediate layers of a network and stop as soon as confidence is high enough. BranchyNet is the classic reference. Cost per input drops, but the exit decision rides on a confidence score, and confidence is not the same as difficulty: a model can be confidently wrong.</p>
      <h3>2. Model cascades</h3>
      <p>Run a cheap model first and escalate to an expensive one when the cheap one is uncertain. This is how face detection worked for two decades before it was trendy. The hard part is the handoff rule: too strict and you pay full price anyway, too loose and the hard cases get cheap wrong answers.</p>
      <h3>3. Conditional compute inside the network</h3>
      <p>Mixture-of-experts and related methods route tokens through different subnetworks. Capacity is huge, active compute is small. The routing is per token and learned, but nothing in the architecture separates a quick answer from a careful one.</p>
      <h3>4. Architectural separation with a monitor</h3>
      <p>Two genuinely different pathways: a cheap one that answers by default and an expensive one that corrects it. A monitor decides per input. This is what our new preprint builds, with one addition we have not seen combined with it elsewhere: the monitor reads an explicit novelty signal computed from a small episodic memory, so the escalation is anchored to remembered experience rather than only to a learned threshold.</p>

      <h2>The measured example</h2>
      <p>Our preprint trains exactly that architecture in pure NumPy on a CPU and measures the routing behavior across ten seeds. The result is a clean routing gradient: <strong>2.8% of easy inputs trigger the expensive path, 99.7% of medium inputs, and 99.2% of hard inputs</strong>. Accuracy matches an always-deliberate model within 0.2 points at two-thirds of the deliberation. And when we ablate the memory feature, accuracy collapses from 94.3% to 73.7% because the router starts sending hard inputs to the fast path. The full numbers, tables and the honest limitations (supervised routing, monitor cost, synthetic task) are in the <a href="https://doi.org/10.5281/zenodo.24353178" target="_blank" rel="noopener noreferrer">preprint</a> and on our <a href="/research?model=acp">research page</a>.</p>

      <h2>Practical takeaways for teams shipping AI</h2>
      <ul>
        <li><strong>Measure your difficulty distribution before choosing a reasoning setting.</strong> If most of your traffic is easy, always-on reasoning is pure waste; if most of it is hard, always-off is silent failure. The distribution decides, not the demo.</li>
        <li><strong>Separate the two decisions:</strong> which pathway answers, and whether that pathway is trustworthy. Confidence-only routing conflates them.</li>
        <li><strong>Price the router too.</strong> A router that costs a large fraction of the expensive path cannot pay for itself. We publish our own crossover math in the paper rather than hiding it.</li>
        <li><strong>Log the routing decisions.</strong> A per-input flag of "did we think" is the cheapest observability you will ever add, and it is what makes the difficulty distribution measurable in production.</li>
      </ul>

      <h2>Where this is going</h2>
      <p>The open problems are clear: routing without supervision, routers that estimate their own uncertainty instead of memorizing a difficulty boundary, and memory that actually changes what the model knows rather than flagging what it has seen. Our preprint takes one measured step and publishes everything, including the parts that do not save compute yet. If the field is going to allocate computation the way people do, fluent by default and deliberate when necessary, it will be on top of measured building blocks exactly like this one.</p>
    `,
  },
  {
    slug: "mentee-code-3b-v1-training-report-agent-trajectories",
    title: "MenteE Code 3B v1: Training a Coding-Agent Model on 53,567 Trajectories for $0.13 (Full Report)",
    excerpt:
      "We fine-tuned Qwen2.5-Coder-3B-Instruct with LoRA on 53,567 execution-verified agent trajectories for $0.13 on one RTX 5090. Full report: loss curves, HumanEval results published with the regression included, root-cause analysis, and the v2 recipe.",
    date: "2026-11-19",
    author: "Syed Syab Ahmad",
    authorLink: "https://syab.tech",
    tags: ["Research", "MenteE Code", "Fine-tuning", "Coding Agents"],
    keywords: [
      "LoRA fine-tuning", "Qwen2.5-Coder-3B fine-tune", "coding agent model",
      "fine-tune code LLM", "agent trajectories dataset",
      "execution-verified training", "HumanEval benchmark results",
      "small coding model", "SWE-bench evaluation", "GGUF Ollama model",
      "RTX 5090 LLM training", "cheap LLM fine-tuning cost",
      "MenteE Code 3B", "coding model for terminal agents",
      "supervised fine-tuning SFT code",
    ],
    readTime: "9 min read",
    coverLabel: "Research",
    citationHtml:
      '<strong>Cite MenteE Code 3B:</strong> Shah, Syed Syab Ahmad &amp; Team MenteE AI (2026). MenteE Code 3B (v1): a coding-agent assistant fine-tuned on execution-verified trajectories. Hugging Face, Apache-2.0. <a href="https://huggingface.co/MenteEAI/MenteE-Code-3B" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">huggingface.co/MenteEAI/MenteE-Code-3B</a> · <a href="/research?model=code3b" class="underline underline-offset-4">Read the full technical chapter</a>',
    content: `
      <p><strong>MenteE Code 3B</strong> is our coding-agent model: a fine-tune built to live in a terminal, investigate a repository, edit files, run tests, and report honestly. This post is the full v1 training report. It includes the run configuration, the measured loss and accuracy, the benchmark, and the part most teams would cut: the regression we found, the root cause we traced it to, and the v2 recipe designed to fix it.</p>

      <h2>The thesis in one paragraph</h3></h2>
      <p>A small mixture-of-experts model can behave like a model ten times its size on agentic coding. Qwen3-Coder-Next activates about 3B parameters per token and reports 70.6 on SWE-bench Verified, which demonstrates the pattern. The mechanisms that make it work split into two groups: the ones you inherit from a good base model (sparse knowledge storage, cheap long-context attention, native tool-call format) and the ones that can only come from your own data (execution-verified post-training and long-horizon recovery behavior). Our project is built around the second group. The dataset flywheel is the moat; the training script is a commodity.</p>

      <h2>The data: 53,567 verified trajectories</h2>
      <p>v1 trained on <strong>53,567 schema-validated agent trajectories</strong>, deduplicated from 78,212 collected runs. Sources: SWE-agent, OpenHands, R2E-Gym and NVIDIA SWE-Zero subsets, plus runs from our own collector, which validates every row against a canonical JSON Schema before appending, and identity Q&amp;A for persona calibration. The dataset file is append-only: never truncated, never rewritten, checked against the collector's own belief as it grows.</p>

      <h2>The run configuration, fully measured</h2>
      <div style="overflow:hidden; border-radius:16px; border:1px solid #e5e7eb; margin:24px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;"><td style="padding:10px 14px; font-weight:600; color:#525252; width:180px;">Base model</td><td style="padding:10px 14px; color:#111;">Qwen2.5-Coder-3B-Instruct (3.09B params, Apache-2.0)</td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;"><td style="padding:10px 14px; font-weight:600; color:#525252;">Method</td><td style="padding:10px 14px; color:#111;">LoRA r=8, α=16, all-linear targets, bf16, gradient checkpointing, merged standalone</td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;"><td style="padding:10px 14px; font-weight:600; color:#525252;">Schedule</td><td style="padding:10px 14px; color:#111;">1,250 steps · 1 epoch · effective batch 16 · lr 2e-4 · seq len 4,096</td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;"><td style="padding:10px 14px; font-weight:600; color:#525252;">Context</td><td style="padding:10px 14px; color:#111;">32,768 native · 131,072 via YaRN (factor 4.0)</td></tr>
            <tr style="border-bottom:1px solid #f5f5f5;"><td style="padding:10px 14px; font-weight:600; color:#525252;">Hardware</td><td style="padding:10px 14px; color:#111;">1× RTX 5090 (32 GB) · 5 h 32 m · ~$0.13</td></tr>
            <tr><td style="padding:10px 14px; font-weight:600; color:#525252;">Final</td><td style="padding:10px 14px; color:#111;">loss 1.62 → <strong>0.317</strong> · token accuracy <strong>91.5%</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>That is the entire infrastructure requirement for v1: one consumer GPU and about thirteen cents. The claim is not that this is a frontier model. The claim is that the full loop, data collection, schema validation, training, evaluation and publishing, runs at a cost low enough to iterate weekly.</p>

      <h2>Evaluation: we publish this number on purpose</h2>
      <p>HumanEval pass@1, greedy decoding, 50 problems, both models on identical hardware with an identical harness, generated code executed against the official unit tests:</p>
      <div style="overflow:hidden; border-radius:16px; border:1px solid #e5e7eb; margin:24px 0;">
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead style="background:#fafafa; border-bottom:1px solid #e5e7eb;">
            <tr>
              <th style="padding:10px 14px; text-align:left; font-weight:600; color:#525252;">Model</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">Passed</th>
              <th style="padding:10px 14px; text-align:right; font-weight:600; color:#525252;">pass@1</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #f5f5f5;">
              <td style="padding:10px 14px; color:#737373;">Qwen2.5-Coder-3B-Instruct (base)</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">47 / 50</td>
              <td style="padding:10px 14px; text-align:right; color:#737373;">94.0%</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:10px 14px; font-weight:700; color:#111;">MenteE Code 3B v1</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">25 / 50</td>
              <td style="padding:10px 14px; text-align:right; font-weight:600; color:#111;">50.0%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Yes: v1 scores well below its own base model, and we are publishing that. Failure analysis found that <strong>24 of the 25 failures share one artifact</strong>: systematically doubled closing brackets. The cause is the v1 loss recipe, which applied loss to all trajectory roles, including noisy tool outputs, so the model learned to imitate tool noise alongside assistant code. It is a data-recipe issue with a known fix, not a capability ceiling. Two honest caveats: this is a 50-problem subset with roughly a ±14 point margin, so the numbers are directional rather than leaderboard-grade, and HumanEval is not the benchmark the thesis ultimately targets; SWE-bench Verified with a real agent harness is.</p>

      <h2>The v2 recipe</h2>
      <ul>
        <li><strong>Assistant-only loss</strong> — compute loss on assistant tokens only, so noisy tool outputs are context, not imitation targets.</li>
        <li><strong>Identity oversampling</strong> — keep the persona stable while the coding behavior changes.</li>
        <li><strong>LoRA r=16</strong> — more adaptation capacity for the behavior correction.</li>
      </ul>
      <p>The same run costs about thirteen cents, so the iteration loop is measured in days, not quarters.</p>

      <h2>What ships today</h2>
      <ul>
        <li><strong>Merged weights</strong> on <a href="https://huggingface.co/MenteEAI/MenteE-Code-3B" target="_blank" rel="noopener noreferrer">Hugging Face (MenteEAI/MenteE-Code-3B)</a>, Apache-2.0, with 32K native and 131K YaRN context.</li>
        <li><strong>GGUF builds</strong> for Ollama and llama.cpp at <a href="https://huggingface.co/MenteEAI/MenteE-Code-3B-GGUF" target="_blank" rel="noopener noreferrer">MenteEAI/MenteE-Code-3B-GGUF</a>.</li>
        <li><strong>OpenAI-compatible serving</strong> via vLLM, tested with OpenCode-class harnesses.</li>
        <li><strong>The collector toolkit</strong> and full docs in <a href="https://github.com/MenteE-s/MenteE-Code-3b" target="_blank" rel="noopener noreferrer">github.com/MenteE-s/MenteE-Code-3b</a>.</li>
      </ul>
      <p>v1 is a measured step, not a finished model. The dataset flywheel, the evaluation harness, and the v2 recipe are the project; the checkpoint is just what the flywheel produced this week. Pair it with an agent harness like <a href="/products/swe">MenteE SWE</a> and the model becomes the backend of a working terminal agent.</p>
    `,
  },
  // ── NEW RecruAI posts (newest first) ──────────────────────────────
  {
    slug: "jobs-in-dubai-uae-gulf-ai-matching-pakistan",
    title: "Jobs in Dubai, UAE and the Gulf from Pakistan: How RecruAI's AI Matching Finds Roles You'll Actually Get",
    excerpt:
      "Looking for jobs in Dubai, UAE, Saudi Arabia or Qatar from Pakistan? Learn how RecruAI's AI job matching understands your skills and matches you to real roles in Karachi, Lahore, Islamabad, Dubai, Riyadh, Doha, Kuwait City and Muscat — not just keyword listings.",
    date: "2026-09-09",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Guide", "RecruAI", "Gulf Jobs", "Pakistan"],
    keywords: [
      "jobs in Dubai", "jobs in UAE", "jobs in Saudi Arabia", "jobs in Qatar",
      "jobs in Pakistan", "jobs in Karachi", "jobs in Lahore", "Gulf jobs",
      "AI job matching", "RecruAI Gulf", "Pakistan to Gulf jobs",
      "hiring platform Pakistan", "job portal UAE",
    ],
    readTime: "8 min read",
    coverLabel: "Guide",
    content: `
      <p>Searching for <strong>jobs in Dubai</strong> or <strong>jobs in UAE</strong> from Pakistan often means scrolling through hundreds of irrelevant listings. <strong>RecruAI by MenteE</strong> was built to fix that — with AI matching that understands what you can actually do, not just what keywords you typed.</p>

      <h2>Why keyword search fails for Gulf jobs</h2>
      <p>Most job portals match the words in your CV against the words in a listing. If you write "React" and the listing says "Frontend Developer," you don't match — even though you do. RecruAI uses semantic matching: it reads your full profile — skills, experience, industry, preferred locations — and compares it against thousands of listings across <strong>Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain</strong>. That means a product manager in Lahore sees relevant roles in Dubai, a data scientist in Karachi finds openings in Riyadh, and a fresh graduate in Islamabad discovers opportunities in Doha that are actually within reach.</p>

      <h2>How matching works on RecruAI</h2>
      <ul>
        <li><strong>Your profile is the query.</strong> Not a search box — your experience, skills, education and preferences.</li>
        <li><strong>Listings are real.</strong> Roles from Systems Ltd, Careem, Daraz, STC, Talabat, Meezan Bank and 500+ other companies hiring across the Gulf.</li>
        <li><strong>Country chips matter.</strong> Filter by Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Oman or Bahrain — or let the AI suggest where your profile fits best.</li>
        <li><strong>One dashboard.</strong> Save roles, apply with one click, track interview schedules, results and analytics — all without leaving the platform.</li>
      </ul>

      <h2>From Lahore to Dubai in three weeks</h2>
      <p>One of our early users, a software engineer from Lahore, uploaded his CV, let the AI rewrite it for ATS, and was matched to a Senior Software Engineer role in Dubai that he had never searched for. He applied from Pakistan and was hired in under a month. The match wasn't luck — it was the AI understanding that his experience aligned with what the Dubai team needed.</p>

      <p>Ready to see what RecruAI finds for you? <a href="https://recruai.menteeai.org/register" target="_blank" rel="noopener">Create your profile at recruai.menteeai.org/register</a> and let the matching begin.</p>
    `,
  },
  {
    slug: "ai-mock-interviews-pakistan-gulf-preparation",
    title: "AI Mock Interviews That Prepare You for Real Interviews in Pakistan and the Gulf",
    excerpt:
      "Unlimited mock interviews with realistic AI questions and instant feedback — how RecruAI's practice mode helps job seekers in Pakistan, UAE, Saudi Arabia and Qatar get ready for the real interview and track their interview results.",
    date: "2026-09-08",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Guide", "RecruAI", "Interviews", "Career"],
    keywords: [
      "mock interview AI", "AI interview practice", "interview preparation Pakistan",
      "Gulf interview questions", "UAE interview practice", "Saudi Arabia interview",
      "practice interviews online", "interview feedback AI", "RecruAI interviews",
      "hiring pipeline practice", "job interview training",
    ],
    readTime: "7 min read",
    coverLabel: "Guide",
    content: `
      <p>Knowing the answer and delivering it in an interview are two different skills. <strong>RecruAI's mock interview</strong> practice closes that gap — with unlimited AI-powered sessions, realistic questions for your target role, and instant feedback on structure, content and confidence.</p>

      <h2>What you practice</h2>
      <p>Whether you're applying for software engineer jobs in Karachi, product manager roles in Dubai, UX designer openings in Riyadh, or data science positions in Doha, the AI generates questions specific to your track — not generic templates. You get a realistic interview flow, timed answers, and scoring that shows where you stood out and where you hesitated.</p>

      <h2>Instant feedback, trackable progress</h2>
      <ul>
        <li><strong>Real-time scoring</strong> — see your strengths and areas to improve after every session.</li>
        <li><strong>Progress over time</strong> — compare attempts, watch your scores climb, and build confidence before the real interview.</li>
        <li><strong>Shareable results</strong> — track interview results and analytics in your dashboard; share progress with mentors or keep it private.</li>
      </ul>

      <h2>Why unlimited matters</h2>
      <p>Expensive coaching services in Pakistan and the Gulf charge per session. RecruAI's practice mode is unlimited — practice the same role five times, switch industries, or try a Gulf-specific interview set for UAE and Saudi employers. Fresh graduates from FAST, NUST and LUMS use it to turn their first interview into their best interview.</p>

      <p>Start practicing today at <a href="https://recruai.menteeai.org/register" target="_blank" rel="noopener">recruai.menteeai.org/register</a> — then apply with confidence.</p>
    `,
  },
  {
    slug: "organization-hiring-pakistan-gulf-pipeline-automation",
    title: "Hiring in Pakistan and the Gulf: How Organizations Use RecruAI's Pipeline Automation to Hire Faster",
    excerpt:
      "For startups, SMEs and enterprises hiring across Pakistan, UAE, Saudi Arabia and Qatar — see how RecruAI's hiring pipeline (applied → screening → interview → offer → hired), AI screening agents and candidate search make hiring faster and fairer.",
    date: "2026-09-07",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Product", "RecruAI", "Organizations", "Hiring"],
    keywords: [
      "hiring organizations Pakistan", "Gulf hiring", "UAE hiring platform",
      "recruitment automation", "AI screening agents", "candidate search",
      "hiring pipeline software", "interview management", "post unlimited jobs",
      "organization hiring dashboard", "team hiring management", "RecruAI for companies",
    ],
    readTime: "7 min read",
    coverLabel: "Product",
    content: `
      <p>For <strong>organizations hiring in Pakistan and the Gulf</strong> — from startups in Karachi to enterprises in Dubai and Riyadh — manual resume screening is the bottleneck. <strong>RecruAI's pipeline automation</strong> removes it.</p>

      <h2>The pipeline: applied → screening → interview → offer → hired</h2>
      <p>Every candidate moves through the same visual pipeline. You post unlimited listings, and applications flow in. AI screening agents review each CV against the role description and produce a structured summary — skills matched, experience level, recommended stage. Your hiring managers review, approve, and move candidates forward — no spreadsheets, no scattered emails.</p>

      <h2>What organizations get</h2>
      <ul>
        <li><strong>Search and filter candidates</strong> by skills and experience — find the perfect match without scrolling hundreds of profiles.</li>
        <li><strong>Send invitations directly</strong> — schedule and manage interviews from the platform, track responses and outcomes.</li>
        <li><strong>AI-powered initial screening</strong> — automated evaluation before the first human interview, saving 40% of screening time.</li>
        <li><strong>Pipeline, analytics and team collaboration</strong> — hiring analytics, billing, team members and onboarding in one organization dashboard.</li>
      </ul>

      <h2>Built for the Gulf, trusted across industries</h2>
      <p>Whether you're hiring software engineers in Lahore, product managers in Karachi, UX designers in Dubai, or data scientists in Riyadh, RecruAI's candidate pool spans Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman. Companies across fintech, logistics, healthcare and education already use the platform to standardize their interview process.</p>

      <p>Set up your organization at <a href="https://recruai.menteeai.org/register" target="_blank" rel="noopener">recruai.menteeai.org/register</a> and post your first role in minutes.</p>
    `,
  },
  {
    slug: "resume-builder-gulf-ready-cv-ats-optimization",
    title: "Resume Builder to Gulf-Ready CV: How RecruAI Turns a Pakistan CV into an ATS-Optimized Resume",
    excerpt:
      "From a Pakistan CV to a Gulf-ready resume — how RecruAI's resume builder and CV optimizer rewrites your document for ATS, adds keywords for UAE, Saudi and Qatar employers, and lifts your score from first draft to hired.",
    date: "2026-09-06",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Guide", "RecruAI", "Resume Builder", "CV Optimization"],
    keywords: [
      "resume builder AI", "CV optimization Pakistan", "Gulf CV", "ATS score",
      "CV rewrite AI", "resume builder UAE", "ATS-optimized resume",
      "keyword suggestions CV", "CV ATS Pakistan", "RecruAI resume builder",
      "resume tips Gulf jobs", "CV builder online",
    ],
    readTime: "6 min read",
    coverLabel: "Guide",
    content: `
      <p>A strong CV in Pakistan doesn't always read as a strong resume in Dubai. <strong>RecruAI's resume builder</strong> bridges that gap — turning a local CV into a Gulf-ready resume that passes ATS filters in UAE, Saudi Arabia and Qatar.</p>

      <h2>What the CV optimizer does</h2>
      <p>Upload your CV and get instant AI rewrites, an ATS score, keyword gaps for your target market, and one-click improvements. The AI compares your document against patterns from listings in Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman — then suggests precise rewrites:</p>
      <ul>
        <li>Bullet points rewritten to match the language of your target listings — without losing your real experience.</li>
        <li>Title and summary aligned to industry-standard terminology hiring managers scan for.</li>
        <li>Natural keyword inclusion — not stuffing, but strategic placement based on the roles you want.</li>
      </ul>

      <h2>ATS scoring that actually helps</h2>
      <p>RecruAI doesn't just give you a number. It shows why you scored 52 or 78 or 91 — missing skills, unclear titles, weak verbs — and lets you fix them with one click. Users regularly lift their score from the 50s to the 90s before applying. That difference is often the difference between being filtered out and being invited.</p>

      <h2>From CV to profile to invitation</h2>
      <p>Once your resume is Gulf-ready, it powers your shareable public profile. Organizations searching for candidates in Dubai, Riyadh or Doha find you — even before you apply. Combine that with AI job matching and mock interview practice, and your application has momentum before the interview even starts.</p>

      <p>Upload and optimize your CV at <a href="https://recruai.menteeai.org/register" target="_blank" rel="noopener">recruai.menteeai.org/register</a> — free CV review, no credit card required.</p>
    `,
  },
  {
    slug: "recruai-ai-hiring-interview-platform-launch",
    title: "RecruAI Launch: AI Hiring and Interview Platform Built for Pakistan and the Gulf",
    excerpt:
      "RecruAI by MenteE is now live — an AI-powered hiring platform that matches job seekers with roles across Pakistan, UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman. It combines AI job matching, ATS-optimized CV rewrites, unlimited mock interviews, pipeline automation, and AI screening agents for organizations.",
    date: "2026-09-05",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Product", "RecruAI", "Hiring", "Pakistan", "Gulf"],
    keywords: [
      "RecruAI", "MenteE", "AI hiring platform", "AI interview platform",
      "job portal Pakistan", "jobs UAE Saudi Arabia Qatar Kuwait Bahrain",
      "AI job matching", "ATS scoring CV", "mock interview AI",
      "recruitment automation", "hiring pipeline software",
      "organization analytics hiring", "AI screening agents",
    ],
    readTime: "7 min read",
    coverLabel: "Product",
    content: `
      <p><strong>RecruAI by MenteE</strong> is a production AI hiring and interview platform — not a demo, not a landing page. It runs on a hybrid stack: PostgreSQL with pgvector for embeddings, Kafka (KRaft) for event streaming, Redis for session and cache, and a Flask backend driven by environment variables. The React frontend runs independently. This is production infrastructure — deployable with Docker Compose and ready for multi-country traffic.</p>

      <h2>For job seekers</h2>
      <p>RecruAI gives candidates an AI-matched job feed tailored to their skills, preferred industries, and target locations. The platform covers Pakistan and the full Gulf region: UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman. Job listings reference real companies and real roles — engineering, data science, product management, finance, healthcare, and more.</p>
      <ul>
        <li><strong>AI job matching</strong> — not keyword search, but semantic matching against your profile.</li>
        <li><strong>CV optimization</strong> — AI rewrites, ATS scoring, keyword suggestions, and a built-in resume builder.</li>
        <li><strong>Mock interviews</strong> — unlimited practice with realistic questions and instant feedback.</li>
        <li><strong>Application tracking</strong> — applied roles, saved listings, interview schedules, results, and analytics in one dashboard.</li>
        <li><strong>Public shareable profile</strong> — a profile page with visit analytics that you can share with recruiters or embed in applications.</li>
      </ul>

      <h2>For organizations</h2>
      <p>Hiring managers and HR teams get a dedicated organization dashboard. Post unlimited listings. Search and filter candidates by skills and experience. Send interview invitations directly. Manage the full pipeline: applied → screening → interview → offer → hired. Assign AI agents to automate screening. View analytics, billing, team access, and preferences — all in one place.</p>

      <h2>Technical architecture</h2>
      <p>The backend is Flask, environment-driven. The database layer uses PostgreSQL with pgvector for embeddings. Events flow through Kafka (KRaft mode). Sessions and caches live in Redis. The architecture is designed for production: observable, deployable with Docker Compose, and ready for the traffic that comes when a platform covers seven countries at once.</p>

      <h2>Geographic coverage</h2>
      <p>RecruAI is not a generic global job board. It is built for the markets where MenteE operates: Pakistan and the Gulf. That means country chips, localized job listings, and role categories that reflect the actual hiring demand in these markets — from startup engineering roles in Karachi and Lahore to senior positions in Dubai, Riyadh, Doha, Kuwait City, Manama, and Muscat.</p>

      <h2>What comes next</h2>
      <p>RecruAI is live today as a production platform. Verified growth metrics — total listings, optimized CVs, active companies, country coverage — will replace aspirational numbers as the user base scales. The team is focused on reliability, pipeline automation, and expanding AI agent capabilities for both individual job seekers and organizations.</p>
    `,
  },
  {
    slug: "ai-cv-optimizer-ats-scoring-keywords",
    title: "How RecruAI's AI CV Optimizer Works: ATS Scoring, Keyword Matching, and Real Rewrites",
    excerpt:
      "RecruAI's resume builder doesn't just format — it rewrites. Learn how the AI CV optimizer scores your document against ATS filters, suggests keywords from target roles, and produces versions that actually pass automated screening.",
    date: "2026-09-03",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Guide", "RecruAI", "CV Optimization", "ATS"],
    keywords: [
      "AI CV optimizer", "ATS scoring", "resume builder AI",
      "keyword matching resume", "automated screening CV",
      "RecruAI resume", "CV rewrite AI",
      "job application optimization", "hiring pipeline automation",
    ],
    readTime: "8 min read",
    coverLabel: "Guide",
    content: `
      <p>Most job applications are filtered out by an ATS before a human sees them. RecruAI's CV optimizer is designed to address that directly — not by gaming the system, but by making your resume genuinely relevant to the roles you apply for.</p>

      <h2>How ATS scoring works in RecruAI</h2>
      <p>The optimizer reads your CV, compares it against the skills, keywords, and experience patterns found in real job listings from the target market (Pakistan + UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman), and produces a relevance score. It highlights gaps — missing skills, missing keywords, unclear role titles — and provides concrete rewrite suggestions.</p>

      <h2>What the AI rewrites</h2>
      <ul>
        <li>Bullet points that match the language of target listings without losing your actual experience.</li>
        <li>Title and summary rewrites that align with industry-standard terminology.</li>
        <li>Keyword injection that is natural — not keyword stuffing, but strategic inclusion based on the job descriptions you target.</li>
      </ul>

      <h2>Practice before applying</h2>
      <p>RecruAI also offers unlimited mock interview practice. The AI asks realistic questions based on your target roles, gives instant feedback on structure and content, and helps you prepare for the real interview that follows a successful application. The pipeline from optimized CV to interview invitation to practice session to final hire is integrated — not fragmented across separate tools.</p>
    `,
  },
  {
    slug: "recruai-pipeline-automation-ai-screening",
    title: "RecruAI Pipeline Automation: From Applied to Hired with AI Screening Agents",
    excerpt:
      "How RecruAI's hiring pipeline works for organizations: applied, screening, interview, offer, hired. AI agents handle the first filter, managers manage the rest, and everything is tracked in one dashboard.",
    date: "2026-09-01",
    author: "MenteE AI Team",
    authorLink: "https://menteeai.org",
    tags: ["Product", "RecruAI", "Hiring Pipeline", "AI Agents"],
    keywords: [
      "RecruAI pipeline", "hiring pipeline automation", "AI screening agents",
      "candidate screening AI", "interview management platform",
      "organization hiring dashboard", "team hiring management",
      "job post unlimited listings", "recruitment analytics",
    ],
    readTime: "6 min read",
    coverLabel: "Product",
    content: `
      <p>RecruAI's organization dashboard is built around a simple pipeline: applied → screening → interview → offer → hired. Every stage has a purpose, and AI agents handle the first stage — automated screening — so hiring managers spend their time on qualified candidates, not on filtering out unqualified ones.</p>

      <h2>AI screening agents</h2>
      <p>Organizations can assign AI agents to review applications as they arrive. The agents evaluate CVs against the role description, flag candidates who match the required skills and experience, and provide a structured screening summary — skills matched, experience level, recommended stage. Managers review the agent's recommendation, approve or override, and move the candidate forward.</p>

      <h2>Interview scheduling and management</h2>
      <p>Once a candidate passes screening, managers can send interview invitations directly through the platform. The scheduling system integrates with the organization's calendar preferences and tracks the interview date, format (virtual or in-person), and outcome. After the interview, feedback is recorded in the pipeline so the team has a complete history — not scattered emails, not spreadsheets.</p>

      <h2>Analytics and billing</h2>
      <p>RecruAI provides organization-level analytics: number of active listings, applications per role, screening rate, interview conversion rate, offer rate, and time-to-hire. Billing and team access management are included — managers can add team members, set role-based permissions, and manage subscription details from the same dashboard where hiring happens.</p>
    `,
  },
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
      <p>Z.ai Coding is the default. v0.3.5 also ships 12 more — OpenAI, Anthropic, Gemini, DeepSeek, Kimi, GLM, Qwen (international + China), OpenRouter, and NVIDIA NIM — all configurable via <code>mentee config</code> or environment variables.</p>

      <h2>What's next</h2>
      <p>Subagents for parallel investigation, PR creation workflows, and team/shared memory scopes are on the roadmap. Install it today from <a href="https://www.npmjs.com/package/@menteeai/menteeswe" target="_blank" rel="noopener">npm</a> or visit <a href="/products/swe">/products/swe</a> for details.</p>
    `,
  },
  {
    slug: "migrating-v3-to-v4-embedding-pipeline",
    title: "Migrating from mentee-embed-v3 to v4: A Practical Guide",
    excerpt:
      "v4 is a drop-in replacement for v3 — same dimension, same API. But re-embedding your corpus, re-tuning thresholds, and a few gotchas are worth planning for.",
    date: "2026-09-01",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Guide", "mentee-embed", "Migration"],
    keywords: [
      "mentee-embed-v4 migration", "upgrade embedding model",
      "re-embedding corpus", "vector database migration", "MenteE AI",
    ],
    readTime: "6 min read",
    coverLabel: "Guide",
    content: `
      <p><strong>mentee-embed-v4</strong> keeps the same 384-dimensional output and the same <code>encode()</code> API as v3, so switching models is a one-line change. But because v4 was trained with an extra distillation round and re-mined hard negatives, its embedding geometry shifted enough that <em>you must re-embed your corpus</em> — mixing v3 and v4 vectors in the same index will silently degrade retrieval quality.</p>

      <h2>Step 1: Swap the model</h2>
      <pre><code># before
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v3", trust_remote_code=True)

# after
model = AutoModel.from_pretrained("MenteEAI/mentee-embed-v4", trust_remote_code=True)</code></pre>
      <p>Tokenizer, normalization, and max sequence length are unchanged. If you pin versions in production, bump your pin and run your eval suite before continuing.</p>

      <h2>Step 2: Re-embed everything</h2>
      <p>v3 and v4 vectors are <strong>not compatible</strong> — cosine similarity between the same text embedded by both models averages ~0.7, far below the ~0.95 you'd expect from a drop-in upgrade. Do a full offline re-embed of your document store; don't mix old and new vectors in one index, even temporarily.</p>
      <pre><code>for batch in chunked(docs, 512):
    vecs = model.encode(batch, tokenizer=tok)
    index.upsert(ids=batch_ids, vectors=vecs)</code></pre>
      <p>At v4's throughput (~18K sentences/sec on an RTX 5090, ~900/sec on a mid-range GPU), a 1M-document corpus re-embeds in minutes, not hours. See the <a href="/research">research page</a> for hardware-specific numbers.</p>

      <h2>Step 3: Re-tune your similarity thresholds</h2>
      <p>v4 pushes relevant pairs slightly closer together and irrelevant pairs further apart (a side effect of the third distillation round). If you filter on a fixed cosine threshold — common for dedup or routing — expect the optimal cut-off to shift up by roughly 0.02–0.05. Re-run whatever threshold-sweep you used for v3 rather than copying the old value.</p>

      <h2>Gotchas</h2>
      <ul>
        <li><strong>Cached embeddings:</strong> if you cache query embeddings keyed by text, invalidate the cache on deploy — stale v3 query vectors against a v4 index will hurt recall.</li>
        <li><strong>Hybrid pipelines:</strong> BM25 + dense fusion weights may need a small re-tune; v4's stronger Arabic retrieval changes the score distribution on Arabic-heavy corpora.</li>
        <li><strong>Rollback plan:</strong> keep the v3 index around until your v4 eval numbers are confirmed in production traffic.</li>
      </ul>

      <h2>Is it worth it?</h2>
      <p>On our measured benchmarks: custom bench MRR@10 went from 0.103 to 0.252 (+146%), and MIRACL Arabic MRR@10 from 0.475 to 0.874. If your workload includes Arabic, Urdu, or mixed-language retrieval, the migration cost (one re-embed pass) pays for itself immediately. Full numbers and charts are at <a href="/research">/research</a>.</p>
    `,
  },
  {
    slug: "hard-negative-mining-multilingual-embeddings",
    title: "Hard Negative Mining: The Highest-Leverage Trick in Multilingual Embedding Training",
    excerpt:
      "Random in-batch negatives get you 80% of the way. The last 20% — dialects, code-switching, near-duplicate retrieval — comes from mining negatives that are almost right.",
    date: "2026-09-03",
    author: "MenteE AI Research",
    authorLink: "https://menteeai.org/research",
    tags: ["Research", "Training", "Contrastive Learning"],
    keywords: [
      "hard negative mining", "contrastive learning embeddings",
      "multilingual retrieval training", "InfoNCE", "mentee-embed",
    ],
    readTime: "7 min read",
    coverLabel: "Research",
    content: `
      <p>Ask what drove the biggest quality jump between mentee-embed-v3 and v4 and the answer isn't more data or a bigger model — it's <strong>hard negative mining</strong>. This post explains what it is, why it matters disproportionately for low-resource languages, and how we do it without blowing up training time.</p>

      <h2>The problem with easy negatives</h2>
      <p>Standard contrastive training (InfoNCE) treats every other example in the batch as a negative. With random batches, those negatives are almost always trivially easy — an English query paired against a random Arabic document teaches the model nothing after the first few thousand steps. The loss drops, eval numbers plateau, and the model never learns fine-grained distinctions.</p>
      <p>A <strong>hard negative</strong> is a document that is semantically close to the query but not the correct answer: a near-duplicate about a different entity, a same-language passage on a related topic, a dialect variant that says something subtly different. Training against these forces the model to learn actual relevance, not just language matching.</p>

      <h2>Why this matters more for Arabic and Urdu</h2>
      <p>Low-resource and morphologically rich languages suffer the most from easy-negative training. Arabic dialects and Roman Urdu share vocabulary with their formal counterparts, so a model trained on random negatives learns "Arabic query → any Arabic doc" and collapses dialect, script, and register distinctions. Our v3 error analysis showed exactly this: most retrieval failures were same-language, same-topic, wrong-answer cases.</p>

      <h2>Our pipeline: mine between rounds, on GPU</h2>
      <p>We run three distillation rounds. Between each round, the current model encodes the full corpus, retrieves the top-k nearest neighbors for every training query, and we sample negatives from ranks 5–50 (skipping the very top hits, which are often unlabeled positives). Everything — encoding, FAISS search, sampling — stays on GPU, so a mining pass over 2.6M triplets adds roughly 20 minutes instead of hours.</p>
      <pre><code># conceptual sketch
emb = model.encode(corpus)                  # current-round encoder
D, I = faiss_index.search(emb, k=50)        # top-50 per query
hard = sample_from_ranks(I, lo=5, hi=50)    # skip likely positives
train_round(triplets_with(hard))            # next distillation round</code></pre>

      <h2>Three lessons</h2>
      <ul>
        <li><strong>Re-mine every round.</strong> Negatives mined by a stale model go soft — the current model already ranks them correctly. Fresh negatives from the latest checkpoint are what keep the gradient informative.</li>
        <li><strong>Skip the top ranks.</strong> The #1–4 retrieved "negatives" contain a surprising number of true positives the dataset never labeled. Training against them teaches the model to penalize correct answers.</li>
        <li><strong>Mix in easy negatives too.</strong> 100% hard negatives destabilizes training. We keep roughly 70% mined / 30% in-batch random, which gave the best MIRACL and custom-bench numbers in our ablations.</li>
      </ul>

      <h2>Measured impact</h2>
      <p>Adding the third distillation round with re-mined hard negatives took custom bench MRR@10 from 0.103 to 0.252 and MIRACL Arabic acc@1 from 0.475 to 0.825, with no architecture change and no new labeled data. Full ablation tables are in the <a href="/research">v4 report</a>.</p>
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
