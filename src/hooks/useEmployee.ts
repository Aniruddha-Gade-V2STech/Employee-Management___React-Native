import {useEffect, useState} from 'react';
import {setEmployeeData} from '../redux/EmployeeSlice';
import {EMPLOYEE_DATA} from '../constants/EmployeeData';
import {useDispatch, useSelector} from 'react-redux';
import {FILTER_STORAGE_KEY} from '../constants';
import {getAsync, removeAsync, setAsync} from '../utils/async/AsyncUtils';
import {notNullUndefined} from '../utils/validation';
import { EmployeeFormData } from '../types/types';

function useEmployee() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const {employees} = useSelector(state => state?.employee);
  const [filterState, setFilterState] = useState({
    searchText: '',
    selectedDepartment: '',
    email: ''
  });

  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  //   const [data, setData] = useState<EmployeeFormData|null>(null);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchEmployeeList();
  //   }, []),
  // );

  useEffect(() => {
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(setEmployeeData([...EMPLOYEE_DATA]));
      }
    } catch (error) {
      console.log('error = ', error);
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    {label: 'All', value: ''},
    {label: 'Engineering', value: 'Engineering'},
    {label: 'Finance', value: 'Finance'},
    {label: 'Marketing', value: 'Marketing'},
  ];

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterState, employees]);

  const saveFilters = async (data: any) => {
    try {
      await setAsync(FILTER_STORAGE_KEY, data);
    } catch (error) {
      console.error('Error while saving filters:', error);
    }
  };

  const loadFilters = async () => {
    try {
      const savedFilters = await getAsync(FILTER_STORAGE_KEY);
      if (notNullUndefined(savedFilters)) {
        setFilterState(savedFilters);
      }
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  };

  const handleFilterChange = (key:string, value:string) => {
    setFilterState(prevState => {
      const newState = {...prevState, [key]: value};
      saveFilters(newState);
      return newState;
    });
  };

  const applyFilters = () => {
    let filtered = employees;

    if (filterState?.searchText) {
      filtered = filtered?.filter((emp:EmployeeFormData )=>
        emp?.fullName
          ?.toLowerCase()
          ?.includes(filterState?.searchText?.toLowerCase()),
      );
    }

    if (filterState?.selectedDepartment) {
      filtered = filtered?.filter(
        emp => emp?.department?.value === filterState?.selectedDepartment,
      );
    }

    if (filterState?.email) {
      filtered = filtered?.filter((emp: EmployeeFormData) =>
        emp?.email
          ?.toLowerCase()
          ?.includes(filterState?.email?.toLowerCase()),
      );
    }

    setFilteredEmployees(filtered);
  };

  const clearFilter = async () => {
    setFilterState({searchText: '', selectedDepartment: '', email: ''});
    await removeAsync(FILTER_STORAGE_KEY);
  };

  return {
    loading,
    setLoading,
    fetchEmployeeList,
    departments,
    handleFilterChange,
    filterState,
    filteredEmployees,
    setFilterState,
    clearFilter,
  };
}

export default useEmployee;
