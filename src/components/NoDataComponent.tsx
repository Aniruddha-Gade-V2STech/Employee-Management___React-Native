import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import {LABEL} from '../constants';
import {FONT_FAMILY} from '../utils/FontFamily';
import Color from '../utils/Color';
import NO_DATA from '../asstes/images/no-data.png';

type Props = {
  text?: string;
};

const NoDataComponent = ({text = LABEL.NO_DATA_PRESENT}: Props) => {
  const isDarkMode = useSelector(state => state?.theme?.isDarkMode);

  return (
    <View style={style.mainView}>
      <Image
        source={NO_DATA}
        // source={{uri: 'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg'}}
        style={{width: 250, height: 250}}
      />
      <Text style={[style.textStyle, {color: isDarkMode? Color.white:Color.black}]}>{text}</Text>
    </View>
  );
};

export default NoDataComponent;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderRadius: 8,
  },
  textStyle: {
    color: Color.black,
    fontSize: 16,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontWeight: 'bold'
  },
});
