
from PIL import Image

SRC = "public/assets/iramako-hero-3-sloiki-crop.png"
OUT = "src/assets/iramako-hero-3-sloiki-baked.png"

RENDERED_W = 690.21875
SCALE = 1.2
TX, TY = -22.0, 100.0
BG_TOLERANCE = 18


def content_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    rgba = im.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    bg = px[0, 0]

    def is_bg(p):
        if p[3] == 0:
            return True
        return all(abs(p[i] - bg[i]) <= BG_TOLERANCE for i in range(3))

    def row_bg(y):
        return all(is_bg(px[x, y]) for x in range(w))

    def col_bg(x):
        return all(is_bg(px[x, y]) for y in range(h))

    top = next(y for y in range(h) if not row_bg(y))
    bottom = next(y for y in range(h - 1, -1, -1) if not row_bg(y)) + 1
    left = next(x for x in range(w) if not col_bg(x))
    right = next(x for x in range(w - 1, -1, -1) if not col_bg(x)) + 1
    return left, top, right, bottom


def main():
    im = Image.open(SRC)
    w_src, h_src = im.size
    x0, y0, x1, y1 = content_bbox(im)
    pad = {"left": x0, "top": y0, "right": w_src - x1, "bottom": h_src - y1}
    print(f"source: {w_src}x{h_src}")
    print(f"content bbox: x {x0}..{x1}, y {y0}..{y1}")
    print(f"padding (source px): {pad}")

    r = RENDERED_W / w_src
    el_w, el_h = w_src * r, h_src * r
    cx, cy = el_w / 2, el_h / 2
    print(f"render scale r={r:.5f}, element {el_w:.1f}x{el_h:.1f}")

    repro = {k: v * r for k, v in pad.items()}
    print("padding for identical look (CSS px):", {k: round(v, 2) for k, v in repro.items()})

    dl = cx + SCALE * (x0 * r - cx) + TX
    dt = cy + SCALE * (y0 * r - cy) + TY
    dr = cx + SCALE * (x1 * r - cx) + TX
    db = cy + SCALE * (y1 * r - cy) + TY
    print(f"transformed content rect: l={dl:.1f} t={dt:.1f} r={dr:.1f} b={db:.1f} (element 0..{el_w:.1f} x 0..{el_h:.1f})")

    box = (x0, y0, x1, y1)
    im.crop(box).save(OUT)
    print(f"saved {OUT}: {x1 - x0}x{y1 - y0} (crop box {box}, no content cropped)")

    tw, th = dr - dl, db - dt
    css = {
        "width": tw / el_w * 100,
        "margin-left": dl / el_w * 100,
        "padding-top": dt / el_w * 100,
        "padding-bottom": (el_h - db) / el_w * 100,
    }
    print("sanity: bitmap aspect", f"{(x1 - x0) / (y1 - y0):.4f}",
          "vs rect aspect", f"{tw / th:.4f}")
    print(f"\nCSS: width: {css['width']:.3f}%; margin-left: {css['margin-left']:.3f}%; "
          f"padding: {css['padding-top']:.3f}% 0 {css['padding-bottom']:.3f}% 0")


if __name__ == "__main__":
    main()
