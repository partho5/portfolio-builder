// server/src/server.ts

import app from './app';
import dotenv from 'dotenv';
import router from './routes/protected_routes';

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
