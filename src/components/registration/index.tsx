import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import {dw} from 'utils/dimensions';
import {RegisrationType} from 'types/login';
import {patternEmail, patternPassword} from 'components/common/login';
import {
  deleteRegistrationError,
  registration,
} from 'redux/store/actionCreator/actionCreatorLogin';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {uploadPhoto} from 'components/common/functions/uploadPhoto';

interface Registrationrops {
  navigation?: any;
}

export const Registration: FC<Registrationrops> = ({navigation}) => {
  const [uploadUri, setUploadUri] = useState('');
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
  const {isRegistration} = useAppSelector(
    reducer => reducer.registrationReducer,
  );
  const {registrationError} = useAppSelector(
    reducer => reducer.registrationReducer,
  );

  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisrationType) => {
    dispatch(deleteRegistrationError());
    try {
      if (uploadUri !== '') {
        dispatch(
          registration({
            email: data.email,
            password: data.password,
            uploadUri: uploadUri,
            name: data.name,
          }),
        );
        if (registrationError !== '' && !isRegistration) {
          Alert.alert(`${registrationError}`);
        }
      }
    } catch (er: any) {
      Alert.alert(`Something went wrong ${er}`);
    }
  };

  const setImage = () => {
    uploadPhoto('image').then((el: any) => setUploadUri(el.assets[0].uri));
  };

  const setPhoto = () => {
    uploadPhoto('photo').then((el: any) => setUploadUri(el.assets[0].uri));
  };

  useEffect(() => {
    if (isRegistration) {
      navigation.navigate('Login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistration]);

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
        <View style={styles.containerUpload}>
          <Pressable onPress={setImage} style={styles.button}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </Pressable>
          <Pressable onPress={setPhoto} style={styles.button}>
            <Text style={styles.buttonText}>Upload Photo</Text>
          </Pressable>
        </View>
        <View style={styles.containerSubmit}>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={[styles.button, styles.buttonSubmit]}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: dw(10),
  },
  containerButton: {
    marginTop: dw(10),
  },
  containerUpload: {
    flexDirection: 'row',
    marginBottom: dw(20),
    justifyContent: 'space-between',
    marginHorizontal: dw(5),
  },
  containerSubmit: {
    alignItems: 'center',
  },
  text: {
    color: COLORS.RED,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.STEEL_BLUE,
    paddingHorizontal: dw(10),
    paddingVertical: dw(10),
    borderRadius: dw(15),
  },
  buttonSubmit: {
    width: dw(170),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 22,
    textAlign: 'center',
  },
});
