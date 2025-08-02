// client/src/app/components/dashboard/ProjectsSection.tsx

import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ProjectsSlider } from './ProjectsSlider';
import { Project } from '../../types/project';

interface ProjectsSectionProps {
  username: string;
  projects: Project[];
  onSave: (projectIndex: number, project: Project) => void;
  onDelete: (projectIndex: number) => void;
  onCreateNew: (project: Project) => void;
  loading?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  username,
  projects,
  onSave,
  onDelete,
  onCreateNew,
  loading = false
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      
      <Paper elevation={1} sx={{ p: 3 }}>
        <ProjectsSlider
          username={username}
          projects={projects}
          onSave={onSave}
          onDelete={onDelete}
          onCreateNew={onCreateNew}
          loading={loading}
        />
      </Paper>
    </Box>
  );
}; 