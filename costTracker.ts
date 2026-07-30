import { config } from '../config';

export type RequestCategory =
  | 'headshot_standard'
  | 'headshot_ultra'
  | 'passport_order'
  | 'face_quality'
  | 'resume_parse'
  | 'brand_kit'
  | 'video_headshot';

export interface CreditCheckResult {
  allowed: boolean;
  requiredCredits: number;
  availableCredits: number;
  category: RequestCategory;
}

export class CostTracker {
  public calculateCreditCost(category: RequestCategory, resolution = '8K'): number {
    switch (category) {
      case 'headshot_ultra':
        return config.creditCosts.ultra8KHeadshot;
      case 'headshot_standard':
        return resolution === '8K' ? config.creditCosts.ultra8KHeadshot : config.creditCosts.standardHeadshot;
      case 'video_headshot':
        return config.creditCosts.videoHeadshot;
      case 'brand_kit':
        return config.creditCosts.brandKitGen;
      case 'face_quality':
        return config.creditCosts.faceQualityEval;
      case 'resume_parse':
        return config.creditCosts.resumeParse;
      default:
        return config.creditCosts.standardHeadshot;
    }
  }

  public verifyBalance(category: RequestCategory, currentCredits: number, resolution = '8K'): CreditCheckResult {
    const requiredCredits = this.calculateCreditCost(category, resolution);
    return {
      allowed: currentCredits >= requiredCredits,
      requiredCredits,
      availableCredits: currentCredits,
      category,
    };
  }
}

export const costTracker = new CostTracker();
