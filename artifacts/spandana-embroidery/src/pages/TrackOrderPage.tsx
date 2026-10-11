import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { TrackedProject, ProjectStatus } from "../data/types";
import {
  INITIAL_TRACKED_PROJECTS,
  STATUS_SEQUENCE,
  STATUS_DESCRIPTIONS,
  BUSINESS_CONFIG,
} from "../data";

const TRACKING_STORAGE_KEY = "spandana_tracked_orders";

export const TrackOrderPage: React.FC = () => {
  // Load tracked projects from localStorage or default to initial sample list
  const [projects, setProjects] = useState<TrackedProject[]>(() => {
    try {
      const stored = localStorage.getItem(TRACKING_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_TRACKED_PROJECTS;
    } catch {
      return INITIAL_TRACKED_PROJECTS;
    }
  });

  const [inputQuoteId, setInputQuoteId] = useState("SPN-3015");
  const [activeProject, setActiveProject] = useState<TrackedProject | null>(
    () => {
      return (
        INITIAL_TRACKED_PROJECTS.find((p) => p.quoteId === "SPN-3015") ||
        INITIAL_TRACKED_PROJECTS[0]
      );
    },
  );
  const [searchError, setSearchError] = useState<string | null>(null);

  // Sync projects with localStorage
  const saveProjects = (updated: TrackedProject[]) => {
    setProjects(updated);
    try {
      localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save updated tracking status to localStorage", e);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = inputQuoteId.trim().toUpperCase();
    if (!cleanId) {
      setSearchError("Please enter a Quote or Order ID.");
      return;
    }

    const found = projects.find((p) => p.quoteId.toUpperCase() === cleanId);
    if (found) {
      setActiveProject(found);
      setSearchError(null);
    } else {
      setSearchError(
        `No project found for "${cleanId}". Please check the ID or contact the workshop.`,
      );
      setActiveProject(null);
    }
  };

  const selectSampleId = (id: string) => {
    setInputQuoteId(id);
    const found = projects.find((p) => p.quoteId === id);
    if (found) {
      setActiveProject(found);
      setSearchError(null);
    }
  };

  // Simulate advancing the order status to the next stage
  const handleAdvanceStatus = () => {
    if (!activeProject) return;

    const currentIndex = STATUS_SEQUENCE.indexOf(activeProject.status);
    const nextIndex = (currentIndex + 1) % STATUS_SEQUENCE.length;
    const nextStatus = STATUS_SEQUENCE[nextIndex];

    const now = new Date();
    const timestampStr = `${now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })} - ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

    let newArtisanNote = activeProject.artisanNotes;
    if (nextStatus === "In Progress") {
      newArtisanNote =
        "Needlework actively moving forward. Artisan checking thread tension and motif balance.";
    } else if (nextStatus === "Quality Check") {
      newArtisanNote =
        "Embroidery completed. Inspection of knots, cutdana security, and reverse pressing in progress.";
    } else if (nextStatus === "Ready for Shipping") {
      newArtisanNote =
        "Garment passed quality standards. Wrapped in protective craft packaging ready for handover.";
    } else {
      newArtisanNote =
        "Fabric received and scheduled for artisan frame mounting.";
    }

    const updatedHistory = [
      ...activeProject.history,
      {
        status: nextStatus,
        timestamp: timestampStr,
        note: `Status updated to ${nextStatus}. ${newArtisanNote}`,
      },
    ];

    const updatedProject: TrackedProject = {
      ...activeProject,
      status: nextStatus,
      artisanNotes: newArtisanNote,
      history: updatedHistory,
    };

    const updatedList = projects.map((p) =>
      p.quoteId === activeProject.quoteId ? updatedProject : p,
    );

    saveProjects(updatedList);
    setActiveProject(updatedProject);
  };

  // Helper to get step index
  const currentStepIndex = activeProject
    ? STATUS_SEQUENCE.indexOf(activeProject.status)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Order Tracking Portal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-rose-50">
          Track Your Embroidery Project
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Enter your unique Quote or Order ID to view the live needlework
          status, estimated completion schedule, and notes from our home craft
          workshop.
        </p>
      </div>

      {/* Search Bar & Quick Sample Quote IDs */}
      <div className="bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuoteId}
              onChange={(e) => setInputQuoteId(e.target.value)}
              placeholder="Enter Quote ID (e.g., SPN-1042, SPN-3015)..."
              aria-label="Quote ID"
              className="w-full pl-10 pr-4 py-3 text-sm bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100 font-mono"
            />
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
              aria-hidden="true"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Track Project</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>

        {searchError && (
          <div
            role="alert"
            className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{searchError}</span>
          </div>
        )}

        {/* Quick Sample IDs for Instant Testing */}
        <div className="pt-2 border-t border-rose-100 dark:border-rose-950/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Sample Quote IDs to test:
          </span>
          {INITIAL_TRACKED_PROJECTS.map((sample) => (
            <button
              key={sample.quoteId}
              type="button"
              onClick={() => selectSampleId(sample.quoteId)}
              className={`px-2.5 py-1 rounded-lg font-mono transition-colors ${
                activeProject?.quoteId === sample.quoteId
                  ? "bg-rose-500 text-white shadow-2xs"
                  : "bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100"
              }`}
            >
              {sample.quoteId} ({sample.status})
            </button>
          ))}
        </div>
      </div>

      {/* Active Project Tracking Details */}
      {activeProject ? (
        <div className="space-y-8 animate-fade-in">
          {/* Main Status Card */}
          <div className="bg-white dark:bg-[#181318] rounded-3xl border border-rose-100 dark:border-rose-950 shadow-sm overflow-hidden">
            {/* Top Bar with Project Identifiers */}
            <div className="p-6 sm:p-8 border-b border-rose-100 dark:border-rose-950 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-rose-50/30 dark:bg-rose-950/20">
              <div>
                <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-mono font-semibold">
                  <span>QUOTE #{activeProject.quoteId}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeProject.customerName}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-rose-50 mt-1">
                  {activeProject.designName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  Garment: {activeProject.garmentType}
                </p>
              </div>

              {/* Status Badge & Interactive Progression Controller */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-rose-500/10 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"
                    aria-hidden="true"
                  />
                  <span>Current: {activeProject.status}</span>
                </div>

                {/* Local State Simulator Button */}
                <button
                  type="button"
                  onClick={handleAdvanceStatus}
                  title="Simulate updating project to the next status in local state"
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Advance Status (Demo)</span>
                </button>
              </div>
            </div>

            {/* Visual 4-Stage Stepper */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="relative">
                {/* Horizontal progress bar for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full -translate-y-1/2 h-1 bg-rose-100 dark:bg-neutral-800 -z-0" />
                <div
                  className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-rose-500 transition-all duration-300 -z-0"
                  style={{
                    width: `${(currentStepIndex / (STATUS_SEQUENCE.length - 1)) * 100}%`,
                  }}
                />

                {/* Stepper Circles & Labels */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                  {STATUS_SEQUENCE.map((stage, idx) => {
                    const isPassed = idx < currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    const stageDesc = STATUS_DESCRIPTIONS[stage];

                    return (
                      <div
                        key={stage}
                        className={`flex md:flex-col items-center md:items-center text-left md:text-center gap-3.5 md:gap-2.5 p-3 md:p-0 rounded-2xl md:rounded-none ${
                          isCurrent
                            ? "bg-rose-50/60 dark:bg-rose-950/30 md:bg-transparent"
                            : ""
                        }`}
                      >
                        {/* Circle Indicator */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all ${
                            isPassed
                              ? "bg-rose-500 text-white shadow-xs"
                              : isCurrent
                                ? "bg-white dark:bg-neutral-900 border-2 border-rose-500 text-rose-600 dark:text-rose-400 ring-4 ring-rose-100 dark:ring-rose-950/60"
                                : "bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-400"
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          ) : (
                            idx + 1
                          )}
                        </div>

                        <div>
                          <span
                            className={`text-xs font-bold block ${
                              isCurrent
                                ? "text-rose-600 dark:text-rose-400"
                                : isPassed
                                  ? "text-slate-900 dark:text-rose-100"
                                  : "text-slate-400 dark:text-slate-500"
                            }`}
                          >
                            {stage}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">
                            {stageDesc.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Stage Detailed Narrative */}
              <div className="mt-8 p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-sm">
                  <Sparkles
                    className="w-4 h-4 text-rose-500 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Current Stage Overview:{" "}
                    {STATUS_DESCRIPTIONS[activeProject.status].title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {STATUS_DESCRIPTIONS[activeProject.status].detail}
                </p>
                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/60 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 italic">
                  <span className="font-semibold text-rose-800 dark:text-rose-300 not-italic">
                    Artisan Note:
                  </span>
                  <span>“{activeProject.artisanNotes}”</span>
                </div>
              </div>

              {/* Project Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-rose-100 dark:border-rose-950">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                    Fabric Provided
                  </span>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                    {activeProject.fabricProvided}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                    Thread Materials
                  </span>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                    {activeProject.threadPalette}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                    Received Date
                  </span>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                    {activeProject.receivedDate}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block uppercase font-medium">
                    Target Completion
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 block">
                    {activeProject.estimatedCompletion}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Milestone Log */}
          <div className="bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
              Project Timeline & Milestone Log
            </h3>

            <div className="space-y-3">
              {activeProject.history.map((log, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-rose-100">
                        {log.status}
                      </span>
                      <span aria-hidden="true" className="text-rose-300">
                        ·
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {log.note}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Workshop Contact Assistance Banner */}
          <div className="p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-serif font-bold text-base text-slate-900 dark:text-rose-100 block">
                Have questions about your project schedule?
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Mention your Quote ID ({activeProject.quoteId}) when contacting
                our home workshop for instant updates.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.replace(/[^\d+]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Workshop</span>
              </a>
              <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
                {BUSINESS_CONFIG.phone}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
