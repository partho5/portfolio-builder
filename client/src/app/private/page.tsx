// client/src/app/private/page.tsx
'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth } from '../../contexts/AuthContext';
import { apiClient } from '../../utils/api';

export default function PrivatePage() {
  const { user } = useUser();
  const { accessToken, isLoading: tokenLoading } = useAuth();
  const [state, setState] = useState<{
    isLoading: boolean;
    response: any;
    error: string | undefined;
  }>({
    isLoading: false,
    response: undefined,
    error: undefined,
  });

  const callBackendApi = async () => {
    if (!accessToken) {
      setState(prev => ({ ...prev, error: 'No access token available' }));
      return;
    }

    setState((previous) => ({ ...previous, isLoading: true, error: undefined }));

    try {
      // Call backend directly with JWT
      const result = await apiClient.get('/api/private-route', accessToken);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setState((previous) => ({
        ...previous,
        response: result.data,
        error: undefined,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        response: undefined,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    } finally {
      setState((previous) => ({ ...previous, isLoading: false }));
    }
  };

  const callUserProfile = async () => {
    if (!accessToken) {
      setState(prev => ({ ...prev, error: 'No access token available' }));
      return;
    }

    setState((previous) => ({ ...previous, isLoading: true, error: undefined }));

    try {
      const result = await apiClient.get('/api/user-profile', accessToken);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setState((previous) => ({
        ...previous,
        response: result.data,
        error: undefined,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        response: undefined,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    } finally {
      setState((previous) => ({ ...previous, isLoading: false }));
    }
  };

  const createItem = async () => {
    if (!accessToken) {
      setState(prev => ({ ...prev, error: 'No access token available' }));
      return;
    }

    setState((previous) => ({ ...previous, isLoading: true, error: undefined }));

    try {
      const itemData = {
        name: 'Test Item',
        description: 'Created from frontend',
        type: 'test'
      };

      const result = await apiClient.post('/api/create-item', { itemData }, accessToken);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setState((previous) => ({
        ...previous,
        response: result.data,
        error: undefined,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        response: undefined,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
    } finally {
      setState((previous) => ({ ...previous, isLoading: false }));
    }
  };

  const { isLoading, response, error } = state;

  if (!user) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Please log in to access this page
        </h1>
      </div>
    );
  }

  if (tokenLoading) {
    return (
      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Private Page
      </h1>
      
      <p className="mt-4 text-lg text-gray-300">
        Welcome, {user.name || user.email}!
      </p>

      <div className="mt-10 space-x-4">
        <button
          onClick={callBackendApi}
          disabled={isLoading}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Calling...' : 'Call Backend Function'}
        </button>

        <button
          onClick={callUserProfile}
          disabled={isLoading}
          className="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Get User Profile'}
        </button>

        <button
          onClick={createItem}
          disabled={isLoading}
          className="inline-block rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Item'}
        </button>
      </div>

      <div className="mt-20 space-y-4">
        {response && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Response:</h3>
            <pre className="text-sm text-gray-300 overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-300">Error:</h3>
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
