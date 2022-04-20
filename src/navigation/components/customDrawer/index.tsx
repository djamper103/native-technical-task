import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {UserProfile} from '../userProfile';
import _ from 'lodash';
import {LoginMenu} from '../loginMenu';

export const CustomDrawer: FC = (props: any) => {
  return (
    <DrawerContentScrollView>
      <UserProfile onPressTheme={_.noop} {...props} />
      <DrawerItemList {...props} />
      <LoginMenu navigation={props.navigation} />
    </DrawerContentScrollView>
  );
};
