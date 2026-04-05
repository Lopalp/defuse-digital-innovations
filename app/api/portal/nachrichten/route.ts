import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { getMessagesForCustomer, createMessage } from "@/lib/portal/notion";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const messages = await getMessagesForCustomer(session.customerId);
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { subject, body, projectId, type } = await req.json();

  if (!subject || !body) {
    return NextResponse.json({ error: "Betreff und Nachricht erforderlich" }, { status: 400 });
  }

  await createMessage({
    subject,
    body,
    customerId: session.customerId,
    projectId: projectId || undefined,
    type: type || "Anfrage",
  });

  return NextResponse.json({ ok: true });
}
