export function formatSalary(amount: number) {
  if (amount > 9999999) {
    return `${Math.min(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount > 99999) {
    return `${Math.min(amount / 100000).toFixed(2)}L`;
  }
  if (amount > 999) {
    return `${Math.min(amount / 1000).toFixed(2)}K`;
  } else {
    return amount;
  }
}
