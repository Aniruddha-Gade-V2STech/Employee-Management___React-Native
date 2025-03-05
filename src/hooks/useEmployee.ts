import { useEffect, useState} from 'react';
import { setEmployeeData} from '../redux/EmployeeSlice';
import {EMPLOYEE_DATA} from '../constants/EmployeeData';
import {useDispatch, useSelector} from 'react-redux';

function useEmployee() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {employees} = useSelector(state => state?.employee);

  //   const [data, setData] = useState<EmployeeFormData|null>(null);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchEmployeeList();
  //   }, []),
  // );

  useEffect(() => {
    console.log('re rrun ')
    fetchEmployeeList();
  }, []);

  // const fetchEmployeeList = async () => {
  //   setLoading(true);
  //   try {
  //     // setTimeout(() => {
  //     //   EMPLOYEE_DATA.forEach(employee => {
  //     //     dispatch(addEmployee(employee));
  //     //   });
  //     // }, 3000);

  //     setTimeout(() => {
  //       dispatch(setEmployeeData(EMPLOYEE_DATA));
  //     }, 3000);
  //   } catch (error) {
  //     console.log('error = ', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchEmployeeList = async (forceRefresh = false) => {
    setLoading(true);
    try {
      if (forceRefresh || employees?.length === 0) {
        setTimeout(() => {
          dispatch(setEmployeeData([...EMPLOYEE_DATA])); 
        }, 1500); 
      }
    } catch (error) {
      console.log('error = ', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    fetchEmployeeList,
  };
}

export default useEmployee;
