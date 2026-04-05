import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { getTicketsForEmail, createTicket } from "@/lib/portal/notion";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const tickets = await getTicketsForEmail(session.email);
  return NextResponse.json(tickets);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { title, description, projectId, priority } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ error: "Titel und Beschreibung erforderlich" }, { status: 400 });
  }

  await createTicket({
    title,
    description,
    customerId: session.customerId,
    email: session.email,
    companyName: session.name,
    projectId: projectId || undefined,
    priority: priority || "Normal",
  });

  return NextResponse.json({ ok: true });
}
