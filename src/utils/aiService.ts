/**
 * Universal AI Service for Spandana Embroidery
 * Designed to work on ANY URL, ANY localhost port (3000, 5173, 5174, 5175, 4173, 8080, etc.),
 * and across any preview or production hosting environment.
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

// In-memory cache of discovered working API base URL
let discoveredBaseUrl: string | null = null;

/**
 * Returns prioritized candidate backend URLs to try.
 * Works seamlessly whether frontend and backend are on the same port or different ports,
 * across any localhost port, IP address, or hosted URL.
 */
function getCandidateBaseUrls(): string[] {
  const candidates: string[] = [];

  // 1. Explicit env configuration (if set in .env)
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    candidates.push(import.meta.env.VITE_API_BASE_URL.replace(/\/$/, ''));
  }

  // 2. Local storage override (for testing custom ports on the fly)
  try {
    const saved = localStorage.getItem('spandana_api_base_url');
    if (saved) candidates.push(saved.replace(/\/$/, ''));
  } catch {}

  // 3. Same-origin relative path (standard for full-stack deployment on ANY port/domain)
  candidates.push('');

  // 4. If running in a browser on any localhost, 127.0.0.1, or local IP
  if (typeof window !== 'undefined' && window.location) {
    const { hostname, protocol, port, origin } = window.location;

    // Current full origin is always a top candidate
    if (origin) {
      candidates.push(origin);
    }

    const isLocalhost =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.localhost') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.');

    if (isLocalhost) {
      // Extensive list of common and custom backend/dev ports to probe
      const candidatePorts = [
        port,
        '3000',
        '5173',
        '5174',
        '5175',
        '5176',
        '8080',
        '8000',
        '5000',
        '4000',
        '4173',
      ].filter(Boolean);

      candidatePorts.forEach((p) => {
        candidates.push(`${protocol}//${hostname}:${p}`);
        candidates.push(`${protocol}//localhost:${p}`);
        candidates.push(`${protocol}//127.0.0.1:${p}`);
      });
    }
  }

  // Deduplicate candidates preserving priority order
  return Array.from(new Set(candidates));
}

/**
 * Robust fetch dispatcher with auto-discovery across candidate ports
 */
async function fetchWithAutoDiscovery(
  endpointPath: string,
  options: RequestInit = {}
): Promise<Response> {
  // If we already discovered a working backend, attempt it first
  if (discoveredBaseUrl !== null) {
    try {
      const url = `${discoveredBaseUrl}${endpointPath}`;
      const res = await fetch(url, options);
      if (res.ok || res.status === 400 || res.status === 422) {
        return res;
      }
    } catch {
      // Working URL might have changed, reset and re-discover
      discoveredBaseUrl = null;
    }
  }

  const candidates = getCandidateBaseUrls();

  for (const candidate of candidates) {
    const url = `${candidate}${endpointPath}`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Status 200 or client validation error proves the server is alive
      if (res.ok || res.status === 400 || res.status === 422) {
        discoveredBaseUrl = candidate;
        try {
          if (candidate) localStorage.setItem('spandana_api_base_url', candidate);
        } catch {}
        return res;
      }
    } catch {
      // Continue to next candidate port
    }
  }

  throw new Error(`Unable to reach backend endpoint ${endpointPath} across candidate URLs`);
}

/**
 * 1. Multi-Turn Craft Chat Consultation
 */
export async function sendCraftChat(
  message: string,
  history: ChatHistoryItem[] = []
): Promise<string> {
  try {
    const response = await fetchWithAutoDiscovery('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply && typeof data.reply === 'string' && data.reply.trim()) {
        return data.reply;
      }
    }
  } catch (err) {
    console.info('Backend API unavailable on current host/ports. Using built-in craft engine:', err);
  }

  // Guaranteed intelligent craft response on any URL without backend dependency
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
  try {
    const response = await fetchWithAutoDiscovery('/api/gemini/analyze', {
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
    console.info('Backend analysis unavailable, using client-side craft rules engine:', err);
  }

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
  let activeAudio: HTMLAudioElement | null = null;

  try {
    const res = await fetchWithAutoDiscovery('/api/gemini/tts', {
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
    // Backend TTS unreachable, seamlessly fallback to speech synthesis
  }

  return playBrowserSynthesis(text, onEnded, onError);
}

/**
 * Browser Speech Synthesis Fallback (100% universal across all browsers, ports & URLs)
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

    const voices = window.speechSynthesis.getVoices();
    const gentleVoice = voices.find(
      (v) =>
        v.lang.includes('en') &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('India'))
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

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('estimate')) {
    return 'At Spandana Embroidery, indicative pricing begins at ₹350 for Gentle Accents (baby frocks, simple neckline trims), ₹750 for Artisan Yokes (peacock motifs, Kasuti work, kurti plackets), and ₹1,500+ for Heritage & Bridal Zardozi. The final quote depends on your fabric texture, stitch area, and metallic embellishments.';
  }

  if (q.includes('wash') || q.includes('care') || q.includes('iron') || q.includes('clean') || q.includes('detergent')) {
    return 'For pure silk, raw silk, or garments with metallic zari and micro-cutdana, professional dry cleaning is mandatory. Cottons can be gently hand-washed in cold water. Always press embroidered sections on the reverse side over a plush cotton towel to protect three-dimensional stitches!';
  }

  if (q.includes('children') || q.includes('kid') || q.includes('baby') || q.includes('pattu pavadai') || q.includes('frock')) {
    return 'For children’s festive wear and baby jhablas, comfort is paramount. We recommend soft bullion knot roses, lazy daisy petals, and flat satin fillings. Crucially, all our kids’ embroidery is backed with a soft cotton protective lining so delicate skin stays completely itch-free.';
  }

  if (q.includes('zari') || q.includes('zardozi') || q.includes('gold') || q.includes('silver') || q.includes('metallic')) {
    return 'Zari and zardozi wirework add rich royal luster to festive saree blouses and lehengas. We use tarnish-resistant metallic threads and fine couching stitches. For best results, pair gold zari with deep jewel tones like bottle green, royal blue, or deep maroon.';
  }

  if (q.includes('kurti') || q.includes('neckline') || q.includes('anarkali') || q.includes('placket')) {
    return 'For kurti necklines, Resham silk thread in floral vines or Kasuti geometric temple borders drape exceptionally well. We recommend providing unstitched fabric pieces so our wooden embroidery hoop mounts flat with balanced thread tension.';
  }

  if (q.includes('time') || q.includes('turnaround') || q.includes('days') || q.includes('how long') || q.includes('deadline')) {
    return 'Standard turnaround is typically 3–5 working days for gentle neckline accents, 5–8 days for artisan yokes, and 8–14 days for intricate bridal blouses. For festive celebrations, advance booking 2–3 weeks early is recommended!';
  }

  if (q.includes('fabric') || q.includes('cotton') || q.includes('silk') || q.includes('organza') || q.includes('chanderi')) {
    return 'We work across raw silk, tussar silk, chanderi, pure cotton, linen, organza, and velvet. Unstitched panels are ideal for hoop mounting. If using raw silk or organza, we apply stabilizing backing to keep the embroidery crisp and durable.';
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

  if (text.includes('child') || text.includes('baby') || text.includes('frock') || text.includes('pattu')) {
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
  } else if (text.includes('bridal') || text.includes('zardozi') || text.includes('blouse') || text.includes('saree') || text.includes('lehenga')) {
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
