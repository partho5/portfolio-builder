interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    accessToken?: string
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.message || data.error || 'Request failed',
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 500,
      };
    }
  }

  async get<T = any>(endpoint: string, accessToken?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, accessToken);
  }

  async post<T = any>(
    endpoint: string,
    body: any,
    accessToken?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      accessToken
    );
  }

  async put<T = any>(
    endpoint: string,
    body: any,
    accessToken?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      accessToken
    );
  }

  async delete<T = any>(endpoint: string, accessToken?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, accessToken);
  }
}

// Create a default instance
export const apiClient = new ApiClient(); 