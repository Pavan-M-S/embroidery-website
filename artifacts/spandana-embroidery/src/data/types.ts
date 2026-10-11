/**
 * Core TypeScript definitions for Spandana Embroidery
 */

export type GarmentCategory = "all" | "womens" | "childrens" | "festive";

export type ComplexityLevel = "Gentle" | "Moderate" | "Intricate";

export interface DesignItem {
  id: string;
  title: string;
  category: "womens" | "childrens" | "festive";
  displayCategory: string; // from main2 (e.g. 'Floral', 'Motif')
  garmentType: string;
  garment: string; // from main2 (e.g. 'Blouse', 'Saree')
  style: string; // from main2 (e.g. 'Traditional', 'Playful')
  description: string;
  priceRangeINR: {
    min: number;
    max: number;
  };
  image: string; // Unsplash URL from main
  fallbackArt: string; // main2 SVG data-URI fallback
  alt: string;
  tags: string[];
  complexity: ComplexityLevel;
  stitchTypes: string[];
  featured?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  startingPriceINR: number;
  typicalGarments: string[];
  includedFeatures: string[];
  turnaroundNote: string;
  complexityLabel: string;
  isPopular?: boolean;
}

export interface FAQItem {
  id: string;
  category: "ordering" | "craft" | "care" | "pricing";
  question: string;
  answer: React.ReactNode;
}

export type ProjectStatus =
  "Received" | "In Progress" | "Quality Check" | "Ready for Shipping";

export interface TrackedProject {
  quoteId: string;
  customerName: string;
  garmentType: string;
  designName: string;
  status: ProjectStatus;
  fabricProvided: string;
  threadPalette: string;
  receivedDate: string;
  estimatedCompletion: string;
  artisanNotes: string;
  history: Array<{
    status: ProjectStatus;
    timestamp: string;
    note: string;
  }>;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  hours: string;
  social: {
    instagram: string;
    facebook: string;
  };
}
