
// components/shapes/Triangle.tsx
import React from 'react';
import { ComponentConfig } from '../../types';
import styles from '../../styles/shapes.module.css';

interface TriangleProps {
    config: ComponentConfig;
    animationClass?: string;
    animationStyle?: React.CSSProperties;
}

const Triangle: React.FC<TriangleProps> = ({ config, animationClass = '', animationStyle = {} }) => {
    return (
        <div
            className={`${styles.triangle} ${styles[config.styleName]} ${animationClass}`}
            style={animationStyle}
            data-animation={config.animation}
        >
            <div className="triangle-shape"></div>
            {config.content && (
                <div
                    className="triangle-content"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                />
            )}
        </div>
    );
};

export default Triangle;
