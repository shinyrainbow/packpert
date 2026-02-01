"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const catalogSubmenu = [
  { key: "creamTube", href: "/catalog/creamTube" },
  { key: "stickTube", href: "/catalog/stickTube" },
  { key: "pumpBottle", href: "/catalog/bottle" },
  { key: "jar", href: "/catalog/jar" },
  { key: "serumBottle", href: "/catalog/serumBottle" },
  { key: "lip", href: "/catalog/lip" },
  { key: "cosmetics", href: "/catalog/cosmetics" },
];

export default function Header() {
  const t = useTranslations("common");
  const tc = useTranslations("catalog");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if on contact page (force primary header)
  const isContactPage = pathname.includes("/contact");

  // Use primary header style if scrolled, mobile menu open, or on contact page
  const useWhiteHeader = scrolled || mobileMenuOpen || isContactPage;

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath || "/"}`);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/catalog", label: t("catalog"), hasSubmenu: true },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/agent", label: t("agent") },
    { href: "/blog", label: t("article") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 ${
        useWhiteHeader
          ? "bg-primary shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <img
              src="/logo.png"
              alt="Packpert"
              className="h-12 lg:h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.hasSubmenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setCatalogOpen(true)}
                    onMouseLeave={() => setCatalogOpen(false)}
                  >
                    <span
                      className={`relative font-medium transition-colors py-2 cursor-pointer after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${
                        useWhiteHeader
                          ? "text-white/90 hover:text-white"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {link.label}
                      <svg
                        className="w-4 h-4 inline-block ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                    {catalogOpen && (
                      <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-1">
                        {catalogSubmenu.map((item) => (
                          <Link
                            key={item.key}
                            href={`/${locale}${item.href}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
                          >
                            {tc(item.key)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={`/${locale}${link.href}`}
                    className={`relative font-medium transition-colors after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${
                      useWhiteHeader
                        ? "text-white/90 hover:text-white"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Language Switch & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className={`flex items-center gap-2 border rounded-lg px-3 py-1 transition-colors ${
                useWhiteHeader ? "border-white/30" : "border-white/30"
              }`}
            >
              <button
                onClick={() => switchLocale("th")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "th"
                    ? "bg-white text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                TH
              </button>
              <span className="text-white/30">
                |
              </span>
              <button
                onClick={() => switchLocale("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "en"
                    ? "bg-white text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-2.5 rounded-full font-medium transition-colors bg-white text-primary hover:bg-gray-100"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 transition-colors text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="relative bg-gradient-to-r from-primary to-primary/90 p-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/logo.png" alt="Packpert" className="h-14 w-auto" />
            <p className="text-white/70 text-sm mt-2">ศูนย์รวมแพ็กเกจจิ้งทุกชนิด รับผลิตและจำหน่าย</p>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col h-[calc(100%-140px)] overflow-y-auto">
            <nav className="flex-1 py-2">
              {navLinks.map((link, index) => (
                <div key={link.href} className={index === 0 ? "" : ""}>
                  {link.hasSubmenu ? (
                    <>
                      <div className="flex items-center gap-3 px-6 py-4 text-primary font-semibold">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        {link.label}
                      </div>
                      <div className="ml-6 mr-4 mb-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {catalogSubmenu.map((item, idx) => (
                          <Link
                            key={item.key}
                            href={`/${locale}${item.href}`}
                            className={`flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors ${
                              idx !== catalogSubmenu.length - 1 ? "border-b border-gray-50" : ""
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary/60 to-primary/30" />
                            <span className="text-sm">{tc(item.key)}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={`/${locale}${link.href}`}
                      className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        {link.href === "/" && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        )}
                        {link.href === "/about" && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {link.href === "/portfolio" && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                        {link.href === "/agent" && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                        {link.href === "/blog" && (
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        )}
                      </div>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-4 bg-white border-t border-gray-100">
              {/* Language Switch */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => switchLocale("th")}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    locale === "th"
                      ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🇹🇭 ไทย
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    locale === "en"
                      ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/25"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>

              {/* Contact Button */}
              <Link
                href={`/${locale}/contact`}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t("contact")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
