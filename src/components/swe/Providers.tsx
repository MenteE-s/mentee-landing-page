import { Reveal } from "@/components/Reveal";

const providers = [
  {
    name: "Z.ai Coding Plan",
    slug: "zai-coding",
    model: "glm-4.6",
    env: "MENTEE_ZAI_CODING_API_KEY",
    isDefault: true,
  },
  {
    name: "Z.ai (GLM intl)",
    slug: "zai",
    model: "glm-4.6",
    env: "MENTEE_ZAI_API_KEY",
  },
  {
    name: "GLM (Zhipu CN)",
    slug: "glm",
    model: "glm-4.6",
    env: "MENTEE_GLM_API_KEY",
  },
  {
    name: "Kimi (Moonshot)",
    slug: "kimi",
    model: "kimi-k2.7-code",
    env: "MENTEE_KIMI_API_KEY",
  },
  {
    name: "OpenAI",
    slug: "openai",
    model: "gpt-5.2-codex",
    env: "MENTEE_OPENAI_API_KEY",
  },
  {
    name: "Anthropic",
    slug: "anthropic",
    model: "claude-sonnet-4-5",
    env: "MENTEE_ANTHROPIC_API_KEY",
  },
  {
    name: "Gemini",
    slug: "gemini",
    model: "gemini-3-pro-preview",
    env: "MENTEE_GEMINI_API_KEY",
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    model: "deepseek-chat",
    env: "MENTEE_DEEPSEEK_API_KEY",
  },
  {
    name: "Qwen (international)",
    slug: "qwen",
    model: "qwen3-coder-plus",
    env: "MENTEE_DASHSCOPE_API_KEY",
  },
  {
    name: "Qwen (China)",
    slug: "qwen-cn",
    model: "qwen3-coder-plus",
    env: "MENTEE_DASHSCOPE_CN_API_KEY",
  },
  {
    name: "OpenRouter",
    slug: "openrouter",
    model: "anthropic/claude-sonnet-4.5",
    env: "MENTEE_OPENROUTER_API_KEY",
  },
  {
    name: "NVIDIA NIM",
    slug: "nvidia",
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    env: "MENTEE_NVIDIA_API_KEY",
  },
  {
    name: "Mock (offline testing)",
    slug: "mock",
    model: "—",
    env: "no key needed",
  },
];

export function SWEProviders() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Model-agnostic, 13 providers
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Switch providers without changing your workflow. Z.ai Coding is
              the default, optimized for the GLM Coding Plan subscription — add
              a key and go.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-neutral-200 bg-neutral-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-neutral-900">
                      Provider
                    </th>
                    <th className="px-6 py-4 font-semibold text-neutral-900">
                      -p slug
                    </th>
                    <th className="px-6 py-4 font-semibold text-neutral-900">
                      Default model
                    </th>
                    <th className="px-6 py-4 font-semibold text-neutral-900">
                      Env var
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {providers.map((p) => (
                    <tr key={p.slug} className="hover:bg-neutral-50">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-900">
                        {p.name}
                        {p.isDefault ? (
                          <span className="ml-2 rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Default
                          </span>
                        ) : null}
                      </td>
                      <td className="px-6 py-4">
                        <code className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-800">
                          -{p.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-neutral-600">{p.model}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-neutral-600">
                        {p.env}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-neutral-500">
            Per-phase model routing lets you serve exploration from a cheap,
            fast model and edits from a strong one — configured in{" "}
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs">
              ~/.mentee/config.json
            </code>
            , with token spend per route reported in every task summary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
