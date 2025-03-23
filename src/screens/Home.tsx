import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {DrawerActions, useNavigation, useTheme} from '@react-navigation/native';
import {LABEL, TAB_ROUTE_NAME} from '../constants';
import Color from '../utils/Color';
import {
  cancelAllLocalNotifications,
  createNotification,
  getDeliveredNotifications,
  removeAllDeliveredNotifications,
} from '../notification/NotificationService';
import {
  openEmployeeFormNotification,
  showAllEmployeesNotification,
} from '../notification/onPressNotification';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

const Button = ({onPress, style, title, titleStyle}: Readonly<ButtonProps>) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.notificationButton, style]}>
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>{LABEL.EMPLOYEE_MANAGEMENT}</Text>
      </View>

      {/* Notification buttons */}
      <View style={styles.notificationContainer}>
        <Button
          title="Get Nofification"
          onPress={() =>
            createNotification({
              title: 'Euuu',
              message: 'We are on home screen',
              screenName: TAB_ROUTE_NAME.HOME_TAB,
            })
          }
        />

        <Button
          title="Nofification for form"
          onPress={() => createNotification(openEmployeeFormNotification())}
        />

        <Button
          title="Nofification for Employee list"
          onPress={() => createNotification(showAllEmployeesNotification())}
        />

        <Button
          title="Get Delivered Notifications"
          onPress={getDeliveredNotifications}
        />

        <Button
          title="Cancel All Local Nofification"
          onPress={cancelAllLocalNotifications}
          style={{backgroundColor: Color.red}}
          titleStyle={{color: Color.white}}
        />

        <Button
          title="Remove All Delivered Notifications"
          onPress={removeAllDeliveredNotifications}
          style={{backgroundColor: Color.red}}
          titleStyle={{color: Color.white}}
        />
      </View>

      <Text style={[styles.text, {color: colors.text}]}>Home</Text>
      <Button
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Open Menu"
        style={styles.menuButton}
        titleStyle={[styles.menuText, {color: colors.text}]}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.orange,
  },
  menuText: {
    fontSize: 18,
  },
  text: {
    fontSize: 25,
    fontWeight: '900',
    marginTop: 50,
  },
  clickDown: {
    color: Color.orange,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  headline: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 25,
  },
  headlineContainer: {
    backgroundColor: Color.light_grey,
    padding: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  notificationButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {color: 'orange', fontWeight: '900'},
  notificationContainer: {
    gap: 10,
    marginBottom: 10,
  },
});
