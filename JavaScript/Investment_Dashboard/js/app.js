import { getTopCryptos, clearCryptoCache } from './services/cryptoService.js';
import { getExchangeRates } from './services/currencyService.js';
import { cryptoCard } from './components/cryptoCard.js';
import { ConverterCard } from './components/converter.js';

// function showError; showLoading; 

const showLoading = (containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '<div class="loading">⏳ Carregando...</div>'
}

const showError = (containerId, message) => {
  const container = document.getElementById(containerId);
  container.innerHTML = `<div class="error">❌ ${message}</div>`;
}

async function loadCryptos() {
  const container = document.getElementById('crypto-container');
  showLoading('crypto-container');
  try {
    const cryptos = await getTopCryptos(4)
    container.innerHTML = '';
    cryptos.forEach(crypto => {
      cryptoCard(crypto, container);
    })
    return cryptos;
  } catch (error) {
    showError('crypto-container', 'Erro ao carregar cryptos')
    throw error
  }
}

async function loadConverter(cryptos) {
  const container = document.getElementById('converter-container');
  showLoading('converter-container');
  try {
    const rates = await getExchangeRates();
    container.innerHTML = '';
    ConverterCard(rates, cryptos, container);

  } catch (error) {
    showError('converter-container', 'Erro ao carregar conversor')
    throw error
  }
}

function setupRefreshButton() {
  const refreshBtn = document.getElementById('refresh-btn');

  refreshBtn.addEventListener('click', async () => {
    refreshBtn.disabled = true;
    refreshBtn.textContent = '🔄 Atualizando...';

    clearCryptoCache();
    await init();

    refreshBtn.disabled = false;
    refreshBtn.textContent = '🔄 Atualizar';
  });
}

function updateLastRefresh() {
  const lastRefreshEl = document.getElementById('last-refresh');
  const now = new Date().toLocaleTimeString('pt-BR');
  lastRefreshEl.textContent = `Última atualização: ${now}`;
}

async function init() {
  console.log('🚀 Iniciando Investment Dashboard...')

  try {
    const cryptos = await loadCryptos();
    await loadConverter(cryptos);
    updateLastRefresh();
    console.log('✅ Dashboard carregado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar dashboard:', error)
    throw error;
  }
}

init();

// Setup de botões
setupRefreshButton();