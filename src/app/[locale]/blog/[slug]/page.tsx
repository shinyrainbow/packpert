"use client";

import { useEffect, useState, use } from "react";
import { FileText, ArrowLeft, Home, Facebook, Link2, MessageCircle, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";

interface BlogSection {
  id: string;
  order: number;
  imageUrl: string | null;
  imagePosition: "left" | "right";
  content: string | null;
  contentEn: string | null;
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
  publishedAt: string | null;
  sections: BlogSection[];
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const t = useTranslations("blog");
  const locale = useLocale();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/public/blog/${resolvedParams.slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [resolvedParams.slug]);

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedContent = (section: BlogSection) => {
    if (locale === "en") {
      return section.contentEn || section.content;
    }
    return section.content;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(
      locale === "th"
        ? "th-TH"
        : locale === "zh"
        ? "zh-CN"
        : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString(
      locale === "th" ? "th-TH" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const handleShare = async (platform?: string) => {
    const url = window.location.href;
    const title = blog ? getLocalizedTitle(blog) : "";

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "x") {
      window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
    } else if (platform === "line") {
      window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, "_blank");
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="h-16" />

        {/* Breadcrumb Skeleton */}
        <div className="bg-[#0d1117] py-4 border-b border-white/10">
          <div className="container mx-auto px-2">
            <div className="flex items-center gap-2 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-12" />
              <div className="h-4 bg-gray-700 rounded w-1" />
              <div className="h-4 bg-gray-700 rounded w-12" />
              <div className="h-4 bg-gray-700 rounded w-1" />
              <div className="h-4 bg-gray-700 rounded w-32" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-2">
            <div className="max-w-4xl mx-auto">
              {/* Article Content Skeleton */}
              <article className="animate-pulse">
                {/* Header Skeleton */}
                <header className="mb-8">
                  <div className="h-10 bg-gray-200 rounded mb-4 w-3/4" />
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/2" />

                  {/* Meta Info Skeleton */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>

                  {/* Social Share Skeleton */}
                  <div className="flex items-center gap-2 pb-6 border-b border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-12" />
                    <div className="w-9 h-9 bg-gray-200 rounded-lg" />
                    <div className="w-9 h-9 bg-gray-200 rounded-lg" />
                    <div className="w-9 h-9 bg-gray-200 rounded-lg" />
                    <div className="w-9 h-9 bg-gray-200 rounded-lg" />
                  </div>
                </header>

                {/* Article Content Card Skeleton */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  {/* Content Skeleton */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-4/5" />
                    </div>
                    <div className="my-8 h-64 bg-gray-200 rounded-lg" />
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="h-16" />
        <div className="container mx-auto px-2 py-20 text-center bg-gray-50">
          <FileText className="w-20 h-20 mx-auto text-gray-600 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t("notFound")}
          </h1>
          <p className="text-gray-400 mb-8">
            {t("notFoundDesc")}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={`/${locale}/blog`} className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToBlog")}
            </Link>
            <Link href={`/${locale}`} className="inline-flex items-center px-4 py-2 bg-[#C9A227] text-white rounded-lg hover:bg-[#b8922a] transition-colors">
              <Home className="w-4 h-4 mr-2" />
              {t("backHome")}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-primary -mt-16">
        <div
          className={`container mx-auto px-2 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
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

      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-2">
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/${locale}`} className="text-gray-500 hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${locale}/blog`} className="text-gray-500 hover:text-primary transition-colors">
              {t("blog")}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary truncate max-w-[200px]">{getLocalizedTitle(blog)}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-2">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <div>
              <article
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                {/* Article Header */}
                <header className="mb-8">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {getLocalizedTitle(blog)}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#C9A227] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[#111928]" />
                      </div>
                      <span>{t("author")}</span>
                    </div>
                    {blog.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#C9A227]" />
                        <span>{formatDateTime(blog.publishedAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-2 pb-6 border-b border-white/10">
                    <span className="text-gray-400 text-sm mr-2">{t("share")}:</span>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-9 h-9 bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <Facebook className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleShare("x")}
                      className="w-9 h-9 bg-black rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleShare("line")}
                      className="w-9 h-9 bg-[#00B900] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleShare()}
                      className="w-9 h-9 bg-[#1F2937] border border-white/20 rounded-lg flex items-center justify-center hover:border-[#C9A227] hover:text-[#C9A227] transition-all text-gray-400"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                  </div>
                </header>

                {/* Article Content Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  {/* Article Sections */}
                  <div className="space-y-8">
                    {blog.sections.map((section, index) => (
                      <div
                        key={section.id}
                        className={`transition-all duration-700 ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                        }`}
                        style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                      >
                        {/* Section with Image - Side by Side Layout */}
                        {section.imageUrl ? (
                          <div className={`flex flex-col ${section.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-6 items-start`}>
                            {/* Section Image */}
                            <div className="w-full md:w-1/2 shrink-0">
                              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                                <Image
                                  src={section.imageUrl}
                                  alt={`Section ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            {/* Section Content */}
                            {getLocalizedContent(section) && (
                              <div className="w-full md:w-1/2">
                                <div
                                  className="blog-content"
                                  dangerouslySetInnerHTML={{
                                    __html: getLocalizedContent(section)?.replace(/\n/g, "<br />") || "",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Section without Image - Full Width Content */
                          getLocalizedContent(section) && (
                            <div
                              className="blog-content"
                              dangerouslySetInnerHTML={{
                                __html: getLocalizedContent(section)?.replace(/\n/g, "<br />") || "",
                              }}
                            />
                          )
                        )}
                      </div>
                    ))}

                    {/* No sections message */}
                    {blog.sections.length === 0 && (
                      <div className="text-center py-12 text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>This blog post has no content yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Share */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm">{t("shareArticle")}</span>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-8 h-8 bg-[#1877F2] rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <Facebook className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        onClick={() => handleShare("x")}
                        className="w-8 h-8 bg-black rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleShare("line")}
                        className="w-8 h-8 bg-[#00B900] rounded flex items-center justify-center hover:opacity-80 transition-opacity"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    <Link href={`/${locale}/blog`} className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-colors">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("backToBlog")}
                    </Link>
                  </div>
                </div>
              </article>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
