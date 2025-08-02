// client/src/app/types/user.ts
export interface UserProfile {
  username: string;
  name: string;
  displayName: string;
  title: string;
  role: string;
  profileImage?: string;
  bio?: string;
  email?: string;
  skillSet: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
  services: Array<{
    id: string;
    icon?: string;
    title: string;
    orderIndex: number;
  }>;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    linkedinIn?: string;
    medium?: string;
  };
  contactButtonLabel?: string;
  hireButtonLabel?: string;
  customSections?: CustomSection[];
}

export interface CustomSection {
  id: string;
  title: string;
  type: 'text' | 'list' | 'gallery' | 'achievements' | 'testimonials';
  content?: any;
  order: number;
  visible: boolean;
}