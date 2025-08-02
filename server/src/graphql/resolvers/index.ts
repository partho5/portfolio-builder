interface Context {
  user?: {
    sub: string;
    email: string;
  };
}

export const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    
    profile: async (_: any, { username }: { username: string }) => {
      // Mock data for testing
      return {
        id: '1',
        user_id: 'user123',
        username: username,
        basic_info: {
          name: 'Test User',
          displayName: 'Test',
          title: 'Developer',
          role: 'Full Stack',
          bio: 'Test bio',
          profileImage: '',
          email: 'test@example.com'
        },
        social_links: {
          github: 'https://github.com/test',
          linkedin: 'https://linkedin.com/in/test'
        },
        skill_set: [
          { id: '1', name: 'JavaScript', orderIndex: 0 },
          { id: '2', name: 'React', orderIndex: 1 }
        ],
        services: [
          { id: '1', icon: '💻', title: 'Web Development', orderIndex: 0 }
        ],
        custom_sections: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    profiles: async () => {
      return [];
    },

    project: async (_: any, { id }: { id: string }) => {
      return {
        id: id,
        user_id: 'user123',
        project_data: {
          title: 'Test Project',
          description: 'A test project',
          image: '',
          category: 'web',
          slug: 'test-project',
          featured: false
        },
        content: {
          technologies: ['React', 'Node.js'],
          links: {
            live: 'https://example.com',
            github: 'https://github.com/test'
          },
          gallery: []
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    projects: async (_: any, { username }: { username: string }) => {
      return [];
    },

    projectsByCategory: async (_: any, { username, category }: { username: string; category: string }) => {
      return [];
    }
  },

  Mutation: {
    createProfile: async (_: any, { input }: { input: any }, context: Context) => {
      if (!context.user) throw new Error('Authentication required');
      
      return {
        id: 'new-id',
        user_id: context.user.sub,
        username: input.username,
        basic_info: input.basic_info,
        social_links: input.social_links || {},
        skill_set: input.skill_set || [],
        services: input.services || [],
        custom_sections: input.custom_sections || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    updateProfile: async (_: any, { username, input }: { username: string; input: any }, context: Context) => {
      if (!context.user) throw new Error('Authentication required');
      
      return {
        id: 'updated-id',
        user_id: context.user.sub,
        username: username,
        basic_info: input.basic_info,
        social_links: input.social_links || {},
        skill_set: input.skill_set || [],
        services: input.services || [],
        custom_sections: input.custom_sections || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    deleteProfile: async (_: any, { username }: { username: string }, context: Context) => {
      if (!context.user) throw new Error('Authentication required');
      return true;
    },

    createProject: async (_: any, { input }: { input: any }, context: Context) => {
      if (!context.user) throw new Error('Authentication required');
      
      return {
        id: 'new-project-id',
        user_id: context.user.sub,
        project_data: input.project_data,
        content: input.content || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    updateProject: async (_: any, { id, input }: { id: string; input: any }, context: Context) => {
      if (!context.user) throw new Error('Authentication required');
      
      return {
        id: id,
        user_id: context.user.sub,
        project_data: input.project_data,
        content: input.content || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    deleteProject: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.user) throw new Error('Authentication required');
      return true;
    }
  },

  JSON: {
    __serialize(value: any) {
      return value;
    }
  }
}; 