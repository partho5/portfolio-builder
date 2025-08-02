// components/core/ShapeWrapper.tsx

import React from 'react';
import { getPositioningClasses, getSizeClasses, getStyleClasses, getAnimationClass, getAnimationDelayStyle } from '../../utils/styleMapper';
import { ShapeWrapperProps } from '../../types';
import styles from '../../styles/shapes.module.css';

const ShapeWrapper: React.FC<ShapeWrapperProps> = ({
                                                       config,
                                                       index,
                                                       onComponentClick,
                                                       debug = false,
                                                       children
                                                   }) => {
    // TODO: Implement positioning logic
    // TODO: Implement size calculations
    // TODO: Implement style application
    // TODO: Implement click handlers
    // TODO: Implement debug overlay
    // TODO: Implement animations

    const handleClick = (): void => {
        if (config.onClick) {
            config.onClick();
        }
        if (onComponentClick) {
            onComponentClick(config, index);
        }
    };

    const positioningClasses = getPositioningClasses(config.positioning);
    const sizeClass = getSizeClasses(config.size, config.componentType);
    const styleClasses = getStyleClasses(config.styleName);
    const animationClass = getAnimationClass(config.animation);
    const animationStyle = getAnimationDelayStyle(config.delay);

    //console.log(`ShapeWrapper : config= ${JSON.stringify(config)}`)
    console.log(`for size ${config.size} class=${sizeClass} `)

    return (
        <div
            className={`shape-wrapper my-2 md:my-8 ${positioningClasses} ${config.className || ''}`}
            onClick={handleClick}
            data-component-type={config.componentType}
            data-index={index}
            data-style-name={config.styleName}
        >
            {/* class may/not contain: ${sizeClass} ${styleClasses} ${animationClass} */}
            <div className={`shapeWrapper-tsx ${styles[sizeClass]} ${styleClasses} ${animationClass}`}
                 style={animationStyle}
            >
                {React.isValidElement(children)
                    ? React.cloneElement(children as React.ReactElement, { animationClass, animationStyle })
                    : children}
            </div>

            {debug && (
                <div className="debug-overlay">
                    <div className="debug-info">
                        <span>Type: {config.componentType}</span>
                        <span>Style: {config.styleName}</span>
                        <span>Size: {config.size}%</span>
                        <span>Position: {config.positioning}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShapeWrapper;