export const formatCurrency = (value, currency = 'USD') => {
  const locale = currency === 'BRL' ? 'pt-BR' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export const formatPercentage = (value) => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatLargeNumber(value) {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T';
  if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B';
  if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M';
  if (value >= 1e3) return (value / 1e3).toFixed(2) + 'K';
  return value.toFixed(2);
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('pt-BR');
}

export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('pt-BR');
}