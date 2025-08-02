// contexts/ProjectContext.tsx

"use client"

import React, { createContext, useContext } from 'react';
import {Project} from "@/app/types/project";


const ProjectContext = createContext<Project[] | null>(null);

export const ProjectProvider = ({ projects, children }: { projects: Project[]; children: React.ReactNode }) => (
  <ProjectContext.Provider value={projects}>{children}</ProjectContext.Provider>
);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProject must be used within a ProjectProvider');
  return context[0]; // Return first project for backward compatibility
};