// utils/constants.ts
import {ResponsiveBreakpoint} from "../types";

export const COMPONENT_TYPES = {
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
    SQUARE: 'square',
    TRIANGLE: 'triangle',
    DOWN_ARROW: 'downArrow'
} as const;

export const STYLE_NAMES = {
    GLOW_RED: 'glowRed',
    GLOW_WHITE: 'glowWhite',
    PURPLE: 'purple',
    GRADIENT_BLUE: 'gradientBlue',
    GRADIENT_PURPLE: 'gradientPurple',
    GLASS: 'glass',
    NEON: 'neon'
} as const;

export const POSITIONING = {
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center'
} as const;

export const SIZES = {
    SMALL: 25,
    MEDIUM: 33,
    LARGE: 50,
    XL: 75,
    FULL: 100
} as const;

export const ANIMATION_TYPES = {
    FADE_IN: 'fadeIn',
    SLIDE_UP: 'slideUp',
    SLIDE_DOWN: 'slideDown',
    SLIDE_LEFT: 'slideLeft',
    SLIDE_RIGHT: 'slideRight',
    PULSE: 'pulse',
    BOUNCE: 'bounce'
} as const;

export const BREAKPOINTS: ResponsiveBreakpoint = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
};
