"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const params = useParams();
  const locale = params.locale as string;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    packagingType: "",
    otherPackaging: "",
    size: "",
    quantity: "",
    wantScreenPrinting: false,
  });
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptPrivacy) {
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          packagingType: "",
          otherPackaging: "",
          size: "",
          quantity: "",
          wantScreenPrinting: false,
        });
        setAcceptPrivacy(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const packagingOptions = [
    { value: "", label: locale === "th" ? "-- เลือกแพ็กเกจจิ้ง --" : "-- Select packaging --" },
    { value: "creamTube", label: locale === "th" ? "หลอดครีม" : "Cream Tube" },
    { value: "stickTube", label: locale === "th" ? "หลอดสติ๊ก" : "Stick Tube" },
    { value: "bottle", label: locale === "th" ? "ขวดพลาสติก/ขวดแก้ว" : "Plastic/Glass Bottle" },
    { value: "jar", label: locale === "th" ? "กระปุก" : "Jar" },
    { value: "serumBottle", label: locale === "th" ? "ขวดเซรั่ม" : "Serum Bottle" },
    { value: "lip", label: locale === "th" ? "ลิป" : "Lip" },
    { value: "powderCase", label: locale === "th" ? "ตลับแป้ง" : "Powder Case" },
    { value: "other", label: locale === "th" ? "อื่นๆ (โปรดระบุ)" : "Other (please specify)" },
  ];

  return (
    <>
      {/* Map Section */}
      <section className="w-full h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps?q=92/4,+%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%97%E0%B8%A3%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5+2+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%97%E0%B8%A3%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%A5%E0%B8%A1+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B1%E0%B8%81+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF+10500&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Packpert Location"
        ></iframe>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              {t("title")}
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t("formTitle")}
              </h2>

              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  {t("success")}
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {t("error")}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t("namePlaceholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("email")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t("emailPlaceholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("phone")} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t("phonePlaceholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("companyPlaceholder")}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {locale === "th" ? "แพ็กเกจจิ้งที่สนใจ" : "Packaging Type"} *
                  </label>
                  <select
                    name="packagingType"
                    value={formData.packagingType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white"
                  >
                    {packagingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.packagingType === "other" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === "th" ? "โปรดระบุแพ็กเกจจิ้ง" : "Please specify packaging"} *
                    </label>
                    <input
                      type="text"
                      name="otherPackaging"
                      value={formData.otherPackaging}
                      onChange={handleChange}
                      required
                      placeholder={locale === "th" ? "ระบุประเภทแพ็กเกจจิ้ง" : "Specify packaging type"}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === "th" ? "ขนาด (กรัม / มล.)" : "Size (g / ml)"}
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      placeholder={locale === "th" ? "เช่น 50 มล., 100 กรัม" : "e.g. 50ml, 100g"}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {locale === "th" ? "จำนวนที่ต้องการ (ชิ้น)" : "Quantity (pcs)"}
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder={locale === "th" ? "เช่น 500, 1000" : "e.g. 500, 1000"}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptPrivacy"
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="acceptPrivacy" className="text-sm text-muted cursor-pointer">
                    {t("privacyAccept")}{" "}
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="text-primary hover:underline"
                    >
                      {t("privacyPolicy")}
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || !acceptPrivacy}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? tc("sending") : t("send")}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t("infoTitle")}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-secondary rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {tc("address")}
                    </h3>
                    <p className="text-muted text-sm">{t("addressValue")}</p>
                    <a
                      href="https://www.google.com/maps?q=92/4,+%E0%B8%AD%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%B2%E0%B8%97%E0%B8%A3%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5+2+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%97%E0%B8%A3%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B7%E0%B8%AD+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%A5%E0%B8%A1+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B8%A3%E0%B8%B1%E0%B8%81+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%AF+10500"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-sm mt-2 hover:underline"
                    >
                      {t("viewOnMap")}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-secondary rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {tc("email")}
                    </h3>
                    <a href="mailto:packpertcompany@gmail.com" className="text-muted text-sm hover:text-primary transition-colors">
                      packpertcompany@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-secondary rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {t("workingHours")}
                    </h3>
                    <p className="text-muted text-sm whitespace-pre-line">
                      {t("workingHoursValue")}
                    </p>
                  </div>
                </div>

                {/* LINE Contact */}
                <a
                  href="https://lin.ee/n9Tx1PK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-[#06C755] rounded-xl text-white hover:bg-[#05b34c] transition-colors"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">LINE Official</h3>
                    <p className="text-white/80 text-sm">{t("lineContact")}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
