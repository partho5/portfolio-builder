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


export const getSizeClasses = (size: Size, shapeType?: string): string => {
    const shapeSizeMap: Record<string, Record<number, string>> = {
        circle: {
            /* these are custom classes defined in shapes.module.css */
            25: 'circle-size-25',
            33: 'circle-size-33',
            50: 'circle-size-50',
            75: 'circle-size-75',
            100: 'circle-size-100',
        },
        square: {
            25: 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32',
            33: 'w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40',
            50: 'w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56',
            75: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72',
            100: 'w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96',
        },
        rectangle: {
            25: 'w-64 h-20 md:w-80 md:h-24 lg:w-96 lg:h-28',
            33: 'w-80 h-24 md:w-96 md:h-28 lg:w-[28rem] lg:h-32',
            50: 'w-[28rem] h-28 md:w-[32rem] md:h-32 lg:w-[36rem] lg:h-36',
            75: 'w-[36rem] h-32 md:w-[40rem] md:h-36 lg:w-[44rem] lg:h-40',
            100: 'w-[44rem] h-40 md:w-[52rem] md:h-48 lg:w-[60rem] lg:h-56',
        },
        triangle: {
            25: 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32',
            33: 'w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40',
            50: 'w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56',
            75: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72',
            100: 'w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96',
        },
        default: {
            25: 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32',
            33: 'w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40',
            50: 'w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56',
            75: 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72',
            100: 'w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96',
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