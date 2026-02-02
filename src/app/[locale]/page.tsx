import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("hero");
  const th = await getTranslations("home");
  const tp = await getTranslations("portfolio");
  const tcommon = await getTranslations("common");
  const ta = await getTranslations("about");
  const tc = await getTranslations("catalog");

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

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center -mt-20 pt-20 pb-32"
      >
        {/* Background Image */}
        <img
          src="/main-banner.png"
          alt="Packpert Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(255, 255, 255, 1) 100%)" }}
        />
        <div className="w-full px-8 lg:px-20 relative z-10 bg-pink">
          <div className="max-w-md text-white text-left lg:ml-16">
            <h1 className="text-3xl lg:text-5xl font-bold mb-2 leading-tight animate-fade-in-up whitespace-nowrap">
              {t("title")}
            </h1>
            {t("subtitle") && (
              <h1 className="text-xl lg:text-xl font-bold mb-6 leading-tight animate-fade-in-up-delay-1">
                {t("subtitle")}
              </h1>
            )}

            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
              <a
                href="https://lin.ee/YZbQ3V7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-4 rounded-xl font-medium transition-colors whitespace-nowrap flex-1 min-w-[220px]"
              >
                <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {th("lineDiscount")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-xl font-medium transition-colors whitespace-nowrap flex-1 min-w-[220px]"
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

      {/* Our Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {th("ourProducts")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {th("ourProductsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { src: "/products/1stick-tubes.png", nameKey: "stickTube", slug: "stickTube" },
              { src: "/products/2cream-tubes.png", nameKey: "creamTube", slug: "creamTube" },
              { src: "/products/3bottles.png", nameKey: "bottle", slug: "bottle" },
              { src: "/products/4toner-pad-jars.png", nameKey: "tonerPadJar", slug: "jar" },
              { src: "/products/5glass-bottles.png", nameKey: "glassBottle", slug: "serumBottle" },
              { src: "/products/6serum-bottles.png", nameKey: "serumBottle", slug: "serumBottle" },
              { src: "/products/7jars.png", nameKey: "creamJar", slug: "jar" },
              { src: "/products/8lip.png", nameKey: "lip", slug: "lip" },
            ].map((product, index) => (
              <Link key={index} href={`/${locale}/catalog/${product.slug}`} className="group">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={product.src}
                    alt={tc(product.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center text-primary font-medium mt-3 group-hover:text-primary/80 transition-colors">{tc(product.nameKey)}</p>
              </Link>
            ))}
          </div>
          {/* <div className="text-center mt-8">
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {tcommon("viewAll")}
            </Link>
          </div> */}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw]">
        {/* Top gradient blend */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />
        <img
          src="/home-third.png"
          alt="บรรจุภัณฑ์สกินแคร์สีขาวและขวดแก้วสีน้ำตาลวางเรียงแถวบนสายพานลำเลียงในโรงงาน เพื่อแสดงขั้นตอนการบรรจุผลิตภัณฑ์"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-end justify-end pb-16 lg:pb-24 pr-36 lg:pr-48">
          <Link
            href={`/${locale}/portfolio`}
            className="group inline-flex items-center gap-3 bg-white/95 hover:bg-white text-primary px-8 py-4 lg:px-10 lg:py-5 rounded-full font-semibold text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
          >
            {tp("viewPortfolio")}
            <svg className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {th("ourServicesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <img
                src="/icons/บริการของ Packpert1.png"
                alt={ta("service1Title")}
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-2">{ta("service1Title")}</h3>
              <p className="text-muted text-sm">{ta("service1Desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/icons/บริการของ Packpert2.png"
                alt={ta("service2Title")}
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-2">{ta("service2Title")}</h3>
              <p className="text-muted text-sm">{ta("service2Desc")}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/icons/บริการของ Packpert3.png"
                alt={ta("service3Title")}
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-2">{ta("service3Title")}</h3>
              <p className="text-muted text-sm">{ta("service3Desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-secondary">
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
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
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

      {/* Minimum Order Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Video - left side */}
            <div className="rounded-2xl overflow-hidden flex items-center justify-center">
              <video
                className="h-[600px] w-auto rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/packpert.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Text content - right side */}
            <div className="flex flex-col justify-center px-4 lg:px-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {th("minOrderTitle")}<br />
                {th("minOrderTitle2")}
              </h2>
              <p className="text-muted mb-3">
                {th("minOrderDesc")}
              </p>
              <p className="text-muted mb-3">
                {th("minOrderDesc2")}
              </p>
              <p className="text-muted mb-6">
                {th("minOrderDesc3")}
              </p>
              <Link href={`/${locale}/contact`} className="btn-primary w-fit">
                {th("contactUs")}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
