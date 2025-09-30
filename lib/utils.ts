// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';

// Timezone padrão do sistema
const TIMEZONE = 'America/Fortaleza';

/**
 * Merge de classes CSS (Tailwind + clsx)
 * Padrão shadcn/ui
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata valor para moeda brasileira (BRL)
 * @param value - Número a ser formatado
 * @param showSymbol - Mostrar símbolo R$ (padrão: true)
 */
export function formatCurrency(value: number, showSymbol: boolean = true): string {
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return showSymbol ? formatted : formatted.replace('R$', '').trim();
}

/**
 * Formata número com separadores de milhar
 * @param value - Número a ser formatado
 * @param decimals - Casas decimais (padrão: 0)
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Formata valor para porcentagem
 * @param value - Número a ser formatado (ex: 0.15 = 15%)
 * @param decimals - Casas decimais (padrão: 1)
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${formatNumber(value * 100, decimals)}%`;
}

/**
 * Formata valor já em porcentagem (ex: 15 = 15%)
 * @param value - Número já em porcentagem
 * @param decimals - Casas decimais (padrão: 1)
 */
export function formatPercentValue(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Formata data para string no formato brasileiro
 * @param date - Data (string ISO ou Date)
 * @param formatStr - Formato (padrão: 'dd/MM/yyyy')
 */
export function formatDate(
  date: string | Date,
  formatStr: string = 'dd/MM/yyyy'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const zonedDate = toZonedTime(dateObj, TIMEZONE);
    return format(zonedDate, formatStr, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
}

/**
 * Formata data e hora no timezone America/Fortaleza
 * @param date - Data (string ISO ou Date)
 * @param formatStr - Formato (padrão: 'dd/MM/yyyy HH:mm')
 */
export function formatDateTime(
  date: string | Date,
  formatStr: string = 'dd/MM/yyyy HH:mm'
): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatInTimeZone(dateObj, TIMEZONE, formatStr, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data/hora:', error);
    return 'Data inválida';
  }
}

/**
 * Formata data relativa (ex: "há 2 horas", "ontem")
 * Simplificado - para versão completa usar date-fns/formatDistanceToNow
 */
export function formatRelativeDate(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMinutes < 1) return 'agora';
    if (diffMinutes < 60) return `há ${diffMinutes} min`;
    if (diffHours < 24) return `há ${diffHours}h`;
    if (diffDays === 1) return 'ontem';
    if (diffDays < 7) return `há ${diffDays} dias`;
    return formatDate(date);
  } catch (error) {
    console.error('Erro ao formatar data relativa:', error);
    return 'Data inválida';
  }
}

/**
 * Converte string de data (dd/MM/yyyy) para ISO (yyyy-MM-dd)
 * @param dateStr - Data no formato brasileiro (dd/MM/yyyy)
 */
export function brDateToISO(dateStr: string): string {
  try {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch (error) {
    console.error('Erro ao converter data BR para ISO:', error);
    return '';
  }
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida se string é uma data válida (ISO ou BR)
 */
export function isValidDate(dateStr: string): boolean {
  try {
    // Tenta ISO
    if (dateStr.includes('-')) {
      const date = parseISO(dateStr);
      return !isNaN(date.getTime());
    }
    // Tenta BR
    if (dateStr.includes('/')) {
      const iso = brDateToISO(dateStr);
      const date = parseISO(iso);
      return !isNaN(date.getTime());
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Trunca texto com reticências
 * @param text - Texto a truncar
 * @param maxLength - Tamanho máximo
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitaliza primeira letra
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Formata número compacto (1000 → 1K, 1000000 → 1M)
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1000000) {
    return `${formatNumber(value / 1000000, 1)}M`;
  }
  if (value >= 1000) {
    return `${formatNumber(value / 1000, 1)}K`;
  }
  return formatNumber(value);
}

/**
 * Calcula variação percentual entre dois valores
 * @param current - Valor atual
 * @param previous - Valor anterior
 * @returns Variação em porcentagem (ex: 0.15 = +15%)
 */
export function calculateVariation(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 1 : 0;
  return (current - previous) / previous;
}

/**
 * Formata variação com sinal e cor
 * @param variation - Variação (ex: 0.15 = +15%)
 * @returns Objeto com texto formatado e classe CSS
 */
export function formatVariation(variation: number): {
  text: string;
  className: string;
  isPositive: boolean;
} {
  const isPositive = variation > 0;
  const sign = isPositive ? '+' : '';
  const text = `${sign}${formatPercent(variation)}`;
  const className = isPositive
    ? 'text-green-600 dark:text-green-400'
    : variation < 0
    ? 'text-red-600 dark:text-red-400'
    : 'text-gray-600 dark:text-gray-400';

  return { text, className, isPositive };
}

/**
 * Debounce - Atrasa execução de função
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Sleep/delay assíncrono
 * @param ms - Milissegundos
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Gera ID único simples (não usar em produção crítica)
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Objeto vazio (checa se objeto não tem propriedades)
 */
export function isEmpty(obj: any): boolean {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Deep clone simples (não funciona com Dates, Functions, etc)
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Export do timezone para uso em outros módulos
export { TIMEZONE };