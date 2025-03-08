import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {CustomIcon} from './CustomIcon';
import Color from '../utils/Color';
import {FONT_FAMILY} from '../utils/FontFamily';
import {notEmpty} from '../utils/validation';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface TextInputComponentProps {
  placeholder?: string;
  value: string | number;
  onChangeText?: (text: string) => void;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  RightIcon?: Element;
  error?: boolean;
  errorMessage?: string;
  inputWrapper?: ViewStyle;
  inputRowStyle?: ViewStyle;
  mandatory?: boolean;
  editable?: boolean;
  inputStyle?: TextStyle;
}

function TextField(props: TextInputProps & TextInputComponentProps) {
  const {colors} = useTheme();
  const {isDarkMode} = useSelector(state => state?.theme);

  const {
    placeholder,
    value,
    onChangeText,
    labelStyle = {},
    label,
    RightIcon,
    error,
    errorMessage,
    inputWrapper,
    inputRowStyle,
    inputStyle = {},
    mandatory,
    editable = true,
    ...rest
  } = props;

  const inputWidth = RightIcon ? '90%' : '100%';

  return (
    <View style={[customTextInputStyles.mainContainer, inputWrapper]}>
      {notEmpty(label) && (
        <View style={customTextInputStyles.labelRow}>
          <Text style={[{...labelStyle}, {color: Color.black}]}>{label}</Text>

          {mandatory && <Text style={customTextInputStyles.mandatory}>*</Text>}
        </View>
      )}

      <View
        style={[
          customTextInputStyles.inputRow,
          {borderColor: isDarkMode ? Color.white : Color.black},
          inputStyle,
          {opacity: editable ? 1 : 0.4},
        ]}>
        <TextInput
          style={[
            {
              width: inputWidth,
              color: isDarkMode ? Color.white : Color.black,
            },
            customTextInputStyles.input,
            inputStyle,
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? Color.white : Color.black}
          // secureTextEntry={!showPassword}
          {...rest}
          editable={editable}
        />
        {RightIcon && <RightIcon />}
      </View>

      {error && <Text style={customTextInputStyles.error}>{errorMessage}</Text>}
    </View>
  );
}

export default TextField;

export const customTextInputStyles = StyleSheet.create({
  mainContainer: {},
  input: {
    fontSize: 16,
    // width: '100%',
    // backgroundColor:'yellow'
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: '1%',
    paddingHorizontal: '1%',
    height: 45,
  },
  error: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'left',
    color: Color.red,
    paddingLeft: 5,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mandatory: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: 12,
    lineHeight: 14,
    color: Color.red,
    marginLeft: 2,
  },
});
