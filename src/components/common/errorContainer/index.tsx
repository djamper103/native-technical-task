import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dw} from '../../../utils/dimensions';

interface ErrorContainerProps {
  text?: string;
  isTheme?: boolean;
  isButton?: boolean;
  containerStyle?: ViewStyle;
  containerButtonStyle?: ViewStyle;
  onPress?: () => void;
}

export const ErrorContainer: FC<ErrorContainerProps> = ({
  text = 'Not data yet',
  isTheme,
  isButton,
  containerStyle,
  containerButtonStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {text && (
        <Text style={[styles.text, isTheme && styles.textActive]}>{text}</Text>
      )}
      {isButton && (
        <Pressable
          onPress={onPress}
          style={[styles.button, containerButtonStyle && containerButtonStyle]}>
          <Text style={styles.buttonText}>Refresh</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 28,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.WHITE,
  },
  button: {
    backgroundColor: COLORS.STEEL_BLUE,
    width: dw(170),
    paddingVertical: dw(10),
    borderRadius: dw(15),
    marginTop: dw(30),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
});
