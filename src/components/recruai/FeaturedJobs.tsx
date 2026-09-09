import { Reveal } from "@/components/Reveal";

const jobs = [
  {
    title: "Senior Software Engineer",
    company: "Systems Ltd",
    location: "Lahore, Pakistan",
    salary: "PKR 450K - 700K /mo",
    type: "Full-time",
    remote: "Hybrid",
    posted: "2 days ago",
    applicants: 124,
  },
  {
    title: "Product Manager",
    company: "Daraz",
    location: "Karachi, Pakistan",
    salary: "PKR 350K - 550K /mo",
    type: "Full-time",
    remote: "On-site",
    posted: "1 day ago",
    applicants: 89,
  },
  {
    title: "UX Designer",
    company: "Careem",
    location: "Dubai, UAE",
    salary: "AED 15K - 22K /mo",
    type: "Full-time",
    remote: "Hybrid",
    posted: "3 days ago",
    applicants: 156,
  },
  {
    title: "Data Scientist",
    company: "STC",
    location: "Riyadh, Saudi Arabia",
    salary: "SAR 18K - 25K /mo",
    type: "Full-time",
    remote: "On-site",
    posted: "5 hours ago",
    applicants: 67,
  },
  {
    title: "Frontend Developer",
    company: "Talabat",
    location: "Doha, Qatar • Remote",
    salary: "QAR 14K - 20K /mo",
    type: "Full-time",
    remote: "Remote",
    posted: "1 day ago",
    applicants: 203,
  },
  {
    title: "DevOps Engineer",
    company: "Meezan Bank",
    location: "Islamabad, Pakistan",
    salary: "PKR 400K - 600K /mo",
    type: "Full-time",
    remote: "Hybrid",
    posted: "4 days ago",
    applicants: 45,
  },
];

export function RecruAIFeaturedJobs() {
  return (
    <section className="border-y border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">Featured Jobs</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Top <span className="text-neutral-400">opportunities</span> in Pakistan &amp; Gulf
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-600">
            Hand-picked roles in Karachi, Lahore, Islamabad, Dubai, Riyadh, Doha &amp; more — find your perfect job.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-900 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-sm font-bold text-white">
                    {job.company.charAt(0)}
                  </span>
                  <span className="text-xs text-neutral-500">{job.posted}</span>
                </div>

                <h3 className="mt-5 text-base font-semibold leading-tight text-neutral-900">{job.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{job.company}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                    {job.location}
                  </span>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                    {job.type}
                  </span>
                  <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white">{job.remote}</span>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
                  <span className="text-sm font-semibold text-neutral-900">{job.salary}</span>
                  <span className="text-xs text-neutral-500">{job.applicants} applicants</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <a
              href="https://recruai.menteeai.org/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              View all jobs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
