"""Zdejmuje różową poświatę z prawej krawędzi etykiet na zdjęciach produktów.

Na zdjęciach z sesji 30.07.2026 prawe ~15% papieru etykiety jest różowe
(a* ok. +3,6 w Lab, reszta etykiety ok. -1), najpewniej odbicie czegoś
różowego w studiu. Skrypt zabiera tylko nadmiar w stronę magenty, i tylko
z papieru: jasnych, mało nasyconych pikseli z dala od akwarelowych plam.
Jasność, spadek światła na walcu, plamy, szkło i druk zostają nietknięte.

Uruchomienie (z katalogu repo):

    pip install numpy opencv-python-headless pillow
    python zdjecia/odbarw-etykiety.py src/assets/products/krem-odzywczy.webp ...

Plik jest nadpisywany. Drugie przejście prawie nic nie zmienia (różu już
nie ma), ale do ponownej obróbki lepiej wyciąć zdjęcie od nowa z oryginału
w zdjecia/sesja-produktowa-2026-07-30/.
"""

import sys

import cv2
import numpy as np
from PIL import Image


def smooth(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def paper_mask(L, A, B, alpha):
    """0–1: jak bardzo piksel jest papierem etykiety."""
    chroma = np.hypot(A, B)
    w = smooth(L, 70, 82) * (1 - smooth(chroma, 9, 16)) * (alpha / 255)
    # z dala od plam: ich miękkie brzegi też są jasne i mało nasycone
    dots = (chroma > 18).astype(np.uint8)
    near = cv2.dilate(dots, np.ones((9, 9), np.uint8)).astype(np.float32)
    return w * (1 - cv2.GaussianBlur(near, (0, 0), 3))


def odbarw(img: Image.Image) -> Image.Image:
    rgba = np.asarray(img.convert("RGBA")).astype(np.float32)
    lab = cv2.cvtColor(rgba[..., :3] / 255, cv2.COLOR_RGB2LAB)
    L, A, B = lab[..., 0], lab[..., 1], lab[..., 2]
    w = paper_mask(L, A, B, rgba[..., 3])
    # własna neutralna biel etykiety: mediana jej papieru, w większości
    # nieoświetlonego na różowo
    a_ref = np.median(A[w > 0.8])
    pink = np.clip(A - a_ref, 0, None)  # tylko nadmiar w stronę magenty
    lab[..., 1] = A - w * pink
    rgb = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB).clip(0, 1) * 255
    out = np.concatenate([rgb.round(), rgba[..., 3:]], -1).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


if __name__ == "__main__":
    for path in sys.argv[1:]:
        odbarw(Image.open(path)).save(path, quality=90, method=6)
        print(path)
