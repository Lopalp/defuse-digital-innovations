import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getChecklistForProject, toggleChecklistItem } from "@/lib/portal/admin-notion";

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ error: "projectId required" }, { status: 400 });

  return NextResponse.json(await getChecklistForProject(projectId));
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { projectId, itemName, erledigt, existingId } = await req.json();
  if (!projectId || !itemName) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const newId = await toggleChecklistItem(projectId, itemName, erledigt, existingId);
  return NextResponse.json({ ok: true, id: newId });
}
