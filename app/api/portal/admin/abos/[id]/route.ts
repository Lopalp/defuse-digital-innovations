import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { updateAbo, deleteAbo } from "@/lib/portal/admin-notion";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  await updateAbo(id, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await deleteAbo(id);
  return NextResponse.json({ ok: true });
}
