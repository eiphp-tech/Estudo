export async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }
    catch (error) {
      const isLastAttempt = attempt === maxRetries;

      console.warn(`⚠️ Tentativa ${attempt}/${maxRetries} falhou:`, error.message);
      if (isLastAttempt) {
        throw new Error(`Falha após ${maxRetries} tentativas: ${error.message}`)
      }

      await new Promise(res => setTimeout(res, 1000 * attempt));
    }
  }
}