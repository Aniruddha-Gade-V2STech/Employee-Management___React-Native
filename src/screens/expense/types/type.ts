
export type ExpenseType = 'incoming' | 'outgoing';

export interface EmployeeExpenseType {
  id: string;
  type: ExpenseType;
  amount: number;
  label: string;
  date: string;
}

export interface ExpensePayload {
  employeeId: string;
  expense: EmployeeExpenseType;
}

export interface ExpenseState {
  expenses: {
    [employeeId: string]: EmployeeExpenseType[];
  };
}