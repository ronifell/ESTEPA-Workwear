"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, TextInput } from "@/components/ui/field";
import { Notice } from "@/components/ui/notice";
import { adminCopy } from "@/lib/admin/copy";

export function LoginForm() {
  const copy = adminCopy.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function submit(): Promise<void> {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Full document request so the new session cookie is sent. Client-side
        // routing can replay a cached RSC payload from before the cookie existed.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- auth cookie must be on the next document request
        window.location.assign("/admin");
        return;
      }

      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(
        data?.error === "rate_limited"
          ? copy.rateLimited
          : data?.error === "invalid_credentials"
            ? copy.invalid
            : data?.error === "not_configured"
              ? copy.notConfigured
              : copy.unexpected,
      );
    } catch {
      setError(copy.unexpected);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <Field id="admin-email" label={copy.email} required>
        <TextInput
          id="admin-email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>

      <Field id="admin-password" label={copy.password} required>
        <TextInput
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </Field>

      {error ? (
        <Notice tone="error" role="alert">
          {error}
        </Notice>
      ) : null}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? copy.submitting : copy.submit}
      </Button>
    </form>
  );
}
