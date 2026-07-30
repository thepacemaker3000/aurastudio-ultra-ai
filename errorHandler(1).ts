import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { sendError } from '../utils/apiResponse';

export function centralErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const reqId = (res.getHeader('X-Request-ID') as string) || (req.headers['x-request-id'] as string) || 'req_unknown';
  
  logger.error(err.message || 'Unhandled Express exception', {
    requestId: reqId,
    module: 'CentralErrorHandler',
    error: err.stack || err,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.statusCode || err.status || 500;
  const errorCode = err.code || (statusCode === 400 ? 'VALIDATION_ERROR' : statusCode === 401 ? 'UNAUTHORIZED' : statusCode === 403 ? 'FORBIDDEN' : statusCode === 429 ? 'RATE_LIMIT_EXCEEDED' : 'INTERNAL_SERVER_ERROR');

  const message = err.message || 'An unexpected internal server error occurred.';
  const details = err.details || undefined;

  return sendError(res, errorCode, message, statusCode, details);
}
