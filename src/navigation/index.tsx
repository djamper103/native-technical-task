import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import {COLORS} from '../constants/colors';
import {useAppSelector} from '../hooks/redux';
import {dw} from '../utils/dimensions';
import {Tabs} from './components/index';
import {routesStack} from './routes';

export const NavigationContainerFC: FC = () => {
  const Stack = createStackNavigator();
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
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
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
