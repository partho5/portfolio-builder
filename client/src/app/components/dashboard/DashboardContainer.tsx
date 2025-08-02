// client/src/app/components/dashboard/DashboardContainer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { DashboardLayout } from './DashboardLayout';
import { UserProfile } from '../../types/user';
import { Project } from '../../types/project';
import {API_BASE_URL} from "@/app/config/values";

// Create a theme for the dashboard to isolate styles
const dashboardTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

interface DashboardContainerProps {
  username: string;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({ username }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, [username]);

  const fetchProfile = async () => {
    try {
      // Only one fetch, with cache: 'no-store'
      const response = await fetch(`${API_BASE_URL}/public/profile/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      });
      const data = await response.json();
      //console.log('Profile data:', data);
      
      if (data.error) {
        console.error('Profile fetch error:', data.error);
        return;
      }

      // Transform the data to match UserProfile interface
      const transformedProfile: UserProfile = {
        username: data.username,
        name: data.displayName || data.username,
        displayName: data.displayName,
        title: data.role || '',
        role: data.role,
        profileImage: data.profileImage || '',
        bio: data.bio || '',
        email: data.email || '',
        skillSet: data.skillSet || [],
        services: data.services || [],
        socialLinks: data.socialLinks || {},
        contactButtonLabel: data.contactButtonLabel || 'Contact Me',
        hireButtonLabel: data.hireButtonLabel || 'Hire Me',
        customSections: data.customSections || []
      };

      setProfile(transformedProfile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const projectsRes = await fetch(`${API_BASE_URL}/public/projects/${username}`, { cache: 'no-store' });
      const projectsData = await projectsRes.json();
      console.log('projectsData :', `${API_BASE_URL}/public/projects/${username}`, projectsData);
      if (Array.isArray(projectsData)) {
        setProjects(projectsData);
      } else if (projectsData && Array.isArray(projectsData.projects)) {
        setProjects(projectsData.projects);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects([]);
    }
  };

  const handleSaveProfile = async (updatedProfile: UserProfile) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ profileData: updatedProfile, username: updatedProfile.username })
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data.profile);
      } else {
        throw new Error(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (projectIndex: number, project: Project) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${project.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ projectData: project, username: profile?.username })
      });
      const data = await response.json();
      if (response.ok) {
        const updatedProjects = [...projects];
        updatedProjects[projectIndex] = data.project;
        setProjects(updatedProjects);
      } else {
        throw new Error(data.error || 'Failed to update project');
      }
    } catch (error) {
      console.error('Failed to update project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectIndex: number) => {
    setLoading(true);
    try {
      const project = projects[projectIndex];
      const response = await fetch(`${API_BASE_URL}/api/projects/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: profile?.username })
      });
      const data = await response.json();
      if (response.ok) {
        const updatedProjects = projects.filter((_, index) => index !== projectIndex);
        setProjects(updatedProjects);
      } else {
        throw new Error(data.error || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (project: Project) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ projectData: { ...project, username: profile?.username } })
      });
      const data = await response.json();
      if (response.ok) {
        setProjects([...projects, data.project]);
      } else {
        throw new Error(data.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
        <div className="min-h-screen text-center bg-blue-50">
          <div className="pt-24">Dashboard Loading...</div>
        </div>
    );
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <ThemeProvider theme={dashboardTheme}>
      <CssBaseline />
      <DashboardLayout
        profile={profile}
        projects={projects}
        onSaveProfile={handleSaveProfile}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        onCreateProject={handleCreateProject}
        loading={loading}
      />
    </ThemeProvider>
  );
}; 