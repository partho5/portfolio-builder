// client/src/app/components/dashboard/DashboardLayout.tsx

import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { ProfileForm } from './ProfileForm';
import { UserProfile } from '../../types/user';
import { ProjectsSection } from './ProjectsSection';
import { Project } from '../../types/project';

interface DashboardLayoutProps {
  profile: UserProfile;
  projects: Project[];
  onSaveProfile: (profile: UserProfile) => void;
  onSaveProject: (projectIndex: number, project: Project) => void;
  onDeleteProject: (projectIndex: number) => void;
  onCreateProject: (project: Project) => void;
  loading?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  profile,
  projects,
  onSaveProfile,
  onSaveProject,
  onDeleteProject,
  onCreateProject,
  loading = false
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }} className="rounded-2xl">
      <Typography variant="h4" gutterBottom>
        Dashboard - {profile.name}
      </Typography>
      
      {/* Profile Section */}
      <Paper elevation={1} sx={{ p: 3 }}>
        <ProfileForm
          profile={profile}
          onSave={onSaveProfile}
          loading={loading}
        />
      </Paper>

      {/* Projects Section */}
      <ProjectsSection
        username={profile.username}
        projects={projects}
        onSave={onSaveProject}
        onDelete={onDeleteProject}
        onCreateNew={onCreateProject}
        loading={loading}
      />
    </Container>
  );
}; 