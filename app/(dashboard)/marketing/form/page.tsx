// app/dashboard/marketing/form/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { CANAIS_MARKETING } from '@/lib/constants';
import type { MarketingFormData, MarketingFormErrors } from '@/types';

export default function MarketingFormPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Estado do formulário
  const [formData, setFormData] = useState<MarketingFormData>({
    data_ref: '',
    canal: '',
    campanha: '',
    investimento: '',
    leads_gerados: '',
    conversoes: '',
    receita_gerada: '',
    impressoes: '',
    cliques: '',
  });

  const [errors, setErrors] = useState<MarketingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Atualiza campo do formulário
   */
  const handleChange = (field: keyof MarketingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpa erro do campo ao editar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Valida formulário
   */
  const validarFormulario = (): boolean => {
    const novosErros: MarketingFormErrors = {};

    // Data de referência
    if (!formData.data_ref) {
      novosErros.data_ref = 'Data de referência é obrigatória';
    }

    // Canal
    if (!formData.canal) {
      novosErros.canal = 'Canal é obrigatório';
    }

    // Campanha
    if (!formData.campanha || formData.campanha.trim().length < 3) {
      novosErros.campanha = 'Campanha deve ter pelo menos 3 caracteres';
    }

    // Investimento
    const investimento = parseFloat(formData.investimento);
    if (!formData.investimento || isNaN(investimento) || investimento < 0) {
      novosErros.investimento = 'Investimento deve ser um valor válido (≥ 0)';
    }

    // Leads gerados
    const leads = parseInt(formData.leads_gerados);
    if (!formData.leads_gerados || isNaN(leads) || leads < 0) {
      novosErros.leads_gerados = 'Leads deve ser um número válido (≥ 0)';
    }

    // Conversões
    const conversoes = parseInt(formData.conversoes);
    if (!formData.conversoes || isNaN(conversoes) || conversoes < 0) {
      novosErros.conversoes = 'Conversões deve ser um número válido (≥ 0)';
    }

    // Receita gerada
    const receita = parseFloat(formData.receita_gerada);
    if (!formData.receita_gerada || isNaN(receita) || receita < 0) {
      novosErros.receita_gerada = 'Receita deve ser um valor válido (≥ 0)';
    }

    // Impressões
    const impressoes = parseInt(formData.impressoes);
    if (!formData.impressoes || isNaN(impressoes) || impressoes < 0) {
      novosErros.impressoes = 'Impressões deve ser um número válido (≥ 0)';
    }

    // Cliques
    const cliques = parseInt(formData.cliques);
    if (!formData.cliques || isNaN(cliques) || cliques < 0) {
      novosErros.cliques = 'Cliques deve ser um número válido (≥ 0)';
    }

    // Validação lógica: conversões não podem ser maiores que leads
    if (conversoes > leads && !isNaN(conversoes) && !isNaN(leads)) {
      novosErros.conversoes = 'Conversões não podem ser maiores que leads';
    }

    // Validação lógica: cliques não podem ser maiores que impressões
    if (cliques > impressoes && !isNaN(cliques) && !isNaN(impressoes)) {
      novosErros.cliques = 'Cliques não podem ser maiores que impressões';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  /**
   * Submete formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toast({
        title: 'Erro de Validação',
        description: 'Corrija os erros no formulário antes de enviar.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Converte strings para números
      const payload = {
        data_ref: formData.data_ref,
        canal: formData.canal,
        campanha: formData.campanha.trim(),
        investimento: parseFloat(formData.investimento),
        leads_gerados: parseInt(formData.leads_gerados),
        conversoes: parseInt(formData.conversoes),
        receita_gerada: parseFloat(formData.receita_gerada),
        impressoes: parseInt(formData.impressoes),
        cliques: parseInt(formData.cliques),
      };

      await api.post('/marketing/data', payload);

      toast({
        title: 'Sucesso!',
        description: 'Campanha cadastrada com sucesso.',
      });

      // Redirect para dashboard
      router.push('/dashboard/marketing');
    } catch (error: any) {
      console.error('Erro ao salvar:', error);
      
      // Erro 409 = duplicidade
      if (error?.status === 409) {
        toast({
          title: 'Registro Duplicado',
          description: error?.detail || 'Já existe um registro para esta data, canal e campanha.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erro ao Salvar',
          description: error?.detail || 'Erro ao cadastrar campanha. Tente novamente.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nova Campanha de Marketing</h1>
          <p className="text-muted-foreground">
            Cadastre os dados de uma nova campanha
          </p>
        </div>
        <Link href="/dashboard/marketing">
          <Button variant="outline">← Voltar</Button>
        </Link>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Dados da Campanha</CardTitle>
            <CardDescription>
              Preencha todos os campos com os dados crus (sem fórmulas)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Data de Referência */}
            <div>
              <Label htmlFor="data_ref">
                Data de Referência <span className="text-red-500">*</span>
              </Label>
              <Input
                id="data_ref"
                type="date"
                value={formData.data_ref}
                onChange={(e) => handleChange('data_ref', e.target.value)}
                className={errors.data_ref ? 'border-red-500' : ''}
              />
              {errors.data_ref && (
                <p className="text-sm text-red-500 mt-1">{errors.data_ref}</p>
              )}
            </div>

            {/* Canal */}
            <div>
              <Label htmlFor="canal">
                Canal <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.canal} onValueChange={(value) => handleChange('canal', value)}>
                <SelectTrigger className={errors.canal ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione o canal" />
                </SelectTrigger>
                <SelectContent>
                  {CANAIS_MARKETING.map((canal) => (
                    <SelectItem key={canal} value={canal}>
                      {canal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.canal && (
                <p className="text-sm text-red-500 mt-1">{errors.canal}</p>
              )}
            </div>

            {/* Campanha */}
            <div>
              <Label htmlFor="campanha">
                Nome da Campanha <span className="text-red-500">*</span>
              </Label>
              <Input
                id="campanha"
                type="text"
                placeholder="Ex: Campanha Black Friday 2025"
                value={formData.campanha}
                onChange={(e) => handleChange('campanha', e.target.value)}
                className={errors.campanha ? 'border-red-500' : ''}
              />
              {errors.campanha && (
                <p className="text-sm text-red-500 mt-1">{errors.campanha}</p>
              )}
            </div>

            {/* Grid de campos numéricos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Investimento */}
              <div>
                <Label htmlFor="investimento">
                  Investimento (R$) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="investimento"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.investimento}
                  onChange={(e) => handleChange('investimento', e.target.value)}
                  className={errors.investimento ? 'border-red-500' : ''}
                />
                {errors.investimento && (
                  <p className="text-sm text-red-500 mt-1">{errors.investimento}</p>
                )}
              </div>

              {/* Leads Gerados */}
              <div>
                <Label htmlFor="leads_gerados">
                  Leads Gerados <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="leads_gerados"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.leads_gerados}
                  onChange={(e) => handleChange('leads_gerados', e.target.value)}
                  className={errors.leads_gerados ? 'border-red-500' : ''}
                />
                {errors.leads_gerados && (
                  <p className="text-sm text-red-500 mt-1">{errors.leads_gerados}</p>
                )}
              </div>

              {/* Conversões */}
              <div>
                <Label htmlFor="conversoes">
                  Conversões <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="conversoes"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.conversoes}
                  onChange={(e) => handleChange('conversoes', e.target.value)}
                  className={errors.conversoes ? 'border-red-500' : ''}
                />
                {errors.conversoes && (
                  <p className="text-sm text-red-500 mt-1">{errors.conversoes}</p>
                )}
              </div>

              {/* Receita Gerada */}
              <div>
                <Label htmlFor="receita_gerada">
                  Receita Gerada (R$) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="receita_gerada"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.receita_gerada}
                  onChange={(e) => handleChange('receita_gerada', e.target.value)}
                  className={errors.receita_gerada ? 'border-red-500' : ''}
                />
                {errors.receita_gerada && (
                  <p className="text-sm text-red-500 mt-1">{errors.receita_gerada}</p>
                )}
              </div>

              {/* Impressões */}
              <div>
                <Label htmlFor="impressoes">
                  Impressões <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="impressoes"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.impressoes}
                  onChange={(e) => handleChange('impressoes', e.target.value)}
                  className={errors.impressoes ? 'border-red-500' : ''}
                />
                {errors.impressoes && (
                  <p className="text-sm text-red-500 mt-1">{errors.impressoes}</p>
                )}
              </div>

              {/* Cliques */}
              <div>
                <Label htmlFor="cliques">
                  Cliques <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cliques"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.cliques}
                  onChange={(e) => handleChange('cliques', e.target.value)}
                  className={errors.cliques ? 'border-red-500' : ''}
                />
                {errors.cliques && (
                  <p className="text-sm text-red-500 mt-1">{errors.cliques}</p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Campanha'}
              </Button>
              <Link href="/dashboard/marketing">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancelar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}