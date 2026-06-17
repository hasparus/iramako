import arbuz from "./arbuz.webp";
import szary from "./szary.webp";

export const splashes = [
  { name: "arbuz", image: arbuz, dark: false },
  { name: "szary", image: szary, dark: false },
] as const;

export type SplashName = (typeof splashes)[number]["name"];
