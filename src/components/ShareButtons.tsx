"use client";

import { Facebook, Link2, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  shareLabel: string;
  size?: "sm" | "md";
}

export default function ShareButtons({ title, shareLabel, size = "md" }: ShareButtonsProps) {
  const handleShare = async (platform?: string) => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "x") {
      window.open(`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
    } else if (platform === "line") {
      window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`, "_blank");
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  const buttonSize = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 text-sm mr-2">{shareLabel}:</span>
      <button
        onClick={() => handleShare("facebook")}
        className={`${buttonSize} bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}
      >
        <Facebook className={`${iconSize} text-white`} />
      </button>
      <button
        onClick={() => handleShare("x")}
        className={`${buttonSize} bg-black rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}
      >
        <svg className={`${iconSize} text-white`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>
      <button
        onClick={() => handleShare("line")}
        className={`${buttonSize} bg-[#00B900] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}
      >
        <MessageCircle className={`${iconSize} text-white`} />
      </button>
      <button
        onClick={() => handleShare()}
        className={`${buttonSize} bg-[#1F2937] border border-white/20 rounded-lg flex items-center justify-center hover:border-[#C9A227] hover:text-[#C9A227] transition-all text-gray-400`}
      >
        <Link2 className={iconSize} />
      </button>
    </div>
  );
}
