import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns — defuse digital",
  description:
    "Studierte Informatiker aus Sachsen. Headless, Next.js, Green Hosting — nachhaltige Lösungen für langfristiges Wachstum.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
