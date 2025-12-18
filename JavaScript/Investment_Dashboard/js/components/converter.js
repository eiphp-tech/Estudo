import { convertWithRates } from '../services/currencyService.js';

export const ConverterCard = (rates, cryptos, container) => {
  const converterDiv = document.createElement('div');
  converterDiv.classList.add('converter');
  converterDiv.id = 'currency-converter'

  converterDiv.innerHTML = `
    <h3>💱 Conversor Universal</h3>
    
    <div class="rates-display">
      <small>Taxas atuais (base USD):</small>
      <div id="rates-info"></div>
    </div>
    
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

  // Exibir taxas atuais
  const ratesInfo = document.getElementById('rates-info');
  if (rates) {
    ratesInfo.innerHTML = `
      1 USD = ${rates.EUR?.toFixed(2) || 'N/A'} EUR<br>
      1 USD = ${rates.BRL?.toFixed(2) || 'N/A'} BRL
    `;
  } else {
    ratesInfo.innerHTML = 'Taxas não disponíveis';
  }

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

    if (amount <= 0) {
      resultOutput.value = '0.00';
      return;
    }

    console.log('Convertendo:', { amount, from, to, rates: rates ? 'OK' : 'Faltando', cryptos: cryptos.length });
    const result = convert(amount, from, to, rates, cryptos);
    console.log('Resultado:', result);
    const isCrypto = to === 'BTC' || to === 'ETH';
    resultOutput.value = isCrypto ? result.toFixed(8) : result.toFixed(2);
  });

  // Conversão automática ao digitar
  amountInput.addEventListener('input', () => convertBtn.click());
  fromSelect.addEventListener('change', () => convertBtn.click());
  toSelect.addEventListener('change', () => convertBtn.click());

  // Conversão inicial
  convertBtn.click();
}

const convert = (amount, from, to, rates, cryptos) => {
  console.log('Função convert chamada com:', { amount, from, to });
  if (!rates || !cryptos || cryptos.length === 0) {
    console.warn('Dados insuficientes para conversão: rates ou cryptos não disponíveis');
    return 0;
  }

  // Encontrar preços das cryptos
  const btc = cryptos.find(c => c.symbol.toLowerCase() === 'btc');
  const eth = cryptos.find(c => c.symbol.toLowerCase() === 'eth');
  const cryptoPrices = {
    BTC: btc?.current_price || 0,
    ETH: eth?.current_price || 0
  };
  console.log('Preços das cryptos:', cryptoPrices);

  // Passo 1: Converter amount para USD
  let amountInUSD;
  if (from === 'BTC' || from === 'ETH') {
    if (cryptoPrices[from] === 0) {
      console.warn(`Preço da crypto ${from} não disponível`);
      return 0;
    }
    amountInUSD = amount * cryptoPrices[from];
    console.log('Amount in USD from crypto:', amountInUSD);
  } else {
    // Fiat
    if (!rates[from]) {
      console.warn(`Taxa para ${from} não disponível`);
      return 0;
    }
    amountInUSD = amount / rates[from];
    console.log('Amount in USD from fiat:', amountInUSD);
  }

  // Passo 2: Converter de USD para a moeda final
  let result;
  if (to === 'BTC' || to === 'ETH') {
    if (cryptoPrices[to] === 0) {
      console.warn(`Preço da crypto ${to} não disponível`);
      return 0;
    }
    result = amountInUSD / cryptoPrices[to];
    console.log('Resultado para crypto:', result);
  } else {
    // Fiat
    if (!rates[to]) {
      console.warn(`Taxa para ${to} não disponível`);
      return 0;
    }
    result = amountInUSD * rates[to];
    console.log('Resultado para fiat:', result);
  }

  return result;
}
