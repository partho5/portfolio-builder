import React from 'react';

interface AnimatedGradientProps {
    fromColor: string;
    toColor: string;
}

export const RightArrowAnimated: React.FC<AnimatedGradientProps> = ({
                                                                        fromColor,
                                                                        toColor
                                                                    }) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 40"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
        >
            {/* Define animated gradient */}
            <defs>
                <linearGradient
                    id="animatedGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor={fromColor}>
                        <animate
                            attributeName="stop-color"
                            values={`${fromColor};${toColor};${fromColor}`}
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="50%" stopColor={toColor}>
                        <animate
                            attributeName="stop-color"
                            values={`${toColor};${fromColor};${toColor}`}
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                    <stop offset="100%" stopColor={fromColor}>
                        <animate
                            attributeName="stop-color"
                            values={`${fromColor};${toColor};${fromColor}`}
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </stop>
                </linearGradient>

                {/* Flowing animation gradient */}
                <linearGradient
                    id="flowingGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor={fromColor} stopOpacity="0.2" />
                    <stop offset="50%" stopColor={toColor} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={fromColor} stopOpacity="0.2" />
                    <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        values="-50 0; 150 0; -50 0"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </linearGradient>
            </defs>

            {/* Clean arrow shape */}
            <path
                d="M5 12
           L70 12
           L70 8
           L95 20
           L70 32
           L70 28
           L5 28 Z"
                fill="url(#animatedGradient)"
                className="opacity-90"
            />

            {/* Overlay flowing effect */}
            <path
                d="M5 12
           L70 12
           L70 8
           L95 20
           L70 32
           L70 28
           L5 28 Z"
                fill="url(#flowingGradient)"
            />

            {/* Flowing particles */}
            <circle cx="10" cy="20" r="1.5" fill={toColor} opacity="0.8">
                <animateMotion dur="2s" repeatCount="indefinite">
                    <path d="M0 0 L75 0"/>
                </animateMotion>
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/>
            </circle>

            <circle cx="10" cy="20" r="1" fill="white" opacity="0.6">
                <animateMotion dur="1.8s" repeatCount="indefinite">
                    <path d="M0 0 L75 0"/>
                </animateMotion>
                <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite"/>
            </circle>
        </svg>
    );
};