import { AdminNav } from "./AdminNav";

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminNav email={email} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
