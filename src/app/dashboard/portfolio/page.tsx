"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Portfolio {
  id: string;
  title: string;
  titleTh: string;
  description: string | null;
  image: string;
  client: string | null;
  category: string | null;
  isFeatured: boolean;
  createdAt: string;
}

export default function PortfolioDashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchPortfolios() {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error("Failed to fetch portfolios:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePortfolio(id: string) {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return;

    try {
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      fetchPortfolios();
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
    }
  }

  async function toggleFeatured(id: string, isFeatured: boolean) {
    try {
      await fetch(`/api/portfolio/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !isFeatured }),
      });
      fetchPortfolios();
    } catch (error) {
      console.error("Failed to update portfolio:", error);
    }
  }

  const featuredCount = portfolios.filter((p) => p.isFeatured).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Portfolio</h1>
        <Link
          href="/dashboard/portfolio/new"
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Total Projects</p>
              <p className="text-2xl font-bold text-primary">{portfolios.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Featured</p>
              <p className="text-2xl font-bold text-yellow-600">{featuredCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-primary">All Projects</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted">Loading...</div>
        ) : portfolios.length === 0 ? (
          <div className="p-8 text-center text-muted">
            No portfolio items yet. Add your first project!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="border rounded-xl overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <img
                    src={portfolio.image}
                    alt={portfolio.title}
                    className="w-full h-full object-cover"
                  />
                  {portfolio.isFeatured && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{portfolio.title}</h3>
                  <p className="text-sm text-gray-500">{portfolio.titleTh}</p>
                  {portfolio.client && (
                    <p className="text-xs text-primary mt-1">
                      Client: {portfolio.client}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <button
                      onClick={() => toggleFeatured(portfolio.id, portfolio.isFeatured)}
                      className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                        portfolio.isFeatured
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {portfolio.isFeatured ? "Featured" : "Feature"}
                    </button>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/portfolio/${portfolio.id}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => deletePortfolio(portfolio.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
