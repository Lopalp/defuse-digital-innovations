import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { getProject, getMilestonesForProject } from "@/lib/portal/notion";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { id } = await params;
  const project = await getProject(id);

  if (!project || project.customerId !== session.customerId) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }

  const milestones = await getMilestonesForProject(id);
  return NextResponse.json({ project, milestones });
}
