import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";
import { getDocumentFile } from "@/lib/portal/notion";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID erforderlich" }, { status: 400 });
  }

  const file = await getDocumentFile(id);
  if (!file) {
    return NextResponse.json({ error: "Datei nicht gefunden" }, { status: 404 });
  }

  // Proxy the Notion file download (signed URLs expire)
  const fileRes = await fetch(file.url);
  if (!fileRes.ok) {
    return NextResponse.json({ error: "Download fehlgeschlagen" }, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Disposition", `attachment; filename="${file.name}"`);
  const contentType = fileRes.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  return new NextResponse(fileRes.body, { headers });
}
