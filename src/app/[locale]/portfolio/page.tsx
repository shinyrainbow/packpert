import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import PortfolioGrid from "@/components/PortfolioGrid";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "th"
      ? "ผลงานของเรา - Packpert บรรจุภัณฑ์เครื่องสำอาง"
      : "Our Portfolio - Packpert Cosmetic Packaging";

  const description =
    locale === "th"
      ? "ชมผลงานบรรจุภัณฑ์เครื่องสำอางคุณภาพจาก Packpert หลอดครีม ขวดปั๊ม กระปุก และอื่นๆ ที่เราผลิตให้ลูกค้า"
      : "View our cosmetic packaging portfolio - cream tubes, pump bottles, jars and more produced by Packpert";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      siteName: "Packpert",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/portfolio`,
      languages: {
        th: "/th/portfolio",
        en: "/en/portfolio",
      },
    },
  };
}

export default async function PortfolioPage() {
  const locale = await getLocale();
  const t = await getTranslations("portfolio");

  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 -mt-20 pt-28">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom">
          <p className="text-muted text-center max-w-2xl mx-auto mb-12">
            {t("description")}
          </p>

          <PortfolioGrid portfolios={portfolios} locale={locale} />
        </div>
      </section>
    </>
  );
}
