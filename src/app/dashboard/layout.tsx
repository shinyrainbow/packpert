import { Noto_Sans_Thai } from "next/font/google";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import "../globals.css";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardProviders from "@/components/DashboardProviders";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Dashboard - Packpert Admin",
  description: "Admin dashboard for Packpert",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className={`${notoSansThai.variable} antialiased bg-gray-50 min-h-screen`}>
      <DashboardProviders>
        <DashboardSidebar user={session.user} />
        <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </DashboardProviders>
    </div>
  );
}
