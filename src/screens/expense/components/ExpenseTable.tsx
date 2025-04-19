import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Color from '../../../utils/Color';
import {useTheme} from '@react-navigation/native';

const ExpenseTable = ({expenses, onPress}) => {
  const {colors} = useTheme();

  const tranXHistory = ({item}) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.row}>
      <Text style={[styles.cell, {color: colors.text}]}>
        {item?.date ?? 'NA'}
      </Text>
      <Text style={[styles.cell, {color: colors.text}]}>
        {item?.label ?? 'NA'}
      </Text>
      <Text
        style={[
          styles.cell,
          {
            color: item.type === 'incoming' ? Color.green : Color.red,
            textAlign: 'right',
          },
        ]}>
        {item?.type === 'incoming' ? '+' : '-'}₹{item?.amount ?? 'NA'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.tableWrapper}>
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerText]}>Date</Text>
          <Text style={[styles.cell, styles.headerText]}>Label</Text>
          <Text style={[styles.cell, styles.headerText, {textAlign: 'right'}]}>
            Amount
          </Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={expenses}
          renderItem={tranXHistory}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableWrapper: {
    marginBottom: 40,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default ExpenseTable;
