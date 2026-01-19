import { getTranslations, getLocale } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy");
  const locale = await getLocale();

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-white/80">{t("lastUpdated")}: 2024-01-01</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white min-h-[60vh]">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("section1Title")}
            </h2>
            <p className="text-muted mb-6">{t("section1Content")}</p>

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("section2Title")}
            </h2>
            <p className="text-muted mb-6">{t("section2Content")}</p>

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("section3Title")}
            </h2>
            <p className="text-muted mb-6">{t("section3Content")}</p>

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("section4Title")}
            </h2>
            <p className="text-muted mb-6">{t("section4Content")}</p>

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("section5Title")}
            </h2>
            <p className="text-muted mb-6">{t("section5Content")}</p>

            <h2 className="text-2xl font-bold text-primary mb-4">
              {t("contactTitle")}
            </h2>
            <p className="text-muted">
              {t("contactContent")}
              <br />
              <a
                href="mailto:contact@packpert.com"
                className="text-primary hover:underline"
              >
                contact@packpert.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
