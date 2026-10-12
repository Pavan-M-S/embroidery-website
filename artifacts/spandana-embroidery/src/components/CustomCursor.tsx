import React, { useEffect, useState, useRef } from "react";

/**
 * Custom Cursor Component
 * Only rendered on fine pointer devices (desktops/laptops with mouse),
 * completely disabled on touch screens and when prefers-reduced-motion is active.
 * Uses pointer-events: none so it never interrupts clicks or accessibility focus rings.
 */
export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Use refs for dynamic prefers-reduced-motion check
  const prefersReducedRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Check if device supports fine hover
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    // Check prefers-reduced-motion initially
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedRef.current = reducedQuery.matches;

    if (!fineHover || prefersReducedRef.current) {
      return;
    }

    setIsSupported(true);

    // Update prefersReducedRef when preference changes
    const handleReducedChange = (e: MediaQueryListEvent) => {
      prefersReducedRef.current = e.matches;
      if (e.matches) {
        setIsVisible(false);
        setIsSupported(false);
      }
    };
    reducedQuery.addEventListener("change", handleReducedChange);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.getAttribute("role") === "button" ||
          target.closest("button") !== null ||
          target.closest("a") !== null;
        setIsPointer(isClickable);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      reducedQuery.removeEventListener("change", handleReducedChange);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!isSupported || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Outer needle stitch ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-500/60 transition-all duration-150 ease-out ${
          isPointer
            ? "w-9 h-9 bg-rose-500/15 scale-125 border-dashed border-rose-500"
            : "w-6 h-6 bg-transparent border-solid"
        }`}
      />
      {/* Center thread dot */}
      <div
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isPointer ? "w-2 h-2 bg-amber-500" : "w-1.5 h-1.5 bg-rose-500"
        }`}
      />
    </div>
  );
};
