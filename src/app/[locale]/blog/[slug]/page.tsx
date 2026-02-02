import { FileText, ArrowLeft, Home, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import CatalogTabs from "@/components/CatalogTabs";

interface BlogSection {
  id: string;
  order: number;
  imageUrl: string | null;
  imagePosition: string;
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
  publishedAt: Date | null;
  catalogType: string | null;
  sections: BlogSection[];
}

interface ImageData {
  path: string;
  altText: string;
}

interface SubfolderData {
  name: string;
  nameTh: string;
  nameEn: string;
  images: ImageData[];
}

interface CategoryData {
  folder: string;
  hasSubfolders: boolean;
  subfolders?: SubfolderData[];
  images?: ImageData[];
}

const lineUrl = "https://lin.ee/m78GUGI";

// Import alt-text mapping from JSON
import altTextMapping from "@/../public/catalog/alt-text-mapping.json";

const categoryData: Record<string, CategoryData> = {
  creamTube: {
    folder: "Cream tube",
    hasSubfolders: true,
    subfolders: [
      {
        name: "หลอดกลม - Round Tube",
        nameTh: "หลอดกลม",
        nameEn: "Round Tube",
        images: altTextMapping["Cream tube/หลอดกลม - Round Tube"] as ImageData[],
      },
      {
        name: "หลอดรี - Oval Tube",
        nameTh: "หลอดรี",
        nameEn: "Oval Tube",
        images: altTextMapping["Cream tube/หลอดรี - Oval Tube"] as ImageData[],
      },
    ],
  },
  stickTube: {
    folder: "Stick Tube",
    hasSubfolders: false,
    images: altTextMapping["Stick Tube"] as ImageData[],
  },
  bottle: {
    folder: "Bottle",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Pump bottle - ขวดปั๊ม",
        nameTh: "ขวดปั๊ม",
        nameEn: "Pump Bottle",
        images: altTextMapping["Bottle/Pump bottle - ขวดปั๊ม"] as ImageData[],
      },
      {
        name: "Press bottle - ขวดฝากด",
        nameTh: "ขวดฝากด",
        nameEn: "Press Bottle",
        images: altTextMapping["Bottle/Press bottle - ขวดฝากด"] as ImageData[],
      },
      {
        name: "Airless bottle - ขวดสูญญากาศ",
        nameTh: "ขวดสูญญากาศ",
        nameEn: "Airless Bottle",
        images: altTextMapping["Bottle/Airless bottle - ขวดสูญญากาศ"] as ImageData[],
      },
    ],
  },
  jar: {
    folder: "Jar",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Cream jar กระปุกครีม",
        nameTh: "กระปุกครีม",
        nameEn: "Cream Jar",
        images: altTextMapping["Jar/Cream jar กระปุกครีม"] as ImageData[],
      },
      {
        name: "Toner pad jar กระปุกโทนเนอร์แพด",
        nameTh: "กระปุกโทนเนอร์แพด",
        nameEn: "Toner Pad Jar",
        images: altTextMapping["Jar/Toner pad jar กระปุกโทนเนอร์แพด"] as ImageData[],
      },
    ],
  },
  serumBottle: {
    folder: "Serum Bottle",
    hasSubfolders: false,
    images: altTextMapping["Serum Bottle"] as ImageData[],
  },
  lip: {
    folder: "Lip",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Lip Gloss ลิปกลอส",
        nameTh: "ลิปกลอส",
        nameEn: "Lip Gloss",
        images: altTextMapping["Lip/Lip Gloss ลิปกลอส"] as ImageData[],
      },
      {
        name: "Lipstick ลิปสติก",
        nameTh: "ลิปสติก",
        nameEn: "Lipstick",
        images: altTextMapping["Lip/Lipstick ลิปสติก"] as ImageData[],
      },
    ],
  },
  cosmetics: {
    folder: "Powder case",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Powder case ตลับแป้ง",
        nameTh: "ตลับแป้ง",
        nameEn: "Powder Case",
        images: altTextMapping["Powder case/Powder case ตลับแป้ง"] as ImageData[],
      },
      {
        name: "Cushion case ตลับคุชชั่น",
        nameTh: "ตลับคุชชั่น",
        nameEn: "Cushion Case",
        images: altTextMapping["Powder case/Cushion case ตลับคุชชั่น"] as ImageData[],
      },
    ],
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("blog");
  const locale = await getLocale();

  // Fetch blog directly from database
  let blog: Blog | null = null;
  try {
    blog = await prisma.blog.findUnique({
      where: { slug },
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
        catalogType: true,
        sections: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            order: true,
            imageUrl: true,
            imagePosition: true,
            content: true,
            contentEn: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  // Return 404 if blog not found or not published
  if (!blog || !blog.isPublished) {
    notFound();
  }

  const getLocalizedTitle = (blog: Blog) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedContent = (section: BlogSection) => {
    if (locale === "en") {
      return section.contentEn || "";
    }
    return section.content;
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
              <article>
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
                  <div className="pb-6 border-b border-white/10">
                    <ShareButtons title={getLocalizedTitle(blog)} shareLabel={t("share")} />
                  </div>
                </header>

                {/* Article Content Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  {/* Article Sections */}
                  <div className="space-y-8">
                    {blog.sections.map((section, index) => (
                      <div key={section.id}>
                        {/* Section with Image - Side by Side Layout */}
                        {section.imageUrl ? (
                          <div
                            className={`flex flex-col ${
                              section.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
                            } gap-6 items-start`}
                          >
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
                    <ShareButtons
                      title={getLocalizedTitle(blog)}
                      shareLabel={t("shareArticle")}
                      size="sm"
                    />
                    <Link
                      href={`/${locale}/blog`}
                      className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-colors"
                    >
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

      {/* Related Catalog Section */}
      {blog.catalogType && categoryData[blog.catalogType] && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-2">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">
                {locale === "th" ? "สินค้าที่เกี่ยวข้อง" : "Related Products"}
              </h2>

              {categoryData[blog.catalogType].hasSubfolders && categoryData[blog.catalogType].subfolders ? (
                <CatalogTabs
                  tabs={categoryData[blog.catalogType].subfolders!}
                  lineUrl={lineUrl}
                  locale={locale}
                />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categoryData[blog.catalogType].images?.map((image) => (
                    <a
                      key={image.path}
                      href={lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
                    >
                      <Image
                        src={image.path}
                        alt={image.altText}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  ))}
                </div>
              )}

              {/* Link to full catalog and request quote */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link
                  href={`/${locale}/catalog/${blog.catalogType}`}
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {locale === "th" ? "ดูแคตตาล็อกทั้งหมด" : "View Full Catalog"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary border border-primary px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {locale === "th" ? "ขอใบเสนอราคา" : "Request Quote"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
