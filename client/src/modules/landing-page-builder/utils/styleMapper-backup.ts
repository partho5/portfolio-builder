// client/src/modules/landing-page-builder/utils/styleMapper.ts

import { StyleName, Positioning, Size, StylePreset } from '../types';

export const getStyleClasses = (styleName: StyleName): string => {
    // TODO: Map style names to CSS classes
    // TODO: Handle Tailwind classes
    // TODO: Handle CSS module classes
    // TODO: Handle combinations

    const styleMap: Record<StyleName, string> = {
        glowRed: 'bg-red-500 shadow-red-500/50 text-white',
        glowWhite: 'shadow-white/50 text-black',
        purple: ' shadow-purple-600/50 text-white',
        gradientBlue: 'bg-gradient-to-br from-blue-400 to-blue-600 text-white',
        gradientPurple: 'bg-gradient-to-br from-purple-400 to-purple-600 text-white',
        glass: 'backdrop-blur-md bg-white/10 text-white',
        neon: 'shadow-cyan-400/50 text-cyan-400'
    };

    return styleMap[styleName] || '';
};

export const getPositioningClasses = (positioning: Positioning): string => {
    // TODO: Map positioning to CSS classes
    // TODO: Handle flexbox positioning
    // TODO: Handle grid positioning
    // TODO: Handle absolute positioning

    const positionMap: Record<Positioning, string> = {
        left: 'flex justify-start items-center',
        right: 'flex justify-end items-center',
        center: 'flex justify-center items-center',
    };

    return positionMap[positioning] || 'flex justify-center items-center';
};

// Modular: shapeType can be 'circle', 'square', 'rectangle', 'triangle', etc.
// supports 25, 33, 50, 75, 100 and is responsive for circles and other shapes
export const getSizeClasses = (size: Size, shapeType?: string): string => {
    // Responsive, full-width for 100, equal gap for multiple shapes
    const shapeSizeMap: Record<string, Record<number, string>> = {
        circle: {
            25: 'w-12 h-12 md:w-16 md:h-16',      // 48px/64px
            33: 'w-16 h-16 md:w-20 md:h-20',      // 64px/80px
            50: 'w-24 h-24 md:w-32 md:h-32',      // 96px/128px
            75: 'w-32 h-32 md:w-40 md:h-40',      // 128px/160px
            100: 'w-full max-w-[320px] h-auto aspect-square', // Responsive, up to 320px
        },
        square: {
            25: 'w-12 h-12 md:w-16 md:h-16',
            33: 'w-16 h-16 md:w-20 md:h-20',
            50: 'w-24 h-24 md:w-32 md:h-32',
            75: 'w-32 h-32 md:w-40 md:h-40',
            100: 'w-full max-w-[320px] h-auto aspect-square',
        },
        rectangle: {
            25: 'w-32 h-12 md:w-40 md:h-16',
            33: 'w-40 h-16 md:w-56 md:h-20',
            50: 'w-56 h-20 md:w-72 md:h-24',
            75: 'w-72 h-24 md:w-96 md:h-32',
            100: 'w-full h-32 md:h-40',
        },
        triangle: {
            25: 'w-12 h-12 md:w-16 md:h-16',
            33: 'w-16 h-16 md:w-20 md:h-20',
            50: 'w-24 h-24 md:w-32 md:h-32',
            75: 'w-32 h-32 md:w-40 md:h-40',
            100: 'w-full max-w-[320px] h-auto aspect-square',
        },
        // fallback for unknown shapes
        default: {
            25: 'w-1/4 max-w-xs',
            33: 'w-1/3 max-w-sm',
            50: 'w-1/2 max-w-md',
            75: 'w-3/4 max-w-lg',
            100: 'w-full max-w-4xl',
        }
    };
    if (shapeType && shapeSizeMap[shapeType]) {
        return shapeSizeMap[shapeType][size] || shapeSizeMap[shapeType][100];
    }
    return shapeSizeMap.default[size] || shapeSizeMap.default[100];
};

export const getAnimationClasses = (animation?: string): string => {
    // TODO: Map animation types to CSS classes
    if (!animation) return '';

    const animationMap: Record<string, string> = {
        fadeIn: 'animate-fadeIn',
        slideUp: 'animate-slideUp',
        slideDown: 'animate-slideDown',
        slideLeft: 'animate-slideLeft',
        slideRight: 'animate-slideRight',
        pulse: 'animate-pulse',
        bounce: 'animate-bounce'
    };

    return animationMap[animation] || '';
};

// Animation utility (modular, uses mapping)
export function getAnimationClass(animation?: string): string {
    return getAnimationClasses(animation);
}

export function getAnimationDelayStyle(delay?: number): React.CSSProperties {
    return delay ? { animationDelay: `${delay}s` } : {};
}