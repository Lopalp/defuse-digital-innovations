import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getAllAbos, createAbo } from "@/lib/portal/admin-notion";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getAllAbos());
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.name) return NextResponse.json({ error: "Name erforderlich" }, { status: 400 });

  await createAbo(body);
  return NextResponse.json({ ok: true });
}
