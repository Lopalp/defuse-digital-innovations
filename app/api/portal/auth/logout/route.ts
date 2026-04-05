import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";

export async function POST() {
  const session = await getSession();
  session.destroy();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  return NextResponse.redirect(`${baseUrl}/portal/login`);
}
