#!/usr/bin/env python3
"""TransCure Solanum tema asset'lerini canlı siteden indirir (CSS, JS, fontlar)."""

from __future__ import annotations

import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

BASE_URL = "https://www.transcurebioservices.com"
BUILD_HASH = "247c03e6eda107ca984c"
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
THEME = PUBLIC / "wp-content/themes/solanum/public/build/frontend"
STYLES = ROOT / "src/styles"

ASSETS = [
    (
        f"/wp-content/themes/solanum/public/build/frontend/css/app.{BUILD_HASH}.css",
        THEME / "css" / f"app.{BUILD_HASH}.css",
        STYLES / "original-app.css",
    ),
    (
        f"/wp-content/themes/solanum/public/build/frontend/js/app.{BUILD_HASH}.js",
        THEME / "js" / f"app.{BUILD_HASH}.js",
        None,
    ),
    (
        "/wp-content/themes/solanum/public/build/frontend/fonts/pp-neue-montreal/500.ttf",
        THEME / "fonts/pp-neue-montreal/500.ttf",
        PUBLIC / "fonts/pp-neue-montreal/500.ttf",
    ),
]

CHUNK_IDS = [
    26, 59, 92, 166, 213, 236, 301, 316, 358, 499, 502, 537, 565, 577, 721, 756, 769, 783, 795, 819, 877,
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def write_bytes(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    print(f"  ✓ {path.relative_to(ROOT)} ({len(data):,} B)")


def patch_css_paths(css: str) -> str:
    css = re.sub(
        r"url\(\.\./fonts/",
        "url(/wp-content/themes/solanum/public/build/frontend/fonts/",
        css,
    )
    return css


def main() -> int:
    print(f"TransCure asset senkronu — {BASE_URL}\n")

    for url_path, primary, mirror in ASSETS:
        url = f"{BASE_URL}{url_path}"
        try:
            data = fetch(url)
        except urllib.error.URLError as exc:
            print(f"  ✗ {url_path}: {exc}", file=sys.stderr)
            continue

        write_bytes(primary, data)
        if mirror:
            if mirror.suffix == ".css":
                write_bytes(mirror, patch_css_paths(data.decode("utf-8")).encode("utf-8"))
            else:
                write_bytes(mirror, data)

    print("\nJS chunk'ları…")
    for chunk_id in CHUNK_IDS:
        rel = f"/wp-content/themes/solanum/public/build/frontend/js/{chunk_id}.{BUILD_HASH}.js"
        dest = THEME / "js" / f"{chunk_id}.{BUILD_HASH}.js"
        try:
            write_bytes(dest, fetch(f"{BASE_URL}{rel}"))
        except urllib.error.URLError:
            pass

    print("\nTamamlandı.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
