import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './ThemeSlice';
import EmployeeSlice from './EmployeeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    employee: EmployeeSlice,
  },
});

export default store;
