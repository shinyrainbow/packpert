import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("hero");
  const th = await getTranslations("home");
  const tp = await getTranslations("portfolio");
  const tcommon = await getTranslations("common");

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center -mt-20 pt-20 pb-32"
      >
        {/* Background Image */}
        <img
          src="/home-banner.png"
          alt="Packpert Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(255, 255, 255, 1) 100%)" }}
        />
        <div className="w-full px-8 lg:px-20 relative z-10">
          <div className="max-w-md text-white text-left lg:ml-16">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2 leading-tight animate-fade-in-up">
              {t("title")}
            </h1>
            {t("subtitle") && (
              <h1 className="text-2xl lg:text-4xl font-bold mb-6 leading-tight animate-fade-in-up-delay-1">
                {t("subtitle")}
              </h1>
            )}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
              <a
                href="https://lin.ee/Gq5zgzn"
                target="_blank"
                rel="noopener noreferrer"
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
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_32%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_41%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_45%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_48%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_50%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_53%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_56%20PM.png",
              "/products/ChatGPT%20Image%20Jan%2024,%202026,%2003_17_58%20PM.png",
            ].map((src, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden bg-gray-100 group"
              >
                <img
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {tcommon("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw]">
        <img
          src="/home-bg-port.png"
          alt="Portfolio"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 flex items-end justify-start p-8 lg:p-16">
          <Link href={`/${locale}/portfolio`} className="btn-primary">
            {tp("viewPortfolio")}
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
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            <div className="flex flex-col items-center">
              <img
                src="/icons/บริการของ Packpert1.png"
                alt="Packpert Service 1"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/icons/บริการของ Packpert2.png"
                alt="Packpert Service 2"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/icons/บริการของ Packpert3.png"
                alt="Packpert Service 3"
                className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
              />
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

      {/* Minimum Order Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video - left side, 50% */}
            <div className="px-4 lg:px-12 lg:max-h-[400px]">
              <div className="rounded-2xl overflow-hidden">
                <video
                  className="w-full aspect-[9/16] object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/packpert.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Text content - right side, 50% */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {th("minOrderTitle")}
              </h2>
              <p className="text-muted mb-4">
                {th("minOrderDesc")}
              </p>
              <p className="text-muted mb-6">
                {th("minOrderDesc2")}
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
