import { GoogleGenAI, Type } from '@google/genai';
import { config } from '../config';
import { logger } from '../utils/logger';

export class AIGateway {
  private client: GoogleGenAI | null = null;

  constructor() {
    if (config.gemini.apiKey) {
      this.client = new GoogleGenAI({
        apiKey: config.gemini.apiKey,
        httpOptions: {
          headers: { 'User-Agent': config.gemini.userAgent },
        },
      });
    }
  }

  public isAvailable(): boolean {
    return !!this.client;
  }

  public async generateTextJSON(
    prompt: string,
    schemaProps: Record<string, any>,
    systemInstruction?: string,
    model: string = config.gemini.models.textDefault
  ): Promise<any | null> {
    if (!this.client) return null;

    try {
      const response = await this.client.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: schemaProps,
          },
          temperature: config.gemini.defaultTemperature,
        },
      });

      if (response.text) {
        return JSON.parse(response.text);
      }
    } catch (err: any) {
      logger.warn(`AIGateway generateTextJSON failed: ${err.message}`, { module: 'AIGateway', error: err });
    }

    return null;
  }

  public async generateImage(
    prompt: string,
    aspectRatio = '1:1',
    model: string = config.gemini.models.imageFast
  ): Promise<string | null> {
    if (!this.client) return null;

    try {
      const response = await this.client.models.generateContent({
        model,
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
          },
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            return `data:${mime};base64,${part.inlineData.data}`;
          }
        }
      }
    } catch (err: any) {
      logger.warn(`AIGateway generateImage failed: ${err.message}`, { module: 'AIGateway', error: err });
    }

    return null;
  }
}

export const aiGateway = new AIGateway();
