import { Reveal } from "@/components/Reveal";

const providers = [
  {
    name: "OpenAI",
    models: "GPT-4o, GPT-4o-mini, o1, o1-mini",
    env: "OPENAI_API_KEY",
    docs: "https://platform.openai.com",
  },
  {
    name: "Anthropic",
    models: "Claude Opus, Claude Sonnet, Claude Haiku",
    env: "ANTHROPIC_API_KEY",
    docs: "https://console.anthropic.com",
  },
  {
    name: "Google AI Studio",
    models: "Gemini 2.0 Flash, Gemini 1.5 Pro",
    env: "GOOGLE_API_KEY",
    docs: "https://aistudio.google.com",
  },
  {
    name: "Mistral",
    models: "Mistral Large, Codestral",
    env: "MISTRAL_API_KEY",
    docs: "https://console.mistral.ai",
  },
  {
    name: "OpenRouter",
    models: "Any OpenRouter model",
    env: "OPENROUTER_API_KEY",
    docs: "https://openrouter.ai",
  },
  {
    name: "DeepSeek",
    models: "DeepSeek-V3, DeepSeek-R1",
    env: "DEEPSEEK_API_KEY",
    docs: "https://platform.deepseek.com",
  },
  {
    name: "Groq",
    models: "Llama 3.3, Mixtral",
    env: "GROQ_API_KEY",
    docs: "https://console.groq.com",
  },
];

export function SWEProviders() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              One config file, seven providers
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Switch providers without changing your workflow. Add an API key and
              set your default model.
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
                      Models
                    </th>
                    <th className="px-6 py-4 font-semibold text-neutral-900">
                      Environment variable
                    </th>
                    <th className="px-6 py-4 font-semibold text-neutral-900">
                      Docs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {providers.map((p) => (
                    <tr key={p.name} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 font-medium text-neutral-900">
                        {p.name}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">{p.models}</td>
                      <td className="px-6 py-4">
                        <code className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-800">
                          {p.env}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={p.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {p.docs.replace("https://", "")}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
