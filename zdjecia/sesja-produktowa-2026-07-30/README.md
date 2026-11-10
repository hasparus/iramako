# Sesja produktowa 30.07.2026

Oryginały z sesji (4500×6000 px, białe tło), przysłane przez SwissTransfer. Numery odpowiadają kolejności w paczce.

Na stronie są już wycięte (przezroczyste tło, `src/assets/products/`):

| plik | gdzie na stronie |
|---|---|
| 03-krem-odzywczy-30ml-front | `krem-odzywczy.webp` |
| 05-krem-odzywczy-60ml-front-2 | `krem-odzywczy-60ml.webp` (wariant 60 ml) |
| 06-krem-nawilzajacy-60ml-front | `krem-nawilzajacy-60ml.webp` (wariant 60 ml) |
| 08-krem-nawilzajacy-30ml-front | `krem-nawilzajacy.webp` |
| 10-hydrolat-neroli-front | `hydrolat-neroli.webp` |
| 11-olejek-rozmaryn-werbena | `olejek-rozmaryn.webp` |
| 11b-olejek-lawenda-werbena-montaz | `olejek-lawenda.webp` — **montaż**, nie osobne zdjęcie: ujęcie 11 z napisem „lawenda + werbena” złożonym z liter z tej samej etykiety, tekst przebarwiony na kolor z prawdziwej butelki |
| 13-hydrolat-arbuzowy-front | `hydrolat-arbuzowy.webp` |
| 15-hydrolat-rozany-front | `hydrolat-rozany.webp` |
| 17-glinka-front | `glinka.webp` |

Reszta (drugie ujęcie słoika 60 ml, boki etykiet z logo i nazwą linii) czeka na później, np. na galerię na karcie produktu.

Folder leży poza `src/` i `public/`, więc nie trafia do builda.

## Odbarwienie różowej poświaty

Na wszystkich zdjęciach prawa krawędź etykiety była różowa (odbicie w studiu). Wycięcia w `src/assets/products/` przeszły przez `zdjecia/odbarw-etykiety.py`, który zdejmuje sam róż z papieru etykiety; plamy, szkło i druk zostają. Przy nowym wycięciu z oryginału trzeba go przepuścić jeszcze raz.
