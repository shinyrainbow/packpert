"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Mail,
  FileText,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email: string;
  };
}

const navItems = [
  {
    href: "/dashboard",
    label: "ข้อความ",
    labelEn: "Messages",
    icon: Mail,
  },
  {
    href: "/dashboard/blog",
    label: "บล็อก",
    labelEn: "Blog",
    icon: FileText,
  },
  {
    href: "/dashboard/portfolio",
    label: "ผลงาน",
    labelEn: "Portfolio",
    icon: ImageIcon,
  },
];

const translations = {
  th: {
    adminDashboard: "แดชบอร์ดผู้ดูแล",
    viewWebsite: "ดูเว็บไซต์",
    logout: "ออกจากระบบ",
  },
  en: {
    adminDashboard: "Admin Dashboard",
    viewWebsite: "View Website",
    logout: "Logout",
  },
};

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lang, setLang] = useState<"th" | "en">("th");

  useEffect(() => {
    const savedLang = localStorage.getItem("dashboard-lang") as "th" | "en";
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "th" ? "en" : "th";
    setLang(newLang);
    localStorage.setItem("dashboard-lang", newLang);
  };

  const t = translations[lang];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C9A227] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Packpert</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMobileOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C9A227] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">Packpert</span>
                <p className="text-xs text-gray-500">{t.adminDashboard}</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#C9A227] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {lang === "en" ? item.labelEn : item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span>{lang === "th" ? "ภาษา" : "Language"}</span>
              </div>
              <span className="px-2 py-1 bg-[#C9A227]/10 text-[#C9A227] rounded-md text-xs font-bold">
                {lang.toUpperCase()}
              </span>
            </button>

            {/* View Website */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              {t.viewWebsite}
            </Link>

            {/* User Info */}
            <div className="px-4 py-3 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            {/* Logout */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {t.logout}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
