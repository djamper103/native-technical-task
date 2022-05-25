import React, {FC, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {HomePageList} from '../renderPage/components/flatList';
import _ from 'lodash';
import {checkFavoriteItem} from '../functions/favorite';
import {MovieData} from '../../types/movieData';
import {dw} from '../../utils/dimensions';
import {ErrorContainer} from '../common/errorContainer';
import {
  addFavorite,
  deleteFavorite,
  setFavorite,
} from 'redux/store/actionCreator/actionCreatorFavorite';
import {setIsNet} from 'redux/store/actionCreator/actionCreator';

interface FavoritePageProps {
  navigation?: any;
}

export const FavoritePage: FC<FavoritePageProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {favoriteState} = useAppSelector(reducer => reducer.favoriteReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {isSignIn} = useAppSelector(reducer => reducer.loginReducer);
  const {isNet} = useAppSelector(reducer => reducer.internetReducer);

  const checkFavorite = (data: MovieData) => {
    return checkFavoriteItem(data, favoriteState);
  };

  const onPressFavorite = (data: MovieData) => {
    checkFavoriteItem(data, favoriteState)
      ? dispatch(deleteFavorite(data))
      : dispatch(addFavorite(data));
  };

  const setNetInfo = useCallback(() => {
    dispatch(setIsNet());
    dispatch(setFavorite(isSignIn));
  }, [dispatch, isSignIn]);

  useEffect(() => {
    setNetInfo();
  }, [setNetInfo]);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      {isNet ? (
        isSignIn ? (
          <>
            {favoriteState.length > 0 ? (
              <HomePageList
                state={favoriteState}
                navigation={navigation}
                pageType="favorite"
                onSearch={_.noop}
                prevPage={_.noop}
                nextPage={_.noop}
                installationCurrentPage={_.noop}
                checkFavorite={checkFavorite}
                onPressFavorite={onPressFavorite}
              />
            ) : (
              <ErrorContainer
                isTheme={isTheme}
                text={
                  'Not data yet.Please add your favorite movies or tv series'
                }
              />
            )}
          </>
        ) : (
          <ErrorContainer
            text={'Log into your account to see your favorites'}
            buttonText={'Login'}
            isTheme={isTheme}
            containerButtonStyle={styles.containerButtonStyle}
            onPress={goToLogin}
          />
        )
      ) : favoriteState.length > 0 ? (
        <HomePageList
          state={favoriteState}
          navigation={navigation}
          pageType="favorite"
          onSearch={_.noop}
          prevPage={_.noop}
          nextPage={_.noop}
          installationCurrentPage={_.noop}
          checkFavorite={checkFavorite}
          onPressFavorite={onPressFavorite}
        />
      ) : (
        <ErrorContainer
          text={'No internet connection'}
          isTheme={isTheme}
          onPress={setNetInfo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  containerText: {
    marginTop: dw(50),
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerButtonStyle: {
    marginTop: dw(20),
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 24,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
