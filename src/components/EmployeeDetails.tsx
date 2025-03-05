import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TAB_ROUTE_NAME} from '../constants';
import {notNullUndefined} from '../utils/validation';

const EmployeeDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const employee = route.params?.employee ?? {};
  console.log('employee = ', employee);
  const handleEdit = () => {
    navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_FORM, {employee, isEdit: true});
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: employee.profileImage}} style={styles.image} />

      {notNullUndefined(employee?.fullName) && (
        <Text style={styles.name}>{employee?.fullName}</Text>
      )}

      {notNullUndefined(employee?.email) && (
        <Text style={styles.detail}>{employee?.email}</Text>
      )}

      {notNullUndefined(employee?.mobileNumber) && (
        <Text style={styles.detail}>{employee?.mobileNumber}</Text>
      )}

      {notNullUndefined(employee?.position) && (
        <Text style={styles.detail}>{employee?.position}</Text>
      )}

      {notNullUndefined(employee?.department?.value) && (
        <Text style={styles.detail}>{employee?.department?.value}</Text>
      )}

      {notNullUndefined(employee?.salary) && (
        <Text style={styles.detail}>{employee?.salary}</Text>
      )}

      {notNullUndefined(employee?.joiningDate) && (
        <Text style={styles.detail}>{employee?.joiningDate}</Text>
      )}

      {notNullUndefined(employee?.emergencyContact) && (
        <Text style={styles.detail}>{employee?.emergencyContact}</Text>
      )}

      {/* Edit Button */}
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: 'lightgray',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
