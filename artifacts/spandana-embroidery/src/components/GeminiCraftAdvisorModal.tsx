import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

import { smartCraftReply } from '../lib/offlineCraftAdvisor';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

const SYSTEM_INSTRUCTION = `You are the Senior Craft Consultant at Spandana Embroidery, a home-based artisan embroidery business in India known for "Quality embroidery at affordable prices". You specialize in traditional Indian needlework: Resham silk, Zari, Kasuti, Aari, Zardozi, mirror work, French knots, bullion roses, and kids pattu pavadai embellishments. Provide warm, practical, knowledgeable advice on fabrics, color pairings, stitch durability, and garment placement. Keep pricing advice honest: explain that quotes depend on fabric delicacy, stitch density, and custom dimensions. Keep replies concise, helpful, and under 150 words. Do not repeat greetings in follow-up replies.`;

// Custom Provider config (OpenAI compatible)
const PROVIDER_API_KEY = (import.meta as any).env?.VITE_PROVIDER_API_KEY as string | undefined;
const PROVIDER_BASE_URL = (import.meta as any).env?.VITE_PROVIDER_BASE_URL as string | undefined;

// Collect up to 5 models from Vercel env vars (supports VITE_PROVIDER_MODEL_1..5 or comma-separated in VITE_PROVIDER_MODEL)
const rawModelEnv: (string | undefined)[] = [
  (import.meta as any).env?.VITE_PROVIDER_MODEL,
  (import.meta as any).env?.VITE_PROVIDER_MODEL_1,
  (import.meta as any).env?.VITE_PROVIDER_MODEL_2,
  (import.meta as any).env?.VITE_PROVIDER_MODEL_3,
  (import.meta as any).env?.VITE_PROVIDER_MODEL_4,
  (import.meta as any).env?.VITE_PROVIDER_MODEL_5,
];

const PROVIDER_MODELS: string[] = rawModelEnv
  .filter((val): val is string => Boolean(val && val.trim()))
  .flatMap((val) => val.split(',').map((s) => s.trim()))
  .filter((val) => val.length > 0)
  .slice(0, 5);

// Gemini config
const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_BASE_URL = (import.meta as any).env?.VITE_GEMINI_BASE_URL as string | undefined;
const GEMINI_MODEL = (import.meta as any).env?.VITE_GEMINI_MODEL as string | undefined;

const aiConfig: any = { apiKey: GEMINI_API_KEY || '' };
if (GEMINI_BASE_URL) {
  aiConfig.httpOptions = { baseUrl: GEMINI_BASE_URL };
}
const ai = GEMINI_API_KEY ? new GoogleGenAI(aiConfig) : null;

export const GeminiCraftAdvisorModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  topic?: string;
}> = ({ isOpen, onClose, topic }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Namaste! Welcome to Spandana Embroidery. I am your Craft & Motif Consultant. How can I help you today? You can ask about embroidery styles, fabric recommendations, festive color pairings, or garment care.',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: textToSend.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let reply = '';

      if (PROVIDER_API_KEY && PROVIDER_BASE_URL && PROVIDER_MODELS.length > 0) {
        // --- Real-time Custom Provider API call with automatic 5-model fallback ---
        const baseUrl = PROVIDER_BASE_URL.replace(/\/+$/, '');
        const endpoint = baseUrl.endsWith('/v1/chat/completions') || baseUrl.endsWith('/chat/completions') 
          ? baseUrl 
          : `${baseUrl}/chat/completions`;

        const reqMessages = [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          ...messages.filter(m => m.text.trim()).map((m) => ({ 
            role: m.role === 'model' ? 'assistant' : 'user', 
            content: m.text 
          })),
          { role: 'user', content: textToSend.trim() }
        ];

        let providerSuccess = false;
        let lastErrorMsg = 'Provider request failed';

        for (const currentModel of PROVIDER_MODELS) {
          try {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${PROVIDER_API_KEY}`,
              },
              body: JSON.stringify({
                model: currentModel,
                messages: reqMessages,
              }),
            });

            if (res.ok) {
              const data = await res.json();
              const content = data.choices?.[0]?.message?.content ?? '';
              if (content) {
                reply = content;
                providerSuccess = true;
                break; // Found working model!
              }
            } else {
              lastErrorMsg = `Model ${currentModel} returned HTTP ${res.status}`;
              console.warn(`[AI Advisor] ${lastErrorMsg}, trying next fallback model...`);
            }
          } catch (modelErr: any) {
            lastErrorMsg = modelErr?.message || `Model ${currentModel} network failure`;
            console.warn(`[AI Advisor] ${lastErrorMsg}, trying next fallback model...`);
          }
        }

        if (!providerSuccess) {
          throw new Error(lastErrorMsg);
        }
      } else if (ai) {
        // --- Real-time Gemini API call (browser-direct) ---
        const chat = ai.chats.create({
          model: GEMINI_MODEL || 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
          history: messages
            .filter((m) => m.text.trim())
            .map((m) => ({
              role: m.role,
              parts: [{ text: m.text }],
            })),
        });

        const response = await chat.sendMessage({
          message: textToSend.trim(),
        });
        reply = response.text ?? '';
      } else {
        // --- Fallback: try Express backend (local dev) ---
        const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend.trim(),
            history: messages.map((m) => ({ role: m.role, text: m.text })),
          }),
        });
        if (!res.ok) throw new Error(`Backend returned ${res.status}`);
        const data = await res.json();
        reply = data.reply ?? '';
      }

      if (!reply) throw new Error('Empty reply from AI');

      setMessages((prev) => [
        ...prev,
        { role: 'model', text: reply, timestamp: Date.now() },
      ]);
    } catch (err) {
      console.warn('API chat error, falling back to offline knowledge:', err);
      // Fallback to our robust offline craft advisor logic
      const fallbackReply = smartCraftReply(textToSend.trim());
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
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
    'Best neckline stitches for raw silk kurti',
    'Which embroidery is gentlest for children\'s clothes?',
    'How do I care for zari thread work?',
    'How does Spandana calculate custom quotes?',
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
              <h2 id="advisor-modal-title" className="font-serif text-lg font-bold text-slate-900 dark:text-rose-50 flex items-center gap-2">
                <span>Spandana Craft Consultant</span>
                <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200">
                  {PROVIDER_API_KEY ? 'Custom AI' : GEMINI_API_KEY ? 'Gemini AI' : 'AI Powered'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Specialized in Indian needlework, fabrics & motif curation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close craft consultant"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-rose-200 rounded-lg"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-rose-50/20 dark:bg-rose-950/10">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'model' && (
                <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" aria-hidden="true" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-rose-500 text-white rounded-br-none'
                    : 'bg-white dark:bg-neutral-900 text-slate-800 dark:text-slate-200 border border-rose-100 dark:border-rose-950 rounded-bl-none shadow-2xs'
                }`}
              >
                {m.text}
              </div>

              {m.role === 'user' && (
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
              <span className="italic">Thinking through craft recommendations...</span>
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
        <form onSubmit={handleSubmit} className="p-3 border-t border-rose-100 dark:border-rose-950 bg-white dark:bg-[#181318] flex items-center gap-2">
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
