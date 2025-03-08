import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from 'react-native';
import {useEmployeeForm} from '../hooks/useEmployeeForm';
import {Controller} from 'react-hook-form';
import DropdownComponent from '../components/DropdownComponent';
import {Employee_Departments, LABEL, REQUIRED_VALUES} from '../constants';
import TextField from '../components/TextField';
import Color from '../utils/Color';
import {useSelector} from 'react-redux';

const EmployeeForm = () => {
  const {
    control,
    handleSubmit,
    errors,
    onSubmit,
    selectedImage,
    handleImagePick,
    isEdit,
    resetForm,
    isModified,
    autoFillForm,
  } = useEmployeeForm();
  
  const isDarkMode = useSelector(state => state?.theme?.isDarkMode);
  const inputTextColor = {color: isDarkMode ? Color.white : Color.black};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        {isEdit ? 'Edit Employee' : 'Add Employee'}
      </Text>

      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        rules={{required: REQUIRED_VALUES.FULL_NAME}}
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: REQUIRED_VALUES.EMAIL,
          pattern: {value: /\S+@\S+\.\S+/, message: 'Invalid email format'},
        }}
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Mobile Number */}
      <Controller
        control={control}
        name="mobileNumber"
        rules={{
          required: REQUIRED_VALUES.MOBILE_NUMBER,
          minLength: {value: 10, message: 'Must be 10 digits'},
        }}
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.mobileNumber && (
        <Text style={styles.error}>{errors.mobileNumber.message}</Text>
      )}

      {/* Address */}
      <Controller
        control={control}
        name="address"
        rules={{required: REQUIRED_VALUES.ADRESS}}
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.address && (
        <Text style={styles.error}>{errors.address.message}</Text>
      )}

      {/* Department Dropdown */}
      <Controller
        control={control}
        name="department"
        rules={{required: 'Please select a department'}}
        render={({field: {onChange, value}}) => (
          <DropdownComponent
            data={Employee_Departments}
            value={value}
            onChange={onChange}
            label="Select Department"
            placeholder="Select Department"
          />
        )}
      />
      {errors.department && (
        <Text style={styles.error}>{errors.department.message}</Text>
      )}

      {/* Position */}
      <Controller
        control={control}
        name="position"
        rules={{required: 'Please enter a position'}}
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Position"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.position && (
        <Text style={styles.error}>{errors.position.message}</Text>
      )}

      {/* Salary */}
      <Controller
        control={control}
        name="salary"
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Salary"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Joining Date */}
      <Controller
        control={control}
        name="joiningDate"
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Joining Date"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* <Controller
          control={control}
          name="joiningDate"
          render={({field: {onChange, value}}) => (
            <DateTime
              value={value}
              mandatory
              mode='date'
              label={LABEL.SELECTED_DATA_AND_TIMER}
              placeholder={LABEL.SELECTED_DATA_AND_TIMER_PLACEHOLDER}
              onConfirm={tempValue => onChange(tempValue)}
              error={!!errors?.joiningDate}
              errorMsg={errors?.joiningDate?.message}
            />
          )}
          rules={{
            required: {
              value: true,
              message: LABEL.DATE_AND_TIME_PLACEHOLDER,
            },
            validate: value => {
              const currentDateTime = moment();
              const selectedDateTime = moment(value, 'DD/MM/YYYY HH:mm');
              return (
                selectedDateTime.isAfter(currentDateTime) || LABEL.DATE_ERROR
              );
            },
          }}
        /> */}

      {/* Emergency Contact */}
      <Controller
        control={control}
        name="emergencyContact"
        render={({field: {onChange, value}}) => (
          <TextField
            style={[styles.input, inputTextColor]}
            placeholder="Emergency Contact"
            keyboardType="numeric"
            maxLength={10}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {selectedImage ? (
          <Image source={{uri: selectedImage}} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      {/* Save / Update Button / reset / autofill */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {isEdit ? LABEL.UPDATE : LABEL.SUBMIT}
          </Text>
        </TouchableOpacity>

        {isModified && (
          <TouchableOpacity style={styles.button} onPress={resetForm}>
            <Text style={styles.buttonText}>{LABEL.RESET}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={autoFillForm}>
          <Text style={styles.buttonText}>{LABEL.AUTOFILL}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Color.white,
  },
  input: {
    padding: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: Color.white,
    fontWeight: 'bold',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    color: 'grey',
  },
  buttons: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
