import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dh} from '../../../utils/dimensions';

interface LineComponentProps {}

export const LineComponent: FC<LineComponentProps> = ({}) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: COLORS.GHOST,
    marginVertical: dh(20),
  },
});
