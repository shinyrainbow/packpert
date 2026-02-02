import { FileText, Calendar, ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";

interface BlogSection {
  id: string;
  imageUrl: string | null;
}

interface Blog {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  excerpt: string | null;
  excerptEn: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  sections: BlogSection[];
}

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const locale = await getLocale();

  // Fetch blogs directly from database
  let blogs: Blog[] = [];
  try {
    blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        excerpt: true,
        excerptEn: true,
        isPublished: true,
        publishedAt: true,
        sections: {
          orderBy: { order: "asc" },
          take: 1,
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedExcerpt = (blog: Blog) => {
    if (locale === "en") {
      return blog.excerptEn || "";
    }
    return blog.excerpt;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(
      locale === "th" ? "th-TH" : locale === "zh" ? "zh-CN" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const featuredBlog = blogs[0];
  const restBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-primary -mt-20">
        <div className="container mx-auto px-2">
          <div className="max-w-3xl">
            <p className="text-accent text-xs uppercase tracking-widest mb-3">BLOG & NEWS</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-gray-300">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-2">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-700 text-lg mb-2">{t("noBlogs")}</p>
              <p className="text-gray-500 text-sm mb-6">
                {locale === "th" ? "กลับมาดูใหม่ภายหลัง" : "Check back later for updates"}
              </p>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                {t("backHome")}
              </Link>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Main Content */}
              <div className="space-y-6">
                {/* Featured Blog */}
                {featuredBlog && (
                  <Link
                    href={`/${locale}/blog/${featuredBlog.slug}`}
                    className="group block"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all">
                      <div className="relative h-72 md:h-96 overflow-hidden">
                        {featuredBlog.sections[0]?.imageUrl ? (
                          <Image
                            src={featuredBlog.sections[0].imageUrl}
                            alt={getLocalizedTitle(featuredBlog)}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 66vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <FileText className="w-20 h-20 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                            FEATURED
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {getLocalizedTitle(featuredBlog)}
                        </h2>
                        {getLocalizedExcerpt(featuredBlog) && (
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                            {getLocalizedExcerpt(featuredBlog)}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-gray-400 text-xs">
                          {featuredBlog.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(featuredBlog.publishedAt)}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-accent">
                            {t("readMore")}
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Rest of Blogs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restBlogs.map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={`/${locale}/blog/${blog.slug}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/50 transition-all h-full">
                        <div className="relative h-44 overflow-hidden">
                          {blog.sections[0]?.imageUrl ? (
                            <Image
                              src={blog.sections[0].imageUrl}
                              alt={getLocalizedTitle(blog)}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              loading={index < 2 ? "eager" : "lazy"}
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <FileText className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                            {getLocalizedTitle(blog)}
                          </h3>
                          {getLocalizedExcerpt(blog) && (
                            <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                              {getLocalizedExcerpt(blog)}
                            </p>
                          )}
                          {blog.publishedAt && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Calendar className="w-3 h-3" />
                              {formatDate(blog.publishedAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
