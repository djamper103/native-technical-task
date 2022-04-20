import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dh} from '../../utils/dimensions';

interface LoginProps {}

export const Login: FC<LoginProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: dh(20),
    padding: dh(20),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
  },
});
