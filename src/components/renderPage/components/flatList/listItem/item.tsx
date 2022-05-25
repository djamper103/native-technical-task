import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {MovieData} from '../../../../../types/movieData';
import {dw} from '../../../../../utils/dimensions';
import {COLORS} from '../../../../../constants/colors';
import {ImageVoteFavorite} from '../../../../common/ImageVoteFavorite';
import {MainText} from '../mainText';
import {imagePath} from 'constants/common';

interface ListItemProps {
  data: any;
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
        <>
          <ImageVoteFavorite
            data={data}
            isFavorite={isFavorite}
            icon={
              data.poster_path
                ? {
                    uri: `${imagePath}${data.poster_path}`,
                  }
                : {uri: 'https://reactnative.dev/img/tiny_logo.png'}
            }
            onPress={pressFavorite}
          />
          <MainText data={data} mediaType={mediaType} title={title} />
          <View style={styles.containerDate}>
            <Text style={styles.textDate}>{mediaType}</Text>
            <Text style={styles.textDate}>
              {mediaType === 'Movie' ? data.release_date : data.first_air_date}
            </Text>
          </View>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dw(180),
    margin: dw(5),
    backgroundColor: COLORS.CLOUD_BURST,
    borderRadius: dw(14),
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dw(10),
    marginHorizontal: dw(10),
  },
  textDate: {
    color: COLORS.ATHENS_GRAY,
    fontSize: 14,
  },
});
