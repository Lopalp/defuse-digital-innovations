import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { getDocumentsForCustomer } from "@/lib/portal/notion";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const documents = await getDocumentsForCustomer(session.customerId);
  return NextResponse.json(documents);
}
