import {createSlice} from '@reduxjs/toolkit';
import {EmployeeFormData} from '../types/types';
import { createNotification } from '../notification/NotificationService';
import { addEmployeeNotification, deleteEmployeeNotification, updateEmployeeNotification } from '../notification/onPressNotification';

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
      createNotification(addEmployeeNotification(action.payload))
      // createNotification({title:"Congrats", message:"New Employee added successfully", soundName: 'created.wav', playSound: true,})
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state?.employees?.filter(
        emp => emp.id !== action.payload,
      );
      createNotification(deleteEmployeeNotification())
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees?.findIndex(
        emp => emp?.id === action.payload?.id,
      );
      if (index !== -1) {
        state.employees[index] = {...action.payload};
        createNotification(updateEmployeeNotification(action.payload))
      }
    },
  },
});

export const {addEmployee, deleteEmployee, updateEmployee, setEmployeeData} =
  EmployeeSlice.actions;
export default EmployeeSlice.reducer;
