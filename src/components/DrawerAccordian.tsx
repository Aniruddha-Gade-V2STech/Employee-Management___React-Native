import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { isArrayLength } from '../utils/validation';
import { useTheme } from '@react-navigation/native';

interface DrawerAccordianProps {
  data: {
    menuName: string;
    subMenu: {
      subMenuName: string;
    }[];
    onMenu?: () => void;
  };
}

type TitleToggleProps = {
  title: string;
  onPress: () => void;
};

function TitleToggle({ title, onPress }: Readonly<TitleToggleProps>) {
  const { colors } = useTheme(); // Get theme colors
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.drawerText, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

function DrawerAccordian({ data }: Readonly<DrawerAccordianProps>) {
  const { menuName, subMenu, onMenu } = data;
  const { colors } = useTheme(); // Get theme colors
  const [isOpen, setIsSetOpen] = useState<boolean>(false);

  const onPressTitle = () => {
    if (!isArrayLength(subMenu)) {
      onMenu?.();
      return;
    }
    setIsSetOpen((value) => !value);
  };

  const onDrawerOption = (item) => {
    item?.onSubMenuName?.();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={onPressTitle}
      >
        <Text style={[styles.drawerText, { color: isOpen ? 'orange' : colors.text }]}>
          {menuName}
        </Text>
        {isArrayLength(subMenu) && (
          <Entypo
            size={22}
            color={isOpen ? 'orange' : colors.text}
            name={isOpen ? 'chevron-small-up' : 'chevron-small-down'}
          />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.subMenuContainer, { borderColor: colors.border }]}>
          <FlatList
            data={subMenu}
            renderItem={({ item }) => (
              <TitleToggle
                title={item.subMenuName}
                onPress={() => onDrawerOption(item)}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '8%',
  },
  drawerText: {
    fontSize: 18,
    paddingVertical: '3%',
    fontWeight: 'bold',
  },
  subMenuContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: '15%',
  },
});

export default DrawerAccordian;
