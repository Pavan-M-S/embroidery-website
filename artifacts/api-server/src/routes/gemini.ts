import { Router, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

/**
 * 1. Multi-turn AI Craft Consultant Chat
 * Endpoint: POST /gemini/chat
 */
router.post("/gemini/chat", async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  if (!apiKey) {
    res.json({
      reply:
        "Namaste! Welcome to Spandana Embroidery. Handcrafted embroidery on raw silk, cotton, and festive garments thrives with thoughtful motif placement. For custom inquiries, please share your garment type and preferred colors with our home workshop!",
    });
    return;
  }

  try {
    // Format conversation history for Gemini contents
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((item: { role: string; text: string }) => {
        contents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text }],
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction:
          'You are the Senior Craft Consultant at Spandana Embroidery, a home-based artisan embroidery business in India known for "Quality embroidery at affordable prices". You specialize in traditional Indian needlework: Resham silk, Zari, Kasuti, Aari, Zardozi, mirror work, French knots, bullion roses, and kids pattu pavadai embellishments. Provide warm, practical, knowledgeable advice on fabrics, color pairings, stitch durability, and garment placement. Keep pricing advice honest: explain that quotes depend on fabric delicacy, stitch density, and custom dimensions. Keep replies concise, helpful, and under 150 words.',
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    req.log?.error(error, "Error generating chat reply");
    res.json({
      reply:
        "For Indian embroidery on silk and festive garments, we recommend testing stitch tension with soft cotton backing. Zari and metallic threads look striking on raw silk and tussar, while bullion knots and lazy daisy stitches are gentlest on children’s garments.",
    });
  }
});

/**
 * 2. AI Custom Idea Analysis
 * Endpoint: POST /gemini/analyze
 */
router.post("/gemini/analyze", async (req: Request, res: Response) => {
  const { idea, garmentType, colors } = req.body;

  if (!apiKey) {
    res.json({
      recommendedStitches: [
        "Resham Satin Fill (for petal bodies)",
        "Fine Zari Couching (for outline glint)",
        "French Knots or Bullion Stems (for textured stamens)",
      ],
      suggestedColorPalette: [
        "Deep Rose (#E11D48) with Antique Gold Zari (#D4AF37)",
        "Warm Coral (#FB923C) and Emerald Leaf Green (#059669)",
      ],
      feasibilityNote:
        "This motif concept balances well on the neckline/sleeves. We recommend mounting on lightweight cotton fusible stabilizer so the fabric drapes comfortably without puckering.",
    });
    return;
  }

  try {
    const prompt = `Analyze this custom Indian embroidery idea for a "${garmentType || "kurti"}":
Design Idea: "${idea}"
Preferred Colors: "${colors || "Not specified"}"

Return recommendations as JSON with properties:
- recommendedStitches: string array of 3 specific stitch types suitable for this garment
- suggestedColorPalette: string array of 2 complementary Indian color combinations
- feasibilityNote: string (1-2 sentences on stabilizer, placement, or fabric care advice)`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    req.log?.error(error, "Error analyzing design idea");
    res.json({
      recommendedStitches: [
        "Resham Satin Fill",
        "Zari Outline Couching",
        "Bullion Floral Knots",
      ],
      suggestedColorPalette: [
        "Rose Pink & Antique Gold",
        "Coral Orange & Sage Green",
      ],
      feasibilityNote:
        "This design concept pairs beautifully with unstitched kurti panels or blouse cuts, allowing clean frame tensioning.",
    });
  }
});

/**
 * 3. Text-to-Speech (TTS) Endpoint
 * Endpoint: POST /gemini/tts
 */
router.post("/gemini/tts", async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  if (!apiKey) {
    res.status(503).json({ error: "TTS unavailable without API key" });
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: text,
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        // @ts-ignore - The types in GoogleGenAI are a bit strict for TTS
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioBuffer = Buffer.from(base64Audio, "base64");
      res.setHeader("Content-Type", "audio/wav");
      res.send(audioBuffer);
      return;
    }
    res.status(500).json({ error: "Audio data missing from model response" });
  } catch (error: any) {
    req.log?.error(error, "Error generating TTS");
    res.status(500).json({ error: "TTS generation failed" });
  }
});

export default router;
