import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {imagePath} from '../../constants/common';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  fetchMoreDetails,
  fetchVideo,
} from '../../redux/store/reducers/actionCreator';
import {MovieData} from '../../types/movieData';

export const CurrentMovie: FC = (props: any) => {
  const [state, setState] = useState<MovieData>();
  const [cast, setCast] = useState();
  const [type, setType] = useState<string>('');
  // const [videoUrl1, setVideoUrl1] = useState('');

  const {videoUrl} = useAppSelector(reducer => reducer.videoReducer);

  const dispatch = useAppDispatch();

  // console.log('///', videoUrl[0].key);
  // `https://www.youtube.com/watch?v=${videoUrl[0].key}`;
  // };

  useEffect(() => {
    setState(props.route.params.data);
    setType(props.route.params.type);
    dispatch(
      fetchVideo({
        type: props.route.params.type,
        id: props.route.params.data.id,
      }),
    );
    // setVideoUrl1(videoUrl)
    dispatch(
      fetchMoreDetails({
        type: props.route.params.type,
        id: props.route.params.data.id,
      }),
    ).then((el: any) => {
      setCast(el.payload.cast);
    });
  }, [dispatch, props.route.params.data, props.route.params.type]);

  return (
    <View style={styles.container}>
      {state && (
        <View>
          <Text> {type === 'movie' ? state.title : state.name}</Text>
          <Image
            style={styles.image}
            source={{
              uri: state
                ? `${imagePath}${state.poster_path}`
                : 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <Text> {state.overview}</Text>
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
