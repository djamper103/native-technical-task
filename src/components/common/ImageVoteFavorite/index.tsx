import {FavoriteIcon} from 'components/common/favorite';
import {VoteContainer} from 'components/common/vote';
import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {dw} from 'utils/dimensions';

interface ImageVoteFavoriteProps {
  data: any;
  isFavorite: boolean;
  icon?: ImageSourcePropType;
  containerStyle?: ViewStyle;
  imageStyle?: any;
  containerStyleRating?: ViewStyle;
  containerStyleFavorite?: ViewStyle;
  onPress: () => void;
}

export const ImageVoteFavorite: FC<ImageVoteFavoriteProps> = ({
  data,
  isFavorite,
  icon,
  containerStyle,
  imageStyle,
  containerStyleRating,
  containerStyleFavorite,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <Image
        style={[styles.image, imageStyle && imageStyle]}
        source={
          icon
            ? icon
            : {
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }
        }
      />
      <VoteContainer
        vote={data.vote_average}
        containerStyle={
          containerStyleRating ? containerStyleRating : styles.containerRating
        }
      />
      <FavoriteIcon
        isFavorite={isFavorite}
        containerStyle={
          containerStyleFavorite
            ? containerStyleFavorite
            : styles.containerFavorite
        }
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dw(300),
  },
  containerRating: {
    bottom: dw(296),
    left: dw(135),
  },
  containerFavorite: {
    bottom: dw(290),
    left: dw(66),
  },
  image: {
    width: dw(180),
    height: dw(300),
    borderRadius: dw(14),
  },
});
