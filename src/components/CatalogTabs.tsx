"use client";

import { useState } from "react";
import Image from "next/image";

interface TabData {
  name: string;
  nameTh: string;
  nameEn: string;
  images: string[];
}

interface CatalogTabsProps {
  tabs: TabData[];
  lineUrl: string;
  locale: string;
}

export default function CatalogTabs({ tabs, lineUrl, locale }: CatalogTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const getTabName = (tab: TabData) => {
    return locale === "en" ? tab.nameEn : tab.nameTh;
  };

  const getAltText = (imagePath: string) => {
    // Extract filename without extension for alt text
    const filename = imagePath.split("/").pop() || "";
    return filename.replace(/\.[^/.]+$/, "");
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === index
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {getTabName(tab)}
          </button>
        ))}
      </div>

      {/* Tab Content - Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {tabs[activeTab]?.images.map((imagePath) => (
          <a
            key={imagePath}
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
          >
            <Image
              src={imagePath}
              alt={getAltText(imagePath)}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
