import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TextStyle } from 'react-native';

interface IconComponents {
  [key: string]: React.ComponentType<any>;
}

export interface IconProps {
  icon:
  | 'AntDesign'
  | 'Entypo'
  | 'Feather'
  | 'Ionicons'
  | 'EvilIcons'
  | 'FontAwesome'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'Octicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Foundation'
  | 'FontAwesome5'
  | 'FontAwesome5Pro'
  | 'FontAwesome6'
  | 'FontAwesome6Pro'
  | 'Fontisto';
  size: number;
  name: string;
  color: string;
  style?: TextStyle;
}
const iconComponents: IconComponents = {
  AntDesign: AntDesign,
  Entypo: Entypo,
  Feather: Feather,
  Ionicons: Ionicons,
  EvilIcons: EvilIcons,
  FontAwesome: FontAwesome,
  SimpleLineIcons: SimpleLineIcons,
  Zocial: Zocial,
  Octicons: Octicons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  Foundation: Foundation,
  FontAwesome5: FontAwesome5,
  FontAwesome5Pro: FontAwesome5Pro,
  FontAwesome6: FontAwesome6,
  FontAwesome6Pro: FontAwesome6Pro,
  Fontisto: Fontisto,
};

export function getIconComponent(icon: string): React.ComponentType<any> {
  return iconComponents[icon] || Ionicons;
}

export const CustomIcon = ({ icon, size, name, color, style }: IconProps) => {
  const IconComponent = getIconComponent(icon);
  return <IconComponent name={name} size={size} color={color} style={style} />;
};