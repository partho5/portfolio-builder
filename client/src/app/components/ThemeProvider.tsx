// components/ThemeProvider.tsx
'use client';

import React, { useState, useEffect, createContext } from 'react';
import { ThemeConfig, ThemeType } from '../types/theme';
import { themes } from '../config/themes';


interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  availableThemes: ThemeConfig[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  userTheme?: ThemeType; // For user-specific themes
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light',
  userTheme 
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(userTheme || defaultTheme);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    // Save to localStorage for persistence
    localStorage.setItem('portfolio-theme', theme);
  };

  useEffect(() => {
    // Load theme from localStorage if not user-specific
    if (!userTheme) {
      const savedTheme = localStorage.getItem('portfolio-theme') as ThemeType;
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
    }
  }, [userTheme]);

  const themeConfig = themes[currentTheme];
  const availableThemes = Object.values(themes);

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    Object.entries(themeConfig.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }, [themeConfig]);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme, availableThemes }}>
      <div 
        className="min-h-screen transition-all duration-300"
        style={{
          background: themeConfig.colors.background,
          color: themeConfig.colors.textPrimary,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};