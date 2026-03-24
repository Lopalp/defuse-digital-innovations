import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import { CaseStudyClient } from "./CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.client} — ${project.title} | defuse.`,
    description: project.description,
    openGraph: {
      title: `${project.client} — ${project.title} | defuse.`,
      description: project.description,
      images: [{ url: project.image, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.client} — ${project.title}`,
      description: project.description,
    },
    alternates: {
      canonical: `https://defuse.digital/referenzen/${slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Organization",
      name: "defuse. digital",
      url: "https://defuse.digital",
    },
    datePublished: `${project.year}-01-01`,
    image: project.image,
    url: `https://defuse.digital/referenzen/${slug}`,
    ...(project.liveUrl && { mainEntityOfPage: project.liveUrl }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://defuse.digital",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Referenzen",
        item: "https://defuse.digital/referenzen",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.client,
        item: `https://defuse.digital/referenzen/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CaseStudyClient project={project} />
    </>
  );
}
