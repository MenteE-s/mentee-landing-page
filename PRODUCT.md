# MenteE SWE — Autonomous Software Engineering Agent

> **MenteE is the autonomous SWE agent that lives in your terminal.** It investigates your repository, plans the change, edits files with surgical precision, verifies with your own tests, and reports back with evidence — never claiming success without proof.

Current release: **v0.4.0** · Package: **`@menteeai/menteeswe`**

---

## What it is

MenteE SWE is a **model-agnostic autonomous software-engineering agent**. You bring your own model key; MenteE supplies the brain-to-editor **harness**: the tool layer, the verification loop, file-state tracking, context management, and orchestration.

The product is the **harness** — not the underlying LLM. MenteE treats models as interchangeable backends behind a single, consistent agent runtime.

- **Autonomous by default** — describe a task in plain English; it explores, edits, and verifies on its own.
- **Model-agnostic** — thirteen providers, switched at runtime: Claude, GPT, Gemini, DeepSeek, Qwen, Kimi, GLM, Z.ai, OpenRouter, NVIDIA NIM.
- **Writes finished code** — no placeholders, no silenced type errors, no invented APIs; it matches the conventions of the file it is in and says so plainly when a fix is partial.
- **Efficient by architecture** — always-on prompt-prefix caching, verified file-state reuse, read-range tracking, and live token telemetry keep sessions fast and cheap.
- **Safe by design** — no silent deletions, hash-validated edits, no destructive commands without approval.
- **Persistent** — remembers prior conversations, project knowledge, and the verified state of your files across restarts.
- **Substantive, not padded** — answers sized to what actually matters, with evidence and nothing else.

---

## Key Features

### 🔌 Model-agnostic providers
Bring your own API key; switch providers with a keypress. All providers share the same streaming, retry, cancellation, and tool-calling behaviour — the agent does not know or care which one is behind it.

| Provider | Endpoint | Default model | Env var |
|---|---|---|---|
| Kimi (Moonshot) | `api.moonshot.ai/v1` | `kimi-k2.7-code` | `MENTEE_KIMI_API_KEY` |
| GLM (Zhipu CN) | `open.bigmodel.cn/api/paas/v4` | `glm-4.6` | `MENTEE_GLM_API_KEY` |
| Z.ai (GLM intl) | `api.z.ai/api/paas/v4` | `glm-4.6` | `MENTEE_ZAI_API_KEY` |
| Z.ai Coding | `api.z.ai/api/coding/paas/v4` | `glm-4.6` | `MENTEE_ZAI_API_KEY` |
| **OpenAI** | `api.openai.com/v1` | `gpt-5.4` | `MENTEE_OPENAI_API_KEY` |
| **Anthropic** | `api.anthropic.com/v1/messages` | `claude-sonnet-4-5` | `MENTEE_ANTHROPIC_API_KEY` |
| **Google Gemini** | `generativelanguage.googleapis.com/v1beta/openai` | `gemini-2.5-pro` | `MENTEE_GEMINI_API_KEY` |
| **DeepSeek** | `api.deepseek.com` | `deepseek-chat` | `MENTEE_DEEPSEEK_API_KEY` |
| **Qwen (intl)** | `dashscope-intl.aliyuncs.com/compatible-mode/v1` | `qwen3-coder-plus` | `MENTEE_DASHSCOPE_API_KEY` |
| **Qwen (China)** | `dashscope.aliyuncs.com/compatible-mode/v1` | `qwen3-coder-plus` | `MENTEE_DASHSCOPE_CN_API_KEY` |
| OpenRouter | `openrouter.ai/api/v1` | `anthropic/claude-sonnet-4.5` | `MENTEE_OPENROUTER_API_KEY` |
| NVIDIA NIM | `integrate.api.nvidia.com/v1` | `nvidia/llama-3.1-nemotron-70b-instruct` | `MENTEE_NVIDIA_API_KEY` |
| mock | offline (testing) | — | no key needed |

> The default provider is **Z.ai Coding** (`zai-coding`), optimized for the GLM Coding Plan subscription.

Thirteen providers, switched at runtime with `-p` or `/provider`. Nine of them are
OpenAI-compatible and differ only by base URL. **Anthropic is the exception and is
implemented natively**, because its Messages API genuinely differs in three ways a
URL swap cannot express: the system prompt is a top-level field rather than a
message, there is no `tool` role (a result is a `tool_result` block inside a user
turn), and tool schemas use `input_schema` rather than the nested function
envelope. It streams over SSE, so token output stays live in the TUI like every
other provider.

> **Qwen keys are region-locked.** An international key against the Beijing host
> fails with an opaque 404, so there are two entries rather than one and a
> base-URL guess.

### Switching provider resets the model

Selecting a provider moves you to *that provider's* default model. It used to carry
the previous provider's model id across — an id that means nothing on the new host,
and which was then written to your config, so the next launch started broken. This
is why the model name now visibly changes when you switch.

Setting a model rebuilds the provider first and only commits if that works. A
rejected id used to be shown as the active model in the status line while the old
one stayed in use — a display that lied about what was about to be sent. The
confirmation names the provider too: `model: openrouter:some/model`, because
`model: x` alone is ambiguous the moment you have more than one configured.

### OpenRouter app attribution

OpenRouter gates some models behind `403 "<model> is only available on agentic
harnesses"`. MenteE identifies itself with the full attribution header set:
`HTTP-Referer` (the app identifier), `X-OpenRouter-Categories: cli-agent,
coding-agent` (the declaration that it *is* an agent), `X-OpenRouter-Title`, and a
`User-Agent` that replaces the SDK's default `OpenAI/JS` string.

The categories header is the one that matters. `HTTP-Referer` alone gives OpenRouter
a URL and no way to classify what kind of client it is — the first version of this
sent the first two headers and still got the 403.

### 🔄 Autonomous agent loop
- **Phase-driven execution** — the agent runs through explicit phases (`EXPLORATION → IMPLEMENTATION → VALIDATION → DEBUGGING → REVIEW`), visible live in the status bar.
- **Enforced verification loop** — after any edit, MenteE auto-detects and runs your project's tests / typecheck. A failure is fed back as a system note and the agent re-enters the loop (up to 3 attempts). "Success" always means *green tests*, not *model said so*.
- **Smart failure recovery** — the same error three times triggers a forced strategy change.
- **Robust patching** — `apply_patch` tolerates CRLF/LF and trailing-whitespace drift (always annotated, never silent).
- **Rate-limit resilience that knows the difference** — three classes, treated differently:
  - **A burst** (per-minute, per-hour) gets exponential backoff with jitter, and stops after 3 sustained attempts with `run /model` rather than retrying eight times over ~40 seconds.
  - **The server's own advice wins.** If a 429 carries `Retry-After` or says "try again in N seconds", MenteE waits that long instead of running its own ladder — which is the difference between waiting 8 seconds and burning a free tier's whole remaining quota on a schedule nobody asked for.
  - **A quota that will not clear is never retried.** Daily, weekly and monthly caps, and anything saying "add N credits", fail on the *first* attempt with the actual fix named: *"This is an account quota, not a burst: it needs 5 credits on the account, and no amount of waiting will clear it."* This one was a real bug — OpenRouter words its daily cap as `Rate limit exceeded: free-models-per-day`, which contains a 429 and the words "rate limit", so it was being retried four times across 47 seconds for a counter that resets the next day.
- **The reason is always shown** — a rate-limit warning carries the provider's own message, trimmed to one line. "Rate limited" on its own is not a diagnosis: a shared free tier, a per-account cap and a daily limit all arrive as the same 429, and you cannot act on any of them without knowing which.
- **Instant cancellation** — `Ctrl+C` aborts the running task mid-request (the abort signal reaches the model stream and queued tools) and returns you to the prompt. Press `Ctrl+C` again when idle to quit. `Esc` cancels a running task on a confirming second press; at an idle prompt it clears the line you are typing, like a shell.

### 🔀 Delegation — subagents that answer one question

The agent can hand a single focused question to a **read-only subagent** with its
own fresh context, and get back a short cited answer instead of a transcript.

```
parent: "does anything else call handler()?"
  └─▶ subagent (fresh context, read-only tools, own iteration cap)
        search_code  → 3 hits
        read_file    → src/routes/admin.ts:14
      ◀── FINDINGS
          - the admin router wraps it in try/catch (src/routes/admin.ts:14)
          - nothing else calls it; only the test does (tests/admin.test.ts:9)
          UNRESOLVED
          - a dynamic dispatch could hide a caller (would need a runtime trace)
```

**Why it pays off:** the parent's context is the scarce resource. Reading four
files to answer one question costs the parent 15k tokens it will still need
later; the subagent's report costs about 400 and the parent's context is
unchanged.

**The constraints that make it safe rather than a liability:**

- **Read-only, by allowlist.** Ten read tools — nothing that edits, runs a
  command, or writes memory. A subagent that could edit would either duplicate
  the parent's work or fight it, and there is no undo.
- **Depth 1.** A subagent has no `delegate` in its tool list, so it cannot spawn
  a subagent. Otherwise a single call could fan out without limit.
- **Its own ceiling** — 8 model requests. A subagent that needs twenty to answer
  one question is doing the parent's job in a context the parent never sees,
  which costs more than reading the file directly.
- **Fan-out capped at 8 per task**, and an identical question is refused rather
  than paid for twice. Both are per-task, not per-turn, so a burst of parallel
  calls in one turn cannot slip past.
- **Failures are named.** A subagent that ran out of budget reports
  `SUBAGENT_INCOMPLETE`, not an empty result — otherwise it looks identical to
  one that found nothing, and the parent would report "no such code exists" on
  the strength of a truncated investigation.
- **Tokens are billed to the parent.** Not crediting them would make every task
  look cheaper than it is, which is exactly the number you watch.
- **The report is a claim, not a fact.** It cites `path:line`, and the prompt
  tells the agent to verify a line before acting on it. Delegation without
  verification would be worse than doing the work.

Not for everything: a file you already know the path of, anything needing an edit,
or a question one `search_code` answers. That is stated in the prompt, because a
subagent costs a model request plus its own iterations.

### 🧭 Plan mode, todos & routing — **roadmap, not shipped**
> These are designed and specified but **not implemented in this build**. Treat
> them as the next milestone rather than current behaviour. The pieces they need
> already exist: the entry model in `src/tui/measure.ts` can carry a `todo` kind,
> and the phase machinery in `src/agent/loop.ts` can drive per-phase routing.

- **Plan mode** (`--plan` / `/plan`) — investigation runs read-only and produces a structured plan (GOAL / FILES / APPROACH / VERIFY / RISKS); nothing is modified until you approve it (`y`/`n`). The approved plan is then implemented with a checklist seeded from it. In headless mode the plan is printed with a y/N prompt.
- **Live checklist** — an `update_todos` tool keeps a visible task list (exactly one step in progress at a time); the TUI renders it as a live panel with spinner/completed states, and the checklist is injected into forced-synthesis notes.
- **Per-phase model routing** — configure `routing.exploration / implementation / review` in `~/.mentee/config.json` to serve reads/searches from a cheap fast model and edits/final answers from a strong one. Provider instances are built lazily and cached; a missing key warns once and falls back to the default model. Every task summary reports **token spend per route** so the cost win is measurable.
- **Checkpoints + undo** — before each edit round lands, the prior content of every touched file is snapshotted (persisted per project). `/undo` restores it, including removing files the agent created. Twenty checkpoints are retained per workspace.

### 🛡️ Runtime guardrails
There is **no task budget by default**. A task runs until it is finished, until you cancel, or until it genuinely cannot make progress.

The caps existed, and they were wrong: a 40-iteration limit stopped a migration
mid-way and produced a confident final answer about work that was not done — which
is precisely what the prompt forbids the agent from doing. Cutting a long task
short manufactured the exact failure the prompt was written to prevent.

| Limit | Default | What it does |
|---|---|---|
| Iterations | **uncapped** | nothing |
| Tool calls | **uncapped** | nothing |
| Total tokens | **uncapped** | nothing |
| Wall-clock | **uncapped** | nothing |
| Context size | 32K tok | soft warning, then escalation trim |
| Repeated identical tool calls | 3 | strategy-change note, then forced synthesis |

**What still stops you getting stuck**, because these are deadlocks rather than
long tasks:

- **Cancellation** — Esc cancels a running task on a confirming second press; Ctrl+C stops it immediately. The abort signal reaches the model stream and any queued child process, not just the loop.
- **The repeated-call guard** — three identical calls in a row is a loop, not progress. The agent is told what new information it needs, or to write its answer.
- **Context trimming** — a request past the model's window is refused by the *provider*, not by us. Uncapping this would not give a task more room; it would make every request fail.
- **Verification retries** — the same failure three times forces a strategy change rather than a fourth identical attempt.

Every limit is still settable — `~/.mentee/config.json` or the `MENTEE_MAX_*`
environment variables — so a CI job or a deliberately bounded run can opt back in.
`--max-iterations <n>` caps a single run.

- **Three-tier response** — warn (SYSTEM NOTE nudge) → force synthesis (one final model call with `tools:[]`, demands discovered/changed/verified/unresolved/why-stopped) → hard stop. The agent always produces an answer, never deadlocks.
- **Termination classification** — every task ends with a clear reason: `SUCCESS`, `PARTIAL_SUCCESS`, `VALIDATION_FAILED`, `BUDGET_EXCEEDED` (only if you set a cap), `AGENT_STUCK`, `TASK_FAILED`, or `CANCELLED`. Displayed in the status bar and saved to metrics.
- **Anti-loop fingerprints** — repeated identical tool calls (same tool + same args) are detected; 3 repeats triggers a forced strategy-change note; persistent looping forces synthesis.
- **No task budget by default** — a task runs until it is finished, until you cancel, or until it genuinely cannot make progress. Iterations, tokens, tool calls and wall-clock are all uncapped, because a cap cut a migration short and returned a confident answer about work that was not done. Two things deliberately stay: **context trimming** (a request past the model's window is refused by the provider, so uncapping it breaks everything) and the **repeated-tool-call guard** (three identical calls in a row is a deadlock, not a long task — that is what stops an uncapped loop from running forever). Every limit is still settable via config or `MENTEE_MAX_*` for a deliberately bounded run.
- **Unchanged-read short-circuit** — reading the same file+range with the same hash returns the cached stub (no redundant I/O). Hash change = full re-read.
- **Read-range tracking** — the agent remembers *which line ranges* of a file it has already read, so re-reading line-for-line across a large file is refused as redundant instead of burning a tool call per chunk. A region not yet covered still reads normally, and any edit to the file invalidates its record.
- **Search results you can act on** — `search_code` returns `path:line:match` rows, and the one-line summary the UI shows *is* those rows, not just a match count. The agent is also told to read the line it is about to change rather than re-reading the file to find hits it was already given.
- **Predictable search** — the ripgrep fast path and the pure-JS fallback are held to the same behaviour: case-insensitive regex, literal fallback for an invalid pattern, and no shell in the command line. The same query returns the same results on every machine.
- **Structured failure prefixes** — `PATCH_FAILED`, `FILE_CHANGED`, `READ_RANGE_INVALID`, `COMMAND_FAILED`, `TEST_FAILED` all include file path, hashes, and a `Recovery:` instruction so the next iteration corrects course immediately.
- **Per-task metrics** — every task appends to `~/.mentee/sessions/<hash>.metrics.jsonl` with timing, token usage, tool counts, and termination reason.
- **Configurable limits** — override any of the above via `~/.mentee/config.json` (`"limits": {...}`) or environment variables (`MENTEE_MAX_ITERATIONS`, `MENTEE_MAX_WALL_TIME_MS`, etc.). Uncapped is the default; set a value to opt back into a bound.
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

### 🛠️ Complete tool suite — 41 tools

Each one exists because the agent was reaching for it as a shell command, and a
shell command that is subtly wrong is silently wrong: a grep that matches a
comment, a line count that includes blanks, a JSON read that returns `{}` because
the file had comments. The tool is the thing that decides.

`delegate` is the one tool not in the registry — it is intercepted by the agent
loop, because a subagent needs the provider and the abort signal, which a
`ToolContext` does not carry. See the delegation section below.

**Filesystem (7)**

| Tool | What it does | Risk |
|---|---|---|
| `apply_patch` | Replace an exact unique snippet in a file: old_string (must occur exactly once) becomes new_string. | |
| `file_info` | File or directory info: size, type, and safe-deletion profile. | |
| `list_files` | List files/dirs under a path (ignores node_modules etc.). | |
| `move_path` | Move or rename a file/directory within the workspace. | asks first |
| `read_file` | Read a file (line-numbered), optionally a line range. | |
| `safe_delete_suggestion` | Return, rather than run, the PowerShell/CMD commands to delete a path, with double-check steps. | |
| `write_file` | Create or fully overwrite a file. | |

**Search (6)**

| Tool | What it does | Risk |
|---|---|---|
| `count_lines` | Count lines of code per file or across the project, optionally split by blank and comment lines. | |
| `find_duplicates` | Find duplicated code blocks: repeated line sequences across files, or near-identical functions. | |
| `find_symbol` | Locate where a symbol is defined and where it is used: functions, classes, types, constants, imports. | |
| `project_map` | Show the project layout as a tree with file counts per directory and an entry-point guess. | |
| `search_code` | Regex-search file contents across the workspace; returns path:line:match for each hit. | |
| `search_files` | Find files by name with * and ? wildcards. | |

**Data (3)**

| Tool | What it does | Risk |
|---|---|---|
| `inspect_dependencies` | List the external packages a file or the project imports from, with the version pinned in package.json when there is one. | |
| `read_json` | Read a JSON file, optionally a JSON-pointer into it. | |
| `write_json` | Write a JSON file, formatting it with 2-space indent. | asks first |

**Code intel (4)**

| Tool | What it does | Risk |
|---|---|---|
| `find_todos` | Find TODO/FIXME/XXX/HACK markers and commented-out code blocks, with the surrounding line. | |
| `list_exports` | List what a file exports — named exports, the default export, re-exports — with the line number. | |
| `list_tests` | List the test cases in a file or project with their line numbers, and given a failure message, show the test that owns it. | |
| `trace_imports` | Show the import graph around a file: what it imports, and what imports it. | |

**Git (10)**

| Tool | What it does | Risk |
|---|---|---|
| `git_blame` | Find which commit last changed a specific line, and show that commit. | |
| `git_branch_info` | Show local and remote branches, which are ahead or behind, and which branches contain a given commit. | |
| `git_branches` | List all git branches (local and remote) for the workspace. | |
| `git_changes` | Summarize uncommitted changes: per-file added/removed line counts, plus untracked files. | |
| `git_diff` | Show the current uncommitted diff. | |
| `git_history` | Show the commit history for a specific path: subject, author, date, and files touched. | |
| `git_log` | Show recent commit history (one line per commit). | |
| `git_pickaxe` | Search git history for commits that added or removed a literal string, showing the diff hunk. | |
| `git_show` | Show a commit (message + diff) for a given ref. | |
| `git_status` | Show git status (branch + short status) for the workspace. | |

**Execution (1)**

| Tool | What it does | Risk |
|---|---|---|
| `execute_command` | Run a shell command in the workspace. | asks first |

**Verification (4)**

| Tool | What it does | Risk |
|---|---|---|
| `inspect_env` | OS info + installed toolchain versions (node, npm, python, pip, git). | |
| `run_linter` | Run the project linter (eslint / biome / ruff auto-detected). | |
| `run_tests` | Run the project test suite (npm test/pytest/go test/cargo test auto-detected). | |
| `run_typecheck` | Run static type checking (tsc --noEmit / mypy / go vet / cargo check auto-detected). | |

**Memory (1)**

| Tool | What it does | Risk |
|---|---|---|
| `memory` | Persist notes for this project across sessions. | |

**Web (2)**

| Tool | What it does | Risk |
|---|---|---|
| `http_fetch` | Fetch a URL and return the body text, truncated if large. | |
| `web_search` | Web search for docs and solutions. | |

**Diagnostics (3)**

| Tool | What it does | Risk |
|---|---|---|
| `port_check` | Check whether a local TCP port is in use and what is listening on it. | |
| `process_list` | List running processes (find what locks files or uses resources). | |
| `system_info` | Get operating system and environment information. | |

> **Planned, not yet present:** `update_todos` (a live checklist rendered in the TUI). `delegate` **is** present — see below.

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

## 🎨 The colour system

MenteE's identity is cream and charcoal, and the palette is built from that
rather than from a terminal-theme default. The whole system lives in one file,
`src/tui/theme.ts`, and nothing else in the UI is allowed to pick a colour.

### The constraint that shaped it

A cream terminal **inverts the usual assumption.** Most terminal palettes assume a
black background, which is why "brand colour" usually becomes a pale tint — and a
pale tint on cream is *invisible*. Cyan text, which is the conventional choice for
prompts and links, is one of the least legible hues on a warm background.

So **nothing in the palette is light.** Every value is a warm, dark tone, chosen
to sit on cream the way charcoal text does, inside a single warm family so the UI
reads as one piece rather than a bag of highlighter colours.

### The roles

| Role | Cream | What it carries |
|---|---|---|
| `ink` | `#241F1B` | The charcoal. Headings, the wordmark. |
| `inkSoft` | `#453D33` | Body emphasis, your own messages |
| `inkFaint` | `#6B6154` | Summaries, hints, secondary metadata |
| `rule` | `#8A7E68` | Separators and rules |
| `accent` | `#1F5560` | Deep petrol — prompts, selection, code, links |
| `warn` | `#8A5A0B` | Ochre — running work, in-progress |
| `good` | `#43661C` | Deep olive — success, added lines |
| `bad` | `#96341A` | Terracotta — errors, removed lines |
| `edit` | `#3A4A6B` | Deep slate — diffs |
| `phase` | `#6A2F5C` | Plum — phase transitions |

A true cyan is gone, replaced by a deep petrol that survives a warm background. Lime
and red are gone, replaced by olive and terracotta, which do not read as traffic
lights against a warm ground. Two cool tones — `accent` and `edit` — are
deliberate: a fully warm set has almost no hue range left, and without them the
prompt, the diff and the phase markers all collapse into the same brown.

### Contrast is enforced, not eyeballed

Every colour is checked against the cream background (`#F2EAD9`) by the test
suite, which fails below the WCAG AA ratio for body text. That test is the reason
the palette is safe to edit: change a value that is too light and **the build goes
red** instead of the UI quietly becoming unreadable. It also asserts the semantic
pairs separate by *hue* rather than brightness — requiring success and error to
differ in luminance just pushes one of them toward the background until it stops
being readable.

### Dark terminals

Set `MENTEE_THEME=dark` and the same roles are used with the lightness flipped. A
test asserts the hues barely move between modes, so a screenshot from either reads
as the same product rather than two.

```bash
MENTEE_THEME=dark   # brightened palette for a black background
```

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
mentee -p anthropic "task"        choose provider (kimi, glm, zai, zai-coding, openai,
                                  anthropic, gemini, deepseek, qwen, qwen-cn,
                                  openrouter, nvidia, mock)
mentee -m <model-id> "task"       override model for the current provider
mentee --yes --no-tui "task"      headless mode for scripts/CI
```

### Inside the TUI (slash commands)
```text
/provider <name>     switch provider
/model <id>          set the model for the current provider
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

Keys may also be supplied via environment variables — one per provider:
`MENTEE_KIMI_API_KEY`, `MENTEE_GLM_API_KEY`, `MENTEE_ZAI_API_KEY`,
`MENTEE_OPENAI_API_KEY`, `MENTEE_ANTHROPIC_API_KEY`, `MENTEE_GEMINI_API_KEY`,
`MENTEE_DEEPSEEK_API_KEY`, `MENTEE_DASHSCOPE_API_KEY`,
`MENTEE_DASHSCOPE_CN_API_KEY`, `MENTEE_OPENROUTER_API_KEY`,
`MENTEE_NVIDIA_API_KEY`.

`MENTEE_PROMPT_CACHE=off` disables prompt-prefix caching globally; it is on
everywhere else with no per-model configuration.

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
│   │                    #   delegation interception, forced synthesis, anti-loop
│   ├── delegate.ts      # the `delegate` tool: schema, caps, prompt rules
│   ├── subagent.ts      # the read-only subagent itself
│   ├── retry.ts         # rate-limit backoff, shared by the loop and subagents
│   ├── limits.ts        # RunLimits, BudgetTracker (uncapped by default)
│   ├── metrics.ts       # MetricsTracker, classifyTermination
│   ├── prompts.ts       # compact system prompt (terse, search-first, safety)
│   ├── conversation.ts  # disk-backed conversation + verified file-state index
│   └── state.ts         # phase / usage / error / file tracking
├── models/              # provider layer: OpenAI-compatible factories
│                        #   (kimi, glm, zai, zai-coding, openai, gemini,
│                        #   deepseek, qwen, qwen-cn, openrouter, nvidia) plus a
│                        #   native Anthropic Messages API client, and mock
├── tools/               # 41-tool registry, hash-validated filesystem, policy
│                        #   + analysis.ts (structure/size) and code-intel.ts
│                        #   (JSON, exports, tests, git history)
├── tui/                 # Ink/React terminal UI (legacy, behind --ink flag)
├── render.ts            # event → colored output
├── config.ts            # ~/.mentee/config.json (includes limits config)
└── events.ts            # internal event bus
```

**Stack:** TypeScript 5 · Ink 5 (legacy) · React 18 · OpenAI SDK 5 · tsup · commander · chalk.
The Anthropic provider is a direct `fetch` client rather than an SDK, so it adds no dependency.
**Requirements:** Node ≥ 20 · MIT licensed.

> **Node 22 recommended.** `chalk@6` and `commander@15` declare `node >=22`, so installing on Node 20 prints an `EBADENGINE` warning. It builds and runs, but 22+ is the supported target.

### 🔁 Reliable across machines
A query's result must not depend on which laptop it ran on. The ripgrep fast path and the pure-JS fallback are held to identical behaviour — same case sensitivity, same regex semantics, same literal fallback for an invalid pattern — and the search command is executed as an argument vector with no shell, so a pattern like `A|B` is a regex and never a pipe between two commands.

The agent also identifies itself correctly to providers that gate models by client type, so an OpenRouter model restricted to agentic harnesses is reachable from MenteE rather than refused with a 403.

---

## Use Cases

- **Bring your own model** — run the same task on Claude, GPT, Gemini, DeepSeek or Qwen with `-p`, and compare. The verification loop, tools and context management are identical; only the brain changes.
- **Fix failing tests** — "fix the failing auth tests and make sure they pass"
- **Add a feature** — "add a `/health` endpoint that returns 200"
- **Debug regressions** — "why did the build start failing after the last PR?"
- **Refactors** — "rename the `User` service to `Account` across the API layer"
- **Onboarding** — "explain how this repo is structured and where auth lives"
- **Fast follow-ups** — "tweak that CSS again" — verified file state and read-range tracking mean no re-discovery
- **CI / automation** — headless mode for scripted tasks

---

## Roadmap

- Parallel tool calls within a single iteration — several `read_file` calls in
  one turn, rather than the current one-at-a-time
- Routing presets in the config wizard (`/route` quick-setup)
- PR creation and review workflows
- Team/shared memory scopes
- Subagents that can propose a patch for review, not only answer a question
  (today they are read-only by allowlist)

---

**MenteE — the autonomous SWE agent that actually finishes the job, and remembers how it got there.**

Website: **menteeai.org** · Twitter: **@menteeaiorg** · Package: **`@menteeai/menteeswe`**
