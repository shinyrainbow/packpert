const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;

interface ContactData {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
}

export async function sendLineNotification(contact: ContactData): Promise<boolean> {
  if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_ADMIN_USER_ID) {
    console.warn("LINE credentials not configured");
    return false;
  }

  const message = `📩 New Contact Form Submission

👤 Name: ${contact.name}
📧 Email: ${contact.email}
${contact.phone ? `📞 Phone: ${contact.phone}\n` : ""}${contact.company ? `🏢 Company: ${contact.company}\n` : ""}
📝 Subject: ${contact.subject}

💬 Message:
${contact.message}`;

  try {
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        to: LINE_ADMIN_USER_ID,
        messages: [
          {
            type: "text",
            text: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("LINE API error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send LINE notification:", error);
    return false;
  }
}
