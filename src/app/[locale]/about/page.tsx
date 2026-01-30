import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tHome = await getTranslations("home");
  const locale = await getLocale();

  return (
    <>
      {/* Banner Section */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center -mt-20 pt-20 pb-24">
        {/* Background Image */}
        <img
          src="/about-banner.png"
          alt="About Packpert Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 70%, rgba(255, 255, 255, 1) 100%)" }}
        />
        <div className="w-full px-8 lg:px-20 relative z-10">
          <div className="max-w-md text-white text-left lg:ml-16">
            <h1 className="text-2xl lg:text-4xl font-bold mb-2 leading-tight animate-fade-in-up">
              ที่ปรึกษามืออาชีพด้านแพ็กเกจจิ้ง
            </h1>
            <p className="text-lg lg:text-xl mb-6 leading-relaxed animate-fade-in-up-delay-1">
              ดูแลครบจบในที่เดียว ตั้งแต่ ดีไซน์ ผลิต จนถึงจัดส่ง
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
              <a
                href="https://lin.ee/Gq5zgzn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#06C755] hover:bg-[#05b34c] text-white px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                {tHome("lineDiscount")}
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-xl font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {tHome("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section with Catalog Button */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Text content - left side, 50% */}
            <div className="flex flex-col justify-center">
              <h2 className="text-lg lg:text-xl font-bold text-primary mb-3">
                {t("subtitle")}
              </h2>
              <p className="text-muted mb-4 leading-relaxed text-sm lg:text-base">
                {t("description")}
              </p>
              <Link
                href={`/${locale}/catalog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors w-fit"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {t("viewCatalog")}
              </Link>
            </div>
            {/* Video - right side, 50% */}
            <div className="rounded-2xl overflow-hidden flex items-center justify-center">
              <video
                className="h-[600px] w-auto rounded-2xl"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/packpert.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Packpert Services Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              {t("packpertServicesTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <img
                src="/icons/บริการของ Packpert1.png"
                alt="ผู้ช่วยเลือกแพ็กเกจจิ้ง"
                className="w-32 h-32 lg:w-40 lg:h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-2">ผู้ช่วยเลือกแพ็กเกจจิ้ง</h3>
              <p className="text-muted text-sm">ให้คำปรึกษาและแนะนำแพ็กเกจจิ้งที่เหมาะกับแบรนด์คุณ</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/icons/บริการของ Packpert2.png"
                alt="รับผลิตแพ็กเกจจิ้ง"
                className="w-32 h-32 lg:w-40 lg:h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-2">รับผลิตแพ็กเกจจิ้ง</h3>
              <p className="text-muted text-sm">ดูแลครบจบในที่เดียว ตั้งแต่เลือกวัสดุจนถึงจัดส่ง งานไว มั่นใจคุณภาพ พร้อมตอบโจทย์ทุกความต้องการของธุรกิจคุณ</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/icons/บริการของ Packpert3.png"
                alt="ออกแบบแพ็กเกจจิ้งและโลโก้แบรนด์"
                className="w-32 h-32 lg:w-40 lg:h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-2">ออกแบบแพ็กเกจจิ้งและโลโก้แบรนด์</h3>
              <p className="text-muted text-sm">เปลี่ยนไอเดียให้เป็นงานดีไซน์ที่โดดเด่น สร้างเอกลักษณ์ให้แบรนด์คุณเป็นที่จดจำ</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Packpert Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              {tHome("whyChooseUs")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {[
              { num: 1, label: "One-Stop Service" },
              { num: 2, label: "คุณภาพระดับพรีเมียม" },
              { num: 3, label: "มีแพ็กเกจจิ้งให้เลือกหลากหลาย" },
              { num: 4, label: "ให้คำปรึกษาแบบมืออาชีพ" },
              { num: 5, label: "รวดเร็วและตรงต่อเวลา" },
              { num: 6, label: "บริการหลังการขายและระบบตรวจสอบ" },
            ].map((item) => (
              <div key={item.num} className="flex flex-col items-center text-center">
                <img
                  src={`/icons/why${item.num}.png`}
                  alt={item.label}
                  className="w-24 h-24 lg:w-32 lg:h-32 object-contain mb-3"
                />
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for footer separation */}
      <div className="h-16 bg-white"></div>
    </>
  );
}
