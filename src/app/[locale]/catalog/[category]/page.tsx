import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import CatalogTabs from "@/components/CatalogTabs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

const categoryNames: Record<string, { th: string; en: string }> = {
  stickTube: { th: "หลอดสติ๊ก", en: "Stick Tube" },
  creamTube: { th: "หลอดครีม", en: "Cream Tube" },
  jar: { th: "กระปุก", en: "Jar" },
  bottle: { th: "ขวดปั๊ม", en: "Pump Bottle" },
  serumBottle: { th: "ขวดเซรั่ม", en: "Serum Bottle" },
  lip: { th: "ลิป", en: "Lip" },
  cosmetics: { th: "เครื่องสำอาง", en: "Cosmetics" },
};

const categoryBannersForMeta: Record<string, string> = {
  stickTube: "/product-catalog/2Stick tube.png",
  creamTube: "/product-catalog/1creamTube.png",
  jar: "/product-catalog/4Jar.png",
  bottle: "/product-catalog/3Bottle.png",
  serumBottle: "/product-catalog/5Serum bottle.png",
  lip: "/product-catalog/6Lip.png",
  cosmetics: "/product-catalog/7Cosmetics.png",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;

  const categoryInfo = categoryNames[category];
  if (!categoryInfo) {
    return {
      title: locale === "th" ? "ไม่พบหมวดหมู่" : "Category Not Found",
    };
  }

  const categoryName = locale === "th" ? categoryInfo.th : categoryInfo.en;
  const title =
    locale === "th"
      ? `${categoryName} - Packpert บรรจุภัณฑ์เครื่องสำอาง`
      : `${categoryName} - Packpert Cosmetic Packaging`;

  const description =
    locale === "th"
      ? `บรรจุภัณฑ์${categoryName}คุณภาพสูงจาก Packpert สั่งขั้นต่ำ 50 ชิ้น พร้อมบริการ OEM/ODM`
      : `High-quality ${categoryName} packaging from Packpert. Minimum order 50 pieces with OEM/ODM services.`;

  const bannerImage = categoryBannersForMeta[category] || "/product-catalog/7Cosmetics.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      siteName: "Packpert",
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 630,
          alt: `Packpert ${categoryName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [bannerImage],
    },
    alternates: {
      canonical: `/${locale}/catalog/${category}`,
      languages: {
        th: `/th/catalog/${category}`,
        en: `/en/catalog/${category}`,
      },
    },
  };
}

interface SubfolderData {
  name: string;
  nameTh: string;
  nameEn: string;
  images: string[];
}

interface CategoryData {
  folder: string;
  hasSubfolders: boolean;
  subfolders?: SubfolderData[];
  images?: string[]; // For categories without subfolders
}

const categoryBanners: Record<string, string> = {
  stickTube: "/product-catalog/2Stick tube.png",
  creamTube: "/product-catalog/1creamTube.png",
  jar: "/product-catalog/4Jar.png",
  bottle: "/product-catalog/3Bottle.png",
  serumBottle: "/product-catalog/5Serum bottle.png",
  lip: "/product-catalog/6Lip.png",
  cosmetics: "/product-catalog/7Cosmetics.png",
};

const categoryLineUrls: Record<string, string> = {
  creamTube: "https://lin.ee/n9h5cHB",
  stickTube: "https://lin.ee/izvk1yr",
  bottle: "https://lin.ee/VlwOT7X",
  jar: "https://lin.ee/z6zl8GV",
  serumBottle: "https://lin.ee/GhuPtHq",
  lip: "https://lin.ee/aA2U9au",
  cosmetics: "https://lin.ee/hjAy4CO",
};

const categoryData: Record<string, CategoryData> = {
  creamTube: {
    folder: "cream tube",
    hasSubfolders: true,
    subfolders: [
      {
        name: "หลอดกลม - Round Tube",
        nameTh: "หลอดกลม",
        nameEn: "Round Tube",
        images: [
          "/catalogs/cream tube/หลอดกลม - Round Tube/tube-round-tube-001.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/tube-round-tube-002.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/tube-round-tube-003.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/tube-round-tube-004.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/tube-round-tube-005.png",
          "/catalogs/cream tube/หลอดกลม - Round Tube/tube-round-tube-006.png",
        ],
      },
      {
        name: "หลอดรี - Oval Tube",
        nameTh: "หลอดรี",
        nameEn: "Oval Tube",
        images: [
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-001.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-002.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-003.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-004.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-005.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-006.png",
          "/catalogs/cream tube/หลอดรี - Oval Tube/tube-oval-tube-007.png",
        ],
      },
    ],
  },
  stickTube: {
    folder: "Stick Tube",
    hasSubfolders: false,
    images: [
      "/catalogs/Stick Tube/stick-default-001.png",
      "/catalogs/Stick Tube/stick-default-002.png",
      "/catalogs/Stick Tube/stick-default-003.png",
      "/catalogs/Stick Tube/stick-default-004.png",
      "/catalogs/Stick Tube/stick-default-005.png",
      "/catalogs/Stick Tube/stick-default-006.png",
      "/catalogs/Stick Tube/stick-default-007.png",
      "/catalogs/Stick Tube/stick-default-008.png",
    ],
  },
  bottle: {
    folder: "Bottle",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Pump bottle - ขวดปั๊ม",
        nameTh: "ขวดปั๊ม",
        nameEn: "Pump Bottle",
        images: [
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-001.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-002.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-003.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-004.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-005.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-006.png",
          "/catalogs/Bottle/Pump bottle - ขวดปั๊ม/bottle-pump-bottle-007.png",
        ],
      },
      {
        name: "Press bottle - ขวดฝากด",
        nameTh: "ขวดฝากด",
        nameEn: "Press Bottle",
        images: [
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-001.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-002.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-003.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-004.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-005.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-006.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-007.png",
          "/catalogs/Bottle/Press bottle - ขวดฝากด/bottle-press-bottle-008.png",
        ],
      },
      {
        name: "Airless bottle - ขวดสูญญากาศ",
        nameTh: "ขวดสูญญากาศ",
        nameEn: "Airless Bottle",
        images: [
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-001.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-002.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-003.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-004.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-005.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-006.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-007.png",
          "/catalogs/Bottle/Airless bottle - ขวดสูญญากาศ/bottle-airless-bottle-008.png",
        ],
      },
    ],
  },
  jar: {
    folder: "Jar",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Cream jar กระปุกครีม",
        nameTh: "กระปุกครีม",
        nameEn: "Cream Jar",
        images: [
          "/catalogs/Jar/Cream jar กระปุกครีม/jar-cream-jar-001.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/jar-cream-jar-002.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/jar-cream-jar-003.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/jar-cream-jar-004.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/jar-cream-jar-005.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกครีมอะคริลิกใส ฝาสีขาว ทรงกลม ดีไซน์เรียบมินิมอล.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกทรงกระบอก สีพาสเทล ฟ้า ดำ ขาว และชมพู.png",
          "/catalogs/Jar/Cream jar กระปุกครีม/กระปุกแก้วสีเขียวมะกอก 3 ขนาด พร้อมฝาสีดำ วางเรียงขนาด.png",
        ],
      },
      {
        name: "Toner pad jar กระปุกโทนเนอร์แพด",
        nameTh: "กระปุกโทนเนอร์แพด",
        nameEn: "Toner Pad Jar",
        images: [
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/jar-toner-pad-jar-001.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/jar-toner-pad-jar-002.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/jar-toner-pad-jar-003.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/jar-toner-pad-jar-004.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/jar-toner-pad-jar-005.png",
          "/catalogs/Jar/Toner pad jar กระปุกโทนเนอร์แพด/jar-toner-pad-jar-006.png",
        ],
      },
    ],
  },
  serumBottle: {
    folder: "Serum Bottle",
    hasSubfolders: false,
    images: [
      "/catalogs/Serum Bottle/serum-default-001.png",
      "/catalogs/Serum Bottle/serum-default-002.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วสีชมพูอ่อน 2 ขนาด พร้อมฝาสีโรสโกลด์.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วสีม่วงเข้ม 2 ขนาด พร้อมฝาดรอปเปอร์สีดำ.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วใส 2 ขนาด ฝาโลหะสีเงินและสีทอง ดีไซน์เรียบหรู.png",
      "/catalogs/Serum Bottle/ขวดดรอปเปอร์แก้วใสทรงสูง ฝาโลหะสีทอง พร้อมหลอดหยดสีขาว.png",
      "/catalogs/Serum Bottle/ขวดเซรั่มทรงกลมแก้วใส 2 ขนาด ฝาสีเงินและสีทอง ดีไซน์พรีเมียม.png",
      "/catalogs/Serum Bottle/ขวดเซรั่มทรงเหลี่ยมใส ดีไซน์คริสตัล หัวปั๊มสีเงิน.png",
    ],
  },
  lip: {
    folder: "Lip",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Lip Gloss ลิปกลอส",
        nameTh: "ลิปกลอส",
        nameEn: "Lip Gloss",
        images: [
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-001.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-002.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-003.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-004.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-005.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-006.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-007.png",
          "/catalogs/Lip/Lip Gloss ลิปกลอส/lip-lip-gloss-008.png",
        ],
      },
      {
        name: "Lipstick ลิปสติก",
        nameTh: "ลิปสติก",
        nameEn: "Lipstick",
        images: [
          "/catalogs/Lip/Lipstick ลิปสติก/lip-lipstick-001.png",
          "/catalogs/Lip/Lipstick ลิปสติก/lip-lipstick-002.png",
          "/catalogs/Lip/Lipstick ลิปสติก/lip-lipstick-003.png",
          "/catalogs/Lip/Lipstick ลิปสติก/lip-lipstick-004.png",
          "/catalogs/Lip/Lipstick ลิปสติก/lip-lipstick-005.png",
          "/catalogs/Lip/Lipstick ลิปสติก/lip-lipstick-006.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงกระบอกผิวเงา ไล่สีชมพูถึงขาว.png",
          "/catalogs/Lip/Lipstick ลิปสติก/แท่งลิปสติกทรงหกเหลี่ยมมุมตัด สีเทาอ่อน ดีไซน์มินิมอล.png",
        ],
      },
    ],
  },
  cosmetics: {
    folder: "Powder case",
    hasSubfolders: true,
    subfolders: [
      {
        name: "Powder case ตลับแป้ง",
        nameTh: "ตลับแป้ง",
        nameEn: "Powder Case",
        images: [
          "/catalogs/Powder case/Powder case ตลับแป้ง/powder-powder-case-001.png",
          "/catalogs/Powder case/Powder case ตลับแป้ง/powder-powder-case-002.png",
          "/catalogs/Powder case/Powder case ตลับแป้ง/powder-powder-case-003.png",
        ],
      },
      {
        name: "Cushion case ตลับคุชชั่น",
        nameTh: "ตลับคุชชั่น",
        nameEn: "Cushion Case",
        images: [
          "/catalogs/Powder case/Cushion case ตลับคุชชั่น/powder-cushion-case-001.png",
          "/catalogs/Powder case/Cushion case ตลับคุชชั่น/powder-cushion-case-002.png",
          "/catalogs/Powder case/Cushion case ตลับคุชชั่น/powder-cushion-case-003.png",
        ],
      },
    ],
  },
};

export default async function CategoryDetailPage({ params }: Props) {
  const { category } = await params;
  const locale = await getLocale();
  const t = await getTranslations("catalog");
  const tcommon = await getTranslations("common");
  const th = await getTranslations("home");

  const data = categoryData[category];

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
      <section className="relative text-white h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden -mt-20">
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
          {/* Render tabs for categories with subfolders, or direct grid for categories without */}
          {data.hasSubfolders && data.subfolders ? (
            <CatalogTabs
              tabs={data.subfolders}
              lineUrl={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
              locale={locale}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.images?.map((imagePath: string) => {
                const filename = imagePath.split("/").pop() || "";
                const altText = filename.replace(/\.[^/.]+$/, "");
                return (
                  <a
                    key={imagePath}
                    href={categoryLineUrls[category] || "https://lin.ee/n9Tx1PK"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
                  >
                    <Image
                      src={imagePath}
                      alt={altText}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </a>
                );
              })}
            </div>
          )}

          {/* View All Products PDF Button */}
          <div className="text-center mt-10">
            <a
              href="/Packpert Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary px-8 py-3 rounded-xl font-medium transition-colors"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t("viewAllProducts")}
            </a>
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
              { image: "3bottle.png", key: "bottle", value: "bottle" },
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
