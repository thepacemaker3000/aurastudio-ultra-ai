import { logger } from '../utils/logger';

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
  moduleName?: string;
}

export class RetryFallbackEngine {
  public async executeWithRetry<T>(
    primaryFn: () => Promise<T | null>,
    fallbackFn: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<{ result: T; retriesExecuted: number; usedFallback: boolean }> {
    const maxRetries = options.maxRetries || 2;
    let delayMs = options.initialDelayMs || 300;
    const backoff = options.backoffFactor || 2;
    const moduleName = options.moduleName || 'RetryFallbackEngine';

    let retriesExecuted = 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await primaryFn();
        if (result !== null && result !== undefined) {
          return { result, retriesExecuted, usedFallback: false };
        }
      } catch (err: any) {
        retriesExecuted++;
        logger.warn(`Attempt ${attempt + 1}/${maxRetries + 1} failed in ${moduleName}: ${err.message}`, {
          module: moduleName,
          error: err,
        });
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= backoff;
      }
    }

    logger.info(`Executing high-precision fallback for ${moduleName}`, { module: moduleName });
    const fallbackResult = await fallbackFn();
    return { result: fallbackResult, retriesExecuted, usedFallback: true };
  }
}

export const retryFallbackEngine = new RetryFallbackEngine();
