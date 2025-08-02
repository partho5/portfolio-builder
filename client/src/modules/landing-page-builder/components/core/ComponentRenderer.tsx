
// components/core/ComponentRenderer.tsx
import React from 'react';
import ShapeWrapper from './ShapeWrapper';
import { Circle, Rectangle, Square, Triangle, DownArrow } from '../shapes';
import { COMPONENT_TYPES } from '../../utils/constants';
import { ComponentConfig, ComponentType } from '../../types';

interface ComponentRendererProps {
    config: ComponentConfig;
    index: number;
    onComponentClick?: (config: ComponentConfig, index: number) => void;
    debug?: boolean;
    enableAnimations?: boolean;
    animationDelay?: number;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
                                                                 config,
                                                                 index,
                                                                 onComponentClick,
                                                                 debug = false,
                                                                 enableAnimations = true,
                                                                 animationDelay = 0
                                                             }) => {
    // TODO: Implement component type mapping
    // TODO: Implement error handling for unknown component types
    // TODO: Implement debug overlay
    // TODO: Implement animation handling

    const componentMap: Record<ComponentType, React.ComponentType<{ config: ComponentConfig }>> = {
        [COMPONENT_TYPES.CIRCLE]: Circle,
        [COMPONENT_TYPES.RECTANGLE]: Rectangle,
        [COMPONENT_TYPES.SQUARE]: Square,
        [COMPONENT_TYPES.TRIANGLE]: Triangle,
        [COMPONENT_TYPES.DOWN_ARROW]: DownArrow,
    };

    const Component = componentMap[config.componentType];

    if (!Component) {
        if (debug) {
            return (
                <div className="error-component">
                    Unknown component type: {config.componentType}
                </div>
            );
        }
        return null;
    }

    return (
        <ShapeWrapper
            config={config}
            index={index}
            onComponentClick={onComponentClick}
            debug={debug}
        >
            <Component config={config} />
        </ShapeWrapper>
    );
};

export default ComponentRenderer;