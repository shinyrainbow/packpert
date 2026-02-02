import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendLineNotification } from "@/lib/line";

export const dynamic = "force-dynamic";

// Mapping of packaging type values to labels
const packagingLabels: Record<string, { th: string; en: string }> = {
  creamTube: { th: "หลอดครีม", en: "Cream Tube" },
  stickTube: { th: "หลอดสติ๊ก", en: "Stick Tube" },
  bottle: { th: "ขวดพลาสติก/ขวดแก้ว", en: "Plastic/Glass Bottle" },
  jar: { th: "กระปุก", en: "Jar" },
  serumBottle: { th: "ขวดเซรั่ม", en: "Serum Bottle" },
  lip: { th: "ลิป", en: "Lip" },
  powderCase: { th: "ตลับแป้ง", en: "Powder Case" },
  other: { th: "อื่นๆ", en: "Other" },
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Get packaging type label
    const packagingType = data.packagingType || "";
    const packagingLabel = packagingLabels[packagingType]
      ? `${packagingLabels[packagingType].th} / ${packagingLabels[packagingType].en}`
      : packagingType;

    // Build subject from packaging type
    const subject = packagingType === "other" && data.otherPackaging
      ? `${packagingLabel}: ${data.otherPackaging}`
      : packagingLabel;

    // Build message from size and quantity
    const messageParts: string[] = [];
    if (data.size) {
      messageParts.push(`ขนาด/Size: ${data.size}`);
    }
    if (data.quantity) {
      messageParts.push(`จำนวน/Quantity: ${data.quantity} ชิ้น/pcs`);
    }
    const message = messageParts.length > 0 ? messageParts.join("\n") : "-";

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        subject: subject,
        message: message,
      },
    });

    // Send LINE notification
    try {
      const lineResult = await sendLineNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: subject,
        message: message,
      });
      console.log("LINE notification result:", lineResult);
    } catch (lineError) {
      console.error("LINE notification error:", lineError);
    }

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Failed to create contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
