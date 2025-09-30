"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const setores = [
    {
      nome: "Marketing",
      href: "/dashboard/marketing",
      icon: "📱",
      color: "bg-blue-500",
      stats: { label: "ROI Médio", value: "962.5%", change: "+12%" },
    },
    {
      nome: "Comercial",
      href: "/dashboard/comercial",
      icon: "💼",
      color: "bg-green-500",
      stats: { label: "Taxa Conversão", value: "Em breve", change: "" },
    },
    {
      nome: "Eventos",
      href: "/dashboard/eventos",
      icon: "🎉",
      color: "bg-purple-500",
      stats: { label: "Participação", value: "Em breve", change: "" },
    },
    {
      nome: "RH",
      href: "/dashboard/rh",
      icon: "👥",
      color: "bg-orange-500",
      stats: { label: "Turnover", value: "Em breve", change: "" },
    },
    {
      nome: "Pedagógico",
      href: "/dashboard/pedagogico",
      icon: "📚",
      color: "bg-indigo-500",
      stats: { label: "Satisfação", value: "Em breve", change: "" },
    },
    {
      nome: "Financeiro",
      href: "/dashboard/financeiro",
      icon: "💰",
      color: "bg-emerald-500",
      stats: { label: "Margem", value: "Em breve", change: "" },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo, {user?.nome || "Usuário"}!
        </h1>
        <p className="mt-2 text-gray-600">
          Visão geral executiva dos KPIs por setor
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {setores.map((setor) => (
          <Link
            key={setor.nome}
            href={setor.href}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Gradient Background */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${setor.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`}
            ></div>

            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{setor.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {setor.nome}
                  </h3>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">{setor.stats.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-gray-900">
                    {setor.stats.value}
                  </p>
                  {setor.stats.change && (
                    <span className="text-sm font-medium text-green-600">
                      {setor.stats.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Atividade Recente
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Marketing:</span> 2
              novos registros adicionados
            </p>
            <span className="ml-auto text-gray-400">Hoje</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Sistema:</span> Backup
              automático realizado
            </p>
            <span className="ml-auto text-gray-400">Ontem</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-medium text-blue-900">Sprint S1 - MVP Base</h3>
            <p className="mt-1 text-sm text-blue-700">
              Atualmente você está visualizando a versão inicial do dashboard.
              Mais funcionalidades (gráficos, filtros, real-time) serão
              adicionadas nas próximas sprints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}