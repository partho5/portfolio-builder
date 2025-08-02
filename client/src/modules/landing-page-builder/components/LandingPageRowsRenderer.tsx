// client/src/modules/landing-page-builder/components/LandingPageRowsRenderer.tsx

import React from 'react';
import { RowConfig, ComponentConfig } from '../types';
import ComponentRenderer from './core/ComponentRenderer';

interface LandingPageRowsRendererProps {
    rows: RowConfig[];
    className?: string;
    containerStyle?: React.CSSProperties;
    onComponentClick?: (config: ComponentConfig, index: number, rowIndex: number) => void;
    debug?: boolean;
    enableAnimations?: boolean;
    animationStagger?: number;
}

// Helper to get flex alignment from positioning
const getJustify = (shapes: ComponentConfig[]) => {
    // If all shapes are center, center; if all left, flex-start; if all right, flex-end; else space-between
    const positions = shapes.map(s => s.positioning);
    if (positions.every(p => p === 'center')) return 'justify-center';
    if (positions.every(p => p === 'left')) return 'justify-start';
    if (positions.every(p => p === 'right')) return 'justify-end';
    return 'justify-between';
};

const getAlign = (shapes: ComponentConfig[]) => {
    // For now, always items-center
    return 'items-center';
};

const LandingPageRowsRenderer: React.FC<LandingPageRowsRendererProps> = ({
    rows,
    className = '',
    containerStyle = {},
    onComponentClick,
    debug = false,
    enableAnimations = true,
    animationStagger = 0.1,
}) => {
    return (
        <div className={`landing-page-rows-container ${className}`} style={containerStyle}>
            {rows.map((row, rowIndex) => {
                const justify = getJustify(row.shapes);
                const align = getAlign(row.shapes);
                const numShapes = row.shapes.length;
                return (
                    <div
                        key={row.id || `row-${rowIndex}`}
                        className={`landing-page-row w-full flex ${justify} ${align} gap-4 my-4`}
                        data-row-id={row.id}
                    >
                        {row.shapes.map((shape, shapeIndex) => (
                            /*  map 'left' → 'start', 'right' → 'end', 'center' → 'center' to match Tailwind classes */
                            <div
                                key={shape.id || `shape-${shapeIndex}`}
                                className={`flex-1 min-w-0 flex justify-${
                                    shape.positioning === 'right'
                                        ? 'end'
                                        : shape.positioning === 'left'
                                            ? 'start'
                                            : shape.positioning
                                }`}
                                style={{ maxWidth: `${100 / (numShapes || 1)}%` }}
                            >
                                <ComponentRenderer
                                    config={shape}
                                    index={shapeIndex}
                                    onComponentClick={
                                        onComponentClick
                                            ? (cfg, idx) => onComponentClick(cfg, idx, rowIndex)
                                            : undefined
                                    }
                                    debug={debug}
                                    enableAnimations={enableAnimations}
                                    animationDelay={
                                        enableAnimations
                                            ? (rowIndex * 10 + shapeIndex) * animationStagger
                                            : 0
                                    }
                                />
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default LandingPageRowsRenderer; 