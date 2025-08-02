// data/stylePresets.ts
import { StylePreset, StyleName } from '../types';

export const STYLE_PRESETS: Record<StyleName, StylePreset> = {
    glowRed: {
        backgroundColor: 'bg-red-500',
        shadow: 'shadow-red-500/50',
        text: 'text-white',
        hover: 'hover:bg-red-600 hover:shadow-red-600/50',
        border: 'border-red-500'
    },
    glowWhite: {
        backgroundColor: 'bg-white',
        shadow: 'shadow-lg shadow-white/50',
        text: 'text-black',
        hover: 'hover:bg-gray-100 hover:shadow-white/60',
        border: 'border-white'
    },
    purple: {
        backgroundColor: 'bg-purple-600',
        shadow: 'shadow-lg shadow-purple-600/50',
        text: 'text-white',
        hover: 'hover:bg-purple-700 hover:shadow-purple-700/50',
        border: 'border-purple-600'
    },
    gradientBlue: {
        backgroundColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
        shadow: 'shadow-lg shadow-blue-500/50',
        text: 'text-white',
        hover: 'hover:from-blue-500 hover:to-blue-700',
        gradient: 'from-blue-400 to-blue-600'
    },
    gradientPurple: {
        backgroundColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
        shadow: 'shadow-lg shadow-purple-500/50',
        text: 'text-white',
        hover: 'hover:from-purple-500 hover:to-purple-700',
        gradient: 'from-purple-400 to-purple-600'
    },
    glass: {
        backgroundColor: 'backdrop-blur-md bg-white/10',
        shadow: 'shadow-lg shadow-white/20',
        text: 'text-white',
        hover: 'hover:bg-white/20',
        border: 'border border-white/20'
    },
    neon: {
        backgroundColor: 'bg-black',
        shadow: 'shadow-lg shadow-cyan-400/50',
        text: 'text-cyan-400',
        hover: 'hover:shadow-cyan-300/70',
        border: 'border-2 border-cyan-400'
    }
};