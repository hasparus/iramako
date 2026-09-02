import { createRoot } from "react-dom/client";
import { DialRoot } from "dialkit";
// ?inline keeps the panel's stylesheet inside this on-demand chunk; a plain
// import would hoist a <link> into every visitor's home page
import dialStyles from "dialkit/styles.css?inline";

// Dials for Irena, deliberately not part of the site: index.astro imports this
// module only when the URL says ?dial, so React and dialkit never reach an
// ordinary visitor. No dial is open right now; the wiring stays so the next one
// is a hook and a CSS variable away:
//
//   function PhotoHeight() {
//     const dial = useDialKit("zdjęcie na głównej", { "maks. wysokość (px)": [590, 220, 1000] });
//     useLayoutEffect(() => {
//       document.documentElement.style.setProperty("--photo-max-h", `${dial["maks. wysokość (px)"]}px`);
//     }, [dial]);
//     return null;
//   }
//
// with the value read back into the stylesheet as var(--photo-max-h, <default>).

const style = document.createElement("style");
style.textContent = dialStyles;
document.head.append(style);

const host = document.createElement("div");
document.body.append(host);

createRoot(host).render(
  // the site is a static build, so without productionEnabled the panel would
  // never show; ?dial is what keeps it away from visitors
  <DialRoot productionEnabled defaultOpen position="top-right" />,
);
