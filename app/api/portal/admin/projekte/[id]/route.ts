import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getProjectById, getMilestonesForProject } from "@/lib/portal/admin-notion";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const [project, milestones] = await Promise.all([
    getProjectById(id),
    getMilestonesForProject(id),
  ]);

  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ...project, milestones });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const properties: Record<string, any> = {};

  // Status (Notion status type)
  if (body.status !== undefined) {
    const valid = ["Not started", "In progress", "on hold", "Done"];
    if (valid.includes(body.status)) {
      properties.Status = { status: { name: body.status } };
    }
  }

  // Priority (select)
  if (body.priority !== undefined) {
    if (body.priority) {
      properties.Priority = { select: { name: body.priority } };
    } else {
      properties.Priority = { select: null };
    }
  }

  // Deadline (date)
  if (body.deadline !== undefined) {
    if (body.deadline) {
      properties.Deadline = { date: { start: body.deadline } };
    } else {
      properties.Deadline = { date: null };
    }
  }

  // Notes (rich_text)
  if (body.notes !== undefined) {
    properties.Notes = { rich_text: [{ text: { content: body.notes } }] };
  }

  // Next Action (rich_text)
  if (body.nextAction !== undefined) {
    properties["Next Action"] = { rich_text: [{ text: { content: body.nextAction } }] };
  }

  // Type (select)
  if (body.type !== undefined) {
    if (body.type) {
      properties.Type = { select: { name: body.type } };
    } else {
      properties.Type = { select: null };
    }
  }

  // Live URL (url)
  if (body.liveUrl !== undefined) {
    properties["Live URL"] = { url: body.liveUrl || null };
  }

  // Repo (url)
  if (body.repo !== undefined) {
    properties.Repo = { url: body.repo || null };
  }

  // Pinned (checkbox)
  if (body.pinned !== undefined) {
    properties.Pinned = { checkbox: !!body.pinned };
  }

  // Archived (checkbox)
  if (body.archived !== undefined) {
    properties.Archived = { checkbox: !!body.archived };
  }

  // Assigned To (select)
  if (body.assignedTo !== undefined) {
    properties["Assigned To"] = body.assignedTo ? { select: { name: body.assignedTo } } : { select: null };
  }

  if (Object.keys(properties).length === 0) {
    return NextResponse.json({ error: "Keine Felder zum Updaten" }, { status: 400 });
  }

  try {
    await notion.pages.update({ page_id: id, properties });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
