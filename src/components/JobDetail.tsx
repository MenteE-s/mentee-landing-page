"use client";

import Link from "next/link";

interface JobDetailProps {
  title: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  slug: string;
}

export function JobDetail({
  title,
  type,
  location,
  description,
  responsibilities,
  requirements,
  niceToHave,
  slug,
}: JobDetailProps) {
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/careers/${slug}`
      : "";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} — MenteE`,
          text: `Check out this role at MenteE: ${title}`,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard");
    }
  };

  const handleInvite = () => {
    const subject = encodeURIComponent(`Job opportunity at MenteE: ${title}`);
    const body = encodeURIComponent(
      `Hey,\n\nI came across this role at MenteE and thought of you:\n\n${title} (${type}, ${location})\n\n${shareUrl}\n\nWorth checking out!`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-3xl px-6 pt-6 text-sm text-neutral-400">
        <Link href="/careers" className="hover:text-black">
          Careers
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-600">{title}</span>
      </div>

      <section className="mx-auto max-w-3xl px-6 pb-20 pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span className="rounded-full border border-neutral-200 px-2.5 py-0.5">
                {type}
              </span>
              <span>{location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-black"
            >
              Share
            </button>
            <button
              type="button"
              onClick={handleInvite}
              className="rounded-full border border-neutral-200 px-3.5 py-2 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-black"
            >
              Invite a friend
            </button>
          </div>
        </div>

        <p className="mt-8 text-neutral-600 leading-relaxed">{description}</p>

        <div className="mt-10 space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Responsibilities
            </h2>
            <ul className="mt-4 space-y-2">
              {responsibilities.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-neutral-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Requirements
            </h2>
            <ul className="mt-4 space-y-2">
              {requirements.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-neutral-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {niceToHave.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Nice to have
              </h2>
              <ul className="mt-4 space-y-2">
                {niceToHave.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-neutral-600"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
          <h2 className="font-semibold text-neutral-900">How to apply</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Send your resume and a brief note about why you are a fit to{" "}
            <a
              href="mailto:hr@menteeai.org"
              className="font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
            >
              hr@menteeai.org
            </a>
            . Include the role title in the subject line.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`mailto:hr@menteeai.org?subject=${encodeURIComponent(`${title} Application`)}`}
              className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              Apply via email
            </a>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
            >
              Share this role
            </button>
            <button
              type="button"
              onClick={handleInvite}
              className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-black"
            >
              Invite a friend
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/careers"
            className="text-sm font-medium text-neutral-500 underline underline-offset-4 hover:text-black hover:no-underline"
          >
            ← Back to all roles
          </Link>
        </div>
      </section>
    </>
  );
}
