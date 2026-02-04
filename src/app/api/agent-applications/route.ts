import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendLineNotification } from "@/lib/line";

export const dynamic = "force-dynamic";

// Mapping of form values to labels
const currentWorkLabels: Record<string, { th: string; en: string }> = {
  salesOEM: { th: "ฝ่ายขาย OEM", en: "OEM Sales" },
  purchasingOEM: { th: "ฝ่ายจัดซื้อ OEM", en: "OEM Purchasing" },
  brandOwner: { th: "เจ้าของแบรนด์", en: "Brand Owner" },
  brandConsultant: { th: "ที่ปรึกษาแบรนด์", en: "Brand Consultant" },
  other: { th: "อื่นๆ", en: "Other" },
};

const expectedIncomeLabels: Record<string, { th: string; en: string }> = {
  lessThan10000: { th: "ต่ำกว่า 10,000 บาท", en: "Less than 10,000 THB" },
  "10000to30000": { th: "10,000 - 30,000 บาท", en: "10,000 - 30,000 THB" },
  moreThan30000: { th: "มากกว่า 30,000 บาท", en: "More than 30,000 THB" },
};

const pricingApproachLabels: Record<string, { th: string; en: string }> = {
  explainCustomer: { th: "อธิบายลูกค้า", en: "Explain to customer" },
  consultPackpert: { th: "ปรึกษา Packpert", en: "Consult Packpert" },
  requestDiscount: { th: "ขอลดราคา", en: "Request discount" },
};

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Get labels for display
    const currentWorkLabel = currentWorkLabels[data.currentWork]
      ? `${currentWorkLabels[data.currentWork].th}`
      : data.currentWork;
    const expectedIncomeLabel = expectedIncomeLabels[data.expectedIncome]
      ? `${expectedIncomeLabels[data.expectedIncome].th}`
      : data.expectedIncome;
    const pricingApproachLabel = pricingApproachLabels[data.pricingApproach]
      ? `${pricingApproachLabels[data.pricingApproach].th}`
      : data.pricingApproach;

    const application = await prisma.agentApplication.create({
      data: {
        name: data.name,
        phone: data.phone,
        lineId: data.lineId,
        email: data.email,
        currentWork: currentWorkLabel,
        currentWorkOther: data.currentWork === "other" ? data.currentWorkOther : null,
        expectedIncome: expectedIncomeLabel,
        pricingApproach: pricingApproachLabel,
        confirmCommission: data.confirmCommission,
        confirmPricing: data.confirmPricing,
      },
    });

    // Send LINE notification
    try {
      const lineMessage = `🎉 สมัครตัวแทนใหม่!

ชื่อ: ${data.name}
โทร: ${data.phone}
Line ID: ${data.lineId}
Email: ${data.email}

งานปัจจุบัน: ${currentWorkLabel}${data.currentWorkOther ? ` (${data.currentWorkOther})` : ""}
คาดหวังรายได้: ${expectedIncomeLabel}
แนวทางราคา: ${pricingApproachLabel}`;

      await sendLineNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: "สมัครตัวแทน Packpert Agent",
        message: lineMessage,
      });
    } catch (lineError) {
      console.error("LINE notification error:", lineError);
    }

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Failed to create agent application:", error);
    return NextResponse.json(
      { error: "Failed to create agent application" },
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
    const applications = await prisma.agentApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch agent applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch agent applications" },
      { status: 500 }
    );
  }
}
