import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getAllBacklogTasks, createBacklogTask } from "@/lib/portal/admin-notion";

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (projectId) {
    const { getBacklogForProject } = await import("@/lib/portal/admin-notion");
    return NextResponse.json(await getBacklogForProject(projectId));
  }

  return NextResponse.json(await getAllBacklogTasks());
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.name || !body.projectId) {
    return NextResponse.json({ error: "Name und Projekt erforderlich" }, { status: 400 });
  }

  await createBacklogTask(body);
  return NextResponse.json({ ok: true });
}
