import { z } from "zod";

import { locales } from "@/config/site";

export const deliveryMethods = ["shipping", "pickup", "to-be-agreed"] as const;

export const customerSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(40),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  taxId: z.string().trim().max(40).optional().or(z.literal("")),
});

export const deliverySchema = z
  .object({
    method: z.enum(deliveryMethods),
    province: z.string().trim().max(120).optional().or(z.literal("")),
    city: z.string().trim().max(120).optional().or(z.literal("")),
    address: z.string().trim().max(200).optional().or(z.literal("")),
    postalCode: z.string().trim().max(20).optional().or(z.literal("")),
    notes: z.string().trim().max(2000).optional().or(z.literal("")),
  })
  .refine(
    (value) =>
      value.method !== "shipping" ||
      (Boolean(value.province) && Boolean(value.city) && Boolean(value.address)),
    { message: "shipping_address_required", path: ["address"] },
  );

export const orderItemSchema = z.object({
  productId: z.string().trim().min(1).max(64),
  size: z.string().trim().max(24).optional(),
  quantity: z.number().int().min(1).max(99),
});

export const orderSchema = z.object({
  locale: z.enum(locales),
  customer: customerSchema,
  delivery: deliverySchema,
  items: z.array(orderItemSchema).min(1).max(50),
  /**
   * Honeypot. Validated by the API route rather than here, so a bot never gets
   * a field-level error pointing at the trap.
   */
  website: z.string().max(200).optional(),
});

export type CustomerInput = z.infer<typeof customerSchema>;
export type DeliveryInput = z.infer<typeof deliverySchema>;
export type OrderInput = z.infer<typeof orderSchema>;
