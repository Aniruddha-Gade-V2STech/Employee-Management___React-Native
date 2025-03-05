import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  FlatList,
} from 'react-native';
import {DrawerActions, useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleTheme} from '../../redux/ThemeSlice';
import {TAB_ROUTE_NAME} from '../../constants';
import {DRAWER_DATA} from '../../constants/constants';
import DrawerAccordian from '../../components/DrawerAccordian';
import Color from '../../utils/Color';

const DrawerContent = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isDarkMode = useSelector(state => state?.theme?.isDarkMode);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        style={styles.menuButton}>
        <Text style={[styles.menuText, {color: colors.text}]}>Menu</Text>
      </TouchableOpacity>

      <FlatList
        data={DRAWER_DATA}
        renderItem={({item}) => <DrawerAccordian data={item} />}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(TAB_ROUTE_NAME.HOME_TAB)}>
        <Text style={[styles.item, {color: colors.text}]}>Home</Text>
      </TouchableOpacity>

      {/* Theme Toggle Switch */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, {color: colors.text}]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => dispatch(toggleTheme())}
        />
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
    marginRight: 10,
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.orange,
    alignSelf: 'flex-start',
  },
  menuText: {
    fontSize: 18,
  },
});
