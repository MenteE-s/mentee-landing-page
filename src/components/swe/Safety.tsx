import { Reveal } from "@/components/Reveal";

const levels = [
  {
    risk: "safe",
    behavior: "Auto-approved (read, lint, git status)",
    examples: "read_files, list_files, git status",
    color: "green",
  },
  {
    risk: "moderate",
    behavior: "Auto-approved (write, install, test)",
    examples: "apply_patch, npm install, vitest",
    color: "yellow",
  },
  {
    risk: "dangerous",
    behavior: "Requires explicit approval",
    examples: "rm -rf, sudo, DROP TABLE",
    color: "red",
  },
  {
    risk: "deletion",
    behavior: "Never auto-executes",
    examples: "rm -rf /, git reset --hard",
    color: "neutral",
  },
];

const colorMap: Record<string, string> = {
  green: "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-neutral-50 text-neutral-700 border-neutral-200",
};

export function SWESafety() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Safety is not optional
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Every command is risk-classified before execution. Dangerous
              operations require explicit approval. Deletion is never
              auto-executed.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-neutral-200 bg-neutral-50">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-neutral-900">
                        Risk level
                      </th>
                      <th className="px-6 py-4 font-semibold text-neutral-900">
                        Behavior
                      </th>
                      <th className="px-6 py-4 font-semibold text-neutral-900">
                        Examples
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {levels.map((l) => (
                      <tr key={l.risk} className="hover:bg-neutral-50">
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorMap[l.color]}`}
                          >
                            {l.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                          {l.behavior}
                        </td>
                        <td className="px-6 py-4">
                          <code className="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-800">
                            {l.examples}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-neutral-500">
              Every action is logged to an audit trail. Configurable guardrails
              for iterations, tool calls, tokens, and wall-clock time.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
