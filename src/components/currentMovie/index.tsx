import {ErrorContainer} from 'components/common/errorContainer';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  fetchMoreDetails,
  fetchVideo,
  setIsNet,
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
import {checkFavoriteItem} from '../functions/favorite';
import {CastPhoto} from './components/castPhoto';
import {CurrentMovieHeader} from './components/header';
import YoutubePlayer from 'react-native-youtube-iframe';
import {showAlert} from 'components/functions/alert';

export const CurrentMovie: FC = (props: any) => {
  const [state, setState] = useState<MovieData>();
  const [cast, setCast] = useState<CastPhotoType[]>([]);
  const [type, setType] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<any>(false);

  const dispatch = useAppDispatch();

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {favoriteState} = useAppSelector(reducer => reducer.favoriteReducer);
  const {videoUrl} = useAppSelector(reducer => reducer.videoReducer);
  const {isNet} = useAppSelector(reducer => reducer.internetReducer);

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

  useEffect(() => {
    dispatch(setIsNet());
  }, [dispatch]);

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

  const onError = () => {
    showAlert('Video upload error');
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
            isNet={isNet}
            pressFavorite={pressFavorite}
          />
          {cast && (
            <FlatList<CastPhotoType>
              data={cast}
              keyExtractor={item => item.profile_path + item.name}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          )}
          {isNet && videoUrl !== '' && (
            <View style={styles.containerYoutube}>
              <YoutubePlayer
                height={dw(214)}
                videoId={videoUrl}
                webViewStyle={styles.webViewStyle}
                webViewProps={{
                  androidLayerType:
                    Platform.OS === 'android' && Platform.Version <= 22
                      ? 'hardware'
                      : 'none',
                  renderToHardwareTextureAndroid: true,
                }}
                onError={onError}
                forceAndroidAutoplay={false}
                allowWebViewZoom={true}
              />
            </View>
          )}
          <View style={styles.containerOverview}>
            <Text style={[styles.text, isTheme && styles.textActive]}>
              {'    '}
              {state.overview}
            </Text>
          </View>
        </View>
      ) : (
        <ErrorContainer
          text="Data is not available"
          containerStyle={styles.containerText}
          isTheme={isTheme}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    marginBottom: dw(2),
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerText: {
    alignItems: 'center',
    marginTop: dh(300),
  },
  containerOverview: {
    marginHorizontal: dw(2),
  },
  containerYoutube: {
    marginTop: dw(10),
    marginBottom: dw(5),
  },
  text: {
    fontSize: 24,
    color: COLORS.BLACK,
    textAlign: 'justify',
  },
  textActive: {
    color: COLORS.WHITE,
  },
  webViewStyle: {
    opacity: 0.99,
  },
});
