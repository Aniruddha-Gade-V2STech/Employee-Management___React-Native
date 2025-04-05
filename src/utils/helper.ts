import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import {Platform} from 'react-native';

export const convertDateAndTime = (dateTime: string, mode: string) => {
  const parts = dateTime?.split(' ');
  const [datePart, timePart] = parts;
  // const datePart = parts[0];
  // const timePart = parts[1];

  // Split the date into day, month, and year
  const dateParts = datePart?.split('/');
  const day = parseInt(dateParts?.[0], 10);
  const month = parseInt(dateParts?.[1], 10);
  const year = parseInt(dateParts?.[2], 10);

  // Split the time into hours and minutes
  const timeParts = timePart?.split(':');
  const hours = parseInt(timeParts?.[0], 10);
  const minutes = parseInt(timeParts?.[1], 10);

  // Create a new Date object with the specified date and time
  const dateTimeObj = new Date(year, month - 1, day, hours, minutes);
  const dateobj = new Date(year, month - 1, day);
  return DATE === mode ? dateobj : dateTimeObj;
  // return dateTimeObj;
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const getUserCurrentLocation =
  async (): Promise<Geolocation.GeoPosition> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  };

export const getSourceToDestiDistance = (source, destination) => {
  const distance =
    getDistance(
      {
        latitude: source.latitude,
        longitude: source.longitude,
      },
      {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
    ) / 1000;

  return distance;
};

// export const getUserCurrentLocation = () => {
//   Geolocation.getCurrentPosition(position => {
//     return position;
//   });
// };
