import { createCache } from './cache.js';
import { fetchWithRetry } from '../utils/http.js';

const cache = createCache(120000);

export async function getTopCryptos(limit = 4) {
  const cacheKey = `topCrypto_${limit}`;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false&price_change_percentage=24h,7d`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const data = await fetchWithRetry(url);
  cache.set(cacheKey, data);

  return data;
}

export async function getTopCryptoById(id) {
  const cacheKey = `cryptoById_${id}`;
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const data = await fetchWithRetry(url);
  cache.set(cacheKey, data);
  return data;
}

export async function clearCryptoCache() {
  cache.clear();
}