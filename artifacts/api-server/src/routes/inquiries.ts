import { Router, type IRouter, type Request, type Response } from "express";
import {
  SendContactInquiryBody,
  SendCustomInquiryBody,
  SendCustomInquiryResponse,
} from "@workspace/api-zod";
import {
  sendContactInquiryEmail,
  sendCustomInquiryEmail,
} from "../lib/inquiry-email";

const router: IRouter = Router();

function rejectInvalidRequest(
  req: Request,
  res: Response,
  issuePaths: string[],
): void {
  req.log.warn({ issuePaths }, "Rejected invalid inquiry");
  res.status(400).json({
    error: "Please check the required fields and consent notice.",
  });
}

async function deliverInquiry(
  req: Request,
  res: Response,
  send: () => Promise<void>,
): Promise<void> {
  try {
    await send();
    res
      .status(202)
      .json(SendCustomInquiryResponse.parse({ status: "sent" }));
  } catch (error) {
    req.log.error(
      {
        errorType: error instanceof Error ? error.name : "UnknownError",
      },
      "Inquiry email delivery failed",
    );
    res.status(502).json({
      error:
        "We couldn't send your inquiry right now. Please try again or email the studio directly.",
    });
  }
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return (
    digits.length >= 7 &&
    digits.length <= 15 &&
    /^\+?[\d\s().-]+$/.test(value)
  );
}

router.post("/inquiries/custom", async (req, res): Promise<void> => {
  const parsed = SendCustomInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    rejectInvalidRequest(
      req,
      res,
      parsed.error.issues.map((issue) => issue.path.join(".")),
    );
    return;
  }

  const inquiry = parsed.data;
  if (
    inquiry.consent !== true ||
    !inquiry.name.trim() ||
    !inquiry.contactValue.trim() ||
    !inquiry.idea.trim()
  ) {
    rejectInvalidRequest(req, res, ["requiredFields"]);
    return;
  }

  if (
    (inquiry.contactMethod === "email" &&
      !isValidEmail(inquiry.contactValue)) ||
    (inquiry.contactMethod === "phone" &&
      !isValidPhone(inquiry.contactValue))
  ) {
    rejectInvalidRequest(req, res, ["contactValue"]);
    return;
  }

  if (inquiry.website?.trim()) {
    res
      .status(202)
      .json(SendCustomInquiryResponse.parse({ status: "sent" }));
    return;
  }

  await deliverInquiry(req, res, () => sendCustomInquiryEmail(inquiry));
});

router.post("/inquiries/contact", async (req, res): Promise<void> => {
  const parsed = SendContactInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    rejectInvalidRequest(
      req,
      res,
      parsed.error.issues.map((issue) => issue.path.join(".")),
    );
    return;
  }

  const inquiry = parsed.data;
  if (
    inquiry.consent !== true ||
    !inquiry.name.trim() ||
    !inquiry.message.trim()
  ) {
    rejectInvalidRequest(req, res, ["requiredFields"]);
    return;
  }

  if (inquiry.website?.trim()) {
    res
      .status(202)
      .json(SendCustomInquiryResponse.parse({ status: "sent" }));
    return;
  }

  await deliverInquiry(req, res, () => sendContactInquiryEmail(inquiry));
});

export default router;
