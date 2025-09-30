// hooks/useAuth.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { authAPI } from '@/lib/api';
import type { User, LoginCredentials, hasPermission as hasPermissionType, Permission } from '@/types';
import { hasPermission, hasRole, isGestorOrAbove, isDiretor } from '@/types';

/**
 * Hook customizado para gerenciar autenticação
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Verifica se há token e busca dados do usuário
   */
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = authAPI.getToken();

      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Verifica se token está expirado
      if (authAPI.isTokenExpired(token)) {
        authAPI.removeToken();
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Busca dados do usuário
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err: any) {
      console.error('Erro ao verificar autenticação:', err);
      setUser(null);
      authAPI.removeToken();
      setError(err?.detail || 'Erro ao verificar autenticação');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Realiza login
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      await authAPI.login(credentials.email, credentials.password);
      
      // Busca dados do usuário após login
      const userData = await authAPI.getCurrentUser();
      setUser(userData);

      return { success: true };
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);
      const errorMessage = err?.detail || 'Erro ao fazer login. Verifique suas credenciais.';
      setError(errorMessage);
      setUser(null);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Realiza logout
   */
  const logout = useCallback(() => {
    authAPI.logout();
    setUser(null);
    setError(null);
  }, []);

  /**
   * Limpa erro
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Verifica autenticação ao montar o componente
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Computed values
  const isAuthenticated = !!user;
  const token = authAPI.getToken();

  // Funções de permissão
  const checkPermission = useCallback(
    (permission: Permission) => hasPermission(user, permission),
    [user]
  );

  const checkRole = useCallback(
    (role: 'Funcionário' | 'Gestor' | 'Diretor') => hasRole(user, role),
    [user]
  );

  const isGestor = useCallback(() => isGestorOrAbove(user), [user]);
  const isAdmin = useCallback(() => isDiretor(user), [user]);

  return {
    // Estado
    user,
    isAuthenticated,
    isLoading,
    error,
    token,

    // Ações
    login,
    logout,
    checkAuth,
    clearError,

    // Permissões
    hasPermission: checkPermission,
    hasRole: checkRole,
    isGestor,
    isAdmin,
  };
}