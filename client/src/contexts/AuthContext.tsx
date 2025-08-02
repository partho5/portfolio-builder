'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface AuthContextType {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading: auth0Loading } = useUser();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshToken = async () => {
    if (!user) {
      setAccessToken(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Get token from session
      const response = await fetch('/api/auth/token');
      if (response.ok) {
        const { accessToken: token } = await response.json();
        setAccessToken(token);
      } else {
        throw new Error('Failed to get access token');
      }
    } catch (err) {
      console.error('Error getting access token:', err);
      setError(err instanceof Error ? err.message : 'Failed to get access token');
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!auth0Loading) {
      refreshToken();
    }
  }, [user, auth0Loading]);

  const value: AuthContextType = {
    accessToken,
    isLoading: auth0Loading || isLoading,
    error,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 