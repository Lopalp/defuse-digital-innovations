import { redirect } from "next/navigation";
import { getSession } from "@/lib/portal/session";
import { PortalShell } from "@/components/portal/PortalShell";

export default async function AuthenticatedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/portal/login");
  }

  return (
    <PortalShell name={session.name} email={session.email}>
      {children}
    </PortalShell>
  );
}
