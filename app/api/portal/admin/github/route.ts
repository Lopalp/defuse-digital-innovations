import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/portal/admin-session";

const GH_TOKEN = process.env.GITHUB_TOKEN;
const ORG = "VNDLmedia";

interface GHRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  private: boolean;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  open_issues_count: number;
  default_branch: string;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!GH_TOKEN) {
    return NextResponse.json({ error: "GITHUB_TOKEN not configured", repos: [] });
  }

  try {
    const repos: GHRepo[] = [];
    let page = 1;
    while (true) {
      const res = await fetch(
        `https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=pushed&direction=desc&page=${page}`,
        { headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: "application/vnd.github+json" }, next: { revalidate: 300 } }
      );
      if (!res.ok) break;
      const data = await res.json();
      if (data.length === 0) break;
      repos.push(...data);
      if (data.length < 100) break;
      page++;
    }

    return NextResponse.json(
      repos.map((r) => ({
        name: r.name,
        fullName: r.full_name,
        url: r.html_url,
        description: r.description,
        private: r.private,
        updatedAt: r.updated_at,
        pushedAt: r.pushed_at,
        language: r.language,
        openIssues: r.open_issues_count,
        defaultBranch: r.default_branch,
      }))
    );
  } catch (e) {
    return NextResponse.json({ error: "GitHub API Fehler", repos: [] });
  }
}
