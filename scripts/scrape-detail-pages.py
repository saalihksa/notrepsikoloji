#!/usr/bin/env python3
"""TransCure detay sayfalarını indirir ve manifest.json günceller."""

from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://www.transcurebioservices.com"
ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "src/data/pages"
UPLOADS_DIR = ROOT / "public/wp-content/uploads"
MANIFEST_PATH = PAGES_DIR / "manifest.json"

SKIP_PREFIXES = (
    "/disease-models/",
    "/mouse-models/",
    "/human-behind",
    "/ethics",
    "/technologies",
    "/scientific-publications/",
    "/contact/",
    "/legal",
    "/newsletter/",
    "/fr/",
)


def fetch(url: str, retries: int = 3) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=90) as response:
                return response.read().decode("utf-8", errors="replace")
        except (urllib.error.URLError, TimeoutError) as exc:
            last_error = exc
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"Failed to fetch {url}: {last_error}")


def normalize_path(path: str) -> str:
    if not path.startswith("/"):
        path = f"/{path}"
    return path if path.endswith("/") else f"{path}/"


def path_to_filename(path: str) -> str:
    slug = path.strip("/").replace("/", "__")
    return f"{slug}.html"


def extract_main(html: str) -> tuple[str, str, str]:
    body_match = re.search(r'<body[^>]*class="([^"]*)"', html)
    title_match = re.search(r"<title>([^<]+)", html)
    main_match = re.search(r'(<main id="contenu-principal"[\s\S]*?</main>)', html)
    if not main_match:
        raise ValueError("main content not found")
    return (
        main_match.group(1),
        body_match.group(1) if body_match else "",
        title_match.group(1).strip() if title_match else "",
    )


def localize_html(html: str) -> str:
    html = html.replace("https://www.transcurebioservices.com", "")
    html = html.replace("http://www.transcurebioservices.com", "")
    return html


def collect_asset_urls(html: str) -> set[str]:
    urls: set[str] = set()
    for match in re.finditer(r'(?:https://www\.transcurebioservices\.com)?(/wp-content/uploads/[^"\')\s,]+)', html):
        urls.add(match.group(1).split("?")[0])
    return urls


def download_asset(path: str) -> None:
    dest = ROOT / "public" / path.lstrip("/")
    if dest.exists():
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    url = f"{BASE}{path}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=90) as response:
        dest.write_bytes(response.read())


def discover_news_paths() -> set[str]:
    paths: set[str] = set()
    for page in range(1, 10):
        url = f"{BASE}/news-and-events/" if page == 1 else f"{BASE}/news-and-events/page/{page}/"
        html = fetch(url)
        for match in re.finditer(r'href="(https://www\.transcurebioservices\.com/[^"#]+/)"', html):
            path = normalize_path(match.group(1).replace(BASE, ""))
            if path.startswith("/news-and-events") or "/page/" in path or path == "/":
                continue
            if path.startswith("/wp-json"):
                continue
            if any(path.startswith(prefix) for prefix in SKIP_PREFIXES):
                continue
            paths.add(path)
    return paths


def discover_publication_paths() -> set[str]:
    paths: set[str] = set()
    for page in range(1, 3):
        url = (
            f"{BASE}/scientific-publications/"
            if page == 1
            else f"{BASE}/scientific-publications/page/{page}/"
        )
        html = fetch(url)
        for match in re.finditer(
            r'href="(https://www\.transcurebioservices\.com/scientific-publications/[^"#]+/)"',
            html,
        ):
            path = normalize_path(match.group(1).replace(BASE, ""))
            if path == "/scientific-publications/" or "/page/" in path:
                continue
            paths.add(path)
    return paths


def scrape_path(path: str, manifest: dict) -> None:
    url = f"{BASE}{path.rstrip('/')}/"
    html = fetch(url)
    main_html, body_class, title = extract_main(html)
    main_html = localize_html(main_html)

    assets = collect_asset_urls(main_html)
    for asset in sorted(assets):
        try:
            download_asset(asset)
        except Exception as exc:  # noqa: BLE001
            print(f"  asset skip {asset}: {exc}")

    filename = path_to_filename(path)
    (PAGES_DIR / filename).write_text(main_html, encoding="utf-8")

    manifest[path] = {
        "file": filename,
        "bodyClass": body_class,
        "title": title,
        "assets": len(assets),
    }
    print(f"  saved {path} -> {filename} ({len(assets)} assets)")


def main() -> None:
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

    manifest: dict = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    existing = set(manifest.keys())

    targets = sorted(discover_news_paths() | discover_publication_paths())
    missing = [path for path in targets if path not in existing]

    print(f"Existing pages: {len(existing)}")
    print(f"Discovered detail pages: {len(targets)}")
    print(f"To download: {len(missing)}")

    for index, path in enumerate(missing, start=1):
        print(f"[{index}/{len(missing)}] {path}")
        try:
            scrape_path(path, manifest)
        except Exception as exc:  # noqa: BLE001
            print(f"  ERROR: {exc}")
        time.sleep(0.25)

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Done. Total pages in manifest: {len(manifest)}")


if __name__ == "__main__":
    main()
