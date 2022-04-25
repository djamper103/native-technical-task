import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {imagePath} from '../../../constants/common';
import {NO_PICTURE_LONG_ICON} from '../../../constants/images';
import {MovieData} from '../../../types/movieData';
import {dh, dw} from '../../../utils/dimensions';
import {VoteContainer} from '../../common/vote';

interface CurrentMovieHeaderProps {
  state: MovieData;
  type: string;
  isTheme?: boolean;
}

export const CurrentMovieHeader: FC<CurrentMovieHeaderProps> = ({
  state,
  type,
  isTheme,
}) => {
  const [date, setDate] = useState<string | undefined>('');

  useEffect(() => {
    let currentType =
      type === 'movie' ? state.release_date : state.first_air_date;
    setDate(currentType?.split('-')[0]);
  }, [state, type]);

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
    bottom: dw(10),
    marginBottom: dw(20),
  },
  containerVote: {
    bottom: dh(240),
    left: dw(355),
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
  },
  textTitle: {
    fontSize: 24,
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
