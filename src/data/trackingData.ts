import { TrackedProject, ProjectStatus } from '../types';

export const STATUS_SEQUENCE: ProjectStatus[] = [
  'Received',
  'In Progress',
  'Quality Check',
  'Ready for Shipping',
];

export const STATUS_DESCRIPTIONS: Record<ProjectStatus, { title: string; detail: string; icon: string }> = {
  Received: {
    title: 'Fabric Received & Inspected',
    detail: 'Your fabric piece or unstitched garment cut has arrived at our home workshop. Fabric grain, stabilizer compatibility, and hoop margins have been verified.',
    icon: 'PackageCheck',
  },
  'In Progress': {
    title: 'Hand Embroidery in Progress',
    detail: 'Fabric is mounted on our wooden embroidery frame. Artisan needlework is actively underway using tested silk resham threads and zari materials.',
    icon: 'Needle',
  },
  'Quality Check': {
    title: 'Quality Check & Reverse Pressing',
    detail: 'Embroidery stitches are fully completed. Reverse thread tails have been knotted, protective fusible backing ironed, and beadwork inspected.',
    icon: 'ClipboardCheck',
  },
  'Ready for Shipping': {
    title: 'Ready for Handover / Shipping',
    detail: 'Garment has passed inspection, been wrapped in breathable tissue, and is ready for local collection or courier dispatch.',
    icon: 'Truck',
  },
};

export const INITIAL_TRACKED_PROJECTS: TrackedProject[] = [
  {
    quoteId: 'SPN-1042',
    customerName: 'Radhika Sharma',
    garmentType: 'Cotton & Raw Silk Kurti',
    designName: 'Gulmohar Resham Neckline',
    status: 'Ready for Shipping',
    fabricProvided: 'Rose Pink Tussar Silk Cut',
    threadPalette: 'Crimson Resham, Antique Gold Zari & French Knots',
    receivedDate: 'Oct 02, 2026',
    estimatedCompletion: 'Oct 09, 2026',
    artisanNotes: 'Needlework fully completed. Reverse pressing over plush towel done. Packed in protective cloth wrap for handover.',
    history: [
      {
        status: 'Received',
        timestamp: 'Oct 02, 2026 - 11:30 AM',
        note: 'Silk cut received and grain aligned on frame.',
      },
      {
        status: 'In Progress',
        timestamp: 'Oct 04, 2026 - 02:15 PM',
        note: 'Resham petal satin stitching and zari vine borders completed.',
      },
      {
        status: 'Quality Check',
        timestamp: 'Oct 08, 2026 - 04:45 PM',
        note: 'All thread ends secured. Double-layer backing applied.',
      },
      {
        status: 'Ready for Shipping',
        timestamp: 'Oct 09, 2026 - 10:00 AM',
        note: 'Finished garment ready for customer handover at workshop.',
      },
    ],
  },
  {
    quoteId: 'SPN-2048',
    customerName: 'Deepa S.',
    garmentType: 'Bridal Saree Blouse Cut',
    designName: 'Chandrika Zardozi Sleeve Cuff',
    status: 'Quality Check',
    fabricProvided: 'Bottle Green Raw Silk',
    threadPalette: 'Gold Zari Wire, Seed Pearls & Micro-Cutdana Beads',
    receivedDate: 'Oct 04, 2026',
    estimatedCompletion: 'Oct 12, 2026',
    artisanNotes: 'Sleeve cuffs completed with raised wire coils and pearl highlights. Currently inspecting tension before final reverse press.',
    history: [
      {
        status: 'Received',
        timestamp: 'Oct 04, 2026 - 03:00 PM',
        note: 'Fabric cut received with tailor margin chalk markings.',
      },
      {
        status: 'In Progress',
        timestamp: 'Oct 06, 2026 - 10:30 AM',
        note: 'Zardozi wire couching and seed pearl setting underway.',
      },
      {
        status: 'Quality Check',
        timestamp: 'Oct 10, 2026 - 01:20 PM',
        note: 'Stitch tension inspection and protective lining application.',
      },
    ],
  },
  {
    quoteId: 'SPN-3015',
    customerName: 'Kavitha Nair',
    garmentType: 'Children’s Pattu Pavadai (Lehenga)',
    designName: 'Mayura Pattu Pavadai Border',
    status: 'In Progress',
    fabricProvided: 'Mustard Yellow Kanjeevaram Silk Skirt Panel',
    threadPalette: 'Peacock Blue, Emerald Green & Matte Gold Zari',
    receivedDate: 'Oct 06, 2026',
    estimatedCompletion: 'Oct 14, 2026',
    artisanNotes: 'Peacock feather motifs 65% stitched on frame. Using soft cotton inner backing for child-friendly comfort.',
    history: [
      {
        status: 'Received',
        timestamp: 'Oct 06, 2026 - 01:00 PM',
        note: 'Skirt panel received. Motif repeat spacing marked.',
      },
      {
        status: 'In Progress',
        timestamp: 'Oct 08, 2026 - 11:00 AM',
        note: 'Peacock body aari chain and feather scalloping in progress.',
      },
    ],
  },
  {
    quoteId: 'SPN-4091',
    customerName: 'Pooja Verma',
    garmentType: 'Infant Cotton Frock & Jhabla',
    designName: 'Little Champa Baby Jhabla',
    status: 'Received',
    fabricProvided: 'Organic Soft Mulmul Cotton',
    threadPalette: 'Pastel Rose & Buttercup Yellow Soft Cotton Threads',
    receivedDate: 'Oct 09, 2026',
    estimatedCompletion: 'Oct 15, 2026',
    artisanNotes: 'Organic cotton fabric inspected for softness. Thread colors confirmed. Frame mounting scheduled for tomorrow morning.',
    history: [
      {
        status: 'Received',
        timestamp: 'Oct 09, 2026 - 04:30 PM',
        note: 'Mulmul cotton fabric checked and thread colors matched.',
      },
    ],
  },
];
