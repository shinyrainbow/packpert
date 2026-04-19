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

  const shareImage = blog.coverImage || blog.sections[0]?.imageUrl || null;

  return {
    title: `${title} | Packpert`,
    description: description || undefined,
    openGraph: {
      title,
      description: description || undefined,
      type: "article",
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
