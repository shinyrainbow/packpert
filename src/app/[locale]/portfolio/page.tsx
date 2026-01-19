"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";

interface Portfolio {
  id: string;
  title: string;
  titleTh: string;
  description: string | null;
  descriptionTh: string | null;
  image: string;
  client: string | null;
}

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const res = await fetch("/api/portfolios");
        const data = await res.json();
        setPortfolios(data);
      } catch (error) {
        console.error("Failed to fetch portfolios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolios();
  }, []);

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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-5 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedPortfolio(portfolio)}
                >
                  <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-primary/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        {t("viewProject")}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {locale === "th" ? portfolio.titleTh : portfolio.title}
                    </h3>
                    <p className="text-muted text-sm line-clamp-2 mb-3">
                      {locale === "th" ? portfolio.descriptionTh : portfolio.description}
                    </p>
                    {portfolio.client && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">{t("client")}:</span> {portfolio.client}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Modal */}
      {selectedPortfolio && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPortfolio(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-100 relative">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-primary/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
                onClick={() => setSelectedPortfolio(null)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                {locale === "th" ? selectedPortfolio.titleTh : selectedPortfolio.title}
              </h2>
              <p className="text-muted mb-4">
                {locale === "th" ? selectedPortfolio.descriptionTh : selectedPortfolio.description}
              </p>
              {selectedPortfolio.client && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t("client")}:</span> {selectedPortfolio.client}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
