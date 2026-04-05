import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getAllCustomers } from "@/lib/portal/admin-notion";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customers = await getAllCustomers();
  return NextResponse.json(customers);
}
