import {COLORS} from 'constants/colors';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {dw} from 'utils/dimensions';

interface SignOutProps {
  navigation?: any;
  isTheme?: boolean;
}

export const SignOut: FC<SignOutProps> = ({navigation, isTheme}) => {
  const onPress = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      <Text style={[styles.text, isTheme && styles.textActive]}>
        Log into your account to see your favorites.
      </Text>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    marginTop: dw(200),
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.BLACK,
  },
  textActive: {
    color: COLORS.WHITE,
  },
  button: {
    backgroundColor: COLORS.STEEL_BLUE,
    width: dw(160),
    height: dw(60),
    borderRadius: dw(15),
    justifyContent: 'center',
    marginVertical: dw(25),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
});
