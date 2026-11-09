// og:image dla kart produktów („plama”), renderowany przy buildzie przez
// @hasparus/definitely-not-vercel-og (@vercel/og 1.0.3 przebudowany na
// aktualnym satori). Satori czyta tylko PNG/JPEG/SVG i fonty OTF/TTF, więc
// zdjęcia (webp) przechodzą przez sharp, a fonty to te same OTF co na stronie.
import { ImageResponse } from "@hasparus/definitely-not-vercel-og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import type { Product } from "../data/products";
import placeholder from "../assets/products/placeholder.webp";
import szary from "../assets/splashes/szary.webp";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const INK = "#34312d";
const MUTED = "#463e37";
const CREAM = "#F8F5EE";

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

// the wordmark from favicon.svg
const logoSvg = once(async () =>
  (await fromRoot("public/favicon.svg")).toString(),
);
const LOGO_RATIO = 1561.785 / 1232.207;
const logo = async (color: string) =>
  dataUri(
    Buffer.from((await logoSvg()).replace('fill="#000"', `fill="${color}"`)),
    "image/svg+xml",
  );

type Shadow = { src: string; left: number; top: number; width: number; height: number };
type Photo = {
  src: string;
  width: number;
  height: number;
  shadows?: Shadow[];
};

const silhouette = async (photo: Buffer) => {
  const { data, info } = await sharp(photo)
    .ensureAlpha()
    .extractChannel(3)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
};

// a 1-channel alpha mask → a dark, transparent PNG
async function darkFrom(alpha: Buffer, width: number, height: number) {
  return sharp({
    create: { width, height, channels: 3, background: "#1e1812" },
  })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

// cast shadow, the same recipe as the product grid and the product page
// (src/pages/index.astro): the photo's silhouette, faded towards its top and
// its left side, flattened onto the floor, leaned up-right as if lit from the
// lower left, and blurred. Satori can't blur or mask, so it's baked here.
const CAST = {
  scaleX: 0.92,
  scaleY: 0.26,
  skew: Math.tan((30 * Math.PI) / 180),
  fadeTop: 0.62, // fully gone 62% of the way up the silhouette
  fadeLeft: [0.42, 0.54], // hidden left of 42%, full right of 54%
  blur: 14,
  lift: 8, // tucks the shadow's base under the product's base
};

async function castShadow(photo: Buffer, opacity: number): Promise<Shadow> {
  const { data, w, h } = await silhouette(photo);
  const [l0, l1] = CAST.fadeLeft;
  for (let y = 0; y < h; y++) {
    const up = Math.max(0, 1 - (h - y) / h / CAST.fadeTop);
    for (let x = 0; x < w; x++) {
      const right = Math.min(1, Math.max(0, (x / w - l0) / (l1 - l0)));
      data[y * w + x] = Math.round(data[y * w + x] * up * right * opacity);
    }
  }
  const sw = Math.round(w * CAST.scaleX);
  const sh = Math.max(1, Math.round(h * CAST.scaleY));
  const m = CAST.blur * 3; // room for the blur to spread
  const alpha = await sharp(data, { raw: { width: w, height: h, channels: 1 } })
    .resize(sw, sh, { fit: "fill" })
    // x' = x - skew·y: the top row stays put, lower rows slide left, so the
    // shadow leans up and to the right of its base
    .affine([1, -CAST.skew, 0, 1], { background: "#000" })
    .extend({ top: m, bottom: m, left: m, right: m, background: "#000" })
    .blur(CAST.blur)
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = alpha.info;
  // after the skew the base row starts at the left edge of the sheared box,
  // so it sits m px in from the image's left and m px up from its bottom
  return {
    src: dataUri(await darkFrom(alpha.data, width, height)),
    left: (w - sw) / 2 - m,
    top: h - CAST.lift - sh - m,
    width,
    height,
  };
}

// contact shadow: the product's footprint squashed to a sliver and blurred,
// so it reads as standing on the surface rather than floating over it
const CONTACT = { thickness: 6, widen: 1.04, blur: 7, lift: 3 };

async function contactShadow(photo: Buffer, opacity: number): Promise<Shadow> {
  const { data, w, h } = await silhouette(photo);
  for (let i = 0; i < data.length; i++) data[i] = Math.round(data[i] * opacity);
  const sw = Math.round(w * CONTACT.widen);
  const m = CONTACT.blur * 3;
  const alpha = await sharp(data, { raw: { width: w, height: h, channels: 1 } })
    .resize(sw, CONTACT.thickness, { fit: "fill" })
    .extend({ top: m, bottom: m, left: m, right: m, background: "#000" })
    .blur(CONTACT.blur)
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = alpha.info;
  return {
    src: dataUri(await darkFrom(alpha.data, width, height)),
    left: (w - sw) / 2 - m,
    top: h - CONTACT.lift - CONTACT.thickness / 2 - m,
    width,
    height,
  };
}

async function productPhoto(
  product: Product,
  height: number,
  shadow: number,
): Promise<Photo> {
  const { data, info } = await sharp(await readFile(fsPathOf(product.image)))
    .resize({ height })
    .png()
    .toBuffer({ resolveWithObject: true });
  return {
    src: dataUri(data),
    width: info.width,
    height: info.height,
    // the placeholder is a line drawing: nothing solid to cast a shadow
    ...(!isPlaceholder(product) &&
      shadow > 0 && {
        shadows: [
          await castShadow(data, shadow),
          await contactShadow(data, shadow * 0.7),
        ],
      }),
  };
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

export const isPlaceholder = (product: Product) =>
  product.image.src === placeholder.src;

const prices = (product: Product) =>
  product.variants.map((v) => `${v.price} · ${v.size}`);

// jars are wide, bottles tall: give bottles more height so both read the same
const photoHeight = (product: Product, jar: number, bottle: number) =>
  product.category === "kremy" ? jar : bottle;

function Photo({ photo }: { photo: Photo }) {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      {photo.shadows?.map((s) => (
        <img
          src={s.src}
          width={s.width}
          height={s.height}
          style={{ position: "absolute", left: s.left, top: s.top }}
        />
      ))}
      {/* positioned too, so it paints after (over) the shadows like in CSS */}
      <img
        src={photo.src}
        width={photo.width}
        height={photo.height}
        style={{ position: "relative" }}
      />
    </div>
  );
}

// the label's watercolour dot, grown huge behind the product, dyed its colour
async function plama(product: Product) {
  const photo = await productPhoto(
    product,
    photoHeight(product, 380, 490),
    0.6,
  );
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
        <Photo photo={photo} />
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
}

export async function renderOg(product: Product) {
  return new ImageResponse(await plama(product), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await fonts(),
  });
}
