import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {notEmpty} from '../utils/validation';
import {deleteEmployee} from '../redux/EmployeeSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LABEL, No_IMAGE, TAB_ROUTE_NAME} from '../constants';
import Color from '../utils/Color';
import {CustomIcon} from './CustomIcon';

interface EmployeeCardProps {
  employee: {
    id: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    department: string;
    position: string;
    profileImage: string | null;
  };
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({employee}) => {
  const {colors} = useTheme();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDelete = () => {
    dispatch(deleteEmployee(employee.id));
  };

  const handleEdit = () => {
    navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_FORM, {employee, isEdit: true});
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_DETAILS, {employee})
      }
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 2,
        },
      ]}>
      <View style={styles.header}>
        <View>
          <Image
            source={{
              uri: employee?.profileImage ?? No_IMAGE,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.info}>
          {notEmpty(employee?.fullName) && (
            <Text style={[styles.name, {color: colors.text}]}>
              {employee?.fullName}
            </Text>
          )}
          {notEmpty(employee?.position) && (
            <Text style={[styles.position, {color: colors.text}]}>
              {employee?.position}
            </Text>
          )}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
            {/* <CustomIcon
              icon="AntDesign"
              name="edit"
              size={24}
              color={Color.green}
            /> */}
            <Text style={styles.editText}>{LABEL.EDIT}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
            {/* <Icon name="delete" size={24} color={Color.red} /> */}
            <Text style={styles.deleteText}>{LABEL.DELETE}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.details}>
        {notEmpty(employee?.email) && (
          <Text style={[styles.email, {color: colors.text}]}>
            📧 {employee?.email}
          </Text>
        )}
        {notEmpty(employee?.mobileNumber) && (
          <Text style={[styles.phone, {color: colors.text}]}>
            📞 {employee?.mobileNumber}
          </Text>
        )}
      </View>

      {notEmpty(employee?.department) && (
        <View
          style={[
            styles.department,
            {backgroundColor: isDarkMode ? '#444' : Color.light_grey},
          ]}>
          <Text
            style={{color: isDarkMode ? Color.light_grey : Color.dark_grey_1}}>
            {employee?.department}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default EmployeeCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 15,
    marginVertical: 10,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    opacity: 0.7,
  },
  deleteButton: {
    padding: 5,
  },
  details: {
    marginVertical: 8,
  },
  email: {
    fontSize: 14,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
  },
  department: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    color: Color.white,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 8,
  },
  editText: {
    color: Color.green,
    fontWeight: 'bold',
  },
  deleteText: {
    color: Color.red,
    fontWeight: 'bold',
  },
});
