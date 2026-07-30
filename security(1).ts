import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import crypto from 'crypto';

// Rate Limiter for general API endpoints (60 req/min)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests from this IP, please try again after a minute.' },
});

// Stricter Rate Limiter for AI generation endpoints (20 req/min)
export const aiGenerationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'AI generation rate limit exceeded. Please wait 60 seconds.' },
});

// Helmet Configuration
export const helmetMiddleware = helmet({
  contentSecurityPolicy: false, // Allowed for embedded images & external asset previews
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

// CORS Configuration
export const corsMiddleware = cors({
  origin: true, // Allow current domain/preview origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
});

// Compression Middleware
export const compressionMiddleware = compression();

// Request ID Middleware
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const reqId = (req.headers['x-request-id'] as string) || crypto.randomUUID();
  req.headers['x-request-id'] = reqId;
  res.setHeader('X-Request-ID', reqId);
  next();
}

// Global Error Handler Middleware
export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const reqId = res.getHeader('X-Request-ID') || 'unknown';
  console.error(`[Error][ReqID: ${reqId}]`, err);

  const statusCode = err.statusCode || err.status || 500;
  const isProd = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    success: false,
    requestId: reqId,
    error: isProd ? 'An internal server error occurred.' : (err.message || 'Internal Server Error'),
  });
}
