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
  };
}

function RenderBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base text-gray-600 leading-[1.8] font-medium">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-8 mb-2">
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="my-4">
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
        <blockquote className="my-4 pl-6 border-l-2 border-gray-900">
          <p className="text-lg font-serif italic text-gray-700 leading-relaxed">
            {block.text}
          </p>
          {block.author && (
            <cite className="block mt-2 text-sm text-gray-400 not-italic font-medium">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-2 my-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-base text-gray-600 font-medium leading-relaxed"
            >
              <span className="text-gray-300 mt-1 shrink-0">—</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="my-4 rounded-2xl overflow-hidden bg-gray-950">
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
        <div className="my-4 overflow-x-auto rounded-2xl border border-gray-200/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-[0.05em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-gray-100"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-5 py-3 text-gray-600 font-medium leading-relaxed"
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

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const nextPost = BLOG_POSTS[currentIndex + 1];
  const prevPost = BLOG_POSTS[currentIndex - 1];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" /> Alle Artikel
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {formatDate(post.date)}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-8">
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
            <div className="relative h-[300px] md:h-[480px] rounded-2xl overflow-hidden">
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
        <section className="pb-24 px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>
        </section>

        {/* Post Navigation */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto border-t border-gray-200/60 pt-12">
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex-1"
                >
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-[0.1em] mb-2 block">
                    Vorheriger Artikel
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
                    Nächster Artikel
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
              Wir setzen um, worüber andere nur bloggen.
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
