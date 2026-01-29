import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Prompt } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingLineButton from "@/components/FloatingLineButton";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <div className={`${prompt.variable} antialiased flex flex-col min-h-screen font-(family-name:--font-prompt)`} lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <FloatingLineButton />
      </NextIntlClientProvider>
    </div>
  );
}
