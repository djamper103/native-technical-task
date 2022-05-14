import React, {FC, useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  fetchMoreDetails,
  fetchVideo,
} from 'redux/store/actionCreator/actionCreator';
import {
  addFavorite,
  deleteFavorite,
} from 'redux/store/actionCreator/actionCreatorFavorite';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';

import {CastItemType, CastPhotoType} from '../../types/cast';
import {MovieData} from '../../types/movieData';
import {dh, dw} from '../../utils/dimensions';
import {checkFavoriteItem} from '../common/functions/favorite';
import {CastPhoto} from './components/castPhoto';
import {CurrentMovieHeader} from './components/header';

export const CurrentMovie: FC = (props: any) => {
  const [state, setState] = useState<MovieData>();
  const [cast, setCast] = useState<CastPhotoType[]>([]);
  const [type, setType] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<any>(false);

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const {favoriteState} = useAppSelector(reducer => reducer.favoriteReducer);

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

  useEffect(() => {
    if (state) {
      setIsFavorite(checkFavoriteItem(state, favoriteState));
    }
  }, [favoriteState, state]);

  const renderItem: any = (item: CastItemType) => {
    return <CastPhoto data={item.item} isTheme={isTheme} />;
  };

  const pressFavorite = () => {
    if (state) {
      checkFavoriteItem(state, favoriteState)
        ? dispatch(deleteFavorite(state))
        : dispatch(addFavorite(state));
    }
  };

  return (
    <ScrollView
      style={[styles.container, isTheme && styles.containerActive]}
      showsVerticalScrollIndicator={false}>
      {state ? (
        <View>
          <CurrentMovieHeader
            state={state}
            type={type}
            isTheme={isTheme}
            isFavorite={isFavorite}
            pressFavorite={pressFavorite}
          />
          <View>
            <FlatList<CastPhotoType>
              data={cast}
              keyExtractor={item => item.profile_path + item.name}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
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
    margin: dw(10),
    marginTop: dw(20),
    // marginHorizontal: dw(10),
    // marginBottom: dw(10),
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
