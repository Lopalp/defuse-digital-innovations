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
        <p className="text-base text-gray-600 leading-[1.85] font-medium">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-12 mb-3">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mt-8 mb-2">
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="my-6">
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-xs text-gray-400 font-medium">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <blockquote className="my-8 pl-6 border-l-2 border-gray-900">
          <p className="text-lg font-serif italic text-gray-700 leading-relaxed">
            {block.text}
          </p>
          {block.author && (
            <cite className="block mt-3 text-sm text-gray-400 not-italic font-medium">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-3 my-4">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-base text-gray-600 font-medium leading-relaxed"
            >
              <span className="text-gray-300 mt-0.5 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="my-6 rounded-2xl overflow-hidden bg-gray-950">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <span className="ml-auto text-xs text-gray-500 font-mono">
              {block.language}
            </span>
          </div>
          <pre className="p-5 overflow-x-auto">
            <code className="text-sm text-gray-300 font-mono leading-relaxed">
              {block.code}
            </code>
          </pre>
        </div>
      );
    case "table":
      return (
        <div className="my-6 overflow-x-auto rounded-2xl border border-gray-200/60 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-[0.05em] whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-gray-100">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-5 py-3.5 text-gray-600 font-medium leading-relaxed"
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

  // Related posts (same category, exclude current)
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
        <nav
          aria-label="Breadcrumb"
          className="pt-28 pb-4 px-6"
        >
          <div className="max-w-3xl mx-auto">
            <ol className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Startseite
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-600 truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-4 pb-10 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                {post.category}
              </span>
              <time dateTime={post.date} className="text-xs text-gray-400 font-medium">
                {formatDate(post.date)}
              </time>
              <span className="text-xs text-gray-400 font-medium">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-8">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Cover Image */}
        <section className="pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[280px] md:h-[480px] rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="pb-16 px-6">
          <div className="max-w-3xl mx-auto space-y-5">
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>
        </article>

        {/* Author */}
        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto border-t border-gray-200/60 pt-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-white"
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
                <p className="text-sm font-extrabold text-gray-900">
                  defuse. digital
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Digitalagentur aus Chemnitz — Webdesign, SEO & Deep Tech
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="px-6 pb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight mb-8">
                Weitere Artikel zu {post.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <article key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={r.image}
                          alt={r.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-extrabold text-gray-900 tracking-tight mb-2 leading-snug group-hover:text-gray-700 transition-colors">
                          {r.title}
                        </h3>
                        <time
                          dateTime={r.date}
                          className="text-xs text-gray-400 font-medium"
                        >
                          {formatDate(r.date)}
                        </time>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Post Navigation */}
        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto border-t border-gray-200/60 pt-10">
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex-1"
                >
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] mb-2 block">
                    Neuerer Artikel
                  </span>
                  <span className="text-sm font-extrabold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
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
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] mb-2 block">
                    Älterer Artikel
                  </span>
                  <span className="text-sm font-extrabold text-gray-900 group-hover:text-gray-600 transition-colors leading-snug">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Bereit loszulegen?
            </h2>
            <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
              Wir setzen um, worüber andere nur bloggen. Digitalagentur aus
              Chemnitz für ganz Sachsen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Projekt besprechen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
