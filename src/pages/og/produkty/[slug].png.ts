// og:image karty produktu, 1200×630, renderowany przy buildzie (src/lib/og.tsx).
// Produkt bez zdjęcia (placeholder) nie dostaje własnego — zostaje domyślny
// og:image strony.
import type { APIRoute, GetStaticPaths } from "astro";
import { products, type Product } from "../../../data/products";
import { isPlaceholder, renderOg } from "../../../lib/og";

export const getStaticPaths = (() =>
  products
    .filter((product) => !isPlaceholder(product))
    .map((product) => ({
      params: { slug: product.slug },
      props: { product },
    }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => renderOg(props.product as Product);
