import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
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
      name,
      nameTh,
      slug,
      description,
      descriptionTh,
      category,
      minOrder,
      material,
      materialTh,
      sizes,
      sizesTh,
      features,
      featuresTh,
      image,
      isFeatured,
      isActive,
      sortOrder,
      metaTitle,
      metaTitleTh,
      metaDesc,
      metaDescTh,
    } = body;

    // Validate required fields
    if (!name || !nameTh || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        nameTh,
        slug,
        description,
        descriptionTh,
        category,
        minOrder,
        material,
        materialTh,
        sizes,
        sizesTh,
        features,
        featuresTh,
        image,
        isFeatured: isFeatured || false,
        isActive: isActive !== false,
        sortOrder: sortOrder || 0,
        metaTitle,
        metaTitleTh,
        metaDesc,
        metaDescTh,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
