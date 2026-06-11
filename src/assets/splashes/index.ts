import arbuz from "./arbuz.webp";
import kobalt from "./kobalt.webp";
import kolko13 from "./kolko13.webp";
import szary from "./szary.webp";

export const splashes = [
  { name: "arbuz", image: arbuz, dark: false },
  { name: "kobalt", image: kobalt, dark: true },
  { name: "kolko13", image: kolko13, dark: true },
  { name: "szary", image: szary, dark: false },
] as const;

export type SplashName = (typeof splashes)[number]["name"];
