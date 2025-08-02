import axios from 'axios';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_MGMT_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_MGMT_CLIENT_SECRET;
const AUTH0_AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

// Get a Management API token
export async function getManagementToken() {
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
  });
  return response.data.access_token;
}

// Update Auth0 user's nickname (username)
export async function updateAuth0Username(userId: string, newUsername: string) {
  const token = await getManagementToken();
  const response = await axios.patch(
    `https://${AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(userId)}`,
    { nickname: newUsername },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
} 