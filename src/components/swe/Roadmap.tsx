import { Reveal } from "@/components/Reveal";

const roadmapItems = [
  {
    status: "done",
    title: "v0.1 — Agent core",
    desc: "Autonomous loop, 6 tools, 7 providers, TUI, safety guardrails",
  },
  {
    status: "done",
    title: "v0.2 — Memory & skills",
    desc: "Project memory, reusable skills, audit trail, cost tracking",
  },
  {
    status: "done",
    title: "v0.3 — Hooks & MCP",
    desc: "Lifecycle hooks, MCP server, worktree isolation, plugin API",
  },
  {
    status: "in-progress",
    title: "v1.0 — Production ready",
    desc: "Stable API, comprehensive docs, enterprise features",
  },
];

const statusStyles: Record<string, string> = {
  done: "bg-green-100 text-green-800 border-green-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  planned: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const statusLabels: Record<string, string> = {
  done: "Shipped",
  "in-progress": "In progress",
  planned: "Planned",
};

export function SWERoadmap() {
  return (
    <section className="border-t border-neutral-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Roadmap
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              MenteE is actively developed. Here&apos;s what we&apos;ve shipped
              and what&apos;s coming next.
            </p>
          </div>
        </Reveal>
        <div className="mx-auto mt-16 max-w-3xl space-y-4">
          {roadmapItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <div className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                <span
                  className={`mt-0.5 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[item.status]}`}
                >
                  {statusLabels[item.status]}
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
