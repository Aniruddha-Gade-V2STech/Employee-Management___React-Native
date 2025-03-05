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
      <Text style={styles.clickDown}>{LABEL.CLICK_DOWN}</Text>
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
  },
  clickDown: {
    color: Color.orange,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
