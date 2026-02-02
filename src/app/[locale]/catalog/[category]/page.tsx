import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ category: string }>;
}

const categoryBanners: Record<string, string> = {
  stickTube: "/product-catalog/2Stick tube.png",
  creamTube: "/product-catalog/1creamTube.png",
  jar: "/product-catalog/4Jar.png",
  pumpBottle: "/product-catalog/3Bottle.png",
  serumBottle: "/product-catalog/5Serum bottle.png",
  lip: "/product-catalog/6Lip.png",
  cosmetics: "/product-catalog/7Cosmetics.png",
};

const categoryLineUrls: Record<string, string> = {
  creamTube: "https://lin.ee/n9h5cHB",
  stickTube: "https://lin.ee/izvk1yr",
  pumpBottle: "https://lin.ee/VlwOT7X",
  jar: "https://lin.ee/z6zl8GV",
  serumBottle: "https://lin.ee/GhuPtHq",
  lip: "https://lin.ee/aA2U9au",
  cosmetics: "https://lin.ee/hjAy4CO",
};

const categoryImages: Record<string, { folder: string; files: string[] }> = {
  stickTube: {
    folder: "หลอดสติ๊ก",
    files: ["35.png","36.png","37.png","38.png","39.png","40.png","41.png","42.png","43.png","44.png"],
  },
  creamTube: {
    folder: "หลอดครีม",
    files: ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png","21.png","22.png","23.png","24.png","25.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png","33.png","34.png","35.png"],
  },
  jar: {
    folder: "กระปุก",
    files: ["102.png","103.png","104.png","105.png","106.png","107.png","111.png","112.png","113.png","114.png","115.png","116.png","117.png","118.png","119.png","120.png","121.png","122.png"],
  },
  pumpBottle: {
    folder: "ขวดปั๊ม",
    files: ["45.png","46.png","47.png","48.png","49.png","50.png","51.png","52.png","53.png","54.png","55.png","56.png","57.png","58.png","59.png","60.png","61.png","62.png","63.png","64.png","65.png","66.png","67.png","68.png","69.png","70.png","71.png","72.png","73.png","74.png","75.png","76.png","77.png","78.png","79.png","80.png","81.png","82.png","83.png","84.png","85.png","86.png","87.png","88.png","89.png","90.png","91.png","92.png","93.png","94.png","95.png","96.png","97.png","98.png"],
  },
  serumBottle: {
    folder: "ขวดเซรั่ม",
    files: ["123.png","124.png","125.png","126.png","127.png","128.png","129.png","130.png","131.png","132.png","133.png","134.png"],
  },
  lip: {
    folder: "ลิป",
    files: ["135.png","136.png","137.png","138.png","139.png","140.png","141.png","142.png","143.png","144.png","145.png","146.png","147.png","148.png","149.png","150.png","151.png","152.png"],
  },
  cosmetics: {
    folder: "เครื่องสำอางค์",
    files: ["99.png","100.png","101.png","108.png","109.png","110.png"],
  },
};

export default async function CategoryDetailPage({ params }: Props) {
  const { category } = await params;
  const locale = await getLocale();
  const t = await getTranslations("catalog");
  const tcommon = await getTranslations("common");
  const th = await getTranslations("home");

  const data = categoryImages[category];

  // Fetch latest published blogs
  let blogs: Array<{
    id: string;
    title: string;
    titleEn: string | null;
    slug: string;
    excerpt: string | null;
    excerptEn: string | null;
    publishedAt: Date | null;
    sections: Array<{ imageUrl: string | null }>;
  }> = [];

  try {
    blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        titleEn: true,
        slug: true,
        excerpt: true,
        excerptEn: true,
        publishedAt: true,
        sections: {
          orderBy: { order: "asc" },
          take: 1,
          select: { imageUrl: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  const getLocalizedTitle = (blog: (typeof blogs)[0]) => {
    if (locale === "en") {
      return blog.titleEn || blog.title;
    }
    return blog.title;
  };

  const getLocalizedExcerpt = (blog: (typeof blogs)[0]) => {
    if (locale === "en") {
      return blog.excerptEn || "";
    }
    return blog.excerpt;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString(locale === "th" ? "th-TH" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!data) {
    return (
      <>
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 -mt-20 pt-28">
          <div className="container-custom">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          </div>
        </section>
        <section className="section-padding bg-white min-h-[60vh]">
          <div className="container-custom text-center py-12">
            <p className="text-muted mb-6">Category not found.</p>
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {tcommon("viewAll")}
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section with Banner */}
      <section className="relative text-white h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden -mt-16">
        <img
          src={categoryBanners[category]}
          alt={t(`${category}Alt`)}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 leading-tight">
              {t(`${category}H1`)}
            </h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {th("lineDiscount")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {th("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-headline Section */}
      <section className="bg-secondary py-6">
        <div className="container-custom px-8 md:px-12 lg:px-16">
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            {t(`${category}Subheadline`)}
          </p>
        </div>
      </section>

      {/* Back link + Images Grid */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom">
          <Link
            href={`/${locale}/catalog`}
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {tcommon("viewAll")}
          </Link>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.files.map((file) => (
              <a
                key={file}
                href={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
              >
                <img
                  src={`/catalog/${encodeURIComponent(data.folder)}/${file}`}
                  alt={`${t(category)} - ${file}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Production Steps Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("productionStepsTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="flex flex-col items-center text-center">
                <img
                  src={`/icons/ขั้นตอนผลิต${num}.png`}
                  alt={t(`prodStep${num}`)}
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-3"
                />
                <p className="text-sm font-medium text-gray-700">{t(`prodStep${num}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {th("articlesTitle")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {th("articlesDesc")}
            </p>
          </div>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/${locale}/blog/${blog.slug}`}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
                >
                  <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                    {blog.sections[0]?.imageUrl ? (
                      <img
                        src={blog.sections[0].imageUrl}
                        alt={getLocalizedTitle(blog)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {blog.publishedAt && (
                      <p className="text-xs text-muted mb-2">{formatDate(blog.publishedAt)}</p>
                    )}
                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2 group-hover:text-primary/80 transition-colors">
                      {getLocalizedTitle(blog)}
                    </h3>
                    {getLocalizedExcerpt(blog) && (
                      <p className="text-muted text-sm line-clamp-2">
                        {getLocalizedExcerpt(blog)}
                      </p>
                    )}
                    <span className="mt-4 inline-block text-primary font-medium text-sm group-hover:underline">
                      {tcommon("readMore")} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted">{locale === "th" ? "ยังไม่มีบทความ" : "No articles yet"}</p>
            </div>
          )}
          {blogs.length > 0 && (
            <div className="text-center mt-8">
              <Link href={`/${locale}/blog`} className="btn-primary">
                {tcommon("viewAll")}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Catalogs Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("otherCatalogs")}
            </h2>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { image: "1creamtube.png", key: "creamTube", value: "creamTube" },
              { image: "2stick.png", key: "stickTube", value: "stickTube" },
              { image: "3bottle.png", key: "pumpBottle", value: "pumpBottle" },
              { image: "4cosmetic.png", key: "cosmetics", value: "cosmetics" },
              { image: "5jar.png", key: "jar", value: "jar" },
              { image: "6serum.png", key: "serumBottle", value: "serumBottle" },
              { image: "7lip.png", key: "lip", value: "lip" },
            ]
              .filter((item) => item.value !== category)
              .map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}/catalog/${item.value}`}
                  className="group"
                >
                  <div className="rounded-xl overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={`/other-catalog/${item.image}`}
                      alt={t(item.key)}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-center font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {t(item.key)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
