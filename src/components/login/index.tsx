import React, {useState, FC, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Input} from 'components/input';
// import firestore from '@react-native-firebase';

interface LoginProps {
  navigation?: any;
}

export const Login: FC<LoginProps> = ({navigation}) => {
  const [user, setUser] = useState<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPress = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(e => {
          console.log(e);
        });
    } catch (error) {
      console.log('Something went wrong with added user to firestore: ', error);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setUser(auth().currentUser);
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const registration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View>
      <Input onChangeText={setEmail} text={email} />
      <Input
        secureTextEntry={true}
        onChangeText={setPassword}
        text={password}
      />
      <Button title="Sign in" onPress={onPress} />
      <Button title="Registration" onPress={registration} />
    </View>
  );
};

// import React, {FC, useCallback, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Animated,
//   Easing,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import {COLORS} from '../../constants/colors';
// import {dw} from '../../utils/dimensions';
// // import {authentication} from '../../../firebase/firebase-config';
// // import createUserWithEmailAndPassword from '@react-native-firebase/auth';

// interface LoginProps {}

// export const Login: FC<LoginProps> = ({}) => {
//   // const registration = () => {
//   //   createUserWithEmailAndPassword(authentication);
//   // };

//   const [isActive, setActive] = useState(false);

//   const animatedValue = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
//   const moveToogle = useCallback(() => {
//     Animated.timing(animatedValue, {
//       toValue: isActive ? {x: 0, y: 0} : {x: -30, y: 0},
//       useNativeDriver: false,
//       duration: 300,
//       easing: Easing.ease,
//     }).start(() => {
//       setActive(!isActive);
//     });
//   }, [animatedValue, isActive]);

//   return (
//     <TouchableOpacity onPress={moveToogle}>
//       <View
//         style={[
//           styles.containerToogle,
//           isActive && styles.containerToogleActive,
//         ]}
//       />
//       <Animated.View style={animatedValue.getLayout()}>
//         <View style={styles.containerCircle}>
//           <View style={[styles.circle, isActive && styles.circleActive]} />
//         </View>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   containerToogle: {
//     width: dw(50),
//     height: dw(20),
//     borderRadius: dw(50),
//     backgroundColor: COLORS.GHOST,
//     opacity: 1,
//   },
//   containerToogleActive: {
//     // backgroundColor: COLORS.APPLE,
//   },
//   containerCircle: {
//     bottom: dw(32),
//     left: dw(28),
//   },
//   circle: {
//     width: dw(22),
//     height: dw(22),
//     borderRadius: dw(22),
//     borderWidth: dw(3),
//     borderColor: COLORS.ALUMINIUM,
//     marginTop: dw(10),
//   },
//   circleActive: {
//     borderWidth: dw(8),
//     borderColor: COLORS.APPLE,
//   },
//   text: {
//     color: COLORS.BLACK,
//     fontSize: 16,
//   },
// });
