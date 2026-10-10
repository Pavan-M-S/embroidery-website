import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, Bot, User, Loader2, RefreshCw } from 'lucide-react';
interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

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
      // Build conversation history for the server
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply || 'Thank you for your question! For custom embroidery inquiries, feel free to share your fabric type and preferred motifs with our home craft workshop.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.warn('Gemini chat error, using graceful craft response:', err);
      const lower = textToSend.toLowerCase();
      let fallback = `Regarding "${textToSend}", our studio specializes in customized motif selection and thread matching. For Indian ethnic wear, combining subtle Zari outlines with vibrant Resham silk filling gives a beautiful, handcrafted finish.`;
      
      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('quote') || lower.includes('charge')) {
        fallback = 'At Spandana Embroidery, prices generally begin around ₹350 for gentle daily accents, ₹750 for artisan yokes, and ₹1,500+ for intricate bridal work. The exact quote depends on your fabric, motif area, and thread materials.';
      } else if (lower.includes('wash') || lower.includes('care') || lower.includes('clean') || lower.includes('iron')) {
        fallback = 'Handcrafted embroidery should always be dry cleaned if made with raw silk or zari. For cotton kurtis, gentle hand-washing in mild detergent with reverse-side iron pressing ensures long-lasting luster!';
      } else if (lower.includes('kid') || lower.includes('child') || lower.includes('pattu') || lower.includes('baby')) {
        fallback = 'For children’s garments and pattu pavadais, we apply soft cotton fusible backing underneath the needlework so that embroidery threads never scratch sensitive skin.';
      } else if (lower.includes('blouse') || lower.includes('neck') || lower.includes('kurti') || lower.includes('sleeve')) {
        fallback = 'Necklines and sleeve borders are our most popular placements! A grand Kasuti or Aari embroidered yoke elevates a plain kurti or blouse into custom designer wear.';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: fallback,
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
                  AI Powered
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
