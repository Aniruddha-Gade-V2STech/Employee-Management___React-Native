import React from 'react';
import 'react-native-reanimated';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import DrawerStack from './src/navigation/drawer/Drawer';
import {navigationRef} from './src/navigation/NavigationService';
import Color from './src/utils/Color';
import Header from './src/components/Header';

// Define Custom Themes
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.white_bg,
    text: Color.white_text,
    card: Color.white_card,
    border: '#959595',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Color.dark_bg,
    text: Color.dark_text,
    card: Color.dark_card,
    // border:'#595959',
    border: Color.dark_border,
  },
};

const MainApp = () => {
  const isDarkMode = useSelector(state => state?.theme?.isDarkMode);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={isDarkMode ? CustomDarkTheme : CustomLightTheme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#FFFFFF'}
      />
      <Header />
      <DrawerStack />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
