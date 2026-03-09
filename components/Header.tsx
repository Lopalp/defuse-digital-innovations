"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Blog", href: "/blog" },
  { label: "Über uns", href: "/ueber-uns" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <svg
            aria-hidden="true"
            className="w-7 h-7 group-hover:-rotate-12 transition-transform duration-300 text-gray-900"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-extrabold tracking-tighter">defuse.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/kontakt"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Kontakt
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200/50 bg-gray-50/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-6 gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-semibold transition-colors ${
                  pathname === item.href ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-900 text-white font-bold text-sm"
            >
              Kontakt
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
