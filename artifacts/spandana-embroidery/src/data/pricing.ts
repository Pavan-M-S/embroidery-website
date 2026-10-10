import { PricingTier } from "./types";

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "tier-gentle",
    name: "Gentle Accent Tier",
    subtitle: "Subtle, elegant daily & workwear touches",
    startingPriceINR: 350,
    typicalGarments: [
      "Baby jhablas & frocks",
      "Simple kurti necklines",
      "Sleeve edge trims",
      "Pocket monograms",
    ],
    includedFeatures: [
      "Quality colourfast cotton & resham threads",
      "Clean hand-stitching with stabilized back backing",
      "1 to 2 thread color combinations",
      "Suitable for daily machine-washable cottons",
    ],
    turnaroundNote: "Estimated 3–5 working days",
    complexityLabel: "Gentle Complexity",
    isPopular: false,
  },
  {
    id: "tier-artisan",
    name: "Artisan Yoke & Border Tier",
    subtitle: "Our signature balance of detail, longevity & charm",
    startingPriceINR: 750,
    typicalGarments: [
      "Festive kurti yokes & plackets",
      "Children’s pattu pavadai borders",
      "Dupatta end pallus",
      "Occasion blouses",
    ],
    includedFeatures: [
      "Multi-tone silk resham threads & metallic zari accents",
      "Intricate French knots, aari chains, or mirror work highlights",
      "Balanced motif distribution customized to your garment shape",
      "Pre-stitched fabric protection lining so stitches don't itch",
    ],
    turnaroundNote: "Estimated 5–8 working days",
    complexityLabel: "Moderate Complexity",
    isPopular: true,
  },
  {
    id: "tier-intricate",
    name: "Heritage & Bridal Embellishment",
    subtitle: "High-density festive artistry for milestone celebrations",
    startingPriceINR: 1500,
    typicalGarments: [
      "Bridal saree blouses",
      "Heirloom lehengas",
      "Grand reception anarkalis",
      "Custom pictorial borders",
    ],
    includedFeatures: [
      "Full custom motif drafting based on your reference or saree pattern",
      "Authentic Zardozi wirework, cutdana, sequins, and seed pearls",
      "High stitch density with multi-layered dimensional relief",
      "Complimentary matching thread swatch for tailoring coordination",
    ],
    turnaroundNote: "Estimated 8–14 working days",
    complexityLabel: "Intricate Artistry",
    isPopular: false,
  },
];
