import { formatCurrency, formatPercentage } from '../utils/formatters.js';

export const cryptoCard = (crypto, container) => {
  const card = document.createElement('div');
  card.className = 'card crypto-card';
  card.dataset.id = crypto.id;

  const change24h = crypto.price_change_percentage_24h || 0;
  const changeClass = change24h >= 0 ? 'positive' : 'negative';
  const changeSymbol = change24h >= 0 ? '↑' : '↓';

  card.innerHTML = `
  <div class="card-header">
      <img src="${crypto.image}" alt="${crypto.name}" class="crypto-icon">
      <div class="crypto-info">
        <h3>${crypto.symbol.toUpperCase()}</h3>
        <span class="crypto-name">${crypto.name}</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="crypto-price">
        ${formatCurrency(crypto.current_price, 'USD')}
      </div>
      
      <div class="crypto-change ${changeClass}">
        <span class="change-icon">${changeSymbol}</span>
        <span>${formatPercentage(Math.abs(change24h))}</span>
      </div>
    </div>
    
    <div class="card-footer">
      <small>Market Cap: $${(crypto.market_cap / 1e9).toFixed(2)}B</small>
    </div>`

  container.appendChild(card);
}