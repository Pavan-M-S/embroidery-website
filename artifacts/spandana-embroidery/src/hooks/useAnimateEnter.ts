import { useReducedMotion } from "motion/react";

/**
 * Standard physics-based spring transitions aligned with design-motion-principles:
 * Frequency gate: Quick & snappy for micro-interactions, fluid for entrance reveals.
 */
export const MOTION_SPRINGS = {
  // Snappy micro-interactions (buttons, pills, icons)
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  },
  // Smooth element entrances (cards, modals, panels)
  fluid: {
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
  },
  // Gentle luxury drift (hero artwork, floating badges)
  gentle: {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
  },
};

export const MOTION_EASINGS = {
  // Custom luxury cubic bezier
  luxury: [0.32, 0.72, 0, 1] as const,
  smoothOut: [0.16, 1, 0.3, 1] as const,
};

/**
 * Hook providing motion variants that automatically respect prefers-reduced-motion
 */
export function useAnimateEnter() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.3 } },
    exit: { opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.2 } },
  };

  const fadeInUp = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { ...MOTION_SPRINGS.fluid, duration: 0.5 },
    },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const bentoCardReveal = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 },
    whileInView: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { ...MOTION_SPRINGS.fluid },
    },
    viewport: { once: true, margin: "-40px" },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const staggerItem = {
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { ...MOTION_SPRINGS.fluid },
    },
  };

  return {
    shouldReduceMotion,
    fadeIn,
    fadeInUp,
    bentoCardReveal,
    staggerContainer,
    staggerItem,
    springs: MOTION_SPRINGS,
    easings: MOTION_EASINGS,
  };
}
