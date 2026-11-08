/**
 * Guards the SEO metadata budget set out in plans/01-visibility-and-analytics.md
 * Phase 1: a rendered <title> over ~60 characters gets truncated by Google,
 * and a <meta description> should be roughly 50-160 characters.
 *
 * This is a static text scan, not a module import: several page.tsx files
 * transitively import client components that depend on firebase, three.js
 * and framer-motion, which don't evaluate cleanly under ts-jest's node
 * environment. Scanning the literal `title`/`description` strings in each
 * file's `buildMetadata({...})` call (or the two files that build a plain
 * Metadata object by hand) catches the same regressions without importing
 * those modules. Dynamic article titles ARE checked precisely, by importing
 * the pure, side-effect-free `content/articles.ts` and `lib/seo.ts` modules
 * and computing their real rendered metadata.
 */
import fs from "fs";
import path from "path";
import { buildMetadata } from "@/lib/seo";
import { articles } from "@/content/articles";

const TITLE_TEMPLATE_SUFFIX = " | Credit Expert India".length; // lib/config.ts siteConfig.name
const MAX_RENDERED_TITLE = 60;
const MIN_DESCRIPTION = 50;
const MAX_DESCRIPTION = 160;

const APP_DIR = path.join(__dirname, "..", "app");

/** Every app/**\/page.tsx file that sets its own static `title`/`description`
 * literals via buildMetadata(...) or a hand-built Metadata object. The
 * dynamic `[slug]/page.tsx` is excluded here and checked separately below. */
function findStaticPageFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue; // dynamic route, handled separately
      if (entry.name === "api") continue; // no page metadata
      out.push(...findStaticPageFiles(full));
    } else if (entry.name === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

function extractFirst(source: string, re: RegExp): string | null {
  const m = re.exec(source);
  return m ? m[1] : null;
}

describe("page metadata stays within Google's display budget", () => {
  const pageFiles = findStaticPageFiles(APP_DIR);

  it("found the expected static page files", () => {
    // Sanity check the walker itself isn't silently returning nothing.
    expect(pageFiles.length).toBeGreaterThan(15);
  });

  test.each(pageFiles)("%s", (file) => {
    const source = fs.readFileSync(file, "utf-8");
    const title = extractFirst(source, /title:\s*"([^"]+)"/);
    const description = extractFirst(source, /description:\s*\n?\s*"([^"]+)"/);

    // Pages with no literal title/description (e.g. a page that relies only
    // on a parent layout's metadata) have nothing to check here.
    if (!title && !description) return;

    if (title) {
      const rendered = title.length + TITLE_TEMPLATE_SUFFIX;
      expect(rendered).toBeLessThanOrEqual(MAX_RENDERED_TITLE);
    }
    if (description) {
      expect(description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
      expect(description.length).toBeGreaterThanOrEqual(MIN_DESCRIPTION);
    }
  });
});

describe("root layout metadata stays within Google's display budget", () => {
  it("homepage title and description", () => {
    const source = fs.readFileSync(path.join(APP_DIR, "layout.tsx"), "utf-8");
    const title = extractFirst(source, /default:\s*`([^`]+)`/);
    const description = extractFirst(source, /description:\s*\n?\s*"([^"]+)"/);
    expect(title).not.toBeNull();
    expect(description).not.toBeNull();
    // The homepage title renders as-is: the layout's own template only
    // applies to child segments, not to the root's own `default`.
    expect(title!.length).toBeLessThanOrEqual(MAX_RENDERED_TITLE);
    expect(description!.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
    expect(description!.length).toBeGreaterThanOrEqual(MIN_DESCRIPTION);
  });
});

describe("article metadata stays within Google's display budget", () => {
  test.each(articles)("$slug", (article) => {
    const metadata = buildMetadata({
      title: article.seoTitle ?? article.title,
      description: article.summary,
      path: `/learning-center/${article.slug}`,
      type: "article",
    });
    const rendered = (metadata.title as string).length + TITLE_TEMPLATE_SUFFIX;
    expect(rendered).toBeLessThanOrEqual(MAX_RENDERED_TITLE);
    expect((metadata.description as string).length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });
});
