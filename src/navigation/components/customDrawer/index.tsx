import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {UserProfile} from '../userProfile';
import {LoginMenu} from '../loginMenu';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {setTheme} from 'redux/store/actionCreator/actionCreator';

export const CustomDrawer: FC = (props: any) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {imageUrl} = useAppSelector(reducer => reducer.loginReducer);
  const {userName} = useAppSelector(reducer => reducer.loginReducer);

  const dispatch = useAppDispatch();

  const onPressTheme = () => {
    dispatch(setTheme());
  };

  return (
    <DrawerContentScrollView>
      <UserProfile
        onPressTheme={onPressTheme}
        {...props}
        isTheme={isTheme}
        imageUrl={imageUrl}
        userName={userName}
      />
      <DrawerItemList {...props} />
      <LoginMenu navigation={props.navigation} />
    </DrawerContentScrollView>
  );
};
