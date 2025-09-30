'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { KPICard } from '@/components/charts/KPICard';
import api from '@/lib/api';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import type { MarketingData, MarketingStats } from '@/types';

export default function MarketingPage() {
  const { toast } = useToast();
  
  const [data, setData] = useState<MarketingData[]>([]);
  const [stats, setStats] = useState<MarketingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page,
        per_page: perPage,
        sort_by: 'data_ref',
        sort_order: 'desc',
      };
      if (dataInicio) params.data_inicio = dataInicio;
      if (dataFim) params.data_fim = dataFim;
      const response = await api.get('/marketing/data', { params });
      setData(response.data.items || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error: any) {
      console.error('Erro ao buscar dados:', error);
      setData([]);
      toast({
        title: 'Erro',
        description: error?.detail || 'Erro ao buscar dados de Marketing',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const params: any = {};
      if (dataInicio) params.data_inicio = dataInicio;
      if (dataFim) params.data_fim = dataFim;
      const response = await api.get('/marketing/stats', { params });
      setStats(response.data);
    } catch (error: any) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const aplicarFiltros = () => {
    setPage(1);
    fetchData();
    fetchStats();
  };

  const limparFiltros = () => {
    setDataInicio('');
    setDataFim('');
    setPage(1);
  };

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const getStatusROI = (roi: number | undefined) => {
    if (!roi || roi === 0) return undefined;
    if (roi >= 10) return 'excelente';
    if (roi >= 5) return 'bom';
    if (roi >= 2) return 'atencao';
    return 'critico';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">Gestão de campanhas e análise de performance</p>
        </div>
        <Link href="/dashboard/marketing/form">
          <Button>+ Nova Campanha</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="data_inicio">Data Início</Label>
              <Input id="data_inicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="data_fim">Data Fim</Label>
              <Input id="data_fim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={aplicarFiltros}>Aplicar</Button>
              <Button variant="outline" onClick={limparFiltros}>Limpar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          titulo="ROI" 
          valor={stats?.kpis?.roi || 0} 
          formato="percentual_direto" 
          decimais={1} 
          icone="💰" 
          status={getStatusROI(stats?.kpis?.roi)} 
          isLoading={!stats} 
        />
        <KPICard 
          titulo="CPL (Custo por Lead)" 
          valor={stats?.kpis?.cpl || 0} 
          formato="moeda" 
          decimais={2} 
          icone="📊" 
          isLoading={!stats} 
        />
        <KPICard 
          titulo="Taxa de Conversão" 
          valor={stats?.kpis?.taxa_conversao || 0} 
          formato="percentual_direto" 
          decimais={2} 
          icone="🎯" 
          isLoading={!stats} 
        />
        <KPICard 
          titulo="CTR (Click-Through Rate)" 
          valor={stats?.kpis?.ctr || 0} 
          formato="percentual_direto" 
          decimais={2} 
          icone="👆" 
          isLoading={!stats} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Investido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats ? formatCurrency(stats.total_investimento) : '...'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats ? formatNumber(stats.total_leads) : '...'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita Gerada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats ? formatCurrency(stats.total_receita) : '...'}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados de Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Carregando...</div>
          ) : !data || data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Nenhum dado encontrado. Cadastre a primeira campanha!</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Canal</TableHead>
                      <TableHead>Campanha</TableHead>
                      <TableHead className="text-right">Investimento</TableHead>
                      <TableHead className="text-right">Leads</TableHead>
                      <TableHead className="text-right">Conversões</TableHead>
                      <TableHead className="text-right">Receita</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{formatDate(item.data_ref)}</TableCell>
                        <TableCell><Badge variant="outline">{item.canal}</Badge></TableCell>
                        <TableCell className="font-medium">{item.campanha}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.investimento)}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.leads_gerados)}</TableCell>
                        <TableCell className="text-right">{formatNumber(item.conversoes)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.receita_gerada)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">Página {page} de {totalPages}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Anterior</Button>
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Próxima</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
