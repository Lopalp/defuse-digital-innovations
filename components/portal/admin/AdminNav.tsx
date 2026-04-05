"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Receipt,
  ListTodo,
  CreditCard,
  MessageSquare,
  Github,
  Triangle,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { label: "Projekte", href: "/portal/admin/projekte", icon: FolderKanban },
  { label: "Kunden", href: "/portal/admin/kunden", icon: Users },
  { label: "Rechnungen", href: "/portal/admin/rechnungen", icon: Receipt },
  { label: "Backlog", href: "/portal/admin/backlog", icon: ListTodo },
  { label: "Abos", href: "/portal/admin/abos", icon: CreditCard },
  { label: "Nachrichten", href: "/portal/admin/nachrichten", icon: MessageSquare },
  { label: "GitHub", href: "/portal/admin/github", icon: Github },
  { label: "Vercel", href: "/portal/admin/vercel", icon: Triangle },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/portal/admin" ? pathname === "/portal/admin" : pathname.startsWith(href);

  return (
    <aside className="w-60 shrink-0 bg-white/80 backdrop-blur-xl flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 pt-10 pb-10">
        <Link href="/portal/admin" className="flex items-center gap-2.5 group">
          <svg
            className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-bold tracking-tighter">
            defuse digital
          </span>
        </Link>
        <p className="text-[10px] text-gray-400 mt-2 pl-[30px]">Admin Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-all ${
                active
                  ? "font-semibold text-gray-900 bg-black/[0.04]"
                  : "font-medium text-gray-500 hover:text-gray-900 hover:bg-black/[0.03]"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2 : 1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-6 py-8">
        <p className="text-[13px] font-medium text-gray-900 truncate">Admin</p>
        <p className="text-xs text-gray-400 truncate mb-4">{email}</p>
        <form action="/api/portal/admin/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Abmelden
          </button>
        </form>
      </div>
    </aside>
  );
}
