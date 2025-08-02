// types/component.types.ts
export type ComponentType = 'circle' | 'rectangle' | 'square' | 'triangle' | 'downArrow';

export type StyleName =
    | 'glowRed'
    | 'glowWhite'
    | 'purple'
    | 'gradientBlue'
    | 'gradientPurple'
    | 'glass'
    | 'neon';

export type Positioning = 'left' | 'right' | 'center';

export type Size = 25 | 33 | 50 | 75 | 100;

export interface ComponentConfig {
    componentType: ComponentType;
    content?: string;
    styleName: StyleName;
    size: Size;
    positioning: Positioning;
    id?: string;
    className?: string;
    onClick?: () => void;
    animation?: AnimationType;
    delay?: number;
}

export type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'pulse' | 'bounce';

export interface LandingPageConfig extends Array<ComponentConfig> {}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    index?: number;
}

// New: RowConfig for row/shape format (non-breaking)
export interface RowConfig {
    id: string;
    shapes: ComponentConfig[];
}