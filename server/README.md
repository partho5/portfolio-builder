# Portfolio Server with GraphQL & Supabase

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env` file with:
```env
PORT=5000
NODE_ENV=development

# GraphQL Configuration (NEW)
ENABLE_GRAPHQL=true

# Auth0 Configuration
AUTH0_AUDIENCE=your-auth0-audience
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_SECRET=your-auth0-secret

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 3. Database Setup
Run the SQL schema in `src/utils/database.sql` in your Supabase SQL editor.

### 4. Start Development Server
```bash
npm run dev
```

## API Endpoints

### GraphQL (Plugin-based)
- **Endpoint**: `http://localhost:5000/graphql`
- **Playground**: `http://localhost:5000/graphql` (development only)
- **Toggle**: Set `ENABLE_GRAPHQL=true` in `.env` to enable

### REST API (Legacy - Always Available)
- **Public**: `/public/*`
- **Protected**: `/api/*`

## GraphQL Plugin Features

✅ **Modular Design**: Can be enabled/disabled via environment variable
✅ **Backward Compatible**: All existing REST endpoints remain functional
✅ **Clean Integration**: No breaking changes to existing code
✅ **Easy Rollback**: Simply set `ENABLE_GRAPHQL=false` to disable

## GraphQL Queries Examples

### Test Query
```graphql
query {
  hello
}
```

### Get Profile
```graphql
query GetProfile($username: String!) {
  profile(username: $username) {
    id
    username
    basic_info {
      name
      displayName
      title
      role
      bio
    }
    skill_set {
      id
      name
      orderIndex
    }
    services {
      id
      icon
      title
      orderIndex
    }
  }
}
```

### Update Profile
```graphql
mutation UpdateProfile($username: String!, $input: ProfileInput!) {
  updateProfile(username: $username, input: $input) {
    id
    username
    basic_info {
      name
      displayName
    }
  }
}
```

## Authentication

GraphQL mutations require Supabase JWT token in Authorization header:
```
Authorization: Bearer <supabase-jwt-token>
```

## Database Schema

### Profiles Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `username`: VARCHAR(50) (Unique)
- `basic_info`: JSONB
- `social_links`: JSONB
- `skill_set`: JSONB Array
- `services`: JSONB Array
- `custom_sections`: JSONB Array

### Projects Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `project_data`: JSONB
- `content`: JSONB

## Features

- ✅ GraphQL API with Apollo Server (Plugin-based)
- ✅ Supabase PostgreSQL database
- ✅ Row Level Security (RLS)
- ✅ JWT authentication
- ✅ TypeScript support
- ✅ Error handling
- ✅ Development playground
- ✅ Backward compatibility
- ✅ Easy enable/disable toggle 