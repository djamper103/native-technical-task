import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {imagePath} from '../../../constants/common';
import {NO_PICTURE_LONG_ICON} from '../../../constants/images';
import {MovieData} from '../../../types/movieData';
import {dh, dw} from '../../../utils/dimensions';
import {FavoriteIcon} from '../../common/favorite';
import {VoteContainer} from '../../common/vote';

interface CurrentMovieHeaderProps {
  state: MovieData;
  type: string;
  isTheme?: boolean;
  isFavorite?: boolean;
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
      <View>
        <Image
          style={styles.image}
          source={
            state.backdrop_path
              ? {
                  uri: `${imagePath}${state.backdrop_path}`,
                }
              : NO_PICTURE_LONG_ICON
          }
        />
        <VoteContainer
          vote={state.vote_average}
          containerStyle={styles.containerVote}
        />
        <FavoriteIcon
          containerStyle={styles.containerFavorite}
          onPress={onPressFavorite}
          isFavorite={isFavorite}
        />
      </View>
      <View style={styles.containerHeaderText}>
        <Text
          style={[styles.text, isTheme && styles.textActive, styles.textTitle]}>
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
    alignItems: 'center',
    bottom: dw(15),
  },
  containerVote: {
    bottom: dh(235),
    left: dw(10),
  },
  containerFavorite: {
    bottom: dh(272),
    left: dw(180),
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: dh(246),
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    textAlign: 'center',
    bottom: dw(20),
  },
  textTitle: {
    fontSize: 24,
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
