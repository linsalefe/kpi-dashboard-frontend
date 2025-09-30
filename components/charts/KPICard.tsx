// components/charts/KPICard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, formatPercentValue, formatNumber, formatVariation, cn } from '@/lib/utils';
import { STATUS_KPI } from '@/lib/constants';
import type { StatusKPI } from '@/types';

interface KPICardProps {
  titulo: string;
  valor: number;
  formato?: 'moeda' | 'percentual' | 'numero' | 'percentual_direto';
  decimais?: number;
  variacao?: number; // Variação em decimal (ex: 0.15 = +15%)
  status?: StatusKPI;
  meta?: number;
  icone?: string;
  descricao?: string;
  className?: string;
  isLoading?: boolean;
}

export function KPICard({
  titulo,
  valor,
  formato = 'numero',
  decimais = 0,
  variacao,
  status,
  meta,
  icone,
  descricao,
  className,
  isLoading = false,
}: KPICardProps) {
  // Formatar valor baseado no tipo
  const formatarValor = () => {
    if (isLoading) return '...';

    switch (formato) {
      case 'moeda':
        return formatCurrency(valor);
      case 'percentual':
        return formatPercent(valor, decimais);
      case 'percentual_direto':
        return formatPercentValue(valor, decimais);
      case 'numero':
      default:
        return formatNumber(valor, decimais);
    }
  };

  // Formatar meta
  const formatarMeta = () => {
    if (!meta) return null;

    switch (formato) {
      case 'moeda':
        return formatCurrency(meta);
      case 'percentual':
        return formatPercent(meta, decimais);
      case 'percentual_direto':
        return formatPercentValue(meta, decimais);
      case 'numero':
      default:
        return formatNumber(meta, decimais);
    }
  };

  // Obter cor do status
  const getStatusColor = () => {
    if (!status) return null;
    const statusInfo = STATUS_KPI[status];
    return statusInfo;
  };

  const statusInfo = getStatusColor();
  const variacaoFormatada = variacao !== undefined ? formatVariation(variacao) : null;
  const metaFormatada = formatarMeta();

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {titulo}
        </CardTitle>
        {icone && <span className="text-2xl">{icone}</span>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Valor Principal */}
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{formatarValor()}</span>
            {status && statusInfo && (
              <Badge
                variant="outline"
                className="ml-2"
                style={{
                  borderColor: statusInfo.cor,
                  color: statusInfo.cor,
                }}
              >
                {statusInfo.icone} {statusInfo.nome}
              </Badge>
            )}
          </div>

          {/* Variação */}
          {variacaoFormatada && (
            <div className="flex items-center text-xs">
              <span className={variacaoFormatada.className}>
                {variacaoFormatada.text}
              </span>
              <span className="ml-1 text-muted-foreground">vs. período anterior</span>
            </div>
          )}

          {/* Meta */}
          {metaFormatada && (
            <div className="text-xs text-muted-foreground">
              Meta: <span className="font-medium">{metaFormatada}</span>
            </div>
          )}

          {/* Descrição */}
          {descricao && (
            <p className="text-xs text-muted-foreground mt-2">{descricao}</p>
          )}

          {/* Progresso da Meta */}
          {meta && meta > 0 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min((valor / meta) * 100, 100)}%`,
                    backgroundColor: statusInfo?.cor || '#3b82f6',
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {((valor / meta) * 100).toFixed(1)}% da meta
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}