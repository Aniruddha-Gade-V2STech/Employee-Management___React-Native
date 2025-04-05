import {Alert, PermissionsAndroid} from 'react-native';
import {getUserCurrentLocation, isAndroid} from './helper';
import {LABEL} from '../constants';

export const requestLocationPermission = async () => {
  if (isAndroid) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location access is granted');
        return true;
        // return await getUserCurrentLocation();
      } else {
        Alert.alert(
          LABEL.DENIED_PERMISSION,
          LABEL.REQUIRED_LOCATION_PERMISSION,
        );
      }
    } catch (error) {
      console.log('Error while granting location poermission => ', error);
    }
  }
};
