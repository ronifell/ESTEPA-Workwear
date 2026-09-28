import type { Product, ProductImage } from "@/types";

/** Studio shot first — that is the catalogue photo when several images exist. */
export function primaryProductImage(
  product: Pick<Product, "images">,
): ProductImage | undefined {
  return product.images.find((image) => image.kind === "studio") ?? product.images[0];
}

/** Admin uploads land in public/uploads after the production build, so Next's optimizer 404s them. */
export function isUploadedMedia(src: string): boolean {
  return src.startsWith("/uploads/");
}
