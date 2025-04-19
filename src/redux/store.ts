import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './ThemeSlice';
import EmployeeSlice from './EmployeeSlice';
import ExpenseSlice from './expense/ExpenseSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    employee: EmployeeSlice,
    expense: ExpenseSlice,
  },
});

export default store;
