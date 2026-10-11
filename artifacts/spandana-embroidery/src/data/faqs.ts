import { FAQItem } from "./types";

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "ordering",
    question: "How does the custom embroidery ordering process work?",
    answer: (
      <ol>
        <li>You share your garment type, preferred idea or motif, and colors.</li>
        <li>We discuss the design layout and provide an illustrative quote.</li>
        <li>You provide the fabric or unstitched material.</li>
        <li>We handcraft the embroidery with precision care and notify you for collection or local handover.</li>
      </ol>
    ),
  },
  {
    id: "faq-2",
    category: "pricing",
    question:
      "Why are prices shown as starting ranges rather than fixed rates?",
    answer: (
      <p>
        Because every garment is unique! The final price depends on your chosen
        fabric type (silks require special stabilization), stitch density,
        motif area, and embellishments like zari or cutdana. Our listed ranges
        give you an honest ballpark before we discuss exact specifications.
      </p>
    ),
  },
  {
    id: "faq-3",
    category: "craft",
    question:
      "Do you embroider on stitched clothes or unstitched fabric pieces?",
    answer: (
      <p>
        We recommend unstitched fabric pieces (front yokes, blouse cuts,
        pavadai panels) as they mount flat on our embroidery frames for the
        sharpest needlework. However, we can also work on pre-stitched kurtis,
        sleeve cuffs, and children's frocks depending on the garment seams.
      </p>
    ),
  },
  {
    id: "faq-4",
    category: "care",
    question: "How should I care for garments with hand embroidery?",
    answer: (
      <p>
        We recommend gentle hand-washing in mild detergent for cottons, and
        professional dry cleaning for raw silk, organza, or garments with
        zari and mirror work. Always iron embroidered sections from the
        reverse side using a protective cotton press cloth to preserve
        thread luster.
      </p>
    ),
  },
  {
    id: "faq-5",
    category: "ordering",
    question: 'What is the "Quote Basket" on this website?',
    answer: (
      <p>
        The Quote Basket is a lightweight tool that allows you to collect
        designs you like while browsing. When you are ready, you can request
        a consolidated estimate for those designs in one go. It does NOT
        charge or purchase anything&mdash;it simply prepares your design
        shortlist.
      </p>
    ),
  },
];
