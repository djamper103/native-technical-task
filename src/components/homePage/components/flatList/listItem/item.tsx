import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MovieData} from '../../../../../types/movieData';
import {dh, dw} from '../../../../../utils/dimensions';
import {imagePath} from '../../../../../constants/common';
import {COLORS} from '../../../../../constants/colors';

interface ListItemProps {
  data: MovieData;
  navigation?: any;
  onPressItem: (value: MovieData) => void;
}

export const ListItem: FC<ListItemProps> = ({
  data,
  navigation,
  onPressItem,
}) => {
  const onPress = () => {
    navigation.navigate('CurrentMovie', data);
    onPressItem(data);
  };
  console.log(data.media_type);
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
            <View style={styles.containerRating}>
              <Text style={styles.text}>{data.vote_average}</Text>
            </View>
          </View>
          <View style={styles.containerMainText}>
            <View style={{height: 80}}>
              <Text style={styles.text}>{data.original_title}</Text>
            </View>
            <View style={styles.containerDate}>
              <Text style={styles.text}>{data.media_type}</Text>
              <Text style={styles.text}>{data.release_date}</Text>
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
    paddingVertical: dw(10),
    borderRadius: dw(14),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  containerRating: {
    alignItems: 'flex-end',
    bottom: dh(298),
    right: dw(5),
  },
  containerMainText: {
    marginHorizontal: dw(10),
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: dw(190),
    height: dh(300),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});
