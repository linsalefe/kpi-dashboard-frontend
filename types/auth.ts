// types/auth.ts

/**
 * Tipos TypeScript para Autenticação e Autorização
 */

// ============================================
// ROLES E PERMISSÕES
// ============================================

/**
 * Roles disponíveis no sistema (RBAC)
 */
export type UserRole = 'Funcionário' | 'Gestor' | 'Diretor';

/**
 * Permissões disponíveis
 */
export type Permission = 
  | 'visualizar'
  | 'criar'
  | 'editar'
  | 'excluir'
  | 'gerenciar_metas'
  | 'exportar'
  | 'importar';

// ============================================
// USUÁRIO
// ============================================

/**
 * Dados do usuário autenticado
 */
export interface User {
  id: number;
  email: string;
  nome_completo: string;
  role: UserRole;
  setor?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Dados do usuário com permissões calculadas
 */
export interface AuthUser extends User {
  permissions: Permission[];
}

// ============================================
// LOGIN E AUTENTICAÇÃO
// ============================================

/**
 * Credenciais de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Resposta do endpoint de login
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
  user?: User;
}

/**
 * Payload do JWT Token
 */
export interface JWTPayload {
  sub: string; // user email
  exp: number; // expiration timestamp
  role: UserRole;
  user_id: number;
}

// ============================================
// ESTADO DE AUTENTICAÇÃO
// ============================================

/**
 * Estado da autenticação no frontend
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Ações de autenticação
 */
export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// ============================================
// VALIDAÇÃO E FORMULÁRIOS
// ============================================

/**
 * Erros do formulário de login
 */
export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Estado do formulário de login
 */
export interface LoginFormState {
  email: string;
  password: string;
  isSubmitting: boolean;
  errors: LoginFormErrors;
}

// ============================================
// HELPERS
// ============================================

/**
 * Verifica se usuário tem uma permissão específica
 */
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false;

  const rolePermissions: Record<UserRole, Permission[]> = {
    'Funcionário': ['visualizar', 'criar'],
    'Gestor': ['visualizar', 'criar', 'editar', 'exportar', 'importar'],
    'Diretor': ['visualizar', 'criar', 'editar', 'excluir', 'gerenciar_metas', 'exportar', 'importar'],
  };

  return rolePermissions[user.role]?.includes(permission) ?? false;
}

/**
 * Verifica se usuário tem alguma das permissões
 */
export function hasAnyPermission(user: User | null, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(user, permission));
}

/**
 * Verifica se usuário tem todas as permissões
 */
export function hasAllPermissions(user: User | null, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(user, permission));
}

/**
 * Verifica se usuário tem uma role específica
 */
export function hasRole(user: User | null, role: UserRole): boolean {
  return user?.role === role;
}

/**
 * Verifica se usuário é pelo menos Gestor
 */
export function isGestorOrAbove(user: User | null): boolean {
  if (!user) return false;
  return user.role === 'Gestor' || user.role === 'Diretor';
}

/**
 * Verifica se usuário é Diretor
 */
export function isDiretor(user: User | null): boolean {
  return user?.role === 'Diretor';
}

/**
 * Type guard para User
 */
export function isUser(data: any): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.email === 'string' &&
    typeof data.nome_completo === 'string' &&
    typeof data.role === 'string' &&
    typeof data.is_active === 'boolean'
  );
}

/**
 * Type guard para LoginResponse
 */
export function isLoginResponse(data: any): data is LoginResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.access_token === 'string' &&
    typeof data.token_type === 'string'
  );
}