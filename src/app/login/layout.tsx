import { Noto_Sans_Thai } from "next/font/google";
import "../globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Login - Packpert Admin",
  description: "Admin login for Packpert",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSansThai.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
