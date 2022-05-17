import {COLORS} from 'constants/colors';
import {DEFAULT_PERSON_ICON} from 'constants/images';
import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {dw} from 'utils/dimensions';

interface IconContainerProps {
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  imageStyle?: any;
  onPress?: () => void;
}

export const IconContainer: FC<IconContainerProps> = ({
  icon,
  containerStyle,
  imageStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {onPress ? (
        <Pressable onPress={onPress}>
          <Image
            source={icon ? icon : DEFAULT_PERSON_ICON}
            style={[styles.image, imageStyle && imageStyle]}
          />
        </Pressable>
      ) : (
        <Image
          source={icon ? icon : DEFAULT_PERSON_ICON}
          style={[styles.image, imageStyle && imageStyle]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.CLOUD_BURST,
    width: dw(55),
    height: dw(55),
    borderRadius: dw(50),
  },
  image: {
    resizeMode: 'contain',
    tintColor: COLORS.WHITE,
  },
});
