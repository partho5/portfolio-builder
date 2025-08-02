// components/shapes/Circle.tsx
import React from 'react';
import { ComponentConfig } from '../../types';
import styles from '../../styles/shapes.module.css';
import { getSizeClasses } from '../../utils/styleMapper';

interface CircleProps {
    config: ComponentConfig;
    animationClass?: string;
    animationStyle?: React.CSSProperties;
}

const Circle: React.FC<CircleProps> = ({ config, animationClass = '', animationStyle = {} }) => {
    const sizeClass = getSizeClasses(config.size, 'circle');
    return (
        <div
            className={`${styles.circle} ${styles[config.styleName]} ${sizeClass} ${animationClass}`}
            style={animationStyle}
            data-animation={config.animation}
        >
            {config.content && (
                <div
                    className="circle-content"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                />
            )}
        </div>
    );
};

export default Circle;