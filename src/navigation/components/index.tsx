import React, {FC, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {routes} from '../routes';
import {Image, StyleSheet} from 'react-native';
import {CustomDrawer} from './customDrawer/index';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {dw} from '../../utils/dimensions';
import {setFavorite} from 'redux/store/actionCreator/actionCreatorFavorite';

const Drawer = createDrawerNavigator();

export const DrawerScreen: FC = () => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavorite());
  }, [dispatch]);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.MAROON_FLUSH,
        drawerActiveTintColor: COLORS.WHITE,
        drawerInactiveTintColor: isTheme ? COLORS.WHITE : COLORS.BLACK,
        drawerStyle: {
          backgroundColor: isTheme ? COLORS.OXFORD_BLUE : COLORS.WHITE,
          width: dw(270),
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        headerTitleStyle: {
          fontSize: 24,
          color: COLORS.WHITE,
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: isTheme ? COLORS.CLOUD_BURST : COLORS.STEEL_BLUE,
          height: dw(57),
        },
        headerTintColor: COLORS.WHITE,
      }}>
      {routes.map(route => (
        <Drawer.Screen
          name={route.name}
          component={route.component}
          key={route.name}
          options={{
            drawerIcon: ({}) => (
              <Image source={route.image} style={styles.image} />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.PERIWINKLE_GRAY,
  },
});
