import { ReplitConnectors } from "@replit/connectors-sdk";
import type {
  ContactInquiryInput,
  CustomInquiryInput,
} from "@workspace/api-zod";

const businessInbox = "spandanaemb.181224@gmail.com";

function clean(value: string): string {
  return value.replace(/\r\n?/g, "\n").replace(/\u0000/g, "").trim();
}

function encodeRawMessage(message: string): string {
  return Buffer.from(message, "utf8").toString("base64url");
}

async function sendPlainTextEmail(subject: string, body: string): Promise<void> {
  const raw = encodeRawMessage(
    [
      `To: ${businessInbox}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      body,
    ].join("\r\n"),
  );

  const connectors = new ReplitConnectors();
  const response = await connectors.proxy(
    "google-mail",
    "/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      body: { raw },
    },
  );

  if (!response.ok) {
    throw new Error(`Gmail rejected inquiry with status ${response.status}`);
  }
}

export async function sendCustomInquiryEmail(
  inquiry: CustomInquiryInput,
): Promise<void> {
  const lines = [
    "New custom embroidery inquiry",
    "",
    `Name: ${clean(inquiry.name)}`,
    `Preferred contact: ${inquiry.contactMethod}`,
    `Contact detail: ${clean(inquiry.contactValue)}`,
    `Garment: ${inquiry.garment}`,
    `Indicative budget: ${inquiry.budget ?? "Not provided"}`,
    `Preferred colours: ${clean(inquiry.colors ?? "") || "Not provided"}`,
    "",
    "Idea:",
    clean(inquiry.idea),
    "",
    `Reference URL: ${clean(inquiry.referenceUrl ?? "") || "Not provided"}`,
  ];

  await sendPlainTextEmail("New custom embroidery inquiry", lines.join("\n"));
}

export async function sendContactInquiryEmail(
  inquiry: ContactInquiryInput,
): Promise<void> {
  const lines = [
    "New contact inquiry",
    "",
    `Name: ${clean(inquiry.name)}`,
    `Email: ${clean(inquiry.email)}`,
    `Topic: ${inquiry.topic}`,
    "",
    "Message:",
    clean(inquiry.message),
  ];

  await sendPlainTextEmail("New contact inquiry", lines.join("\n"));
}
