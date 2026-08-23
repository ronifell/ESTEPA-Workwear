"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AdminCard,
  CheckboxGroup,
  LocalizedLinesField,
  LocalizedTextField,
  MediaField,
  RepeatableList,
  RepeatableRow,
  SelectRow,
  ToggleField,
  type Errors,
  type LocalizedDraft,
  type OptionItem,
} from "@/components/admin/fields";
import { Button } from "@/components/ui/button";
import { Field, TextInput } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { adminCopy, translateFieldError } from "@/lib/admin/copy";
import { certificationIconIds } from "@/lib/certifications";
import { slugify } from "@/lib/utils";

const CERTIFICATION_ICON_OPTIONS = certificationIconIds.map((id) => ({
  value: id,
  label: adminCopy.form.certifications.icons[id],
}));
import type {
  CertificationIcon,
  Localized,
  LocalizedText,
  Product,
  ProductCategoryId,
  ProductDocument,
  ProductImage,
  ProtectionId,
  SectorId,
} from "@/types";

export interface AdminOptions {
  readonly categories: readonly OptionItem[];
  readonly sectors: readonly OptionItem[];
  readonly protections: readonly OptionItem[];
  readonly imageKinds: readonly OptionItem[];
  readonly documentTypes: readonly OptionItem[];
}

interface ImageDraft {
  src: string;
  alt: LocalizedDraft;
  kind: ProductImage["kind"];
}

interface FeatureDraft {
  label: LocalizedDraft;
  value: LocalizedDraft;
}

interface CertificationDraft {
  id: string;
  name: string;
  description: LocalizedDraft;
  logo: string;
  icon: CertificationIcon;
}

interface ColorDraft {
  id: string;
  name: LocalizedDraft;
  hex: string;
}

interface DocumentDraft {
  id: string;
  label: LocalizedDraft;
  type: ProductDocument["type"];
  url: string;
}

interface VariantDraft {
  id: string;
  sku: string;
  size: string;
  color: LocalizedDraft;
  price: string;
  stock: string;
  available: boolean;
}

interface Draft {
  id: string;
  slug: string;
  name: LocalizedDraft;
  shortDescription: LocalizedDraft;
  description: LocalizedDraft;
  category: ProductCategoryId;
  sectors: SectorId[];
  protections: ProtectionId[];
  images: ImageDraft[];
  price: string;
  currency: string;
  sizes: string;
  fabricFamily: string;
  techCode: string;
  techFabric: string;
  techComposition: LocalizedDraft;
  techWeight: string;
  colors: ColorDraft[];
  variants: VariantDraft[];
  certifications: CertificationDraft[];
  benefits: LocalizedDraft;
  technicalFeatures: FeatureDraft[];
  materials: LocalizedDraft;
  recommendedUse: LocalizedDraft;
  care: LocalizedDraft;
  documents: DocumentDraft[];
  featured: boolean;
  active: boolean;
  preliminary: boolean;
}

const EMPTY: LocalizedDraft = { es: "", en: "" };

function fromText(value: LocalizedText | undefined): LocalizedDraft {
  return { es: value?.es ?? "", en: value?.en ?? "" };
}

function fromList(value: Localized<readonly string[]> | undefined): LocalizedDraft {
  return { es: (value?.es ?? []).join("\n"), en: (value?.en ?? []).join("\n") };
}

function toDraft(product: Product | null, defaultCurrency: string): Draft {
  if (!product) {
    return {
      id: "",
      slug: "",
      name: { ...EMPTY },
      shortDescription: { ...EMPTY },
      description: { ...EMPTY },
      category: "coveralls",
      sectors: [],
      protections: [],
      images: [],
      price: "",
      currency: defaultCurrency,
      sizes: "",
      fabricFamily: "",
      techCode: "",
      techFabric: "",
      techComposition: { ...EMPTY },
      techWeight: "",
      colors: [],
      variants: [],
      certifications: [],
      benefits: { ...EMPTY },
      technicalFeatures: [],
      materials: { ...EMPTY },
      recommendedUse: { ...EMPTY },
      care: { ...EMPTY },
      documents: [],
      featured: false,
      active: true,
      preliminary: true,
    };
  }

  return {
    id: product.id,
    slug: product.slug,
    name: fromText(product.name),
    shortDescription: fromText(product.shortDescription),
    description: fromText(product.description),
    category: product.category,
    sectors: [...product.sectors],
    protections: [...product.protections],
    images: product.images.map((image) => ({
      src: image.src,
      alt: fromText(image.alt),
      kind: image.kind,
    })),
    price: product.price === undefined ? "" : String(product.price),
    currency: product.currency ?? defaultCurrency,
    sizes: (product.sizes ?? []).join(", "),
    fabricFamily: product.fabricFamily ?? "",
    techCode: product.technicalInfo?.code ?? "",
    techFabric: product.technicalInfo?.fabric ?? "",
    techComposition: fromText(product.technicalInfo?.composition),
    techWeight: product.technicalInfo?.weight ?? "",
    colors: (product.colors ?? []).map((color) => ({
      id: color.id,
      name: fromText(color.name),
      hex: color.hex,
    })),
    variants: (product.variants ?? []).map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      size: variant.size,
      color: fromText(variant.color),
      price: variant.price === undefined ? "" : String(variant.price),
      stock: variant.stock === undefined ? "" : String(variant.stock),
      available: variant.available,
    })),
    certifications: (product.certifications ?? []).map((certification) => ({
      id: certification.id,
      name: certification.name,
      description: fromText(certification.description),
      logo: certification.logo ?? "",
      icon: certification.icon ?? "badge",
    })),
    benefits: fromList(product.benefits),
    technicalFeatures: (product.technicalFeatures ?? []).map((feature) => ({
      label: fromText(feature.label),
      value: fromText(feature.value),
    })),
    materials: fromList(product.materials),
    recommendedUse: fromList(product.recommendedUse),
    care: fromList(product.care),
    documents: (product.documents ?? []).map((document) => ({
      id: document.id,
      label: fromText(document.label),
      type: document.type,
      url: document.url,
    })),
    featured: product.featured,
    active: product.active,
    preliminary: product.preliminary,
  };
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

function toList(draft: LocalizedDraft): Localized<string[]> {
  return { es: splitLines(draft.es), en: splitLines(draft.en) };
}

function toAmount(value: string): number | null {
  const parsed = Number(value.trim().replace(",", "."));
  return value.trim().length > 0 && Number.isFinite(parsed) ? parsed : null;
}

function toInteger(value: string): number | null {
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function toPayload(draft: Draft): unknown {
  return {
    id: draft.id,
    slug: draft.slug,
    name: draft.name,
    shortDescription: draft.shortDescription,
    description: draft.description,
    category: draft.category,
    sectors: draft.sectors,
    protections: draft.protections,
    images: draft.images,
    price: toAmount(draft.price),
    currency: draft.currency.trim() ? draft.currency.trim() : undefined,
    sizes: draft.sizes
      .split(/[,\n]/)
      .map((size) => size.trim())
      .filter((size) => size.length > 0),
    fabricFamily: draft.fabricFamily.trim(),
    technicalInfo: {
      code: draft.techCode.trim(),
      fabric: draft.techFabric.trim(),
      composition: draft.techComposition,
      weight: draft.techWeight.trim(),
    },
    colors: draft.colors,
    variants: draft.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      size: variant.size,
      color: variant.color,
      price: toAmount(variant.price),
      stock: toInteger(variant.stock),
      available: variant.available,
    })),
    certifications: draft.certifications,
    benefits: toList(draft.benefits),
    technicalFeatures: draft.technicalFeatures,
    materials: toList(draft.materials),
    recommendedUse: toList(draft.recommendedUse),
    care: toList(draft.care),
    documents: draft.documents,
    featured: draft.featured,
    active: draft.active,
    preliminary: draft.preliminary,
  };
}

function updateAt<T>(list: readonly T[], index: number, value: T): T[] {
  return list.map((entry, position) => (position === index ? value : entry));
}

function removeAt<T>(list: readonly T[], index: number): T[] {
  return list.filter((_, position) => position !== index);
}

export interface ProductFormProps {
  readonly mode: "create" | "edit";
  readonly options: AdminOptions;
  readonly product?: Product | null;
  readonly defaultCurrency: string;
}

export function ProductForm({
  mode,
  options,
  product = null,
  defaultCurrency,
}: ProductFormProps) {
  const router = useRouter();
  const copy = adminCopy.form;

  const [draft, setDraft] = useState<Draft>(() => toDraft(product, defaultCurrency));
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(mode === "create");

  function patch(changes: Partial<Draft>): void {
    setDraft((previous) => ({ ...previous, ...changes }));
    setIsSaved(false);
  }

  /** While creating, the identifier and the slug follow the Spanish name. */
  function onNameChange(next: LocalizedDraft): void {
    if (!autoSlug) {
      patch({ name: next });
      return;
    }
    const derived = slugify(next.es).slice(0, 64);
    patch({ name: next, slug: derived, id: derived });
  }

  async function submit(): Promise<void> {
    setIsSaving(true);
    setErrors({});
    setFormError(null);
    setIsSaved(false);

    const endpoint =
      mode === "create" ? "/api/admin/products" : `/api/admin/products/${product?.id ?? ""}`;

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(draft)),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; error?: string; fields?: Record<string, string> }
        | null;

      if (response.ok && data?.ok) {
        if (mode === "create") {
          router.push("/admin");
          return;
        }
        setIsSaved(true);
        router.refresh();
        return;
      }

      if (data?.fields) setErrors(data.fields);
      setFormError(formErrorMessage(data?.error, data?.fields));
    } catch {
      setFormError(copy.errors.unexpected);
    } finally {
      setIsSaving(false);
    }
  }

  const sectorError = translateFieldError(errors["sectors"]);

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <AdminCard
        title={copy.sections.identity.title}
        description={copy.sections.identity.description}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="product-id"
            label={copy.fields.id}
            hint={copy.fields.idHint}
            required
            error={translateFieldError(errors["id"])}
          >
            <TextInput
              id="product-id"
              value={draft.id}
              invalid={Boolean(errors["id"])}
              disabled={mode === "edit"}
              onChange={(event) => {
                setAutoSlug(false);
                patch({ id: event.target.value });
              }}
            />
          </Field>

          <Field
            id="product-slug"
            label={copy.fields.slug}
            hint={copy.fields.slugHint}
            required
            error={translateFieldError(errors["slug"])}
          >
            <TextInput
              id="product-slug"
              value={draft.slug}
              invalid={Boolean(errors["slug"])}
              onChange={(event) => {
                setAutoSlug(false);
                patch({ slug: event.target.value });
              }}
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard
        title={copy.sections.content.title}
        description={copy.sections.content.description}
      >
        <LocalizedTextField
          id="product-name"
          label={copy.fields.name}
          value={draft.name}
          onChange={onNameChange}
          errors={errors}
          errorKey="name"
          required
        />

        <LocalizedTextField
          id="product-short"
          label={copy.fields.shortDescription}
          value={draft.shortDescription}
          onChange={(value) => patch({ shortDescription: value })}
          errors={errors}
          errorKey="shortDescription"
          hint={copy.fields.shortDescriptionHint}
          required
          multiline
          rows={3}
        />

        <LocalizedTextField
          id="product-description"
          label={copy.fields.description}
          value={draft.description}
          onChange={(value) => patch({ description: value })}
          errors={errors}
          errorKey="description"
          required
          multiline
          rows={7}
        />
      </AdminCard>

      <AdminCard
        title={copy.sections.classification.title}
        description={copy.sections.classification.description}
      >
        <SelectRow
          id="product-category"
          label={copy.fields.category}
          value={draft.category}
          options={options.categories}
          onChange={(value) => patch({ category: value as ProductCategoryId })}
        />

        <CheckboxGroup<SectorId>
          legend={copy.fields.sectors}
          options={options.sectors as readonly { value: SectorId; label: string }[]}
          values={draft.sectors}
          onChange={(sectors) => patch({ sectors })}
          hint={copy.fields.sectorsHint}
          error={sectorError}
        />

        <CheckboxGroup<ProtectionId>
          legend={copy.fields.protections}
          options={options.protections as readonly { value: ProtectionId; label: string }[]}
          values={draft.protections}
          onChange={(protections) => patch({ protections })}
        />
      </AdminCard>

      <AdminCard
        title={copy.sections.commercial.title}
        description={copy.sections.commercial.description}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            id="product-price"
            label={copy.fields.price}
            hint={copy.fields.priceHint}
            error={translateFieldError(errors["price"])}
          >
            <TextInput
              id="product-price"
              inputMode="decimal"
              value={draft.price}
              invalid={Boolean(errors["price"])}
              onChange={(event) => patch({ price: event.target.value })}
            />
          </Field>

          <Field
            id="product-currency"
            label={copy.fields.currency}
            error={translateFieldError(errors["currency"])}
          >
            <TextInput
              id="product-currency"
              maxLength={3}
              value={draft.currency}
              invalid={Boolean(errors["currency"])}
              onChange={(event) => patch({ currency: event.target.value.toUpperCase() })}
            />
          </Field>

          <Field id="product-sizes" label={copy.fields.sizes} hint={copy.fields.sizesHint}>
            <TextInput
              id="product-sizes"
              value={draft.sizes}
              onChange={(event) => patch({ sizes: event.target.value })}
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard
        title={copy.sections.images.title}
        description={copy.sections.images.description}
      >
        <RepeatableList
          addLabel={copy.images.add}
          emptyLabel={copy.images.empty}
          count={draft.images.length}
          onAdd={() =>
            patch({
              images: [...draft.images, { src: "", alt: { ...EMPTY }, kind: "studio" }],
            })
          }
        >
          {draft.images.map((image, index) => (
            <RepeatableRow
              key={index}
              index={index}
              onRemove={() => patch({ images: removeAt(draft.images, index) })}
            >
              <MediaField
                id={`image-src-${index}`}
                label={copy.images.src}
                value={image.src}
                kind="image"
                required
                error={translateFieldError(errors[`images.${index}.src`])}
                onChange={(src) =>
                  patch({ images: updateAt(draft.images, index, { ...image, src }) })
                }
              />

              <LocalizedTextField
                id={`image-alt-${index}`}
                label={copy.images.alt}
                value={image.alt}
                hint={copy.images.altHint}
                required
                errors={errors}
                errorKey={`images.${index}.alt`}
                onChange={(alt) =>
                  patch({ images: updateAt(draft.images, index, { ...image, alt }) })
                }
              />

              <SelectRow
                id={`image-kind-${index}`}
                label={copy.images.kind}
                value={image.kind}
                options={options.imageKinds}
                onChange={(kind) =>
                  patch({
                    images: updateAt(draft.images, index, {
                      ...image,
                      kind: kind as ProductImage["kind"],
                    }),
                  })
                }
              />
            </RepeatableRow>
          ))}
        </RepeatableList>
      </AdminCard>

      <AdminCard
        title={copy.sections.technicalSheet.title}
        description={copy.sections.technicalSheet.description}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="product-fabric-family"
            label={copy.fields.fabricFamily}
            hint={copy.fields.fabricFamilyHint}
          >
            <TextInput
              id="product-fabric-family"
              value={draft.fabricFamily}
              onChange={(event) => patch({ fabricFamily: event.target.value })}
            />
          </Field>
          <Field id="product-tech-code" label={copy.fields.techCode} hint={copy.fields.techCodeHint}>
            <TextInput
              id="product-tech-code"
              value={draft.techCode}
              onChange={(event) => patch({ techCode: event.target.value })}
            />
          </Field>
          <Field
            id="product-tech-fabric"
            label={copy.fields.techFabric}
            hint={copy.fields.techFabricHint}
          >
            <TextInput
              id="product-tech-fabric"
              value={draft.techFabric}
              onChange={(event) => patch({ techFabric: event.target.value })}
            />
          </Field>
          <Field
            id="product-tech-weight"
            label={copy.fields.techWeight}
            hint={copy.fields.techWeightHint}
          >
            <TextInput
              id="product-tech-weight"
              value={draft.techWeight}
              onChange={(event) => patch({ techWeight: event.target.value })}
            />
          </Field>
        </div>

        <LocalizedTextField
          id="product-tech-composition"
          label={copy.fields.techComposition}
          value={draft.techComposition}
          onChange={(techComposition) => patch({ techComposition })}
          errors={errors}
          errorKey="technicalInfo.composition"
        />

        <RepeatableList
          addLabel={copy.colors.add}
          emptyLabel={copy.colors.empty}
          count={draft.colors.length}
          onAdd={() =>
            patch({
              colors: [...draft.colors, { id: "", name: { ...EMPTY }, hex: "#1B2A4A" }],
            })
          }
        >
          {draft.colors.map((color, index) => (
            <RepeatableRow
              key={index}
              index={index}
              onRemove={() => patch({ colors: removeAt(draft.colors, index) })}
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  id={`color-id-${index}`}
                  label={copy.colors.id}
                  error={translateFieldError(errors[`colors.${index}.id`])}
                >
                  <TextInput
                    id={`color-id-${index}`}
                    value={color.id}
                    invalid={Boolean(errors[`colors.${index}.id`])}
                    onChange={(event) =>
                      patch({
                        colors: updateAt(draft.colors, index, { ...color, id: event.target.value }),
                      })
                    }
                  />
                </Field>
                <Field
                  id={`color-hex-${index}`}
                  label={copy.colors.hex}
                  error={translateFieldError(errors[`colors.${index}.hex`])}
                >
                  <TextInput
                    id={`color-hex-${index}`}
                    value={color.hex}
                    invalid={Boolean(errors[`colors.${index}.hex`])}
                    onChange={(event) =>
                      patch({
                        colors: updateAt(draft.colors, index, { ...color, hex: event.target.value }),
                      })
                    }
                  />
                </Field>
                <div className="flex items-end pb-2">
                  <span
                    className="size-9 border border-border"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden
                  />
                </div>
              </div>
              <LocalizedTextField
                id={`color-name-${index}`}
                label={copy.colors.name}
                value={color.name}
                errors={errors}
                errorKey={`colors.${index}.name`}
                onChange={(name) =>
                  patch({ colors: updateAt(draft.colors, index, { ...color, name }) })
                }
              />
            </RepeatableRow>
          ))}
        </RepeatableList>
      </AdminCard>

      <AdminCard title={copy.sections.specs.title} description={copy.sections.specs.description}>
        <LocalizedLinesField
          id="product-benefits"
          label={copy.fields.benefits}
          value={draft.benefits}
          onChange={(benefits) => patch({ benefits })}
        />

        <div className="border-t border-border pt-5">
          <RepeatableList
            title={copy.fields.technicalFeatures}
            addLabel={copy.features.add}
            emptyLabel={copy.features.empty}
            count={draft.technicalFeatures.length}
            onAdd={() =>
              patch({
                technicalFeatures: [
                  ...draft.technicalFeatures,
                  { label: { ...EMPTY }, value: { ...EMPTY } },
                ],
              })
            }
          >
            {draft.technicalFeatures.map((feature, index) => (
              <RepeatableRow
                key={index}
                index={index}
                onRemove={() =>
                  patch({ technicalFeatures: removeAt(draft.technicalFeatures, index) })
                }
              >
                <LocalizedTextField
                  id={`feature-label-${index}`}
                  label={copy.features.label}
                  value={feature.label}
                  required
                  errors={errors}
                  errorKey={`technicalFeatures.${index}.label`}
                  onChange={(label) =>
                    patch({
                      technicalFeatures: updateAt(draft.technicalFeatures, index, {
                        ...feature,
                        label,
                      }),
                    })
                  }
                />
                <LocalizedTextField
                  id={`feature-value-${index}`}
                  label={copy.features.value}
                  value={feature.value}
                  required
                  errors={errors}
                  errorKey={`technicalFeatures.${index}.value`}
                  onChange={(value) =>
                    patch({
                      technicalFeatures: updateAt(draft.technicalFeatures, index, {
                        ...feature,
                        value,
                      }),
                    })
                  }
                />
              </RepeatableRow>
            ))}
          </RepeatableList>
        </div>

        <div className="space-y-5 border-t border-border pt-5">
          <LocalizedLinesField
            id="product-materials"
            label={copy.fields.materials}
            value={draft.materials}
            onChange={(materials) => patch({ materials })}
          />
          <LocalizedLinesField
            id="product-use"
            label={copy.fields.recommendedUse}
            value={draft.recommendedUse}
            onChange={(recommendedUse) => patch({ recommendedUse })}
          />
          <LocalizedLinesField
            id="product-care"
            label={copy.fields.care}
            value={draft.care}
            onChange={(care) => patch({ care })}
          />
        </div>
      </AdminCard>

      <AdminCard
        title={copy.sections.certifications.title}
        description={copy.sections.certifications.description}
      >
        <RepeatableList
          addLabel={copy.certifications.add}
          emptyLabel={copy.certifications.empty}
          count={draft.certifications.length}
          onAdd={() =>
            patch({
              certifications: [
                ...draft.certifications,
                { id: "", name: "", description: { ...EMPTY }, logo: "", icon: "badge" },
              ],
            })
          }
        >
          {draft.certifications.map((certification, index) => (
            <RepeatableRow
              key={index}
              index={index}
              onRemove={() =>
                patch({ certifications: removeAt(draft.certifications, index) })
              }
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <Field
                  id={`certification-id-${index}`}
                  label={copy.certifications.id}
                  required
                  error={translateFieldError(errors[`certifications.${index}.id`])}
                >
                  <TextInput
                    id={`certification-id-${index}`}
                    value={certification.id}
                    invalid={Boolean(errors[`certifications.${index}.id`])}
                    onChange={(event) =>
                      patch({
                        certifications: updateAt(draft.certifications, index, {
                          ...certification,
                          id: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <Field
                  id={`certification-name-${index}`}
                  label={copy.certifications.name}
                  required
                  error={translateFieldError(errors[`certifications.${index}.name`])}
                >
                  <TextInput
                    id={`certification-name-${index}`}
                    value={certification.name}
                    invalid={Boolean(errors[`certifications.${index}.name`])}
                    onChange={(event) =>
                      patch({
                        certifications: updateAt(draft.certifications, index, {
                          ...certification,
                          name: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <SelectRow
                  id={`certification-icon-${index}`}
                  label={copy.certifications.icon}
                  value={certification.icon}
                  options={CERTIFICATION_ICON_OPTIONS}
                  onChange={(icon) =>
                    patch({
                      certifications: updateAt(draft.certifications, index, {
                        ...certification,
                        icon: icon as CertificationIcon,
                      }),
                    })
                  }
                />
              </div>

              <LocalizedTextField
                id={`certification-description-${index}`}
                label={copy.certifications.description}
                value={certification.description}
                multiline
                rows={3}
                errors={errors}
                errorKey={`certifications.${index}.description`}
                onChange={(description) =>
                  patch({
                    certifications: updateAt(draft.certifications, index, {
                      ...certification,
                      description,
                    }),
                  })
                }
              />

              <MediaField
                id={`certification-logo-${index}`}
                label={copy.certifications.logo}
                value={certification.logo}
                kind="image"
                error={translateFieldError(errors[`certifications.${index}.logo`])}
                onChange={(logo) =>
                  patch({
                    certifications: updateAt(draft.certifications, index, {
                      ...certification,
                      logo,
                    }),
                  })
                }
              />
            </RepeatableRow>
          ))}
        </RepeatableList>
      </AdminCard>

      <AdminCard
        title={copy.sections.documents.title}
        description={copy.sections.documents.description}
      >
        <RepeatableList
          addLabel={copy.documents.add}
          emptyLabel={copy.documents.empty}
          count={draft.documents.length}
          onAdd={() =>
            patch({
              documents: [
                ...draft.documents,
                { id: "", label: { ...EMPTY }, type: "technical-sheet", url: "" },
              ],
            })
          }
        >
          {draft.documents.map((document, index) => (
            <RepeatableRow
              key={index}
              index={index}
              onRemove={() => patch({ documents: removeAt(draft.documents, index) })}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id={`document-id-${index}`}
                  label={copy.documents.id}
                  required
                  error={translateFieldError(errors[`documents.${index}.id`])}
                >
                  <TextInput
                    id={`document-id-${index}`}
                    value={document.id}
                    invalid={Boolean(errors[`documents.${index}.id`])}
                    onChange={(event) =>
                      patch({
                        documents: updateAt(draft.documents, index, {
                          ...document,
                          id: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <SelectRow
                  id={`document-type-${index}`}
                  label={copy.documents.type}
                  value={document.type}
                  options={options.documentTypes}
                  onChange={(type) =>
                    patch({
                      documents: updateAt(draft.documents, index, {
                        ...document,
                        type: type as ProductDocument["type"],
                      }),
                    })
                  }
                />
              </div>

              <LocalizedTextField
                id={`document-label-${index}`}
                label={copy.documents.label}
                value={document.label}
                required
                errors={errors}
                errorKey={`documents.${index}.label`}
                onChange={(label) =>
                  patch({
                    documents: updateAt(draft.documents, index, { ...document, label }),
                  })
                }
              />

              <MediaField
                id={`document-url-${index}`}
                label={copy.documents.url}
                value={document.url}
                kind="document"
                hint={copy.documents.urlHint}
                error={translateFieldError(errors[`documents.${index}.url`])}
                onChange={(url) =>
                  patch({ documents: updateAt(draft.documents, index, { ...document, url }) })
                }
              />
            </RepeatableRow>
          ))}
        </RepeatableList>
      </AdminCard>

      <AdminCard
        title={copy.sections.variants.title}
        description={copy.sections.variants.description}
      >
        <RepeatableList
          addLabel={copy.variants.add}
          emptyLabel={copy.variants.empty}
          count={draft.variants.length}
          onAdd={() =>
            patch({
              variants: [
                ...draft.variants,
                {
                  id: "",
                  sku: "",
                  size: "",
                  color: { ...EMPTY },
                  price: "",
                  stock: "",
                  available: true,
                },
              ],
            })
          }
        >
          {draft.variants.map((variant, index) => (
            <RepeatableRow
              key={index}
              index={index}
              onRemove={() => patch({ variants: removeAt(draft.variants, index) })}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field
                  id={`variant-id-${index}`}
                  label={copy.documents.id}
                  required
                  error={translateFieldError(errors[`variants.${index}.id`])}
                >
                  <TextInput
                    id={`variant-id-${index}`}
                    value={variant.id}
                    invalid={Boolean(errors[`variants.${index}.id`])}
                    onChange={(event) =>
                      patch({
                        variants: updateAt(draft.variants, index, {
                          ...variant,
                          id: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <Field
                  id={`variant-sku-${index}`}
                  label={copy.variants.sku}
                  required
                  error={translateFieldError(errors[`variants.${index}.sku`])}
                >
                  <TextInput
                    id={`variant-sku-${index}`}
                    value={variant.sku}
                    invalid={Boolean(errors[`variants.${index}.sku`])}
                    onChange={(event) =>
                      patch({
                        variants: updateAt(draft.variants, index, {
                          ...variant,
                          sku: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <Field
                  id={`variant-size-${index}`}
                  label={copy.variants.size}
                  required
                  error={translateFieldError(errors[`variants.${index}.size`])}
                >
                  <TextInput
                    id={`variant-size-${index}`}
                    value={variant.size}
                    invalid={Boolean(errors[`variants.${index}.size`])}
                    onChange={(event) =>
                      patch({
                        variants: updateAt(draft.variants, index, {
                          ...variant,
                          size: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <Field id={`variant-stock-${index}`} label={copy.variants.stock}>
                  <TextInput
                    id={`variant-stock-${index}`}
                    inputMode="numeric"
                    value={variant.stock}
                    onChange={(event) =>
                      patch({
                        variants: updateAt(draft.variants, index, {
                          ...variant,
                          stock: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id={`variant-price-${index}`} label={copy.variants.price}>
                  <TextInput
                    id={`variant-price-${index}`}
                    inputMode="decimal"
                    value={variant.price}
                    onChange={(event) =>
                      patch({
                        variants: updateAt(draft.variants, index, {
                          ...variant,
                          price: event.target.value,
                        }),
                      })
                    }
                  />
                </Field>

                <div className="flex items-end">
                  <ToggleField
                    id={`variant-available-${index}`}
                    label={copy.variants.available}
                    checked={variant.available}
                    onChange={(available) =>
                      patch({
                        variants: updateAt(draft.variants, index, { ...variant, available }),
                      })
                    }
                  />
                </div>
              </div>

              <LocalizedTextField
                id={`variant-color-${index}`}
                label={copy.variants.color}
                value={variant.color}
                errors={errors}
                errorKey={`variants.${index}.color`}
                onChange={(color) =>
                  patch({ variants: updateAt(draft.variants, index, { ...variant, color }) })
                }
              />
            </RepeatableRow>
          ))}
        </RepeatableList>
      </AdminCard>

      <AdminCard
        title={copy.sections.publication.title}
        description={copy.sections.publication.description}
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <ToggleField
            id="product-active"
            label={copy.fields.active}
            checked={draft.active}
            onChange={(active) => patch({ active })}
          />
          <ToggleField
            id="product-featured"
            label={copy.fields.featured}
            checked={draft.featured}
            onChange={(featured) => patch({ featured })}
          />
          <ToggleField
            id="product-preliminary"
            label={copy.fields.preliminary}
            description={copy.fields.preliminaryHint}
            checked={draft.preliminary}
            onChange={(preliminary) => patch({ preliminary })}
          />
        </div>
      </AdminCard>

      {formError ? (
        <Notice tone="error" role="alert">
          {formError}
        </Notice>
      ) : null}

      {isSaved ? (
        <Notice tone="success" role="status">
          {copy.saved}
        </Notice>
      ) : null}

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-border bg-sand-100/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? copy.saving : copy.save}
        </Button>
        <Button variant="ghost" onClick={() => router.push("/admin")}>
          {copy.back}
        </Button>
      </div>
    </form>
  );
}

function formErrorMessage(
  code: string | undefined,
  fields: Record<string, string> | undefined,
): string {
  const copy = adminCopy.form.errors;

  switch (code) {
    case "validation_error":
      return copy.validation;
    case "duplicate":
      return fields?.["id"] ? copy.duplicateId : copy.duplicateSlug;
    case "storage_unavailable":
      return copy.storage;
    case "unauthorized":
      return copy.unauthorized;
    case "not_found":
      return copy.notFound;
    default:
      return copy.unexpected;
  }
}
