import {IconContainer} from 'components/common/iconContainer';
import {COLORS} from 'constants/colors';
import {DEFAULT_PERSON_ICON} from 'constants/images';
import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {dw} from 'utils/dimensions';

interface UserImageProps {
  imageUrl?: string;
  containerStyle?: ViewStyle;
  icon?: ImageSourcePropType;
  isTheme?: boolean;
  onPress?: () => void;
}

export const UserImage: FC<UserImageProps> = ({
  imageUrl,
  containerStyle,
  icon,
  isTheme,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <View
        style={[
          styles.containerCircle,
          isTheme && styles.containerCircleActive,
        ]}>
        <Image
          source={imageUrl !== '' ? {uri: imageUrl} : DEFAULT_PERSON_ICON}
          style={styles.image}
        />
        <IconContainer
          onPress={onPress}
          containerStyle={styles.containerStyle}
          icon={icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerCircle: {
    borderRadius: dw(100),
    backgroundColor: COLORS.WHITE,
    width: dw(110),
    height: dw(110),
    alignItems: 'center',
  },
  containerCircleActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerStyle: {
    bottom: dw(45),
    left: dw(50),
  },
  image: {
    width: dw(100),
    height: dw(100),
    borderRadius: dw(100),
    top: dw(5),
  },
});
