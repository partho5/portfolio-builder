import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not set
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
          })
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
            })
          })
        }),
        delete: () => ({
          eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } })
        }),
        auth: {
          getUser: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } })
        }
      })
    };

// Database types
export interface Profile {
  id: string;
  user_id: string;
  username: string;
  basic_info: {
    name: string;
    displayName: string;
    title: string;
    role: string;
    bio?: string;
    profileImage?: string;
    email?: string;
  };
  social_links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    medium?: string;
  };
  skill_set: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
  services: Array<{
    id: string;
    icon: string;
    title: string;
    orderIndex: number;
  }>;
  custom_sections: Array<{
    id: string;
    title: string;
    type: 'text' | 'list' | 'gallery' | 'achievements' | 'testimonials';
    content?: any;
    order: number;
    visible: boolean;
  }>;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  project_data: {
    title: string;
    description: string;
    image?: string;
    category: string;
    slug: string;
    featured?: boolean;
  };
  content?: {
    technologies?: string[];
    links?: {
      live?: string;
      github?: string;
    };
    gallery?: string[];
  };
  created_at: string;
  updated_at: string;
} 