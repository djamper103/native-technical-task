import {ImageVoteFavorite} from 'components/common/ImageVoteFavorite';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {imagePath} from '../../../constants/common';
import {NO_PICTURE_LONG_ICON} from '../../../constants/images';
import {MovieData} from '../../../types/movieData';
import {dw} from '../../../utils/dimensions';

interface CurrentMovieHeaderProps {
  state: MovieData;
  type: string;
  isTheme?: boolean;
  isFavorite: boolean;
  pressFavorite: () => void;
}

export const CurrentMovieHeader: FC<CurrentMovieHeaderProps> = ({
  state,
  type,
  isTheme,
  isFavorite,
  pressFavorite,
}) => {
  const [date, setDate] = useState<string | undefined>('');

  useEffect(() => {
    let currentType =
      type === 'movie' ? state.release_date : state.first_air_date;
    setDate(currentType?.split('-')[0]);
  }, [state, type]);

  const onPressFavorite = () => {
    pressFavorite();
  };

  return (
    <View style={styles.container}>
      <ImageVoteFavorite
        data={state}
        isFavorite={isFavorite}
        icon={
          state.backdrop_path
            ? {
                uri: `${imagePath}${state.backdrop_path}`,
              }
            : NO_PICTURE_LONG_ICON
        }
        imageStyle={styles.image}
        containerStyleFavorite={styles.containerFavorite}
        containerStyleRating={styles.containerVote}
        containerStyle={styles.containerStyle}
        onPress={onPressFavorite}
      />
      <View style={styles.containerHeaderText}>
        <Text style={[styles.text, isTheme && styles.textActive]}>
          {type === 'movie' ? state.title : state.name} ({date}){' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  containerHeaderText: {
    marginVertical: dw(20),
    paddingHorizontal: dw(10),
  },
  containerVote: {
    bottom: dw(210),
    left: dw(10),
  },
  containerFavorite: {
    bottom: dw(248),
    left: dw(170),
  },
  containerStyle: {
    height: dw(214),
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: dw(214),
    borderRadius: 0,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 24,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
