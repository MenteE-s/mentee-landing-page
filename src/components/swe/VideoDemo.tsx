import { Reveal } from "@/components/Reveal";

type Props = {
  // Set either `youtubeId` OR `src` (+ optional `poster`).
  // Examples:
  //   <SWEVideoDemo youtubeId="dQw4w9WgXcQ" />
  //   <SWEVideoDemo src="/videos/mentee-swe-demo.mp4" poster="/videos/poster.jpg" />
  youtubeId?: string;
  src?: string;
  poster?: string;
  title?: string;
};

export function SWEVideoDemo({
  youtubeId,
  src,
  poster,
  title = "See MenteE SWE in action",
}: Props) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-12">
      <Reveal>
        <div className="mb-6 flex flex-col items-center text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Demo
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
            Watch how MenteE SWE takes a task, searches your codebase, edits
            files, runs tests, and reports back — all from your terminal.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-sm">
          <div className="relative aspect-video w-full">
            {youtubeId ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                className="absolute inset-0 h-full w-full"
                src={src}
                poster={poster}
                controls
                playsInline
                preload="metadata"
              >
                Sorry, your browser does not support embedded videos.
              </video>
            )}
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-neutral-500">
          Want to try it yourself?{" "}
          <a
            href="https://github.com/MenteE-s/mentee-swe"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-neutral-700"
          >
            Install MenteE SWE from GitHub
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}