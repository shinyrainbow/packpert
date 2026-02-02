import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/blog - Get all blog posts (admin only)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await prisma.blog.findMany({
      include: {
        sections: {
          orderBy: {
            order: "asc",
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog - Create a new blog post
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Missing required fields: title and slug" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: body.slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        titleEn: body.titleEn || null,
        slug: body.slug,
        excerpt: body.excerpt || null,
        excerptEn: body.excerptEn || null,
        coverImage: body.coverImage || null,
        isPublished: body.isPublished || false,
        publishedAt: body.isPublished ? new Date() : null,
        categoryId: body.categoryId || null,
        catalogType: body.catalogType || null,
        sections: {
          create: (body.sections || []).map(
            (
              section: {
                imageUrl?: string;
                imagePosition?: string;
                content?: string;
                contentEn?: string;
              },
              index: number
            ) => ({
              order: index,
              imageUrl: section.imageUrl || null,
              imagePosition: section.imagePosition || "left",
              content: section.content || null,
              contentEn: section.contentEn || null,
            })
          ),
        },
      },
      include: {
        sections: {
          orderBy: {
            order: "asc",
          },
        },
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
