export interface GeneratedHeadshotResult {
  id: string;
  title: string;
  url: string;
  originalUrl: string;
  styleName: string;
  outfitName: string;
  backgroundName: string;
  faceLockScore: number;
  resolution: string;
  createdAt: string;
  promptUsed: string;
  promptVersion: string;
  isFavorite: boolean;
  aspectRatio: string;
  category: string;
  photographerSpecs: {
    lens: string;
    cameraAngle: string;
    lighting: string;
    bokehLevel: string;
    lutColorGrading: string;
  };
}

export class AIResponseNormalizer {
  public normalizeHeadshotOutput(
    rawResult: { url: string; styleName: string; outfitName: string; backgroundName: string },
    userImage: string | null,
    settings: any,
    index: number,
    faceLockScore: number,
    promptUsed: string,
    promptVersion: string
  ): GeneratedHeadshotResult {
    const lens = settings?.lensFocalLength || '85mm f/1.4 Prime';
    const lighting = settings?.lightingKey || 'Rembrandt Key Light';

    return {
      id: `hs-${Date.now()}-${index}`,
      title: `${rawResult.styleName} #${index + 1}`,
      url: rawResult.url,
      originalUrl: userImage || rawResult.url,
      styleName: rawResult.styleName,
      outfitName: rawResult.outfitName,
      backgroundName: rawResult.backgroundName,
      faceLockScore,
      resolution: settings?.resolution || '8K',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      promptUsed,
      promptVersion,
      isFavorite: false,
      aspectRatio: settings?.aspectRatio || '1:1',
      category: settings?.styleId || 'corporate',
      photographerSpecs: {
        lens,
        cameraAngle: settings?.cameraAngle || 'Eye Level Executive',
        lighting,
        bokehLevel: settings?.bokehLevel || 'f/2.8 Soft Studio',
        lutColorGrading: settings?.lutColorGrading || 'Corporate Clean Slate',
      },
    };
  }
}

export const aiResponseNormalizer = new AIResponseNormalizer();
