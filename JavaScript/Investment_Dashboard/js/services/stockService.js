import { createCache } from './cache.js';
import { fetchWithRetry } from '../utils/http.js';

const cache = createCache(180000)

export async function getBrazilianStocks() {
  const cacheKey = 'brazilianStocks';
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetchWithRetry('https://brapi.dev/api/quote/list');
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();

    if (!data.stocks || !Array.isArray(data.stocks)) {
      throw new Error('Dados inválidos recebidos da API');
    }

    // Seleciona apenas os 5 primeiros ativos mais relevantes da resposta
    const top5 = data.stocks
      .slice(0, 5)
      .map(item => item.stock)
      .filter(stock => stock); // Remove valores undefined/null se houver

    cache.set(cacheKey, top5);
    return top5;
  } catch (error) {
    console.error('Erro ao buscar ações:', error);
    throw error; // Re-throw para que o chamador possa lidar
  }
}