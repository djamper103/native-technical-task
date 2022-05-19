import React, {FC, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input} from 'components/input';
import {COLORS} from 'constants/colors';
import {dw} from 'utils/dimensions';
import {MMKV} from 'react-native-mmkv';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {patternEmail, patternPassword} from 'components/common/login';
import {SignInType} from 'types/login';
import {
  resetPassword,
  signIn,
} from 'redux/store/actionCreator/actionCreatorLogin';
import {ModalContainer} from 'components/common/modal';
import {setValue} from 'components/common/functions/setValue';
import {ButtonContainer} from 'components/common/button';
import {ScrollView} from 'react-native-gesture-handler';
import {LoaderContainer} from 'components/common/loader';
import {ResetPassword} from './components/resetPassword';
import {RESET_PASSWORD_ICON} from 'constants/images';

export const storage = new MMKV();

interface LoginProps {
  navigation?: any;
}

export const Login: FC<LoginProps> = ({navigation}) => {
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState<any>('');
  const [isResetPassword, setIsResetPassword] = useState(false);

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

  const setModal = () => {
    setValue(false, setIsModal);
  };

  const onSubmit = async (data: SignInType) => {
    setValue(true, setIsModal);
    dispatch(
      signIn({
        item: {
          email: data.email,
          password: data.password,
        },
        isLogin: isSignIn,
      }),
    );
  };

  useEffect(() => {
    setError(errorSignIn);
  }, [errorSignIn]);

  useEffect(() => {
    if (error !== '' && !isSignIn) {
      setValue(false, setIsModal);
      Alert.alert(`${error}`);
    }
  }, [error, isSignIn]);

  useEffect(() => {
    setError('');
    setValue(false, setIsModal);
    if (isSignIn) {
      navigation.navigate('Home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  const registration = () => {
    navigation.navigate('Registration');
  };

  const isReset = () => {
    setIsResetPassword(!isResetPassword);
  };

  const resetpassword = (email: string) => {
    dispatch(resetPassword({email: email, func: isReset}));
  };

  return (
    <ScrollView style={styles.container}>
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
          <Input text={value} placeholder={'Email'} onChangeText={onChange} />
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
            text={value}
            placeholder={'Password'}
            secureTextEntry={true}
            rightIcon={RESET_PASSWORD_ICON}
            onPressRightIcon={isReset}
            onChangeText={onChange}
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

      {isResetPassword ? (
        <ResetPassword
          containerButton={styles.containerButtonReset}
          textStyleButton={styles.textStyleButton}
          textError={styles.text}
          onPressButton={resetpassword}
        />
      ) : (
        <View style={styles.containerButton}>
          <ButtonContainer
            text={'Submit'}
            containerStyle={styles.containerButton}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
      <ButtonContainer
        text={'Registration'}
        containerStyle={styles.containerButton}
        onPress={registration}
      />
    </ScrollView>
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
  containerButtonReset: {
    alignItems: 'center',
    marginTop: dw(20),
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
  textStyleButton: {
    fontSize: 22,
  },
});
