import PushNotification from 'react-native-push-notification';
import {Platform, PermissionsAndroid} from 'react-native';
import Navigation from '../navigation/NavigationService';

// Configure notifications
PushNotification.configure({
  onNotification: function (notification: any) {
    console.log('Notification received:', notification);

    // Check if notification has a user interaction and onPress function
    if (notification?.userInteraction && notification?.data) {
      try {
        const {screenName, params} = notification?.data ?? {};

        if (screenName) {
          console.log(`Navigating to ${screenName} with params:`, params);
          Navigation.navigate(screenName, params);
        } else {
          console.warn('No screenName found in notification data.');
        }
      } catch (error) {
        console.error('Error executing onPress:', error);
      }

      // try {
      //   const onPressFunction = notification?.data?.onPress;
      //   if (typeof onPressFunction === 'function') {
      //     onPressFunction();
      //   } else {
      //     console.warn('onPress is not a function:', onPressFunction);
      //   }
      // } catch (error) {
      //   console.error('Error executing onPress:', error);
      // }
    }
  },

  requestPermissions: true,
});

// Create Notification Channel (Only required for Android API 26+)
PushNotification.createChannel(
  {
    channelId: 'default-channel',
    channelName: 'Default Channel',
    channelDescription: 'A default channel for notifications',
    importance: PushNotification.Importance.HIGH,
    vibrate: true,
    soundName: 'home.mp3',
  },
  (created: boolean) => console.log(`Notification Channel created: ${created}`),
);

type NotificationOptions = {
  channelId?: string;
  title?: string;
  message?: string;
  playSound?: boolean;
  soundName?: string;
  importance?: number;
  vibrate?: boolean;
  largeIcon?: string;
  smallIcon?: string;
  color?: string;
  number?: number;
  actions?: string[];
  [key: string]: any;
};

// ======================= Create a notification =======================
export const createNotification = (options: NotificationOptions) => {
  const {soundName = 'home.mp3', screenName, params, ...rest} = options;

  const finalOptions: NotificationOptions = {
    channelId: 'default-channel',
    title: 'Notification',
    message: 'You have a new message!',
    playSound: true,
    soundName,
    importance: PushNotification.Importance.HIGH,
    vibrate: true,
    data: {screenName, params}, // Store in data
    ...rest,
  };

  console.log('Creating Notification:', finalOptions);

  PushNotification.localNotification(finalOptions);
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  }
};
requestNotificationPermission();

// ======================== Cancel All Local Notifications ========================
// Cancels all scheduled notifications AND clears the notifications alerts that are in the notification centre.
export const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

// ======================== Remove All Delivered Notifications ========================
// Remove all delivered notifications from Notification Center
export const removeAllDeliveredNotifications = () => {
  PushNotification.removeAllDeliveredNotifications();
};

// ======================== Get Delivered Notifications ========================
// Provides you with a list of the app’s notifications that are still displayed in Notification Center
export const getDeliveredNotifications = () => {
  PushNotification.getDeliveredNotifications((notification: any) => {
    console.log('delivered Notifications = ', notification);
  });
};
