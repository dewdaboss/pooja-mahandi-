#!/usr/bin/env python3
"""
IMAGE OPTIMIZER — Pooja Bridal Mehndi
=====================================
Naye photos ko website ke liye ready karta hai.

KAISE USE KAREIN
----------------
1. Apni photos `assets/img/incoming/` folder mein daalein (jpg / jpeg / png).
2. Terminal mein chalaayein:

       python3 tools/optimize-images.py

   (ya: npm run optimize-images)

3. `assets/img/opt/` mein har photo ke 3 sizes ban jaayenge (.webp):
       naam-480.webp , naam-800.webp , naam-1200.webp
4. Ab `assets/js/site-config.js` ke `gallery` array mein naya entry jodein.

Zaroorat: pip install pillow
"""

import json
import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow install karein:  pip install pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "img", "incoming")
OUT = os.path.join(ROOT, "assets", "img", "opt")
WIDTHS = (480, 800, 1200)
EXT = (".jpg", ".jpeg", ".png", ".webp")


def main():
    if not os.path.isdir(SRC):
        os.makedirs(SRC)
        print(f"'{SRC}' banaya gaya. Apni photos wahan daalein aur script dobara chalaayein.")
        return

    os.makedirs(OUT, exist_ok=True)
    files = [f for f in sorted(os.listdir(SRC)) if f.lower().endswith(EXT)]
    if not files:
        print(f"'{SRC}' mein koi photo nahi mili.")
        return

    manifest = {}
    for f in files:
        name = os.path.splitext(f)[0].lower().replace(" ", "-").replace("_", "-")
        path = os.path.join(SRC, f)
        im = Image.open(path).convert("RGB")
        w, h = im.size
        variants = []

        for tw in WIDTHS:
            target = min(tw, w)
            copy = im.copy()
            copy.thumbnail((target, 10000), Image.LANCZOS)
            out_name = f"{name}-{copy.width}.webp"
            out_path = os.path.join(OUT, out_name)
            copy.save(out_path, "WEBP", quality=78, method=6)
            variants.append({"w": copy.width, "h": copy.height, "file": out_name})

        # same width dobara na aaye (chhoti original photos ke liye)
        unique = {v["w"]: v for v in variants}
        variants = [unique[k] for k in sorted(unique)]
        manifest[name] = {"w": w, "h": h, "variants": variants}
        print(f"✔ {f}  →  {[v['w'] for v in variants]}")

    with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=1, ensure_ascii=False)

    print("\nHo gaya! Ab site-config.js ke gallery array mein naya photo jodein.")


if __name__ == "__main__":
    main()
