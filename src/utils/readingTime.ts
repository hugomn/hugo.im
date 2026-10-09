const WORDS_PER_MINUTE = 230;

/**
 * Estimated reading time in whole minutes for a markdown body.
 * Code blocks, HTML tags and image syntax are ignored.
 */
export default function getReadingTime(body?: string): number {
  if (!body) return 1;
  const text = body
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  const words = text.split(/\s+/).filter(word => /\w/.test(word)).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
