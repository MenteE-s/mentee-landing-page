# MenteE SWE — Autonomous Software Engineering Agent

> **MenteE is the autonomous SWE agent that lives in your terminal.** It investigates your repository, plans the change, edits files with surgical precision, verifies with your own tests, and reports back with evidence — never claiming success without proof.

Current release: **v0.3.5** · Package: **`@menteeai/menteeswe`**

---

## What it is

MenteE SWE is a **model-agnostic autonomous software-engineering agent**. You bring your own model key; MenteE supplies the brain-to-editor **harness**: the tool layer, the verification loop, file-state tracking, context management, and orchestration.

The product is the **harness** — not the underlying LLM. MenteE treats models as interchangeable backends behind a single, consistent agent runtime.

- **Autonomous by default** — describe a task in plain English; it explores, edits, and verifies on its own.
- **Model-agnostic** — switch providers without changing how you work.
- **Writes finished code** — no placeholders, no silenced type errors, no invented APIs; it matches the conventions of the file it is in and says so plainly when a fix is partial.
- **Efficient by architecture** — always-on prompt-prefix caching, verified file-state reuse, read-range tracking, and live token telemetry keep sessions fast and cheap.
- **Safe by design** — no silent deletions, hash-validated edits, no destructive commands without approval.
- **Persistent** — remembers prior conversations, project knowledge, and the verified state of your files across restarts.
- **Substantive, not padded** — answers sized to what actually matters, with evidence and nothing else.

---

## Key Features

### 🔌 Model-agnostic providers
Bring your own API key; switch providers with a keypress. All providers share the same streaming, retry, and cancellation behavior.

| Provider | `-p` | Default model | Env var |
|---|---|---|---|
| Kimi (Moonshot) | `kimi` | `kimi-k2.7-code` | `MENTEE_KIMI_API_KEY` |
| GLM (Zhipu CN) | `glm` | `glm-4.6` | `MENTEE_GLM_API_KEY` |
| Z.ai (GLM international) | `zai` | `glm-4.6` | `MENTEE_ZAI_API_KEY` |
| Z.ai Coding Plan | `zai-coding` | `glm-4.6` | `MENTEE_ZAI_API_KEY` |
| OpenAI | `openai` | `gpt-5.4` | `MENTEE_OPENAI_API_KEY` |
| Anthropic | `anthropic` | `claude-sonnet-4-5` | `MENTEE_ANTHROPIC_API_KEY` |
| Google Gemini | `gemini` | `gemini-2.5-pro` | `MENTEE_GEMINI_API_KEY` |
| DeepSeek | `deepseek` | `deepseek-chat` | `MENTEE_DEEPSEEK_API_KEY` |
| Qwen (international) | `qwen` | `qwen3-coder-plus` | `MENTEE_DASHSCOPE_API_KEY` |
| Qwen (China) | `qwen-cn` | `qwen3-coder-plus` | `MENTEE_DASHSCOPE_CN_API_KEY` |
| OpenRouter | `openrouter` | `anthropic/claude-sonnet-4.5` | `MENTEE_OPENROUTER_API_KEY` |
| NVIDIA NIM | `nvidia` | `nvidia/llama-3.1-nemotron-70b-instruct` | `MENTEE_NVIDIA_API_KEY` |
| Mock (offline) | `mock` | — | no key needed |

> The default provider is **Z.ai Coding** (`zai-coding`), optimized for the GLM Coding Plan subscription.

### 🔄 Autonomous agent loop
- **Phase-driven execution** — the agent runs through explicit phases (`EXPLORATION → IMPLEMENTATION → VALIDATION → DEBUGGING → REVIEW`), visible live in the status bar.
- **Enforced verification loop** — after any edit, MenteE auto-detects and runs your project's tests / typecheck. A failure is fed back as a system note and the agent re-enters the loop (up to 3 attempts). "Success" always means *green tests*, not *model said so*.
- **Smart failure recovery** — the same error three times triggers a forced strategy change.
- **Robust patching** — `apply_patch` tolerates CRLF/LF and trailing-whitespace drift (always annotated, never silent).
- **Rate-limit resilience** — exponential backoff with jitter, but a *sustained* 429 stops after 3 attempts and tells you to run `/model`, instead of retrying eight times over ~40 seconds while you watch a spinner. Quota and balance errors are never retried at all — they fail immediately with a clear hint, because retrying "insufficient balance" cannot help.
- **Instant cancellation** — `Ctrl+C` aborts the running task mid-request (the abort signal reaches the model stream and queued tools) and returns you to the prompt. Press `Ctrl+C` again when idle to quit.

### 🧭 Plan mode, todos, subagents & routing — **roadmap, not shipped**
> These are designed and specified but **not implemented in this build**. Treat
> them as the next milestone rather than current behaviour. The pieces they need
> already exist: the entry model in `src/tui/measure.ts` can carry a `todo` kind,
> and the phase machinery in `src/agent/loop.ts` can drive per-phase routing.

- **Plan mode** (`--plan` / `/plan`) — investigation runs read-only and produces a structured plan (GOAL / FILES / APPROACH / VERIFY / RISKS); nothing is modified until you approve it (`y`/`n`). The approved plan is then implemented with a checklist seeded from it. In headless mode the plan is printed with a y/N prompt.
- **Live checklist** — an `update_todos` tool keeps a visible task list (exactly one step in progress at a time); the TUI renders it as a live panel with spinner/completed states, and the checklist is injected into forced-synthesis notes.
- **Investigation subagents** — an `investigate` tool spawns a nested read-only agent with a fresh context, its own budgets, and depth capped at 1. It returns distilled `FINDINGS` with `path:line` citations, keeping the main context small. Nested runs never touch your conversation history or memory.
- **Per-phase model routing** — configure `routing.exploration / implementation / review` in `~/.mentee/config.json` to serve reads/searches from a cheap fast model and edits/final answers from a strong one. Provider instances are built lazily and cached; a missing key warns once and falls back to the default model. Every task summary reports **token spend per route** so the cost win is measurable.
- **Checkpoints + undo** — before each edit round lands, the prior content of every touched file is snapshotted (persisted per project). `/undo` restores it, including removing files the agent created. Twenty checkpoints are retained per workspace.

### 🛡️ Runtime guardrails (v0.3)
Budget-aware execution that prevents runaway tasks and forces intelligent synthesis instead of spinning.

| Budget | Default | Warn at | Force synthesis at | Hard stop |
|---|---|---|---|---|
| Iterations | 40 | 60% (24) | 87.5% (35) | 40 |
| Tool calls | 60 | 75% (45) | 90% (54) | 60 |
| Total tokens | 400K | 75% (300K) | 90% (360K) | 400K |
| Wall-clock time | 15 min | 60% (9 min) | 80% (12 min) | 15 min |
| Context size | 32K tok | soft | — | escalation trim |

- **Three-tier response** — warn (SYSTEM NOTE nudge) → force synthesis (one final model call with `tools:[]`, demands discovered/changed/verified/unresolved/why-stopped) → hard stop. The agent always produces an answer, never deadlocks.
- **Termination classification** — every task ends with a clear reason: `SUCCESS`, `PARTIAL_SUCCESS`, `VALIDATION_FAILED`, `BUDGET_EXCEEDED`, `AGENT_STUCK`, `TASK_FAILED`, or `CANCELLED`. Displayed in the status bar and saved to metrics.
- **Anti-loop fingerprints** — repeated identical tool calls (same tool + same args) are detected; 3 repeats triggers a forced strategy-change note; persistent looping forces synthesis.
- **Unchanged-read short-circuit** — reading the same file+range with the same hash returns the cached stub (no redundant I/O). Hash change = full re-read.
- **Read-range tracking** — the agent remembers *which line ranges* of a file it has already read, so re-reading line-for-line across a large file is refused as redundant instead of burning a tool call per chunk. A region not yet covered still reads normally, and any edit to the file invalidates its record.
- **Search results you can act on** — `search_code` returns `path:line:match` rows, and the one-line summary the UI shows *is* those rows, not just a match count. The agent is also told to read the line it is about to change rather than re-reading the file to find hits it was already given.
- **Predictable search** — the ripgrep fast path and the pure-JS fallback are held to the same behaviour: case-insensitive regex, literal fallback for an invalid pattern, and no shell in the command line. The same query returns the same results on every machine.
- **Structured failure prefixes** — `PATCH_FAILED`, `FILE_CHANGED`, `READ_RANGE_INVALID`, `COMMAND_FAILED`, `TEST_FAILED` all include file path, hashes, and a `Recovery:` instruction so the next iteration corrects course immediately.
- **Per-task metrics** — every task appends to `~/.mentee/sessions/<hash>.metrics.jsonl` with timing, token usage, tool counts, and termination reason.
- **Configurable limits** — override any budget via `~/.mentee/config.json` (`"limits": {...}`) or environment variables (`MENTEE_MAX_ITERATIONS`, `MENTEE_MAX_WALL_TIME_MS`, etc.).
- **Approval persistence** — "always allow" for a tool is remembered for the session (dangerous ops still blocked every time).

### 🧬 Filesystem state & index layer
MenteE tracks what it knows about your files and **re-verifies it against disk** — correctness always wins over token savings.

```
known file → stored hash → filesystem hash check
   unchanged? → YES: patch directly, no re-read
                NO:  "re-read before editing" + FILE_CHANGED guard
```

- **Hash-validated edits** — every patch validates the file's hash against the last read/write. If the file changed underneath, the agent gets `FILE_CHANGED` and a fresh read is required.
- **Cross-session index** — recently read/modified files (with hashes) persist per project; at the start of each task the index is re-verified on disk. Verified-unchanged files can be patched **directly, with zero reads**, making repeated-session tasks dramatically faster.
- **Structured, machine-readable errors** — `PATCH_FAILED`, `FILE_CHANGED`, `READ_RANGE_INVALID` all include file path, line counts, hashes, and an explicit `Recovery:` instruction so the next iteration corrects course immediately instead of guessing.

### 📉 Token & context efficiency
Measured, not guessed — every request reports its true API input tokens.

- **Prompt-prefix caching is always on** — the system prompt and tool schemas are sent with `cache_control`, so a long session pays for that prefix once instead of on every turn. There is nothing to configure per model, and no per-provider setup: if an endpoint rejects `cache_control`, MenteE remembers that endpoint, stops sending it, and silently continues uncached rather than failing. Set `MENTEE_PROMPT_CACHE=off` to turn it off globally.
- **Compact request construction** — terse tool schemas and a slim system prompt cut fixed per-request overhead by ~33%.
- **Per-result history cap** — oversized tool outputs are capped (head + tail, preserving error summaries) before entering the conversation; no single result can blow up the context.
- **Stale-read elision** — once a file is patched, its earlier read output is replaced with a one-line stub in history.
- **Proactive trimming** — old tool outputs are stubbed as the conversation grows; long tasks scale linearly, not quadratically.
- **Escalation trim** — when context exceeds the soft cap, a deeper pass keeps only the 1 most recent tool output; warning fires only above ~30K tokens.
- **Live telemetry** — per-request `req #N · ctx … tok · out … tok` lines, a live token counter in the status bar, and per-tool `~k tok` sizes on every result line, plus cumulative ↑/↓ tokens in the task summary.

### 🛠️ Complete tool suite
- **Filesystem:** `read_file` (line ranges, 400-line default window), `write_file`, `apply_patch` (hash-validated snippet replacement), `move_path`
- **Search:** `search_code` (case-insensitive regex, concise `path:line:match` output, ripgrep-accelerated when available with an identical pure-JS fallback), `search_files`, `list_files`
- **Git:** `git_status`, `git_diff`, `git_log`, `git_show`, `git_branches`
- **Execution:** `execute_command` (safe reads auto-approve; installs/git-history changes ask first)
- **Verification:** `run_tests`, `run_linter`, `run_typecheck` (command auto-detection)
- **Environment:** `inspect_env`
- **Memory:** `memory` (add / search / list / forget) — persistent, project-scoped
- **Web & diagnostics:** `web_search`, `http_fetch`, `file_info`, `safe_delete_suggestion`, `process_list`, `port_check`, `system_info`

> **Planned, not yet present:** `update_todos` (live checklist) and `investigate` (read-only subagent with a fresh context). See the roadmap section above.

> **No destructive deletion.** There is no `delete_file` tool. Instead, `safe_delete_suggestion` returns ready-to-run PowerShell/CMD commands with double-check steps — MenteE never deletes for you.

### 🧠 Persistent memory & conversation
- Every task and answer is **saved to disk** (`~/.mentee/sessions/`) and re-injected as context on the next task — MenteE remembers what you discussed across sessions and restarts.
- The **memory tool** stores reusable project knowledge (conventions, gotchas, key file locations), scoped per project and never written inside your workspace.
- The **known-files index** (above) carries verified file state across tasks.

### 🛡️ Safety model
| Risk level | Behavior |
|---|---|
| `safe` | Runs automatically (read-only, diagnostics) |
| `restricted` | Asks for approval (installs, git history changes) |
| `dangerous` | Blocked entirely (`rm -rf`, `sudo`, force pushes) |
| deletion | Never automatic — returns commands for you to run |

The agent is **scoped to your workspace** and will not touch files, secrets, or commands outside it. Edits are hash-validated; stale state can never be silently applied. Search patterns are never passed through a shell, so a regex cannot execute anything.

### 🖥️ Live terminal UI
The default experience is a **linear chat** — the terminal owns wrapping and scrolling, so copy-paste and native scrollback just work. Two rows of chrome: a live status line and a persistent prompt.

- **Live status line** — while a task runs, one line is rewritten in place showing the spinner, the current phase, the tool in flight, token spend and elapsed time. Agent output always lands *above* it, never over it.
- **One line per tool call** — `+ [tests] npm test  42 passing  1.2s`. The target (path, command, pattern) is always shown. Failures open automatically with the relevant output; large successful output is summarised with a `/last` affordance that really does re-print it.
- **Edits as one line** — `~ edit src/agent/loop.ts  +12 −3`, with the diff available on demand.
- **Rendered markdown** — headings, bullets, ordered lists, fenced code, blockquotes, tables, bold, italic and inline code. `##` and `-` never reach the screen as raw syntax.
- **Typed-ahead** — a task typed while another is running is queued, not dropped.
- **Aligned columns** — every line is padded to the exact terminal width in display columns, so emoji, CJK and ANSI colour never cause a row to overrun and wrap.

`--ink` opens the **full-screen chat view**: the same content, virtualised into a fixed-height viewport with row-accurate scrolling.
- Scrolling is measured in **rows**, not entries, so one keypress moves one line regardless of how tall the entry above it is.
- **Bottom-anchored**: content grows upward like a chat. Pinned, the view follows new output; scrolled back, the view *stays where you left it* and a `↓ N new` marker appears instead of the conversation jumping.
- An entry taller than the viewport is clipped at the top edge and fully reachable by scrolling — never dropped.
- Expanding an entry above the fold adjusts the offset so the content under your eyes does not move.
- Chrome is two rows (status + rule) regardless of terminal size, leaving the rest for the conversation.

### 📐 The frame contract
Everything above rests on one invariant, enforced in `src/tui/layout.ts` and asserted in `tests/ui/frame.test.ts`:

> A frame is exactly `rows − 1` lines tall, and every line is exactly `cols` display columns wide.

This is not cosmetic. Ink has no clipping path: a frame that reaches the terminal height triggers a full-screen clear and repaint, and one that exceeds it makes the terminal scroll and desyncs the cursor — which is precisely how text ends up drawn over other text. Widths are measured with `string-width` rather than `String.length`, and wrapping uses `wrap-ansi` with the same options Ink passes internally, so the height model and the renderer cannot disagree.

### ⌨️ Keyboard-driven control
- **Linear chat (default):** Ctrl+C cancels the running task (or exits when idle). Slash commands: **`/help`**, **`/model`**, **`/provider`**, **`/key`**, **`/last`**, **`/status`**, **`/history`**, **`/exit`**.
- **Full-screen (`--ink`):** `↑`/`↓` scroll a row · `PgUp`/`PgDn` a page · `Ctrl+U`/`Ctrl+D` half a page · `Esc` jump to latest · `Alt+E` expand/collapse the last tool call or diff · `Alt+T` show/hide thinking · `Alt+M` model · `Ctrl+P` provider · `Ctrl+K` key · `Ctrl+C` cancel or exit. Slash commands as above.

### ✍️ Production-quality code, and substantive answers

The system prompt carries two explicit rule sets, because an agent that returns
vague work and vague answers is not saving you anything.

**On the code it writes — "this is the bar":**

- **No placeholders, ever.** No `TODO`, `FIXME`, `XXX`, `HACK`, "rest of implementation", no stub returning a fixed value, no commented-out experiment, no dead code.
- **No silenced type checker.** No `any`, no `@ts-ignore`, no `eslint-disable`, no bare `catch {}` — unless the surrounding file already does exactly that and the reason is genuinely unavoidable.
- **Match the file you are in.** Its naming, comment density, import style, error convention and structure. Do not import a different style into a codebase that already chose one.
- **Guard the edges your change actually exposes** — empty input, missing keys, off-by-one, concurrent calls, legitimately-absent values. And *no* speculative validation for things that cannot happen.
- **Smallest edit vs. correct fix:** when they disagree, take the correct one and say why.
- **Scope discipline.** Fix the whole effect of the defect you were asked about, and every caller of a helper you change — but if the request named a location, that location is the scope, even when the rest looks similar.
- **Say when a fix is partial.** A workaround or a deliberately narrowed scope must be stated plainly, never dressed up as finished.

**On what it says back:**

- **Length follows importance, not a word count.** A one-line answer for a one-line change; a paragraph for something that changes how you proceed.
- **Lead with what matters** — the decision, the behaviour change, the risk introduced, the thing still unproven. Not a recap of what it did.
- **Concrete or worthless.** `path/to/file.ts:42`, the actual error, the actual command and its result. "Improved error handling" is not an answer; "wrap the fetch in try/catch and surface the status code" is.
- **No padding.** No preamble, no repo summary, no restating the request, no "I hope this helps".
- **No unearned hedging.** Not "I think" or "possibly" about something it verified. If it doesn't know, it says what it doesn't know and how to find out.
- **Never report success it has not seen.** A failed test, a skipped check, or anything unverified gets said plainly.
- **Ambiguity doesn't stop the run** — it states the reading it chose and why, in one sentence, and continues.

---

## How it works

1. **You describe a task** in the terminal.
2. MenteE **loads prior conversation, memory, and the verified known-files index** as context, plus a snapshot of your project tree.
3. The agent **searches first, reads only what matters**, reuses verified file state where safe, and edits files with hash-validated patches.
4. It **verifies** with your project's own tests / build / typecheck — failures re-enter the loop automatically.
5. It **reports the outcome** in a couple of sentences, with per-request token accounting and per-tool timings visible throughout, and saves the exchange + updated file state for next time.

---

## Install & Quick Start

```bash
# install globally
npm i -g @menteeai/menteeswe

# launch the interactive agent
mentee
```

Or try without installing:

```bash
npx @menteeai/menteeswe "your task"
```

First run — configure a provider and paste your API key (saved to `~/.mentee/config.json`):

```bash
mentee config          # provider/key setup wizard
cd your-project
mentee "fix the failing auth tests"
```

---

## CLI Reference

```text
mentee [task...]                  run a task (interactive TUI in a terminal)
mentee config                     provider/key setup wizard
mentee -p openrouter "task"       choose provider (kimi, glm, zai, zai-coding, openai, anthropic, gemini, deepseek, qwen, qwen-cn, openrouter, nvidia, mock)
mentee -m <model-id> "task"       override model for the current provider
mentee --yes --no-tui "task"      headless mode for scripts/CI
```

### Inside the TUI (slash commands)
```text
/provider zai        switch provider
/model glm-4.5-air   set the model for the current provider
/key <api-key>       add the API key for the current provider (saved to ~/.mentee/config.json)
/help                list commands
/exit                quit
```

---

## Configuration

Config lives at `~/.mentee/config.json`:

```json
{
  "defaultProvider": "zai-coding",
  "keys": { "zai": "your-key-here" },
  "models": { "zai-coding": "glm-4.6" },
  "limits": {
    "maxIterations": 40,
    "maxToolCalls": 60,
    "maxTotalTokens": 400000,
    "maxContextTokens": 32000,
    "maxWallTimeMs": 900000,
    "maxRepeatedToolCalls": 3
  }
}
```

Keys may also be supplied via environment variables: `MENTEE_KIMI_API_KEY`, `MENTEE_GLM_API_KEY`, `MENTEE_ZAI_API_KEY`, `MENTEE_OPENROUTER_API_KEY`, `MENTEE_NVIDIA_API_KEY`.

---

## Architecture

```
menteeswe/
├── cli.tsx              # entry point; default → linear chat, --ink for legacy Ink
├── modes/
│   ├── chat.ts          # linear readline chat: native scroll, history, slash commands
│   └── headless.ts      # non-interactive mode for scripts/CI
├── agent/
│   ├── loop.ts          # autonomous loop: phases, verification, cancellation,
│   │                    #   history caps, stale-read elision, token telemetry,
│   │                    #   budget evaluation, forced synthesis, anti-loop
│   ├── limits.ts        # RunLimits, BudgetTracker, warn→force→hard-stop
│   ├── metrics.ts       # MetricsTracker, classifyTermination
│   ├── prompts.ts       # compact system prompt (terse, search-first, safety)
│   ├── conversation.ts  # disk-backed conversation + verified file-state index
│   └── state.ts         # phase / usage / error / file tracking
├── models/              # provider abstractions (kimi, glm, zai, zai-coding,
│                        #   openrouter, nvidia, mock) + abort-aware streaming
├── tools/               # 25-tool registry, hash-validated filesystem, policy
├── tui/                 # Ink/React terminal UI (legacy, behind --ink flag)
├── render.ts            # event → colored output
├── config.ts            # ~/.mentee/config.json (includes limits config)
└── events.ts            # internal event bus
```

**Stack:** TypeScript 5 · Ink 5 (legacy) · React 18 · OpenAI SDK 5 · tsup · commander · chalk.
**Requirements:** Node ≥ 20 · MIT licensed.

> **Node 22 recommended.** `chalk@6` and `commander@15` declare `node >=22`, so installing on Node 20 prints an `EBADENGINE` warning. It builds and runs, but 22+ is the supported target.

### 🔁 Reliable across machines
A query's result must not depend on which laptop it ran on. The ripgrep fast path and the pure-JS fallback are held to identical behaviour — same case sensitivity, same regex semantics, same literal fallback for an invalid pattern — and the search command is executed as an argument vector with no shell, so a pattern like `A|B` is a regex and never a pipe between two commands.

The agent also identifies itself correctly to providers that gate models by client type, so an OpenRouter model restricted to agentic harnesses is reachable from MenteE rather than refused with a 403.

---

## Use Cases

- **Fix failing tests** — "fix the failing auth tests and make sure they pass"
- **Add a feature** — "add a `/health` endpoint that returns 200"
- **Debug regressions** — "why did the build start failing after the last PR?"
- **Refactors** — "rename the `User` service to `Account` across the API layer"
- **Onboarding** — "explain how this repo is structured and where auth lives"
- **Fast follow-ups** — "tweak that CSS again" — verified file state and read-range tracking mean no re-discovery
- **CI / automation** — headless mode for scripted tasks

---

## Roadmap

- Parallel tool calls within a single iteration
- Parallel (multi-fanout) investigations
- Routing presets in the config wizard (`/route` quick-setup)
- PR creation and review workflows
- Team/shared memory scopes

---

**MenteE — the autonomous SWE agent that actually finishes the job, and remembers how it got there.**

Website: **menteeai.org** · Twitter: **@menteeaiorg** · Package: **`@menteeai/menteeswe`**
