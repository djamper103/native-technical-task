import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dh, dw} from '../../../utils/dimensions';

interface VoteContainerProps {
  vote: string;
  containerStyle?: ViewStyle;
  textStyle?: ViewStyle;
}

export const VoteContainer: FC<VoteContainerProps> = ({
  vote,
  containerStyle,
  textStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle && containerStyle,
        vote < '7' && styles.containerLow,
        // eslint-disable-next-line eqeqeq
        vote == '0' && styles.containerNull,
      ]}>
      <Text style={[styles.text, textStyle && textStyle]}>{vote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.APPLE,
    width: dw(40),
    height: dh(40),
    borderRadius: dw(20),
    justifyContent: 'center',
  },
  containerLow: {
    backgroundColor: COLORS.MAROON_FLUSH,
  },
  containerNull: {
    backgroundColor: COLORS.SAN_MARINO,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
