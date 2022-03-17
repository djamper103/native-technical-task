import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {appKey, imagePath} from '../../constants/common';
import {MovieData} from '../../types/movieData';

export const CurrentMovie: FC = props => {
  const [state] = useState<MovieData>(props.route.params);
  const [creditsData, setCreditsData] = useState();
  const [type] = useState('movie');

  const fetchCredits = async () => {
    //more detail
    const {data} = await axios.get(
      // `https://api.themoviedb.org/3/${type}/${state.id}?api_key=${appKey}&language=en-US`,
      `https://api.themoviedb.org/3/${type}/${state.id}/credits?api_key=${appKey}&language=en-US`,
    );
    setCreditsData(data);

    //Video url
    // const {data} = await axios.get(
    //   `https://api.themoviedb.org/3/${type}/${state.id}/videos?api_key=${appKey}&language=en-US`,
    // );
    // let videoUrl = data.results.filter(
    //   (el: any) => el.name === 'Official Trailer',
    // );
    // console.log('///', videoUrl[0].key);
    // `https://www.youtube.com/watch?v=${videoUrl[0].key}`;
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <View style={styles.container}>
      {state && (
        <View>
          <Text>{state.original_title}</Text>
          <Image
            style={styles.image}
            source={{
              uri: state
                ? `${imagePath}${state.poster_path}`
                : 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});
