import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

export default async function ArticlePage() {
  const locale = await getLocale();
  const t = await getTranslations("article");

  // Placeholder articles - these would come from database in production
  const articles = [
    {
      id: 1,
      title: locale === "th" ? "เทรนด์บรรจุภัณฑ์ปี 2024" : "Packaging Trends 2024",
      excerpt:
        locale === "th"
          ? "สำรวจแนวโน้มบรรจุภัณฑ์ที่น่าจับตามองในปีนี้"
          : "Explore the packaging trends to watch this year",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=500&auto=format&fit=crop",
      date: "2024-01-15",
    },
    {
      id: 2,
      title:
        locale === "th"
          ? "วิธีเลือกบรรจุภัณฑ์ที่เหมาะกับสินค้า"
          : "How to Choose the Right Packaging",
      excerpt:
        locale === "th"
          ? "คู่มือการเลือกบรรจุภัณฑ์ที่ตอบโจทย์แบรนด์ของคุณ"
          : "A guide to selecting packaging that fits your brand",
      image:
        "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=500&auto=format&fit=crop",
      date: "2024-01-10",
    },
    {
      id: 3,
      title:
        locale === "th"
          ? "บรรจุภัณฑ์รักษ์โลก: ทางเลือกที่ยั่งยืน"
          : "Eco-Friendly Packaging: Sustainable Choices",
      excerpt:
        locale === "th"
          ? "เรียนรู้เกี่ยวกับบรรจุภัณฑ์ที่เป็นมิตรต่อสิ่งแวดล้อม"
          : "Learn about environmentally friendly packaging options",
      image:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0eb2?q=80&w=500&auto=format&fit=crop",
      date: "2024-01-05",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 -mt-20 pt-28">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
        </div>
      </section>

      {/* Articles Content */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom">
          <p className="text-muted text-center max-w-2xl mx-auto mb-12">
            {t("description")}
          </p>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100"
              >
                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <time className="text-sm text-muted">
                    {new Date(article.date).toLocaleDateString(
                      locale === "th" ? "th-TH" : "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  <h2 className="text-xl font-semibold text-primary mt-2 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-muted text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/article/${article.id}`}
                    className="inline-flex items-center text-primary font-medium text-sm hover:underline"
                  >
                    {t("readMore")}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">{t("noArticles")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
