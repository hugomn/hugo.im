import satori from "satori";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

// Fallback OG image for posts without a cover, in the covers' navy style.
export default async (post: CollectionEntry<"blog">) => {
  return satori(
    <div
      style={{
        background: "#0e1117",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        fontFamily: "Schibsted Grotesk",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: 72,
            height: 6,
            background: "#e3b25a",
            borderRadius: 3,
            marginBottom: 40,
          }}
        />
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#e6eaf0",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            maxHeight: 380,
            overflow: "hidden",
          }}
        >
          {post.data.title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 30,
          color: "#9aa5b4",
        }}
      >
        <span style={{ color: "#e6eaf0", fontWeight: 700 }}>{SITE.title}</span>
        <span>{new URL(SITE.website).hostname}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        post.data.title + SITE.title + SITE.website
      )) as FontOptions[],
    }
  );
};
