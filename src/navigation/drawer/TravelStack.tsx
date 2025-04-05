import {TAB_ROUTE_NAME} from '../../constants';
import MyMap from '../../travel/MyMap';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function TravelStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={TAB_ROUTE_NAME.MY_MAP}
        options={{headerShown: false}}
        component={MyMap}
      />
    </Stack.Navigator>
  );
}
