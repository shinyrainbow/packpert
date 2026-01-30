import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/blog-categories - Fetch all blog categories
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Failed to fetch blog categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog-categories - Create a new blog category
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, nameEn, slug, color } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const category = await prisma.blogCategory.create({
      data: {
        name,
        nameEn: nameEn || null,
        slug,
        color: color || "#3B82F6",
      },
    });

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Failed to create blog category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category" },
      { status: 500 }
    );
  }
}
