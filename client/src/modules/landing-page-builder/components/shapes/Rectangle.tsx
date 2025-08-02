// components/shapes/Rectangle.tsx
import React from 'react';
import { ComponentConfig } from '../../types';
import styles from '../../styles/shapes.module.css';
import { getSizeClasses } from '../../utils/styleMapper';

interface RectangleProps {
    config: ComponentConfig;
    animationClass?: string;
    animationStyle?: React.CSSProperties;
}

const Rectangle: React.FC<RectangleProps> = ({ config, animationClass = '', animationStyle = {} }) => {
    const sizeClass = getSizeClasses(config.size, 'rectangle');
    return (
        <div
            className={`${styles.rectangle} ${styles[config.styleName]} ${sizeClass} ${animationClass}`}
            style={animationStyle}
            data-animation={config.animation}
        >
            {config.content && (
                <div
                    className="rectangle-content"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                />
            )}
        </div>
    );
};

export default Rectangle;