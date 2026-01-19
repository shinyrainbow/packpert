import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCarousel from "@/components/ProductCarousel";
import HeroBannerSlider from "@/components/HeroBannerSlider";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("hero");
  const th = await getTranslations("home");
  const tp = await getTranslations("portfolio");
  const tabout = await getTranslations("about");
  const tcommon = await getTranslations("common");

  const portfolios = await prisma.portfolio.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Banner Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center -mt-20 pt-20">
        <HeroBannerSlider />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-xl lg:text-2xl mb-4 text-white/90">
              {t("subtitle")}
            </p>
            <p className="text-lg mb-8 text-white/80">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {th("lineDiscount")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {th("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
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
          <ProductCarousel products={products} locale={locale} />
          <div className="text-center mt-8">
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {tcommon("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {tp("title")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {tp("description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <Link
                key={portfolio.id}
                href={`/${locale}/portfolio`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {portfolio.image ? (
                    <img
                      src={portfolio.image}
                      alt={locale === "th" ? portfolio.titleTh : portfolio.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-primary/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {locale === "th" ? portfolio.titleTh : portfolio.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-2">
                    {locale === "th" ? portfolio.descriptionTh : portfolio.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${locale}/portfolio`} className="btn-secondary">
              {tcommon("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use Packpert Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {th("whyChooseUs")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {th("whyChooseUsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-5">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {th("feature1Title")}
              </h3>
              <p className="text-muted">
                {th("feature1Desc")}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-5">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {th("feature2Title")}
              </h3>
              <p className="text-muted">
                {th("feature2Desc")}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-5">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {th("feature3Title")}
              </h3>
              <p className="text-muted">
                {th("feature3Desc")}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-5">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {th("feature4Title")}
              </h3>
              <p className="text-muted">
                {th("feature4Desc")}
              </p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-12 border-t">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted">{tabout("experience")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted">{tabout("brands")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted">{tabout("products")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">99%</div>
              <div className="text-muted">{tabout("satisfaction")}</div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: locale === "th" ? "5 เทรนด์บรรจุภัณฑ์ที่น่าจับตามองในปี 2024" : "5 Packaging Trends to Watch in 2024",
                excerpt: locale === "th" ? "ค้นพบเทรนด์บรรจุภัณฑ์ล่าสุดที่จะเปลี่ยนแปลงอุตสาหกรรมในปีนี้" : "Discover the latest packaging trends that will transform the industry this year",
                date: "Jan 15, 2024",
                image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop"
              },
              {
                title: locale === "th" ? "วิธีเลือกบรรจุภัณฑ์ที่เหมาะกับสินค้าของคุณ" : "How to Choose the Right Packaging for Your Product",
                excerpt: locale === "th" ? "คู่มือฉบับสมบูรณ์ในการเลือกบรรจุภัณฑ์ที่เหมาะสมกับแบรนด์และสินค้าของคุณ" : "A complete guide to selecting packaging that fits your brand and product",
                date: "Jan 10, 2024",
                image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=300&fit=crop"
              },
              {
                title: locale === "th" ? "บรรจุภัณฑ์รักษ์โลก: ทางเลือกที่ยั่งยืน" : "Eco-Friendly Packaging: Sustainable Options",
                excerpt: locale === "th" ? "เรียนรู้เกี่ยวกับตัวเลือกบรรจุภัณฑ์ที่เป็นมิตรกับสิ่งแวดล้อมสำหรับธุรกิจของคุณ" : "Learn about environmentally friendly packaging options for your business",
                date: "Jan 5, 2024",
                image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0eb2?w=400&h=300&fit=crop"
              }
            ].map((article, index) => (
              <article key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted mb-2">{article.date}</p>
                  <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <button className="mt-4 text-primary font-medium text-sm hover:underline">
                    {tcommon("readMore")} →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Packpert Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {tabout("title")}
            </h2>
            <p className="text-xl text-white/90 mb-4">
              {tabout("subtitle")}
            </p>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {tabout("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                {th("lineDiscount")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {th("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
