'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import { MarketingData } from '@/types/marketing';
import { useSocket } from '@/hooks/useSocket';
import { TrendingUp, Users, DollarSign, MousePointerClick, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { KPICard } from '@/components/charts/KPICard';

interface KPIStats {
  roi: number;
  cpl: number;
  taxa_conversao: number;
  ctr: number;
}

export default function MarketingDashboard() {
  const [stats, setStats] = useState<KPIStats>({ roi: 0, cpl: 0, taxa_conversao: 0, ctr: 0 });
  const [data, setData] = useState<MarketingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const { toast } = useToast();
  
  // Socket.io Real-time
  const { isConnected, lastUpdate, subscribeSector } = useSocket();

  // Carregar dados iniciais
  const fetchData = async () => {
    try {
      setLoading(true);
      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(period));

      const [statsRes, dataRes] = await Promise.all([
        api.get('/marketing/stats', {
          params: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
          },
        }),
        api.get('/marketing/data', {
          params: {
            data_inicio: startDate.toISOString().split('T')[0],
            data_fim: endDate.toISOString().split('T')[0],
            page: 1,
            per_page: 10,
          },
        }),
      ]);

      if (statsRes.data.metricas) {
        setStats({
          roi: statsRes.data.metricas.roi_percentual,
          cpl: statsRes.data.metricas.cpl,
          taxa_conversao: statsRes.data.metricas.taxa_conversao_percentual,
          ctr: statsRes.data.metricas.ctr_percentual,
        });
      }

      if (dataRes.data.data) {
        setData(dataRes.data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os dados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Inscrever no setor Marketing ao montar
  useEffect(() => {
    if (isConnected) {
      subscribeSector('marketing');
    }
  }, [isConnected, subscribeSector]);

  // Escutar atualizações em tempo real
  useEffect(() => {
    if (lastUpdate && lastUpdate.sector === 'marketing') {
      console.log('Atualizando KPIs em tempo real:', lastUpdate.kpis);
      
      setStats(lastUpdate.kpis);
      
      toast({
        title: '📊 KPIs Atualizados',
        description: 'Dados atualizados em tempo real',
      });

      // Recarregar tabela de dados
      fetchData();
    }
  }, [lastUpdate]);

  // Carregar dados ao montar e quando período muda
  useEffect(() => {
    fetchData();
  }, [period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">Análise de campanhas e performance</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Indicador de Conexão Real-Time */}
          <Badge variant={isConnected ? 'default' : 'secondary'} className="gap-2">
            {isConnected ? (
              <>
                <Wifi className="h-3 w-3" />
                Conectado
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                Desconectado
              </>
            )}
          </Badge>
          
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          
          <Link href="/dashboard/marketing/form">
            <Button>Nova Campanha</Button>
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="ROI"
          value={formatNumber(stats.roi)}
          subtitle="%"
          icon={TrendingUp}
          trend={stats.roi > 0 ? 'up' : 'down'}
        />
        <KPICard
          title="CPL"
          value={formatCurrency(stats.cpl)}
          subtitle="Custo por Lead"
          icon={DollarSign}
          trend={stats.cpl < 50 ? 'up' : 'down'}
        />
        <KPICard
          title="Taxa de Conversão"
          value={formatNumber(stats.taxa_conversao)}
          subtitle="%"
          icon={Users}
          trend={stats.taxa_conversao > 2 ? 'up' : 'down'}
        />
        <KPICard
          title="CTR"
          value={formatNumber(stats.ctr)}
          subtitle="%"
          icon={MousePointerClick}
          trend={stats.ctr > 1 ? 'up' : 'down'}
        />
      </div>

      {/* Tabela de Dados */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
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
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Nenhum dado encontrado
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.data_ref)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.canal}</Badge>
                    </TableCell>
                    <TableCell>{item.campanha}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.investimento)}</TableCell>
                    <TableCell className="text-right">{item.leads}</TableCell>
                    <TableCell className="text-right">{item.conversoes}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.receita)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
