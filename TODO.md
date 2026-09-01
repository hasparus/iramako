# TODO

## Zdjęcia produktów (placeholdery do podmiany)
- **Olejek do twarzy — lawenda + werbena** (`olejki`) — używa `src/assets/products/placeholder.webp`. Dane w `src/data/products.ts` przy `slug: olejek-do-twarzy-lawenda-werbena`.
- **Hydrolaty arbuz + neroli** (`hydrolaty`) — tymczasowo używają generycznego `hydrolat.webp`. Podmienić na właściwe foto, gdy będą. Dane przy `slug: hydrolat-arbuzowy` i `hydrolat-neroli`.

## Sekcja „Kosmetyki bez nadmiaru" na stronie głównej (mail #7)
- Czeka na zdjęcia w wersji z miękkim cieniem (Drive). Wrzucić pliki do `src/assets/` i przeprojektować sekcję: zostawić róża / malina / arbuz + odnośnik do `/produkty`, mniejsze zdjęcia, bez hovera.

## Warianty hydrolatów (mail #3)
- Arbuz i neroli — dodane (generyczne foto, patrz wyżej).

## Sekcja kontakt
- Dane firmy (nazwa, NIP, REGON) zdjęte z `/contact` — zostaje e-mail i Instagram. Telefon tylko w stopce. Czeka na zdjęcie od Ireny, żeby sekcja nie była tak minimalistyczna.

## Prawne
- Pełna nazwa firmy + NIP/REGON są na `/privacy` (sekcja „Administrator danych"). Gdy sklep zacznie sprzedawać (checkout), dodać Regulamin i wpisać je również tam.
- `/privacy` — potwierdzić, że host to Vercel i że dostawcą poczty jest [do uzupełnienia]; w razie zmiany zaktualizować sekcję „Komu powierzamy dane".

## Wysokość zdjęcia na głównej
- Pokrętło pod `iramako.pl/?dial` (dialkit). Irena ustawia wysokość, mówi liczbę, my wpisujemy ją na sztywno w `src/pages/index.astro` zamiast `560px` w `clamp(220px,60vw,var(--photo-max-h,560px))`. Wartość z pokrętła siedzi tylko w jej `localStorage`.
