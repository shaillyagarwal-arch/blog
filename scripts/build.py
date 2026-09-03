#!/usr/bin/env python3
"""
Builds a static HTML site from ELTROPY_BLOG_PLAYBOOK.md for GitHub Pages.

Usage:
    python scripts/build.py

Reads ELTROPY_BLOG_PLAYBOOK.md from the repo root and writes a styled,
self-contained index.html into ./site (the folder GitHub Pages deploys).
"""

import pathlib
import markdown

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_MD = REPO_ROOT / "ELTROPY_BLOG_PLAYBOOK.md"
OUTPUT_DIR = REPO_ROOT / "site"
OUTPUT_FILE = OUTPUT_DIR / "index.html"

PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content="Standing rules and structure for every Eltropy blog: voice, SEO/AEO/GEO practices, blog types, and listicle guidelines." />
<style>
  :root {{
    --ink: #1b1f24;
    --muted: #5b6472;
    --accent: #2f6feb;
    --border: #e3e6ea;
    --bg-code: #f6f8fa;
    --bg-page: #fbfbfc;
    --max-width: 860px;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    margin: 0;
    background: var(--bg-page);
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    line-height: 1.65;
  }}
  header.site-header {{
    border-bottom: 1px solid var(--border);
    background: #fff;
    padding: 2rem 1.5rem 1.5rem;
  }}
  header.site-header .inner {{
    max-width: var(--max-width);
    margin: 0 auto;
  }}
  header.site-header h1 {{
    margin: 0 0 0.35rem;
    font-size: 1.9rem;
  }}
  header.site-header p {{
    margin: 0;
    color: var(--muted);
  }}
  main {{
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
  }}
  main h2 {{
    margin-top: 2.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border);
    font-size: 1.4rem;
  }}
  main h1:first-child {{ display: none; }} /* title already in header */
  main table {{
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
    font-size: 0.92rem;
  }}
  main th, main td {{
    text-align: left;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--border);
    vertical-align: top;
  }}
  main th {{
    background: var(--bg-code);
  }}
  main code {{
    background: var(--bg-code);
    padding: 0.15em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }}
  main pre {{
    background: var(--bg-code);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }}
  main pre code {{
    background: none;
    padding: 0;
  }}
  main a {{
    color: var(--accent);
  }}
  main ul, main ol {{
    padding-left: 1.4rem;
  }}
  main li {{
    margin: 0.35rem 0;
  }}
  #toc {{
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 2rem;
  }}
  #toc p.toc-label {{
    margin: 0 0 0.5rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }}
  #toc ul {{
    margin: 0;
    padding-left: 1.2rem;
    columns: 2;
    column-gap: 2rem;
  }}
  footer {{
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1.5rem 3rem;
    color: var(--muted);
    font-size: 0.85rem;
  }}
</style>
</head>
<body>
  <header class="site-header">
    <div class="inner">
      <h1>Eltropy Blog Writing Playbook</h1>
      <p>Standing rules for voice, structure, and SEO/AEO/GEO practices on every Eltropy blog.</p>
    </div>
  </header>
  <main>
    {toc}
    {content}
  </main>
  <footer>
    Generated automatically from <code>ELTROPY_BLOG_PLAYBOOK.md</code>. Edit that file and push to update this page.
  </footer>
</body>
</html>
"""


def build() -> None:
    if not SOURCE_MD.exists():
        raise SystemExit(f"Source file not found: {SOURCE_MD}")

    md_text = SOURCE_MD.read_text(encoding="utf-8")

    md = markdown.Markdown(
        extensions=["extra", "toc", "sane_lists"],
        extension_configs={"toc": {"permalink": True}},
    )
    content_html = md.convert(md_text)
    toc_html = md.toc if md.toc_tokens else ""
    toc_block = f'<nav id="toc"><p class="toc-label">On this page</p>{toc_html}</nav>' if toc_html else ""

    page = PAGE_TEMPLATE.format(
        title="Eltropy Blog Writing Playbook",
        toc=toc_block,
        content=content_html,
    )

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(page, encoding="utf-8")
    print(f"Built {OUTPUT_FILE.relative_to(REPO_ROOT)} ({len(page):,} bytes)")


if __name__ == "__main__":
    build()
