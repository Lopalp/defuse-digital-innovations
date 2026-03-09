export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: BlogBlock[];
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "deep-tech-webentwicklung",
    title: "Deep Tech in der Webentwicklung: Warum Standard nicht mehr reicht",
    excerpt:
      "KI-Integration, Automatisierung, Custom APIs — warum die nächste Generation von Websites mehr braucht als ein hübsches Frontend.",
    date: "2026-03-09",
    readTime: "8 min",
    category: "Deep Tech",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1740&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "Die Zeiten, in denen eine Website ein digitales Schaufenster war, sind vorbei. Heute erwarten Nutzer intelligente Interfaces, personalisierte Erlebnisse und nahtlose Integrationen. Das Stichwort: Deep Tech.",
      },
      {
        type: "heading",
        text: "Was meinen wir mit Deep Tech?",
      },
      {
        type: "paragraph",
        text: "Deep Tech ist kein Buzzword — es beschreibt den Einsatz fortgeschrittener Technologien in Projekten, die über klassisches Webdesign hinausgehen. Wir reden von KI-gestützten Features, komplexen Daten-Pipelines und maßgeschneiderten Backend-Systemen.",
      },
      {
        type: "list",
        items: [
          "KI-Chatbots, die tatsächlich helfen statt zu nerven",
          "Automatisierte Content-Pipelines mit LLM-Unterstützung",
          "Echtzeit-Dashboards mit WebSocket-Verbindungen",
          "Custom APIs, die Legacy-Systeme mit modernen Frontends verbinden",
          "Intelligente Suchsysteme mit semantischem Verständnis",
        ],
      },
      {
        type: "heading",
        text: "Beispiel: KI-gestützte Produktberatung",
      },
      {
        type: "paragraph",
        text: "Ein Kunde kommt auf Ihre Website und sucht das richtige Produkt aus 500 Varianten. Statt endloser Filterlisten baut man einen intelligenten Berater: Der Nutzer beschreibt sein Problem in natürlicher Sprache, und das System empfiehlt die drei besten Optionen — mit Begründung.",
      },
      {
        type: "quote",
        text: "Die beste Technologie ist die, die der Nutzer nicht bemerkt — aber sofort vermisst, wenn sie fehlt.",
      },
      {
        type: "heading",
        text: "Automatisierung: Der stille Produktivitäts-Boost",
      },
      {
        type: "paragraph",
        text: "Jedes Unternehmen hat repetitive Prozesse: Kontaktformulare, die manuell in CRMs übertragen werden. Rechnungen, die per Hand erstellt werden. Social-Media-Posts, die einzeln geplant werden.",
      },
      {
        type: "paragraph",
        text: "Wir bauen Workflows, die das eliminieren. Ein Kontaktformular, das direkt in Pipedrive landet, einen Slack-Alert auslöst und eine automatische Bestätigung schickt — ohne dass jemand etwas tun muss.",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Webhook → CRM → Slack → E-Mail in einer Pipeline
export async function POST(req: Request) {
  const data = await req.json();

  await Promise.all([
    pipedrive.createDeal(data),
    slack.notify('#leads', formatLead(data)),
    resend.send(confirmationEmail(data)),
  ]);

  return Response.json({ success: true });
}`,
      },
      {
        type: "heading",
        text: "Custom APIs: Die unsichtbare Infrastruktur",
      },
      {
        type: "paragraph",
        text: "Die meisten Unternehmen arbeiten mit einem Zoo aus Tools: CRM, ERP, Buchhaltung, E-Mail-Marketing, Analytics. Das Problem: Diese Systeme sprechen nicht miteinander. Custom APIs lösen das — sie verbinden alles zu einem nahtlosen System.",
      },
      {
        type: "heading",
        text: "Wann brauchen Sie Deep Tech?",
      },
      {
        type: "list",
        items: [
          "Wenn Standard-Plugins nicht mehr ausreichen",
          "Wenn manuelle Prozesse Ihr Team ausbremsen",
          "Wenn Sie Daten aus verschiedenen Quellen zusammenführen müssen",
          "Wenn Ihre Konkurrenz bereits KI einsetzt",
          "Wenn Skalierung ohne Automatisierung unmöglich wird",
        ],
      },
      {
        type: "paragraph",
        text: "Deep Tech ist kein Luxus — es ist der nächste logische Schritt für jedes Unternehmen, das digital ernst genommen werden will. Und wir bauen genau das.",
      },
    ],
  },
  {
    slug: "next-js-vs-wordpress",
    title: "Next.js vs. WordPress: Warum wir gewechselt haben",
    excerpt:
      "Performance, Sicherheit, Developer Experience — warum Next.js für professionelle Websites die bessere Wahl ist.",
    date: "2026-02-20",
    readTime: "6 min",
    category: "Webentwicklung",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1740&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "WordPress betreibt 43% des Internets. Und genau das ist das Problem. Was als einfache Blog-Plattform begann, wurde zum Schweizer Taschenmesser — und damit langsam, unsicher und schwer wartbar.",
      },
      {
        type: "heading",
        text: "Das Performance-Problem",
      },
      {
        type: "paragraph",
        text: "Eine typische WordPress-Seite lädt 20–40 HTTP-Requests, inklusive jQuery, Plugin-CSS und Theme-Overhead. Eine Next.js-Seite? Server-Side Rendering, automatisches Code-Splitting, Image-Optimierung out of the box. Die Ladezeit sinkt von 3-4 Sekunden auf unter eine.",
      },
      {
        type: "heading",
        text: "Sicherheit ist kein Feature — es ist Pflicht",
      },
      {
        type: "paragraph",
        text: "WordPress-Plugins sind das größte Sicherheitsrisiko im Web. Jedes Plugin ist eine potenzielle Schwachstelle. Next.js-Seiten sind statisch oder server-rendered — keine Datenbank-Injection, keine Plugin-Exploits, keine Update-Hölle.",
      },
      {
        type: "quote",
        text: "Die sicherste Datenbank ist die, die gar nicht existiert.",
      },
      {
        type: "heading",
        text: "Developer Experience matters",
      },
      {
        type: "paragraph",
        text: "TypeScript, Hot Module Replacement, Git-basierter Workflow, CI/CD-Pipelines — modernes Tooling macht uns schneller und reduziert Fehler. WordPress-Entwicklung fühlt sich dagegen an wie eine Zeitreise.",
      },
      {
        type: "paragraph",
        text: "Heißt das, WordPress ist tot? Nein. Aber für professionelle Unternehmens-Websites, bei denen Performance, Sicherheit und Skalierbarkeit zählen, ist Next.js die bessere Wahl. Punkt.",
      },
    ],
  },
  {
    slug: "lighthouse-score-optimieren",
    title: "Lighthouse Score 95+: So optimieren wir jede Website",
    excerpt:
      "Core Web Vitals, Bildoptimierung, Font-Loading — unser Playbook für perfekte Performance-Scores.",
    date: "2026-02-05",
    readTime: "5 min",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1740&auto=format&fit=crop",
    content: [
      {
        type: "paragraph",
        text: "Ein Lighthouse-Score von 95+ ist kein Zufall — er ist das Ergebnis systematischer Optimierung. Hier ist unser Playbook.",
      },
      {
        type: "heading",
        text: "Core Web Vitals: Die drei Metriken, die zählen",
      },
      {
        type: "list",
        items: [
          "LCP (Largest Contentful Paint) < 2.5s — das größte sichtbare Element muss schnell laden",
          "FID (First Input Delay) < 100ms — die Seite muss sofort reagieren",
          "CLS (Cumulative Layout Shift) < 0.1 — nichts darf springen",
        ],
      },
      {
        type: "heading",
        text: "Bilder: Der #1 Performance-Killer",
      },
      {
        type: "paragraph",
        text: "Next.js Image-Komponente mit automatischer WebP/AVIF-Konvertierung, Lazy Loading und Blur-Placeholder. Jedes Bild bekommt width, height und sizes — kein Layout Shift, kein Bandwidth-Waste.",
      },
      {
        type: "heading",
        text: "Fonts: Self-Hosting ist Pflicht",
      },
      {
        type: "paragraph",
        text: "Google Fonts über CDN? Vergessen Sie's. Wir hosten Fonts lokal mit next/font, nutzen font-display: swap und laden nur die Weights, die wirklich gebraucht werden. DSGVO-konform und schneller.",
      },
      {
        type: "paragraph",
        text: "Performance ist kein nachträgliches Feature — es ist eine Designentscheidung. Und wir treffen sie von Anfang an.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
