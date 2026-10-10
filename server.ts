import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Enable CORS for all origins, ports, methods, and headers so the API works on ANY localhost port or URL
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with, accept, origin');
  res.header('Access-Control-Max-Age', '86400');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint for port auto-discovery
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Spandana Embroidery API',
    port: PORT,
    hasGeminiKey: !!apiKey,
  });
});

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * 1. Multi-turn AI Craft Consultant Chat
 * Endpoint: POST /api/gemini/chat
 */
app.post('/api/gemini/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!apiKey) {
    return res.json({
      reply:
        'Namaste! Welcome to Spandana Embroidery. We specialize in handcrafted Indian needlework on raw silk, cotton, and festive garments. For custom inquiries, please share your garment type and preferred colors with our home workshop!',
    });
  }

  try {
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      history.slice(-6).forEach((item: { role: string; text: string }) => {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction:
          'You are the Senior Craft Consultant at Spandana Embroidery, a home-based artisan embroidery business in India known for "Quality embroidery at affordable prices". You specialize in traditional Indian needlework: Resham silk, Zari, Kasuti, Aari, Zardozi, mirror work, French knots, bullion roses, and kids pattu pavadai embellishments. Provide warm, practical, knowledgeable advice on fabrics, color pairings, stitch durability, and garment placement. Keep pricing advice honest: explain that quotes depend on fabric delicacy, stitch density, and custom dimensions. Keep replies concise, helpful, and under 150 words.',
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error generating chat reply:', error);
    res.json({
      reply:
        'For Indian embroidery on silk and festive garments, we recommend testing stitch tension with soft cotton backing. Zari and metallic threads look striking on raw silk and tussar, while bullion knots and lazy daisy stitches are gentlest on children’s garments.',
    });
  }
});

/**
 * 2. AI Custom Idea Analysis
 * Endpoint: POST /api/gemini/analyze
 */
app.post('/api/gemini/analyze', async (req, res) => {
  const { idea, garmentType, colors } = req.body;

  if (!apiKey) {
    return res.json({
      recommendedStitches: [
        'Resham Satin Fill (for petal bodies)',
        'Fine Zari Couching (for outline glint)',
        'French Knots or Bullion Stems (for textured stamens)',
      ],
      suggestedColorPalette: [
        'Deep Rose (#E11D48) with Antique Gold Zari (#D4AF37)',
        'Warm Coral (#FB923C) and Emerald Leaf Green (#059669)',
      ],
      feasibilityNote:
        'This motif concept balances well on the neckline/sleeves. We recommend mounting on lightweight cotton fusible stabilizer so the fabric drapes comfortably without puckering.',
    });
  }

  try {
    const prompt = `Analyze this custom Indian embroidery idea for a "${garmentType || 'kurti'}":
Design Idea: "${idea}"
Preferred Colors: "${colors || 'Not specified'}"

Return recommendations as JSON with properties:
- recommendedStitches: string array of 3 specific stitch types suitable for this garment
- suggestedColorPalette: string array of 2 complementary Indian color combinations
- feasibilityNote: string (1-2 sentences on stabilizer, placement, or fabric care advice)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Error analyzing design idea:', error);
    res.json({
      recommendedStitches: [
        'Resham Satin Fill',
        'Zari Outline Couching',
        'Bullion Floral Knots',
      ],
      suggestedColorPalette: [
        'Rose Pink & Antique Gold',
        'Coral Orange & Sage Green',
      ],
      feasibilityNote:
        'This design concept pairs beautifully with unstitched kurti panels or blouse cuts, allowing clean frame tensioning.',
    });
  }
});

/**
 * 3. Text-to-Speech (TTS) Endpoint
 * Endpoint: POST /api/gemini/tts
 */
app.post('/api/gemini/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  if (!apiKey) {
    return res.status(503).json({ error: 'TTS unavailable without API key' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text,
              speechMetadata: {
                style: 'Gentle, warm, clear craft guide narrator',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioBuffer = Buffer.from(base64Audio, 'base64');
      res.setHeader('Content-Type', 'audio/wav');
      return res.send(audioBuffer);
    }
    return res.status(500).json({ error: 'Audio data missing from model response' });
  } catch (error: any) {
    console.error('Error generating TTS:', error);
    return res.status(500).json({ error: 'TTS generation failed' });
  }
});

// Configure Vite in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback to transform index.html for client-side routing on any URL in dev
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Spandana Embroidery server running on port ${PORT}`);
  });
}

startServer();
