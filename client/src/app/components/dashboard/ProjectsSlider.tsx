//  client/src/app/components/dashboard/ProjectsSlider.tsx

import React, { useState } from 'react';
import { Box, IconButton, Typography, Button, Fade } from '@mui/material';
import { ChevronLeft, ChevronRight, Add } from '@mui/icons-material';
import { ProjectCard } from './ProjectCard';
import { Project } from '../../types/project';

interface ProjectsSliderProps {
  username: string;
  projects: Project[];
  onSave: (projectIndex: number, project: Project) => void;
  onDelete: (projectIndex: number) => void;
  onCreateNew: (project: Project) => void;
  loading?: boolean;
}

export const ProjectsSlider: React.FC<ProjectsSliderProps> = ({
  username,
  projects,
  onSave,
  onDelete,
  onCreateNew,
  loading = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  const handlePrevious = () => {
    if (isCreating) {
      setIsCreating(false);
      return;
    }
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    if (isCreating) {
      setIsCreating(false);
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const handleCreateNew = () => {
    setIsCreating(true);
  };

  const handleSaveNew = (project: Project) => {
    onCreateNew(project);
    setIsCreating(false);
    setCurrentIndex(projects.length); // Navigate to new project
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const totalItems = projects.length + (isCreating ? 1 : 0);

  return (
    <Box>
      {/* Header with navigation */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton 
            onClick={handlePrevious}
            disabled={totalItems <= 1}
            color="primary"
          >
            <ChevronLeft />
          </IconButton>
          
          <Typography variant="h6">
            {isCreating ? 'New Project' : `Project ${currentIndex + 1} of ${projects.length}`}
          </Typography>
          
          <IconButton 
            onClick={handleNext}
            disabled={totalItems <= 1}
            color="primary"
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleCreateNew}
          disabled={isCreating}
        >
          Create New
        </Button>
      </Box>

      {/* Project Content */}
      <Box sx={{ minHeight: '400px' }}>
        <Fade in={true} timeout={300}>
          <Box>
            {isCreating ? (
              <ProjectCard
                username={username}
                project={null}
                onSave={handleSaveNew}
                onCancel={handleCancelCreate}
                loading={loading}
                isCreating={true}
              />
            ) : projects.length > 0 ? (
              <ProjectCard
                username={username}
                project={projects[currentIndex]}
                projectIndex={currentIndex}
                onSave={(project) => onSave(currentIndex, project)}
                onDelete={() => onDelete(currentIndex)}
                loading={loading}
                isCreating={false}
              />
            ) : (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  No projects yet
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Create your first project to get started
                </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Box>
    </Box>
  );
}; 