interface ContactData {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
}

export async function sendLineNotification(contact: ContactData): Promise<boolean> {
  const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;

  console.log("LINE notification triggered");
  console.log("TOKEN exists:", !!LINE_CHANNEL_ACCESS_TOKEN);
  console.log("USER_ID exists:", !!LINE_ADMIN_USER_ID);

  if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_ADMIN_USER_ID) {
    console.error("LINE credentials not configured - TOKEN:", !!LINE_CHANNEL_ACCESS_TOKEN, "USER_ID:", !!LINE_ADMIN_USER_ID);
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
    console.log("Sending LINE message to:", LINE_ADMIN_USER_ID);

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

    const responseText = await response.text();
    console.log("LINE API response status:", response.status);
    console.log("LINE API response:", responseText);

    if (!response.ok) {
      console.error("LINE API error:", response.status, responseText);
      return false;
    }

    console.log("LINE notification sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send LINE notification:", error);
    return false;
  }
}
