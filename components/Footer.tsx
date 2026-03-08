import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <svg
                aria-hidden="true"
                className="w-7 h-7 text-gray-900"
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
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Digitalagentur für hochwertige Websites, CMS-Lösungen und
              technisches SEO im DACH-Raum.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Navigation
            </p>
            <ul className="space-y-3">
              {[
                { label: "Leistungen", href: "/leistungen" },
                { label: "Referenzen", href: "/referenzen" },
                { label: "Über uns", href: "/ueber-uns" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Rechtliches
            </p>
            <ul className="space-y-3">
              {[
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} defuse. digital. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-gray-400">
            Made in Chemnitz
          </p>
        </div>
      </div>
    </footer>
  );
}
