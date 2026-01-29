import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/blog - Get published blogs (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");

    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        ...(category ? { category: { slug: category } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
