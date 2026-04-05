import { PortalNav } from "./PortalNav";

export function PortalShell({
  children,
  name,
  email,
}: {
  children: React.ReactNode;
  name: string;
  email: string;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <PortalNav name={name} email={email} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 md:px-12 pb-24 pt-28">
          {children}
        </div>
      </main>
    </div>
  );
}
