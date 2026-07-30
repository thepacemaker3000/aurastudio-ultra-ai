import { Response } from 'express';

export interface ApiResponseMeta {
  timestamp: string;
  requestId: string;
  apiVersion: string;
  [key: string]: any;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  code: string;
  message: string;
  data: T;
  meta: ApiResponseMeta;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorEnvelope {
  success: false;
  code: string;
  message: string;
  error?: {
    details?: ApiErrorDetail[];
    [key: string]: any;
  };
  meta: ApiResponseMeta;
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = 'Operation completed successfully',
  statusCode = 200,
  code = 'SUCCESS',
  extraMeta: Record<string, any> = {}
) {
  const reqId = (res.getHeader('X-Request-ID') as string) || 'req_system';
  
  const response: ApiSuccessEnvelope<T> = {
    success: true,
    code,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: reqId,
      apiVersion: 'v1',
      ...extraMeta,
    },
  };

  return res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  code = 'INTERNAL_ERROR',
  message = 'An error occurred while processing your request',
  statusCode = 500,
  details?: ApiErrorDetail[]
) {
  const reqId = (res.getHeader('X-Request-ID') as string) || 'req_system';

  const response: ApiErrorEnvelope = {
    success: false,
    code,
    message,
    error: details && details.length > 0 ? { details } : undefined,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: reqId,
      apiVersion: 'v1',
    },
  };

  return res.status(statusCode).json(response);
}
