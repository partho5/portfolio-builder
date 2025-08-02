import React from 'react';
import { RowConfig } from './configTypes';
import LandingPageComponent from "../landing-page-builder/components/core/LandingPageComponent";


interface RowPreviewProps {
  row: RowConfig;
  enableAnimations?: boolean;
  debug?: boolean;
}

export const RowPreview: React.FC<RowPreviewProps> = ({ row, enableAnimations = true, debug = false }) => {
  return (
    <div style={{ display: 'flex', gap: 16, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 24 }}>
      {row.components.map((shape) => (
        <LandingPageComponent
          key={shape.id}
          config={[shape]}
          enableAnimations={enableAnimations}
          debug={debug}
        />
      ))}
    </div>
  );
}; 