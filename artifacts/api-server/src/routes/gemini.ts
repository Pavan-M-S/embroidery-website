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

function generateSmartCraftReply(userMessage: string, history: Array<{ role: string; text: string }> = []): string {
  const msg = userMessage.toLowerCase().trim();

  if (msg.includes("price") || msg.includes("cost") || msg.includes("rate") || msg.includes("quote") || msg.includes("how much") || msg.includes("charge")) {
    return "At Spandana Embroidery, hand-embroidery pricing is transparent and affordable: minimal daily accents start around ₹350, detailed yokes/necklines range from ₹750 to ₹1,200, and grand festive/bridal work begins at ₹2,500+. Final rates depend on stitch density, thread material, and fabric delicacy.";
  }

  if (msg.includes("kid") || msg.includes("child") || msg.includes("baby") || msg.includes("pattu") || msg.includes("pavadai") || msg.includes("soft")) {
    return "For children's clothing and traditional pattu pavadais, we prioritize comfort! We use soft cotton fusible backing underneath the embroidery, soft silk threads (Resham), and smooth bullion roses or lazy daisy stitches that won't scratch delicate skin.";
  }

  if (msg.includes("wash") || msg.includes("care") || msg.includes("clean") || msg.includes("iron") || msg.includes("maintain")) {
    return "To preserve handcrafted embroidery: dry cleaning is recommended for garments on raw silk, velvet, or items with genuine Zari. For cotton kurtis, gentle hand-washing in cool water with mild liquid detergent works best. Always press on the reverse side over a soft towel!";
  }

  if (msg.includes("silk") || msg.includes("raw silk") || msg.includes("tussar") || msg.includes("organza") || msg.includes("velvet") || msg.includes("fabric")) {
    return "Raw silk, organza, and tussar are gorgeous canvases for Indian needlework! For heavy fabrics like velvet or raw silk, Zardozi and couched Zari create rich texture. For sheer organza or chanderi, fine shadow work and delicate Resham stitches drape beautifully without pulling.";
  }

  if (msg.includes("blouse") || msg.includes("neckline") || msg.includes("yoke") || msg.includes("sleeve") || msg.includes("kurti")) {
    return "Necklines and sleeve cuffs are our specialty! A grand Kasuti or Aari embroidered yoke elevates a plain kurti into designer wear. For sari blouses, elbow-length sleeve borders with subtle mirror work or bullion floral creepers add understated elegance.";
  }

  if (msg.includes("design") || msg.includes("motif") || msg.includes("pattern") || msg.includes("peacock") || msg.includes("lotus") || msg.includes("mango") || msg.includes("kalka")) {
    return "Our most requested designs are traditional Indian motifs: elegant peacocks (Mayil), sacred lotus blooms, traditional mango/kalka shapes, and geometric Kasuti patterns. We can customize any pattern to match your sari border or dupatta style.";
  }

  if (msg.includes("time") || msg.includes("duration") || msg.includes("days") || msg.includes("how long") || msg.includes("urgent")) {
    return "Custom hand-embroidery orders typically require 5 to 10 working days from design approval to completion, depending on stitch complexity. Express turnaround is available for urgent festive or wedding requirements!";
  }

  if (msg.includes("hi") || msg.includes("hello") || msg.includes("namaste") || msg.includes("hey")) {
    return "Namaste! It's a pleasure to assist you. Are you looking to embellish a kurti, sari blouse, festive dress, or children's outfit? Let me know your fabric or design ideas!";
  }

  const contextualResponses = [
    `Regarding "${userMessage}", we specialize in tailoring every detail to your vision. For custom needlework on Indian ethnic wear, combining subtle Zari outlines with vibrant Resham silk filling gives a hand-crafted, premium finish.`,
    `That's a wonderful craft inquiry! When working with ${userMessage.slice(0, 40)}, stitch tension and stabilizer backing are key. Our home workshop tests every pattern on sample fabric before stitching on your final garment.`,
    `Great question about embroidery craftsmanship! For ${userMessage.slice(0, 40)}, we recommend selecting thread colors that either complement or cleanly contrast your base fabric border for maximum visual appeal.`
  ];

  const index = Math.abs(userMessage.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % contextualResponses.length;
  return contextualResponses[index];
}

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
      reply: generateSmartCraftReply(message, history),
    });
    return;
  }

  try {
    // Format conversation history for Gemini contents, ensuring alternating roles
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((item: { role: string; text: string }) => {
        if (!item.text || !item.text.trim()) return;
        const normalizedRole: "user" | "model" = item.role === "user" ? "user" : "model";
        // Avoid consecutive duplicate roles in contents
        if (contents.length > 0 && contents[contents.length - 1].role === normalizedRole) {
          contents[contents.length - 1].parts[0].text += `\n${item.text}`;
        } else {
          contents.push({
            role: normalizedRole,
            parts: [{ text: item.text }],
          });
        }
      });
    }

    if (contents.length > 0 && contents[contents.length - 1].role === "user") {
      contents[contents.length - 1].parts[0].text += `\n${message}`;
    } else {
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction:
          'You are the Senior Craft Consultant at Spandana Embroidery, a home-based artisan embroidery business in India known for "Quality embroidery at affordable prices". You specialize in traditional Indian needlework: Resham silk, Zari, Kasuti, Aari, Zardozi, mirror work, French knots, bullion roses, and kids pattu pavadai embellishments. Provide warm, practical, knowledgeable advice on fabrics, color pairings, stitch durability, and garment placement. Keep pricing advice honest: explain that quotes depend on fabric delicacy, stitch density, and custom dimensions. Keep replies concise, helpful, and under 150 words. Do not repeat greeting messages if already conversing.',
      },
    });

    res.json({ reply: response.text || generateSmartCraftReply(message, history) });
  } catch (error: any) {
    req.log?.error(error, "Error generating chat reply");
    res.json({
      reply: generateSmartCraftReply(message, history),
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
