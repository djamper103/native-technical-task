import React, {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {routes} from './routes';
import {Image, StyleSheet} from 'react-native';
import {CustomDrawer} from './components/customDrawer/index';
import {COLORS} from '../constants/colors';

const Drawer = createDrawerNavigator();

export const Tabs: FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.MAROON_FLUSH,
        drawerActiveTintColor: COLORS.WHITE,
        drawerInactiveTintColor: COLORS.BLACK,
        drawerLabelStyle: {
          fontSize: 16,
        },
        headerTitleStyle: {
          fontSize: 24,
          color: COLORS.WHITE,
        },
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#4579BF',
        },
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
    tintColor: '#b1c5e2',
  },
});

////////////////////////////////////1

// import React, {FC} from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {routes} from './routes';
// import {Image, StyleSheet} from 'react-native';
// import {dh, dw} from '../utils/dimensions';
// import {COLORS} from '../constants/colors';

// const Drawer = createDrawerNavigator();

// export const Tabs: FC = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerActiveBackgroundColor: COLORS.PINK,
//         drawerActiveTintColor: COLORS.WHITE,
//         drawerInactiveTintColor: COLORS.BLACK,
//         drawerLabelStyle: {
//           marginLeft: -20,
//           fontSize: 16,
//         },
//         headerTitleStyle: {
//           fontSize: 24,
//         },
//         headerTitleAlign: 'center',
//         headerStyle: {
//           backgroundColor: COLORS.PINK,
//         },
//       }}>
//       {routes.map(route => (
//         <Drawer.Screen
//           name={route.name}
//           component={route.component}
//           key={route.name}
//           options={{
//             drawerIcon: ({}) => (
//               <Image source={route.image} style={styles.image} />
//             ),
//           }}
//         />
//       ))}
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: dw(20),
//     height: dh(20),
//   },
// });

/////////////////

// import {FavoritePage} from '../components/favoritePage';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Image, StyleSheet, Text, View} from 'react-native';
// import {ProfilePage} from '../components/profilePage';

// const Tab = createBottomTabNavigator();

// export const Tabs: FC = () => {
//   return (
// <Tab.Navigator
//   initialRouteName="Home"
//   screenOptions={{tabBarShowLabel: false}}>
//   <Tab.Screen
//     name="Home"
//     component={HomePage}
//     options={{
//       tabBarIcon: ({focused}) => (
//         <View style={styles.container}>
//           <Image
//             style={[styles.image, focused && styles.imageActive]}
//             source={{
//               uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}
//           />
//           <Text style={[styles.text, focused && styles.textActive]}>
//             Home
//           </Text>
//         </View>
//       ),
//     }}
//   />

//   <Tab.Screen
//     name="FavoritePage"
//     component={FavoritePage}
//     options={{
//       tabBarIcon: ({focused}) => (
//         <View style={styles.container}>
//           <Image
//             style={[styles.image, focused && styles.imageActive]}
//             source={{
//               uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}
//           />
//           <Text style={[styles.text, focused && styles.textActive]}>
//             Favorite
//           </Text>
//         </View>
//       ),
//     }}
//   />
//   <Tab.Screen
//     name="ProfilePage"
//     component={ProfilePage}
//     options={{
//       tabBarIcon: ({focused}) => (
//         <View style={styles.container}>
//           <Image
//             style={[styles.image, focused && styles.imageActive]}
//             source={{
//               uri: 'https://reactnative.dev/img/tiny_logo.png',
//             }}
//           />
//           <Text style={[styles.text, focused && styles.textActive]}>
//             Profile
//           </Text>
//         </View>
//       ),
//     }}
//   />
// </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 25,
//     height: 25,
//     resizeMode: 'contain',
//   },
//   //   imageActive: {
//   //     tintColor: 'red',
//   //   },
//   text: {
//     fontSize: 12,
//     color: 'black',
//   },
//   textActive: {
//     fontSize: 12,
//     color: 'red',
//   },
// });
