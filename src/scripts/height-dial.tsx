import { useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { DialRoot, useDialKit } from "dialkit";
// ?inline keeps the panel's stylesheet inside this on-demand chunk; a plain
// import would hoist a <link> into every visitor's home page
import dialStyles from "dialkit/styles.css?inline";

// Irena's dial for the full-width photo on the home page. It is deliberately not
// part of the site: index.astro imports this module only when the URL asks for
// it, so React and dialkit never reach an ordinary visitor.
const HEIGHT = "maks. wysokość (px)";

function PhotoHeight() {
  const dial = useDialKit(
    "zdjęcie na głównej",
    { [HEIGHT]: [560, 220, 1000] },
    { id: "photo-height", persist: true },
  );

  // the photo's height is clamp(220px, 60vw, var(--photo-max-h)), so writing the
  // variable moves only the ceiling. narrow screens keep their fluid sizing.
  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--photo-max-h",
      `${dial[HEIGHT]}px`,
    );
  }, [dial[HEIGHT]]);

  return null;
}

const style = document.createElement("style");
style.textContent = dialStyles;
document.head.append(style);

const host = document.createElement("div");
document.body.append(host);

createRoot(host).render(
  <>
    <PhotoHeight />
    {/* the site is a static build, so without this the panel would never show */}
    <DialRoot productionEnabled defaultOpen position="top-right" />
  </>,
);
