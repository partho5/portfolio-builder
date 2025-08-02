// server/src/server.ts

import app from './app';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file from the server directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`🔗 REST API: http://localhost:${PORT}/api`);
}); 