"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "packpert-cookie-consent";

export default function CookieConsent() {
  const t = useTranslations("cookie");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing the popup slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 animate-fade-in-up">
      <div className="container-custom mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon */}
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full shrink-0">
              <Cookie className="w-6 h-6 text-accent" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-1">{t("title")}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t("message")}{" "}
                <Link
                  href="/privacy"
                  className="text-accent hover:underline font-medium"
                >
                  {t("learnMore")}
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
              >
                {t("decline")}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors rounded-lg"
              >
                {t("accept")}
              </button>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 sm:hidden p-1 text-muted hover:text-primary transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
