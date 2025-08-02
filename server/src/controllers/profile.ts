// server/src/controllers/profile.ts

import { Request, Response } from 'express';
import { updateAuth0Username } from '../services/auth0Service';

// Define the profile type
interface Profile2 {
  username: string;
  displayName: string;
  role: string;
  bio: string;
  skillSet: string[];
  services: Array<{
    icon: string;
    title: string;
  }>;
  contactButtonLabel: string;
  hireButtonLabel: string;
}

// Define the profile type
interface Profile {
  username: string;
  displayName: string;
  role: string;
  bio: string;
  skillSet: Array<{
    id: string;
    name: string;
    orderIndex: number;
  }>;
  services: Array<{
    id: string;
    icon: string;
    title: string;
    orderIndex: number;
  }>;
  contactButtonLabel: string;
  hireButtonLabel: string;
}

// Sample profiles database (in a real app, this would be from a database)

export const profiles: Record<string, Profile> = {
  partho5: {
    username: 'partho5',
    displayName: 'Partho Protim',
    role: 'Full-stack Developer | AI Agent | Automation Expert',
    bio: "I build sales-driven, user-focused software/website that don't just look good ↝ they convert.",
    skillSet: [
      { id: 'skill-1', name: 'JavaScript', orderIndex: 0 },
      { id: 'skill-2', name: 'TypeScript', orderIndex: 1 },
      { id: 'skill-3', name: 'React', orderIndex: 2 },
      { id: 'skill-4', name: 'Next.js', orderIndex: 3 },
      { id: 'skill-5', name: 'Tailwind CSS', orderIndex: 4 },
      { id: 'skill-6', name: 'Redux', orderIndex: 5 },
      { id: 'skill-7', name: 'React Query', orderIndex: 6 },
      { id: 'skill-8', name: 'Node.js', orderIndex: 7 },
      { id: 'skill-9', name: 'Express.js', orderIndex: 8 },
      { id: 'skill-10', name: 'Python', orderIndex: 9 },
      { id: 'skill-11', name: 'Php', orderIndex: 10 },
      { id: 'skill-12', name: 'Laravel', orderIndex: 11 },
      { id: 'skill-13', name: 'REST API', orderIndex: 12 },
      { id: 'skill-14', name: 'GraphQL', orderIndex: 13 },
      { id: 'skill-15', name: 'PostgreSQL', orderIndex: 14 },
      { id: 'skill-16', name: 'MySQL', orderIndex: 15 },
      { id: 'skill-17', name: 'MongoDB', orderIndex: 16 },
      { id: 'skill-18', name: 'DynamoDB', orderIndex: 17 },
      { id: 'skill-19', name: 'Redis', orderIndex: 18 },
      { id: 'skill-20', name: 'AWS', orderIndex: 19 },
      { id: 'skill-21', name: 'Docker', orderIndex: 20 },
      { id: 'skill-22', name: 'CI/CD Pipeline', orderIndex: 21 },
      { id: 'skill-23', name: 'Git', orderIndex: 22 },
      { id: 'skill-24', name: 'AI', orderIndex: 23 },
      { id: 'skill-25', name: 'OpenAI GPT', orderIndex: 24 },
      { id: 'skill-26', name: 'NLP', orderIndex: 25 },
    ],
    services: [
      { id: 'service-1', icon: 'Globe', title: 'Web Development', orderIndex: 0 },
      { id: 'service-2', icon: 'Smartphone', title: 'Mobile Apps', orderIndex: 1 },
      { id: 'service-3', icon: 'Database', title: 'Database Design', orderIndex: 2 },
      { id: 'service-4', icon: 'Settings', title: 'API Integration', orderIndex: 3 },
      { id: 'service-5', icon: 'Zap', title: 'Automation', orderIndex: 4 },
      { id: 'service-6', icon: 'Code', title: 'Custom Solutions', orderIndex: 5 },
    ],
    contactButtonLabel: 'Contact Me',
    hireButtonLabel: 'Hire Me',
  },
  john: {
    username: 'john',
    displayName: 'John Doe',
    role: 'Frontend Developer | UI/UX Designer',
    bio: "I create beautiful, intuitive user interfaces that provide exceptional user experiences.",
    skillSet: [
      { id: 'skill-j1', name: 'React', orderIndex: 0 },
      { id: 'skill-j2', name: 'Vue.js', orderIndex: 1 },
      { id: 'skill-j3', name: 'Angular', orderIndex: 2 },
      { id: 'skill-j4', name: 'JavaScript', orderIndex: 3 },
      { id: 'skill-j5', name: 'TypeScript', orderIndex: 4 },
      { id: 'skill-j6', name: 'HTML5', orderIndex: 5 },
      { id: 'skill-j7', name: 'CSS3', orderIndex: 6 },
      { id: 'skill-j8', name: 'Sass', orderIndex: 7 },
      { id: 'skill-j9', name: 'Tailwind CSS', orderIndex: 8 },
      { id: 'skill-j10', name: 'Bootstrap', orderIndex: 9 },
      { id: 'skill-j11', name: 'Figma', orderIndex: 10 },
      { id: 'skill-j12', name: 'Adobe XD', orderIndex: 11 },
      { id: 'skill-j13', name: 'Sketch', orderIndex: 12 },
      { id: 'skill-j14', name: 'Photoshop', orderIndex: 13 },
    ],
    services: [
      { id: 'service-j1', icon: 'Palette', title: 'UI/UX Design', orderIndex: 0 },
      { id: 'service-j2', icon: 'Globe', title: 'Frontend Development', orderIndex: 1 },
      { id: 'service-j3', icon: 'Smartphone', title: 'Responsive Design', orderIndex: 2 },
      { id: 'service-j4', icon: 'Eye', title: 'User Research', orderIndex: 3 },
    ],
    contactButtonLabel: 'Get in Touch',
    hireButtonLabel: 'Hire Me',
  },
};




export const getProfile = (req: Request, res: Response) => {
  try {
    let { username } = req.params;

    if(username === 'partho8181'){
      username = 'partho5';
    }
    //console.log(`getProfile() for username=${username}`);

    // Check if username is provided
    if (!username) {
      return res.status(400).json({
        error: 'Username is required',
        message: 'Please provide a valid username in the URL parameters'
      });
    }

    // Convert username to lowercase for case-insensitive matching
    const normalizedUsername = username.toLowerCase();
    //console.log(`getProfile() for normalizedUsername=${normalizedUsername}`);

    // console.log(`Username: ${username}`);
    // Check if profile exists
    const profile = profiles[normalizedUsername];
    //console.log(JSON.stringify(profile));

    if (!profile) {
      return res.status(404).json({
        error: 'Profile not found',
        message: `No profile found for username: ${username}`
      });
    }

    // Return the profile
    return res.status(200).json(profile);

  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while fetching the profile'
    });
  }
};

export const updateAuth0UsernameController = async (req: Request, res: Response) => {
  try {
    const { userId, newUsername } = req.body;
    if (!userId || !newUsername) {
      res.status(400).json({ error: 'userId and newUsername are required' });
      return;
    }
    const result = await updateAuth0Username(userId, newUsername);
    res.status(200).json({ message: 'Username updated successfully', result });
  } catch (error: any) {
    console.error('Error updating Auth0 username:', error);
    res.status(500).json({ error: 'Failed to update username', details: error.message });
  }
};

// Modular profile update function - can be easily disabled
export const updateProfile = async (req: Request, res: Response) => {
  try {
    console.log('=== PROFILE UPDATE REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { profileData } = req.body;
    const username = req.body.username || profileData?.username;
    
    if (!username) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    // TODO: Add authentication check here
    // const user = req.user;
    // if (user?.sub !== username) {
    //   res.status(403).json({ error: 'Unauthorized to update this profile' });
    //   return;
    // }

    // Update the profile in memory (replace with database call later)
    const normalizedUsername = username.toLowerCase();
    if (profiles[normalizedUsername]) {
      profiles[normalizedUsername] = { ...profiles[normalizedUsername], ...profileData };
      res.status(200).json({ 
        message: 'Profile updated successfully',
        profile: profiles[normalizedUsername]
      });
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error: any) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
};

// Modular profile creation function - can be easily disabled
export const createProfile = async (req: Request, res: Response) => {
  try {
    console.log('=== PROFILE CREATE REQUEST ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Params:', JSON.stringify(req.params, null, 2));
    console.log('Request Query:', JSON.stringify(req.query, null, 2));
    console.log('================================');

    const { profileData } = req.body;
    const username = profileData?.username;
    
    if (!username) {
      res.status(400).json({ error: 'Username is required' });
      return;
    }

    // TODO: Add authentication check here
    // const user = req.user;
    // if (user?.sub !== username) {
    //   res.status(403).json({ error: 'Unauthorized to create this profile' });
    //   return;
    // }

    const normalizedUsername = username.toLowerCase();
    if (profiles[normalizedUsername]) {
      res.status(409).json({ error: 'Profile already exists' });
      return;
    }

    // Create new profile in memory (replace with database call later)
    profiles[normalizedUsername] = profileData;
    res.status(201).json({ 
      message: 'Profile created successfully',
      profile: profiles[normalizedUsername]
    });
  } catch (error: any) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Failed to create profile', details: error.message });
  }
};

// Get a specific profile by username
export const getProfileByUsername = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to get profile', details: error.message });
  }
};