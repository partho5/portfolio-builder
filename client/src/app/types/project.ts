export interface ProjectConfig {
  componentType: 'rectangle' | 'circle';
  content: string;
  styleName: string;
  size: number;
  positioning: 'center' | 'left' | 'right';
  animation: string;
  delay: number;
  id?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  media: string[];
  category: string;
  config: ProjectConfig[];
}

export interface ProjectsData {
  [username: string]: Project[];
}