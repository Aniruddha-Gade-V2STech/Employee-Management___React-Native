import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller} from 'react-hook-form';
import TextField from '../../../components/TextField';
import {useExpenseForm} from '../hooks/useExpenseForm';
import DropdownComponent from '../../../components/DropdownComponent';
import Color from '../../../utils/Color';

const ExpenseForm = () => {
  const {control, handleSubmit, onSubmit, errors, isEdit, onDelete} =
    useExpenseForm();

  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add Expense</Text>

      {/* Type */}
      <Controller
        control={control}
        name="type"
        rules={{required: 'Please select a department'}}
        render={({field: {onChange, value}}) => (
          <DropdownComponent
            data={[
              {label: 'Incoming', value: 'incoming'},
              {label: 'Outgoing', value: 'outgoing'},
            ]}
            value={value}
            onChange={val => onChange(val?.value)}
            label="Select Department"
            placeholder="Select Department"
          />
        )}
      />
      {errors.type && <Text style={styles.error}>{errors.type.message}</Text>}

      {/* Label */}
      <Controller
        control={control}
        name="label"
        rules={{required: 'Label is required'}}
        render={({field: {onChange, value}}) => (
          <TextField
            placeholder="Enter Label"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.label && (
        <Text style={{color: 'red'}}>{errors.label.message}</Text>
      )}

      {/* Amount */}
      <Controller
        control={control}
        name="amount"
        rules={{
          required: 'Amount is required',
          min: {value: 1, message: 'Amount must be greater than 0'},
        }}
        render={({field: {onChange, value}}) => (
          <TextField
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={value.toString()}
            onChangeText={onChange}
          />
        )}
      />
      {errors.amount && (
        <Text style={{color: 'red'}}>{errors.amount.message}</Text>
      )}

      {/* Date */}
      <Controller
        control={control}
        name="date"
        rules={{required: 'Date is required'}}
        render={({field: {onChange, value}}) => (
          <TextField
            placeholder="Enter Date in YYYY-MM-DD"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.date && <Text style={{color: 'red'}}>{errors.date.message}</Text>}

      {/* Add / Update / delete button */}
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.expenseButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>
            {isEdit ? 'Update' : 'Add'} {'Expense'}{' '}
          </Text>
        </TouchableOpacity>

        {isEdit && (
          <TouchableOpacity style={styles.deleteExpense} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete Expense</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  expenseButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteExpense: {
    backgroundColor: Color.red,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ExpenseForm;
