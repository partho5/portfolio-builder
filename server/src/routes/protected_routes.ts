// server/src/routes/protected_routes.ts

// This file will now only contain API (JWT-protected) routes
import { Router, Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { getProfile, updateAuth0UsernameController, updateProfile, createProfile, getProfileByUsername } from '../controllers/profile';
import {getAllProjects, getProject, createProject, updateProject, deleteProject, getProjectById, getAllProjectsForUser} from '../controllers/project';
import { projects } from '../utils/Data';
import { profiles } from '../controllers/profile';

// Extend the Request type to include user from JWT
interface AuthenticatedRequest extends Request {
  user?: any;
}

const protectedRoutes = Router();

protectedRoutes.get(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    (res as any).status(200).send('Server Running...');
  })
);

protectedRoutes.get(
  '/private-route',
  asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const result = await callBackendFunction(req.user);
    (res as any).status(200).json({ 
      message: 'this is response from server',
      user: {
        id: req.user?.sub,
        email: req.user?.email,
        name: req.user?.name,
        picture: req.user?.picture,
        nickname: req.user?.nickname,
        email_verified: req.user?.email_verified,
        updated_at: req.user?.updated_at,
        fullUser: req.user
      },
      result,
      serverInfo: {
        timestamp: new Date().toISOString(),
        serverStatus: 'running',
        userAuthenticated: !!req.user
      }
    });
  })
);

protectedRoutes.post(
  '/user-data',
  asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { data } = (req as any).body;
    const result = await processUserData(req.user, data);
    (res as any).status(200).json({ 
      message: 'User data processed',
      result 
    });
  })
);

protectedRoutes.get(
  '/user-profile',
  asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const profile = await getUserProfile(req.user);
    (res as any).status(200).json({ 
      message: 'User profile retrieved',
      profile 
    });
  })
);

protectedRoutes.post(
  '/create-item',
  asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { itemData } = (req as any).body;
    const newItem = await createNewItem(req.user, itemData);
    (res as any).status(201).json({ 
      message: 'Item created successfully',
      item: newItem 
    });
  })
);

protectedRoutes.post(
  '/update-username',
  asyncHandler(updateAuth0UsernameController)
);

// Modular project endpoints
protectedRoutes.post('/projects/create', asyncHandler(createProject));
protectedRoutes.put('/projects/:projectId/update', asyncHandler(updateProject));
protectedRoutes.delete('/projects/:projectId', asyncHandler(deleteProject));
protectedRoutes.get('/projects/:projectId', asyncHandler(getProjectById));
protectedRoutes.get('/projects', asyncHandler(getAllProjectsForUser));

// Modular profile endpoints
protectedRoutes.post('/profile/update', asyncHandler(updateProfile));
protectedRoutes.post('/profile/create', asyncHandler(createProfile));
protectedRoutes.get('/profile/:username', asyncHandler(getProfileByUsername));

// Additional CRUD endpoints
protectedRoutes.get(
  '/projects/:projectId',
  asyncHandler(async (req: Request, res: Response) => {
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
  })
);

protectedRoutes.get(
  '/projects',
  asyncHandler(async (req: Request, res: Response) => {
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
  })
);

protectedRoutes.get(
  '/profile/:username',
  asyncHandler(async (req: Request, res: Response) => {
    console.log('=== GET PROFILE REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');
    
    const { username } = req.params;
    
    if (!username) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }
    
    const normalizedUsername = username.toLowerCase();
    const profile = profiles[normalizedUsername];
    
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    
    res.status(200).json(profile);
  })
);


// Backend functions (these would typically be in separate service files)
async function callBackendFunction(user: any) {
  return {
    timestamp: new Date().toISOString(),
    userId: user?.sub,
    processed: true,
    data: 'Backend function executed successfully'
  };
}

async function processUserData(user: any, data: any) {
  return {
    userId: user?.sub,
    processedData: data,
    processedAt: new Date().toISOString(),
    status: 'completed'
  };
}

async function getUserProfile(user: any) {
  return {
    id: user?.sub,
    email: user?.email,
    name: user?.name,
    picture: user?.picture,
    lastLogin: new Date().toISOString()
  };
}

async function createNewItem(user: any, itemData: any) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    userId: user?.sub,
    ...itemData,
    createdAt: new Date().toISOString(),
    status: 'active'
  };
}

export default protectedRoutes;
