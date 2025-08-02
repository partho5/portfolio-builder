//

import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { Settings, Rectangle, Circle } from '@mui/icons-material';
import { ProjectConfig } from '../../types/project';

interface ConfigPreviewProps {
  config: ProjectConfig[];
  onConfigChange: (config: ProjectConfig[]) => void;
}

export const ConfigPreview: React.FC<ConfigPreviewProps> = ({
  config,
  onConfigChange
}) => {
  // Debug: log the config prop
  console.log('ConfigPreview config:', config);

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'rectangle':
        return <Rectangle />;
      case 'circle':
        return <Circle />;
      default:
        return <Settings />;
    }
  };

  // Fallback: ensure config is an array
  const safeConfig = Array.isArray(config) ? config : [];

  return (
    <Box>
      {safeConfig.length > 0 ? (
        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Current configuration ({safeConfig.length} components)
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {safeConfig.map((item, index) => (
              <Chip
                key={index}
                icon={getComponentIcon(item.componentType)}
                label={`${item.componentType} - ${item.positioning}`}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            bgcolor: 'grey.50',
            borderStyle: 'dashed'
          }}
        >
          <Settings color="disabled" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body1" color="text.secondary">
            No configuration yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Shape-based configuration will be available in future updates
          </Typography>
        </Paper>
      )}
    </Box>
  );
}; 