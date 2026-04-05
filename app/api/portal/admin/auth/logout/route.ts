import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";

export async function POST() {
  const session = await getAdminSession();
  session.destroy();
  return NextResponse.redirect(new URL("/portal/admin/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
