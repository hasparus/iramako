# TODO

## Zdjęcia produktów (placeholdery do podmiany)
- **Olejek do twarzy — werbena + rozmaryn** (`olejki`) — używa `src/assets/products/placeholder.webp`. Brakuje też **ceny**, **rozmiaru** i **opakowania** (zgadnięte: 30 ml / „wkrótce” / butelka z pipetą). Dane w `src/data/products.ts` przy `slug: olejek-do-twarzy-werbena-rozmaryn`.
- **Hydrolaty arbuz + neroli** (`hydrolaty`) — tymczasowo używają generycznego `hydrolat.webp`. Podmienić na właściwe foto, gdy będą. Dane przy `slug: hydrolat-arbuzowy` i `hydrolat-neroli`.

## Sekcja „Kosmetyki bez nadmiaru" na stronie głównej (mail #7)
- Czeka na zdjęcia w wersji z miękkim cieniem (Drive). Wrzucić pliki do `src/assets/` i przeprojektować sekcję: zostawić róża / malina / komfort + odnośnik do `/produkty`, mniejsze zdjęcia, bez hovera.

## Warianty hydrolatów (mail #3)
- Arbuz i neroli — dodane (generyczne foto, patrz wyżej).

## Prawne
- Pełna nazwa firmy + NIP/REGON są na `/contact`. Gdy sklep zacznie sprzedawać (checkout), dodać Regulamin.
- `/privacy` — potwierdzić, że host to Vercel i że dostawcą poczty jest [do uzupełnienia]; w razie zmiany zaktualizować sekcję „Komu powierzamy dane".
