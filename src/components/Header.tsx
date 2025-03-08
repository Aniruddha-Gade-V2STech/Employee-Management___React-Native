import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../redux/ThemeSlice';
import {DrawerActions, useNavigation, useTheme} from '@react-navigation/native';
import {TAB_ROUTE_NAME} from '../constants';
import Color from '../utils/Color';

const Header = () => {
  const dispatch = useDispatch();
  const {isDarkMode} = useSelector(state => state?.theme);
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={styles.menuButton}>
        <Text style={[styles.menuText, {color: colors.text}]}>Menu</Text>
      </TouchableOpacity>

      {/* App Title */}
      <TouchableOpacity
        onPress={() => navigation.navigate(TAB_ROUTE_NAME.HOME_TAB)}>
        <Text style={[styles.title, {color: colors.text}]}>Emp Manager</Text>
      </TouchableOpacity>

      {/* Dark/Light Mode Toggle */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => dispatch(toggleTheme())}>
        {/* {isDarkMode ? <Sun size={24} color={colors.text} /> : <Moon size={24} color={colors.text} />} */}
        <Text style={[styles.toggleText, {color: colors.text}]}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    backgroundColor: Color.orange,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
