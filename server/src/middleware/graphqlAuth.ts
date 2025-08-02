import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    email: string;
  };
}

export const graphqlAuthMiddleware = async (req: AuthenticatedRequest) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null };
    }

    // For now, return a mock user for testing
    // TODO: Implement proper Supabase JWT validation
    return {
      user: {
        sub: 'test-user-id',
        email: 'test@example.com'
      }
    };
  } catch (error) {
    console.error('GraphQL auth error:', error);
    return { user: null };
  }
}; 