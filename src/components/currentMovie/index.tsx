import React, {FC, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  fetchMoreDetails,
  fetchVideo,
} from '../../redux/store/reducers/actionCreator';
import {CastItemType, CastPhotoType} from '../../types/cast';
import {MovieData} from '../../types/movieData';
import {dh, dw} from '../../utils/dimensions';
import {CastPhoto} from './components/castPhoto';
import {CurrentMovieHeader} from './components/header';

export const CurrentMovie: FC = (props: any) => {
  const [state, setState] = useState<MovieData>();
  const [cast, setCast] = useState<CastPhotoType[]>([]);
  const [type, setType] = useState<string>('');

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  // const {videoUrl} = useAppSelector(reducer => reducer.videoReducer);
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
    dispatch(
      fetchMoreDetails({
        type: props.route.params.type,
        id: props.route.params.data.id,
      }),
    ).then((el: any) => {
      setCast(el.payload.cast);
    });
  }, [dispatch, props.route.params.data, props.route.params.type]);

  const renderItem: any = (item: CastItemType) => {
    return <CastPhoto data={item.item} isTheme={isTheme} />;
  };

  return (
    <ScrollView style={[styles.container, isTheme && styles.containerActive]}>
      {state ? (
        <View>
          <CurrentMovieHeader state={state} type={type} isTheme={isTheme} />
          {cast.length > 2 && (
            <View>
              <FlatList<CastPhotoType>
                data={cast}
                keyExtractor={item => item.profile_path + item.name}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
          <View style={styles.containerOverview}>
            <Text style={[styles.text, isTheme && styles.textActive]}>
              {' '}
              {state.overview}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.containerText}>
          <Text style={[styles.text, isTheme && styles.textActive]}>
            Data is not available
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerText: {
    alignItems: 'center',
    marginTop: dh(150),
  },
  containerOverview: {
    marginHorizontal: dw(10),
    marginBottom: dw(10),
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 24,
    color: COLORS.BLACK,
    textAlign: 'justify',
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
