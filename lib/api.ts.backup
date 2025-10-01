// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

// Tipos
interface JWTPayload {
  sub: string;
  exp: number;
  role: string;
}

interface APIError {
  detail: string;
  status?: number;
}

// Configuração base
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || '/api';
const TIMEOUT = 30000; // 30 segundos

// Criar instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}${API_PREFIX}`,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Função para obter token do localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Função para salvar token
const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Função para remover token
const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Função para verificar se token está expirado
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const now = Date.now() / 1000;
    // Considera expirado se faltar menos de 5 minutos
    return decoded.exp < (now + 300);
  } catch {
    return true;
  }
};

// Interceptor de Request - Adiciona JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token && isTokenExpired(token)) {
      // Token expirado - remove e redireciona para login
      removeToken();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response - Tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<APIError>) => {
    // Erro de rede
    if (!error.response) {
      console.error('Erro de rede:', error.message);
      return Promise.reject({
        detail: 'Erro de conexão. Verifique sua internet.',
        status: 0,
      });
    }

    const status = error.response.status;
    const detail = error.response.data?.detail || 'Erro desconhecido';

    // 401 Unauthorized - Token inválido ou expirado
    if (status === 401) {
      removeToken();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject({
        detail: 'Sessão expirada. Faça login novamente.',
        status: 401,
      });
    }

    // 403 Forbidden - Sem permissão
    if (status === 403) {
      return Promise.reject({
        detail: 'Você não tem permissão para acessar este recurso.',
        status: 403,
      });
    }

    // 404 Not Found
    if (status === 404) {
      return Promise.reject({
        detail: 'Recurso não encontrado.',
        status: 404,
      });
    }

    // 409 Conflict - Duplicidade
    if (status === 409) {
      return Promise.reject({
        detail: detail || 'Registro duplicado.',
        status: 409,
      });
    }

    // 422 Validation Error
    if (status === 422) {
      return Promise.reject({
        detail: detail || 'Erro de validação. Verifique os dados enviados.',
        status: 422,
      });
    }

    // 500 Internal Server Error
    if (status >= 500) {
      return Promise.reject({
        detail: 'Erro no servidor. Tente novamente mais tarde.',
        status: status,
      });
    }

    // Outros erros
    return Promise.reject({
      detail: detail,
      status: status,
    });
  }
);

// Funções auxiliares de autenticação
export const authAPI = {
  login: async (email: string, password: string) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = response.data;
    setToken(access_token);
    return response.data;
  },

  logout: () => {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getToken,
  setToken,
  removeToken,
  isTokenExpired,
};

// Export default
export default api;

// Export tipos auxiliares
export type { APIError, JWTPayload };