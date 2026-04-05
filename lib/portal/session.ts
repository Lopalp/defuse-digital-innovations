import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "./types";

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "portal_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};

const defaultSession: SessionData = {
  customerId: "",
  email: "",
  name: "",
  isLoggedIn: false,
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    session.customerId = defaultSession.customerId;
    session.email = defaultSession.email;
    session.name = defaultSession.name;
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
}
