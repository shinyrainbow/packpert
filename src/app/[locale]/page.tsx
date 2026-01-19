import { useTranslations } from "next-intl";
import Link from "next/link";
import { getLocale } from "next-intl/server";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    titleKey: "feature1Title",
    descKey: "feature1Desc",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    titleKey: "feature2Title",
    descKey: "feature2Desc",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    titleKey: "feature3Title",
    descKey: "feature3Desc",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    titleKey: "feature4Title",
    descKey: "feature4Desc",
  },
];

const productCategories = [
  { key: "foilPouch", image: "/images/products/foil-pouch.jpg" },
  { key: "cosmeticTube", image: "/images/products/tube.jpg" },
  { key: "paperBox", image: "/images/products/box.jpg" },
  { key: "plasticBottle", image: "/images/products/bottle.jpg" },
  { key: "label", image: "/images/products/label.jpg" },
  { key: "customBox", image: "/images/products/custom.jpg" },
];

export default async function HomePage() {
  const locale = await getLocale();
  const t = useTranslations("hero");
  const th = useTranslations("home");
  const tc = useTranslations("catalog");
  const tcommon = useTranslations("common");

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        </div>
        <div className="container-custom relative">
          <div className="py-24 lg:py-32 max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-xl lg:text-2xl mb-4 text-white/90">
              {t("subtitle")}
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/catalog`} className="btn-primary bg-white text-primary hover:bg-gray-100">
                {t("cta")}
              </Link>
              <Link href={`/${locale}/contact`} className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                {t("ctaContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-secondary">
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
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {th(feature.titleKey)}
                </h3>
                <p className="text-muted text-sm">
                  {th(feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {th("ourProducts")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {th("ourProductsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category) => (
              <Link
                key={category.key}
                href={`/${locale}/catalog?category=${category.key}`}
                className="group relative h-64 rounded-xl overflow-hidden bg-gray-200"
              >
                <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/70 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {tc(category.key)}
                    </h3>
                    <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                      {tcommon("viewAll")} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`/${locale}/catalog`} className="btn-primary">
              {tcommon("viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10+</div>
              <div className="text-white/80">{useTranslations("about")("experience")}</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-white/80">{useTranslations("about")("brands")}</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">1M+</div>
              <div className="text-white/80">{useTranslations("about")("products")}</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">99%</div>
              <div className="text-white/80">{useTranslations("about")("satisfaction")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {th("ourClients")}
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              {th("ourClientsDesc")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-32 h-16 bg-gray-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-500 font-semibold">Client {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {th("ctaTitle")}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {th("ctaDesc")}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary bg-white text-primary hover:bg-gray-100">
            {tcommon("contact")}
          </Link>
        </div>
      </section>
    </>
  );
}
