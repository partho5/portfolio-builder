import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import {API_BASE_URL} from "@/app/config/values";

export async function GET(request: NextRequest) {
  try {
    // Get the Auth0 session and access token
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token available' },
        { status: 401 }
      );
    }

    // Forward the request to your Express backend
    const backendResponse = await fetch(`${API_BASE_URL}/api/private-route`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: data.message || 'Backend request failed' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling backend:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 