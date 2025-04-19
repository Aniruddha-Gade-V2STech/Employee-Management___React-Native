import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TAB_ROUTE_NAME} from '../constants';
import Home from '../screens/Home';
import EmployeeList from '../screens/EmployeeList';
import EmployeeForm from '../screens/EmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';
import EmployeeExpense from '../screens/expense/EmployeeExpense';
import ExpenseForm from '../screens/expense/components/ExpenseForm';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={TAB_ROUTE_NAME.HOME_TAB}>
      <Stack.Screen
        name={TAB_ROUTE_NAME.HOME_TAB}
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen
        name={TAB_ROUTE_NAME.EMPLOYEE_TAB}
        options={{headerShown: false}}
        component={EmployeeList}
      />
      <Stack.Screen
        name={TAB_ROUTE_NAME.EMPLOYEE_FORM}
        options={{headerShown: false}}
        component={EmployeeForm}
      />

      <Stack.Screen
        name={TAB_ROUTE_NAME.EMPLOYEE_DETAILS}
        options={{headerShown: false}}
        component={EmployeeDetails}
      />

      <Stack.Screen
        name={TAB_ROUTE_NAME.EMPLOYEE_EXPENSE}
        options={{headerShown: false}}
        component={EmployeeExpense}
      />
      <Stack.Screen
        name={TAB_ROUTE_NAME.ADD_EXPENSE_FORM}
        options={{headerShown: false}}
        component={ExpenseForm}
      />
    </Stack.Navigator>
  );
}
