'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercent, formatPercentValue, formatNumber, formatVariation, cn } from '@/lib/utils';
import { STATUS_KPI } from '@/lib/constants';
import type { StatusKPI } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  titulo: string;
  valor: number;
  formato?: 'moeda' | 'percentual' | 'numero' | 'percentual_direto';
  decimais?: number;
  variacao?: number;
  status?: StatusKPI;
  meta?: number;
  icone?: React.ReactNode;
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

  const getStatusColor = () => {
    if (!status) return null;
    return STATUS_KPI[status];
  };

  const getTrendIcon = () => {
    if (!variacao) return <Minus className="w-4 h-4" />;
    if (variacao > 0) return <TrendingUp className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!variacao) return 'text-gray-400';
    if (variacao > 0) return 'text-green-600';
    return 'text-red-600';
  };

  const statusInfo = getStatusColor();
  const variacaoFormatada = variacao !== undefined ? formatVariation(variacao) : null;
  const metaFormatada = formatarMeta();
  const progressoPorcentagem = meta && meta > 0 ? Math.min((valor / meta) * 100, 100) : 0;

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30',
        'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300',
        'hover:border-cenat-secondary/30',
        className
      )}
    >
      {/* Barra decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cenat-secondary via-cenat-accent to-cenat-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1 flex-1">
          <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {titulo}
          </CardTitle>
          {descricao && (
            <p className="text-xs text-gray-500 leading-relaxed">{descricao}</p>
          )}
        </div>
        
        {icone && (
          <div className="text-gray-400 group-hover:text-cenat-secondary transition-colors duration-300">
            {icone}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Valor Principal */}
        <div className="flex items-end justify-between gap-2">
          <div className="space-y-1">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">
              {formatarValor()}
            </span>
            
            {/* Variação */}
            {variacaoFormatada && (
              <div className="flex items-center gap-1.5">
                <div className={cn('flex items-center gap-0.5', getTrendColor())}>
                  {getTrendIcon()}
                  <span className="text-sm font-semibold">
                    {variacaoFormatada.text}
                  </span>
                </div>
                <span className="text-xs text-gray-400">vs. anterior</span>
              </div>
            )}
          </div>

          {/* Status Badge */}
          {status && statusInfo && (
            <Badge
              variant="outline"
              className="px-2.5 py-1 font-medium text-xs"
              style={{
                borderColor: statusInfo.cor,
                color: statusInfo.cor,
                backgroundColor: `${statusInfo.cor}10`,
              }}
            >
              {statusInfo.icone} {statusInfo.nome}
            </Badge>
          )}
        </div>

        {/* Progresso da Meta */}
        {meta && meta > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Progresso</span>
              <span className="text-gray-700 font-semibold">
                {progressoPorcentagem.toFixed(1)}%
              </span>
            </div>
            
            <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressoPorcentagem}%`,
                  background: statusInfo?.cor 
                    ? `linear-gradient(90deg, ${statusInfo.cor}, ${statusInfo.cor}dd)`
                    : 'linear-gradient(90deg, #3b82f6, #2563eb)',
                }}
              />
            </div>
            
            <div className="text-xs text-gray-500">
              Meta: <span className="font-semibold text-gray-700">{metaFormatada}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
