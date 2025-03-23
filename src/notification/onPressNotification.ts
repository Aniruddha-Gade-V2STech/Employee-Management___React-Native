import {TAB_ROUTE_NAME} from '../constants';
import Navigation from '../navigation/NavigationService';
import {EmployeeFormData} from '../types/types';

export const addEmployeeNotification = (employee: EmployeeFormData) => {
  return {
    title: 'Congrats Man...!',
    message: 'New Employee added successfully',
    soundName: 'create.mp3',
    playSound: true,
    // onPress: () => Navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_DETAILS, employee),

    screenName: TAB_ROUTE_NAME.EMPLOYEE_DETAILS,
    params: {employee},
  };
};

export const updateEmployeeNotification = (employee: EmployeeFormData) => {
  return {
    title: 'Yeah',
    message: 'Employee updated successfully...!',
    soundName: 'doremon.mp3',
    screenName: TAB_ROUTE_NAME.EMPLOYEE_DETAILS,
    params: {employee},
  };
};

export const deleteEmployeeNotification = () => {
  return {
    title: 'Husssh',
    message: 'Employee deleted successfully...!',
    soundName: 'delete.mp3',
  };
};

export const openEmployeeFormNotification = () => {
  return {
    title: 'Yup',
    message: 'Now create your Employee data',
    soundName: 'pikachu.mp3',
    screenName: TAB_ROUTE_NAME.EMPLOYEE_FORM,
  };
};

export const showAllEmployeesNotification = () => {
  return {
    title: 'Euu',
    message: 'Here is list of all employee',
    soundName: 'pikachu.mp3',
    screenName: TAB_ROUTE_NAME.EMPLOYEE_TAB,
  };
};
