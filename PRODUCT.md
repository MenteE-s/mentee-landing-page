# MenteE SWE — Autonomous Software Engineering Agent

> **MenteE is the autonomous SWE agent that lives in your terminal.** It investigates your repository, plans the change, edits files with surgical precision, verifies with your own tests, and reports back with evidence — never claiming success without proof.

Current release: **v0.3.0** · Package: **`@menteeai/menteeswe`**

---

## What it is

MenteE SWE is a **model-agnostic autonomous software-engineering agent**. You bring your own model key; MenteE supplies the brain-to-editor **harness**: the tool layer, the verification loop, file-state tracking, context management, and orchestration.

The product is the **harness** — not the underlying LLM. MenteE treats models as interchangeable backends behind a single, consistent agent runtime.

- **Autonomous by default** — describe a task in plain English; it explores, edits, and verifies on its own.
- **Model-agnostic** — switch providers without changing how you work.
- **Efficient by architecture** — verified file-state reuse, compact request construction, and live token telemetry keep sessions fast and cheap.
- **Safe by design** — no silent deletions, hash-validated edits, no destructive commands without approval.
- **Persistent** — remembers prior conversations, project knowledge, and the verified state of your files across restarts.
- **Terse** — answers in 1–3 sentences, backed by evidence.

---

## Key Features

### 🔌 Model-agnostic providers
Bring your own API key; switch providers with a keypress. All providers share the same streaming, retry, and cancellation behavior.

| Provider | Endpoint | Default model | Env var |
|---|---|---|---|
| Kimi (Moonshot) | `api.moonshot.ai/v1` | `kimi-k2.7-code` | `MENTEE_KIMI_API_KEY` |
| GLM (Zhipu CN) | `open.bigmodel.cn/api/paas/v4` | `glm-4.6` | `MENTEE_GLM_API_KEY` |
| Z.ai (GLM intl) | `api.z.ai/api/paas/v4` | `glm-4.6` | `MENTEE_ZAI_API_KEY` |
| Z.ai Coding | `api.z.ai/api/coding/paas/v4` | `glm-4.6` | `MENTEE_ZAI_API_KEY` |
| OpenRouter | `openrouter.ai/api/v1` | `anthropic/claude-3.5-sonnet` | `MENTEE_OPENROUTER_API_KEY` |
| NVIDIA NIM | `integrate.api.nvidia.com/v1` | `nvidia/llama-3.1-nemotron-70b-instruct` | `MENTEE_NVIDIA_API_KEY` |
| mock | offline (testing) | — | no key needed |

> The default provider is **Z.ai Coding** (`zai-coding`), optimized for the GLM Coding Plan subscription.

### 🔄 Autonomous agent loop
- **Phase-driven execution** — the agent runs through explicit phases (`EXPLORATION → IMPLEMENTATION → VALIDATION → DEBUGGING → REVIEW`), visible live in the status bar.
- **Enforced verification loop** — after any edit, MenteE auto-detects and runs your project's tests / typecheck. A failure is fed back as a system note and the agent re-enters the loop (up to 3 attempts). "Success" always means *green tests*, not *model said so*.
- **Smart failure recovery** — the same error three times triggers a forced strategy change.
- **Robust patching** — `apply_patch` tolerates CRLF/LF and trailing-whitespace drift (always annotated, never silent).
- **Rate-limit resilience** — exponential backoff with jitter; quota/balance errors fail fast with a clear hint.
- **Instant cancellation** — `Ctrl+C` aborts the running task mid-request (the abort signal reaches the model stream and queued tools) and returns you to the prompt. Press `Ctrl+C` again when idle to quit.

### 🧭 Plan mode, todos, subagents & routing (v0.2)
- **Plan mode** (`--plan` / `/plan`) — investigation runs read-only and produces a structured plan (GOAL / FILES / APPROACH / VERIFY / RISKS); nothing is modified until you approve it (`y`/`n`). The approved plan is then implemented with a checklist seeded from it. In headless mode the plan is printed with a y/N prompt.
- **Live checklist** — the `update_todos` tool keeps a visible task list (exactly one step in progress at a time); the TUI renders it as a live panel with spinner/completed/strikethrough states, and the checklist is injected into forced-synthesis notes.
- **Investigation subagents** — the `investigate` tool spawns a nested read-only agent with a fresh context, its own budgets, and depth capped at 1. It returns distilled `FINDINGS` with `path:line` citations, keeping the main context small. Nested runs never touch your conversation history or memory.
- **Per-phase model routing** — configure `routing.exploration / implementation / review` in `~/.mentee/config.json` to serve reads/searches from a cheap fast model and edits/final answers from a strong one. Provider instances are built lazily and cached; a missing key warns once and falls back to the default model. Every task summary reports **token spend per route** so the cost win is measurable.
- **Checkpoints + undo** — before each edit round lands, the prior content of every touched file is snapshotted (persisted per project). `/undo` in the TUI or `mentee undo` on the CLI restores it — including removing files the agent created. Twenty checkpoints are retained per workspace.

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

- **Compact request construction** — terse tool schemas and a slim system prompt cut fixed per-request overhead by ~33%.
- **Per-result history cap** — oversized tool outputs are capped (head + tail, preserving error summaries) before entering the conversation; no single result can blow up the context.
- **Stale-read elision** — once a file is patched, its earlier read output is replaced with a one-line stub in history.
- **Proactive trimming** — old tool outputs are stubbed as the conversation grows; long tasks scale linearly, not quadratically.
- **Escalation trim** — when context exceeds the soft cap, a deeper pass keeps only the 1 most recent tool output; warning fires only above ~30K tokens.
- **Live telemetry** — per-request `req #N · ctx … tok · out … tok` lines, a live token counter in the status bar, and per-tool `~k tok` sizes on every result line, plus cumulative ↑/↓ tokens in the task summary.

### 🛠️ Complete tool suite
- **Filesystem:** `read_file` (line ranges, 400-line default window), `write_file`, `apply_patch` (hash-validated snippet replacement), `move_path`
- **Search:** `search_code` (regex, concise `path:line:match` output), `search_files`, `list_files`
- **Git:** `git_status`, `git_diff`, `git_log`, `git_show`, `git_branches`
- **Execution:** `execute_command` (safe reads auto-approve; installs/git-history changes ask first)
- **Verification:** `run_tests`, `run_linter`, `run_typecheck` (command auto-detection)
- **Environment:** `inspect_env`
- **Memory:** `memory` (add / search / list / forget) — persistent, project-scoped
- **Planning:** `update_todos` (live checklist), `investigate` (read-only subagent with a fresh context)
- **Web & diagnostics:** `web_search`, `http_fetch`, `file_info`, `safe_delete_suggestion`, `process_list`, `port_check`, `system_info`

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

The agent is **scoped to your workspace** and will not touch files, secrets, or commands outside it. Edits are hash-validated; stale state can never be silently applied.

### 🖥️ Live terminal UI
- ASCII **MenteE** banner with 🎀 and links to **menteeai.org** / **@menteeaiorg**.
- Real-time status line: version, provider, model, workspace, toggles, and **live token usage** during a run.
- **Phase display**: `agent exploring… / implementing… / validating…` with spinner.
- **Category-colored tool calls** — reads, writes, and patches are visually distinct.
- **Inline output previews** — every tool result shows 4 preview lines indented below the ✓ line so you see what the agent found (search results, command output, file contents).
- **Inline edit diffs** — each change renders its own before/after box directly below the step that produced it (toggle with **Alt+E**).
- **Full details mode** (on by default) — every tool call and per-request token line is visible (toggle with **Alt+D**); a dropdown inspector shows full tool arguments and output.
- **Typing animation** for the final answer, with the task summary (time, tokens ↑/↓, tool calls, iterations, files modified) directly beneath it.

### ⌨️ Keyboard-driven control
- **Alt+M** model picker · **Ctrl+P** provider · **Ctrl+K** API key
- **Alt+D** toggle session details · **Alt+E** toggle inline edit diffs
- **Ctrl+C** cancel the running task (or exit when idle)
- Slash commands: **`/help`**, **`/model`**, **`/provider`**, **`/key`**

### ✍️ Terse, evidence-first output
The system prompt enforces 1–3 sentence final answers with no bullet dumps or document-style reports. Every claim of success is backed by the test/lint/typecheck command that proved it.

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
mentee -p openrouter "task"       choose provider (kimi, glm, zai, zai-coding, openrouter, nvidia, mock)
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
├── cli.tsx              # entry point; global `mentee` command
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
├── tui/                 # Ink/React terminal UI (inline diffs, inspector, output previews)
├── render.ts            # event → colored output
├── config.ts            # ~/.mentee/config.json (includes limits config)
└── events.ts            # internal event bus
```

**Stack:** TypeScript 5 · Ink 5 · React 18 · OpenAI SDK 5 · tsup · commander · chalk.
**Requirements:** Node ≥ 20 · MIT licensed.

---

## Use Cases

- **Fix failing tests** — "fix the failing auth tests and make sure they pass"
- **Add a feature** — "add a `/health` endpoint that returns 200"
- **Debug regressions** — "why did the build start failing after the last PR?"
- **Refactors** — "rename the `User` service to `Account` across the API layer"
- **Onboarding** — "explain how this repo is structured and where auth lives"
- **Fast follow-ups** — "tweak that CSS again" — verified file state means no re-discovery
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
