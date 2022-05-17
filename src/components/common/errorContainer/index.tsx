import React, {FC} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {ButtonContainer} from '../button';

interface ErrorContainerProps {
  text?: string;
  buttonText?: string;
  isTheme?: boolean;
  containerStyle?: ViewStyle;
  containerButtonStyle?: ViewStyle;
  onPress?: () => void;
}

export const ErrorContainer: FC<ErrorContainerProps> = ({
  text = 'Not data yet',
  buttonText = 'Refresh',
  isTheme,
  containerStyle,
  containerButtonStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {text && (
        <Text style={[styles.text, isTheme && styles.textActive]}>{text}</Text>
      )}
      {onPress && (
        <ButtonContainer
          onPress={onPress}
          text={buttonText}
          containerStyle={containerButtonStyle}
        />
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
});
