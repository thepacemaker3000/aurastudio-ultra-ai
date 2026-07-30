export interface ServerConfig {
  env: string;
  port: number;
  apiVersion: string;
  isProd: boolean;
  gemini: {
    apiKey: string | undefined;
    userAgent: string;
    models: {
      textDefault: string;
      textReasoning: string;
      imageFast: string;
      imageUltra: string;
      video: string;
    };
    maxOutputTokens: number;
    defaultTemperature: number;
  };
  faceLock: {
    targetPrecisionPercent: number;
    skinTextureWeight: number;
    landmarkToleranceMm: number;
  };
  creditCosts: {
    standardHeadshot: number;
    ultra8KHeadshot: number;
    faceQualityEval: number;
    resumeParse: number;
    brandKitGen: number;
    videoHeadshot: number;
  };
  rateLimits: {
    standardMax: number;
    aiMax: number;
    windowMs: number;
  };
}

export const config: ServerConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiVersion: 'v1',
  isProd: process.env.NODE_ENV === 'production',
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    userAgent: 'aistudio-aurastudio-ultra',
    models: {
      textDefault: 'gemini-3.6-flash',
      textReasoning: 'gemini-3.1-pro-preview',
      imageFast: 'gemini-3.1-flash-lite-image',
      imageUltra: 'gemini-3.1-flash-image',
      video: 'veo-3.1-generate-preview',
    },
    maxOutputTokens: 2048,
    defaultTemperature: 0.7,
  },
  faceLock: {
    targetPrecisionPercent: 99.82,
    skinTextureWeight: 0.95,
    landmarkToleranceMm: 0.4,
  },
  creditCosts: {
    standardHeadshot: 1,
    ultra8KHeadshot: 2,
    faceQualityEval: 0,
    resumeParse: 0,
    brandKitGen: 1,
    videoHeadshot: 5,
  },
  rateLimits: {
    standardMax: 60,
    aiMax: 20,
    windowMs: 60 * 1000,
  },
};
