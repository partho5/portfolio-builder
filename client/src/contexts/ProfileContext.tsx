"use client"

import React, { createContext, useContext } from 'react';
import { UserProfile } from '@/app/types/user';

const ProfileContext = createContext<UserProfile | null>(null);

export const ProfileProvider = ({ profile, children }: { profile: UserProfile; children: React.ReactNode }) => (
  <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>
);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
}; 