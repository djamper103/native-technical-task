import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import {dw} from 'utils/dimensions';
import auth from '@react-native-firebase/auth';
import {SignIn} from 'types/login';

interface LoginProps {
  navigation?: any;
}

export const Login: FC<LoginProps> = ({navigation}) => {
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignIn) => {
    try {
      await auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
          if (error === '') {
            navigation.navigate('Home');
          } else {
            Alert.alert('something went wrong please try again');
          }
        });
    } catch (er: any) {
      setError(er);
    }
  };

  useEffect(() => {
    console.log(auth().currentUser);
    auth().currentUser && navigation.navigate('Home');
  }, []);

  // const logout = async () => {
  //   try {
  //     await auth().signOut();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const registration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        // rules={{
        //   required: true,
        //   pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        // }}
        render={({field: {onChange, value}}) => (
          <Input onChangeText={onChange} text={value} placeholder={'Email'} />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.text}>Enter email correctly</Text>}

      <Controller
        control={control}
        // rules={{
        //   maxLength: 12,
        //   minLength: 6,
        //   required: true,
        //   pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@|[-`{-~]).{6,12}$/,
        // }}
        render={({field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            text={value}
            placeholder={'Password'}
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.text}>
          Password must start with a capital letter and be at least 6 characters
          long max 12
        </Text>
      )}

      <View style={styles.containerButton}>
        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <Pressable onPress={registration} style={styles.button}>
          <Text style={styles.buttonText}>Registration</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: dw(10),
  },
  containerButton: {
    alignItems: 'center',
    marginTop: dw(10),
  },
  text: {
    color: COLORS.RED,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.STEEL_BLUE,
    width: dw(160),
    height: dw(60),
    borderRadius: dw(15),
    justifyContent: 'center',
    marginBottom: dw(15),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
});

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
