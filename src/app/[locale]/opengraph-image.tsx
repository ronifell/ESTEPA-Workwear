import { ImageResponse } from "next/og";

import { getDictionary, resolveLocale } from "@/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ESTEPA Workwear";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const dictionary = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d1b2c",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #c9a227",
              transform: "rotate(45deg)",
            }}
          >
            <div style={{ width: 16, height: 16, background: "#c9a227" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: 6 }}>ESTEPA</span>
            <span style={{ fontSize: 18, letterSpacing: 10, color: "#b9c4d1" }}>WORKWEAR</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#d9b45a",
            }}
          >
            {dictionary.common.brandTagline}
          </span>
          <span style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>
            {dictionary.home.hero.titleLead}
          </span>
        </div>

        <div style={{ display: "flex", height: 10, width: "100%" }}>
          <div style={{ flex: 1, background: "#c9a227" }} />
          <div style={{ flex: 1, background: "#1b3a5c" }} />
        </div>
      </div>
    ),
    size,
  );
}
