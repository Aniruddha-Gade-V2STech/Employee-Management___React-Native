import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import STYLES from '../common/StyleCSS';

import {useTheme} from '@react-navigation/native';
import EmployeeCard from '../components/EmployeeCard';
import {isArrayLength} from '../utils/validation';
import {ScrollView} from 'react-native-gesture-handler';
import useEmployee from '../hooks/useEmployee';

const EmployeeList = () => {
  const {colors} = useTheme();
  const {fetchEmployeeList, loading} = useEmployee();
  const {employees} = useSelector(state => state?.employee);

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

      {isArrayLength(employees) ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => fetchEmployeeList(true)}
            />
          }
          data={employees}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <EmployeeCard employee={item} />}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={[styles.noDataText, {color: colors.text}]}>
          No Employees Found
        </Text>
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
});
