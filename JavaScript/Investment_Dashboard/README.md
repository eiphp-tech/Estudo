# Dashboard de Investimento

Um painel interativo para acompanhar criptomoedas e realizar conversões de moedas em tempo real, desenvolvido em JavaScript puro.

## 📋 Descrição

Este projeto é um dashboard educacional que exibe dados de criptomoedas (como Bitcoin e Ethereum) e oferece um conversor universal para moedas fiat (USD, BRL, EUR) e criptos. Os dados são obtidos de APIs públicas e atualizados automaticamente.

**⚠️ Aviso:** Este é um projeto para fins educacionais apenas. Não use para decisões de investimento reais, pois os dados podem não ser 100% precisos ou atualizados.

## ✨ Funcionalidades

- **Exibição de Criptomoedas**: Mostra as top 4 criptomoedas por capitalização de mercado, com preço atual, variação 24h e dados adicionais.
- **Conversor Universal**: Converte entre criptos (BTC, ETH) e moedas fiat (USD, BRL, EUR) em tempo real.
- **Layout Responsivo**: Design 50/50 horizontal em desktop, empilhado em mobile.
- **Cache Inteligente**: Dados são armazenados em cache para reduzir chamadas à API.
- **Atualização Manual**: Botão para forçar atualização dos dados.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: JavaScript (ES6+), HTML5, CSS3 (SASS)
- **APIs**:
  - [CoinGecko API](https://www.coingecko.com/en/api) - Dados de criptomoedas
  - [ExchangeRate-API](https://exchangerate-api.com/) - Taxas de câmbio
- **Ferramentas**:
  - SASS para estilos
  - Fetch API para requisições HTTP
  - Local Storage para cache

## 🚀 Como Instalar e Rodar

### Pré-requisitos

- Node.js instalado (para o servidor local)
- Navegador moderno

### Passos

1. **Clone ou baixe o repositório**:

   ```
   git clone <url-do-repositorio>
   cd Investment_Dashboard
   ```

2. **Compile os estilos SASS** (opcional, se quiser editar):

   - Instale SASS globalmente: `npm install -g sass`
   - Compile: `sass styles/main.scss styles/main.css`

3. **Inicie o servidor local**:

   ```
   npx serve
   ```

   - Abra `http://localhost:3000` no navegador.

4. **Alternativa sem Node.js**:
   - Abra `index.html` diretamente no navegador, mas pode haver restrições de CORS para as APIs.

## 📁 Estrutura do Projeto

```
Investment_Dashboard/
├── index.html                 # Página principal
├── js/
│   ├── app.js                 # Lógica principal da aplicação
│   ├── components/
│   │   ├── converter.js       # Componente do conversor
│   │   └── cryptoCard.js      # Componente dos cards de cripto
│   ├── services/
│   │   ├── cache.js           # Sistema de cache
│   │   ├── cryptoService.js   # Serviço para API de criptos
│   │   ├── currencyService.js # Serviço para API de câmbio
│   └── utils/
│       ├── calculations.js    # Funções de cálculo
│       ├── formatters.js      # Funções de formatação
│       └── http.js            # Utilitários HTTP com retry
├── styles/
│   ├── main.scss              # Estilos SASS
│   └── main.css               # Estilos compilados
└── README.md                  # Este arquivo
```

## 🔧 Configuração

- **APIs**: As chaves de API são gratuitas e não requerem cadastro (exceto se exceder limites).
- **Cache**: TTL padrão de 3-5 minutos para evitar overuse das APIs.
- **Responsividade**: Testado em desktop (1200px+) e mobile (768px-).

## 🤝 Contribuição

Sinta-se à vontade para contribuir! Abra issues para bugs ou sugestões, ou envie pull requests.

## 📄 Licença

Este projeto é open-source e distribuído sob a licença MIT. Use por sua conta e risco.

---

Desenvolvido com ❤️ para aprendizado em JavaScript e APIs.</content>
