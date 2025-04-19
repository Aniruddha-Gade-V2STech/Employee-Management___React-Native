import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {EmployeeExpenseType} from '../types/type';
import {RootState} from '@reduxjs/toolkit/query';
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../../../redux/expense/ExpenseSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import {useEffect} from 'react';

export const useExpenseForm = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {employeeId, expenseData} = route.params ?? {};
  const isEdit = !!expenseData;

  // console.log('expenseData >>>>>>>>>>  ',expenseData);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Omit<EmployeeExpenseType, 'id'>>({
    defaultValues: {
      type: '',
      amount: 0,
      label: '',
      date: new Date().toISOString().split('T')[0],
    },
    mode: 'onChange',
  });

  // Auto fill the form if edit expense
  useEffect(() => {
    if (expenseData) {
      reset({
        type: expenseData?.type ?? 'incoming',
        amount: expenseData?.amount ?? 0,
        label: expenseData?.label ?? '',
        date: expenseData?.date ?? new Date().toISOString().split('T')[0],
      });
    }
  }, [expenseData, reset]);

  const employeExpenses = useSelector(
    (state: RootState) => state.expense?.expenses[employeeId] ?? [],
  );

  // Handle Submit
  const onSubmit = (data: Omit<EmployeeExpenseType, 'id'>) => {
    const newExpense: EmployeeExpenseType = {
      ...data,
      id: isEdit ? expenseData?.id : Date.now().toString(),
    };

    if (isEdit) {
      dispatch(updateExpense({employeeId, expense: newExpense}));
      Alert.alert('Success', 'Expense updated successfully!');
    } else {
      dispatch(addExpense({employeeId, expense: newExpense}));
      Alert.alert('Success', 'Expense added successfully!');
    }

    navigation.goBack();
  };

  const onDelete = () => {
    Alert.alert('Delete Expense', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          dispatch(deleteExpense({employeeId, expenseId: expenseData?.id}));
          Alert.alert('Deleted', 'Expense deleted successfully');
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    employeExpenses,
    onDelete,
    isEdit,
  };
};
