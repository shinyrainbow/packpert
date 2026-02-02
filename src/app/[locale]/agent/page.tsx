import { getTranslations, getLocale } from "next-intl/server";

export default async function AgentPage() {
  const t = await getTranslations("agent");
  const locale = await getLocale();

  return (
    <>
      {/* Banner Section */}
      <section className="relative min-h-screen flex items-center -mt-20 pt-20 pb-24">
        {/* Background Image */}
        <img
          src="/agent-program.jpeg"
          alt="Packpert Agent Program Banner"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 85%, rgba(255, 255, 255, 1) 100%)",
          }}
        />
        <div className="w-full h-full px-8 lg:px-32 relative z-10 flex items-end pb-16 lg:pb-24">
          <div className="max-w-2xl ml-4 lg:ml-12 mb-[-330px]">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg mb-6">
              {t("bannerTitle")} <span className="text-accent">&quot;{t("bannerHighlight")}&quot;</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://lin.ee/v7UuIJT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                {t("applyNow")}
              </a>
              <a
                href="https://lin.ee/v7UuIJT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                {t("askMore")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Section */}
      <section className="py-12 bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              <span className="font-bold text-primary">{t("knowledgeIntro")}</span> {t("knowledgeDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section - Why Choose */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
              {t("whyChooseTitle")}
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Zero Stock & Risk */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {t("feature1Title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("feature1Desc")}
              </p>
            </div>

            {/* High Commission */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {t("feature2Title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("feature2Desc")}
              </p>
            </div>

            {/* Dropship Service */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {t("feature3Title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("feature3Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 border-2 border-gray-300 rounded-full px-8 py-3 inline-block">
              {t("stepsTitle")}
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4">
                <img
                  src="/icons/agent1Registration.png"
                  alt="Registration"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-gray-700 font-medium">{t("step1")}</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4">
                <img
                  src="/icons/agent2Order and payment.png"
                  alt="Order and Payment"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-gray-700 font-medium">{t("step2")}</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4">
                <img
                  src="/icons/agent3Catalog sharing.png"
                  alt="Catalog Sharing"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-gray-700 font-medium">{t("step3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#d4edda]">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {t("stepsTitle")}
            </h2>
            <p className="text-gray-700 mb-8">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://lin.ee/v7UuIJT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                {t("registerNow")}
              </a>
              <a
                href="https://lin.ee/v7UuIJT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                {t("talkToStaff")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-16 bg-white"></div>
    </>
  );
}
