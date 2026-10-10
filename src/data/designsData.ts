import { DesignItem, PricingTier, FAQItem } from '../types';

/**
 * ============================================================================
 * OWNER CUSTOMIZATION CONFIGURATION
 * Replace these placeholder details with genuine business information.
 * ============================================================================
 */
export const BUSINESS_CONFIG = {
  businessName: 'Spandana Embroidery',
  tagline: 'Quality embroidery at affordable prices',
  foundedNote: 'Home-based craft atelier specializing in hand-embellished Indian apparel',
  
  // EDITABLE CONTACT PLACEHOLDERS (Replace with real numbers/emails)
  phonePlaceholder: '+91 [Owner Phone Number]',
  whatsappPlaceholder: '+91 [Owner WhatsApp Number]',
  emailPlaceholder: 'contact@[spandana-embroidery-placeholder].com',
  workingHours: 'Monday – Saturday: 10:00 AM – 6:30 PM IST (Sundays by prior appointment)',
  workshopCityPlaceholder: '[City / District, State, India]',
  
  // SOCIAL PROFILES (Replace with real links when active)
  socialLinks: {
    instagram: 'https://instagram.com/[your-handle-placeholder]',
    whatsapp: 'https://wa.me/[your-whatsapp-placeholder]',
    facebook: 'https://facebook.com/[your-page-placeholder]',
  },

  // GOOGLE MAPS PLACEHOLDER
  // When a real Google Maps embed URL is ready, paste it below.
  googleMapsEmbedUrl: '', // Leave empty to display the graceful "Map Location Placeholder"
};

/**
 * Sample Indian-Style Embroidery Portfolio Data
 * Prices are illustrative starting ranges in INR (₹) to give customers a realistic ballpark.
 */
export const SAMPLE_DESIGNS: DesignItem[] = [
  {
    id: 'des-01',
    title: 'Gulmohar Resham Neckline',
    category: 'womens',
    garmentType: 'Cotton & Raw Silk Kurti',
    description: 'Delicate floral vines stitched in rose resham silk thread with fine French knot stamens and subtle gold zari contouring.',
    priceRangeINR: { min: 650, max: 1200 },
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    alt: 'Handcrafted floral resham embroidery along a women\'s kurti neckline in rose and gold thread',
    tags: ['Resham Silk', 'Neckline', 'Floral', 'French Knots'],
    complexity: 'Moderate',
    stitchTypes: ['Resham Satin Stitch', 'French Knots', 'Stem Stitch'],
    featured: true,
  },
  {
    id: 'des-02',
    title: 'Mayura Pattu Pavadai Border',
    category: 'childrens',
    garmentType: 'Kids Traditional Pattu Pavadai (Lehenga)',
    description: 'Traditional twin peacock motifs with feather scalloping, crafted in rich jewel green and gold metallic thread for festive ceremonies.',
    priceRangeINR: { min: 800, max: 1500 },
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    alt: 'Traditional peacock embroidery motif on rich silk children\'s skirt border',
    tags: ['Peacock Motif', 'Traditional', 'Kids Festive', 'Zari Border'],
    complexity: 'Intricate',
    stitchTypes: ['Aari Stitch', 'Zardozi Wire Work', 'Mirror Accents'],
    featured: true,
  },
  {
    id: 'des-03',
    title: 'Ananya Kasuti Geometric Yoke',
    category: 'womens',
    garmentType: 'Tussar Silk Anarkali / Kurta',
    description: 'Karnataka-style Kasuti hand needlework featuring temple towers (Gopura) and lotus geometry in alternating coral and crimson threads.',
    priceRangeINR: { min: 950, max: 1800 },
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    alt: 'Geometric Kasuti embroidery pattern on Tussar silk kurta yoke',
    tags: ['Kasuti Tradition', 'Geometric', 'Lotus Motif', 'Yoke Pattern'],
    complexity: 'Intricate',
    stitchTypes: ['Gavanti', 'Murgi', 'Negi Running Stitch'],
    featured: true,
  },
  {
    id: 'des-04',
    title: 'Little Champa Baby Jhabla',
    category: 'childrens',
    garmentType: 'Infant Cotton Frock & Jhabla',
    description: 'Ultra-gentle bullion knot floral sprigs with soft cotton embroidery thread that rests smoothly against sensitive baby skin.',
    priceRangeINR: { min: 350, max: 600 },
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    alt: 'Soft pastel bullion rose embroidery on baby cotton garment',
    tags: ['Baby Wear', 'Bullion Knots', 'Soft Cotton', 'Floral Sprigs'],
    complexity: 'Gentle',
    stitchTypes: ['Bullion Rose', 'Lazy Daisy', 'Feather Stitch'],
    featured: true,
  },
  {
    id: 'des-05',
    title: 'Chandrika Zardozi Sleeve Cuff',
    category: 'festive',
    garmentType: 'Bridal & Occasion Saree Blouse',
    description: 'Dense festive elbow sleeve embellishment with genuine micro-cutdana, metallic bullion coils, and seed pearl highlights.',
    priceRangeINR: { min: 1400, max: 2800 },
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    alt: 'Festive bridal saree blouse sleeve with golden zardozi embroidery and pearl accents',
    tags: ['Zardozi', 'Blouse Sleeve', 'Festive', 'Cutdana Beads'],
    complexity: 'Intricate',
    stitchTypes: ['Zari Couching', 'Cutdana Beadwork', 'Salma Wire Filling'],
    featured: true,
  },
  {
    id: 'des-06',
    title: 'Kalyani Mirror-Work Kurti Placket',
    category: 'womens',
    garmentType: 'Chanderi Silk Kurti',
    description: 'Authentic lead-free glass mirror work framed with tight coral buttonhole stitching and miniature chevron borders.',
    priceRangeINR: { min: 700, max: 1350 },
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    alt: 'Mirror work placket on cream chanderi silk with coral buttonhole stitches',
    tags: ['Mirror Work', 'Placket', 'Chanderi', 'Buttonhole'],
    complexity: 'Moderate',
    stitchTypes: ['Shisha / Mirror Stitch', 'Herringbone', 'Chain Stitch'],
    featured: false,
  },
  {
    id: 'des-07',
    title: 'Nitya Festive Boy’s Kurta Collar & Pocket',
    category: 'childrens',
    garmentType: 'Children\'s Linen / Silk Kurta',
    description: 'Understated mandarin collar and pocket crest embroidery with subtle antique gold thread, designed for festival comfort.',
    priceRangeINR: { min: 450, max: 850 },
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=800&q=80',
    alt: 'Embroidered mandarin collar and chest pocket detail on boy\'s festive kurta',
    tags: ['Boys Kurta', 'Collar Crest', 'Minimal Gold', 'Linen Embroidery'],
    complexity: 'Gentle',
    stitchTypes: ['Backstitch Outline', 'Satin Leaf Fill', 'French Knots'],
    featured: false,
  },
  {
    id: 'des-08',
    title: 'Taranga Scalloped Dupatta Pallu',
    category: 'festive',
    garmentType: 'Organza / Chiffon Dupatta Border',
    description: 'Graceful undulating wave borders along dupatta ends with micro-sequins, floral motifs, and hand-cut scalloped edges.',
    priceRangeINR: { min: 1200, max: 2400 },
    image: 'https://images.unsplash.com/photo-1610030469668-93530c17b58f?auto=format&fit=crop&w=800&q=80',
    alt: 'Scalloped dupatta border with resham thread floral motifs and gold sequins',
    tags: ['Dupatta Border', 'Scalloped Edge', 'Organza', 'Sequins'],
    complexity: 'Intricate',
    stitchTypes: ['Cutwork Scallop', 'Aari Chain', 'Paillette Sequin Couching'],
    featured: false,
  },
  {
    id: 'des-09',
    title: 'Mallika Floral Sprig Anarkali Hem',
    category: 'womens',
    garmentType: 'Floor-Length Anarkali Gown',
    description: 'Scattered floral sprigs (Buttas) around the flared hemline, combining rose-tinted ombre threads and subtle green calyxes.',
    priceRangeINR: { min: 1100, max: 2200 },
    image: 'https://images.unsplash.com/photo-1583391733975-dd86ac24b910?auto=format&fit=crop&w=800&q=80',
    alt: 'Scattered floral butta embroidery on floor-length pink anarkali dress',
    tags: ['Anarkali Hem', 'Butta Motifs', 'Ombre Thread', 'Flared Gown'],
    complexity: 'Moderate',
    stitchTypes: ['Long and Short Stitch', 'Split Stitch', 'Bullion Knots'],
    featured: false,
  },
  {
    id: 'des-10',
    title: 'Aarohi Butterfly Toddler Dress',
    category: 'childrens',
    garmentType: 'Toddler Party Frock',
    description: 'Charming pastel butterfly wings with three-dimensional thread relief and pearl antenna, designed for first birthdays and family gatherings.',
    priceRangeINR: { min: 550, max: 950 },
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    alt: 'Whimsical embroidered butterfly with pastel relief wings on little girl\'s party dress',
    tags: ['Toddler Dress', '3D Butterfly', 'Pastel Thread', 'Birthday Wear'],
    complexity: 'Moderate',
    stitchTypes: ['Padded Satin Stitch', 'Cast-on Stitch', 'Seed Stitch'],
    featured: false,
  },
  {
    id: 'des-11',
    title: 'Vaidehi Paisley Back-Neck Arch',
    category: 'womens',
    garmentType: 'Deep-Back Saree Blouse / Kurti',
    description: 'Majestic Mango/Kalka (paisley) teardrop motif framed by floral arcs and hanging thread potli bead tassels.',
    priceRangeINR: { min: 850, max: 1650 },
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    alt: 'Intricate paisley embroidery adorning the back neckline of a festive Indian blouse',
    tags: ['Paisley / Kalka', 'Back Neckline', 'Potli Tassels', 'Festive'],
    complexity: 'Moderate',
    stitchTypes: ['Aari Fill', 'Zari Piping', 'Chain Stitch Outline'],
    featured: false,
  },
  {
    id: 'des-12',
    title: 'Radha-Krishna Jhoola Festive Border',
    category: 'festive',
    garmentType: 'Special Occasion Lehenga Skirt',
    description: 'Custom pictorial border depicting pastoral swinging motifs, sacred cows, and kadamba tree leaves rendered in classical needlework.',
    priceRangeINR: { min: 2200, max: 4500 },
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    alt: 'Pictorial temple embroidery border with traditional motifs on silk lehenga',
    tags: ['Pictorial Embroidery', 'Temple Art', 'Heritage', 'Bridal Lehenga'],
    complexity: 'Intricate',
    stitchTypes: ['Fine Resham Shading', 'Zari Filigree', 'Seed Pearl Accents'],
    featured: false,
  },
];

/**
 * Illustrative Pricing Tiers
 */
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-gentle',
    name: 'Gentle Accent Tier',
    subtitle: 'Subtle, elegant daily & workwear touches',
    startingPriceINR: 350,
    typicalGarments: ['Baby jhablas & frocks', 'Simple kurti necklines', 'Sleeve edge trims', 'Pocket monograms'],
    includedFeatures: [
      'Quality colourfast cotton & resham threads',
      'Clean hand-stitching with stabilized back backing',
      '1 to 2 thread color combinations',
      'Suitable for daily machine-washable cottons',
    ],
    turnaroundNote: 'Estimated 3–5 working days',
    complexityLabel: 'Gentle Complexity',
    isPopular: false,
  },
  {
    id: 'tier-artisan',
    name: 'Artisan Yoke & Border Tier',
    subtitle: 'Our signature balance of detail, longevity & charm',
    startingPriceINR: 750,
    typicalGarments: ['Festive kurti yokes & plackets', 'Children’s pattu pavadai borders', 'Dupatta end pallus', 'Occasion blouses'],
    includedFeatures: [
      'Multi-tone silk resham threads & metallic zari accents',
      'Intricate French knots, aari chains, or mirror work highlights',
      'Balanced motif distribution customized to your garment shape',
      'Pre-stitched fabric protection lining so stitches don\'t itch',
    ],
    turnaroundNote: 'Estimated 5–8 working days',
    complexityLabel: 'Moderate Complexity',
    isPopular: true,
  },
  {
    id: 'tier-intricate',
    name: 'Heritage & Bridal Embellishment',
    subtitle: 'High-density festive artistry for milestone celebrations',
    startingPriceINR: 1500,
    typicalGarments: ['Bridal saree blouses', 'Heirloom lehengas', 'Grand reception anarkalis', 'Custom pictorial borders'],
    includedFeatures: [
      'Full custom motif drafting based on your reference or saree pattern',
      'Authentic Zardozi wirework, cutdana, sequins, and seed pearls',
      'High stitch density with multi-layered dimensional relief',
      'Complimentary matching thread swatch for tailoring coordination',
    ],
    turnaroundNote: 'Estimated 8–14 working days',
    complexityLabel: 'Intricate Artistry',
    isPopular: false,
  },
];

/**
 * Frequently Asked Questions (FAQ)
 */
export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'ordering',
    question: 'How does the custom embroidery ordering process work?',
    answer: 'The process is simple: 1) You share your garment type, preferred idea or motif, and colors. 2) We discuss the design layout and provide an illustrative quote. 3) You provide the fabric or unstitched material. 4) We handcraft the embroidery with precision care and notify you for collection or local handover.',
  },
  {
    id: 'faq-2',
    category: 'pricing',
    question: 'Why are prices shown as starting ranges rather than fixed rates?',
    answer: 'Because every garment is unique! The final price depends on your chosen fabric type (silks require special stabilization), stitch density, motif area, and embellishments like zari or cutdana. Our listed ranges give you an honest ballpark before we discuss exact specifications.',
  },
  {
    id: 'faq-3',
    category: 'craft',
    question: 'Do you embroider on stitched clothes or unstitched fabric pieces?',
    answer: 'We recommend unstitched fabric pieces (front yokes, blouse cuts, pavadai panels) as they mount flat on our embroidery frames for the sharpest needlework. However, we can also work on pre-stitched kurtis, sleeve cuffs, and children’s frocks depending on the garment seams.',
  },
  {
    id: 'faq-4',
    category: 'care',
    question: 'How should I care for garments with hand embroidery?',
    answer: 'We recommend gentle hand-washing in mild detergent for cottons, and professional dry cleaning for raw silk, organza, or garments with zari and mirror work. Always iron embroidered sections from the reverse side using a protective cotton press cloth to preserve thread luster.',
  },
  {
    id: 'faq-5',
    category: 'ordering',
    question: 'What is the "Quote Basket" on this website?',
    answer: 'The Quote Basket is a lightweight tool that allows you to collect designs you like while browsing. When you are ready, you can request a consolidated estimate for those designs in one go. It does NOT charge or purchase anything—it simply prepares your design shortlist.',
  },
];
