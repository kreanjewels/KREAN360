import { 
  DiamondShape, 
  CaratSpec, 
  JewelryProduct, 
  ProcessStage, 
  CustomDesignStep, 
  JournalArticle, 
  CertificationDossier 
} from '../types';
import { REAL_KREAN_PRODUCTS, KREAN_OFFICIAL_DETAILS } from './kreanBrandData';

export { KREAN_OFFICIAL_DETAILS, REAL_KREAN_PRODUCTS };

export const DIAMOND_SHAPES: { 
  name: DiamondShape; 
  aspectRatio: string; 
  description: string; 
  svgPath: string;
}[] = [
  {
    name: 'Round',
    aspectRatio: '1.00 : 1.00',
    description: 'The archetype of scintillation. 58 symmetrical facets yielding absolute optical return.',
    svgPath: 'M50,15 A35,35 0 1,1 49.9,15 Z',
  },
  {
    name: 'Oval',
    aspectRatio: '1.35 : 1.00',
    description: 'Elongated brilliant cut that flatters the finger with expanded crown surface area.',
    svgPath: 'M50,12 C68,12 78,28 78,50 C78,72 68,88 50,88 C32,88 22,72 22,50 C22,28 32,12 50,12 Z',
  },
  {
    name: 'Emerald',
    aspectRatio: '1.40 : 1.00',
    description: 'Step-cut architectural symmetry featuring hall-of-mirrors planar reflections.',
    svgPath: 'M30,15 L70,15 L85,30 L85,70 L70,85 L30,85 L15,70 L15,30 Z',
  },
  {
    name: 'Pear',
    aspectRatio: '1.50 : 1.00',
    description: 'Teardrop brilliance uniting the round pavilion with a tapered marquise point.',
    svgPath: 'M50,12 C68,34 76,56 76,66 A26,26 0 1,1 24,66 C24,56 32,34 50,12 Z',
  },
  {
    name: 'Radiant',
    aspectRatio: '1.25 : 1.00',
    description: 'Cut-corner rectangular silhouette engineered with 70 brilliant facets for intense fire.',
    svgPath: 'M26,16 L74,16 L84,26 L84,74 L74,84 L26,84 L16,74 L16,26 Z',
  },
  {
    name: 'Cushion',
    aspectRatio: '1.05 : 1.00',
    description: 'Softened pillow profile with rounded corners and antique romantic light play.',
    svgPath: 'M25,15 C40,12 60,12 75,15 C88,25 88,75 75,85 C60,88 40,88 25,85 C12,75 12,25 25,15 Z',
  },
  {
    name: 'Princess',
    aspectRatio: '1.00 : 1.00',
    description: 'Contemporary inverted-pyramid square with crisp 90-degree corners and vibrant scintillation.',
    svgPath: 'M18,18 L82,18 L82,82 L18,82 Z',
  },
  {
    name: 'Asscher',
    aspectRatio: '1.00 : 1.00',
    description: 'Octagonal step cut with a high crown, deep pavilion, and concentric square symmetry.',
    svgPath: 'M32,15 L68,15 L85,32 L85,68 L68,85 L32,85 L15,68 L15,32 Z',
  },
  {
    name: 'Marquise',
    aspectRatio: '1.85 : 1.00',
    description: 'Dramatic navette football silhouette maximizing perceived carat spread and reach.',
    svgPath: 'M50,10 C72,32 78,50 50,90 C22,50 28,32 50,10 Z',
  },
  {
    name: 'Heart',
    aspectRatio: '1.00 : 1.00',
    description: 'Exacting romantic cleft cut requiring precise symmetry across lobes and point.',
    svgPath: 'M50,30 C45,15 25,15 20,32 C12,56 45,78 50,88 C55,78 88,56 80,32 C75,15 55,15 50,30 Z',
  }
];

export const CARAT_PRESETS: CaratSpec[] = [
  {
    carat: 0.50,
    label: '0.50 ct',
    diameterMm: '5.10 mm',
    approxFacets: 58,
    depthPct: '61.8%',
    tablePct: '57%',
    idealApplication: 'Classic Solitaire Pendants & Delicately Balanced Petite Studs',
    avgClarity: 'VVS1 / VVS2',
    avgColor: 'D–E Colorless',
    igiReportExample: 'LG612948210',
  },
  {
    carat: 1.00,
    label: '1.00 ct',
    diameterMm: '6.45 mm',
    approxFacets: 58,
    depthPct: '61.5%',
    tablePct: '56%',
    idealApplication: 'The Standard of Distinction: Timeless Four-Prong Engagement Rings',
    avgClarity: 'VVS2 / VS1',
    avgColor: 'D–F Colorless',
    igiReportExample: 'LG589201482',
  },
  {
    carat: 1.50,
    label: '1.50 ct',
    diameterMm: '7.35 mm',
    approxFacets: 58,
    depthPct: '61.2%',
    tablePct: '57%',
    idealApplication: 'Substantial Finger Coverage with Ultra-Sharp Scintillation',
    avgClarity: 'VVS1',
    avgColor: 'D Colorless',
    igiReportExample: 'LG624901844',
  },
  {
    carat: 2.00,
    label: '2.00 ct',
    diameterMm: '8.15 mm',
    approxFacets: 58,
    depthPct: '61.4%',
    tablePct: '56.5%',
    idealApplication: 'High-Impact Statement Solitaires & Signature Three-Stone Rings',
    avgClarity: 'FL / VVS1',
    avgColor: 'D Colorless',
    igiReportExample: 'LG609312955',
  },
  {
    carat: 3.00,
    label: '3.00 ct',
    diameterMm: '9.35 mm',
    approxFacets: 58,
    depthPct: '61.8%',
    tablePct: '57%',
    idealApplication: 'Couture Solitaires with Commanding Presence and Light Play',
    avgClarity: 'VVS1 / VVS2',
    avgColor: 'D–E Colorless',
    igiReportExample: 'LG638102941',
  },
  {
    carat: 5.00,
    label: '5.00 ct',
    diameterMm: '11.05 mm',
    approxFacets: 58,
    depthPct: '62.0%',
    tablePct: '57.5%',
    idealApplication: 'Museum-Caliber Heirloom Centerpieces & Bespoke Collector Mountings',
    avgClarity: 'FL / VVS1',
    avgColor: 'D Colorless',
    igiReportExample: 'LG649201859',
  },
  {
    carat: 7.50,
    label: '7.50 ct',
    diameterMm: '12.65 mm',
    approxFacets: 58,
    depthPct: '61.9%',
    tablePct: '56%',
    idealApplication: 'Private Haute Horlogerie & Exceptional Custom Cocktail Creations',
    avgClarity: 'VVS1',
    avgColor: 'D Colorless',
    igiReportExample: 'LG671294820',
  },
  {
    carat: 10.00,
    label: '10.00 ct',
    diameterMm: '13.95 mm',
    approxFacets: 58,
    depthPct: '61.7%',
    tablePct: '57%',
    idealApplication: 'Grand Masterworks: Apex Lab-Grown Synthesis Grown Over 1,200 Hours',
    avgClarity: 'FL / VVS1',
    avgColor: 'D Pure Type IIa',
    igiReportExample: 'LG699042188',
  }
];

export const PRODUCTS_CATALOG: JewelryProduct[] = REAL_KREAN_PRODUCTS;

export const MAKING_STAGES: ProcessStage[] = [
  {
    id: 1,
    numberStr: '01',
    title: 'Grown, Not Mined',
    subtitle: 'Atomic crystal synthesis under clean stellar conditions',
    description: 'In specialized vacuum reactors, a slice of pure diamond seed is bathed in a plasma cloud of methane and hydrogen at 3,000°C. Carbon atoms rain down, recreating the deep mantle thermodynamics without strip-mining landscapes or generating toxic runoff.',
    technicalSpecs: ['Type IIa Crystal Purity', 'Zero Nitrogen Impurities', 'Clean Energy Synthesized', 'Identical Carbon Lattice (sp3)'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    numberStr: '02',
    title: 'Intricately Planned',
    subtitle: 'Micron-level 3D optical tomography',
    description: 'Every harvested rough crystal is scanned using dual-wavelength laser interferometry. Our master gemologists simulate thousands of facet angles in virtual space to pinpoint the geometry that achieves the highest possible light return and zero optical strain.',
    technicalSpecs: ['3D Ray-Tracing Simulation', 'Maximized Fire & Scintillation', 'Ideal Symmetry Yield Mapping', 'Sub-Micron Angle Tolerances'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    numberStr: '03',
    title: 'Handled with Precision',
    subtitle: 'Picosecond laser bruting & cold cleavage',
    description: 'A pulsed laser beam, vibrating at picosecond intervals, slices the crystal along planned crystallographic cleavage planes. Unlike crude mechanical sawing, cold laser cutting eliminates thermal micro-fractures, preserving structural integrity.',
    technicalSpecs: ['Picosecond Laser Accuracy', 'Thermal Stress Negation', 'Micron Edge Definition', 'Preserved Crystal Core'],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    numberStr: '04',
    title: 'Faceted with Skill',
    subtitle: 'Heritage lapidary polish on cast-iron scaifes',
    description: 'Master polishers with decades of Antwerp experience hand-facet the stone across traditional diamond dust wheels. 57 or 58 planar facets are ground to within 0.01 degree, aligning table and pavilion to act as a parabolic mirror for incident light.',
    technicalSpecs: ['58 Exact Facets', 'Hand-Polished Pavilion', 'Triple Excellent Polish & Symmetry', 'Hearts & Arrows Alignment'],
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    numberStr: '05',
    title: 'Light Engineered for Brilliance',
    subtitle: 'Independent laboratory grading & certification',
    description: 'The finished gem undergoes spectrophotometric analysis before independent evaluation by IGI or HRD Antwerp. Its unique certification number is microscopically inscribed on the girdle with cold UV laser before resting in hand-finished fine jewelry mountings.',
    technicalSpecs: ['IGI & HRD Master Dossier', 'Microscopic Girdle Inscription', '100% Conflict-Free & Traceable', 'Mounted in Recycled Gold & Platinum'],
    imageUrl: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
  }
];

export const CUSTOM_JOURNEY_STEPS: CustomDesignStep[] = [
  {
    stepNumber: 1,
    title: "Tell Us What You're Looking For",
    highlight: "Define silhouette, diamond specifications, and metal",
    description: "Share your inspiration, desired diamond carat, cut shape, preferred precious metal (18K White, Yellow, Rose Gold, or Platinum 950), and target investment range.",
    deliverables: ['Initial Design Brief', 'Gemologist Consultation', 'Budget Optimization'],
    timeline: 'Day 1–2',
  },
  {
    stepNumber: 2,
    title: 'Review Diamond Options',
    highlight: 'Curated certified loose diamond dossiers',
    description: 'Our diamantaire presents high-definition 360° turntable scans and official IGI/HRD dossiers for 2–3 hand-selected loose stones matching your exact criteria.',
    deliverables: ['HD 360° Videos', 'Full Lab Certificates', 'Side-by-Side Comparison'],
    timeline: 'Day 3–4',
  },
  {
    stepNumber: 3,
    title: 'Approve Your Design',
    highlight: 'Photorealistic 3D CAD renders and scale wax mockups',
    description: 'Our jewelry engineers generate millimeter-accurate 3D CAD models from multiple angles. You review claw styles, gallery heights, and band profiles with unlimited refinements.',
    deliverables: ['360° CAD Renders', 'Exact Dimensional Specs', 'Wax Cast Pre-visualization'],
    timeline: 'Day 5–7',
  },
  {
    stepNumber: 4,
    title: 'Track Production',
    highlight: 'Milestone bench photography as your piece is cast and hand-set',
    description: 'Follow your piece through lost-wax casting in recycled precious metal, hand-milgrain, diamond seating, and precision prong tightening by master jewelers.',
    deliverables: ['Bench Update Photos', 'Casting Verification', 'Prong Tension Check'],
    timeline: 'Week 2',
  },
  {
    stepNumber: 5,
    title: 'Quality Check Complete',
    highlight: 'Dual gemological audit and micro-hallmark verification',
    description: 'Every completed jewel undergoes multi-point magnification inspection, ultrasonic cleaning, and laser inscription verification to ensure zero facet distortion.',
    deliverables: ['Atelier Certificate', 'Laser Girdle Confirmation', 'Appraisal for Insurance'],
    timeline: 'Week 3',
  },
  {
    stepNumber: 6,
    title: 'Receive Your Jewelry',
    highlight: 'Armored, fully insured courier delivery in bespoke packaging',
    description: 'Delivered directly to your door in our signature velvet-lined presentation box, accompanied by all laboratory grading cards, gemological loupe, and lifetime warranty.',
    deliverables: ['Insured White-Glove Shipping', 'Luxury Presentation Box', 'Lifetime Care Warranty'],
    timeline: 'Week 3–4',
  }
];

export const EDITORIAL_ARTICLE: JournalArticle = {
  id: 'article-01',
  slug: 'the-anatomy-of-fire-cvd-hpht',
  title: 'The Anatomy of Fire: Demystifying CVD vs. HPHT Diamond Crystallization',
  subtitle: 'An optical and crystallographic inquiry into modern lab-grown diamond synthesis.',
  author: 'Julian Thorne, FGA',
  authorRole: 'Chief Gemologist & Master Diamantaire, KREAN JEWELS',
  publishedDate: 'September 2026',
  readTime: '5 min read',
  coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
  tags: ['Gemology', 'Crystallography', 'Type IIa Purity', 'Diamond Science'],
  excerpt: 'Why do pure Type IIa lab-grown diamonds possess a higher optical transparency than 98% of natural mined stones? We deconstruct the physics of fire, dispersion, and atomic lattice perfection.',
  fullBody: [
    'For centuries, the brilliance of a diamond was believed to be an exclusive geological accident—carbon trapped under volcanic cratons for two billion years. Today, that narrative has been fundamentally re-engineered.',
    'At KREAN JEWELS, every diamond begins as a Type IIa seed. Type IIa diamonds are chemically the most pure category of diamonds known to science, consisting of almost 100% pure carbon with no measurable nitrogen or boron atoms in the crystal lattice. In natural mined diamonds, Type IIa stones represent less than 2% of total worldwide extraction.',
    'Under CVD (Chemical Vapor Deposition), pure hydrocarbon gases are energized into a plasma glow. Carbon atoms precipitate out of the plasma and bond onto the seed diamond layer by layer, matching its crystal geometry at an atomic level. This results in stones devoid of the brown or yellowish fluorescence often caused by tectonic strain in mined diamonds.',
    'When light strikes the crown of a KREAN JEWELS diamond, the refractive index of 2.417 and dispersion index of 0.044 act without internal scattering. The outcome is what gemologists call "scintillation fire"—the sharp, rainbow-spectral flashes that make a diamond appear alive.',
    'Every stone leaving our atelier is independently examined by IGI or HRD Antwerp, confirming that beauty is no longer bound to extraction, but elevated by human ingenuity.'
  ]
};

export const CERTIFICATION_DOSSIER_SAMPLE: CertificationDossier = {
  certNumber: 'LG589201482',
  lab: 'IGI',
  date: 'August 18, 2026',
  shape: 'Round Brilliant',
  carat: 2.51,
  color: 'D (Colorless)',
  clarity: 'VVS1',
  cut: 'Ideal / Triple Excellent',
  polish: 'Excellent',
  symmetry: 'Excellent',
  fluorescence: 'None',
  measurements: '8.72 x 8.76 x 5.38 mm',
  growthMethod: 'CVD (Chemical Vapor Deposition)',
  type: 'Type IIa (Extreme Optical Purity)',
  laserInscription: 'LABGROWN IGI LG589201482'
};

export const CERTIFICATIONS_INFO = [
  {
    name: 'IGI (International Gemological Institute)',
    description: 'The global benchmark in lab-grown diamond grading. Each stone receives a full spectral 4Cs analysis, growth method confirmation (CVD/HPHT), and micro-laser inscription.'
  },
  {
    name: 'HRD Antwerp (High Diamond Council)',
    description: 'Europe’s leading authority in diamond certification based in Antwerp’s world-renowned diamond quarter, utilizing strict European grading tolerances.'
  },
  {
    name: 'SCS-007 Sustainability Standard',
    description: 'Certified Climate Neutral and sustainably grown, ensuring audited origin traceability and net-zero environmental impact.'
  },
  {
    name: 'Type IIa Purity Verification',
    description: 'Spectrophotometric confirmation of 100% pure carbon lattice structure with undetectable nitrogen impurities, mirroring the rarest natural collector diamonds.'
  }
];
