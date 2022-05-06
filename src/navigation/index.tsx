import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../constants/colors';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {dw} from '../utils/dimensions';
import {DrawerScreen} from './components/index';
// import {Tabs} from './components/tabs';
import {routesStack} from './routes';
import auth from '@react-native-firebase/auth';
import {isSignIn} from 'redux/store/actionCreator/actionCreatorLogin';

export const NavigationContainerFC: FC = () => {
  const Stack = createStackNavigator();
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth().currentUser !== null && dispatch(isSignIn());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={isTheme ? COLORS.CLOUD_BURST : COLORS.STEEL_BLUE}
      />
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Drawer"
          component={DrawerScreen}
          options={{
            headerShown: false,
          }}
        />
        {routesStack.map(el => (
          <Stack.Screen
            name={el.name}
            component={el.component}
            key={el.name}
            options={{
              headerTitleStyle: {
                fontSize: 24,
                color: COLORS.WHITE,
              },
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: isTheme
                  ? COLORS.CLOUD_BURST
                  : COLORS.STEEL_BLUE,
                height: dw(57),
              },
              headerTintColor: COLORS.WHITE,
              cardStyle: {
                backgroundColor: isTheme ? COLORS.OXFORD_BLUE : COLORS.WHITE,
              },
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
