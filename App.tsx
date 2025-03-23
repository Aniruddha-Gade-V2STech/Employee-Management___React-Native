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
// import firebase from '@react-native-firebase/app';
import firebase from '@react-native-firebase/app';

console.log('Firebase:', firebase);


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

// const firebaseConfig = {
//   apiKey: 'AIzaSyAz8w9l8kHzb1N6ksyr_dSLXX_1bP0gUyE',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'employment-management-1bbde',
//   storageBucket: 'employment-management-1bbde.firebasestorage.app',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: '1:1042318389600:android:6d8750bb7e3d4db690ee05',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAz8w9l8kHzb1N6ksyr_dSLXX_1bP0gUyE',
  authDomain: 'employment-management-1bbde.firebaseapp.com',
  projectId: 'employment-management-1bbde',
  storageBucket: 'employment-management-1bbde.appspot.com',
  messagingSenderId: '1042318389600',
  appId: '1:1042318389600:android:6d8750bb7e3d4db690ee05',
};


console.log('firebase.apps = ', firebase.apps)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase Initialized');
} else {
  console.log('Not Initialized Firebase');
}




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
