import React, {FC, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import {dw} from 'utils/dimensions';
import {MMKV} from 'react-native-mmkv';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {patternEmail, patternPassword} from 'components/common/login';
import {SignInType} from 'types/login';
import {
  deleteLoginError,
  signIn,
} from 'redux/store/actionCreator/actionCreatorLogin';

export const storage = new MMKV();

interface LoginProps {
  navigation?: any;
}

export const Login: FC<LoginProps> = ({navigation}) => {
  const {isSignIn} = useAppSelector(reducer => reducer.loginReducer);
  const {errorSignIn} = useAppSelector(reducer => reducer.loginReducer);

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

  const dispatch = useAppDispatch();

  const onSubmit = async (data: SignInType) => {
    dispatch(deleteLoginError());
    try {
      dispatch(
        signIn({
          email: data.email,
          password: data.password,
        }),
      );
      if (errorSignIn !== '' && !isSignIn) {
        Alert.alert(`${errorSignIn}`);
      }
    } catch (er: any) {
      Alert.alert(`Something went wrong ${er}`);
    }
  };

  useEffect(() => {
    if (isSignIn) {
      navigation.navigate('Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  const registration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: patternEmail,
        }}
        render={({field: {onChange, value}}) => (
          <Input onChangeText={onChange} text={value} placeholder={'Email'} />
        )}
        name="email"
      />
      {errors.email && <Text style={styles.text}>Enter email correctly</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 12,
          minLength: 6,
          required: true,
          pattern: patternPassword,
        }}
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
    width: dw(180),
    paddingVertical: dw(10),
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
