import { LOCALE, SITE } from "@config";
import type { CollectionEntry } from "astro:content";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
}

interface EditPostProps {
  editPost?: CollectionEntry<"blog">["data"]["editPost"];
  postId?: CollectionEntry<"blog">["id"];
}

interface Props extends DatetimesProps, EditPostProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className = "",
  editPost,
  postId,
}: Props) {
  const textSize = size === "sm" ? "text-sm" : "text-[0.9375rem]";
  const isUpdated = modDatetime && modDatetime > pubDatetime;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 text-skin-muted ${textSize} ${className}`.trim()}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      <span>
        {isUpdated ? (
          <span>Updated </span>
        ) : (
          <span className="sr-only">Published: </span>
        )}
        <FormattedDatetime
          pubDatetime={pubDatetime}
          modDatetime={modDatetime}
        />
      </span>
      {size === "lg" && <EditPost editPost={editPost} postId={postId} />}
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  const myDatetime = new Date(
    modDatetime && modDatetime > pubDatetime ? modDatetime : pubDatetime
  );

  const date = myDatetime.toLocaleDateString(LOCALE.langTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <time dateTime={myDatetime.toISOString()}>{date}</time>;
};

const EditPost = ({ editPost, postId }: EditPostProps) => {
  let editPostUrl = editPost?.url ?? SITE?.editPost?.url ?? "";
  const showEditPost = !editPost?.disabled && editPostUrl.length > 0;
  const appendFilePath =
    editPost?.appendFilePath ?? SITE?.editPost?.appendFilePath ?? false;
  if (appendFilePath && postId) {
    editPostUrl += `/${postId}.md`;
  }
  const editPostText = editPost?.text ?? SITE?.editPost?.text ?? "Edit";

  return (
    showEditPost && (
      <>
        <span
          aria-hidden="true"
          className="inline-block h-3.5 w-px bg-skin-inverted opacity-25"
        />
        <a
          className="inline-flex items-center gap-1 transition-colors hover:text-skin-accent"
          href={editPostUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon icon-tabler icons-tabler-outline icon-tabler-edit inline-block !h-4 !w-4 !scale-100"
            aria-hidden="true"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
          <span>{editPostText}</span>
        </a>
      </>
    )
  );
};
