import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  // Fetch blog data for metadata
  const blog = await prisma.blog.findUnique({
    where: { slug },
    select: {
      title: true,
      titleEn: true,
      excerpt: true,
      excerptEn: true,
      coverImage: true,
      sections: {
        orderBy: { order: "asc" },
        where: { imageUrl: { not: null } },
        take: 1,
        select: { imageUrl: true },
      },
    },
  });

  if (!blog) {
    return {
      title: locale === "th" ? "ไม่พบบทความ" : "Blog Not Found",
    };
  }

  // Get localized title
  const title = locale === "en" ? blog.titleEn || blog.title : blog.title;

  // Get localized excerpt
  const description = locale === "en" ? blog.excerptEn || blog.excerpt : blog.excerpt;

  const rawImage = blog.coverImage || blog.sections[0]?.imageUrl || null;
  // Serve a social-optimized version via Cloudinary transforms: 1200x630 JPG, small file size.
  // Also rewrite the file extension to .jpg so the URL matches the content-type — some social
  // crawlers (Messenger) reject images where extension disagrees with MIME type.
  const shareImage = rawImage?.includes("res.cloudinary.com")
    ? rawImage
        .replace("/upload/", "/upload/w_1200,h_630,c_fill,g_auto,f_jpg,q_auto/")
        .replace(/\.(png|webp|gif|avif)$/i, ".jpg")
    : rawImage;
  const canonicalUrl = `https://www.packpertgroup.com/${locale}/blog/${slug}`;

  return {
    title: `${title} | Packpert`,
    description: description || undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: description || undefined,
      type: "article",
      url: canonicalUrl,
      siteName: "Packpert",
      locale: locale === "th" ? "th_TH" : "en_US",
      images: shareImage
        ? [
            {
              url: shareImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

export default function BlogPostLayout({ children }: Props) {
  return children;
}
