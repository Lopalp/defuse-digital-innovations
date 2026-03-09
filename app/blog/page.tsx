import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS, formatDate } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — defuse. | Webdesign, SEO & Deep Tech aus Chemnitz",
  description:
    "Praxis-Wissen zu Webdesign, SEO, Performance und Deep Tech. Tipps für Unternehmen aus Chemnitz, Dresden und Sachsen — von Entwicklern, die jeden Tag bauen.",
  openGraph: {
    title: "Blog — defuse. | Webdesign, SEO & Deep Tech aus Chemnitz",
    description:
      "Praxis-Wissen zu Webdesign, SEO, Performance und Deep Tech. Tipps für Unternehmen aus Chemnitz, Dresden und Sachsen.",
    type: "website",
    locale: "de_DE",
  },
  alternates: {
    canonical: "https://defuse.digital/blog",
  },
};

const sortedPosts = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">
              Insights & Expertise
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95]">
              Blog
            </h1>
            <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-xl font-medium leading-relaxed">
              Praxis-Wissen, keine Theorie. Geschrieben von Entwicklern
              aus Chemnitz, die jeden Tag bauen.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="relative w-full md:w-3/5 h-[320px] md:h-[480px] rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
                <div className="md:w-2/5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3.5 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-8 font-medium">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <time
                      dateTime={featured.date}
                      className="text-xs text-gray-400 font-medium"
                    >
                      {formatDate(featured.date)}
                    </time>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all">
                      Lesen <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-t border-gray-200/60" />
        </div>

        {/* Post Grid — image above, text below on clean bg */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
              {rest.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <div className="relative h-[240px] md:h-[280px] rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-gray-300 font-medium">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-gray-900 tracking-tight mb-2 leading-snug group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 font-medium">
                      {post.excerpt}
                    </p>
                    <time
                      dateTime={post.date}
                      className="text-xs text-gray-400 font-medium"
                    >
                      {formatDate(post.date)}
                    </time>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto bg-gray-950 rounded-3xl p-12 md:p-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
              Projekt im Kopf?
            </h2>
            <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">
              Wir setzen um, worüber andere nur bloggen. Digitalagentur aus
              Chemnitz für Unternehmen in ganz Sachsen.
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
