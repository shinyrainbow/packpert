import { FileText, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("blog");
  const locale = await getLocale();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16" />
      <div className="container mx-auto px-2 py-20 text-center bg-gray-50">
        <FileText className="w-20 h-20 mx-auto text-gray-600 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t("notFound")}
        </h1>
        <p className="text-gray-400 mb-8">
          {t("notFoundDesc")}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#C9A227] hover:text-[#C9A227] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToBlog")}
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center px-4 py-2 bg-[#C9A227] text-white rounded-lg hover:bg-[#b8922a] transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
