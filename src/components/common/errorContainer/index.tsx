import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dw} from '../../../utils/dimensions';

interface ErrorContainerProps {
  text?: string;
  isTheme?: boolean;
}

export const ErrorContainer: FC<ErrorContainerProps> = ({
  text = 'Not data yet',
  isTheme,
}) => {
  return (
    <View style={styles.containerText}>
      <Text style={[styles.text, isTheme && styles.textActive]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginTop: dw(250),
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 28,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
