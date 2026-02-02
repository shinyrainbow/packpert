import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "th"
      ? "ติดต่อเรา - Packpert บรรจุภัณฑ์เครื่องสำอาง"
      : "Contact Us - Packpert Cosmetic Packaging";

  const description =
    locale === "th"
      ? "ติดต่อ Packpert สอบถามข้อมูล ขอใบเสนอราคาบรรจุภัณฑ์เครื่องสำอาง โทร 063-652-1222 หรือ Line @packpert"
      : "Contact Packpert for inquiries and cosmetic packaging quotes. Call 063-652-1222 or Line @packpert";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "th" ? "th_TH" : "en_US",
      siteName: "Packpert",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        th: "/th/contact",
        en: "/en/contact",
      },
    },
  };
}

export default function ContactLayout({ children }: Props) {
  return children;
}
