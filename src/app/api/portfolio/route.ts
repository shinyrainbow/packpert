import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Failed to fetch portfolios:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
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
      description,
      descriptionTh,
      image,
      images,
      client,
      category,
      sortOrder,
    } = body;

    // Validate required fields
    if (!title || !titleTh || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        titleTh,
        slug,
        description,
        descriptionTh,
        image,
        images,
        client,
        category,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
