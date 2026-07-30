import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const faceQualitySchema = z.object({
  imageUrl: z.string().min(1, 'Image URL or base64 is required'),
  lang: z.enum(['en', 'ar']).optional().default('en'),
});

export const resumeParseSchema = z.object({
  cvText: z.string().min(10, 'CV text must be at least 10 characters long').max(10000, 'CV text cannot exceed 10000 characters'),
  lang: z.enum(['en', 'ar']).optional().default('en'),
});

export const brandKitSchema = z.object({
  fullName: z.string().min(2, 'Full name is required').max(100),
  jobTitle: z.string().min(2, 'Job title is required').max(150),
  companyName: z.string().optional().default('Global Enterprise'),
  headshotUrl: z.string().optional(),
  lang: z.enum(['en', 'ar']).optional().default('en'),
});

export const headshotGenerationSchema = z.object({
  userImage: z.string().optional(),
  settings: z.object({
    styleId: z.string().optional(),
    outfitId: z.string().optional(),
    bgId: z.string().optional(),
    resolution: z.string().optional().default('8K'),
    aspectRatio: z.string().optional().default('1:1'),
    batchCount: z.number().min(1).max(6).optional().default(1),
    // AI Photographer settings
    lensFocalLength: z.string().optional().default('85mm f/1.4 Prime'),
    cameraAngle: z.string().optional().default('Eye Level Executive'),
    lightingKey: z.string().optional().default('Rembrandt Key Light'),
    bokehLevel: z.string().optional().default('f/2.8 Soft Studio'),
    lutColorGrading: z.string().optional().default('Corporate Clean Slate'),
  }).optional(),
});

export function validateBody(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body validation',
        details: result.error.issues.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }
    req.body = result.data;
    next();
  };
}
