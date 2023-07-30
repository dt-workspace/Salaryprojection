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
export const calculateSavings = (salary: number, expense: number): number => {
  return salary - expense;
};

export const calculateSalaryWithHike = (
  salary: number,
  hike: number
): number => {
  return salary * ((100 + hike) / 100);
};

export const calculateExpenseWithInflation = (
  expense: number,
  inflation: number
): number => {
  return expense * ((100 + inflation) / 100);
};
