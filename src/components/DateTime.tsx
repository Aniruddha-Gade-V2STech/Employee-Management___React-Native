import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {customTextInputStyles} from './TextField';
import {notEmpty} from '../utils/validation';
import {convertDateAndTime} from '../utils/helper';
import STYLES from '../common/StyleCSS';
import Color from '../utils/Color';
import { FONT_FAMILY } from '../utils/FontFamily';

type Props = {
  value: string;
  placeholder: string;
  onConfirm: (value: string) => void;
  label: string;
  error: boolean;
  errorMsg: string | undefined;
  mandatory?: boolean;
  disabled?: boolean;
  minimumDate: Date;
  mode: Date;
};

function DateTime({
  value,
  placeholder,
  onConfirm,
  label,
  error,
  errorMsg,
  mandatory,
  disabled,
  minimumDate,
  mode,
}: Readonly<Props>) {
  const [date, setDate] = useState<string>(value ?? '');

  useEffect(() => {
    setDate(value);
  }, [value]);

  const [isDatePicker, setIsDatePicker] = useState(false);

  const onDateTimeConfirm = (dateTime: Date) => {
    const formatType = mode === DATE ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm';

    const modifiedVal = moment(dateTime).format(formatType);
    setDate(modifiedVal);
    onConfirm(modifiedVal);
    setIsDatePicker(false);
  };

  const showDateTinePicker = () => {
    setIsDatePicker(true);
  };

  const onCancel = () => {
    setIsDatePicker(false);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePicker}
        mode={mode ?? 'datetime'}
        onConfirm={dateTime => onDateTimeConfirm(dateTime)}
        onCancel={onCancel}
        minimumDate={minimumDate ?? new Date()}
        date={notEmpty(date) ? convertDateAndTime(date, mode) : new Date()}
      />

      <View>
        <Text style={STYLES.labelStyle}>
          {label}
          {mandatory && <Text style={customTextInputStyles.mandatory}>*</Text>}
        </Text>
        <TouchableOpacity
          style={[
            customTextInputStyles.inputRow,
            {
              ...STYLES.inputStyle,
              opacity: disabled ? 0.4 : 1,
              paddingRight: 10,
              justifyContent: 'space-between',
            },
          ]}
          activeOpacity={0.4}
          onPress={showDateTinePicker}
          disabled={disabled}>
          <Text
            style={[
              dateStyle.date,
              {color: notEmpty(date) ? Color.black : Color.light_grey_1},
            ]}>
            {notEmpty(date) ? date : placeholder}
          </Text>
          {/* <Calendar width="24" height="22" /> */}
        </TouchableOpacity>
        {error && <Text style={customTextInputStyles.error}>{errorMsg}</Text>}
      </View>
    </View>
  );
}

export default DateTime;

const dateStyle = StyleSheet.create({
  date: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    paddingLeft: 5,
  },
});
