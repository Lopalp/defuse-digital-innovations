import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getAllInvoices } from "@/lib/portal/admin-notion";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getAllInvoices());
}
