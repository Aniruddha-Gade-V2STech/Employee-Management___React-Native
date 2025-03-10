import {createSlice} from '@reduxjs/toolkit';
import {EmployeeFormData} from '../types/types';

const initialState = {
  employees: [],
  // employees: EMPLOYEE_DATA,
};

const EmployeeSlice = createSlice({
  name: 'employee',
  initialState: initialState,
  reducers: {
    setEmployeeData: (state, action: PayloadAction<EmployeeFormData[]>) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = [...state.employees, action.payload];
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state?.employees?.filter(
        emp => emp.id !== action.payload,
      );
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees?.findIndex(
        emp => emp?.id === action.payload?.id,
      );
      if (index !== -1) {
        state.employees[index] = {...action.payload};
      }
    },
  },
});

export const {addEmployee, deleteEmployee, updateEmployee, setEmployeeData} =
  EmployeeSlice.actions;
export default EmployeeSlice.reducer;
