import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const TEAM_SLUG = "vndl";

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!VERCEL_TOKEN) {
    return NextResponse.json({ error: "VERCEL_TOKEN not configured", projects: [] });
  }

  try {
    const res = await fetch(
      `https://api.vercel.com/v9/projects?teamId=${TEAM_SLUG}&limit=100`,
      { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }, next: { revalidate: 300 } }
    );

    if (!res.ok) {
      // Try with slug instead of teamId
      const res2 = await fetch(
        `https://api.vercel.com/v9/projects?slug=${TEAM_SLUG}&limit=100`,
        { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }, next: { revalidate: 300 } }
      );
      if (!res2.ok) {
        return NextResponse.json({ error: `Vercel API: ${res2.status}`, projects: [] });
      }
      const data2 = await res2.json();
      return NextResponse.json(formatProjects(data2.projects || []));
    }

    const data = await res.json();
    return NextResponse.json(formatProjects(data.projects || []));
  } catch {
    return NextResponse.json({ error: "Vercel API Fehler", projects: [] });
  }
}

function formatProjects(projects: any[]) {
  return projects.map((p: any) => ({
    name: p.name,
    url: p.targets?.production?.url ? `https://${p.targets.production.url}` : null,
    customDomains: (p.alias || []).filter((a: any) => !a.includes(".vercel.app")),
    framework: p.framework || null,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null,
    gitRepo: p.link?.repo ? `${p.link.org}/${p.link.repo}` : null,
  }));
}
