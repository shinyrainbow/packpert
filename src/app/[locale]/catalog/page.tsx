import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "th"
      ? "แคตตาล็อกสินค้า - Packpert บรรจุภัณฑ์เครื่องสำอาง"
      : "Product Catalog - Packpert Cosmetic Packaging";

  const description =
    locale === "th"
      ? "ชมแคตตาล็อกบรรจุภัณฑ์เครื่องสำอางครบวงจร หลอดครีม ขวดปั๊ม กระปุก ขวดเซรั่ม ลิปสติก จาก Packpert"
      : "Browse our complete cosmetic packaging catalog - cream tubes, pump bottles, jars, serum bottles, lipstick packaging from Packpert";

  return {
    title,
    description,
    keywords: [
      "แคตตาล็อก",
      "บรรจุภัณฑ์",
      "หลอดครีม",
      "ขวดปั๊ม",
      "กระปุก",
      "ขวดเซรั่ม",
      "catalog",
      "packaging",
      "cosmetic packaging",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      siteName: "Packpert",
      images: [
        {
          url: "/Catalog-Banner.png",
          width: 1200,
          height: 630,
          alt: "Packpert Catalog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/Catalog-Banner.png"],
    },
    alternates: {
      canonical: `/${locale}/catalog`,
      languages: {
        th: "/th/catalog",
        en: "/en/catalog",
      },
    },
  };
}

const categories = [
  { key: "stickTube", value: "stickTube", image: "/all-catalogs/Stick Tube.png" },
  { key: "creamTube", value: "creamTube", image: "/all-catalogs/Cream Tube.png" },
  { key: "jar", value: "jar", image: "/all-catalogs/Jar.png" },
  { key: "bottle", value: "bottle", image: "/all-catalogs/Bottle.png" },
  { key: "serumBottle", value: "serumBottle", image: "/all-catalogs/Serum.png" },
  { key: "lip", value: "lip", image: "/all-catalogs/Lip.png" },
  { key: "cosmetics", value: "cosmetics", image: "/all-catalogs/cosmetic.png" },
];

export default async function CatalogPage() {
  const locale = await getLocale();
  const t = await getTranslations("catalog");

  return (
    <>
      {/* Hero Section with Banner */}
      <section className="relative text-white -mt-20 min-h-[400px] flex items-center justify-start">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/Catalog-Banner.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
        <div className="container-custom relative z-10 text-left">
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

      {/* Other Catalogs Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("otherCatalogs")}
            </h2>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6">
            {[
              { image: "1creamtube.png", key: "creamTube", value: "creamTube" },
              { image: "2stick.png", key: "stickTube", value: "stickTube" },
              { image: "3bottle.png", key: "bottle", value: "bottle" },
              { image: "4cosmetic.png", key: "cosmetics", value: "cosmetics" },
              { image: "5jar.png", key: "jar", value: "jar" },
              { image: "6serum.png", key: "serumBottle", value: "serumBottle" },
              { image: "7lip.png", key: "lip", value: "lip" },
            ].map((item) => (
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
