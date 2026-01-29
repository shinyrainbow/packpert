import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/public/blog/[slug] - Get single blog by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        category: true,
      },
    });

    if (!blog || !blog.isPublished) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    });

    // Get related blogs (same category or recent)
    const relatedBlogs = await prisma.blog.findMany({
      where: {
        isPublished: true,
        id: { not: blog.id },
        ...(blog.categoryId ? { categoryId: blog.categoryId } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: 4,
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...blog,
        relatedBlogs,
      },
    });
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
