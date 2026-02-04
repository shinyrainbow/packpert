import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    const updateData: {
      isRead?: boolean;
      isContacted?: boolean;
      contactedAt?: Date | null;
      notes?: string;
    } = {};

    if (data.isRead !== undefined) {
      updateData.isRead = data.isRead;
    }

    if (data.isContacted !== undefined) {
      updateData.isContacted = data.isContacted;
      updateData.contactedAt = data.isContacted ? new Date() : null;
    }

    if (data.notes !== undefined) {
      updateData.notes = data.notes;
    }

    const application = await prisma.agentApplication.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Failed to update agent application:", error);
    return NextResponse.json(
      { error: "Failed to update agent application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.agentApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete agent application:", error);
    return NextResponse.json(
      { error: "Failed to delete agent application" },
      { status: 500 }
    );
  }
}
