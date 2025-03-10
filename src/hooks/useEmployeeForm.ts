import {useForm} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {EmployeeFormData} from '../types/types';
import {useDispatch} from 'react-redux';
import {addEmployee, updateEmployee} from '../redux/EmployeeSlice';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DUMMY_IMAGE, TAB_ROUTE_NAME} from '../constants';

type EmployeeFormRouteParams = {
  employee?: EmployeeFormData;
  isEdit?: boolean;
};

export const useEmployeeForm = () => {
  const route = useRoute<RouteProp<{params: EmployeeFormRouteParams}, 'params'>>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const employee = route.params?.employee ?? ({} as EmployeeFormData);
  const isEdit = route.params?.isEdit ?? false;
  const [isModified, setIsModified] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
    watch,
  } = useForm<EmployeeFormData>({
    defaultValues: {
      // id: employee?.id || Math.random(), // Generate ID new
      id: employee?.id || undefined,
      fullName: employee?.fullName || '',
      email: employee?.email || '',
      mobileNumber: employee?.mobileNumber || '',
      address: employee?.address || '',
      department: employee?.department || '',
      position: employee?.position || '',
      salary: employee?.salary || '',
      joiningDate: employee?.joiningDate || '',
      emergencyContact: employee?.emergencyContact || '',
      profileImage: employee?.profileImage || null,
    },
  });

  // Resets the form to default values
  const resetForm = () => {
    // reset();
    reset({
      fullName: '',
      email: '',
      mobileNumber: '',
      address: '',
      department: '',
      position: '',
      salary: '',
      joiningDate: '',
      emergencyContact: '',
      profileImage: null,
    });
  };

  const watchFields = watch();

  useEffect(() => {
    const hasValues = Object.values(watchFields).some(value => value);
    setIsModified(hasValues);
  }, [watchFields]);

  useEffect(() => {
    if (employee) {
      Object.keys(employee).forEach(key => {
        setValue(key, employee[key]);
      });
    }
  }, [employee, setValue]);

  const autoFillForm = () => {
    reset({
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      mobileNumber: '9876543210',
      address: '123 Main St, City, Country',
      department: 'Engineering',
      position: 'Software Engineer',
      salary: '70000',
      joiningDate: '2023-06-15',
      emergencyContact: '9876543211',
      // profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SBFO_34s3mUw1zz2SuAVXn83OArtd8D9GQ&s',
      profileImage: null,
    });
  };

  const onSubmit = (data: EmployeeFormData) => {
    // if id not present  
    const newEmployee = {
      ...data,
      id: data?.id ?? Math.floor(Math.random() * 100000), 
    };

    if (isEdit) {
      dispatch(updateEmployee(newEmployee));
      Alert.alert('Success', 'Employee updated successfully!');
    } else {
      dispatch(addEmployee(newEmployee));
      Alert.alert('Success', 'Employee added successfully!');
    }
    navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_TAB);
  };

  const handleImagePick = async () => {
    const dummyImage = DUMMY_IMAGE;
    setSelectedImage(dummyImage);
    setValue('profileImage', dummyImage);
  };

  return {
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
  };
};
