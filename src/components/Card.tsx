import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
  headingLevel?: 2 | 3 | 4;
  readingTime?: number;
  readingLabel?: string;
}

export default function Card({
  href,
  frontmatter,
  secHeading = true,
  headingLevel,
  readingTime,
  readingLabel = "min read",
}: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;
  const level = headingLevel ?? (secHeading ? 2 : 3);
  const Heading = `h${level}` as "h2" | "h3" | "h4";
  const primaryTag = tags?.[0];

  return (
    <li className="group relative border-b border-skin-line py-6 last:border-b-0">
      <Heading
        style={{ viewTransitionName: slugifyStr(title) }}
        className="text-lg font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-skin-accent sm:text-xl"
      >
        {/* The title link covers the whole row (stretched link) */}
        <a
          href={href}
          className="text-skin-base transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-skin-accent"
        >
          {title}
        </a>
      </Heading>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-skin-muted">
        <Datetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
          locale={frontmatter.locale}
        />
        {readingTime && (
          <>
            <span
              aria-hidden="true"
              className="inline-block h-1 w-1 rounded-full bg-skin-accent"
            />
            <span>
              {readingTime} {readingLabel}
            </span>
          </>
        )}
        {primaryTag && (
          <>
            <span
              aria-hidden="true"
              className="inline-block h-1 w-1 rounded-full bg-skin-accent"
            />
            <span>#{slugifyStr(primaryTag)}</span>
          </>
        )}
      </div>
      <p className="mt-2 max-w-[42rem] text-[0.9375rem] leading-relaxed text-skin-muted">
        {description}
      </p>
    </li>
  );
}
