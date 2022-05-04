import React, {FC, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import {dw} from 'utils/dimensions';
import {RegisrationType} from 'types/login';
import auth from '@react-native-firebase/auth';

interface Registrationrops {
  navigation?: any;
}

export const Registration: FC<Registrationrops> = ({navigation}) => {
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const onSubmit = async (data: RegisrationType) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
          if (error === '') {
            navigation.navigate('Login');
          } else {
            Alert.alert('something went wrong please try again');
          }
        });
    } catch (er: any) {
      setError(er);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
          pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@|[-`{-~]).{6,12}$/,
        }}
        render={({field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            text={value}
            placeholder={'Password'}
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

      <Controller
        control={control}
        rules={{
          maxLength: 15,
          minLength: 3,
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            text={value}
            placeholder={'Your name'}
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text style={styles.text}>
          Enter your name, minimum length is 2 letters
        </Text>
      )}
      <View style={styles.containerButton}>
        <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
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
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
});
