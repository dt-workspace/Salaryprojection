import { nextThresholds, nextThresholdYears } from "../assets/uidata";
import {
  calculateExpenseWithInflation,
  calculateSalaryWithHike,
  calculateSavings,
} from "./salaryFormater";

export const nextYearsSavings = (
  salary: number,
  hike: number,
  expense: number,
  inflation: number,
): number[] => {
  const savingsPerYear: number[] = [];
  for (let i = 1; i <= 20; i++) {
    const savings = calculateSavings(salary, expense);
    savingsPerYear.push(savings);
    salary = calculateSalaryWithHike(salary, hike);
    expense = calculateExpenseWithInflation(expense, inflation);
  }
  return savingsPerYear;
};

type salaryProps = {
  salary: number;
  hike: number;
  expense: number;
  inflation: number;
  currentDate: Date;
};

export function nextYearsSalary({
  salary,
  hike,
  expense,
  inflation,
  currentDate,
}: salaryProps) {
  let monthly = nextYearsSavings(
    salary,
    hike,
    expense,
    inflation,
  );
  let totalSaving = 0;
  let format = monthly.map((m, i) => {
    const yearlyIncome = Math.round(m * 12);
    totalSaving += yearlyIncome;
    return {
      salary: Math.round(m),
      isTarget: false,
      isOnTime: false,
      year: currentDate.getFullYear() + i,
      yearly: yearlyIncome,
      saving: totalSaving,
    };
  });

  for (const [index, threshold] of nextThresholds.entries()) {
    let nextThreshold = format.findIndex((item) => item.salary > threshold);
    if (nextThreshold != -1) {
      format[nextThreshold] = {
        ...format[nextThreshold],
        isTarget: true,
        isOnTime: format[nextThreshold].year <= nextThresholdYears[index],
      };
    }
  }
  return {
    salaries: format,
  };
}
