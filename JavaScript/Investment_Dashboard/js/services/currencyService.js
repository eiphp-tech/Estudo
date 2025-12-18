import { createCache } from './cache.js';
import { fetchWithRetry } from '../utils/http.js';

const cache = createCache(300000); // Cache for 5 minutes
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function getExchangeRates() {
  const cacheKey = 'exchangeRates';
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const data = await fetchWithRetry(API_URL);
  cache.set(cacheKey, data.rates);
  return data.rates;
}


export async function convertWithRates(amount, from, to, rates) {
  if (!rates || !rates[from] || !rates[to]) {
    console.warn('Taxas de câmbio não disponíveis para conversão');
    return 0;
  }

  if (from === 'USD') {
    return amount * rates[to];
  } else if (to === 'USD') {
    return amount / rates[from];
  } else {
    const amountInUSD = amount / rates[from];
    return amountInUSD * rates[to];
  }
}