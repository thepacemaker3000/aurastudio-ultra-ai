import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'team_lead';
  tier: 'free' | 'pro' | 'executive' | 'enterprise';
  creditsRemaining: number;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(
      res,
      'UNAUTHORIZED',
      'Authentication token is missing or invalid. Please log in.',
      401
    );
  }

  const token = authHeader.split(' ')[1];

  // Validate token (mock/JWT verification)
  if (token === 'demo-token-pro' || token.length > 10) {
    req.user = {
      id: 'usr_executive_8842',
      email: 'executive@aurastudio.ai',
      role: 'admin',
      tier: 'executive',
      creditsRemaining: 250,
    };
    return next();
  }

  return sendError(res, 'INVALID_TOKEN', 'Session token has expired or is invalid.', 401);
}

export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (token) {
      req.user = {
        id: 'usr_guest_demo',
        email: 'guest@aurastudio.ai',
        role: 'user',
        tier: 'free',
        creditsRemaining: 10,
      };
    }
  }

  next();
}
