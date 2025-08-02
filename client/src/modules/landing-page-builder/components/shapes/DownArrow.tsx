
// components/shapes/DownArrow.tsx
import React from 'react';
import { ComponentConfig } from '../../types';
import styles from '../../styles/shapes.module.css';

interface DownArrowProps {
    config: ComponentConfig;
    animationClass?: string;
    animationStyle?: React.CSSProperties;
}

const DownArrow: React.FC<DownArrowProps> = ({ config, animationClass = '', animationStyle = {} }) => {
    // TODO: Implement down arrow using CSS or SVG
    // TODO: Handle content rendering near arrow
    // TODO: Apply styles and animations
    // TODO: Handle different arrow directions

    return (
        <div
            className={`${styles.downArrow} ${styles[config.styleName]} ${animationClass}`}
            style={animationStyle}
            data-animation={config.animation}
        >
            <div className="arrow-shape"></div>
            {config.content && (
                <div
                    className="arrow-content"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                />
            )}
        </div>
    );
};

export default DownArrow;