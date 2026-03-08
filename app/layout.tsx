import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: "italic",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "defuse. - We help you grow",
  description:
    "Wir bieten die perfekte Infrastruktur, um dein Business auf das nächste Level zu skalieren.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${jakarta.variable} ${playfair.variable} font-sans bg-gray-50 text-gray-900 antialiased overflow-hidden relative`}
      >
        {children}
      </body>
    </html>
  );
}
