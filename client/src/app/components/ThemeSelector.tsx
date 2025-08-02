// components/ThemeSelector.tsx
'use client';

import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Palette, Check } from 'lucide-react';




interface ThemeSelectorProps {
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  showLabel = true, 
  size = 'md' 
}) => {
  const { currentTheme, setTheme, availableThemes, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 rounded-lg border transition-all duration-200
          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50
          ${sizeClasses[size]}
        `}
        style={{
          backgroundColor: themeConfig.colors.surface,
          borderColor: themeConfig.colors.border,
          color: themeConfig.colors.textPrimary,
          boxShadow: themeConfig.shadows.sm,
        }}
      >
        <Palette className="w-4 h-4" />
        {showLabel && <span>Theme</span>}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="absolute top-full mt-2 right-0 z-20 min-w-48 rounded-lg border overflow-hidden"
            style={{
              backgroundColor: themeConfig.colors.surface,
              borderColor: themeConfig.colors.border,
              boxShadow: themeConfig.shadows.lg,
            }}
          >
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setTheme(theme.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 text-left flex items-center justify-between
                  hover:opacity-80 transition-all duration-200
                  ${currentTheme === theme.id ? 'font-semibold' : ''}
                `}
                style={{
                  backgroundColor: currentTheme === theme.id 
                    ? themeConfig.colors.primary + '20' 
                    : 'transparent',
                  color: themeConfig.colors.textPrimary,
                }}
              >
                <div>
                  <div className="font-medium">{theme.name}</div>
                  <div 
                    className="text-xs mt-1"
                    style={{ color: themeConfig.colors.textMuted }}
                  >
                    {theme.description}
                  </div>
                </div>
                {currentTheme === theme.id && (
                  <Check className="w-4 h-4" style={{ color: themeConfig.colors.primary }} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};