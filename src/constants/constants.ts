import {TAB_ROUTE_NAME} from '../constants';
import Navigation from '../navigation/NavigationService';
interface SubMenu {
  subMenuName: string;
  onSubMenuName: () => void;
}

interface Menu {
  menuName: string;
  subMenu?: SubMenu[];
  onMenu?: () => void;
}

export const DRAWER_DATA: Menu[] = [
  {
    menuName: 'Employee',
    subMenu: [
      {
        subMenuName: 'Add Employee',
        onSubMenuName: () => {
          Navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_FORM);
        },
      },
      {
        subMenuName: 'All Employee',
        onSubMenuName: () => {
          Navigation.navigate(TAB_ROUTE_NAME.EMPLOYEE_TAB);
        },
      },
    ],
  },
];
