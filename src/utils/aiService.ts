/**
 * Universal AI Service for Spandana Embroidery
 * Works across all environments: AI Studio Preview, Cloud Run, Localhost, and Standalone URLs.
 * Automatically resolves the backend API route with intelligent client-side craft fallback.
 */

export interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

export interface IdeaAnalysisResult {
  recommendedStitches: string[];
  suggestedColorPalette: string[];
  feasibilityNote: string;
}

// Get the base URL for API requests.
// Supports custom VITE_API_BASE_URL, relative path on same host, or fallback
const getApiBaseUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  return '';
};

/**
 * 1. Multi-Turn Craft Chat Consultation
 */
export async function sendCraftChat(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<string> {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/gemini/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply && data.reply.trim()) {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn('Backend chat route unreachable, engaging intelligent craft engine:', err);
  }

  // Intelligent client-side craft fallback (works on any URL without backend)
  return generateClientCraftReply(message);
}

/**
 * 2. Analyze Custom Design Idea
 */
export async function analyzeCustomIdea(
  idea: string,
  garmentType: string,
  colors: string
): Promise<IdeaAnalysisResult> {
  const baseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/api/gemini/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea, garmentType, colors }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.recommendedStitches && data.suggestedColorPalette) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend analysis route unreachable, using craft rules engine:', err);
  }

  // Domain-authentic client-side analysis
  return generateClientIdeaAnalysis(idea, garmentType, colors);
}

/**
 * 3. Text-to-Speech (TTS) Narration
 */
export async function playTextToSpeech(
  text: string,
  onEnded?: () => void,
  onError?: (err: string) => void
): Promise<() => void> {
  const baseUrl = getApiBaseUrl();
  let activeAudio: HTMLAudioElement | null = null;

  // Try server-side Gemini TTS first
  try {
    const res = await fetch(`${baseUrl}/api/gemini/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      activeAudio = new Audio(audioUrl);
      activeAudio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        onEnded?.();
      };
      activeAudio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        playBrowserSynthesis(text, onEnded, onError);
      };
      await activeAudio.play();

      return () => {
        if (activeAudio) {
          activeAudio.pause();
          activeAudio.src = '';
        }
      };
    }
  } catch {
    // If backend TTS is unavailable, fallback to browser speech synthesis
  }

  return playBrowserSynthesis(text, onEnded, onError);
}

/**
 * Browser Speech Synthesis Fallback (100% universal across all browsers/URLs)
 */
function playBrowserSynthesis(
  text: string,
  onEnded?: () => void,
  onError?: (err: string) => void
): () => void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    // Pick gentle natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const gentleVoice = voices.find(
      (v) => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (gentleVoice) utterance.voice = gentleVoice;

    utterance.onend = () => onEnded?.();
    utterance.onerror = () => {
      onError?.('Speech playback finished.');
      onEnded?.();
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }

  onError?.('Audio narration not supported in this browser environment.');
  onEnded?.();
  return () => {};
}

/**
 * Domain-specific Craft Knowledge Responder
 */
function generateClientCraftReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much')) {
    return 'At Spandana Embroidery, indicative pricing begins at ₹350 for Gentle Accents (baby frocks, simple neckline trims), ₹750 for Artisan Yokes (peacock motifs, Kasuti work, kurti plackets), and ₹1,500+ for Heritage & Bridal Zardozi. The final quote depends on your fabric texture, stitch area, and metallic embellishments.';
  }

  if (q.includes('wash') || q.includes('care') || q.includes('iron') || q.includes('clean')) {
    return 'For pure silk, raw silk, or garments with metallic zari and micro-cutdana, professional dry cleaning is mandatory. Cottons can be gently hand-washed in cold water. Always press embroidered sections on the reverse side over a plush cotton towel to protect three-dimensional stitches!';
  }

  if (q.includes('children') || q.includes('kid') || q.includes('baby') || q.includes('pattu pavadai')) {
    return 'For children’s festive wear and baby jhablas, comfort is paramount. We recommend soft bullion knot roses, lazy daisy petals, and flat satin fillings. Crucially, all our kids’ embroidery is backed with a soft cotton protective lining so delicate skin stays completely itch-free.';
  }

  if (q.includes('zari') || q.includes('zardozi') || q.includes('gold')) {
    return 'Zari and zardozi wirework add rich royal luster to festive saree blouses and lehengas. We use tarnish-resistant metallic threads and fine couching stitches. For best results, pair gold zari with deep jewel tones like bottle green, royal blue, or deep maroon.';
  }

  if (q.includes('kurti') || q.includes('neckline') || q.includes('anarkali')) {
    return 'For kurti necklines, Resham silk thread in floral vines or Kasuti geometric temple borders drape exceptionally well. We recommend providing unstitched fabric pieces so our wooden embroidery hoop mounts flat with balanced thread tension.';
  }

  if (q.includes('time') || q.includes('turnaround') || q.includes('days') || q.includes('how long')) {
    return 'Standard turnaround is typically 3–5 working days for gentle neckline accents, 5–8 days for artisan yokes, and 8–14 days for intricate bridal blouses. For festive celebrations, advance booking 2–3 weeks early is recommended!';
  }

  return 'Namaste! At Spandana Embroidery, we specialize in handcrafting Indian needlework—including Resham silk satin stitches, Kasuti geometry, Zardozi wirework, and French knots. Whether you are planning an everyday cotton kurti or a festive bridal blouse, feel free to share your fabric type and color preferences!';
}

/**
 * Domain-specific Idea Analysis Generator
 */
function generateClientIdeaAnalysis(
  idea: string,
  garmentType: string,
  colors: string
): IdeaAnalysisResult {
  const text = (idea + ' ' + garmentType + ' ' + colors).toLowerCase();

  let recommendedStitches = [
    'Resham Satin Fill (for lush petal bodies)',
    'Fine Zari Couching (for glistening border outlines)',
    'French Knots or Bullion Stems (for textured floral centers)',
  ];

  let suggestedColorPalette = [
    'Deep Rose (#E11D48) with Antique Gold Zari (#D4AF37)',
    'Warm Coral (#FB923C) and Emerald Leaf Green (#059669)',
  ];

  let feasibilityNote =
    'This motif concept balances well across the neckline and cuffs. We recommend mounting on lightweight cotton fusible stabilizer to prevent fabric puckering during hand needlework.';

  if (text.includes('child') || text.includes('baby') || text.includes('frock')) {
    recommendedStitches = [
      'Bullion Knot Buds (smooth, rounded relief)',
      'Lazy Daisy Petals (lightweight thread loops)',
      'Feather Stem Stitch (gentle botanical sprigs)',
    ];
    suggestedColorPalette = [
      'Pastel Rose (#FDA4AF) with Buttercup Yellow (#FDE047)',
      'Mint Sage (#86EFAC) and Soft Coral (#FDBA74)',
    ];
    feasibilityNote =
      'Extremely suitable for children’s apparel. We will apply an ultra-soft inner cotton lining barrier so no stitches touch sensitive skin.';
  } else if (text.includes('bridal') || text.includes('zardozi') || text.includes('blouse') || text.includes('saree')) {
    recommendedStitches = [
      'Authentic Zardozi Coiled Wire Couching',
      'Seed Pearl and Micro-Cutdana Highlights',
      'Dense Aari Chain Fill with Gilt Zari',
    ];
    suggestedColorPalette = [
      'Matte Gold Zari with Royal Crimson Accents',
      'Champagne Metallic Wire with Ruby Red & Bottle Green',
    ];
    feasibilityNote =
      'High-impact festive artistry. Ensure your tailor leaves at least 2 inches of margin along the armhole and back arch for clean mounting on our embroidery frame.';
  }

  return {
    recommendedStitches,
    suggestedColorPalette,
    feasibilityNote,
  };
}
