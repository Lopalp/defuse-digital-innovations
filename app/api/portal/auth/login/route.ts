import { NextRequest, NextResponse } from "next/server";
import { getCustomerByEmail } from "@/lib/portal/notion";
import { createMagicLinkToken } from "@/lib/portal/auth";
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

const rateLimitMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "E-Mail erforderlich" }, { status: 400 });
  }

  const normalized = email.toLowerCase().trim();

  // Rate limit: max 3 per email per 15 min
  const now = Date.now();
  const attempts = rateLimitMap.get(normalized)?.filter((t) => now - t < 900_000) ?? [];
  if (attempts.length >= 3) {
    return NextResponse.json({ ok: true });
  }
  rateLimitMap.set(normalized, [...attempts, now]);

  // Always return success to prevent email enumeration
  const customer = await getCustomerByEmail(normalized);
  if (!customer) {
    return NextResponse.json({ ok: true });
  }

  const token = await createMagicLinkToken({
    email: customer.email,
    customerId: customer.id,
    name: customer.name,
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const magicLink = `${baseUrl}/api/portal/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: customer.email,
    subject: "Ihr Login-Link — defuse digital Kundenportal",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <p style="font-size: 14px; color: #6a7282; margin-bottom: 24px;">
          Hallo ${customer.contactPerson || customer.name},
        </p>
        <p style="font-size: 14px; color: #364153; line-height: 1.7; margin-bottom: 32px;">
          Klicken Sie auf den Button, um sich in Ihr Kundenportal einzuloggen. Der Link ist 15 Minuten gültig.
        </p>
        <a href="${magicLink}" style="display: inline-block; background: #101828; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 700;">
          Jetzt einloggen
        </a>
        <p style="font-size: 12px; color: #99a1af; margin-top: 40px; line-height: 1.7;">
          Falls Sie diesen Link nicht angefordert haben, ignorieren Sie diese E-Mail.<br/>
          defuse digital · Alte Chemnitzer Straße 4 · 09573 Augustusburg
        </p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
