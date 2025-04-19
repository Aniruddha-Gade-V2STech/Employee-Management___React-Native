import React, {useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {getPieChartData} from '../../utils/expense';
import {useNavigation, useTheme} from '@react-navigation/native';
import {isArrayLength, notEmpty} from '../../utils/validation';
import ExpenseTable from './components/ExpenseTable';
import {WIDTH} from '../../utils/helper';
import {useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {TAB_ROUTE_NAME} from '../../constants';
import {EmployeeExpenseType} from './types/type';

const EmployeeExpense = ({route}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {employeeId, employeeName} = route.params ?? {};
  const expenses = useSelector(
    (state: RootState) => state.expense?.expenses[employeeId] ?? [],
  );
  const pieData = useMemo(() => getPieChartData(expenses), [expenses]);

  // Handle Press Expense
  const onPressExpense = (item: EmployeeExpenseType) => {
    console.log('item = ', item);

    navigation.navigate(TAB_ROUTE_NAME.ADD_EXPENSE_FORM, {
      employeeId,
      // expenseId: item?.id,
      expenseData: item,
    });
  };

  return (
    <ScrollView style={{flex: 1, padding: 20, paddingBottom: 50}}>
      {/* Header */}
      <Text style={[styles.headerText, {color: colors.text}]}>
        Expense Overview
      </Text>

      {/* Employee Name */}
      {notEmpty(employeeName) && (
        <Text style={[styles.empName, {color: colors.text}]}>
          Hello {employeeName}!
        </Text>
      )}

      {isArrayLength(expenses) ? (
        <View>
          {/* Pie Chart */}
          <PieChart
            data={pieData}
            width={WIDTH - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          {/* Transaction History Table */}
          <Text style={[styles.tranXHistoryText, {color: colors.text}]}>
            Transaction History 💰
          </Text>
          <ExpenseTable expenses={expenses} onPress={onPressExpense} />
        </View>
      ) : (
        <View>
          <Text> No Data Found</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 16,
    borderRadius: 6,
    overflow: 'hidden',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tranXHistoryText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  headerText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  empName: {
    fontSize: 13,
    fontWeight: 'heavy',
    marginTop: 2,
  },
});

export default EmployeeExpense;
