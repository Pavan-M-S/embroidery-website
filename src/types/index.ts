/**
 * Core TypeScript definitions for Spandana Embroidery
 */

export type GarmentCategory = "all" | "womens" | "childrens" | "festive";

export type ComplexityLevel = "Gentle" | "Moderate" | "Intricate";

export interface DesignItem {
  id: string;
  title: string;
  category: "womens" | "childrens" | "festive";
  garmentType: string;
  description: string;
  priceRangeINR: {
    min: number;
    max: number;
  };
  image: string;
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

export interface QuoteBasketItem {
  design: DesignItem;
  quantity: number;
  fabricType?: string;
  userNotes?: string;
  addedAt: number;
}

export interface CustomDesignFormData {
  fullName: string;
  contactMethod: "phone" | "whatsapp" | "email";
  contactValue: string;
  garmentType: string;
  designIdea: string;
  preferredColors: string;
  referenceUrl: string;
  estimatedDeadline: string;
  additionalNotes: string;
}

export interface ContactFormData {
  fullName: string;
  contactValue: string;
  topic: string;
  message: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "ordering" | "craft" | "care" | "pricing";
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
