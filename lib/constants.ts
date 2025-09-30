// lib/constants.ts

/**
 * Constantes centralizadas do KPI Dashboard
 * Timezone: America/Fortaleza (GMT-3)
 */

// ============================================
// SETORES
// ============================================

export const SETORES = [
  { id: 'marketing', nome: 'Marketing', cor: '#3b82f6', icone: '📊' },
  { id: 'comercial', nome: 'Comercial', cor: '#10b981', icone: '💼' },
  { id: 'eventos', nome: 'Eventos', cor: '#f59e0b', icone: '🎉' },
  { id: 'rh', nome: 'RH', cor: '#8b5cf6', icone: '👥' },
  { id: 'pedagogico', nome: 'Pedagógico', cor: '#ec4899', icone: '📚' },
  { id: 'financeiro', nome: 'Financeiro', cor: '#06b6d4', icone: '💰' },
] as const;

export type SetorId = typeof SETORES[number]['id'];

// ============================================
// GRANULARIDADES
// ============================================

export const GRANULARIDADES = [
  { id: 'diario', nome: 'Diário', label: 'Dia' },
  { id: 'semanal', nome: 'Semanal', label: 'Semana' },
  { id: 'mensal', nome: 'Mensal', label: 'Mês' },
  { id: 'trimestral', nome: 'Trimestral', label: 'Trimestre' },
  { id: 'anual', nome: 'Anual', label: 'Ano' },
] as const;

export type GranularidadeId = typeof GRANULARIDADES[number]['id'];

// ============================================
// STATUS DE KPI
// ============================================

export const STATUS_KPI = {
  excelente: {
    nome: 'Excelente',
    cor: '#10b981', // green-500
    corDark: '#34d399', // green-400
    icone: '✅',
  },
  bom: {
    nome: 'Bom',
    cor: '#3b82f6', // blue-500
    corDark: '#60a5fa', // blue-400
    icone: '👍',
  },
  atencao: {
    nome: 'Atenção',
    cor: '#f59e0b', // amber-500
    corDark: '#fbbf24', // amber-400
    icone: '⚠️',
  },
  critico: {
    nome: 'Crítico',
    cor: '#ef4444', // red-500
    corDark: '#f87171', // red-400
    icone: '🚨',
  },
} as const;

export type StatusKPI = keyof typeof STATUS_KPI;

// ============================================
// ROLES (RBAC)
// ============================================

export const ROLES = {
  funcionario: {
    nome: 'Funcionário',
    permissoes: ['visualizar', 'criar'],
  },
  gestor: {
    nome: 'Gestor',
    permissoes: ['visualizar', 'criar', 'editar'],
  },
  diretor: {
    nome: 'Diretor',
    permissoes: ['visualizar', 'criar', 'editar', 'excluir', 'gerenciar_metas'],
  },
} as const;

export type RoleId = keyof typeof ROLES;

// ============================================
// CANAIS DE MARKETING
// ============================================

export const CANAIS_MARKETING = [
  'Facebook Ads',
  'Google Ads',
  'Instagram Ads',
  'LinkedIn Ads',
  'TikTok Ads',
  'Email Marketing',
  'SEO',
  'Influenciadores',
  'Parcerias',
  'Outros',
] as const;

// ============================================
// TIPOS DE EVENTO
// ============================================

export const TIPOS_EVENTO = [
  'Workshop',
  'Webinar',
  'Palestra',
  'Treinamento',
  'Feira',
  'Congresso',
  'Networking',
  'Lançamento',
  'Outros',
] as const;

// ============================================
// CONFIGURAÇÕES DE PAGINAÇÃO
// ============================================

export const PAGINACAO = {
  ITENS_POR_PAGINA_PADRAO: 20,
  OPCOES_ITENS_POR_PAGINA: [10, 20, 50, 100],
  PAGINA_INICIAL: 1,
} as const;

// ============================================
// CONFIGURAÇÕES DE CACHE
// ============================================

export const CACHE = {
  TEMPO_CACHE_PADRAO: 5 * 60 * 1000, // 5 minutos
  TEMPO_CACHE_STATS: 2 * 60 * 1000, // 2 minutos
  TEMPO_CACHE_METAS: 10 * 60 * 1000, // 10 minutos
} as const;

// ============================================
// CONFIGURAÇÕES DE VALIDAÇÃO
// ============================================

export const VALIDACAO = {
  MIN_INVESTIMENTO: 0,
  MAX_INVESTIMENTO: 999999999,
  MIN_LEADS: 0,
  MAX_LEADS: 999999,
  MIN_CONVERSOES: 0,
  MAX_CONVERSOES: 999999,
  MIN_RECEITA: 0,
  MAX_RECEITA: 999999999,
  MIN_IMPRESSOES: 0,
  MAX_IMPRESSOES: 999999999,
  MIN_CLIQUES: 0,
  MAX_CLIQUES: 999999,
} as const;

// ============================================
// FORMATOS DE DATA
// ============================================

export const FORMATOS_DATA = {
  DATA_BR: 'dd/MM/yyyy',
  DATA_ISO: 'yyyy-MM-dd',
  DATA_HORA_BR: 'dd/MM/yyyy HH:mm',
  DATA_HORA_COMPLETA: 'dd/MM/yyyy HH:mm:ss',
  HORA: 'HH:mm',
  MES_ANO: 'MM/yyyy',
  DIA_MES: 'dd/MM',
} as const;

// ============================================
// TIMEZONE
// ============================================

export const TIMEZONE = 'America/Fortaleza';
export const TIMEZONE_OFFSET = '-03:00'; // GMT-3

// ============================================
// CORES DO TEMA
// ============================================

export const CORES_TEMA = {
  primary: '#3b82f6', // blue-500
  secondary: '#8b5cf6', // purple-500
  success: '#10b981', // green-500
  warning: '#f59e0b', // amber-500
  danger: '#ef4444', // red-500
  info: '#06b6d4', // cyan-500
} as const;

// ============================================
// MENSAGENS PADRÃO
// ============================================

export const MENSAGENS = {
  ERRO_GENERICO: 'Ocorreu um erro. Tente novamente.',
  ERRO_REDE: 'Erro de conexão. Verifique sua internet.',
  SUCESSO_SALVAR: 'Dados salvos com sucesso!',
  SUCESSO_EXCLUIR: 'Registro excluído com sucesso!',
  SUCESSO_ATUALIZAR: 'Dados atualizados com sucesso!',
  CONFIRMAR_EXCLUSAO: 'Tem certeza que deseja excluir?',
  SESSAO_EXPIRADA: 'Sessão expirada. Faça login novamente.',
  SEM_PERMISSAO: 'Você não tem permissão para esta ação.',
  DADOS_INVALIDOS: 'Verifique os dados informados.',
  REGISTRO_DUPLICADO: 'Este registro já existe.',
} as const;

// ============================================
// LIMITES DE API
// ============================================

export const API_LIMITS = {
  MAX_UPLOAD_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_BATCH_SIZE: 1000, // registros
  TIMEOUT: 30000, // 30 segundos
} as const;

// ============================================
// HELPERS
// ============================================

/**
 * Busca setor por ID
 */
export function getSetor(id: string) {
  return SETORES.find((s) => s.id === id);
}

/**
 * Busca granularidade por ID
 */
export function getGranularidade(id: string) {
  return GRANULARIDADES.find((g) => g.id === id);
}

/**
 * Busca status por ID
 */
export function getStatusKPI(id: StatusKPI) {
  return STATUS_KPI[id];
}

/**
 * Busca role por ID
 */
export function getRole(id: string) {
  return ROLES[id as RoleId];
}