import { siteConfig } from "@/config/site";
import type { ContactLead, Order } from "@/lib/storage";

const TEAM_INBOX = process.env["NOTIFY_EMAIL"]?.trim() || siteConfig.contact.email;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linesToHtml(lines: readonly string[]): string {
  return `<p style="font-family:Georgia,serif;font-size:15px;line-height:1.55;color:#1a2430">${lines
    .map((line) => escapeHtml(line))
    .join("<br/>")}</p>`;
}

async function sendMail(subject: string, text: string, html: string): Promise<boolean> {
  if (!TEAM_INBOX) {
    console.warn("[notify] no inbox configured");
    return false;
  }

  try {
    const nodemailer = await import("nodemailer");
    const host = process.env["SMTP_HOST"]?.trim();
    const transporter = host
      ? nodemailer.createTransport({
          host,
          port: Number(process.env["SMTP_PORT"] ?? 587),
          secure: process.env["SMTP_SECURE"] === "true",
          auth:
            process.env["SMTP_USER"] && process.env["SMTP_PASS"]
              ? { user: process.env["SMTP_USER"], pass: process.env["SMTP_PASS"] }
              : undefined,
        })
      : nodemailer.createTransport({
          sendmail: true,
          newline: "unix",
          path: process.env["SENDMAIL_PATH"]?.trim() || "/usr/sbin/sendmail",
        });

    await transporter.sendMail({
      from: process.env["SMTP_FROM"]?.trim() || `ESTEPA Workwear <${TEAM_INBOX}>`,
      to: TEAM_INBOX,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("[notify] email send failed", error);
    return false;
  }
}

export async function notifyContactLead(lead: ContactLead): Promise<void> {
  const lines = [
    `Nombre: ${lead.name}`,
    `Empresa: ${lead.company}`,
    lead.role ? `Cargo: ${lead.role}` : "",
    `Email: ${lead.email}`,
    lead.phone ? `Teléfono: ${lead.phone}` : "",
    lead.region ? `Región: ${lead.region}` : "",
    `Sector: ${lead.sector}`,
    "",
    lead.message,
  ].filter((line) => line.length > 0);

  await sendMail(`Consulta ESTEPA — ${lead.company}`, lines.join("\n"), linesToHtml(lines));
}

export async function notifyOrder(order: Order): Promise<void> {
  const items = order.items
    .map((item) => {
      const size = item.size ? ` · talle ${item.size}` : "";
      return `• ${item.name}${size} × ${item.quantity}`;
    })
    .join("\n");

  const lines = [
    `Referencia: ${order.reference}`,
    `Cliente: ${order.customer.firstName} ${order.customer.lastName}`,
    `Empresa: ${order.customer.company}`,
    `Email: ${order.customer.email}`,
    `Teléfono: ${order.customer.phone}`,
    order.customer.taxId ? `CUIT: ${order.customer.taxId}` : "",
    `Entrega: ${order.delivery.method}`,
    order.delivery.province ? `Provincia: ${order.delivery.province}` : "",
    order.delivery.city ? `Ciudad: ${order.delivery.city}` : "",
    order.delivery.address ? `Dirección: ${order.delivery.address}` : "",
    order.delivery.notes ? `Notas: ${order.delivery.notes}` : "",
    "",
    "Productos:",
    items,
  ].filter((line) => line.length > 0);

  await sendMail(
    `Cotización ESTEPA ${order.reference}`,
    lines.join("\n"),
    linesToHtml(lines),
  );
}
