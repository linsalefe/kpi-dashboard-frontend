export enum ProdutoMarketing {
  CONGRESSOS = "Congressos",
  POS_GRADUACOES = "Pós-Graduações",
  CURSOS_HOTMART = "Cursos Hotmart",
  SEMINARIO = "Seminário",
  INTERCAMBIOS = "Intercâmbios",
}

export interface MarketingData {
  id: number;
  data_ref: string;
  produto: ProdutoMarketing;
  canal: string;
  campanha: string;
  investimento: number;
  impressoes: number;
  cliques: number;
  leads: number;
  vendas: number;
  receita: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface MarketingCreate {
  data_ref: string;
  produto: ProdutoMarketing;
  canal: string;
  campanha: string;
  investimento: number;
  impressoes?: number;
  cliques?: number;
  leads?: number;
  vendas?: number;
  receita?: number;
}

export interface MarketingStats {
  periodo: {
    data_inicio: string | null;
    data_fim: string | null;
    produto: string | null;
  };
  totais: {
    investimento: number;
    impressoes: number;
    cliques: number;
    leads: number;
    vendas: number;
    receita: number;
    total_registros: number;
  };
  kpis: {
    ctr: number;
    taxa_conversao: number;
    cpl: number;
    cpa: number;
    roi: number;
    roas: number;
  };
}

export const PRODUTOS_OPTIONS = [
  { value: ProdutoMarketing.CONGRESSOS, label: "Congressos", kpi: "CPA" },
  { value: ProdutoMarketing.POS_GRADUACOES, label: "Pós-Graduações", kpi: "CPL" },
  { value: ProdutoMarketing.CURSOS_HOTMART, label: "Cursos Hotmart", kpi: "CPA" },
  { value: ProdutoMarketing.SEMINARIO, label: "Seminário", kpi: "CPA" },
  { value: ProdutoMarketing.INTERCAMBIOS, label: "Intercâmbios", kpi: "CPL" },
];
