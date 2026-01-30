import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendLineNotification } from "@/lib/line";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        subject: data.subject,
        message: data.message,
      },
    });

    // Send LINE notification
    try {
      const lineResult = await sendLineNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.subject,
        message: data.message,
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
