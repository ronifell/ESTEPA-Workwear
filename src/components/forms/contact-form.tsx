"use client";

import { useId, useState, type FormEvent } from "react";

import { useI18n } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { Field, SelectField, TextArea, TextInput } from "@/components/ui/field";
import { ArrowRightIcon, SpinnerIcon } from "@/components/ui/icons";
import { Notice } from "@/components/ui/notice";
import { provinces } from "@/data/provinces";
import type { Dictionary } from "@/i18n";
import {
  contactSchema,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/validation/contact";

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm = {
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  region: "",
  sector: "",
  message: "",
  website: "",
};

type FormState = typeof emptyForm;

function messageForIssue(
  code: string,
  field: keyof ContactInput,
  forms: Dictionary["forms"],
): string {
  if (code === "invalid_format" && field === "email") return forms.errorEmail;
  if (code === "invalid_type") return forms.errorRequired;
  if (code === "too_small") return field === "message" ? forms.errorMinLength : forms.errorRequired;
  if (code === "too_big") return forms.errorMaxLength;
  return forms.errorGeneric;
}

export function ContactForm() {
  const { locale, dictionary } = useI18n();
  const copy = dictionary.contact;
  const formId = useId();

  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const parsed = contactSchema.safeParse({ ...values, locale });

    if (!parsed.success) {
      const fieldErrors: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactInput | undefined;
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = messageForIssue(issue.code, field, dictionary.forms);
        }
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setServerError(
          body?.error === "storage_unavailable" ? copy.unavailable : dictionary.forms.errorGeneric,
        );
        setStatus("error");
        return;
      }

      setValues(emptyForm);
      setErrors({});
      setStatus("success");
    } catch {
      setServerError(dictionary.forms.errorNetwork);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-surface p-8">
        <Notice tone="success" role="status" title={copy.successTitle}>
          {copy.successDescription}
        </Notice>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          {copy.formTitle}
        </Button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-border bg-surface p-6 lg:p-8"
    >
      <h2 className="font-display text-lg font-semibold text-navy-900">{copy.formTitle}</h2>

      {serverError ? (
        <Notice tone="error" role="alert" className="mt-5">
          {serverError}
        </Notice>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label={copy.fields.name}
          required
          error={errors.name}
          className="sm:col-span-2"
        >
          <TextInput
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            placeholder={copy.placeholders.name}
            value={values.name}
            invalid={Boolean(errors.name)}
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>

        <Field id={`${formId}-company`} label={copy.fields.company} required error={errors.company}>
          <TextInput
            id={`${formId}-company`}
            name="organization"
            autoComplete="organization"
            placeholder={copy.placeholders.company}
            value={values.company}
            invalid={Boolean(errors.company)}
            onChange={(event) => update("company", event.target.value)}
          />
        </Field>

        <Field
          id={`${formId}-role`}
          label={copy.fields.role}
          optionalLabel={dictionary.common.optional}
          error={errors.role}
        >
          <TextInput
            id={`${formId}-role`}
            name="organization-title"
            autoComplete="organization-title"
            placeholder={copy.placeholders.role}
            value={values.role}
            invalid={Boolean(errors.role)}
            onChange={(event) => update("role", event.target.value)}
          />
        </Field>

        <Field id={`${formId}-email`} label={copy.fields.email} required error={errors.email}>
          <TextInput
            id={`${formId}-email`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={copy.placeholders.email}
            value={values.email}
            invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>

        <Field
          id={`${formId}-phone`}
          label={copy.fields.phone}
          optionalLabel={dictionary.common.optional}
          error={errors.phone}
        >
          <TextInput
            id={`${formId}-phone`}
            type="tel"
            name="tel"
            autoComplete="tel"
            placeholder={copy.placeholders.phone}
            value={values.phone}
            invalid={Boolean(errors.phone)}
            onChange={(event) => update("phone", event.target.value)}
          />
        </Field>

        <Field
          id={`${formId}-region`}
          label={copy.fields.region}
          optionalLabel={dictionary.common.optional}
          error={errors.region}
        >
          <SelectField
            id={`${formId}-region`}
            value={values.region}
            invalid={Boolean(errors.region)}
            onChange={(event) => update("region", event.target.value)}
          >
            <option value="">{copy.placeholders.region}</option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </SelectField>
        </Field>

        <Field id={`${formId}-sector`} label={copy.fields.sector} required error={errors.sector}>
          <SelectField
            id={`${formId}-sector`}
            value={values.sector}
            invalid={Boolean(errors.sector)}
            onChange={(event) => update("sector", event.target.value)}
          >
            <option value="">{copy.placeholders.sector}</option>
            <option value="mining">{copy.sectorOptions.mining}</option>
            <option value="oil-gas">{copy.sectorOptions.oilGas}</option>
            <option value="industry">{copy.sectorOptions.industry}</option>
            <option value="other">{copy.sectorOptions.other}</option>
          </SelectField>
        </Field>

        <Field
          id={`${formId}-message`}
          label={copy.fields.message}
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <TextArea
            id={`${formId}-message`}
            name="message"
            placeholder={copy.placeholders.message}
            value={values.message}
            invalid={Boolean(errors.message)}
            onChange={(event) => update("message", event.target.value)}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from users, filled only by bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-8 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <SpinnerIcon className="size-4 animate-spin" />
            {copy.submitting}
          </>
        ) : (
          <>
            {copy.submit}
            <ArrowRightIcon className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
