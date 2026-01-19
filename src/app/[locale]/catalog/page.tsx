"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

interface Product {
  id: string;
  name: string;
  nameTh: string;
  description: string | null;
  descriptionTh: string | null;
  category: string;
  image: string | null;
}

const categories = [
  { key: "all", value: "" },
  { key: "foilPouch", value: "foilPouch" },
  { key: "cosmeticTube", value: "cosmeticTube" },
  { key: "paperBox", value: "paperBox" },
  { key: "plasticBottle", value: "plasticBottle" },
  { key: "label", value: "label" },
  { key: "customBox", value: "customBox" },
];

export default function CatalogPage() {
  const t = useTranslations("catalog");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${selectedCategory}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
        </div>
      </section>

      {/* Catalog Content */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/${locale}/catalog${cat.value ? `?category=${cat.value}` : ""}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-primary text-white"
                    : "bg-secondary text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t(cat.key)}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-primary/40"
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
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary mb-1">
                      {locale === "th" ? product.nameTh : product.name}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2">
                      {locale === "th" ? product.descriptionTh : product.description}
                    </p>
                    <div className="mt-3">
                      <span className="inline-block px-3 py-1 bg-secondary text-xs rounded-full text-gray-600">
                        {t(product.category)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted">No products found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
