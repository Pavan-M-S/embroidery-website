/**
 * Spandana Craft Advisor - Comprehensive Offline Knowledge & Fallback Engine
 * Contains curated, expert handcrafted responses for Indian embroidery,
 * fabrics, motifs, garment care, styling, pricing, kids wear, and FAQs.
 */

export interface IntentCategory {
  keywords: string[];
  responses: string[];
}

// CURATED INTENT CATEGORIES (handcrafted, domain-specific knowledge)
export const CRAFT_INTENT_CATEGORIES: IntentCategory[] = [
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "namaste",
      "good morning",
      "good afternoon",
      "good evening",
      "vanakkam",
      "namaskara",
    ],
    responses: [
      "Namaste! Welcome to Spandana Embroidery. Are you looking to design a bridal blouse, kurti neckline, kids outfit, or custom motif today?",
      "Hello! Welcome to our craft studio. How can I help you with embroidery styles, thread matching, or fabric advice today?",
      "Namaste! It is wonderful to meet you. Tell me what outfit or fabric you are planning, and we will find the perfect stitch pattern.",
      "Vanakkam! How may we assist you with your embroidery needs today? We specialize in traditional and contemporary designs.",
    ],
  },
  {
    keywords: [
      "who",
      "what",
      "about",
      "studio",
      "history",
      "experience",
      "background",
      "founder",
      "established",
      "years",
    ],
    responses: [
      "Spandana Embroidery is a heritage craft studio specializing in bespoke Indian embroidery for bridal wear, ethnic garments, and contemporary fashion. Our artisans combine traditional techniques with modern aesthetics.",
      "We've been crafting exquisite embroidery for over 15 years, serving clients across India and internationally with our signature blend of zari work, thread embroidery, and handcrafted details.",
      "Our studio was founded by master artisans passionate about preserving Indian textile heritage while innovating with contemporary designs and sustainable practices.",
    ],
  },
  {
    keywords: [
      "price",
      "cost",
      "rate",
      "charges",
      "fee",
      "budget",
      "affordable",
      "expensive",
      "package",
      "quote",
      "estimation",
    ],
    responses: [
      "Our pricing varies based on design complexity, fabric type, embroidery technique, and garment size. Simple motifs start from ₹500, while intricate bridal work can range from ₹5,000 to ₹50,000+.",
      "We offer transparent pricing with detailed quotes before commencement. Factors affecting cost include stitch density, material quality (zari, resham, beads), and design intricacy.",
      "For accurate pricing, please share your fabric details, design reference, and garment measurements. We provide complimentary consultations for bulk orders and bridal collections.",
    ],
  },
  {
    keywords: [
      "technique",
      "stitch",
      "work",
      "zari",
      "resham",
      "beads",
      "sequins",
      "thread",
      "embroidery",
      "craft",
      "handwork",
    ],
    responses: [
      "We specialize in diverse embroidery techniques: Zardozi (metallic thread work), Resham silks, Aari work, Bead sequencing, Sequin work, Mirror work, and traditional Kantha stitching.",
      "Our artisans are skilled in both hand embroidery and machine-assisted techniques, choosing the best method based on design requirements and fabric compatibility.",
      "We use premium materials including genuine zari (gold/silver threads), silk resham, Czech beads, and ethically sourced sequins for lasting beauty and comfort.",
    ],
  },
  {
    keywords: [
      "fabric",
      "material",
      "silk",
      "cotton",
      "chiffon",
      "georgette",
      "velvet",
      "brocade",
      "organza",
      "net",
      "lace",
      "crepe",
      "satin",
    ],
    responses: [
      "We work with all premium fabrics: Silk, Cotton, Chiffon, Georgette, Velvet, Brocade, Organza, Net, Lace, Crepe, and Satin. Each fabric requires specific stabilization and thread selection.",
      "For heavy fabrics like velvet and brocade, we use stronger backing and specialized needles. For delicate fabrics like chiffon and organza, we employ ultra-fine threads and light touch techniques.",
      "Please bring or share details about your fabric so we can recommend the most suitable embroidery technique and thread type for optimal results.",
    ],
  },
  {
    keywords: [
      "motif",
      "design",
      "pattern",
      "paisley",
      "floral",
      "geometric",
      "buta",
      "bel",
      "jaal",
      "border",
      "butti",
      "creeper",
      "vine",
      "leaf",
      "flower",
    ],
    responses: [
      "Our motif library includes traditional paisleys, floral jaals, geometric buttas, creeper vines, temple borders, and contemporary abstract designs. We also create custom motifs from your inspirations.",
      "Popular motifs: Mughal florals, Peacock designs, Lotus patterns, Mango paisleys, Temple bells, Vine creepers, and Geometric jaals. We scale motifs to fit your garment perfectly.",
      "We can adapt any design to your fabric's drape and garment's structure, ensuring the embroidery enhances rather than overwhelms the outfit.",
    ],
  },
  {
    keywords: [
      "blouse",
      "kurti",
      "lehenga",
      "saree",
      "ghaghra",
      "dupattta",
      "garment",
      "outfit",
      "attire",
      "wear",
      "clothing",
    ],
    responses: [
      "We embroider all ethnic garments: Bridal blouses, Designer kurtis, Lehenga cholis, Sarees (pallu, border, buttis), Ghagras, Dupattas, Sherwanis, and Indo-western fusion wear.",
      "Blouse embroidery focuses on neckline, sleeves, and back designs. Lehenga work emphasizes border motifs and pallu details. Saree embroidery ranges from light buttis to heavy pallu work.",
      "We consider garment structure, drape, and occasion when designing embroidery to ensure comfort, elegance, and appropriate weight distribution.",
    ],
  },
  {
    keywords: [
      "kid",
      "children",
      "baby",
      "boys",
      "girls",
      "kidswear",
      "childrens",
      "junior",
      "toddler",
      "infant",
    ],
    responses: [
      "For children's wear, we use soft threads, lightweight techniques, and child-safe materials (non-toxic dyes, smooth beads) ensuring comfort against delicate skin.",
      "Popular kids' motifs: Cartoon-inspired designs, Fairy tales, Animal prints, Geometric patterns, Floral bunches, and Theme-based embroidery for birthdays and festivals.",
      "We create comfortable, washable embroidery for kids' outfits that maintains beauty after multiple washes while being gentle on sensitive skin.",
    ],
  },
  {
    keywords: [
      "care",
      "wash",
      "maintain",
      "clean",
      "iron",
      "store",
      "preserve",
      "longevity",
      "durability",
    ],
    responses: [
      "To preserve embroidery: Dry clean only for heavy zari work, gentle hand wash for resham threads, store in cotton cloth, avoid direct sunlight, and iron on reverse side.",
      "Beads and sequins require special care - avoid harsh detergents and excessive wringing. Store embroidered garments separately to prevent snagging and thread pulling.",
      "Regular care ensures your embroidered heirloom lasts generations. We provide specific care instructions with every completed order based on materials used.",
    ],
  },
  {
    keywords: [
      "color",
      "thread",
      "shade",
      "match",
      "dye",
      "hue",
      "tone",
      "rainbow",
      "pastel",
      "vibrant",
      "gold",
      "silver",
      "copper",
    ],
    responses: [
      "We maintain an extensive thread library with 500+ shades in resham, zari, and specialty threads. Custom dye matching available for unique fabric colors.",
      "Metallic threads: Real gold/silver zari, copper-toned alloys, and anti-tarnish coated options. We can create gradient effects and color blends as per design requirements.",
      "Please share color references or fabric swatches for accurate thread matching. We offer digital color previews before starting actual embroidery work.",
    ],
  },
  {
    keywords: [
      "occasion",
      "wedding",
      "bridal",
      "festival",
      "party",
      "function",
      "celebration",
      "event",
      "engagement",
      "reception",
    ],
    responses: [
      "We specialize in occasion-specific embroidery: Bridal trousseaus, Festival wear (Diwali, Navratri, Eid), Party outfits, Wedding guest attire, and Ceremonial garments.",
      "Bridal embroidery features heavier work with auspicious motifs, while festival wear balances vibrancy with comfort. Party wear focuses on contemporary designs with lighter touch.",
      "We understand the emotional significance of occasion wear and create designs that honor traditions while reflecting personal style preferences.",
    ],
  },
  {
    keywords: [
      "order",
      "process",
      "timeline",
      "delivery",
      "shipping",
      "payment",
      "advance",
      "deposit",
      "measurement",
      "fit",
      "trial",
    ],
    responses: [
      "Our process: Design consultation → Quote approval → 30% advance → Fabric submission → Design mockup → Artisan work → Quality check → Final fitting → Delivery.",
      "Standard timeline: 2-4 weeks for regular orders, 4-6 weeks for heavy bridal work. Express services available (additional charges apply) for urgent requirements.",
      "We accept measurements via WhatsApp video call or in-person visits. Shipping across India with tracking, and international shipping available upon request.",
    ],
  },
  {
    keywords: [
      "thread",
      "zari",
      "resham",
      "silk",
      "cotton",
      "metallic",
      "gold",
      "silver",
      "bead",
      "sequin",
      "stone",
      "motif",
    ],
    responses: [
      "Thread options: Pure silk resham (500+ colors), Genuine zari (gold/silver), Metallic alloys, Cotton threads for sheer fabrics, and Specialty threads for effects.",
      "Embellishments: Czech beads, Japanese sequins, Semi-precious stones, Pearls, Mirrors, and Crystal accents. All materials sourced for quality and skin safety.",
      "We can provide physical thread samples or digital swatches for your approval before commencing work on your garment.",
    ],
  },
  {
    keywords: [
      "location",
      "address",
      "where",
      "bangalore",
      "bengaluru",
      "karnataka",
      "india",
      "city",
      "area",
      "near",
      "close",
      "proximity",
    ],
    responses: [
      "Spandana Embroidery is based in Karnataka, India, with artisan workshops creating custom handcrafted needlework for clients across the country.",
      "You can connect with us directly through the website contact form, WhatsApp, or phone to discuss your custom design ideas!",
      "Our craft studio welcomes visits by appointment so we can dedicate uninterrupted time to reviewing your fabrics and design sketches.",
      "Operating hours: Monday to Saturday from 9:30 AM to 7:30 PM IST. Online inquiries are reviewed promptly every day.",
      "Not local? No problem! Over 60% of our clients order remotely via WhatsApp video consultations and tracked courier delivery.",
      "You can courier your fabric directly to our studio address; we will acknowledge receipt with photos and begin the design mockup.",
      "We provide digital color swatch previews and stitch scale mockups via phone/email before starting actual work on your fabric.",
    ],
  },
];

// FALLBACK RESPONSES FOR UNMATCHED QUERIES
export const DYNAMIC_CRAFT_FALLBACKS = [
  "That's an interesting embroidery question! Could you share more details about your fabric, garment type, or design inspiration so I can give you specific guidance?",
  "I'd love to help with your embroidery query! For the best advice, could you tell me more about the occasion, fabric you're working with, and any reference designs you have in mind?",
  "Great question about embroidery techniques! To provide the most accurate information, could you share what type of garment you're embellishing and the design complexity you're aiming for?",
  "That's a wonderful design consideration! For personalized advice on your embroidery project, could you share more details about your fabric choice and the specific elements you're looking to incorporate?",
  "I appreciate your interest in our embroidery services! To give you the most relevant guidance, could you describe your project in more detail - fabric, garment type, and design preferences?",
  "Excellent embroidery question! For tailored advice on your specific needs, could you share more details about your fabric, the garment you're working on, and any particular techniques you're curious about?",
  "That's a fantastic point about embroidery care! To give you the most accurate maintenance tips, could you share what type of threads and embellishments are in your embroidery?",
  "Great question about embroidery pricing! For an accurate estimate, could you share your design details, fabric type, and the garment you're looking to have embroidered?",
  "I'd be happy to help with your embroidery timeline question! For the most accurate timing, could you share the design complexity and garment type you're considering?",
];

/**
 * Generates a simple hash from the query string for caching purposes
 * @param query - The user's query string
 * @returns A numeric hash value
 */
export function getQueryHash(query: string): number {
  let hash = 0;
  for (let i = 0; i < query.length; i++) {
    const char = query.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Provides intelligent fallback responses for craft-related queries
 * Uses keyword matching and contextual understanding to generate helpful responses
 * @param query - The user's query string
 * @returns A helpful response string
 */
export function smartCraftReply(query: string): string {
  const lowerQuery = query.toLowerCase().trim();
  
  // Handle empty or very short queries
  if (!lowerQuery || lowerQuery.length < 2) {
    return "Namaste! How can I assist you with your embroidery and fabric needs today? Please share details about your project or design ideas.";
  }
  
  // Check each intent category for keyword matches
  for (const category of CRAFT_INTENT_CATEGORIES) {
    const matches = category.keywords.some(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    );
    
    if (matches) {
      // Return a random response from the matched category
      const randomIndex = Math.floor(Math.random() * category.responses.length);
      return category.responses[randomIndex];
    }
  }
  
  // If no specific category matched, return a random fallback
  const fallbackIndex = Math.floor(Math.random() * DYNAMIC_CRAFT_FALLBACKS.length);
  return DYNAMIC_CRAFT_FALLBACKS[fallbackIndex];
}