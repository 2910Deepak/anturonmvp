const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  phoneNumber?: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  industry: string;
  region: string;
  plan: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  organization: Organization;
}

export class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  async fetch(path: string, options: RequestInit = {}) {
    // Always re-read from localStorage — the in-memory token can go stale
    // when AuthProvider clears it or when the module was loaded before login
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('token');
      if (stored) this.token = stored;
    }

    const url = `${API_URL}/api/trpc${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Please make sure the API is running on http://localhost:3001');
      }
      throw err;
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    const result = await this.fetch('/auth.login', {
      method: 'POST',
      body: JSON.stringify({ json: { email, password } }),
    });

    const response = result.result.data.json;
    this.setToken(response.token);
    return response;
  }

  async register(data: {
    organizationName: string;
    industry: string;
    region: string;
    adminName: string;
    adminEmail: string;
    adminPassword: string;
    phone?: string;
  }): Promise<AuthResponse> {
    const result = await this.fetch('/auth.register', {
      method: 'POST',
      body: JSON.stringify({ json: data }),
    });

    const response = result.result.data.json;
    this.setToken(response.token);
    return response;
  }

  async getMe(): Promise<{ user: User; organization: Organization }> {
    const result = await this.fetch('/auth.me', {
      method: 'GET',
    });

    return result.result.data.json;
  }

  // Agents endpoints
  async getAgents(): Promise<any[]> {
    const result = await this.fetch('/agents.list', {
      method: 'GET',
    });

    return result.result.data.json;
  }

  async createAgent(data: any): Promise<any> {
    const result = await this.fetch('/agents.create', {
      method: 'POST',
      body: JSON.stringify({ json: data }),
    });

    return result.result.data.json;
  }

  // Calls endpoints
  async getCalls(): Promise<any[]> {
    const result = await this.fetch('/calls.list', {
      method: 'GET',
    });

    const data = result.result.data.json;
    return data?.calls || [];
  }

  // Analytics endpoints
  async getDashboardStats(): Promise<any> {
    const result = await this.fetch('/analytics.overview', {
      method: 'GET',
    });

    return result.result.data.json;
  }

  async initiateCall(data: { assistantId: string; phoneNumber: string; customerName?: string; phoneNumberId?: string }): Promise<any> {
    const result = await this.fetch('/calls.initiate', {
      method: 'POST',
      body: JSON.stringify({ json: data }),
    });
    return result.result.data.json;
  }

  async getTimeSeries(days = 30): Promise<any[]> {
    const result = await this.fetch(`/analytics.timeSeries?input=${encodeURIComponent(JSON.stringify({ json: { days } }))}`, {
      method: 'GET',
    });
    return result.result.data.json;
  }
}

export const api = new ApiClient();
