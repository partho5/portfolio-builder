import { Request, Response } from 'express';
import { projects } from '../utils/Data';

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export const getProject = (req: Request, res: Response) => {
  let { username, category, projectSlug } = req.params;
  if(username === 'partho8181'){
    username = 'partho5';
  }

  const userProjects = projects[username] || [];
  //console.log(`userProjects=${userProjects}`);

  // Find project by slugified name and category
  const project = userProjects.find(
      p => slugify(p.name) === projectSlug && p.category === category
  );

  if (!project) {
    console.log(`Project not found: ${projectSlug} in category ${category}`);
    return res.status(404).json({ error: 'Project not found' });
  }

  return res.status(200).json(project);
};

export const getAllProjects = (req: Request, res: Response) => {
  try {
    let { username } = req.params;
    if(username === 'partho8181'){
      username = 'partho5';
    }

    // Validate username parameter
    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        error: 'Invalid username',
        message: 'Username parameter is required and must be a string'
      });
    }

    // Sanitize username (basic validation)
    const sanitizedUsername = username.trim().toLowerCase();
    if (sanitizedUsername.length === 0 || sanitizedUsername.length > 50) {
      return res.status(400).json({
        error: 'Invalid username',
        message: 'Username must be between 1 and 50 characters'
      });
    }

    // Get projects for the user
    const userProjects = projects[sanitizedUsername] || [];
    // console.log('server: userProjects', userProjects);

    return res.status(200).json(userProjects);

  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch projects'
    });
  }
};

// Modular project creation function - can be easily disabled
export const createProject = async (req: Request, res: Response) => {
  try {
    console.log('=== PROJECT CREATE REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { projectData } = req.body;
    const username = projectData?.username || req.body.username;
    
    if (!username) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    // TODO: Add authentication check here
    // const user = req.user;
    // if (user?.sub !== username) {
    //   res.status(403).json({ error: 'Unauthorized to create projects for this user' });
    //   return;
    // }

    const sanitizedUsername = username.trim().toLowerCase();
    if (!projects[sanitizedUsername]) {
      projects[sanitizedUsername] = [];
    }

    // Generate unique ID for the project
    const newProject = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    projects[sanitizedUsername].push(newProject);
    
    res.status(201).json({ 
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error: any) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
};

// Modular project update function - can be easily disabled
export const updateProject = async (req: Request, res: Response) => {
  try {
    console.log('=== PROJECT UPDATE REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { projectId } = req.params;
    const { projectData } = req.body;
    const username = projectData?.username || req.body.username;
    
    if (!username || !projectId) {
      res.status(400).json({ error: 'Username and project ID are required' });
      return;
    }

    // TODO: Add authentication check here
    // const user = req.user;
    // if (user?.sub !== username) {
    //   res.status(403).json({ error: 'Unauthorized to update this project' });
    //   return;
    // }

    const sanitizedUsername = username.trim().toLowerCase();
    const userProjects = projects[sanitizedUsername] || [];
    
    const projectIndex = userProjects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    // Update the project
    userProjects[projectIndex] = { 
      ...userProjects[projectIndex], 
      ...projectData,
      updatedAt: new Date().toISOString()
    };
    
    res.status(200).json({ 
      message: 'Project updated successfully',
      project: userProjects[projectIndex]
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project', details: error.message });
  }
};

// Modular project deletion function - can be easily disabled
export const deleteProject = async (req: Request, res: Response) => {
  try {
    console.log('=== PROJECT DELETE REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { projectId } = req.params;
    const { username } = req.body;
    
    if (!username || !projectId) {
      res.status(400).json({ error: 'Username and project ID are required' });
      return;
    }

    // TODO: Add authentication check here
    // const user = req.user;
    // if (user?.sub !== username) {
    //   res.status(403).json({ error: 'Unauthorized to delete this project' });
    //   return;
    // }

    const sanitizedUsername = username.trim().toLowerCase();
    const userProjects = projects[sanitizedUsername] || [];
    
    const projectIndex = userProjects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    // Remove the project
    const deletedProject = userProjects.splice(projectIndex, 1)[0];
    
    res.status(200).json({ 
      message: 'Project deleted successfully',
      project: deletedProject
    });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
};

// Get a specific project by id and username
export const getProjectById = async (req: Request, res: Response) => {
  try {
    console.log('=== GET PROJECT REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { projectId } = req.params;
    const { username } = req.query;

    if (!username) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    const sanitizedUsername = (username as string).trim().toLowerCase();
    const userProjects = projects[sanitizedUsername] || [];
    const project = userProjects.find(p => p.id === projectId);

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.status(200).json(project);
  } catch (error: any) {
    console.error('Error getting project:', error);
    res.status(500).json({ error: 'Failed to get project', details: error.message });
  }
};

// Get all projects for a user
export const getAllProjectsForUser = async (req: Request, res: Response) => {
  try {
    console.log('=== GET ALL PROJECTS REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { username } = req.query;

    if (!username) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    const sanitizedUsername = (username as string).trim().toLowerCase();
    const userProjects = projects[sanitizedUsername] || [];

    res.status(200).json(userProjects);
  } catch (error: any) {
    console.error('Error getting all projects:', error);
    res.status(500).json({ error: 'Failed to get all projects', details: error.message });
  }
};