import { Platform } from "react-native";

export function notNullUndefined(value: any): boolean {
  return value !== null && value !== undefined;
}

export const getInitials = (value: string | null): string => {
  if (notNullUndefined(value) && typeof value === 'string') {
    return value.charAt(0).toUpperCase();
  }

  return '';
};

export function isArrayLength(array: any): boolean {
  return isArray(array) && array.length > 0;
}

export function isArray(array: any): boolean {
  return notNullUndefined(array) && Array.isArray(array);
}

export function notEmpty(value: any): boolean {
  return (
    notNullUndefined(value) && typeof value === 'string' && value?.trim() !== ''
  );
}

export const isIOS=() => Platform.OS === 'ios';

