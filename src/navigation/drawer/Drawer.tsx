import {createDrawerNavigator} from '@react-navigation/drawer';

import React from 'react';
import {PATH, } from '../../constants';
import HomeStack from '../HomeStack';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      // initialRouteName={TAB_ROUTE_NAME.EMPLOYEE_FORM}
      drawerContent={() => <DrawerContent />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen name={PATH.HOME} component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
