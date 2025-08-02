// server/src/routes/graphql_routes.ts

import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { typeDefs } from '../graphql/schema';
import { resolvers } from '../graphql/resolvers';
import { graphqlAuthMiddleware, AuthenticatedRequest } from '../middleware/graphqlAuth';

export async function setupGraphQL(app: Express) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // Apply auth middleware to get user context
      return await graphqlAuthMiddleware(req as AuthenticatedRequest);
    },
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        path: error.path,
        extensions: {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR'
        }
      };
    },
    introspection: process.env.NODE_ENV !== 'production'
  });

  await server.start();
  
  server.applyMiddleware({ 
    app, 
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      credentials: true
    }
  });

  console.log('🚀 GraphQL server ready at /graphql');
}
