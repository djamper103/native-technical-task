import {COLORS} from 'constants/colors';
import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import {dh, dw} from 'utils/dimensions';

interface LoaderContainerProps {
  size?: any;
  color?: string;
  containerStyle?: ViewStyle;
}

export const LoaderContainer: FC<LoaderContainerProps> = ({
  size = dw(150),
  color = COLORS.STEEL_BLUE,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: dh(150),
  },
});
