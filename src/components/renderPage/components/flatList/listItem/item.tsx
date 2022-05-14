import React, {FC, useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {MovieData} from '../../../../../types/movieData';
import {dw} from '../../../../../utils/dimensions';
import {imagePath} from '../../../../../constants/common';
import {COLORS} from '../../../../../constants/colors';
import {VoteContainer} from '../../../../common/vote';
import {FavoriteIcon} from '../../../../common/favorite';

interface ListItemProps {
  data: MovieData;
  navigation?: any;
  type?: string;
  checkFavorite: (value: MovieData) => void;
  onPressFavorite: (value: MovieData) => void;
}

export const ListItem: FC<ListItemProps> = ({
  data,
  navigation,
  type,
  checkFavorite,
  onPressFavorite,
}) => {
  const [mediaType, setMediaType] = useState('Movie');
  const [isFavorite, setIsFavorite] = useState<any>(false);
  const [title, setTitle] = useState<any>('Title');

  const onPress = () => {
    navigation.navigate('Current Movie', {
      data,
      type: type,
    });
  };
  useEffect(() => {
    data.title === undefined
      ? setMediaType('TV series')
      : setMediaType('Movie');
  }, [data]);

  useEffect(() => {
    setIsFavorite(checkFavorite(data));
  }, [data, checkFavorite]);

  useEffect(() => {
    setTitle(data.title === undefined ? data.name : data.title);
  }, [data.media_type, data.name, data.title]);

  const pressFavorite = () => {
    onPressFavorite(data);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {data && (
        <View style={styles.containerMain}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: data
                  ? `${imagePath}${data.poster_path}`
                  : 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <VoteContainer
              vote={data.vote_average}
              containerStyle={styles.containerRating}
            />
            <FavoriteIcon
              containerStyle={styles.containerFavorite}
              isFavorite={isFavorite}
              onPress={pressFavorite}
            />
          </View>
          <View style={styles.containerMainText}>
            <View
              style={[
                styles.containerTitle,
                title.length > 40 && styles.containerTitleLong,
              ]}>
              <Text style={[styles.text, title.length > 40 && styles.textLong]}>
                {title}
              </Text>
            </View>
            <View style={styles.containerDate}>
              <Text style={styles.textDate}>{mediaType}</Text>
              <Text style={styles.textDate}>
                {mediaType === 'Movie'
                  ? data.release_date
                  : data.first_air_date}
              </Text>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dw(190),
    margin: dw(5),
  },
  containerMain: {
    backgroundColor: COLORS.CLOUD_BURST,
    borderRadius: dw(14),
  },
  containerRating: {
    bottom: dw(296),
    left: dw(145),
  },
  containerFavorite: {
    bottom: dw(290),
    left: dw(71),
  },
  containerMainText: {
    marginHorizontal: dw(10),
  },
  containerTitle: {
    height: dw(75),
    bottom: dw(35),
  },
  containerTitleLong: {
    bottom: dw(40),
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: dw(15),
  },
  image: {
    width: dw(190),
    height: dw(300),
    borderRadius: dw(14),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  textDate: {
    color: COLORS.ATHENS_GRAY,
    fontSize: 14,
  },
  textLong: {
    fontSize: 15,
  },
});
