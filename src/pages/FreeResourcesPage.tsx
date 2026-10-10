import React, { useState } from "react";
import {
  Download,
  FileText,
  CheckSquare,
  Sparkles,
  Volume2,
  Loader2,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export const FreeResourcesPage: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Generate an actual downloadable text file on-the-fly (Zero Broken Links!)
  const handleDownloadChecklist = () => {
    const content = `SPANDANA EMBROIDERY - GARMENT PREPARATION & EMBROIDERY CARE GUIDE
"Quality embroidery at affordable prices"

================================================================================
1. PREPARING UNSTITCHED FABRIC FOR EMBROIDERY
================================================================================
- Wash & Pre-Shrink: Always hand-wash or dry-clean cotton, linen, or raw silk
  before embroidery to ensure post-wash shrinkage does not distort stitches.
- Fabric Margin: Provide at least 2 inches of margin around kurti necklines and
  sleeve hems so embroidery hoops can mount without creasing the final seam.
- Backing & Interfacing: For sheer fabrics (organza, chiffon), lightweight tear-away
  stabilizers ensure smooth thread tension.

================================================================================
2. WASHING & LAUNDERING HAND-EMBROIDERED GARMENTS
================================================================================
- Silk & Zari: Strictly dry-clean garments with genuine metallic zari, zardozi wire,
  or micro-cutdana beads.
- Hand-Washing Cottons: Use cold water with mild liquid detergent. Never wring or scrub
  directly over French knots or bullion stitches.
- Drying: Roll gently in a clean dry towel to absorb moisture, then dry flat in shade.
  Avoid direct sunlight to prevent silk thread fading.

================================================================================
3. PRESSING & IRONING GUIDELINES
================================================================================
- Never place a hot iron directly onto the front surface of embroidery stitches.
- Always turn the garment inside out.
- Place a soft cotton towel underneath the embroidery so three-dimensional motifs
  (bullion roses, knots) are cushioned and not flattened.
- Use low to medium steam on the reverse side only.

For custom inquiries & consultations:
Spandana Embroidery Atelier
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Spandana_Embroidery_Care_Guide.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Text-To-Speech audio narration feature (Gemini TTS / Browser Speech Synthesis fallback)
  const handlePlayAudioGuide = async () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    setAudioError(null);

    const speechText =
      "Welcome to Spandana Embroidery Care Guidelines. To maintain the brilliance of hand-stitched garments, always dry clean items with zari and silk resham threads. When pressing, always iron on the reverse side with a soft towel underneath, so your bullion knots and delicate petals remain three-dimensional and vibrant.";

    try {
      // First attempt server-side Gemini TTS proxy
      const res = await fetch("/api/gemini/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: speechText }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          fallbackBrowserTTS(speechText);
        };
        await audio.play();
        return;
      } else {
        fallbackBrowserTTS(speechText);
      }
    } catch {
      fallbackBrowserTTS(speechText);
    }
  };

  const fallbackBrowserTTS = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setAudioError(
          "Audio playback unavailable in this browser environment.",
        );
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setIsPlayingAudio(false);
      setAudioError("Speech synthesis is not supported on this browser.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Craft Knowledge & Practical Guides
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-rose-50">
          Free Embroidery Care & Planning Resources
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Crafting an embroidered garment is a collaboration. Use our practical
          guides below to prepare your fabric before stitching and maintain
          needlework longevity for years to come.
        </p>
      </div>

      {/* Audio Narration Quick Player */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent border border-rose-200 dark:border-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Volume2 className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
              Listen to Fabric Care Audio Narration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Narrated guidance on washing, storing, and reverse-ironing
              hand-embroidered clothing
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePlayAudioGuide}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            isPlayingAudio
              ? "bg-amber-500 text-white animate-pulse"
              : "bg-rose-500 hover:bg-rose-600 text-white shadow-xs"
          }`}
        >
          {isPlayingAudio ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>Playing Narration (Click to Stop)</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" aria-hidden="true" />
              <span>Play Audio Guide</span>
            </>
          )}
        </button>
      </div>

      {audioError && (
        <div role="alert" className="text-xs text-rose-600 dark:text-rose-400">
          {audioError}
        </div>
      )}

      {/* 3 Core Resource Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Resource 1: Garment Preparation */}
        <section className="bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center">
            <FileText className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
            Garment Preparation Guide
          </h2>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
              <span>
                <strong>Pre-washing:</strong> Always pre-wash raw cottons to
                account for thread shrinkage before hoop mounting.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
              <span>
                <strong>Seam Margins:</strong> Maintain at least 2 inches of
                uncut fabric perimeter around the planned embroidery area.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
              <span>
                <strong>Unstitched Pieces:</strong> Send unstitched blouse and
                kurti panels whenever possible for maximum stitch precision.
              </span>
            </li>
          </ul>
        </section>

        {/* Resource 2: Design Planning Checklist */}
        <section className="bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-500 flex items-center justify-center">
            <CheckSquare className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
            Design Planning Checklist
          </h2>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
              <span>
                <strong>Neckline Depth:</strong> Check your tailor’s neckline
                cutting line so embroidery is not cut off during final
                stitching.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
              <span>
                <strong>Occasion Durability:</strong> For kids’ clothes, choose
                bullion knots or flat satin stitches over loose wire loops.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
              <span>
                <strong>Color Contrast:</strong> Pick thread tones at least 2
                shades lighter or darker than the base fabric for crisp visual
                pop.
              </span>
            </li>
          </ul>
        </section>

        {/* Resource 3: Fabric Care Tips */}
        <section className="bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
            Embroidery Care & Storage
          </h2>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <span>
                <strong>Dry Cleaning:</strong> Mandatory for pure silk, zari
                embroidery, mirror work, and cutdana beads.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <span>
                <strong>Reverse Ironing:</strong> Always iron from the back over
                a plush towel to preserve raised thread textures.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <span>
                <strong>Storage:</strong> Wrap embroidered garments in muslin
                cloth rather than plastic bags to allow fibers to breathe.
              </span>
            </li>
          </ul>
        </section>
      </div>

      {/* Downloadable Care Guide Section (Real, Working File Download) */}
      <section className="p-8 sm:p-12 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-950 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Printable Reference
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-rose-50">
            Download the Complete Care Checklist (.txt)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Save our complete reference guide to your device for quick checking
            before laundering or tailoring your embroidered clothes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadChecklist}
          className="px-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          <span>Download Free Care Guide</span>
        </button>
      </section>
    </div>
  );
};
