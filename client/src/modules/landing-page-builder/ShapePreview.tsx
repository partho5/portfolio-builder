import React from 'react';
import { ShapeConfig } from './configTypes';
import LandingPageComponent from "../landing-page-builder/components/core/LandingPageComponent";

interface ShapePreviewProps {
  shape: ShapeConfig;
  onClick?: () => void;
  selected?: boolean;
}

export const ShapePreview: React.FC<ShapePreviewProps> = ({ shape, onClick, selected }) => {
  return (
    <div
      style={{
        // Remove border from shape preview
        borderRadius: 8,
        padding: 8,
        cursor: 'pointer',
        background: selected ? '#f0f8ff' : '#fff',
        margin: 4,
        transition: 'border 0.2s',
      }}
      onClick={onClick}
    >
      <LandingPageComponent config={[shape]} enableAnimations={false} debug={false} />
    </div>
  );
}; 