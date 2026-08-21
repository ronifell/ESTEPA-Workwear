import { z } from "zod";

import { locales } from "@/config/site";

export const contactSectors = ["mining", "oil-gas", "industry", "other"] as const;

/** Shared by the client form and the API route, so both validate identically. */
export const contactSchema = z.object({
  locale: z.enum(locales),
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  region: z.string().trim().max(120).optional().or(z.literal("")),
  sector: z.enum(contactSectors),
  message: z.string().trim().min(10).max(4000),
  /**
   * Honeypot. Validated by the API route rather than here, so a bot never gets
   * a field-level error pointing at the trap.
   */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;
