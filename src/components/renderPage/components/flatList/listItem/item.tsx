import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MovieData} from '../../../../../types/movieData';
import {dh, dw} from '../../../../../utils/dimensions';
import {imagePath} from '../../../../../constants/common';
import {COLORS} from '../../../../../constants/colors';
import {VoteContainer} from '../../../../common/vote';

interface ListItemProps {
  data: MovieData;
  navigation?: any;
  type: string;
}

export const ListItem: FC<ListItemProps> = ({data, navigation, type}) => {
  const [mediaType, setMediaType] = useState('');
  const onPress = () => {
    navigation.navigate('Current Movie', {data, type});
  };
  useEffect(() => {
    type === 'movie' ? setMediaType('Movie') : setMediaType('TV series');
  }, [type]);
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
          </View>
          <View style={styles.containerMainText}>
            <View style={styles.containerTitle}>
              <Text style={styles.text}>
                {type === 'movie' ? data.title : data.name}
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
  containerMainText: {
    marginHorizontal: dw(10),
  },
  containerTitle: {
    height: dh(85),
    bottom: dw(10),
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dw(15),
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
});
