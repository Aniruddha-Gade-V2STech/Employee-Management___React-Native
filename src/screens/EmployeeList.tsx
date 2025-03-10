import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import STYLES from '../common/StyleCSS';
import {useTheme} from '@react-navigation/native';
import EmployeeCard from '../components/EmployeeCard';
import {ScrollView} from 'react-native-gesture-handler';
import useEmployee from '../hooks/useEmployee';
import DropdownComponent from '../components/DropdownComponent';
import TextField from '../components/TextField';
import Color from '../utils/Color';
import NoDataComponent from '../components/NoDataComponent';
import {LABEL} from '../constants';

const EmployeeSkeleton = ({isDarkMode}: Readonly<{isDarkMode: boolean}>) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.loadingContainer,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 2,
        },
      ]}>
      <Text
        style={[
          {color: isDarkMode ? Color.white : Color.black},
          styles.loadingText,
        ]}>
        {LABEL.LOADING}
      </Text>
    </View>
  );
};

const EmployeeList = () => {
  const {colors} = useTheme();
  const {
    fetchEmployeeList,
    loading,
    departments,
    handleFilterChange,
    filterState,
    filteredEmployees,
    clearFilter,
  } = useEmployee();

  const isDarkMode = useSelector(state => state?.theme?.isDarkMode);
  const inputTextColor = {color: isDarkMode ? Color.white : Color.black};

  return (
    <ScrollView
      style={[
        styles.container,
        STYLES.screenMainView,
        {backgroundColor: colors.background},
      ]}>
      <View style={STYLES.headlineContainer}>
        <Text style={STYLES.headline}>EmployeeList</Text>
      </View>

      {/* Filter */}
      <View>
        {/* clear filter */}
        <TouchableOpacity onPress={clearFilter} style={styles.clearBtn}>
          <Text style={[{color: isDarkMode ? Color.white : Color.black}, styles.clear]}>
            Clear
          </Text>
        </TouchableOpacity>

        {/* Search */}
        <TextField
          style={[styles.input, inputTextColor]}
          placeholder="Search by Name"
          value={filterState.searchText}
          onChangeText={text => handleFilterChange('searchText', text)}
          placeholderTextColor="grey"
        />

        <TextField
          style={[styles.input, inputTextColor]}
          placeholder="Search by Email"
          value={filterState.email}
          onChangeText={text => handleFilterChange('email', text)}
          placeholderTextColor="grey"
        />

        <DropdownComponent
          data={departments}
          value={filterState?.selectedDepartment}
          onChange={item =>
            handleFilterChange('selectedDepartment', item.value)
          }
          label="Select Department"
          placeholder="Select Department"
        />
      </View>

      {loading && <EmployeeSkeleton isDarkMode={isDarkMode} />}

      {!loading && (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => fetchEmployeeList(true)}
            />
          }
          // data={employees ?? []}
          data={filteredEmployees ?? []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <EmployeeCard employee={item} />}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={{height: 400}}>
              <NoDataComponent text={LABEL.NO_EMPLOYEE_DATA} />
            </View>
          }
        />
      )}
    </ScrollView>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    width: '100%',
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  loadingContainer: {
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  clearBtn: {
    backgroundColor: Color.green,
    alignSelf:'flex-start',
    padding: 5,
    borderRadius: 20,
    width: '20%',
    alignItems:'center',
    marginBottom: 5,
  },
  clear: {
    fontWeight: '500'
  }
});
