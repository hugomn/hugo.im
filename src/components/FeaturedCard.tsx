import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href: string;
  frontmatter: CollectionEntry<"blog">["data"];
}

export default function FeaturedCard({ href, frontmatter }: Props) {
  const { title, pubDatetime, description, image } = frontmatter;
  
  // Format date as "Month D, YYYY | HH:MM AM/PM"
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    const formatted = new Intl.DateTimeFormat('en-US', options).format(date);
    // Remove 'at' and format as "Month D, YYYY | HH:MM AM/PM"
    return formatted.replace(' at ', ' | ');
  };

  const formattedDate = formatDate(new Date(pubDatetime));
  const titleId = `featured-title-${slugifyStr(title)}`;

  return (
    <article className="featured-card group">
      <a href={href} className="featured-card-link" aria-labelledby={titleId}>
        {/* Top media - Cover image */}
        <div className="featured-card-image-container">
          {image ? (
            <img
              src={typeof image === 'string' ? image : image.src}
              alt={`Featured image for ${title}`}
              className="featured-card-image"
              loading="lazy"
              width="400"
              height="192"
              style={{
                viewTransitionName: `img-${slugifyStr(title)}`,
              }}
            />
          ) : (
            <div className="featured-card-placeholder">
              <span className="placeholder-text">{title}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="featured-card-content">
          {/* Meta row */}
          <div className="featured-card-meta">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="calendar-icon"
              aria-hidden="true"
            >
              <path d="M8 2v4" fill="none" />
              <path d="M16 2v4" fill="none" />
              <rect width="18" height="18" x="3" y="4" rx="2" fill="none" />
              <path d="M3 10h18" fill="none" />
            </svg>
            <time
              dateTime={pubDatetime.toISOString()}
              className="featured-card-date"
            >
              {formattedDate}
            </time>
          </div>

          {/* Title */}
          <h3
            id={titleId}
            className="featured-card-title"
            style={{ viewTransitionName: slugifyStr(title) }}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p className="featured-card-excerpt">{description}</p>
        </div>
      </a>
    </article>
  );
}