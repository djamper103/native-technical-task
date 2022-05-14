import React, {FC} from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FAVORITE_ICON} from '../../../constants/images';

interface FavoriteIconProps {
  isFavorite?: boolean;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({
  isFavorite,
  containerStyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image
          style={[styles.image, isFavorite && styles.imageActive]}
          source={FAVORITE_ICON}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    tintColor: COLORS.STEEL_BLUE,
  },
  imageActive: {
    tintColor: COLORS.RED,
  },
});
