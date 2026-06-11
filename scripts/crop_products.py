
from PIL import Image

ALPHA_MIN = 8
MARGIN = 4

JARS_SRC = ".assets/pics/kremy. 3 słoiki_2.png"
HYDROLAT_SRC = ".assets/pics/słoik_ciepłe światło.png"

STRIPS = {
    "krem-retinol": (0, 492),
    "glinka": (492, 1000),
    "krem-b3": (1000, 1536),
}


def alpha_bbox(im: Image.Image) -> tuple[int, int, int, int]:
    alpha = im.convert("RGBA").getchannel("A")
    mask = alpha.point(lambda a: 255 if a > ALPHA_MIN else 0)
    box = mask.getbbox()
    if box is None:
        raise ValueError("no content found")
    return box


def cut(im: Image.Image, name: str) -> None:
    x0, y0, x1, y1 = alpha_bbox(im)
    x0, y0 = max(0, x0 - MARGIN), max(0, y0 - MARGIN)
    x1, y1 = min(im.width, x1 + MARGIN), min(im.height, y1 + MARGIN)
    out = f"public/assets/products/{name}.png"
    im.crop((x0, y0, x1, y1)).save(out)
    print(f"{out}: {x1 - x0}x{y1 - y0} (bbox {x0},{y0}..{x1},{y1})")


def main():
    jars = Image.open(JARS_SRC)
    for name, (sx0, sx1) in STRIPS.items():
        cut(jars.crop((sx0, 0, sx1, jars.height)), name)
    cut(Image.open(HYDROLAT_SRC), "hydrolat")


if __name__ == "__main__":
    main()
