"use client";

import { useState, useEffect } from "react";

const bannerImages = [
  {
    url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop",
    alt: "Cosmetic tubes and makeup products",
  },
  {
    url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2070&auto=format&fit=crop",
    alt: "Luxury skincare packaging",
  },
  {
    url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2053&auto=format&fit=crop",
    alt: "Modern cosmetic bottles and tubes",
  },
  {
    url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=2076&auto=format&fit=crop",
    alt: "Premium gift boxes",
  },
  {
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    alt: "Elegant cosmetic product packaging",
  },
];

export default function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentIndex
              ? isTransitioning
                ? "opacity-0"
                : "opacity-100"
              : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${image.url}')` }}
          aria-label={image.alt}
        />
      ))}

      {/* Left side gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/* Bottom gradient to blend with white section below */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
    </div>
  );
}
