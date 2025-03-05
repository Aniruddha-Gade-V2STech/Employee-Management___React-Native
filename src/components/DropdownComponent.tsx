import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {CustomIcon} from './CustomIcon';
import Color from '../utils/Color';
import { FONT_FAMILY } from '../utils/FontFamily';

type DropdownComponentProps = {
  data: Array<{label: string; value: string}>;
  value: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  mandatory?: boolean;
  disable?: boolean;
  onChange: (item: {label: string; value: string}) => void;
  placeholder?: string;
  numberOfLines?: number;
  showClearIcon?: boolean;
  onClear?: () => void;
};

function DropdownComponent(props: Readonly<DropdownComponentProps>) {
  const {
    data,
    value,
    label,
    error,
    errorMessage,
    mandatory = false,
    disable,
    onChange,
    placeholder,
    numberOfLines,
    showClearIcon = false,
    onClear = () => {},
  } = props;

  return (
    <View style={styles.container}>
      <View style={customTextInputStyles.labelRow}>
        <Text style={styles.label}>{label}</Text>

        {mandatory && <Text style={customTextInputStyles.mandatory}>*</Text>}
      </View>

      <View style={styles.dropDownContainer}>
        <Dropdown
          style={[
            styles.dropdown,
            {width: '100%'},
            {opacity: disable ? 0.5 : 1},
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextProps={{numberOfLines}}
          iconStyle={styles.iconStyle}
          data={data}
          // search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder ?? 'Select item'}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            onChange(item);
          }}
          autoScroll={false}
          disable={disable}
          containerStyle={styles.boxStyle}
          itemTextStyle={styles.itemTextStyle}
          activeColor={Color.light_grey}
        />

        {showClearIcon && (
          <TouchableOpacity onPress={onClear} style={styles.xIcon}>
            <CustomIcon icon="Octicons" name="x" color={Color.red} size={20} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={customTextInputStyles.error}>{errorMessage}</Text>}
    </View>
  );
}

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    marginBottom: 10,
  },
  dropdown: {
    borderRadius: 100,
    borderColor: Color.light_grey_1,
    height: 45,
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    color: Color.black,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Color.light_grey_1,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: Color.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  boxStyle: {
    backgroundColor: Color.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  itemTextStyle: {
    color: Color.black,
    fontSize: 14,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  xIcon: {
    position: 'absolute',
    right: '10%',
    padding: 10,
  },
});



const customTextInputStyles = StyleSheet.create({
  mainContainer: {
  },
  input: {
    color: Color.black,
    fontSize: 16
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.light_grey_1,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: '1%',
    paddingHorizontal: '1%',
    height: 45
  },
  error: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'left',
    color: Color.red,
    paddingLeft: 5
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
