import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy");

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-white/80">{t("lastUpdated")}: 2025-01-01</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("introTitle")}
              </h2>
              <p className="text-muted leading-relaxed">{t("introContent")}</p>
            </div>

            {/* Section 1 - Data Collection */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section1Title")}
              </h2>
              <p className="text-muted mb-4">{t("section1Content")}</p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>{t("section1List1")}</li>
                <li>{t("section1List2")}</li>
                <li>{t("section1List3")}</li>
                <li>{t("section1List4")}</li>
              </ul>
            </div>

            {/* Section 2 - Purpose */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section2Title")}
              </h2>
              <p className="text-muted mb-4">{t("section2Content")}</p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>{t("section2List1")}</li>
                <li>{t("section2List2")}</li>
                <li>{t("section2List3")}</li>
                <li>{t("section2List4")}</li>
                <li>{t("section2List5")}</li>
              </ul>
            </div>

            {/* Section 3 - Disclosure */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section3Title")}
              </h2>
              <p className="text-muted mb-4">{t("section3Content")}</p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>{t("section3List1")}</li>
                <li>{t("section3List2")}</li>
                <li>{t("section3List3")}</li>
                <li>{t("section3List4")}</li>
              </ul>
            </div>

            {/* Section 4 - Security */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section4Title")}
              </h2>
              <p className="text-muted leading-relaxed">{t("section4Content")}</p>
            </div>

            {/* Section 5 - Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section5Title")}
              </h2>
              <p className="text-muted leading-relaxed">{t("section5Content")}</p>
            </div>

            {/* Section 6 - Rights */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section6Title")}
              </h2>
              <p className="text-muted mb-4">{t("section6Content")}</p>
              <ul className="list-disc list-inside text-muted space-y-2 ml-4">
                <li>{t("section6List1")}</li>
                <li>{t("section6List2")}</li>
                <li>{t("section6List3")}</li>
                <li>{t("section6List4")}</li>
                <li>{t("section6List5")}</li>
                <li>{t("section6List6")}</li>
                <li>{t("section6List7")}</li>
              </ul>
            </div>

            {/* Section 7 - Retention */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section7Title")}
              </h2>
              <p className="text-muted leading-relaxed">{t("section7Content")}</p>
            </div>

            {/* Section 8 - Changes */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("section8Title")}
              </h2>
              <p className="text-muted leading-relaxed">{t("section8Content")}</p>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("contactTitle")}
              </h2>
              <p className="text-muted mb-4">{t("contactContent")}</p>
              <div className="text-muted space-y-1">
                <p className="font-semibold">{t("companyName")}</p>
                <p>
                  <a
                    href="mailto:contact@packpertgroup.com"
                    className="text-primary hover:underline"
                  >
                    {t("companyEmail")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
