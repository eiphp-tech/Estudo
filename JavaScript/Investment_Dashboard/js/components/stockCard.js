import { formatCurrency, formatPercent } from '../utils/formatters.js';

export const stockCard = (stock, container) => {
  const card = document.createElement('div');
  card.className = 'card stock-card';
  card.dataset.symbol = stock.symbol;

  const change = stock.regularMarketChangePercent || 0;
  const changeClass = change >= 0 ? 'positive' : 'negative';
  const changeSymbol = change >= 0 ? '↑' : '↓';

  card.innerHTML = `
  <div class="card-header">
      <div class="stock-info">
        <h3>${stock.symbol}</h3>
        <span class="stock-name">${stock.shortName || stock.longName}</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="stock-price">
        ${formatCurrency(stock.regularMarketPrice, 'BRL')}
      </div>
      
      <div class="stock-change ${changeClass}">
        <span class="change-icon">${changeSymbol}</span>
        <span>${formatPercent(Math.abs(change))}</span>
      </div>
    </div>
    
    <div class="card-footer">
      <small>${stock.marketCap ? `Market Cap: ${formatCurrency(stock.marketCap, 'BRL')}` : 'Dados indisponíveis'}</small>
    </div>`

  container.appendChild(card);
}