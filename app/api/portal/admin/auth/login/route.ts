import { NextResponse } from "next/server";
import { getAdminSession, isAdminEmail, verifyAdminPassword } from "@/lib/portal/admin-session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "E-Mail und Passwort erforderlich" }, { status: 400 });
  }

  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Kein Admin-Zugang für diese E-Mail" }, { status: 403 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  const session = await getAdminSession();
  session.email = email.toLowerCase();
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
