"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const catalogSubmenu = [
  { key: "creamTube", href: "/catalog/creamTube" },
  { key: "stickTube", href: "/catalog/stickTube" },
  { key: "pumpBottle", href: "/catalog/pumpBottle" },
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

  // Check if on contact page - always show white header
  const isContactPage = pathname.includes("/contact");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use white header style if scrolled, mobile menu open, or on contact page
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
    { href: "/article", label: t("article") },
    { href: "/agent", label: t("agent") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useWhiteHeader
          ? "bg-white shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <img
              src="/logo.png"
              alt="Packpert"
              className="h-14 w-auto"
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
                      className={`font-medium transition-colors py-2 cursor-pointer ${
                        useWhiteHeader
                          ? "text-gray-700 hover:text-primary"
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
                    className={`font-medium transition-colors ${
                      useWhiteHeader
                        ? "text-gray-700 hover:text-primary"
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
                useWhiteHeader ? "border-gray-200" : "border-white/30"
              }`}
            >
              <button
                onClick={() => switchLocale("th")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "th"
                    ? "bg-primary text-white"
                    : useWhiteHeader
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                TH
              </button>
              <span className={useWhiteHeader ? "text-gray-300" : "text-white/30"}>
                |
              </span>
              <button
                onClick={() => switchLocale("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "en"
                    ? "bg-primary text-white"
                    : useWhiteHeader
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href={`/${locale}/contact`}
              className={`px-6 py-2.5 rounded-full font-medium transition-colors ${
                useWhiteHeader
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
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
              className={`w-6 h-6 transition-colors ${
                useWhiteHeader ? "text-gray-700" : "text-white"
              }`}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-white">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.hasSubmenu ? (
                  <span className="block py-3 text-gray-700 font-medium">
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={`/${locale}${link.href}`}
                    className="block py-3 text-gray-700 hover:text-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
                {link.hasSubmenu && (
                  <div className="pl-4">
                    {catalogSubmenu.map((item) => (
                      <Link
                        key={item.key}
                        href={`/${locale}${item.href}`}
                        className="block py-2 text-gray-500 hover:text-primary text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {tc(item.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <button
                onClick={() => switchLocale("th")}
                className={`px-3 py-1 rounded ${
                  locale === "th"
                    ? "bg-primary text-white"
                    : "border text-gray-600"
                }`}
              >
                TH
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={`px-3 py-1 rounded ${
                  locale === "en"
                    ? "bg-primary text-white"
                    : "border text-gray-600"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
