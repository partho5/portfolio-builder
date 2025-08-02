import { Router } from 'express';
import { getProfile } from '../controllers/profile';
import {getAllProjects, getProject} from '../controllers/project';

const publicRoutes = Router();

// Public profile route
publicRoutes.get('/profile/:username', getProfile);

// Public project route
publicRoutes.get('/:username/projects/:category/:projectSlug', getProject);

// all projects of a user
publicRoutes.get('/projects/:username', getAllProjects);

export default publicRoutes; 