import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { signAVV } from "@/lib/portal/notion";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { action, signedBy } = await req.json();

  if (action === "sign-avv") {
    if (!signedBy || typeof signedBy !== "string" || signedBy.trim().length < 2) {
      return NextResponse.json({ error: "Name erforderlich" }, { status: 400 });
    }
    await signAVV(session.customerId, signedBy.trim());
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unbekannte Aktion" }, { status: 400 });
}
