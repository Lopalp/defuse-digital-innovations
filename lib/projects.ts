export interface Project {
  slug: string;
  client: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  branche: string;
  aufgabe: string;
  loesung: string;
  ergebnis: string;
  stack: string[];
  testimonial?: {
    text: string;
    name: string;
    role: string;
  };
  liveUrl?: string;
  images: string[];
  stats: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "laasen-perle",
    client: "Bergpension Laasen Perle",
    title: "Bergpension Laasen Perle",
    description:
      "Kompletter Website-Relaunch für eine Bergpension im Erzgebirge. Von veraltetem WordPress zu einer modernen Next.js Website mit Sanity CMS.",
    tags: ["Webdesign", "Next.js", "Sanity CMS", "SEO"],
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop",
    year: "2025",
    branche: "Gastgewerbe / Tourismus",
    aufgabe:
      "Die bestehende WordPress-Website war veraltet, langsam und nicht mobiloptimiert. Gäste konnten keine Zimmer direkt buchen und die Sichtbarkeit in Suchmaschinen war minimal.",
    loesung:
      "Kompletter Relaunch mit Next.js und Sanity CMS. Responsive Design, optimierte Ladezeiten, integriertes Buchungssystem, strukturierte Daten für lokale Suche und ein CMS, das die Betreiber selbst bedienen können.",
    ergebnis:
      "Lighthouse Score 98, Ladezeit unter 1 Sekunde, 3x mehr organische Anfragen in den ersten 3 Monaten nach Launch.",
    stack: ["Next.js", "React", "Tailwind CSS", "Sanity CMS", "TypeScript", "Vercel"],
    testimonial: {
      text: "Die neue Website hat unsere Erwartungen übertroffen. Endlich können wir Inhalte selbst pflegen und unsere Gäste finden uns auch bei Google.",
      name: "Familie Müller",
      role: "Inhaber, Bergpension Laasen Perle",
    },
    liveUrl: "https://www.laasen-perle.de",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1740&auto=format&fit=crop",
    ],
    stats: [
      { label: "Lighthouse Score", value: "98" },
      { label: "Ladezeit", value: "0.8s" },
      { label: "Mehr Anfragen", value: "3x" },
      { label: "Lieferzeit", value: "3 Wo." },
    ],
  },
  {
    slug: "lucram-media",
    client: "Lucram Media",
    title: "Corporate Website",
    description:
      "Corporate Website mit scroll-basiertem Storytelling und Custom-Animationen. Minimalistisches Design, maximale Wirkung.",
    tags: ["Branding", "Webdesign", "Animationen", "SEO"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop",
    year: "2025",
    branche: "Medien / Marketing",
    aufgabe:
      "Lucram Media brauchte eine Website, die ihre Kreativleistungen auf höchstem Niveau präsentiert — mit Scroll-Storytelling, Video-Integration und einer Premium-Ästhetik.",
    loesung:
      "Custom Next.js Website mit eigenen Scroll-Animationen, Video-Hintergründen, TiltCards und StickySection-Komponenten. Komplett ohne externe Animationsbibliotheken — alles handgemacht.",
    ergebnis:
      "Lighthouse Score 96, durchschnittliche Verweildauer 4:30 Min, Conversion Rate für Kontaktanfragen +60%.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Custom Animations"],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop",
    ],
    stats: [
      { label: "Lighthouse", value: "96" },
      { label: "Verweildauer", value: "4:30" },
      { label: "Conversion", value: "+60%" },
      { label: "Lieferzeit", value: "5 Wo." },
    ],
  },
  {
    slug: "techstart-saas",
    client: "TechStart GmbH",
    title: "SaaS Landing Page",
    description:
      "High-Converting Landing Page für ein SaaS-Startup. Sanity-gesteuerter Blog und automatisierte Lead-Generierung. Conversion Rate +40%.",
    tags: ["Landing Page", "CRO", "Sanity CMS", "Performance"],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1740&auto=format&fit=crop",
    year: "2024",
    branche: "Software / SaaS",
    aufgabe:
      "Das Startup brauchte eine Landing Page, die nicht nur gut aussieht, sondern messbar konvertiert. Die bestehende Template-Lösung war zu generisch und langsam.",
    loesung:
      "Custom Landing Page mit A/B-Test-fähiger Architektur, optimierten CTAs, Social Proof Elementen und sub-second Ladezeiten. Sanity CMS für Blog-Content, DSGVO-konformes Tracking mit Plausible.",
    ergebnis:
      "Conversion Rate von 2,1% auf 4,8% gesteigert. Ladezeit 0,6 Sekunden. Lighthouse Performance Score 100.",
    stack: ["Next.js", "Sanity CMS", "Tailwind CSS", "Plausible Analytics", "Vercel"],
    testimonial: {
      text: "defuse hat unsere Conversion Rate mehr als verdoppelt. Die Zusammenarbeit war schnell, unkompliziert und das Ergebnis spricht für sich.",
      name: "Thomas Weber",
      role: "CEO, TechStart GmbH",
    },
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop",
    ],
    stats: [
      { label: "Conversion", value: "4.8%" },
      { label: "Ladezeit", value: "0.6s" },
      { label: "Performance", value: "100" },
      { label: "Lieferzeit", value: "2 Wo." },
    ],
  },
  {
    slug: "handwerk-schuster",
    client: "Handwerk Schuster",
    title: "WordPress → Next.js Migration",
    description:
      "Von WordPress zu Next.js: 301-Redirects, Content-Migration und technisches SEO. Ladezeit von 4,2s auf 0,8s.",
    tags: ["Migration", "Relaunch", "Next.js", "SEO"],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1740&auto=format&fit=crop",
    year: "2024",
    branche: "Handwerk / Dienstleistung",
    aufgabe:
      "Die WordPress-Website war langsam (4,2s Ladezeit), nicht mobiloptimiert und verlor Rankings. Ein Relaunch ohne SEO-Verluste war essenziell.",
    loesung:
      "Komplette Migration auf Next.js mit automatisierten 301-Redirects, Content-Übernahme, lokaler SEO-Optimierung und Google Business Profil-Integration. DSGVO-konform ohne externe Dienste.",
    ergebnis:
      "Ladezeit von 4,2s auf 0,8s reduziert. Top-3-Ranking für lokale Suchbegriffe. Keine Ranking-Verluste während der Migration.",
    stack: ["Next.js", "Tailwind CSS", "Sanity CMS", "TypeScript"],
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1740&auto=format&fit=crop",
    ],
    stats: [
      { label: "Ladezeit vorher", value: "4.2s" },
      { label: "Ladezeit nachher", value: "0.8s" },
      { label: "Google Ranking", value: "Top 3" },
      { label: "Lieferzeit", value: "4 Wo." },
    ],
  },
];
