import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";

// In-memory cache: url -> { data, timestamp }
const cache = new Map<string, { data: ArrayBuffer; contentType: string; ts: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session.isAdmin) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) return new Response("URL required", { status: 400 });

  // Check cache
  const cached = cache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return new Response(cached.data, {
      headers: {
        "Content-Type": cached.contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  try {
    const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
    const res = await fetch(screenshotUrl, { signal: AbortSignal.timeout(15000) });

    if (!res.ok) return new Response("Screenshot failed", { status: 502 });

    const contentType = res.headers.get("content-type") || "image/png";
    const data = await res.arrayBuffer();

    // Store in cache
    cache.set(url, { data, contentType, ts: Date.now() });

    // Evict old entries if cache gets too big (max 100)
    if (cache.size > 100) {
      const oldest = [...cache.entries()].sort((a, b) => a[1].ts - b[1].ts)[0];
      if (oldest) cache.delete(oldest[0]);
    }

    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Screenshot failed", { status: 502 });
  }
}
