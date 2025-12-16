import { formatCurrency } from '../utils/formatters.js';
import { convertWithRates } from '../services/currencyService.js';

export const ConverterCard = (rates, cryptos, container) => {
  const converterDiv = document.createElement('div');
  converterDiv.classList.add('converter');
  converterDiv.id = 'currency-converter'

  converterDiv.innerHTML = `
    <h3>💱 Conversor Universal</h3>
    
    <div class="converter-row">
      <input type="number" id="amount-input" value="1" min="0" step="0.01">
      <select id="from-currency">
        <option value="BTC">BTC (Bitcoin)</option>
        <option value="ETH">ETH (Ethereum)</option>
        <option value="USD" selected>USD (Dólar)</option>
        <option value="BRL">BRL (Real)</option>
        <option value="EUR">EUR (Euro)</option>
      </select>
    </div>
    
    <div class="converter-arrow">⇅</div>
    
    <div class="converter-row">
      <input type="number" id="result-output" readonly>
      <select id="to-currency">
        <option value="BTC">BTC (Bitcoin)</option>
        <option value="ETH">ETH (Ethereum)</option>
        <option value="USD">USD (Dólar)</option>
        <option value="BRL" selected>BRL (Real)</option>
        <option value="EUR">EUR (Euro)</option>
      </select>
    </div>
    
    <button id="convert-btn" class="btn-primary">Converter</button>
  `;
  container.appendChild(converterDiv)

  // Event listener para converter
  const convertBtn = document.getElementById('convert-btn');
  const amountInput = document.getElementById('amount-input');
  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  const resultOutput = document.getElementById('result-output');

  convertBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value) || 0;
    const from = fromSelect.value;
    const to = toSelect.value;

    const result = convert(amount, from, to, rates, cryptos);
    resultOutput.value = result.toFixed(8);
  });

  // Conversão automática ao digitar
  amountInput.addEventListener('input', () => convertBtn.click());
  fromSelect.addEventListener('change', () => convertBtn.click());
  toSelect.addEventListener('change', () => convertBtn.click());

  // Conversão inicial
  convertBtn.click();
}

const convert = (amount, from, to, rates, cryptos) => {
  // Crypto para fiat ou fiat para crypto
  const btc = cryptos.find(c => c.symbol === 'btc');
  const eth = cryptos.find(c => c.symbol === 'eth');

  const cryptoPrices = {
    BTC: btc?.current_price || 0,
    ETH: eth?.current_price || 0
  };

  // De crypto para USD
  if (from === 'BTC' || from === 'ETH') {
    const amountInUSD = amount * cryptoPrices[from];
    if (to === 'USD') return amountInUSD;
    return convertWithRates(amountInUSD, 'USD', to, rates);
  }

  // De fiat para crypto
  if (to === 'BTC' || to === 'ETH') {
    let amountInUSD = amount;
    if (from !== 'USD') {
      amountInUSD = convertWithRates(amount, from, 'USD', rates);
    }
    return amountInUSD / cryptoPrices[to];
  }

  // Fiat para fiat
  return convertWithRates(amount, from, to, rates);
}
