import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import PortfolioGrid from "@/components/PortfolioGrid";

export default async function PortfolioPage() {
  const locale = await getLocale();
  const t = await getTranslations("portfolio");

  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="section-padding">
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
