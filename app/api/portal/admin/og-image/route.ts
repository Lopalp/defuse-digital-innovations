import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; DefuseBot/1.0)" },
      signal: AbortSignal.timeout(5000),
    });
    const html = await res.text();

    // Extract og:image
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    if (ogMatch?.[1]) {
      let imgUrl = ogMatch[1];
      // Handle relative URLs
      if (imgUrl.startsWith("/")) {
        const base = new URL(url);
        imgUrl = `${base.origin}${imgUrl}`;
      }
      return NextResponse.json({ image: imgUrl });
    }

    // Fallback: twitter:image
    const twMatch = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);

    if (twMatch?.[1]) {
      let imgUrl = twMatch[1];
      if (imgUrl.startsWith("/")) {
        const base = new URL(url);
        imgUrl = `${base.origin}${imgUrl}`;
      }
      return NextResponse.json({ image: imgUrl });
    }

    return NextResponse.json({ image: null });
  } catch {
    return NextResponse.json({ image: null });
  }
}
