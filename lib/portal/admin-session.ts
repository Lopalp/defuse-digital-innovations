import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface AdminSessionData {
  email: string;
  isAdmin: boolean;
}

const ADMIN_EMAILS = [
  "louis@defuse-digital.de",
  "caro.zehner@defuse-digital.de",
  "louis@vndl.media",
  "7lopalp7@gmail.com",
];

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "defuse2026!";

export const adminSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "admin_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  },
};

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSessionData>(cookieStore, adminSessionOptions);
  if (!session.isAdmin) {
    session.email = "";
    session.isAdmin = false;
  }
  return session;
}

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
