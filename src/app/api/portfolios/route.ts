import { NextResponse } from "next/server";
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
