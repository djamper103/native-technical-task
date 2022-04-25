import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './navigation';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {setupStore} from './redux/store/store';
import {routesStack} from './navigation/routes';
import {COLORS} from './constants/colors';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const store = setupStore();

const App = () => {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
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
                  backgroundColor: COLORS.CLOUD_BURST,
                },
                headerTintColor: COLORS.WHITE,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
