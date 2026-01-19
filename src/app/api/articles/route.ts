import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      titleTh,
      slug,
      excerpt,
      excerptTh,
      content,
      contentTh,
      featuredImage,
      category,
      status,
      metaTitle,
      metaTitleTh,
      metaDesc,
      metaDescTh,
    } = body;

    // Validate required fields
    if (!title || !titleTh || !slug || !content || !contentTh) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    });
    if (existingArticle) {
      return NextResponse.json(
        { error: "An article with this slug already exists" },
        { status: 400 }
      );
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const article = await prisma.article.create({
      data: {
        title,
        titleTh,
        slug,
        excerpt,
        excerptTh,
        content,
        contentTh,
        featuredImage,
        category,
        status: status || "draft",
        publishedAt: status === "published" ? new Date() : null,
        authorId: user?.id,
        metaTitle,
        metaTitleTh,
        metaDesc,
        metaDescTh,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
