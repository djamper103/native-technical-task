import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {UserProfile} from '../userProfile';
import _ from 'lodash';

export const CustomDrawer: FC = props => {
  return (
    <DrawerContentScrollView>
      <UserProfile onPressTheme={_.noop} {...props} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
