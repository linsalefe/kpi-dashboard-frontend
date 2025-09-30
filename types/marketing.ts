// types/marketing.ts

/**
 * Tipos TypeScript para o setor de Marketing
 */

// ============================================
// DADOS CRUS (RAW DATA)
// ============================================

/**
 * Registro de dado cru de Marketing
 * Corresponde à tabela marketing_data no backend
 */
export interface MarketingData {
  id: number;
  data_ref: string; // ISO format: YYYY-MM-DD
  canal: string;
  campanha: string;
  investimento: number;
  leads_gerados: number;
  conversoes: number;
  receita_gerada: number;
  impressoes: number;
  cliques: number;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  created_by?: string;
}

/**
 * Payload para criar novo registro de Marketing
 */
export interface CreateMarketingData {
  data_ref: string; // YYYY-MM-DD
  canal: string;
  campanha: string;
  investimento: number;
  leads_gerados: number;
  conversoes: number;
  receita_gerada: number;
  impressoes: number;
  cliques: number;
}

/**
 * Payload para atualizar registro de Marketing
 */
export interface UpdateMarketingData {
  data_ref?: string;
  canal?: string;
  campanha?: string;
  investimento?: number;
  leads_gerados?: number;
  conversoes?: number;
  receita_gerada?: number;
  impressoes?: number;
  cliques?: number;
}

// ============================================
// KPIs CALCULADOS
// ============================================

/**
 * KPIs de Marketing (calculados no backend)
 */
export interface MarketingKPIs {
  roi: number; // Return on Investment (%)
  cpl: number; // Custo por Lead (R$)
  taxa_conversao: number; // Taxa de Conversão (%)
  ctr: number; // Click-Through Rate (%)
  cpa: number; // Custo por Aquisição (R$)
  ticket_medio: number; // Receita / Conversões (R$)
}

/**
 * Estatísticas agregadas de Marketing
 * Retornadas pelo endpoint /api/marketing/stats
 */
export interface MarketingStats {
  total_investimento: number;
  total_leads: number;
  total_conversoes: number;
  total_receita: number;
  total_impressoes: number;
  total_cliques: number;
  kpis: MarketingKPIs;
}

// ============================================
// FILTROS E PAGINAÇÃO
// ============================================

/**
 * Filtros para listar dados de Marketing
 */
export interface MarketingFilters {
  data_inicio?: string; // YYYY-MM-DD
  data_fim?: string; // YYYY-MM-DD
  canal?: string;
  campanha?: string;
  page?: number;
  per_page?: number;
  sort_by?: 'data_ref' | 'investimento' | 'leads_gerados' | 'conversoes' | 'receita_gerada';
  sort_order?: 'asc' | 'desc';
}

/**
 * Resposta paginada da API
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

/**
 * Resposta da listagem de dados de Marketing
 */
export type MarketingDataResponse = PaginatedResponse<MarketingData>;

// ============================================
// FORMULÁRIO
// ============================================

/**
 * Dados do formulário de Marketing (estado do form)
 */
export interface MarketingFormData {
  data_ref: string;
  canal: string;
  campanha: string;
  investimento: string; // String no form, convertido para number
  leads_gerados: string;
  conversoes: string;
  receita_gerada: string;
  impressoes: string;
  cliques: string;
}

/**
 * Erros de validação do formulário
 */
export interface MarketingFormErrors {
  data_ref?: string;
  canal?: string;
  campanha?: string;
  investimento?: string;
  leads_gerados?: string;
  conversoes?: string;
  receita_gerada?: string;
  impressoes?: string;
  cliques?: string;
}

// ============================================
// CARDS E VISUALIZAÇÃO
// ============================================

/**
 * Card de KPI para exibição no dashboard
 */
export interface KPICard {
  id: string;
  titulo: string;
  valor: number;
  formato: 'moeda' | 'percentual' | 'numero';
  variacao?: number; // Variação em relação ao período anterior
  status?: 'excelente' | 'bom' | 'atencao' | 'critico';
  meta?: number;
  icone?: string;
  cor?: string;
}

/**
 * Dados para gráfico de linha/área
 */
export interface ChartDataPoint {
  data: string; // YYYY-MM-DD ou label
  valor: number;
  label?: string;
}

/**
 * Série de dados para gráficos múltiplos
 */
export interface ChartSeries {
  nome: string;
  dados: ChartDataPoint[];
  cor?: string;
}

/**
 * Dados agregados por canal
 */
export interface MarketingByChannel {
  canal: string;
  investimento: number;
  leads: number;
  conversoes: number;
  receita: number;
  roi: number;
  cpl: number;
}

/**
 * Dados agregados por campanha
 */
export interface MarketingByCampaign {
  campanha: string;
  canal: string;
  investimento: number;
  leads: number;
  conversoes: number;
  receita: number;
  roi: number;
}

// ============================================
// EXPORTAÇÃO
// ============================================

/**
 * Opções de exportação de dados
 */
export interface ExportOptions {
  formato: 'csv' | 'xlsx' | 'pdf';
  filtros?: MarketingFilters;
  colunas?: string[];
}

// ============================================
// UPLOAD DE PLANILHA
// ============================================

/**
 * Preview de linha da planilha
 */
export interface MarketingRowPreview {
  linha: number;
  data_ref: string;
  canal: string;
  campanha: string;
  investimento: number;
  leads_gerados: number;
  conversoes: number;
  receita_gerada: number;
  impressoes: number;
  cliques: number;
  erros?: string[];
  valido: boolean;
}

/**
 * Resultado do upload de planilha
 */
export interface UploadResult {
  total_linhas: number;
  linhas_validas: number;
  linhas_invalidas: number;
  linhas_duplicadas: number;
  linhas_inseridas: number;
  erros: {
    linha: number;
    mensagem: string;
  }[];
  preview?: MarketingRowPreview[];
}

// ============================================
// HELPERS DE TIPO
// ============================================

/**
 * Type guard para verificar se é um MarketingData válido
 */
export function isMarketingData(data: any): data is MarketingData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.data_ref === 'string' &&
    typeof data.canal === 'string' &&
    typeof data.campanha === 'string' &&
    typeof data.investimento === 'number' &&
    typeof data.leads_gerados === 'number' &&
    typeof data.conversoes === 'number' &&
    typeof data.receita_gerada === 'number'
  );
}

/**
 * Type guard para MarketingStats
 */
export function isMarketingStats(data: any): data is MarketingStats {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.total_investimento === 'number' &&
    typeof data.kpis === 'object' &&
    typeof data.kpis.roi === 'number'
  );
}