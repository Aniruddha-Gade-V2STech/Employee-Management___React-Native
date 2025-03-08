import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {DrawerActions, useNavigation, useTheme} from '@react-navigation/native';
import {LABEL} from '../constants';
import Color from '../utils/Color';

const Home = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>{LABEL.EMPLOYEE_MANAGEMENT}</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.menuButton}>
        <Text style={[styles.menuText, {color: colors.text}]}>Menu</Text>
      </TouchableOpacity>
      <Text style={[styles.text, {color: colors.text}]}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.orange,
  },
  menuText: {
    fontSize: 18,
  },
  text: {
    fontSize: 25,
    fontWeight: '900',
    marginTop: 50,
  },
  clickDown: {
    color: Color.orange,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  headline: {
    color: Color.black,
    fontWeight: 'bold',
    fontSize: 25,
  },
  headlineContainer: {
    backgroundColor: Color.light_grey,
    padding: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
});
