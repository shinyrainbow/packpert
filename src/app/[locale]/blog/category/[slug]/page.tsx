import { FileText, Calendar, ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface BlogSection {
  id: string;
  imageUrl: string | null;
  content: string | null;
  contentEn: string | null;
}

interface BlogCategory {
  id: string;
  name: string;
  nameEn: string | null;
  slug: string;
  color: string;
}

interface Blog {
  id: string;
  title: string;
  titleEn: string | null;
  slug: string;
  excerpt: string | null;
  excerptEn: string | null;
  coverImage: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  sections: BlogSection[];
  category: BlogCategory | null;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: categorySlug } = await params;
  const t = await getTranslations("blog");
  const locale = await getLocale();

  // Fetch category
  let category: BlogCategory | null = null;
  let blogs: Blog[] = [];

  try {
    category = await prisma.blogCategory.findUnique({
      where: { slug: categorySlug },
    });

    if (category) {
      blogs = await prisma.blog.findMany({
        where: {
          isPublished: true,
          categoryId: category.id,
        },
        orderBy: { publishedAt: "desc" },
        select: {
          id: true,
          title: true,
          titleEn: true,
          slug: true,
          excerpt: true,
          excerptEn: true,
          coverImage: true,
          isPublished: true,
          publishedAt: true,
          sections: {
            orderBy: { order: "asc" },
            take: 1,
            select: {
              id: true,
              imageUrl: true,
              content: true,
              contentEn: true,
            },
          },
          category: true,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching category and blogs:", error);
  }

  if (!category) {
    notFound();
  }

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedExcerpt = (blog: Blog) => {
    if (locale === "en") {
      return blog.excerptEn || blog.excerpt;
    }
    return blog.excerpt;
  };

  const getLocalizedCategoryName = (cat: BlogCategory) => {
    if (locale === "en") {
      return cat.nameEn || cat.name;
    }
    return cat.name;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-primary -mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Link
              href={`/${locale}/blog`}
              className="text-accent text-xs uppercase tracking-widest mb-3 inline-flex items-center gap-2 hover:underline"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              BACK TO BLOG
            </Link>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 text-white"
              style={{ backgroundColor: category.color }}
            >
              {getLocalizedCategoryName(category)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {getLocalizedCategoryName(category)}
            </h1>
            <p className="text-gray-300">
              {blogs.length} {blogs.length === 1 ? "post" : "posts"} in this category
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-700 text-lg mb-2">No blog posts in this category yet</p>
              <p className="text-gray-500 text-sm mb-6">Check back later for updates</p>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/${locale}/blog/${blog.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {blog.coverImage || blog.sections[0]?.imageUrl ? (
                        <Image
                          src={blog.coverImage || blog.sections[0]?.imageUrl || ""}
                          alt={getLocalizedTitle(blog)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <FileText className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                      {blog.category && (
                        <div className="absolute top-3 right-3">
                          <span
                            className="px-2 py-1 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: blog.category.color }}
                          >
                            {getLocalizedCategoryName(blog.category)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {getLocalizedTitle(blog)}
                      </h3>

                      {getLocalizedExcerpt(blog) && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
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
          )}
        </div>
      </section>
    </div>
  );
}
