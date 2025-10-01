"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Eye, MousePointerClick, Users, TrendingUp, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ProdutoMarketing, PRODUTOS_OPTIONS } from "@/types/marketing";

export default function MarketingFormPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    data_ref: "",
    produto: "",
    canal: "",
    campanha: "",
    investimento: "",
    impressoes: "",
    cliques: "",
    leads: "",
    vendas: "",
    receita: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        data_ref: formData.data_ref,
        produto: formData.produto,
        canal: formData.canal,
        campanha: formData.campanha,
        investimento: parseFloat(formData.investimento),
        impressoes: parseInt(formData.impressoes) || 0,
        cliques: parseInt(formData.cliques) || 0,
        leads: parseInt(formData.leads) || 0,
        vendas: parseInt(formData.vendas) || 0,
        receita: parseFloat(formData.receita) || 0,
      };

      await api.post("/marketing/", payload);

      toast({
        title: "✅ Sucesso!",
        description: "Dados de marketing salvos com sucesso.",
      });

      router.push("/dashboard/marketing");
    } catch (error: any) {
      toast({
        title: "❌ Erro",
        description: error.response?.data?.detail || "Erro ao salvar dados",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Novo Registro - Marketing</h1>
        <p className="text-gray-600 mt-1">Preencha os dados da campanha de marketing</p>
      </div>

      {/* Formulário Premium */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data de Referência */}
          <div className="space-y-2">
            <Label htmlFor="data_ref" className="flex items-center gap-2 text-gray-700 font-medium">
              <Calendar className="w-4 h-4 text-blue-600" />
              Data de Referência *
            </Label>
            <Input
              id="data_ref"
              type="date"
              value={formData.data_ref}
              onChange={(e) => handleChange("data_ref", e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Produto */}
          <div className="space-y-2">
            <Label htmlFor="produto" className="flex items-center gap-2 text-gray-700 font-medium">
              <Package className="w-4 h-4 text-blue-600" />
              Produto *
            </Label>
            <Select value={formData.produto} onValueChange={(value) => handleChange("produto", value)} required>
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecione o produto" />
              </SelectTrigger>
              <SelectContent>
                {PRODUTOS_OPTIONS.map((produto) => (
                  <SelectItem key={produto.value} value={produto.value}>
                    {produto.label} ({produto.kpi})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              CPL = Custo por Lead | CPA = Custo por Venda
            </p>
          </div>

          {/* Canal */}
          <div className="space-y-2">
            <Label htmlFor="canal" className="flex items-center gap-2 text-gray-700 font-medium">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Canal *
            </Label>
            <Input
              id="canal"
              type="text"
              placeholder="Ex: Google Ads, Facebook, Instagram"
              value={formData.canal}
              onChange={(e) => handleChange("canal", e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Campanha */}
          <div className="space-y-2">
            <Label htmlFor="campanha" className="flex items-center gap-2 text-gray-700 font-medium">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Campanha *
            </Label>
            <Input
              id="campanha"
              type="text"
              placeholder="Ex: Black Friday 2024"
              value={formData.campanha}
              onChange={(e) => handleChange("campanha", e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Investimento */}
          <div className="space-y-2">
            <Label htmlFor="investimento" className="flex items-center gap-2 text-gray-700 font-medium">
              <DollarSign className="w-4 h-4 text-red-600" />
              Investimento (R$) *
            </Label>
            <Input
              id="investimento"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.investimento}
              onChange={(e) => handleChange("investimento", e.target.value)}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Impressões */}
          <div className="space-y-2">
            <Label htmlFor="impressoes" className="flex items-center gap-2 text-gray-700 font-medium">
              <Eye className="w-4 h-4 text-purple-600" />
              Impressões
            </Label>
            <Input
              id="impressoes"
              type="number"
              min="0"
              placeholder="0"
              value={formData.impressoes}
              onChange={(e) => handleChange("impressoes", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Cliques */}
          <div className="space-y-2">
            <Label htmlFor="cliques" className="flex items-center gap-2 text-gray-700 font-medium">
              <MousePointerClick className="w-4 h-4 text-indigo-600" />
              Cliques
            </Label>
            <Input
              id="cliques"
              type="number"
              min="0"
              placeholder="0"
              value={formData.cliques}
              onChange={(e) => handleChange("cliques", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Leads */}
          <div className="space-y-2">
            <Label htmlFor="leads" className="flex items-center gap-2 text-gray-700 font-medium">
              <Users className="w-4 h-4 text-blue-600" />
              Leads
            </Label>
            <Input
              id="leads"
              type="number"
              min="0"
              placeholder="0"
              value={formData.leads}
              onChange={(e) => handleChange("leads", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Vendas */}
          <div className="space-y-2">
            <Label htmlFor="vendas" className="flex items-center gap-2 text-gray-700 font-medium">
              <TrendingUp className="w-4 h-4 text-green-600" />
              Vendas
            </Label>
            <Input
              id="vendas"
              type="number"
              min="0"
              placeholder="0"
              value={formData.vendas}
              onChange={(e) => handleChange("vendas", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Receita */}
          <div className="space-y-2">
            <Label htmlFor="receita" className="flex items-center gap-2 text-gray-700 font-medium">
              <DollarSign className="w-4 h-4 text-green-600" />
              Receita (R$)
            </Label>
            <Input
              id="receita"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.receita}
              onChange={(e) => handleChange("receita", e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
            {loading ? "Salvando..." : "Salvar Registro"}
          </Button>
        </div>
      </form>
    </div>
  );
}
