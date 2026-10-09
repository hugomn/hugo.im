// Turns standalone markdown images into <figure> elements.
//
// - A paragraph that holds a single local image becomes <figure class="figure">.
// - The image gets its intrinsic width/height (no layout shift) and lazy loading.
// - Images at least WIDE_MIN px wide get "figure--wide" so CSS can let them
//   break out of the reading column. Small images are never enlarged.
// - Caption: the markdown image title (![alt](src "caption")), or an
//   italic-only paragraph directly after the image (_caption_).
import path from "node:path";
import sharp from "sharp";

const WIDE_MIN = 1200;
const PUBLIC_DIR = path.join(process.cwd(), "public");

const isWhitespace = node => node.type === "text" && !node.value.trim();

const onlyElementChild = node => {
  const meaningful = (node.children || []).filter(c => !isWhitespace(c));
  return meaningful.length === 1 && meaningful[0].type === "element"
    ? meaningful[0]
    : null;
};

async function measure(src) {
  if (typeof src !== "string" || !src.startsWith("/")) return null;
  try {
    const file = path.join(PUBLIC_DIR, decodeURI(src.split(/[?#]/)[0]));
    const { width, height } = await sharp(file).metadata();
    return width && height ? { width, height } : null;
  } catch {
    return null;
  }
}

export default function rehypeFigures() {
  return async tree => {
    const jobs = [];

    const visit = parent => {
      const children = parent.children || [];
      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        if (node.type !== "element") continue;

        const img = node.tagName === "p" ? onlyElementChild(node) : null;
        if (!img || img.tagName !== "img") {
          if (node.tagName !== "figure") visit(node);
          continue;
        }

        // Caption: image title, or a following italic-only paragraph
        let caption = null;
        if (img.properties.title) {
          caption = [{ type: "text", value: String(img.properties.title) }];
          delete img.properties.title;
        } else {
          let j = i + 1;
          while (j < children.length && isWhitespace(children[j])) j++;
          const next = children[j];
          const em =
            next && next.type === "element" && next.tagName === "p"
              ? onlyElementChild(next)
              : null;
          if (em && em.tagName === "em") {
            caption = em.children;
            children.splice(j, 1);
          }
        }

        const figure = {
          type: "element",
          tagName: "figure",
          properties: { className: ["figure"] },
          children: [img],
        };
        if (caption) {
          figure.children.push({
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: caption,
          });
        }
        children[i] = figure;

        img.properties.loading = img.properties.loading || "lazy";
        img.properties.decoding = "async";
        jobs.push(
          measure(img.properties.src).then(size => {
            if (!size) return;
            img.properties.width = size.width;
            img.properties.height = size.height;
            if (size.width >= WIDE_MIN) {
              figure.properties.className.push("figure--wide");
            }
          })
        );
      }
    };

    visit(tree);
    await Promise.all(jobs);
  };
}
