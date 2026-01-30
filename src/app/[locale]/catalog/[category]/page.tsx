import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

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

  const data = categoryImages[category];

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
      <section className="relative text-white py-20 -mt-20 pt-28 min-h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${categoryBanners[category]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
        <div className="container-custom relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t(category)}</h1>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
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
                href="https://lin.ee/Gq5zgzn"
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
    </>
  );
}
