# TODO

## Zdjęcia produktów (placeholdery do podmiany)
- **Olejek do twarzy — lawenda + werbena** — zdjęcie to montaż: ujęcie 11 (rozmaryn) z podmienionym napisem na etykiecie i kolorem tekstu wziętym ze zdjęć prawdziwej butelki. Przy następnej sesji zrobić mu prawdziwe zdjęcie i podmienić `src/assets/products/olejek-lawenda.webp`.
- Pozostałe produkty mają już zdjęcia z sesji produktowej (30.07.2026), wycięte z białego tła. Wszystkie 17 oryginałów leży w `zdjecia/sesja-produktowa-2026-07-30/` — kremy 60 ml mają już własne zdjęcia (przełącznik pojemności w siatce podmienia fotkę); niewykorzystane ujęcia (boki etykiet z logo / nazwą linii) przydadzą się, gdyby karta produktu miała dostać galerię.

## Sekcja „Kosmetyki bez nadmiaru" na stronie głównej (mail #7)
- Czeka na zdjęcia w wersji z miękkim cieniem (Drive). Wrzucić pliki do `src/assets/` i przeprojektować sekcję: zostawić róża / malina / arbuz + odnośnik do `/produkty`, mniejsze zdjęcia, bez hovera.

## Warianty hydrolatów (mail #3)
- Arbuz i neroli — dodane, z własnymi zdjęciami.

## Sekcja kontakt
- Dane firmy (nazwa, NIP, REGON) zdjęte z `/contact` — zostaje e-mail i Instagram. Telefon tylko w stopce. Czeka na zdjęcie od Ireny, żeby sekcja nie była tak minimalistyczna.

## Prawne
- Pełna nazwa firmy + NIP/REGON są na `/privacy` (sekcja „Administrator danych"). Gdy sklep zacznie sprzedawać (checkout), dodać Regulamin i wpisać je również tam.
- `/privacy` — potwierdzić, że host to Vercel i że dostawcą poczty jest [do uzupełnienia]; w razie zmiany zaktualizować sekcję „Komu powierzamy dane".

## Pokrętła dla Ireny (dialkit)
- `iramako.pl/?dial` wciąga `src/scripts/dials.tsx` z panelem dialkitu. Teraz nie ma w nim żadnego pokrętła; wysokość zdjęcia na głównej jest już ustalona (590 px). Jak trzeba będzie coś kolejnego dostroić na żywo, wzór jest w komentarzu w tym pliku.
