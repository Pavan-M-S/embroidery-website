import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

function geminiDevPlugin(): Plugin {
  return {
    name: 'gemini-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        // Enable CORS for all origins, ports, and headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-requested-with, accept, origin');
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          return res.end();
        }

        const apiKey = process.env.GEMINI_API_KEY || '';

        if (req.url === '/api/health') {
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            status: 'ok',
            service: 'Spandana Embroidery Vite Plugin',
            hasGeminiKey: !!apiKey,
          }));
        }

        if (req.url === '/api/gemini/chat' || req.url === '/api/gemini/analyze' || req.url === '/api/gemini/tts') {
          let bodyText = '';
          req.on('data', (chunk) => { bodyText += chunk; });
          req.on('end', async () => {
            let body: any = {};
            try {
              if (bodyText) body = JSON.parse(bodyText);
            } catch {}

            if (req.url === '/api/gemini/chat') {
              const { message, history } = body;
              if (!apiKey) {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  reply: 'Namaste! Welcome to Spandana Embroidery. We specialize in handcrafted Indian needlework on raw silk, cotton, and festive garments. For custom inquiries, please share your garment type and preferred colors with our home workshop!',
                }));
              }

              try {
                const ai = new GoogleGenAI({
                  apiKey: apiKey,
                  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
                });
                const contents: any[] = [];
                if (Array.isArray(history)) {
                  history.slice(-6).forEach((item: any) => {
                    contents.push({
                      role: item.role === 'user' ? 'user' : 'model',
                      parts: [{ text: item.text }],
                    });
                  });
                }
                contents.push({ role: 'user', parts: [{ text: message }] });

                const response = await ai.models.generateContent({
                  model: 'gemini-3.5-flash',
                  contents,
                  config: {
                    systemInstruction:
                      'You are the Senior Craft Consultant at Spandana Embroidery, a home-based artisan embroidery business in India known for "Quality embroidery at affordable prices". You specialize in traditional Indian needlework: Resham silk, Zari, Kasuti, Aari, Zardozi, mirror work, French knots, bullion roses, and kids pattu pavadai embellishments. Provide warm, practical, knowledgeable advice on fabrics, color pairings, stitch durability, and garment placement. Keep pricing advice honest: explain that quotes depend on fabric delicacy, stitch density, and custom dimensions. Keep replies concise, helpful, and under 150 words.',
                  },
                });
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ reply: response.text }));
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                  reply: 'For Indian embroidery on silk and festive garments, we recommend testing stitch tension with soft cotton backing. Zari and metallic threads look striking on raw silk and tussar, while bullion knots and lazy daisy stitches are gentlest on children’s garments.',
                }));
              }
            }

            if (req.url === '/api/gemini/analyze') {
              const { idea, garmentType, colors } = body;
              if (!apiKey) {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
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
                }));
              }

              try {
                const ai = new GoogleGenAI({
                  apiKey: apiKey,
                  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
                });
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
                  config: { responseMimeType: 'application/json' },
                });
                res.setHeader('Content-Type', 'application/json');
                return res.end(response.text);
              } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
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
                }));
              }
            }

            if (req.url === '/api/gemini/tts') {
              const { text } = body;
              if (!apiKey || !text) {
                res.statusCode = 503;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'TTS unavailable without API key or text' }));
              }
              try {
                const ai = new GoogleGenAI({
                  apiKey: apiKey,
                  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
                });
                const response = await ai.models.generateContent({
                  model: 'gemini-3.8-flash-lite-tts',
                  contents: [{
                    role: 'user',
                    parts: [{
                      text: text,
                      speechMetadata: { style: 'Gentle, warm, clear craft guide narrator' },
                    }],
                  }],
                  config: {
                    responseModalities: ['AUDIO'],
                    speechConfig: {
                      voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                    },
                  },
                });
                const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                if (base64Audio) {
                  const audioBuffer = Buffer.from(base64Audio, 'base64');
                  res.setHeader('Content-Type', 'audio/wav');
                  return res.end(audioBuffer);
                }
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: 'No audio returned' }));
              } catch (err) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: 'TTS error' }));
              }
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      cors: true,
    },
  };
});
