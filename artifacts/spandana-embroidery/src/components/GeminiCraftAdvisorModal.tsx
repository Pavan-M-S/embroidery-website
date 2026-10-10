import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  Settings,
  Key,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

import { smartCraftReply } from "../lib/offlineCraftAdvisor";
import { WEBSITE_KNOWLEDGE_PAYLOAD } from "../lib/websiteKnowledge";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: number;
}

const SYSTEM_INSTRUCTION = `You are the Senior Craft Consultant at Spandana Embroidery, a home-based artisan embroidery business in India known for "Quality embroidery at affordable prices". You specialize in traditional Indian needlework: Resham silk, Zari, Kasuti, Aari, Zardozi, mirror work, French knots, bullion roses, and kids pattu pavadai embellishments. Provide warm, practical, knowledgeable advice on fabrics, color pairings, stitch durability, garment placement, website navigation, pricing tiers, and custom quotes. Keep pricing advice honest: explain that quotes depend on fabric delicacy, stitch density, and custom dimensions. Keep replies concise, helpful, and under 150 words.

BUSINESS CONTACT & LOCATION DETAILS:
- Phone / WhatsApp: +91 7207402157
- Boutique Location: Tadipatri, Andhra Pradesh (PIN 515411)
- Email: contact@spandana.in / support@spandanaembroidery.com

${WEBSITE_KNOWLEDGE_PAYLOAD}

CONVERSATIONAL MEMORY & CONTEXT RULES:
- You must actively use and remember all previous chat turns provided in the conversation history (treat it as your working memory cache).
- Retain all details mentioned by the user in earlier messages (such as fabric type, occasion, colors, garment type, budget, or previous questions) and build directly upon them without asking the user to repeat themselves.
- Do not repeat opening greetings (like "Namaste" or introductions) if the conversation is already underway. Continue the discussion seamlessly.`;

// Build-time globals from vite.config.ts define block
declare const __ENV_PROVIDER_API_KEY__: string | undefined;
declare const __ENV_PROVIDER_BASE_URL__: string | undefined;
declare const __ENV_PROVIDER_MODEL__: string | undefined;
declare const __ENV_GEMINI_API_KEY__: string | undefined;
declare const __ENV_GEMINI_BASE_URL__: string | undefined;
declare const __ENV_GEMINI_MODEL__: string | undefined;

// Resolve static environment variables with fallbacks
const resolveEnv = (staticVal: any, definedVal?: string): string => {
  if (typeof staticVal === "string" && staticVal.trim())
    return staticVal.trim();
  if (typeof definedVal === "string" && definedVal.trim())
    return definedVal.trim();
  return "";
};

// Static build-time values
const STATIC_PROVIDER_KEY = resolveEnv(
  import.meta.env.VITE_PROVIDER_API_KEY ||
    import.meta.env.PROVIDER_API_KEY ||
    import.meta.env.VITE_OPENROUTER_API_KEY ||
    import.meta.env.OPENROUTER_API_KEY,
  typeof __ENV_PROVIDER_API_KEY__ !== "undefined"
    ? __ENV_PROVIDER_API_KEY__
    : "",
);

const STATIC_PROVIDER_BASE_URL = resolveEnv(
  import.meta.env.VITE_PROVIDER_BASE_URL || import.meta.env.PROVIDER_BASE_URL,
  typeof __ENV_PROVIDER_BASE_URL__ !== "undefined"
    ? __ENV_PROVIDER_BASE_URL__
    : "",
);

const STATIC_PROVIDER_MODELS = resolveEnv(
  import.meta.env.VITE_PROVIDER_MODEL ||
    import.meta.env.PROVIDER_MODEL ||
    import.meta.env.VITE_PROVIDER_MODELS ||
    import.meta.env.PROVIDER_MODELS ||
    import.meta.env.VITE_AI_MODELS ||
    import.meta.env.AI_MODELS ||
    import.meta.env.VITE_MODELS ||
    import.meta.env.MODELS,
  typeof __ENV_PROVIDER_MODEL__ !== "undefined" ? __ENV_PROVIDER_MODEL__ : "",
);

const STATIC_GEMINI_KEY = resolveEnv(
  import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY,
  typeof __ENV_GEMINI_API_KEY__ !== "undefined" ? __ENV_GEMINI_API_KEY__ : "",
);

const STATIC_GEMINI_BASE_URL = resolveEnv(
  import.meta.env.VITE_GEMINI_BASE_URL || import.meta.env.GEMINI_BASE_URL,
  typeof __ENV_GEMINI_BASE_URL__ !== "undefined" ? __ENV_GEMINI_BASE_URL__ : "",
);

const STATIC_GEMINI_MODEL = resolveEnv(
  import.meta.env.VITE_GEMINI_MODEL || import.meta.env.GEMINI_MODEL,
  typeof __ENV_GEMINI_MODEL__ !== "undefined" ? __ENV_GEMINI_MODEL__ : "",
);

// Fallback models when custom provider key is set but no models specified
const DEFAULT_PROVIDER_MODELS = [
  "google/gemini-2.0-flash-001",
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-chat",
  "mistralai/mistral-7b-instruct:free",
  "openai/gpt-4o-mini",
];

function parseModelsList(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
    .filter((s) => s.length > 0)
    .slice(0, 5);
}

function normalizeProviderEndpoint(rawBaseUrl: string): string {
  let base = (rawBaseUrl || "https://openrouter.ai/api/v1")
    .trim()
    .replace(/\/+$/, "");
  if (base.includes("openrouter.ai") && !base.includes("/v1")) {
    base = `${base}/api/v1`;
  }
  if (base.endsWith("/chat/completions")) {
    return base;
  }
  return `${base}/chat/completions`;
}

// Error payload filter
function isInvalidErrorContent(text: string): boolean {
  if (!text || !text.trim()) return true;
  const lower = text.toLowerCase();
  return (
    lower.startsWith("error:") ||
    lower.startsWith('{"error"') ||
    lower.includes("rate limit") ||
    lower.includes("quota exceeded") ||
    lower.includes("insufficient_quota") ||
    lower.includes("token limit") ||
    lower.includes("model not found") ||
    lower.includes("error 404") ||
    lower.includes("error 429") ||
    lower.includes("error 500") ||
    lower.includes("service unavailable") ||
    lower.includes("overloaded") ||
    lower.includes("credits expired") ||
    lower.includes("unauthorized") ||
    lower.includes("temporarily unavailable")
  );
}

export const GeminiCraftAdvisorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}> = ({ isOpen, onClose, topic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Namaste! Welcome to Spandana Embroidery. I am your Craft & Motif Consultant. How can I help you today? You can ask about embroidery styles, fabric recommendations, festive color pairings, or garment care.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // User-configurable overrides stored in localStorage for easy live testing
  const [customKey, setCustomKey] = useState<string>(() => {
    return (
      localStorage.getItem("spandana_provider_key") || STATIC_PROVIDER_KEY || ""
    );
  });
  const [customBaseUrl, setCustomBaseUrl] = useState<string>(() => {
    return (
      localStorage.getItem("spandana_provider_base_url") ||
      STATIC_PROVIDER_BASE_URL ||
      ""
    );
  });
  const [customModels, setCustomModels] = useState<string>(() => {
    return (
      localStorage.getItem("spandana_provider_models") ||
      STATIC_PROVIDER_MODELS ||
      ""
    );
  });
  const [geminiKey, setGeminiKey] = useState<string>(() => {
    return (
      localStorage.getItem("spandana_gemini_key") || STATIC_GEMINI_KEY || ""
    );
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Active runtime configuration
  const activeProviderKey = (customKey.trim() || STATIC_PROVIDER_KEY).trim();
  const activeBaseUrl = (
    customBaseUrl.trim() || STATIC_PROVIDER_BASE_URL
  ).trim();
  const rawModelString = (customModels.trim() || STATIC_PROVIDER_MODELS).trim();
  const parsedModels = parseModelsList(rawModelString);
  const activeModels =
    parsedModels.length > 0
      ? parsedModels
      : activeProviderKey
        ? DEFAULT_PROVIDER_MODELS
        : [];
  const activeGeminiKey = (geminiKey.trim() || STATIC_GEMINI_KEY).trim();

  // If a topic was prefilled from another page
  useEffect(() => {
    if (topic && isOpen) {
      handleSendPrompt(topic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const saveSettings = () => {
    localStorage.setItem("spandana_provider_key", customKey.trim());
    localStorage.setItem("spandana_provider_base_url", customBaseUrl.trim());
    localStorage.setItem("spandana_provider_models", customModels.trim());
    localStorage.setItem("spandana_gemini_key", geminiKey.trim());
    setShowSettings(false);
  };

  const resetSettingsToEnv = () => {
    localStorage.removeItem("spandana_provider_key");
    localStorage.removeItem("spandana_provider_base_url");
    localStorage.removeItem("spandana_provider_models");
    localStorage.removeItem("spandana_gemini_key");
    setCustomKey(STATIC_PROVIDER_KEY);
    setCustomBaseUrl(STATIC_PROVIDER_BASE_URL);
    setCustomModels(STATIC_PROVIDER_MODELS);
    setGeminiKey(STATIC_GEMINI_KEY);
  };

  if (!isOpen) return null;

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: textToSend.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      let reply = "";

      // Build recent conversational history (excluding initial greeting to avoid role issues)
      const convoHistory = messages.filter(
        (m, idx) => idx > 0 && m.text && m.text.trim(),
      );

      const historySummary = convoHistory
        .map(
          (m) =>
            `${m.role === "model" ? "Craft Consultant" : "Customer"}: ${m.text}`,
        )
        .join("\n");

      const promptWithContext =
        convoHistory.length > 0
          ? `[CONVERSATION HISTORY & MEMORY CACHE]\n${historySummary}\n\n[CONVERSATIONAL MEMORY & CONTEXT RULES]\n- You must actively use and remember all previous chat turns provided in the conversation history (treat it as your working memory cache).\n- Retain all details mentioned by the user in earlier messages (such as fabric type, occasion, colors, garment type, budget, or previous questions) and build directly upon them without asking the user to repeat themselves.\n- Do not repeat opening greetings (like "Namaste" or introductions) if the conversation is already underway. Continue the discussion seamlessly.\n\n[CUSTOMER'S LATEST MESSAGE]\n${textToSend.trim()}`
          : textToSend.trim();

      // ========================================================================
      // TIER 1: Custom Provider (Tries up to 5 models sequentially with 12s timeout)
      // ========================================================================
      if (activeProviderKey && activeModels.length > 0) {
        const endpoint = normalizeProviderEndpoint(activeBaseUrl);
        console.log(
          `[AI Advisor] Starting Tier 1 with ${activeModels.length} models via ${endpoint}`,
        );

        // Construct standard messages array: System -> Alternating turns starting with User
        const reqMessages: Array<{
          role: "system" | "user" | "assistant";
          content: string;
        }> = [{ role: "system", content: SYSTEM_INSTRUCTION }];

        for (const m of convoHistory) {
          const role = m.role === "model" ? "assistant" : "user";
          if (
            reqMessages.length > 1 &&
            reqMessages[reqMessages.length - 1].role === role
          ) {
            reqMessages[reqMessages.length - 1].content += `\n${m.text}`;
          } else {
            reqMessages.push({ role, content: m.text });
          }
        }

        // Add the current user prompt ensuring strictly alternating turns
        if (
          reqMessages.length > 1 &&
          reqMessages[reqMessages.length - 1].role === "user"
        ) {
          reqMessages[reqMessages.length - 1].content +=
            `\n\n${promptWithContext}`;
        } else {
          reqMessages.push({
            role: "user",
            content: promptWithContext,
          });
        }

        // Sequential Model Waterfall: Model #1 -> Model #2 -> Model #3 -> Model #4 -> Model #5
        for (let i = 0; i < activeModels.length; i++) {
          const stepNum = i + 1;
          const currentModel = activeModels[i];
          console.log(
            `[AI Advisor Step ${stepNum}] Calling Model #${stepNum}: "${currentModel}"...`,
          );

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const res = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "HTTP-Referer":
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://spandana-embroidery.vercel.app",
                "X-Title": "Spandana Embroidery Craft Advisor",
              },
              body: JSON.stringify({
                model: currentModel,
                messages: reqMessages,
                temperature: 0.7,
                max_tokens: 450,
              }),
              signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (res.ok) {
              const data = await res.json();
              if (data?.error) {
                console.warn(
                  `[AI Advisor Step ${stepNum}] Model #${stepNum} "${currentModel}" returned API error:`,
                  data.error,
                );
                continue; // Proceed to next model in sequence
              }

              const content = data.choices?.[0]?.message?.content ?? "";
              if (content && !isInvalidErrorContent(content)) {
                console.log(
                  `[AI Advisor Step ${stepNum}] Success! Model #${stepNum} "${currentModel}" answered.`,
                );
                reply = content.trim();
                break; // Found answer, exit waterfall immediately!
              } else {
                console.warn(
                  `[AI Advisor Step ${stepNum}] Model #${stepNum} "${currentModel}" returned empty/error text: "${content}". Proceeding to next model...`,
                );
              }
            } else {
              const errSnippet = await res.text().catch(() => "");
              console.warn(
                `[AI Advisor Step ${stepNum}] Model #${stepNum} "${currentModel}" failed with HTTP ${res.status}: ${errSnippet}. Proceeding to next model...`,
              );
            }
          } catch (modelErr: any) {
            console.warn(
              `[AI Advisor Step ${stepNum}] Model #${stepNum} "${currentModel}" network or timeout failure:`,
              modelErr,
            );
          }
        }
      }

      // ========================================================================
      // STEP 5 (Gemini Fallback): Only if all 5 custom models fail, seamless handoff
      // to Google Gemini API (VITE_GEMINI_API_KEY) with chat history & memory rules
      // ========================================================================
      if (!reply && activeGeminiKey) {
        console.log(
          "[AI Advisor Step 5 (Gemini Fallback)] All custom models failed or not configured. Seamlessly handing off to Google Gemini API...",
        );

        const geminiContents: Array<{
          role: "user" | "model";
          parts: Array<{ text: string }>;
        }> = [];

        for (const m of convoHistory) {
          const role: "user" | "model" = m.role === "model" ? "model" : "user";
          if (
            geminiContents.length > 0 &&
            geminiContents[geminiContents.length - 1].role === role
          ) {
            geminiContents[geminiContents.length - 1].parts[0].text +=
              `\n${m.text}`;
          } else {
            geminiContents.push({
              role,
              parts: [{ text: m.text }],
            });
          }
        }

        // Add current user prompt ensuring alternating turns
        if (
          geminiContents.length > 0 &&
          geminiContents[geminiContents.length - 1].role === "user"
        ) {
          geminiContents[geminiContents.length - 1].parts[0].text +=
            `\n\n${promptWithContext}`;
        } else {
          geminiContents.push({
            role: "user",
            parts: [{ text: promptWithContext }],
          });
        }

        const geminiModelsToTry = [
          STATIC_GEMINI_MODEL || "gemini-2.5-flash",
          "gemini-2.0-flash",
          "gemini-1.5-flash",
        ];

        for (const gModel of geminiModelsToTry) {
          if (reply) break;
          try {
            console.log(
              `[AI Advisor Step 5] Trying Gemini model: "${gModel}"...`,
            );
            const gController = new AbortController();
            const gTimeout = setTimeout(() => gController.abort(), 12000);

            const geminiBase = (
              STATIC_GEMINI_BASE_URL ||
              "https://generativelanguage.googleapis.com/v1beta"
            ).replace(/\/+$/, "");
            const geminiUrl = `${geminiBase}/models/${gModel}:generateContent`;

            const gRes = await fetch(geminiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                contents: geminiContents,
              }),
              signal: gController.signal,
            });

            clearTimeout(gTimeout);

            if (gRes.ok) {
              const gData = await gRes.json();
              const gContent =
                gData.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
              if (gContent && !isInvalidErrorContent(gContent)) {
                console.log(
                  `[AI Advisor Step 5] Success! Gemini model "${gModel}" answered.`,
                );
                reply = gContent.trim();
                break;
              }
            } else {
              const gErr = await gRes.text().catch(() => "");
              console.warn(
                `[AI Advisor Step 5] Gemini model "${gModel}" HTTP ${gRes.status}: ${gErr}`,
              );
            }
          } catch (gErr) {
            console.warn(
              `[AI Advisor Step 5] Gemini model "${gModel}" failed:`,
              gErr,
            );
          }
        }
      }

      // ========================================================================
      // STEP 6 (Offline Fallback): If Gemini is also unreachable or not configured,
      // serves one of the offline craft responses from the curated craft library
      // ========================================================================
      if (!reply) {
        console.log(
          "[AI Advisor Step 6 (Offline Fallback)] Online AI models unreachable or unconfigured. Serving offline craft response...",
        );
        reply = smartCraftReply(textToSend.trim());
      }

      setMessages((prev) => [
        ...prev,
        { role: "model", text: reply, timestamp: Date.now() },
      ]);
    } catch (err) {
      console.warn("Unhandled chat error, applying offline fallback:", err);
      const fallbackReply = smartCraftReply(textToSend.trim());
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: fallbackReply,
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(input);
  };

  const samplePrompts = [
    "Best neckline stitches for raw silk kurti",
    "Which embroidery is gentlest for children's clothes?",
    "How do I care for zari thread work?",
    "How does Spandana calculate custom quotes?",
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="advisor-modal-title"
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#181318] rounded-2xl border border-rose-100 dark:border-rose-950 shadow-2xl flex flex-col h-[600px] max-h-[85vh] z-10 animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-rose-100 dark:border-rose-950/60 flex items-center justify-between bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="advisor-modal-title"
                className="font-serif text-lg font-bold text-slate-900 dark:text-rose-50 flex items-center gap-2"
              >
                <span>Spandana Craft Consultant</span>
                <span
                  className="text-[10px] font-sans font-medium px-2 py-0.5 rounded cursor-pointer transition-colors border"
                  title="Click to view AI connection settings"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {activeProviderKey ? (
                    <span className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      Custom AI ({activeModels.length} models)
                    </span>
                  ) : activeGeminiKey ? (
                    <span className="text-blue-700 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                      Gemini AI
                    </span>
                  ) : (
                    <span className="text-amber-700 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-900 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-500" />
                      Offline KB (2,000+ entries)
                    </span>
                  )}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Specialized in Indian needlework, fabrics & motif curation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              title="AI Connection Settings"
              aria-label="AI Connection Settings"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-rose-200 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close craft consultant"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-rose-200 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Settings Panel Toggle */}
        {showSettings && (
          <div className="p-4 bg-slate-50 dark:bg-neutral-900 border-b border-rose-200 dark:border-rose-900/50 text-xs space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-rose-200 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-rose-500" /> AI API Connection
                Status & Test Keys
              </span>
              <button
                type="button"
                onClick={resetSettingsToEnv}
                className="text-[10px] text-slate-500 hover:text-rose-600 flex items-center gap-1 underline"
              >
                <RotateCcw className="w-3 h-3" /> Reset to Vercel/Vite Env
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Custom Provider API Key (OpenRouter/Groq/etc.)
                </label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder={
                    STATIC_PROVIDER_KEY
                      ? "●●●● (Loaded from Env)"
                      : "Paste API Key to test..."
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Base URL (Default: openrouter.ai/api/v1)
                </label>
                <input
                  type="text"
                  value={customBaseUrl}
                  onChange={(e) => setCustomBaseUrl(e.target.value)}
                  placeholder="https://openrouter.ai/api/v1"
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Provider Models (Comma-separated, up to 5 models in priority
                  order)
                </label>
                <input
                  type="text"
                  value={customModels}
                  onChange={(e) => setCustomModels(e.target.value)}
                  placeholder="model-1, model-2, model-3, model-4, model-5"
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg"
                />
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Currently active:{" "}
                  {activeModels.join(" → ") || "No models set"}
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Gemini API Key (Backup Tier)
                </label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder={
                    STATIC_GEMINI_KEY
                      ? "●●●● (Loaded from Env)"
                      : "Google Gemini API key..."
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={saveSettings}
                  className="w-full py-1.5 px-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-medium text-xs transition-colors"
                >
                  Save & Apply Settings
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-rose-50/20 dark:bg-rose-950/10">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "model" && (
                <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" aria-hidden="true" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-rose-500 text-white rounded-br-none"
                    : "bg-white dark:bg-neutral-900 text-slate-800 dark:text-slate-200 border border-rose-100 dark:border-rose-950 rounded-bl-none shadow-2xs"
                }`}
              >
                {m.text}
              </div>

              {m.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 dark:text-slate-400">
              <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              </div>
              <span className="italic">
                Thinking through craft recommendations...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 border-t border-rose-100 dark:border-rose-950/60 bg-white dark:bg-[#181318] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSendPrompt(prompt)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 text-rose-700 dark:text-rose-300 rounded-full border border-rose-200/60 dark:border-rose-900 transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="p-3 border-t border-rose-100 dark:border-rose-950 bg-white dark:bg-[#181318] flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about embroidery designs, fabrics, stitches..."
            aria-label="Ask the Craft Consultant"
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="p-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors focus-visible:outline-rose-500"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
};
