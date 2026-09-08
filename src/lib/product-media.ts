import type { Product, ProductImage } from "@/types";

/** Studio shot first — that is the catalogue photo when several images exist. */
export function primaryProductImage(
  product: Pick<Product, "images">,
): ProductImage | undefined {
  return product.images.find((image) => image.kind === "studio") ?? product.images[0];
}
