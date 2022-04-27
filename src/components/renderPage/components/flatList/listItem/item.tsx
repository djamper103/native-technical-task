import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MovieData} from '../../../../../types/movieData';
import {dh, dw} from '../../../../../utils/dimensions';
import {imagePath} from '../../../../../constants/common';
import {COLORS} from '../../../../../constants/colors';
import {VoteContainer} from '../../../../common/vote';
import {FavoriteIcon} from '../../../../common/favorite';

interface ListItemProps {
  data: MovieData;
  navigation?: any;
  type: string;
  checkFavorite: (value: MovieData) => void;
}

export const ListItem: FC<ListItemProps> = ({
  data,
  navigation,
  type,
  checkFavorite,
}) => {
  const [mediaType, setMediaType] = useState('');
  const [isFavorite, setIsFavorite] = useState<any>(false);
  const [title, setTitle] = useState<any>('Title');

  const onPress = () => {
    navigation.navigate('Current Movie', {data, type});
  };
  useEffect(() => {
    type === 'movie' ? setMediaType('Movie') : setMediaType('TV series');
  }, [type]);

  useEffect(() => {
    setIsFavorite(checkFavorite(data));
  }, [data, checkFavorite]);

  useEffect(() => {
    setTitle(type === 'movie' ? data.title : data.name);
  }, [data.name, data.title, type]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
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
                {type === 'movie' ? data.release_date : data.first_air_date}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: dw(5),
  },
  containerMain: {
    backgroundColor: COLORS.CLOUD_BURST,
    borderRadius: dw(14),
  },
  containerRating: {
    bottom: dh(298),
    left: dw(145),
  },
  containerFavorite: {
    bottom: dh(290),
    left: dw(71),
  },
  containerMainText: {
    marginHorizontal: dw(10),
  },
  containerTitle: {
    height: dh(60),
    bottom: dw(35),
  },
  containerTitleLong: {
    bottom: dw(40),
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: dw(20),
  },
  image: {
    width: dw(190),
    height: dh(300),
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
