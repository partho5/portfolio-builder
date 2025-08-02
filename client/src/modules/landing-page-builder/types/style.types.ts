// types/style.types.ts
import {ComponentConfig} from "./component.types";

export interface StylePreset {
    backgroundColor: string;
    shadow: string;
    text: string;
    hover: string;
    border?: string;
    gradient?: string;
}

export interface ResponsiveBreakpoint {
    mobile: number;
    tablet: number;
    desktop: number;
}

export interface CSSProperties {
    [key: string]: string | number;
}

export interface ShapeWrapperProps {
    config: ComponentConfig;
    index: number;
    onComponentClick?: (config: ComponentConfig, index: number) => void;
    debug?: boolean;
    children: React.ReactNode;
}