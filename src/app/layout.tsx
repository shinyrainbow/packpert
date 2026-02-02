import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ศูนย์รวมแพ็กเกจจิ้งทุกชนิด รับผลิตและจำหน่าย | Packpert",
  description: "Your trusted partner for quality packaging solutions. Custom packaging for cosmetics, food, and various industries.",
  keywords: ["packaging", "custom packaging", "cosmetics packaging", "food packaging", "Thailand packaging", "บรรจุภัณฑ์"],
  authors: [{ name: "Packpert" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ศูนย์รวมแพ็กเกจจิ้งทุกชนิด รับผลิตและจำหน่าย | Packpert",
    description: "Your trusted partner for quality packaging solutions. Custom packaging for cosmetics, food, and various industries.",
    type: "website",
    locale: "th_TH",
    siteName: "Packpert",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
