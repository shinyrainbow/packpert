import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

const categories = [
  { key: "stickTube", value: "stickTube" },
  { key: "creamTube", value: "creamTube" },
  { key: "jar", value: "jar" },
  { key: "pumpBottle", value: "pumpBottle" },
  { key: "serumBottle", value: "serumBottle" },
  { key: "lip", value: "lip" },
  { key: "cosmetics", value: "cosmetics" },
];

export default async function CatalogPage() {
  const locale = await getLocale();
  const t = await getTranslations("catalog");

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 -mt-20 pt-28">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom">
          {/* Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/${locale}/catalog/${cat.value}`}
                className="rounded-xl p-5 text-center font-medium transition-all hover:shadow-md group bg-secondary text-gray-700 hover:bg-gray-100"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center bg-primary/10 group-hover:bg-primary/20">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="text-sm">{t(cat.key)}</span>
              </Link>
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
              <div key={num} className="flex flex-col items-center">
                <img
                  src={`/icons/ขั้นตอนผลิต${num}.png`}
                  alt={`Production Step ${num}`}
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
