import {ErrorContainer} from 'components/common/errorContainer';
import {useAppDispatch, useAppSelector} from 'hooks/redux';
import React, {FC, useEffect, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {setIsNet} from 'redux/store/actionCreator/actionCreator';
import {
  changeImage,
  changeName,
  signOut,
} from 'redux/store/actionCreator/actionCreatorLogin';
import {dw} from 'utils/dimensions';
import {COLORS} from '../../constants/colors';
import {ProfilePageMainContent} from './components';

interface ProfilePageProps {
  navigation?: any;
}

export const ProfilePage: FC<ProfilePageProps> = ({navigation}) => {
  const {imageUrl} = useAppSelector(reducer => reducer.loginReducer);
  const {userName} = useAppSelector(reducer => reducer.loginReducer);
  const {email} = useAppSelector(reducer => reducer.loginReducer);
  const {date} = useAppSelector(reducer => reducer.loginReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {isSignIn} = useAppSelector(reducer => reducer.loginReducer);
  const {isNet} = useAppSelector(reducer => reducer.internetReducer);

  const [isChangeName, setIsChangeName] = useState(false);

  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(signOut());
  };

  const setPhoto = () => {
    dispatch(changeImage());
  };

  const setName = (text: string) => {
    setIsChangeName(!isChangeName);
    dispatch(changeName(text));
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const setNetInfo = useCallback(() => {
    dispatch(setIsNet());
  }, [dispatch]);

  useEffect(() => {
    setNetInfo();
  }, [setNetInfo]);
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isTheme && styles.containerActive,
        (!isSignIn || !isNet) && styles.containerLogout,
      ]}
      showsVerticalScrollIndicator={false}>
      {isNet ? (
        isSignIn ? (
          <ProfilePageMainContent
            imageUrl={imageUrl}
            userName={userName}
            email={email}
            date={date}
            isTheme={isTheme}
            isChangeName={isChangeName}
            changeName={setName}
            changePhoto={setPhoto}
            logout={logout}
            setIsChangeName={setIsChangeName}
          />
        ) : (
          <ErrorContainer
            onPress={goToLogin}
            isTheme={isTheme}
            text={'Log into your account to see your favorites'}
            buttonText={'Login'}
            containerButtonStyle={styles.containerButtonStyle}
          />
        )
      ) : (
        <ErrorContainer
          text={'No internet connection'}
          isTheme={isTheme}
          onPress={setNetInfo}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerLogout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    marginTop: dw(50),
  },
  containerButtonStyle: {
    marginTop: dw(20),
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 24,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.WHITE,
  },
  buttonStyle: {justifyContent: 'center'},
});
