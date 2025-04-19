import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {EMPLOYEE_EXPENSES_DATA} from '../../constants/expense/tempEmployeeExpenses';
import {
  EmployeeExpenseType,
  ExpensePayload,
  ExpenseState,
} from '../../screens/expense/types/type';

const initialState: ExpenseState = {
  expenses: EMPLOYEE_EXPENSES_DATA ?? {},
};

const employeeExpenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpensePayload>) => {
      const {employeeId, expense} = action.payload;
      if (state.expenses[employeeId]) {
        state.expenses[employeeId].push(expense);
      } else {
        state.expenses[employeeId] = [expense];
      }
    },

    deleteExpense: (
      state,
      action: PayloadAction<{employeeId: string; expenseId: string}>,
    ) => {
      const {employeeId, expenseId} = action.payload;
      state.expenses[employeeId] = state.expenses[employeeId]?.filter(
        expense => expense.id !== expenseId,
      );
    },

    updateExpense: (
      state,
      action: PayloadAction<{employeeId: string; expense: EmployeeExpenseType}>,
    ) => {
      const {employeeId, expense} = action.payload;
      console.log('employeeId, expense SLICE = ', employeeId, expense);

      const index = state.expenses[employeeId]?.findIndex(
        exp => exp?.id === expense?.id,
      );
      if (index !== -1) {
        state.expenses[employeeId][index] = expense;
      }
    },

    setAllExpenses: (state, action: PayloadAction<ExpenseState>) => {
      return action.payload;
    },
  },
});

export const selectEmployeeExpenses = (employeeId: string) =>
  createSelector(
    state => state.expense.expenses,
    expenses => expenses[employeeId] ?? [],
  );

export const {addExpense, deleteExpense, updateExpense, setAllExpenses} =
  employeeExpenseSlice.actions;

export default employeeExpenseSlice.reducer;
