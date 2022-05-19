import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import {dw} from 'utils/dimensions';
import {RegisrationType} from 'types/login';
import {patternEmail, patternPassword} from 'components/common/login';
import {
  registration,
  resetRegistration,
} from 'redux/store/actionCreator/actionCreatorLogin';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {uploadPhoto} from 'components/common/functions/uploadPhoto';
import {ModalContainer} from 'components/common/modal';
import {setValue} from 'components/common/functions/setValue';
import {ButtonContainer} from 'components/common/button';
import {LoaderContainer} from 'components/common/loader';

interface Registrationrops {
  navigation?: any;
}

export const Registration: FC<Registrationrops> = ({navigation}) => {
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState<any>('');

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

  const setModal = () => {
    setValue(false, setIsModal);
  };

  const onSubmit = async (data: RegisrationType) => {
    setValue(true, setIsModal);
    if (uploadUri !== '') {
      dispatch(
        registration({
          email: data.email,
          password: data.password,
          uploadUri: uploadUri,
          name: data.name,
        }),
      );
    }
  };

  useEffect(() => {
    setError(registrationError);
  }, [registrationError]);

  useEffect(() => {
    if (error !== '' && !isRegistration) {
      setValue(false, setIsModal);
      Alert.alert(`${error}`);
    }
  }, [error, isRegistration]);

  useEffect(() => {
    setError('');
    setValue(false, setIsModal);
    if (isRegistration) {
      navigation.navigate('Login');
      dispatch(resetRegistration());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistration]);

  const setImage = () => {
    uploadPhoto('image').then((el: any) => setUploadUri(el.assets[0].uri));
  };

  const setPhoto = () => {
    uploadPhoto('photo').then((el: any) => setUploadUri(el.assets[0].uri));
  };

  return (
    <View style={styles.container}>
      {isModal && (
        <ModalContainer onPress={setModal} isModal={isModal}>
          <LoaderContainer />
        </ModalContainer>
      )}
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
          <ButtonContainer
            onPress={setImage}
            text={'Upload Image'}
            containerStyle={styles.containerButtonImage}
          />
          <ButtonContainer
            onPress={setPhoto}
            text={'Upload Photo'}
            containerStyle={styles.containerButton}
          />
        </View>
        <View style={styles.containerSubmit}>
          <ButtonContainer
            onPress={handleSubmit(onSubmit)}
            text={'Submit'}
            containerStyle={styles.containerButton}
          />
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
  containerButtonImage: {
    marginTop: dw(10),
    marginRight: dw(10),
  },
  containerUpload: {
    flexDirection: 'row',
    marginBottom: dw(20),
    justifyContent: 'center',
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
