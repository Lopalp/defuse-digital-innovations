import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/portal/auth";
import { getSession } from "@/lib/portal/session";
import { getCustomerById, markWelcomeSent } from "@/lib/portal/notion";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/portal/login?error=invalid`);
  }

  const payload = await verifyMagicLinkToken(token);
  if (!payload) {
    return NextResponse.redirect(`${baseUrl}/portal/login?error=expired`);
  }

  // Create session
  const session = await getSession();
  session.customerId = payload.customerId;
  session.email = payload.email;
  session.name = payload.name;
  session.isLoggedIn = true;
  await session.save();

  // Send welcome email on first login
  const customer = await getCustomerById(payload.customerId);
  if (customer && !customer.welcomeSent) {
    try {
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: customer.email,
        subject: "Willkommen im defuse digital Kundenportal 🎉",
        html: buildWelcomeEmail(customer.contactPerson || customer.name, baseUrl),
      });
      await markWelcomeSent(payload.customerId);
    } catch (e) {
      console.error("Welcome email failed:", e);
    }
  }

  return NextResponse.redirect(`${baseUrl}/portal`);
}

function buildWelcomeEmail(name: string, baseUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; width: 48px; height: 48px; background: #101828; border-radius: 12px; line-height: 48px; text-align: center; color: white; font-size: 20px;">✦</div>
      </div>

      <h1 style="font-size: 24px; font-weight: 800; color: #101828; text-align: center; margin-bottom: 8px; letter-spacing: -0.02em;">
        Willkommen bei defuse digital
      </h1>
      <p style="font-size: 14px; color: #6a7282; text-align: center; margin-bottom: 32px;">
        Ihr persönliches Kundenportal ist bereit.
      </p>

      <div style="background: #f9fafb; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #364153; line-height: 1.8; margin: 0 0 16px 0;">
          Hallo ${name},
        </p>
        <p style="font-size: 14px; color: #364153; line-height: 1.8; margin: 0 0 16px 0;">
          herzlich willkommen! Ab sofort haben Sie über Ihr Kundenportal jederzeit Zugriff auf:
        </p>
        <ul style="font-size: 14px; color: #364153; line-height: 2; margin: 0; padding-left: 20px;">
          <li><strong>Projektstatus</strong> — Fortschritt, Meilensteine, Deadlines</li>
          <li><strong>Dokumente</strong> — Angebote, Verträge, Designs</li>
          <li><strong>Nachrichten</strong> — Direkter Draht zu unserem Team</li>
          <li><strong>Support</strong> — Tickets erstellen und verfolgen</li>
        </ul>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${baseUrl}/portal" style="display: inline-block; background: #101828; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 700;">
          Zum Kundenportal
        </a>
      </div>

      <div style="background: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 32px;">
        <p style="font-size: 12px; color: #6a7282; line-height: 1.7; margin: 0;">
          <strong>Wichtig:</strong> Beim ersten Login bitten wir Sie, unsere Auftragsverarbeitungsvereinbarung (AVV)
          digital zu unterzeichnen. Das dauert nur eine Minute und ist gesetzlich vorgeschrieben.
        </p>
      </div>

      <p style="font-size: 14px; color: #364153; line-height: 1.8;">
        Bei Fragen stehen wir Ihnen jederzeit zur Verfügung — antworten Sie einfach auf diese E-Mail
        oder nutzen Sie das Ticket-System im Portal.
      </p>
      <p style="font-size: 14px; color: #364153; line-height: 1.8; margin-top: 16px;">
        Beste Grüße,<br/>
        <strong>Ihr defuse digital Team</strong>
      </p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
      <p style="font-size: 11px; color: #99a1af; line-height: 1.7; text-align: center;">
        defuse digital · LUCRAM MEDIA GmbH · Alte Chemnitzer Straße 4 · 09573 Augustusburg<br/>
        <a href="${baseUrl}/datenschutz" style="color: #99a1af;">Datenschutz</a> · <a href="${baseUrl}/impressum" style="color: #99a1af;">Impressum</a>
      </p>
    </div>
  `;
}
