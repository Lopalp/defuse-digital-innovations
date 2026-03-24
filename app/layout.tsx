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
  metadataBase: new URL("https://defuse.digital"),
  title: {
    default: "defuse. — Digitalagentur für Websites, SEO & Deep Tech",
    template: "%s | defuse.",
  },
  description:
    "Wir bauen schnelle, sichere und sichtbare Websites für KMU und Mittelstand. Next.js, Sanity CMS, SEO, DSGVO-konform. Lighthouse 90+ garantiert.",
  keywords: [
    "Digitalagentur",
    "Webdesign",
    "Webentwicklung",
    "Next.js",
    "Sanity CMS",
    "SEO",
    "DSGVO",
    "Website erstellen",
    "Relaunch",
    "KMU",
    "Mittelstand",
    "Chemnitz",
    "Sachsen",
    "DACH",
    "Deep Tech",
    "KI",
  ],
  authors: [{ name: "defuse. digital" }],
  creator: "defuse. digital",
  publisher: "defuse. digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://defuse.digital",
    siteName: "defuse. digital",
    title: "defuse. — Digitalagentur für Websites, SEO & Deep Tech",
    description:
      "Schnelle, sichere und sichtbare Websites für KMU und Mittelstand. Next.js, Sanity CMS, SEO, DSGVO-konform.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "defuse. — Digitalagentur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "defuse. — Digitalagentur für Websites, SEO & Deep Tech",
    description:
      "Schnelle, sichere und sichtbare Websites für KMU und Mittelstand.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://defuse.digital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "defuse. digital",
              url: "https://defuse.digital",
              logo: "https://defuse.digital/logo.png",
              description:
                "Digitalagentur für schnelle, sichere und sichtbare Websites. Next.js, Sanity CMS, SEO, DSGVO-konform.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Alte Chemnitzer Straße 4",
                addressLocality: "Augustusburg",
                postalCode: "09573",
                addressCountry: "DE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@defuse.digital",
                contactType: "customer service",
                availableLanguage: ["German", "English"],
              },
              parentOrganization: {
                "@type": "Organization",
                name: "LUCRAM MEDIA GmbH",
                url: "https://www.lucram-media.de",
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "defuse. digital",
              url: "https://defuse.digital",
            }),
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${playfair.variable} font-sans bg-gray-50 text-gray-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
