import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/articles - Get published articles (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    const articles = await prisma.article.findMany({
      where: {
        status: "published",
        ...(category ? { category } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        title: true,
        titleTh: true,
        slug: true,
        excerpt: true,
        excerptTh: true,
        featuredImage: true,
        category: true,
        publishedAt: true,
        viewCount: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
