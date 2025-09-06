import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, image } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <div className="card-container">
        {image && (
          <a href={href} className="card-image-link block mb-4">
            <img
              src={image}
              alt={title}
              className="card-image w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              loading="lazy"
              style={{
                maxHeight: "300px",
                objectFit: "cover",
                viewTransitionName: `img-${slugifyStr(title)}`,
              }}
            />
          </a>
        )}
        <a
          href={href}
          className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
        >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
        </a>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
        <p>{description}</p>
      </div>
    </li>
  );
}
