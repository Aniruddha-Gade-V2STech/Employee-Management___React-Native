import {createRef} from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createRef();

const navigate = (name, params) => {
  if (navigationRef.current) {
    return navigationRef.current.navigate(name, params);
  }
};

const goBack = () => {
  if (navigationRef.current) {
    return navigationRef.current?.goBack?.();
  }
};

const replace = (name, param) => {
  if (navigationRef.current) {
    navigationRef.current?.dispatch(
      StackActions.replace(name, {
        param,
      }),
    );
  }
};

export default {
  navigate,
  goBack,
  replace,
};
