import type { ImageMetadata } from "astro";
import kremRetinol from "../assets/products/krem-retinol.webp";
import kremB3 from "../assets/products/krem-b3.webp";
import glinka from "../assets/products/glinka.webp";
import hydrolat from "../assets/products/hydrolat.webp";
import hydrolatArbuz from "../assets/products/hydrolat-arbuz.webp";
import hydrolatNeroli from "../assets/products/hydrolat-neroli.webp";
import placeholder from "../assets/products/placeholder.webp";

export type Category = "kremy" | "hydrolaty" | "glinki" | "olejki";

export interface Ingredient {
  name: string;
  description: string;
}

export interface Variant {
  size: string;
  price: string;
}

export interface Product {
  slug: string;
  category: Category;
  /** linia produktu, np. "Odżywianie" — pełni rolę eyebrow */
  line: string;
  /** krótka nazwa do siatki i nawigacji */
  name: string;
  /** pełna nazwa / podtytuł */
  fullName: string;
  variants: Variant[];
  accent: string;
  image: ImageMetadata;
  alt: string;
  intro: string;
  forWhom: string;
  scent?: string;
  usage: string[];
  ingredients: Ingredient[];
  inci: string;
  research: string[];
  packaging: string;
  warnings: string;
}

export const categoryLabels: Record<Category, string> = {
  kremy: "kremy",
  hydrolaty: "hydrolaty",
  glinki: "glinki",
  olejki: "olejki",
};

export const products: Product[] = [
  {
    slug: "krem-odzywczy-roza-malina",
    category: "kremy",
    line: "Odżywianie",
    name: "krem odżywczy róża + malina",
    fullName: "Krem do twarzy z retinolem roślinnym 2%",
    variants: [
      { size: "30 ml", price: "90 zł" },
      { size: "60 ml", price: "150 zł" },
    ],
    accent: "#a80070",
    image: kremRetinol,
    alt: "Słoik kremu odżywczego z retinolem roślinnym z fuksjową plamą na etykiecie",
    intro:
      "Codzienna dawka emolientów, witamin i antyoksydantów. Odżywczy olej shea, nawilżający olej migdałowy, łagodzący hydrolat z róży damasceńskiej, regenerująca alantoina, ochronny olej z nasion malin, łagodny retinol roślinny, wzmacniający niacynamid oraz naturalne olejki eteryczne. Stworzony, by przywrócić skórze blask, elastyczność i komfort.",
    forWhom:
      "Idealny dla skóry suchej, wrażliwej, dojrzałej i potrzebującej regeneracji.",
    scent:
      "Złożony, kwiatowo-ziołowy aromat z nutami cytrusowymi. Całość jest subtelna, ale wyrazista, idealna dla osób ceniących naturalne, wielowymiarowe aromaty.",
    usage: [
      "Oczyść skórę twarzy i szyi.",
      "Nanieś niewielką ilość kremu na twarz i szyję, delikatnie wmasowując.",
      "Stosuj codziennie rano i wieczorem dla optymalnych efektów.",
    ],
    ingredients: [
      {
        name: "Nierafinowane masło shea",
        description:
          "Orzechowy zapach i kremowa konsystencja. Bogate w witaminę E, tokoferole i przeciwutleniacze, które chronią skórę przed wolnymi rodnikami.",
      },
      {
        name: "Olej migdałowy",
        description:
          "Łagodny emolient o delikatnym zapachu. Zawiera kwasy tłuszczowe oraz witaminy A i E. Działa łagodząco i kojąco, szczególnie dla skóry wrażliwej i atopowej.",
      },
      {
        name: "Hydrolat z płatków róży damasceńskiej",
        description:
          "Destylat o kwiatowym aromacie. Bogaty w polifenole, witaminę C i antyoksydanty. Pomaga utrzymać odpowiedni poziom nawilżenia skóry.",
      },
      {
        name: "Alantoina",
        description:
          "Wspomaga regenerację i redukuje podrażnienia. Idealna dla skóry wrażliwej i osłabionej.",
      },
      {
        name: "Nierafinowany olej z nasion malin",
        description:
          "Lekka konsystencja, kwasy linolowy i linolenowy oraz witamina E. Pomaga chronić skórę przed promieniowaniem UV, działa przeciwzapalnie, poprawia jędrność.",
      },
      {
        name: "Retinol roślinny (ekstrakt z lucerny)",
        description:
          "Naturalny odpowiednik retinolu, bogaty w galaktomannany. Nie powoduje podrażnień i jest bezpieczny do stosowania w ciągu dnia.",
      },
      {
        name: "Olejki eteryczne",
        description:
          "Geranium egipskie, werbena egzotyczna (May Chang), lawenda francuska i rozmaryn — nadają subtelny, naturalny zapach i aromaterapeutyczny charakter.",
      },
      {
        name: "Składniki pomocnicze",
        description:
          "Roślinny emulgator z oliwy z oliwek, Cetearyl Alcohol („dobry” alkohol, nie wysusza), Sucrose Stearate, Xanthan Gum, Sodium Benzoate — odpowiadają za konsystencję i trwałość kremu.",
      },
    ],
    inci: "Rosa Damascena Flower Water, Prunus Amygdalus Dulcis Oil, Butyrospermum Parkii Butter, Rubus Idaeus Seed Oil, Sucrose Stearate, Aqua, Cetearyl Olivate, Sorbitan Olivate, Cetearyl Alcohol, Alcohol Denat., Pelargonium Graveolens Flower Oil*, Xanthan Gum, Allantoin, Litsea Cubeba Fruit Oil*, Medicago Sativa Extract, Lavandula Angustifolia Flower Oil*, Rosmarinus Officinalis Leaf Oil*, Sodium Benzoate. *Citral, Geraniol, Linalool, Limonene, Citronellol, Benzyl Alcohol.",
    research: ["Czystość mikrobiologiczna — potwierdzona laboratoryjnie."],
    packaging:
      "Szklany słoik 30 i 60 ml z nakrętką plastikową. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
  {
    slug: "krem-nawilzajacy-roza-malina",
    category: "kremy",
    line: "Nawilżanie",
    name: "krem nawilżający róża + malina",
    fullName: "Nawilżający krem do twarzy z witaminą B3",
    variants: [
      { size: "30 ml", price: "90 zł" },
      { size: "60 ml", price: "150 zł" },
    ],
    accent: "#1b2a96",
    image: kremB3,
    alt: "Słoik kremu nawilżającego z kobaltową plamą na etykiecie",
    intro:
      "Codzienna dawka emolientów, witamin i antyoksydantów. Odżywczy olej shea, nawilżający olej migdałowy, łagodzący hydrolat z róży damasceńskiej, regenerująca alantoina, ochronny olej z nasion malin, wzmacniający niacynamid oraz naturalne olejki eteryczne. Stworzony, by przywrócić skórze komfort i nawilżenie.",
    forWhom: "Idealny dla skóry wrażliwej, atopowej lub suchej.",
    scent:
      "Złożony, kwiatowo-ziołowy aromat z nutami cytrusowymi. Całość jest subtelna, ale wyrazista, idealna dla osób ceniących naturalne, wielowymiarowe aromaty.",
    usage: [
      "Oczyść skórę twarzy i szyi.",
      "Nanieś niewielką ilość kremu na twarz i szyję, delikatnie wmasowując.",
      "Stosuj codziennie rano i wieczorem dla optymalnych efektów.",
    ],
    ingredients: [
      {
        name: "Hydrolat z płatków róży damasceńskiej",
        description:
          "Destylat o kwiatowym aromacie. Bogaty w polifenole, witaminę C i antyoksydanty. Pomaga utrzymać odpowiedni poziom nawilżenia skóry.",
      },
      {
        name: "Nierafinowane masło shea",
        description:
          "Bogate w witaminę E, tokoferole i przeciwutleniacze chroniące skórę przed wolnymi rodnikami.",
      },
      {
        name: "Olej migdałowy",
        description:
          "Łagodny emolient z witaminami A i E. Działa łagodząco i kojąco, szczególnie dla skóry wrażliwej i atopowej.",
      },
      {
        name: "Niacynamid (witamina B3)",
        description:
          "Pomaga zmniejszyć widoczność przebarwień i nierówności kolorytu, reguluje pracę gruczołów łojowych.",
      },
      {
        name: "Alantoina",
        description:
          "Wspomaga regenerację i redukuje podrażnienia. Idealna dla skóry wrażliwej i osłabionej.",
      },
      {
        name: "Nierafinowany olej z nasion malin",
        description:
          "Kwasy linolowy i linolenowy oraz witamina E. Działa przeciwzapalnie, wspiera ochronę przed UV, poprawia jędrność.",
      },
      {
        name: "Mocznik",
        description:
          "Silny humektant — wnika w skórę i wiąże wodę, delikatnie zmiękcza naskórek.",
      },
      {
        name: "Olejki eteryczne",
        description:
          "Geranium egipskie, werbena egzotyczna (May Chang), lawenda francuska i rozmaryn — subtelny, naturalny zapach.",
      },
      {
        name: "Składniki pomocnicze",
        description:
          "Roślinne emulgatory (z oliwy z oliwek, Glyceryl Stearate), Cetearyl Alcohol, Xanthan Gum — odpowiadają za konsystencję kremu.",
      },
    ],
    inci: "Rosa Damascena Flower Water, Prunus Amygdalus Dulcis Oil, Butyrospermum Parkii Butter, Niacinamide, Glyceryl Stearate, Rubus Idaeus Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Cetearyl Alcohol, Urea, Alcohol Denat., Pelargonium Graveolens Flower Oil*, Xanthan Gum, Allantoin, Litsea Cubeba Fruit Oil*, Lavandula Angustifolia Flower Oil*, Rosmarinus Officinalis Leaf Oil*. *Citral, Geraniol, Linalool, Limonene, Citronellol, Benzyl Alcohol.",
    research: [
      "Czystość mikrobiologiczna — potwierdzona laboratoryjnie.",
      "Badania dermatologiczne dla skóry wrażliwej — nie stwierdzono podrażnień ani reakcji alergicznych.",
    ],
    packaging:
      "Szklany słoik 30 i 60 ml z nakrętką plastikową. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
  {
    slug: "hydrolat-rozany",
    category: "hydrolaty",
    line: "Tonizacja",
    name: "hydrolat różany",
    fullName: "Hydrolat z płatków róży damasceńskiej",
    variants: [{ size: "100 ml", price: "40 zł" }],
    accent: "#b5235c",
    image: hydrolat,
    alt: "Szklana butelka hydrolatu różanego iramako",
    intro:
      "Naturalny hydrolat bez konserwantów — idealny element codziennej pielęgnacji jako tonik po oczyszczaniu lub mgiełka odświeżająca w ciągu dnia. Pomaga przywrócić skórze naturalne pH po demakijażu i przygotowuje ją do kolejnych etapów pielęgnacji.",
    forWhom:
      "Idealny dla wszystkich typów cery. Doskonale sprawdza się przy skórze wrażliwej, suchej i dojrzałej.",
    scent: "Kwiatowy, intensywnie różany.",
    usage: [
      "Tonizacja: spryskaj oczyszczoną twarz, pozostaw do wchłonięcia, nałóż serum lub krem.",
      "Kompres: nasącz hydrolatem bawełnianą chusteczkę, nałóż na twarz, pozostaw do wyschnięcia.",
      "Mgiełka: rozpyl na twarz dla natychmiastowego odświeżenia.",
      "Maseczka: wymieszaj hydrolat z glinką (zamiast wody), nałóż na wilgotną skórę.",
    ],
    ingredients: [
      {
        name: "100% hydrolat z płatków róży damasceńskiej",
        description:
          "Woda kwiatowa uzyskiwana w destylacji parą wodną, bez konserwantów. Odświeża i nawilża skórę, łagodzi uczucie suchości. Minimalistyczny skład inspirowany naturą.",
      },
    ],
    inci: "Rosa Damascena Flower Water*. *Rose Flower Oil/Extract (naturalne składniki zapachowe).",
    research: [
      "Czystość mikrobiologiczna — potwierdzona laboratoryjnie.",
      "Badania dermatologiczne dla skóry wrażliwej — nie stwierdzono podrażnień ani reakcji alergicznych.",
    ],
    packaging:
      "Szklana butelka 100 ml z atomizerem. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
  {
    slug: "hydrolat-neroli",
    category: "hydrolaty",
    line: "Tonizacja",
    name: "hydrolat neroli",
    fullName: "Hydrolat z kwiatów gorzkiej pomarańczy",
    variants: [{ size: "100 ml", price: "40 zł" }],
    accent: "#D97A66",
    image: hydrolatNeroli,
    alt: "Szklana butelka hydrolatu neroli iramako",
    intro:
      "Naturalny hydrolat — idealny element codziennej pielęgnacji jako tonik po oczyszczaniu lub mgiełka odświeżająca w ciągu dnia. Pomaga przywrócić skórze naturalne pH po oczyszczaniu i przygotowuje ją do kolejnych etapów pielęgnacji. Pozostawia skórę odświeżoną, miękką i pełną komfortu.",
    forWhom:
      "Odpowiedni do pielęgnacji każdego typu skóry, w szczególności suchej, wrażliwej, dojrzałej i pozbawionej blasku.",
    scent: "Kwiatowy, z cytrusowymi nutami.",
    usage: [
      "Tonizacja: spryskaj oczyszczoną twarz, pozostaw do wchłonięcia, nałóż serum lub krem.",
      "Kompres: nasącz hydrolatem bawełnianą chusteczkę, nałóż na twarz, pozostaw do wyschnięcia.",
      "Mgiełka: rozpyl na twarz dla natychmiastowego odświeżenia.",
      "Maseczka: wymieszaj hydrolat z glinką (zamiast wody), nałóż na wilgotną skórę.",
    ],
    ingredients: [
      {
        name: "100% hydrolat neroli",
        description:
          "Naturalna woda roślinna otrzymywana w destylacji kwiatów gorzkiej pomarańczy. Doskonały, naturalny zamiennik toniku — pomaga przywrócić skórze naturalne pH po oczyszczaniu. Pozostawia skórę odświeżoną, miękką i pełną komfortu.",
      },
    ],
    inci: "Citrus Aurantium Amara Flower Water, Benzyl Alcohol, Dehydroacetic Acid.",
    research: [
      "Czystość mikrobiologiczna — potwierdzona laboratoryjnie.",
      "Badania dermatologiczne dla skóry wrażliwej — nie stwierdzono podrażnień ani reakcji alergicznych.",
    ],
    packaging:
      "Szklana butelka 100 ml z atomizerem. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
  {
    slug: "hydrolat-arbuzowy",
    category: "hydrolaty",
    line: "Tonizacja",
    name: "hydrolat z arbuza",
    fullName: "Hydrolat z arbuza",
    variants: [{ size: "100 ml", price: "40 zł" }],
    accent: "#e45050",
    image: hydrolatArbuz,
    alt: "Szklana butelka hydrolatu z arbuza iramako",
    intro:
      "Naturalny hydrolat bez konserwantów — idealny element codziennej pielęgnacji jako tonik po oczyszczaniu lub mgiełka odświeżająca w ciągu dnia. Sprawdza się jako mgiełka, która nawilża i chłodzi skórę, zwłaszcza w gorące letnie dni. Pomaga przywrócić skórze naturalne pH po demakijażu i przygotowuje ją do kolejnych etapów pielęgnacji.",
    forWhom:
      "Odpowiedni do pielęgnacji każdego typu skóry, w szczególności odwodnionej, suchej, wrażliwej i zmęczonej.",
    scent: "Delikatny, świeży, lekko owocowy.",
    usage: [
      "Tonizacja: spryskaj oczyszczoną twarz, pozostaw do wchłonięcia, nałóż serum lub krem.",
      "Kompres: nasącz hydrolatem bawełnianą chusteczkę, nałóż na twarz, pozostaw do wyschnięcia.",
      "Mgiełka: rozpyl na twarz dla natychmiastowego odświeżenia.",
      "Maseczka: wymieszaj hydrolat z glinką (zamiast wody), nałóż na wilgotną skórę, pozostaw na 10 minut, spłucz.",
    ],
    ingredients: [
      {
        name: "100% hydrolat z arbuza",
        description:
          "Naturalna woda roślinna otrzymywana w destylacji miąższu owocu arbuza, bez alkoholu i konserwantów. Zawiera naturalnie cukry roślinne, aminokwasy, mikroelementy i antyoksydanty. Doskonały, naturalny zamiennik toniku — pomaga przywrócić skórze naturalne pH po demakijażu.",
      },
    ],
    inci: "Citrullus Lanatus Fruit Water.",
    research: [
      "Czystość mikrobiologiczna — potwierdzona laboratoryjnie.",
      "Badania dermatologiczne dla skóry wrażliwej — nie stwierdzono podrażnień ani reakcji alergicznych.",
    ],
    packaging:
      "Szklana butelka 100 ml z atomizerem. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
  {
    slug: "glinka-kaolinowa",
    category: "glinki",
    line: "Oczyszczanie",
    name: "kaolin biała glinka",
    fullName: "Mineralna glinka kaolinowa",
    variants: [{ size: "40 g", price: "40 zł" }],
    accent: "#5f6f8c",
    image: glinka,
    alt: "Słoik białej glinki kaolinowej z logo iramako",
    intro:
      "Minimalistyczna biała glinka kaolinowa — mineralna pielęgnacja każdego typu cery, również suchej i wrażliwej. Działa oczyszczająco, absorbując nadmiar sebum, pomaga zmniejszyć widoczność porów i pozostawia skórę świeżą oraz matową.",
    forWhom:
      "Idealna dla wszystkich typów cery. Doskonale sprawdza się przy skórze wrażliwej, suchej i dojrzałej, a także tłustej i mieszanej.",
    scent: "Produkt bezzapachowy.",
    usage: [
      "Mycie twarzy: niewielką ilość glinki wymieszaj na dłoni z odrobiną wody, masuj twarz przez około minutę, spłucz ciepłą wodą.",
      "Maseczka: dodaj wody lub hydrolatu (i opcjonalnie parę kropel oleju), nałóż na zwilżoną twarz, spłucz po 10 minutach, nie dopuszczając do wyschnięcia.",
      "Kąpiel: dodaj garść glinki do ciepłej wody, po kąpieli spłucz ciało.",
    ],
    ingredients: [
      {
        name: "Jedwabista biała glinka — kaolin",
        description:
          "100% mineralny składnik. Idealna do mycia twarzy, jako maseczka lub dodatek do kąpieli. Uważana za najdelikatniejszy peeling mechaniczny.",
      },
    ],
    inci: "Kaolin.",
    research: [],
    packaging: "Szklany słoik 40 g. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
  {
    // TODO: prawdziwe zdjęcie — patrz TODO.md
    slug: "olejek-do-twarzy-lawenda-werbena",
    category: "olejki",
    line: "Olejek",
    name: "olejek do twarzy lawenda + werbena",
    fullName: "Lekki olejek do twarzy",
    variants: [{ size: "30 ml", price: "50 zł" }],
    accent: "#7d639b",
    image: placeholder,
    alt: "Placeholder — zdjęcie lekkiego olejku do twarzy iramako wkrótce",
    intro:
      "Lekki roślinny olejek do codziennej pielęgnacji twarzy. Połączenie oleju migdałowego, jojoba i witaminy E pozostawia skórę miękką, gładką i pełną naturalnego blasku. Świeży aromat lawendy i werbeny sprawia, że pielęgnacja staje się przyjemnym rytuałem.",
    forWhom:
      "Dla skóry normalnej, wrażliwej, suchej, wymagającej odżywienia.",
    scent:
      "Ziołowo-cytrusowy aromat z nutami lawendy i werbeny. Naturalny i harmonijny.",
    usage: [
      "Oczyść skórę twarzy, szyi i dekoltu.",
      "Nanieś 2-3 krople olejku na lekko wilgotną skórę twarzy, szyi i dekoltu.",
      "Delikatnie wmasuj do wchłonięcia.",
      "Dla dodatkowego nawilżenia wymieszaj z kremem lub serum.",
    ],
    ingredients: [
      {
        name: "Olej migdałowy",
        description:
          "Łagodny olej o delikatnym zapachu. Zawiera kwasy tłuszczowe, witaminy A i E. Ma właściwości łagodzące i kojące, szczególnie polecany dla skóry wrażliwej i atopowej.",
      },
      {
        name: "Olej kokosowy frakcjonowany",
        description:
          "Lekki olej o jedwabistej konsystencji. Szybko się wchłania, pozostawiając skórę miękką, gładką i przyjemną w dotyku.",
      },
      {
        name: "Olej jojoba GOLD nierafinowany",
        description:
          "Złocisty olej roślinny ceniony za wyjątkowe podobieństwo do naturalnej warstwy ochronnej skóry. Pomaga zachować jej miękkość, elastyczność i naturalny komfort.",
      },
      {
        name: "Witamina E (tokoferol)",
        description:
          "Nazywana witaminą młodości. Naturalnie wspiera pielęgnację skóry i chroni cenne oleje roślinne zawarte w formule.",
      },
      {
        name: "Lawenda francuska",
        description:
          "Naturalny olejek eteryczny pozyskiwany z kwiatów lawendy. Wyróżnia się intensywnym aromatem z delikatnymi nutami kwiatowymi i ziołowymi.",
      },
      {
        name: "Werbena egzotyczna (May Chang)",
        description:
          "Naturalny olejek o świeżym, poprawiającym nastrój zapachu. Pozyskiwany w destylacji parowej z owoców.",
      },
      {
        name: "Rozmaryn",
        description:
          "Naturalny olejek o wyrazistym, ziołowym aromacie. Nadaje olejkowi świeży charakter.",
      },
    ],
    inci: "Prunus Amygdalus Dulcis Oil, Caprylic/Capric Triglyceride, Simmondsia Chinensis Seed Oil, Tocopherol, Helianthus Annuus Seed Oil, Lavandula Angustifolia Flower Oil*, Rosmarinus Officinalis Leaf Oil*, Litsea Cubeba Fruit Oil*. *Citral, Limonene, Pinene, Camphor, Linalool, Beta-Caryophyllene, Alpha-Terpinene, Terpineol, Geraniol.",
    research: [
      "Czystość mikrobiologiczna — potwierdzona laboratoryjnie.",
      "Badania dermatologiczne dla skóry wrażliwej — nie stwierdzono podrażnień ani reakcji alergicznych.",
    ],
    packaging:
      "Szklana butelka 30 ml z pipetą. Przechowywać w temperaturze pokojowej.",
    warnings:
      "Unikać kontaktu z oczami. W przypadku podrażnień zaprzestać używania.",
  },
];

export const productsByCategory = (
  ["kremy", "hydrolaty", "glinki", "olejki"] as Category[]
)
  .map((category) => ({
    category,
    label: categoryLabels[category],
    items: products.filter((p) => p.category === category),
  }))
  .filter((group) => group.items.length > 0);
