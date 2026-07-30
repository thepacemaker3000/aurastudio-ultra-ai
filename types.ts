export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de';

export type CategoryType =
  | 'all'
  | 'c-suite'
  | 'corporate'
  | 'tech'
  | 'healthcare'
  | 'legal'
  | 'finance'
  | 'creative'
  | 'academic'
  | 'aviation'
  | 'lifestyle'
  | 'cultural'
  | 'editorial';

export interface HeadshotStyle {
  id: string;
  title: string;
  titleAr: string;
  category: CategoryType;
  description: string;
  descriptionAr: string;
  gender: 'unisex' | 'male' | 'female';
  recommendedOutfit: string;
  recommendedBackground: string;
  lightingSetup: string;
  tags: string[];
  image: string;
  popular?: boolean;
}

export interface OutfitPreset {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  gender: 'unisex' | 'male' | 'female';
  colorOptions: string[];
  image: string;
  formalLevel: 'executive' | 'business-casual' | 'specialized' | 'cultural';
}

export interface BackgroundPreset {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  location: string;
  lightingStyle: string;
  image: string;
  blurLevel: 'sharp' | 'soft-bokeh' | 'heavy-bokeh';
}

export interface PosePreset {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  angle: string;
  vibe: string;
  image: string;
}

export interface CameraLightingConfig {
  lens: '85mm f/1.4' | '50mm f/1.2' | '105mm f/2.8 Macro' | '35mm Environmental';
  lightSetup: '3-Point Rembrandt' | 'Butterfly Beauty' | 'Split Studio' | 'Softbox Key + Rim' | 'Natural Window';
  contrastLevel: number; // 1-10
  colorTemperature: 'warm-neutral' | 'cool-corporate' | 'studio-daylight' | 'golden-hour';
  depthOfField: 'f/1.4 Soft' | 'f/2.8 Balanced' | 'f/5.6 Crisp';
}

export interface GenerationSettings {
  styleId: string;
  outfitId: string;
  outfitColor: string;
  backgroundId: string;
  poseId: string;
  faceLockFidelity: number; // e.g. 99.8%
  skinTextureMode: 'ultra-natural' | 'soft-retouch' | 'porcelain-studio';
  ageRetention: boolean;
  anomalyRemoval: boolean;
  resolution: '2K' | '4K' | '8K';
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16';
  batchCount: number;
  customPrompt?: string;
  cameraConfig: CameraLightingConfig;
}

export interface GeneratedHeadshot {
  id: string;
  title: string;
  url: string;
  originalUrl?: string;
  styleName: string;
  outfitName: string;
  backgroundName: string;
  faceLockScore: number;
  resolution: string;
  createdAt: string;
  promptUsed: string;
  isFavorite?: boolean;
  videoPreviewUrl?: string;
  aspectRatio: string;
  category: string;
}

export interface ResumeAnalysis {
  candidateName: string;
  parsedRole: string;
  experienceLevel: string;
  industry: string;
  topSkills: string[];
  recommendedStyles: string[];
  recommendedOutfit: string;
  recommendedBackground: string;
  personalitySummary: string;
  personalitySummaryAr: string;
  linkedinBioTip: string;
}

export interface BrandKit {
  id: string;
  fullName: string;
  jobTitle: string;
  companyName: string;
  headshotUrl: string;
  bannerUrl: string;
  avatarUrl: string;
  brandColors: string[];
  typographyPairing: string;
  tagline: string;
  taglineAr: string;
  emailSignatureHtml: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  outfit: string;
  status: 'completed' | 'generating' | 'pending';
  photoUrl?: string;
}

export interface SystemStats {
  queueCount: number;
  totalGeneratedCount: number;
  avgLatencyMs: number;
  faceLockPrecision: number;
  activeModels: { name: string; status: 'online' | 'degraded'; latencyMs: number }[];
  uptimeSeconds: number;
  memoryUsageMb: number;
  gpuClusterLoad: number;
}

export interface ConstitutionRule {
  id: number;
  category: 'Core AI Engine' | 'Face Identity Lock' | 'Performance & Scale' | 'UX & Arabic RTL' | 'Security & Privacy' | 'Enterprise Governance';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: 'ENFORCED' | 'BENCHMARKED';
}
