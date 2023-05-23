import { localizeUrl } from "./utils";
import { expect, test } from "vitest";

test("localizeUrl", () => {
  expect(localizeUrl("en", "https://www.example.com/")).toBe(
    "https://www.example.com/"
  );
  expect(localizeUrl("pt", "https://www.example.com/")).toBe(
    "https://www.example.com/pt"
  );
  expect(localizeUrl("pt", "https://www.example.com/en/blog")).toBe(
    "https://www.example.com/pt/blog"
  );
  expect(localizeUrl("en", "/blog")).toBe("/blog");
  expect(localizeUrl("pt", "/blog")).toBe("/pt/blog");
  expect(localizeUrl("en", "/pt/blog")).toBe("/blog");
  expect(localizeUrl("pt", "/en/blog")).toBe("/pt/blog");
});
