import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FavoritePage} from '../../../components/favoritePage';
import {HomePage} from '../../../components/homePage';
import {ProfilePage} from '../../../components/profilePage';

const Tab = createBottomTabNavigator();

export const Tabs: FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                style={[styles.image, focused && styles.imageActive]}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
              <Text style={[styles.text, focused && styles.textActive]}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Favorite Page"
        component={FavoritePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                style={[styles.image, focused && styles.imageActive]}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
              <Text style={[styles.text, focused && styles.textActive]}>
                Favorite
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image
                style={[styles.image, focused && styles.imageActive]}
                source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
              />
              <Text style={[styles.text, focused && styles.textActive]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  imageActive: {
    tintColor: 'red',
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
  textActive: {
    fontSize: 12,
    color: 'red',
  },
});
