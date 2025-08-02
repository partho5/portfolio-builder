'use client'

import React, { useState } from 'react';
import Rectangle from './Rectangle';
import { ComponentConfig } from '../../types/component.types';

export type BadgeType = 'circle' | 'rectangle';
export type BadgePosition = 'top-center' | 'top-left' | 'top-right';
export type LabelPosition = 'top' | 'bottom' | 'center' | 'left' | 'right';

interface RectangleWithBadgeProps {
  config: ComponentConfig;
  children?: React.ReactNode;
  // Badge customization
  badgeType?: BadgeType;
  badgeText?: string;
  badgeBg?: string;
  badgeTextColor?: string;
  badgeSize?: number | string; // px or tailwind size
  badgePosition?: BadgePosition;
  // Label customization
  labelText?: string;
  labelPosition?: LabelPosition;
  labelBg?: string;
  labelTextColor?: string;
}

const badgePositionStyles = {
  'top-center': 'left-1/2 -translate-x-1/2 top-0 -translate-y-1/2',
  'top-left': 'left-6 top-0 -translate-y-1/2',
  'top-right': 'right-6 top-0 -translate-y-1/2',
};

const labelPositionStyles = {
  top: 'absolute top-2 left-1/2 -translate-x-1/2',
  bottom: 'absolute bottom-2 left-1/2 -translate-x-1/2',
  center: 'flex items-center justify-center h-full',
  left: 'absolute left-2 top-1/2 -translate-y-1/2',
  right: 'absolute right-2 top-1/2 -translate-y-1/2',
};

const RectangleWithBadge: React.FC<RectangleWithBadgeProps> = ({
  config,
  children,
  badgeType = 'circle',
  badgeText = '',
  badgeBg = 'bg-blue-500',
  badgeTextColor = 'text-white',
  badgeSize = 48,
  badgePosition = 'top-center',
  labelText,
  labelPosition = 'center',
  labelBg = 'bg-gray-200',
  labelTextColor = 'text-gray-800',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);

  const badgeStyle =
    typeof badgeSize === 'number'
      ? { width: badgeSize, height: badgeSize, minWidth: badgeSize, minHeight: badgeSize }
      : {};

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Badge (overlapping top center of rectangle) */}
        <div
          className={`absolute z-20 ${badgePositionStyles[badgePosition]} flex items-center justify-center ${
            badgeType === 'circle' ? 'rounded-full' : 'rounded-md'
          } shadow-lg ${badgeBg} ${badgeTextColor} cursor-pointer
          transition-all duration-500 ease-out transform
          hover:scale-110 hover:shadow-2xl hover:rotate-3
          active:scale-95 active:rotate-0
          ${isBadgeHovered ? 'animate-pulse' : ''}
          ${isHovered ? 'animate-bounce' : ''}
          hover:z-30
          before:absolute before:inset-0 before:rounded-full before:bg-white before:opacity-0 
          before:transition-opacity before:duration-300 hover:before:opacity-20
          after:absolute after:inset-0 after:rounded-full after:border-2 after:border-white 
          after:opacity-0 after:transition-all after:duration-300 hover:after:opacity-30
          hover:after:scale-125`}
          style={{
            ...badgeStyle,
            fontWeight: 600,
            fontSize: typeof badgeSize === 'number' ? badgeSize / 2.5 : undefined,
          }}
          onMouseEnter={() => setIsBadgeHovered(true)}
          onMouseLeave={() => setIsBadgeHovered(false)}
        >
          {/* Badge inner glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {badgeText}
        </div>

        {/* Rectangle base with enhanced hover effects */}
        <div className="relative w-full h-full transform transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1">
          <Rectangle config={config} />
          
          {/* Rectangle hover overlay effects */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                          transition-transform duration-1000 ease-out" />
          </div>
        </div>

        {/* Optional label with enhanced styling */}
        {labelText && (
          <div
            className={`pointer-events-none select-none px-3 py-2 text-xs font-semibold ${labelBg} ${labelTextColor} 
                       ${labelPositionStyles[labelPosition]} rounded-lg shadow-lg
                       transition-all duration-300 ease-out
                       group-hover:scale-110 group-hover:shadow-xl
                       group-hover:bg-opacity-90 backdrop-blur-sm`}
            style={{ borderRadius: 8, maxWidth: '90%' }}
          >
            {labelText}
          </div>
        )}

        {/* Children content with enhanced positioning */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10
                      transform transition-all duration-300 ease-out
                      group-hover:scale-105 group-hover:z-20">
          {children}
        </div>

        {/* Floating particles effect on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100
                         animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-active:scale-150 
                         transition-transform duration-300 ease-out opacity-0 group-active:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default RectangleWithBadge; 