import { getTranslations, getLocale } from "next-intl/server";

export default async function AgentPage() {
  const t = await getTranslations("agent");
  const locale = await getLocale();

  return (
    <>
      {/* Banner Section */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center -mt-20 pt-20 pb-24">
        {/* Background Image */}
        <img
          src="/agent-banner.png"
          alt="Packpert Agent Program Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 70%, rgba(255, 255, 255, 1) 100%)",
          }}
        />
        <div className="w-full px-8 lg:px-20 relative z-10">
          <div className="max-w-lg text-center mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="https://lin.ee/Gq5zgzn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                {t("applyNow")}
              </a>
              <a
                href="https://lin.ee/Gq5zgzn"
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

      {/* Intro Section - Why Choose */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#d4edda] text-[#155724] px-8 py-3 rounded-full text-xl font-semibold mb-8">
              {t("intro")}
            </div>
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
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">{t("step1")}</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">{t("step2")}</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
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
            <div className="inline-block bg-[#d4edda] text-[#155724] px-8 py-3 rounded-full text-xl font-semibold mb-8 border-2 border-[#155724]">
              {t("intro")}
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
              {t("ctaTitle")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://lin.ee/Gq5zgzn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                {t("applyNow")}
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
