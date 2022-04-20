import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './navigation';
import 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {setupStore} from './redux/store/store';
import {routesStack} from './navigation/routes';

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
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
