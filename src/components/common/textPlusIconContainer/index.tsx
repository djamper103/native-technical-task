import React, {FC} from 'react';
import {ImageSourcePropType, StyleSheet, View, ViewStyle} from 'react-native';
import {IconContainer} from '../iconContainer';
import {TextContainer} from '../textContainer';

interface TextIconContainerProps {
  textHeader?: string;
  textBottom?: string;
  isTheme?: boolean;
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  containerIconStyle?: ViewStyle;
  containerTextStyle?: ViewStyle;
  imageStyle?: any;
}

export const TextIconContainer: FC<TextIconContainerProps> = ({
  textHeader,
  textBottom,
  isTheme,
  icon,
  containerStyle,
  containerIconStyle,
  containerTextStyle,
  imageStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <IconContainer
        containerStyle={containerIconStyle}
        icon={icon}
        imageStyle={imageStyle}
      />
      <TextContainer
        isTheme={isTheme}
        textHeader={textHeader}
        textBottom={textBottom}
        containerStyle={containerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
