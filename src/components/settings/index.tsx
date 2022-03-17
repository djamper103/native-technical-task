import React, {FC} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../constants/colors';
import {IN_WORK_ICON} from '../../constants/images';
import {dh, dw} from '../../utils/dimensions';

interface SettingsProps {}

export const Settings: FC<SettingsProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>In Work</Text>
      <Image source={IN_WORK_ICON} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    height: '100%',
  },
  text: {
    fontSize: 24,
    color: COLORS.DUNE,
  },
  image: {
    resizeMode: 'contain',
    width: dw(400),
    height: dh(600),
    backgroundColor: COLORS.TRANSPARENT,
  },
});
