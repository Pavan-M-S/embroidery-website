import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * High-Agency Custom Cursor Component
 * Designed with embroidery needle & thread motif.
 * Uses hardware-accelerated motion values and spring physics (no laggy React re-renders on mousemove).
 * Automatically disabled on touch screens and when prefers-reduced-motion is active.
 * Uses pointer-events: none so it never interrupts clicks or accessibility focus rings.
 */
export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics-based spring follower
  const springConfig = { stiffness: 450, damping: 28, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Secondary delayed spring for needle thread trail
  const threadSpringConfig = { stiffness: 220, damping: 22, mass: 1 };
  const threadX = useSpring(mouseX, threadSpringConfig);
  const threadY = useSpring(mouseY, threadSpringConfig);

  useEffect(() => {
    // Check if device supports fine hover
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    // Check prefers-reduced-motion
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fineHover || reducedQuery.matches) {
      return;
    }

    setIsSupported(true);

    const handleReducedChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsVisible(false);
        setIsSupported(false);
      }
    };
    reducedQuery.addEventListener("change", handleReducedChange);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) {
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

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      reducedQuery.removeEventListener("change", handleReducedChange);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isSupported || !isVisible) return null;

  return (
    <>
      {/* Outer needle stitch ring with smooth spring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.35 : 1,
            borderColor: isPointer ? "rgba(225, 29, 72, 0.85)" : "rgba(225, 29, 72, 0.4)",
            backgroundColor: isPointer ? "rgba(225, 29, 72, 0.12)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`rounded-full border transition-all ${
            isPointer
              ? "w-9 h-9 border-dashed"
              : "w-6 h-6 border-solid"
          }`}
        />
      </motion.div>

      {/* Trailing thread stitch center dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: threadX,
          y: threadY,
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.4 : 1,
            backgroundColor: isPointer ? "#d97706" : "#e11d48",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-1.5 h-1.5 rounded-full"
        />
      </motion.div>
    </>
  );
};
