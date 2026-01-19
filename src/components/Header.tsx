"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const catalogSubmenu = [
  { key: "foilPouch", href: "/catalog?category=foilPouch" },
  { key: "cosmeticTube", href: "/catalog?category=cosmeticTube" },
  { key: "paperBox", href: "/catalog?category=paperBox" },
  { key: "plasticBottle", href: "/catalog?category=plasticBottle" },
  { key: "label", href: "/catalog?category=label" },
  { key: "customBox", href: "/catalog?category=customBox" },
];

export default function Header() {
  const t = useTranslations("common");
  const tc = useTranslations("catalog");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "");
    router.push(`/${newLocale}${currentPath || "/"}`);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/catalog", label: t("catalog"), hasSubmenu: true },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-primary">Packpert</span>
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
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-700 hover:text-primary font-medium transition-colors py-2"
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
                    </Link>
                    {catalogOpen && (
                      <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-1">
                        <Link
                          href={`/${locale}/catalog`}
                          className="block px-4 py-2 text-gray-700 hover:bg-secondary hover:text-primary transition-colors"
                        >
                          {tc("all")}
                        </Link>
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
                    className="text-gray-700 hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Language Switch & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
              <button
                onClick={() => switchLocale("th")}
                className={`px-2 py-1 rounded ${
                  locale === "th"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                TH
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => switchLocale("en")}
                className={`px-2 py-1 rounded ${
                  locale === "en"
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                EN
              </button>
            </div>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t("contact")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
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
          <div className="lg:hidden py-4 border-t">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={`/${locale}${link.href}`}
                  className="block py-3 text-gray-700 hover:text-primary font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
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
