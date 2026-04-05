import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({ isAdmin: session.isAdmin, email: session.email });
}
