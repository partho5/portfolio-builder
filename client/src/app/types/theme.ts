// types/theme.ts
export type ThemeType = 'light' | 'dark' | 'colorful' | 'orange' | 'blue' | 'purple' | 'green' | 'minimal';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  colors: {
    // Background colors
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    
    // Text colors
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    
    // Interactive elements
    buttonPrimary: string;
    buttonSecondary: string;
    buttonHover: string;
    
    // Status colors
    success: string;
    warning: string;
    error: string;
    
    // Borders and dividers
    border: string;
    divider: string;
    
    // Skill tags
    skillBg: string;
    skillText: string;
    
    // Gradients
    gradientFrom: string;
    gradientTo: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  effects: {
    blur: string;
    opacity: string;
  };
}