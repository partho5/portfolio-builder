'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  showConfirmation?: boolean;
}

export default function LogoutButton({ 
  className = "inline-block rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50",
  children = "Logout",
  showConfirmation = false 
}: LogoutButtonProps) {
  const { user, isLoading } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    if (showConfirmation) {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (!confirmed) return;
    }
    
    setIsLoggingOut(true);
    window.location.href = '/api/auth/logout';
  };

  if (isLoading || !user) {
    return null; // Don't show logout button if not logged in
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={className}
    >
      {isLoggingOut ? 'Logging out...' : children}
    </button>
  );
} 