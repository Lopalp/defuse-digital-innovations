import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getCustomerById, getProjectsForCustomer } from "@/lib/portal/admin-notion";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [customer, projects] = await Promise.all([
    getCustomerById(id),
    getProjectsForCustomer(id),
  ]);

  if (!customer) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...customer, projects });
}
