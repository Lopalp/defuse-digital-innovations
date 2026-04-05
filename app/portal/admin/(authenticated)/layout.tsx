import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/portal/admin-session";
import { AdminShell } from "@/components/portal/admin/AdminShell";

export default async function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session.isAdmin) {
    redirect("/portal/admin/login");
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
