import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS, getPostBySlug, formatDate } from "@/lib/blog";
import type { BlogBlock } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Nicht gefunden — defuse." };
  return {
    title: `${post.title} — defuse.`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "de_DE",
      publishedTime: post.date,
      authors: ["defuse. digital"],
      tags: [post.category, "Webdesign", "SEO", "Chemnitz"],
    },
    alternates: {
      canonical: `https://defuse.digital/blog/${slug}`,
    },
  };
}

function BlogPostingJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "defuse. digital",
      url: "https://defuse.digital",
    },
    publisher: {
      "@type": "Organization",
      name: "defuse. digital",
      url: "https://defuse.digital",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://defuse.digital/blog/${post.slug}`,
    },
    wordCount: post.content
      .filter((b): b is { type: "paragraph"; text: string } => b.type === "paragraph")
      .reduce((acc, b) => acc + b.text.split(" ").length, 0),
    articleSection: post.category,
    inLanguage: "de-DE",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbJsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://defuse.digital" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://defuse.digital/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://defuse.digital/blog/${post.slug}` },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function RenderBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base md:text-[17px] text-gray-600 leading-[1.9] font-medium">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-16 mb-4">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight mt-10 mb-3">
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="my-10 -mx-6 md:-mx-16">
          <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-center text-xs text-gray-400 font-medium px-6">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote className="my-12 py-8 pl-8 border-l-[3px] border-gray-900">
          <p className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug tracking-tight">
            {block.text}
          </p>
          {block.author && (
            <cite className="block mt-4 text-sm text-gray-400 not-italic font-medium">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-4 my-6">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 text-base md:text-[17px] text-gray-600 font-medium leading-relaxed"
            >
              <span className="text-gray-900 mt-0.5 shrink-0 font-extrabold text-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="my-8 rounded-2xl overflow-hidden bg-gray-950 -mx-6 md:-mx-16">
          <div className="flex items-center gap-2 px-6 py-3.5 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="ml-auto text-[10px] text-gray-600 font-mono uppercase tracking-wider">
              {block.language}
            </span>
          </div>
          <pre className="p-6 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono leading-relaxed">
              {block.code}
            </code>
          </pre>
        </div>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl bg-gray-950 -mx-6 md:-mx-16">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] whitespace-nowrap border-b border-white/5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-white/5">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-6 py-4 text-gray-400 font-medium leading-relaxed"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const nextPost = sortedPosts[currentIndex + 1];
  const prevPost = sortedPosts[currentIndex - 1];

  const related = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== slug
  ).slice(0, 3);

  return (
    <>
      <BlogPostingJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-28 pb-6 px-6">
          <div className="max-w-4xl mx-auto">
            <ol className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Startseite
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li>
                <Link href="/blog" className="hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">/</li>
              <li className="text-gray-600 truncate max-w-[250px]">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero — clean typography on white, like homepage hero */}
        <section className="pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="px-3.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-sm text-gray-400 font-medium">
                {formatDate(post.date)}
              </time>
              <span className="text-sm text-gray-400 font-medium">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.0] mb-10">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Cover Image — edge-to-edge within container */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[300px] sm:h-[400px] md:h-[520px] rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="pb-20 px-6">
          <div className="max-w-3xl mx-auto space-y-5">
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>
        </article>

        {/* Author */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto border-t border-gray-200/60 pt-12">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 0C16 8.83656 8.83656 16 0 16C8.83656 16 16 23.1634 16 32C16 23.1634 23.1634 16 32 16C23.1634 16 16 8.83656 16 0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-extrabold text-gray-900 tracking-tight">
                  defuse. digital
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Digitalagentur aus Chemnitz — Webdesign, SEO & Deep Tech
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="px-6 pb-20">
            <div className="max-w-6xl mx-auto">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
                Weiterlesen
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
                Mehr zu {post.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <article key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="group block"
                    >
                      <div className="relative h-[240px] rounded-2xl overflow-hidden mb-5">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                          {r.category}
                        </span>
                        <span className="text-[10px] text-gray-300 font-medium">
                          {r.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-2 leading-snug group-hover:text-gray-600 transition-colors">
                        {r.title}
                      </h3>
                      <time
                        dateTime={r.date}
                        className="text-xs text-gray-400 font-medium"
                      >
                        {formatDate(r.date)}
                      </time>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Post Navigation */}
        <section className="px-6 pb-20">
          <div className="max-w-3xl mx-auto border-t border-gray-200/60 pt-12">
            <div className="flex flex-col sm:flex-row justify-between gap-10">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex-1"
                >
                  <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    <ArrowLeft className="w-3 h-3" /> Neuerer Artikel
                  </span>
                  <span className="text-base font-extrabold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug tracking-tight block">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex-1 text-right"
                >
                  <span className="flex items-center justify-end gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Älterer Artikel <ArrowRight className="w-3 h-3" />
                  </span>
                  <span className="text-base font-extrabold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug tracking-tight block">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto bg-gray-950 rounded-3xl p-12 md:p-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Bereit loszulegen?
            </h2>
            <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
              Wir setzen um, worüber andere nur bloggen. Digitalagentur aus
              Chemnitz für ganz Sachsen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Projekt starten
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
