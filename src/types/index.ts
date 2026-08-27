export type Locale = "es" | "en";

/** A value that exists in every supported language. */
export type Localized<T> = Record<Locale, T>;

export type LocalizedText = Localized<string>;
export type LocalizedList = Localized<readonly string[]>;

export type SectorId = "mining" | "oil-gas" | "industry";

export type ProtectionId =
  | "chemical"
  | "electrical"
  | "flash-fire"
  | "high-visibility";

export type ProductCategoryId =
  | "coveralls"
  | "jackets"
  | "trousers"
  | "shirts"
  | "vests";

export interface Sector {
  readonly id: SectorId;
  /** Route key used to resolve the localized URL of the sector landing page. */
  readonly routeKey: "mining" | "oilGas" | "work";
  readonly name: LocalizedText;
  readonly tagline: LocalizedText;
  readonly heroTitle: LocalizedText;
  readonly heroDescription: LocalizedText;
  readonly intro: LocalizedText;
  readonly image: string;
  readonly imageAlt: LocalizedText;
  readonly needs: readonly {
    readonly title: LocalizedText;
    readonly description: LocalizedText;
  }[];
  readonly environments: LocalizedList;
  readonly relatedProtections: readonly ProtectionId[];
}

export interface Protection {
  readonly id: ProtectionId;
  readonly icon: ProtectionId;
  readonly name: LocalizedText;
  readonly shortDescription: LocalizedText;
  readonly description: LocalizedText;
  /**
   * Standards are intentionally empty: no norm may be published before the
   * client or the manufacturer supplies the supporting documentation.
   */
  readonly standards: readonly Certification[];
}

/** Pictogram used on the catalog-style certification badge. */
export type CertificationIcon =
  | "weld"
  | "flame"
  | "antistatic"
  | "arc"
  | "chemical"
  | "rain"
  | "cold"
  | "ul"
  | "badge";

export interface Certification {
  readonly id: string;
  readonly name: string;
  readonly description?: LocalizedText;
  readonly logo?: string;
  readonly icon?: CertificationIcon;
}

export interface ProductColor {
  readonly id: string;
  readonly name: LocalizedText;
  readonly hex: string;
}

export interface FabricLayer {
  readonly label: LocalizedText;
  readonly value: LocalizedText;
}

/**
 * Short catalog card: code, fabric name, composition and weight — the block
 * that sits under the garment in a technical workwear catalogue.
 */
export interface TechnicalInfo {
  readonly code: string;
  readonly fabric: string;
  readonly composition: LocalizedText;
  readonly weight: string;
  readonly layers?: readonly FabricLayer[];
}

export interface ProductDocument {
  readonly id: string;
  readonly label: LocalizedText;
  readonly type: "technical-sheet" | "certificate" | "care-guide" | "other";
  /** Empty while the file has not been provided. */
  readonly url: string;
}

export interface ProductVariant {
  readonly id: string;
  readonly sku: string;
  readonly size: string;
  readonly color?: LocalizedText;
  readonly price?: number;
  readonly stock?: number;
  readonly available: boolean;
}

export interface ProductImage {
  readonly src: string;
  readonly alt: LocalizedText;
  readonly kind: "studio" | "in-use" | "detail" | "material";
}

export interface ProductFeature {
  readonly label: LocalizedText;
  readonly value: LocalizedText;
}

export interface Product {
  readonly id: string;
  readonly slug: string;

  readonly name: LocalizedText;
  readonly shortDescription: LocalizedText;
  readonly description: LocalizedText;

  readonly category: ProductCategoryId;
  readonly sectors: readonly SectorId[];
  readonly protections: readonly ProtectionId[];

  readonly images: readonly ProductImage[];

  /** Fabric family name when the garment uses a named tissue, e.g. "FRARTEX". */
  readonly fabricFamily?: string;
  readonly technicalInfo?: TechnicalInfo;
  readonly colors?: readonly ProductColor[];

  /** Undefined until the client confirms commercial pricing. */
  readonly price?: number;
  readonly currency?: string;

  readonly sizes?: readonly string[];
  readonly variants?: readonly ProductVariant[];

  readonly certifications?: readonly Certification[];

  readonly benefits?: LocalizedList;
  readonly technicalFeatures?: readonly ProductFeature[];
  readonly materials?: LocalizedList;
  readonly recommendedUse?: LocalizedList;
  readonly care?: LocalizedList;

  readonly documents?: readonly ProductDocument[];

  readonly featured: boolean;
  readonly active: boolean;
  /**
   * True while the record is structural placeholder content. The UI uses it to
   * show an explicit "specifications pending" state instead of inventing data.
   */
  readonly preliminary: boolean;
}

/**
 * Denormalized copy of the data needed to render a cart line without loading
 * the whole catalogue into the client bundle. The server always re-resolves the
 * product by id before creating an order, so this snapshot is display-only.
 */
export interface CartLineSnapshot {
  readonly name: LocalizedText;
  readonly slug: string;
  readonly category: ProductCategoryId;
  readonly price?: number;
  readonly currency?: string;
  readonly image?: string;
}

export interface CartLine {
  /** Stable identity of a product + size combination. */
  readonly id: string;
  readonly productId: string;
  readonly size?: string;
  readonly quantity: number;
  readonly snapshot: CartLineSnapshot;
}

export type OrderStatus =
  | "pending_review"
  | "awaiting_payment"
  | "confirmed"
  | "cancelled";

export interface CustomerDetails {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly company?: string;
  readonly taxId?: string;
}

export interface DeliveryDetails {
  readonly method: "shipping" | "pickup" | "to-be-agreed";
  readonly province?: string;
  readonly city?: string;
  readonly address?: string;
  readonly postalCode?: string;
  readonly notes?: string;
}
