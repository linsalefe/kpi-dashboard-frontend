"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Megaphone,
  Briefcase,
  Calendar,
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Activity,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem, FadeIn, SlideIn } from "@/components/animations/PageTransition";

interface SetorCard {
  nome: string;
  href: string;
  icon: any;
  color: string;
  bgColor: string;
  kpiPrincipal: string;
  valorKPI: string;
  status: "success" | "warning" | "info";
  variacao?: string;
}

export default function DashboardHome() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const setores: SetorCard[] = [
    {
      nome: "Marketing",
      href: "/dashboard/marketing",
      icon: Megaphone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      kpiPrincipal: "ROI Médio",
      valorKPI: "962,5%",
      status: "success",
      variacao: "+12%",
    },
    {
      nome: "Comercial",
      href: "/dashboard/comercial",
      icon: Briefcase,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      kpiPrincipal: "Taxa Conversão",
      valorKPI: "Em breve",
      status: "info",
    },
    {
      nome: "Eventos",
      href: "/dashboard/eventos",
      icon: Calendar,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      kpiPrincipal: "Participação",
      valorKPI: "Em breve",
      status: "info",
    },
    {
      nome: "RH",
      href: "/dashboard/rh",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      kpiPrincipal: "Turnover",
      valorKPI: "Em breve",
      status: "info",
    },
    {
      nome: "Pedagógico",
      href: "/dashboard/pedagogico",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50",
      kpiPrincipal: "Satisfação",
      valorKPI: "Em breve",
      status: "info",
    },
    {
      nome: "Financeiro",
      href: "/dashboard/financeiro",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      kpiPrincipal: "Margem",
      valorKPI: "Em breve",
      status: "info",
    },
  ];

  const atividadesRecentes = [
    {
      setor: "Marketing",
      descricao: "2 novas registros adicionados",
      timestamp: "Hoje",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      setor: "Sistema",
      descricao: "Backup automático realizado",
      timestamp: "Ontem",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <SlideIn direction="down">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cenat-primary via-gray-800 to-cenat-secondary p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-40 w-40 rounded-full bg-cenat-accent/20 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-cenat-accent" />
              <span className="text-sm font-medium text-cenat-accent">Dashboard Executivo</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Bem-vindo, {user?.nome?.split(" ")[0] || "Administrador"}!
            </h1>
            <p className="text-gray-300 text-lg">
              Visão geral executiva dos KPIs por setor
            </p>
          </div>
        </div>
      </SlideIn>

      {/* Stats Cards */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StaggerItem>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="border-gray-200/50 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    Ativo
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Setores Ativos</p>
                <p className="text-3xl font-bold text-gray-900">6</p>
                <p className="text-xs text-gray-500 mt-2">
                  Marketing em operação completa
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="border-gray-200/50 bg-gradient-to-br from-white to-green-50/30 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-100">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Online
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Status Sistema</p>
                <p className="text-3xl font-bold text-gray-900">100%</p>
                <p className="text-xs text-gray-500 mt-2">
                  Todos os serviços operacionais
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="border-gray-200/50 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <LayoutDashboard className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                    v1.0.0
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-1">Versão Atual</p>
                <p className="text-3xl font-bold text-gray-900">Sprint 3</p>
                <p className="text-xs text-gray-500 mt-2">
                  Design Premium CENAT
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>

      {/* Setores Grid */}
      <div>
        <FadeIn delay={0.3}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Setores</h2>
            <p className="text-gray-500">Acesse os dashboards de cada área</p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {setores.map((setor, index) => {
            const Icon = setor.icon;
            return (
              <StaggerItem key={setor.nome}>
                <Link href={setor.href}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="group border-gray-200/50 hover:border-cenat-secondary/50 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                      {/* Barra decorativa */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${setor.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className={`p-3 rounded-xl ${setor.bgColor} group-hover:scale-110 transition-transform`}>
                            <Icon className={`w-6 h-6 ${setor.color}`} />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cenat-secondary group-hover:translate-x-1 transition-all" />
                        </div>
                        <CardTitle className="text-xl font-bold mt-4">
                          {setor.nome}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-gray-500 font-medium mb-1">
                              {setor.kpiPrincipal}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <p className="text-2xl font-bold text-gray-900">
                                {setor.valorKPI}
                              </p>
                              {setor.variacao && (
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                  {setor.variacao}
                                </Badge>
                              )}
                            </div>
                          </div>

                          <Badge
                            variant="outline"
                            className={
                              setor.status === "success"
                                ? "border-green-200 bg-green-50 text-green-700"
                                : setor.status === "warning"
                                ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                : "border-blue-200 bg-blue-50 text-blue-700"
                            }
                          >
                            {setor.status === "success" ? "Operacional" : "Em breve"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>

      {/* Atividade Recente */}
      <FadeIn delay={0.5}>
        <Card className="border-gray-200/50">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-cenat-secondary" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {atividadesRecentes.map((atividade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${atividade.bgColor}`}>
                    <Activity className={`w-4 h-4 ${atividade.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{atividade.setor}</p>
                    <p className="text-sm text-gray-600">{atividade.descricao}</p>
                  </div>
                  <span className="text-xs text-gray-500">{atividade.timestamp}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Info Sprint */}
      <FadeIn delay={0.7}>
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-1">Sprint S1 - MVP Base</p>
                <p className="text-sm text-blue-700">
                  Atualmente você está visualizando a versão inicial do dashboard. Mais funcionalidades (gráficos, filtros, real-time) serão adicionadas nas próximas sprints.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
