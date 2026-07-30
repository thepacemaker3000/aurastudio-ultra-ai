export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedInput?: Record<string, any>;
}

export class PromptValidator {
  public validateHeadshotRequest(input: any): ValidationResult {
    const errors: string[] = [];

    if (!input || typeof input !== 'object') {
      return { isValid: false, errors: ['Request body must be a valid object'] };
    }

    if (input.userImage) {
      const isUrl = typeof input.userImage === 'string' && (input.userImage.startsWith('http://') || input.userImage.startsWith('https://'));
      const isBase64 = typeof input.userImage === 'string' && input.userImage.startsWith('data:image/');
      if (!isUrl && !isBase64) {
        errors.push('userImage must be a valid HTTP URL or base64 image string');
      }
    }

    const settings = input.settings || {};
    if (settings.batchCount && (settings.batchCount < 1 || settings.batchCount > 8)) {
      errors.push('batchCount must be an integer between 1 and 8');
    }

    const allowedAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    if (settings.aspectRatio && !allowedAspectRatios.includes(settings.aspectRatio)) {
      errors.push(`aspectRatio must be one of: ${allowedAspectRatios.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedInput: {
        userImage: input.userImage || null,
        settings: {
          styleId: settings.styleId || 'corporate',
          outfitId: settings.outfitId || 'default',
          backgroundId: settings.backgroundId || 'default',
          batchCount: settings.batchCount || 1,
          aspectRatio: settings.aspectRatio || '1:1',
          resolution: settings.resolution || '8K',
          cameraAngle: settings.cameraAngle || 'Eye Level Executive',
          lightingKey: settings.lightingKey || 'Rembrandt Key Light',
          lensFocalLength: settings.lensFocalLength || '85mm f/1.4 Prime',
          bokehLevel: settings.bokehLevel || 'f/2.8 Soft Studio',
          lutColorGrading: settings.lutColorGrading || 'Corporate Clean Slate',
        },
      },
    };
  }

  public validateFaceQualityInput(input: any): ValidationResult {
    const errors: string[] = [];
    if (!input || !input.imageUrl) {
      errors.push('imageUrl is required for face quality evaluation');
    }
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const promptValidator = new PromptValidator();
