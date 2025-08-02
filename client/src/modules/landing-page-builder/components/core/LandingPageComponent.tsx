// components/core/LandingPageBuilder.tsx
'use client'

import React from 'react';
import ComponentRenderer from './ComponentRenderer';
import { validateConfig } from '../../utils/configValidator';
import { useResponsive } from '../../hooks/useResponsive';
import { LandingPageConfig, ComponentConfig, RowConfig } from '../../types';
import LandingPageRowsRenderer from '../LandingPageRowsRenderer';


interface LandingPageBuilderProps {
    config: LandingPageConfig;
    className?: string;
    containerStyle?: React.CSSProperties;
    onComponentClick?: (config: ComponentConfig, index: number) => void;
    debug?: boolean;
    enableAnimations?: boolean;
    animationStagger?: number;
}

const LandingPageComponent: React.FC<LandingPageBuilderProps> = ({
                                                                   config,
                                                                   className = '',
                                                                   containerStyle = {},
                                                                   onComponentClick,
                                                                   debug = false,
                                                                   enableAnimations = true,
                                                                   animationStagger = 0.1
                                                               }) => {
    // TODO: Implement component validation
    // TODO: Implement responsive handling
    // TODO: Implement debug mode
    // TODO: Implement error boundaries
    // TODO: Implement component click handlers
    // TODO: Implement animation staggering

    const { breakpoint, isMobile } = useResponsive();
    const { isValid, errors } = validateConfig(config);

    if (!isValid && debug) {
        console.error('Landing Page Config Validation Errors:', errors);
    }

    // Detect if config is new row/shape format
    const isRowFormat = Array.isArray(config) && config.length > 0 && typeof (config[0] as any).shapes !== 'undefined' && Array.isArray((config[0] as any).shapes);

    if (isRowFormat) {
        // New row/shape format
        return (
            <LandingPageRowsRenderer
                rows={config as unknown as RowConfig[]}
                className={className}
                containerStyle={containerStyle}
                onComponentClick={onComponentClick}
                debug={debug}
                enableAnimations={enableAnimations}
                animationStagger={animationStagger}
            />
        );
    }

    return (
        <div
            className={`landing-page-container ${className}`}
            style={containerStyle}
            data-breakpoint={breakpoint}
        >
            {config.map((componentConfig: ComponentConfig, index: number) => (
                <ComponentRenderer
                    key={componentConfig.id || `component-${index}`}
                    config={componentConfig}
                    index={index}
                    onComponentClick={onComponentClick}
                    debug={debug}
                    enableAnimations={enableAnimations}
                    animationDelay={enableAnimations ? index * animationStagger : 0}
                />
            ))}

            {debug && (
                <div className="debug-panel">
                    {/* TODO: Debug information display */}
                </div>
            )}
        </div>
    );
};

export default LandingPageComponent;
