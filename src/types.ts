export type DiamondShape = 
  | 'Round' 
  | 'Emerald' 
  | 'Oval' 
  | 'Pear' 
  | 'Marquise' 
  | 'Princess' 
  | 'Radiant' 
  | 'Heart' 
  | 'Cushion' 
  | 'Asscher';

export interface CaratSpec {
  carat: number;
  label: string;
  diameterMm: string;
  approxFacets: number;
  depthPct: string;
  tablePct: string;
  idealApplication: string;
  avgClarity: string;
  avgColor: string;
  igiReportExample: string;
}

export interface JewelryProduct {
  id: string;
  name: string;
  category: 'rings' | 'bracelets' | 'earrings' | 'pendants' | 'loose';
  subCategory: 'solitaires' | 'side-stones' | 'tennis-eternity' | 'curated-layouts' | 'loose-fancy';
  shape: DiamondShape;
  caratWeight: number;
  metal: '18K White Gold' | '18K Yellow Gold' | '18K Rose Gold' | 'Platinum 950';
  priceUsd: number;
  certBody: 'IGI' | 'HRD';
  certNumber: string;
  colorGrade: 'D' | 'E' | 'F' | 'G' | 'Vivid Pink' | 'Vivid Blue' | 'Vivid Yellow';
  clarityGrade: 'FL' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2';
  cutGrade: 'Ideal / Triple Ex' | 'Excellent';
  imageUrl: string;
  description: string;
  tag?: string;
}

export interface ProcessStage {
  id: number;
  numberStr: string;
  title: string;
  subtitle: string;
  description: string;
  technicalSpecs: string[];
  imageUrl: string;
}

export interface CustomDesignStep {
  stepNumber: number;
  title: string;
  highlight: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  fullBody: string[];
  coverImage: string;
  tags: string[];
}

export interface CertificationDossier {
  certNumber: string;
  lab: 'IGI' | 'HRD';
  date: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  measurements: string;
  growthMethod: 'CVD (Chemical Vapor Deposition)' | 'HPHT (High Pressure High Temp)';
  type: 'Type IIa (Extreme Optical Purity)';
  laserInscription: string;
}

export interface CartItem {
  product: JewelryProduct;
  quantity: number;
}
