import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {HomePageList} from '../renderPage/components/flatList';
import _ from 'lodash';
import {checkFavoriteItem} from '../common/functions/favorite';
import {MovieData} from '../../types/movieData';
import {dw} from '../../utils/dimensions';
import {ErrorContainer} from '../common/errorContainer';
import {} from 'redux/store/actionCreator/actionCreator';
import {
  addFavorite,
  deleteFavorite,
} from 'redux/store/actionCreator/actionCreatorFavorite';
import {SignOut} from './components/signOut';

interface FavoritePageProps {
  navigation?: any;
}

export const FavoritePage: FC<FavoritePageProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {favoriteState} = useAppSelector(reducer => reducer.favoriteReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {isSignIn} = useAppSelector(reducer => reducer.loginReducer);

  const checkFavorite = (data: MovieData) => {
    return checkFavoriteItem(data, favoriteState);
  };

  const onPressFavorite = (data: MovieData) => {
    checkFavoriteItem(data, favoriteState)
      ? dispatch(deleteFavorite(data))
      : dispatch(addFavorite(data));
  };

  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      {isSignIn ? (
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
              text={'Not data yet.Please add your favorite movies or tv series'}
            />
          )}
        </>
      ) : (
        <SignOut navigation={navigation} isTheme={isTheme} />
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
  text: {
    color: COLORS.BLACK,
    fontSize: 24,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
