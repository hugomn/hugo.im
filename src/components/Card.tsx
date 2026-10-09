import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-lg font-semibold leading-snug tracking-[-0.01em] sm:text-xl",
  };

  return (
    <li className="border-b border-skin-line py-6 last:border-b-0">
      <a
        href={href}
        className="inline-block text-skin-base transition-colors hover:text-skin-accent"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime
        pubDatetime={pubDatetime}
        modDatetime={modDatetime}
        className="mt-1.5"
      />
      <p className="mt-2 max-w-[42rem] text-[0.9375rem] leading-relaxed text-skin-muted">
        {description}
      </p>
    </li>
  );
}
