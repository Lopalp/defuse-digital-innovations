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

// Sort posts newest first
const sortedPosts = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts;

  // Group remaining posts by year
  const postsByYear: Record<string, typeof rest> = {};
  for (const post of rest) {
    const year = new Date(post.date).getFullYear().toString();
    if (!postsByYear[year]) postsByYear[year] = [];
    postsByYear[year].push(post);
  }
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Blog
            </h1>
            <p className="mt-8 text-lg text-gray-500 max-w-2xl font-medium leading-relaxed">
              Praxis-Wissen, keine Theorie. Webdesign, SEO, Performance und
              Deep Tech — geschrieben von Entwicklern aus Chemnitz, die jeden
              Tag bauen.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-full">
                Alle
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-white border border-gray-200/60 text-gray-600 text-xs font-bold rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.15em] mb-6">
              Neuester Artikel
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-3/5 h-72 md:h-[440px]">
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
                  <div className="flex items-center gap-3 mb-6">
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
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
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

        {/* Posts by Year */}
        {years.map((year) => (
          <section key={year} className="pb-16 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-extrabold tracking-tight mb-8">
                {year}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsByYear[year].map((post) => (
                  <article key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-white border border-gray-200/60 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-300 font-medium">
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-gray-900 tracking-tight mb-2 leading-snug group-hover:text-gray-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <time
                          dateTime={post.date}
                          className="text-xs text-gray-400 font-medium"
                        >
                          {formatDate(post.date)}
                        </time>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Projekt im Kopf?
            </h2>
            <p className="text-gray-400 font-medium mb-8 max-w-md mx-auto">
              Wir setzen um, worüber andere nur bloggen. Digitalagentur aus
              Chemnitz für Unternehmen in ganz Sachsen.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Kostenlos beraten lassen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
