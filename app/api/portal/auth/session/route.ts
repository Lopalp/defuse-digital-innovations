import { NextResponse } from "next/server";
import { getSession } from "@/lib/portal/session";

export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 });
  }

  return NextResponse.json({
    isLoggedIn: true,
    customerId: session.customerId,
    email: session.email,
    name: session.name,
  });
}
