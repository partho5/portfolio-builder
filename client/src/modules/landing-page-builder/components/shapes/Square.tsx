// components/shapes/Square.tsx
import React from 'react';
import { ComponentConfig } from '../../types';
import styles from '../../styles/shapes.module.css';
import { getSizeClasses } from '../../utils/styleMapper';

interface SquareProps {
    config: ComponentConfig;
    animationClass?: string;
    animationStyle?: React.CSSProperties;
}

const Square: React.FC<SquareProps> = ({ config, animationClass = '', animationStyle = {} }) => {
    const sizeClass = getSizeClasses(config.size, 'square');
    return (
        <div
            className={`${styles.square} ${styles[config.styleName]} ${sizeClass} ${animationClass}`}
            style={animationStyle}
            data-animation={config.animation}
        >
            {config.content && (
                <div
                    className="square-content"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                />
            )}
        </div>
    );
};

export default Square;