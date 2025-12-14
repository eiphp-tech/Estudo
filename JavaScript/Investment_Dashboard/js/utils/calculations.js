export function convertCurrency(amount, fromRate, toRate) {
  return (amount * fromRate) / toRate;
}

export function calculatePercentChange(oldValue, newValue) {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

export function calculateROI(invested, current) {
  if (invested === 0) return 0;
  return ((current - invested) / invested) * 100;
}
