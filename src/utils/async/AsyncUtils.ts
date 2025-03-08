import AsyncStorage from '@react-native-async-storage/async-storage';
import { notNullUndefined } from '../validation';

type value = string | null;


export const getAsync = async (key: string) => {
  try {
    const jsonValue: value = await AsyncStorage.getItem(key);
    return notNullUndefined(jsonValue) ? JSON.parse(jsonValue ?? '') : null;
  } catch (e) {
    console.error('error occur while reading async item', e);
  }
};

export const setAsync = async (key: string, value: any) => {
  if (!notNullUndefined(value)) {
    console.error('error occur while set async item');
    return;
  }

  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('error occur while set async item', e);
  }
};


export const removeAsync = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('error occur while removing async item', e);
  }
};
