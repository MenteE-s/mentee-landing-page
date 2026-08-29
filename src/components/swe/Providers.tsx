import { Reveal } from "@/components/Reveal";

const providers = [
  { provider: "Z.ai Coding", endpoint: "api.z.ai/api/coding/paas/v4", model: "glm-4.6", env: "MENTEE_ZAI_API_KEY", default: true },
  { provider: "Z.ai (GLM intl)", endpoint: "api.z.ai/api/paas/v4", model: "glm-4.6", env: "MENTEE_ZAI_API_KEY", default: false },
  { provider: "Kimi (Moonshot)", endpoint: "api.moonshot.ai/v1", model: "kimi-k2.7-code", env: "MENTEE_KIMI_API_KEY", default: false },
  { provider: "GLM (Zhipu CN)", endpoint: "open.bigmodel.cn", model: "glm-4.6", env: "MENTEE_GLM_API_KEY", default: false },
  { provider: "mock", endpoint: "offline", model: "—", env: "no key needed", default: false },
];

export function SWEProviders() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Model providers
        </h2>
        <p className="mt-2 max-w-xl text-neutral-600">
          Bring your own API key. Switch providers with a keypress — the agent
          runtime stays the same.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-2.5">Provider</th>
                  <th className="px-4 py-2.5">Endpoint</th>
                  <th className="px-4 py-2.5">Default model</th>
                  <th className="px-4 py-2.5">Env var</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((p) => (
                  <tr key={p.provider} className={`border-b border-neutral-50 ${p.default ? "bg-neutral-50/80" : ""}`}>
                    <td className="px-4 py-2.5 font-medium text-neutral-900">
                      {p.provider}
                      {p.default && (
                        <span className="ml-2 rounded bg-neutral-900 px-1.5 py-0.5 text-[9px] font-bold text-white">
                          DEFAULT
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-neutral-600">{p.endpoint}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-neutral-600">{p.model}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-neutral-500">{p.env}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
