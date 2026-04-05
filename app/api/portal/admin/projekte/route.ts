import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";
import { getAllProjects } from "@/lib/portal/admin-notion";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PROJEKTE_DB = process.env.NOTION_PROJEKTE_DB!;

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  if (!body.name) return NextResponse.json({ error: "Name erforderlich" }, { status: 400 });

  const properties: Record<string, any> = {
    Name: { title: [{ text: { content: body.name } }] },
  };

  if (body.status) properties.Status = { status: { name: body.status } };
  if (body.type) properties.Type = { select: { name: body.type } };
  if (body.customerId) properties["👥 Client"] = { relation: [{ id: body.customerId }] };
  if (body.deadline) properties.Deadline = { date: { start: body.deadline } };
  if (body.repo) properties.Repo = { url: body.repo };
  if (body.liveUrl) properties["Live URL"] = { url: body.liveUrl };
  if (body.notes) properties.Notes = { rich_text: [{ text: { content: body.notes } }] };
  if (body.assignedTo) properties["Assigned To"] = { select: { name: body.assignedTo } };
  if (body.priority) properties.Priority = { select: { name: body.priority } };

  // Set creation date to today
  properties.Erstellt = { date: { start: new Date().toISOString().split("T")[0] } };

  try {
    const page = await notion.pages.create({ parent: { database_id: PROJEKTE_DB }, properties });
    return NextResponse.json({ ok: true, id: page.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
