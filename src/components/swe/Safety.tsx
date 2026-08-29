import { Reveal } from "@/components/Reveal";

const levels = [
  { risk: "safe", behavior: "Runs automatically (read-only, diagnostics)", color: "bg-green-100 text-green-700" },
  { risk: "restricted", behavior: "Asks for approval (installs, git history changes)", color: "bg-amber-100 text-amber-700" },
  { risk: "dangerous", behavior: "Blocked entirely (rm -rf, sudo, force pushes)", color: "bg-red-100 text-red-700" },
  { risk: "deletion", behavior: "Never automatic — returns commands for you to run", color: "bg-red-100 text-red-700" },
];

export function SWESafety() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Safety model
        </h2>
        <p className="mt-2 max-w-xl text-neutral-600">
          The agent is scoped to your workspace and will not touch files, secrets,
          or commands outside it.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
                  <th className="px-4 py-2.5">Risk level</th>
                  <th className="px-4 py-2.5">Behavior</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((l) => (
                  <tr key={l.risk} className="border-b border-neutral-50">
                    <td className="px-4 py-2.5">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${l.color}`}>
                        {l.risk}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-neutral-600">{l.behavior}</td>
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
