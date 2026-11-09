// og:image dla kart produktów, renderowany przy buildzie przez @vercel/og
// (satori + resvg). Satori czyta tylko PNG/JPEG/SVG i fonty OTF/TTF, więc
// zdjęcia (webp) przechodzą przez sharp, a fonty to te same OTF co na stronie.
import { ImageResponse } from "@vercel/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import type { Product, Category } from "../data/products";
import placeholder from "../assets/products/placeholder.webp";
import szary from "../assets/splashes/szary.webp";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const INK = "#34312d";
const MUTED = "#463e37";
const CREAM = "#F8F5EE";
const PAPER = "#fbfbfa";
const RULE = "rgba(40, 36, 29, 0.38)";

// the build runs from the project root; import.meta.url would point into the
// bundled chunk in dist/, not here
const fromRoot = (path: string) => readFile(join(process.cwd(), path));

// fsPath is the on-disk source; Astro stamps it onto local imports but leaves
// it out of the public type (same trick as components/Image.astro)
const fsPathOf = (image: ImageMetadata) => {
  const fsPath = (image as ImageMetadata & { fsPath?: string }).fsPath;
  if (!fsPath) throw new Error(`og: no fsPath on ${image.src}`);
  return fsPath;
};

const dataUri = (png: Buffer, type = "image/png") =>
  `data:${type};base64,${png.toString("base64")}`;

const once = <T,>(load: () => Promise<T>) => {
  let value: Promise<T> | undefined;
  return () => (value ??= load());
};

const fonts = once(async () => [
  {
    name: "Greycliff CF",
    data: await fromRoot("public/fonts/greycliff/Greycliff-CF-Medium.otf"),
    weight: 500 as const,
    style: "normal" as const,
  },
  {
    name: "Greycliff CF",
    data: await fromRoot("public/fonts/greycliff/Greycliff-CF-Bold.otf"),
    weight: 700 as const,
    style: "normal" as const,
  },
]);

// the wordmark from favicon.svg, recoloured per design
const logoSvg = once(async () =>
  (await fromRoot("public/favicon.svg")).toString(),
);
const LOGO_RATIO = 1561.785 / 1232.207;
const logo = async (color: string) =>
  dataUri(
    Buffer.from((await logoSvg()).replace('fill="#000"', `fill="${color}"`)),
    "image/svg+xml",
  );

async function productPhoto(product: Product, height: number) {
  const { data, info } = await sharp(await readFile(fsPathOf(product.image)))
    .resize({ height })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { src: dataUri(data), width: info.width, height: info.height };
}

// the grey watercolour splash, dyed the product's accent colour
async function splash(accent: string, size: number) {
  const png = await sharp(await readFile(fsPathOf(szary)))
    .resize(size, size)
    .tint(accent)
    .png()
    .toBuffer();
  return dataUri(png);
}

const isPlaceholder = (product: Product) =>
  product.image.src === placeholder.src;

const singular: Record<Category, string> = {
  kremy: "krem",
  hydrolaty: "hydrolat",
  glinki: "glinka",
  olejki: "olejek",
};

// "odżywianie - krem", like the vertical text on the side of the label
const labelSide = (product: Product) => {
  const line = product.line.toLowerCase();
  const kind = singular[product.category];
  return line === kind ? kind : `${line} - ${kind}`;
};

const prices = (product: Product) =>
  product.variants.map((v) => `${v.price} · ${v.size}`);

// jars are wide, bottles tall: give bottles more height so both read the same
const photoHeight = (product: Product, jar: number, bottle: number) =>
  product.category === "kremy" ? jar : bottle;

// soft elliptical floor shadow under the product
function FloorShadow({ width, dark = 0.22 }: { width: number; dark?: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -12,
        width: width * 1.2,
        height: 32,
        borderRadius: "50%",
        backgroundImage: `radial-gradient(closest-side, rgba(30,24,18,${dark}), rgba(30,24,18,0))`,
      }}
    />
  );
}

function Photo({
  photo,
  shadow = 0.22,
}: {
  photo: { src: string; width: number; height: number };
  shadow?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {shadow > 0 && <FloorShadow width={photo.width} dark={shadow} />}
      <img src={photo.src} width={photo.width} height={photo.height} />
    </div>
  );
}

type Design = (product: Product) => Promise<React.ReactElement>;

// 1 — katalog: like the product grid. Photo on cream, type on the right.
const katalog: Design = async (product) => {
  const photo = await productPhoto(product, photoHeight(product, 390, 500));
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: CREAM,
        fontFamily: "Greycliff CF",
        color: INK,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 520,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Photo photo={photo} shadow={isPlaceholder(product) ? 0 : 0.22} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "72px 80px 64px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            color: MUTED,
            paddingBottom: 18,
            borderBottom: `1.5px solid ${RULE}`,
          }}
        >
          {product.line}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 60,
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: -0.5,
          }}
        >
          {product.name}
        </div>
        <div
          style={{ display: "flex", marginTop: 18, fontSize: 28, color: MUTED }}
        >
          {product.fullName}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {prices(product).map((p) => (
              <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>
                {p}
              </div>
            ))}
          </div>
          <img src={await logo(INK)} width={96} height={96 / LOGO_RATIO} />
        </div>
      </div>
    </div>
  );
};

// 2 — plama: the label's watercolour dot, grown huge behind the product
const plama: Design = async (product) => {
  const photo = await productPhoto(product, photoHeight(product, 380, 490));
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: CREAM,
        fontFamily: "Greycliff CF",
        color: INK,
        position: "relative",
      }}
    >
      <img
        src={await splash(product.accent, 560)}
        width={560}
        height={560}
        style={{ position: "absolute", left: 50, top: 35, opacity: 0.85 }}
      />
      <div
        style={{
          display: "flex",
          width: 620,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <Photo photo={photo} shadow={isPlaceholder(product) ? 0 : 0.3} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          padding: "0 72px 0 0",
        }}
      >
        <img src={await logo(INK)} width={110} height={110 / LOGO_RATIO} />
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.05,
            color: product.accent,
          }}
        >
          {product.name}
        </div>
        <div
          style={{ display: "flex", marginTop: 16, fontSize: 26, color: MUTED }}
        >
          {product.fullName}
        </div>
        <div
          style={{ display: "flex", marginTop: 28, fontSize: 26, fontWeight: 700 }}
        >
          {prices(product).join("  /  ")}
        </div>
      </div>
    </div>
  );
};

// 3 — kolor: the whole card in the product's accent, cream type
const kolor: Design = async (product) => {
  const photo = await productPhoto(product, photoHeight(product, 400, 520));
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: product.accent,
        fontFamily: "Greycliff CF",
        color: CREAM,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "64px 0 60px 80px",
        }}
      >
        <img src={await logo(CREAM)} width={104} height={104 / LOGO_RATIO} />
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          {product.line}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -1,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            opacity: 0.85,
          }}
        >
          {product.fullName}
        </div>
        <div
          style={{ display: "flex", marginTop: 10, fontSize: 28, fontWeight: 700 }}
        >
          {prices(product).join("  /  ")}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 470,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 30,
        }}
      >
        <Photo photo={photo} shadow={isPlaceholder(product) ? 0 : 0.45} />
      </div>
    </div>
  );
};

const CARD_H = OG_HEIGHT - 72; // the paper card inside a 36px margin
const EDGE_X = 620; // where the label-edge text runs, within the card

// 4 — etykieta: built like the label itself. Big wordmark, the vertical
// "linia - rodzaj" in the accent colour, the product beside it.
const etykieta: Design = async (product) => {
  const photo = await productPhoto(product, photoHeight(product, 380, 500));
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: CREAM,
        fontFamily: "Greycliff CF",
        color: INK,
        padding: 36,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          background: PAPER,
          borderRadius: 18,
          boxShadow: "0 1px 3px rgba(40,36,29,0.12)",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 0 52px 64px",
          }}
        >
          <img src={await logo(INK)} width={250} height={250 / LOGO_RATIO} />
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 42,
              fontWeight: 500,
              lineHeight: 1.1,
              paddingRight: 40,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 24,
              color: MUTED,
            }}
          >
            {product.fullName}
          </div>
        </div>
        {/* vertical label edge text, reading bottom to top like on the jar.
            a horizontal strip as long as the card is tall, centred on the
            column and turned about its own middle */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: EDGE_X - CARD_H / 2,
            top: CARD_H / 2 - 22,
            width: CARD_H,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            fontSize: 30,
            fontWeight: 700,
            color: product.accent,
          }}
        >
          {labelSide(product)}
        </div>
        <div
          style={{
            display: "flex",
            width: 430,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 24,
          }}
        >
          <Photo photo={photo} shadow={isPlaceholder(product) ? 0 : 0.2} />
        </div>
      </div>
    </div>
  );
};

export const designs = { katalog, plama, kolor, etykieta } as const;
export type DesignName = keyof typeof designs;

export async function renderOg(product: Product, design: DesignName) {
  return new ImageResponse(await designs[design](product), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await fonts(),
  });
}
