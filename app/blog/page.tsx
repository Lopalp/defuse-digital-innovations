import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS, formatDate } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — defuse.",
  description:
    "Insights zu Webentwicklung, Deep Tech, Performance und SEO. Praxis-Wissen von Entwicklern für Entscheider.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Blog
            </h1>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
              Praxis-Wissen, keine Theorie. Wir schreiben über das, was wir
              jeden Tag bauen.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-3/5 h-72 md:h-[420px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {formatDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all">
                      Lesen <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Post Grid */}
        <section className="pb-40 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-300">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-gray-400 font-medium">
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
