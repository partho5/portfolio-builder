// server/src/app.ts

import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'express-flash';
import morgan from 'morgan';
import path from 'path';
import {
  generalErrorHandler,
  notFoundHandler,
} from './middleware/errorMiddleware';

import protectedRoutes from './routes/protected_routes';
import publicRoutes from './routes/public_routes';
import { setupGraphQL } from './routes/graphql_routes';

const app = express();
const baseUrl = process.env.AUTH0_BASE_URL;

app.use(morgan('dev'));
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001', baseUrl].filter(Boolean),
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// Public routes (no auth required)
app.use('/public', publicRoutes);

// Protected REST API routes
app.use('/api', protectedRoutes);

// GraphQL setup - must be before error handlers
async function initializeApp() {
  await setupGraphQL(app);
  
  // Only add error handlers AFTER GraphQL is set up
  app.use(notFoundHandler);
  app.use(generalErrorHandler);
}

initializeApp().catch(console.error);

export default app;
