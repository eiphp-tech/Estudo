import { getTopCryptos, clearCryptoCache } from './services/cryptoService.js';
import { getBrazilianStocks } from './services/stockService.js';
import { getExchangeRates } from './services/currencyService.js';
import { renderCryptoCard } from './components/cryptoCard.js';
import { renderStockCard } from './components/stockCard.js';
import { renderConverter } from './components/converter.js';