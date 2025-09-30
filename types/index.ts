// types/index.ts

/**
 * Exportação centralizada de todos os tipos do projeto
 * Uso: import { User, MarketingData, KPICard } from '@/types';
 */

// ============================================
// AUTENTICAÇÃO
// ============================================

export type {
  UserRole,
  Permission,
  User,
  AuthUser,
  LoginCredentials,
  LoginResponse,
  JWTPayload,
  AuthState,
  AuthActions,
  LoginFormErrors,
  LoginFormState,
} from './auth';

export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  isGestorOrAbove,
  isDiretor,
  isUser,
  isLoginResponse,
} from './auth';

// ============================================
// MARKETING
// ============================================

export type {
  MarketingData,
  CreateMarketingData,
  UpdateMarketingData,
  MarketingKPIs,
  MarketingStats,
  MarketingFilters,
  PaginatedResponse,
  MarketingDataResponse,
  MarketingFormData,
  MarketingFormErrors,
  KPICard,
  ChartDataPoint,
  ChartSeries,
  MarketingByChannel,
  MarketingByCampaign,
  ExportOptions,
  MarketingRowPreview,
  UploadResult,
} from './marketing';

export {
  isMarketingData,
  isMarketingStats,
} from './marketing';

// ============================================
// TIPOS GENÉRICOS E COMUNS
// ============================================

/**
 * Status de requisição assíncrona
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Resposta de erro da API
 */
export interface APIError {
  detail: string;
  status?: number;
}

/**
 * Resposta genérica de sucesso
 */
export interface APISuccess<T = any> {
  message: string;
  data?: T;
}

/**
 * Opções de ordenação
 */
export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Filtro de período
 */
export interface PeriodFilter {
  data_inicio: string; // YYYY-MM-DD
  data_fim: string; // YYYY-MM-DD
}

/**
 * Granularidade temporal
 */
export type Granularidade = 'diario' | 'semanal' | 'mensal' | 'trimestral' | 'anual';

/**
 * Status de KPI
 */
export type StatusKPI = 'excelente' | 'bom' | 'atencao' | 'critico';

/**
 * Setor do sistema
 */
export type Setor = 'marketing' | 'comercial' | 'eventos' | 'rh' | 'pedagogico' | 'financeiro';

/**
 * Opções de densidade de visualização
 */
export type Densidade = 'compacta' | 'normal' | 'confortavel';

/**
 * Tema do sistema
 */
export type Tema = 'light' | 'dark' | 'system';