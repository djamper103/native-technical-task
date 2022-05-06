import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {signOut} from 'redux/store/actionCreator/actionCreatorLogin';
import {COLORS} from '../../../constants/colors';
import {SIGN_IN_ICON, SIGN_OUT_ICON} from '../../../constants/images';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {dh, dw} from '../../../utils/dimensions';

interface LoginMenuProps {
  navigation?: any;
}

export const LoginMenu: FC<LoginMenuProps> = ({navigation}) => {
  const {isSignIn} = useAppSelector(reducer => reducer.loginReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  const onPress = () => {
    if (isSignIn) {
      dispatch(signOut());
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.containerMain}>
        <Image
          source={isSignIn ? SIGN_OUT_ICON : SIGN_IN_ICON}
          style={styles.image}
        />
        <Text style={[styles.text, isTheme && styles.textActive]}>
          {isSignIn ? 'Sign out' : 'Sign in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: dh(20),
    padding: dw(16),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  containerMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: '500',
  },
  textActive: {
    color: COLORS.WHITE,
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.PERIWINKLE_GRAY,
    marginRight: dw(34),
  },
});
