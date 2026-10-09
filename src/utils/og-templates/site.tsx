import satori from "satori";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

// Same navy data-card language as the post covers.
export default async () => {
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
            fontSize: 88,
            fontWeight: 700,
            color: "#e6eaf0",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {SITE.title}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            lineHeight: 1.4,
            color: "#9aa5b4",
            maxWidth: 960,
          }}
        >
          {SITE.desc}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: 30,
          color: "#9aa5b4",
        }}
      >
        {new URL(SITE.website).hostname}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        SITE.title + SITE.desc + SITE.website
      )) as FontOptions[],
    }
  );
};
