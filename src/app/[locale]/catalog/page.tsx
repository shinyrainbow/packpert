import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { key: "stickTube", value: "stickTube", image: "/catalog/หลอดสติ๊ก/35.png" },
  { key: "creamTube", value: "creamTube", image: "/catalog/หลอดครีม/1.png" },
  { key: "jar", value: "jar", image: "/catalog/กระปุก/102.png" },
  { key: "pumpBottle", value: "pumpBottle", image: "/catalog/ขวดปั๊ม/45.png" },
  { key: "serumBottle", value: "serumBottle", image: "/catalog/ขวดเซรั่ม/123.png" },
  { key: "lip", value: "lip", image: "/catalog/ลิป/135.png" },
  { key: "cosmetics", value: "cosmetics", image: "/catalog/เครื่องสำอางค์/99.png" },
];

export default async function CatalogPage() {
  const locale = await getLocale();
  const t = await getTranslations("catalog");

  return (
    <>
      {/* Hero Section with Banner */}
      <section className="relative text-white py-20 -mt-16 pt-24 min-h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/product-catalog/7Cosmetics.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
        <div className="container-custom relative z-10">
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
                className="rounded-xl overflow-hidden text-center font-medium transition-all hover:shadow-lg group bg-white border border-gray-200 hover:border-primary/50"
              >
                <div className="aspect-square relative bg-gray-50">
                  <Image
                    src={cat.image}
                    alt={cat.key}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {t(cat.key)}
                  </span>
                </div>
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
