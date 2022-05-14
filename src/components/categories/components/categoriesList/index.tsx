import {ErrorContainer} from 'components/common/errorContainer';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {fetchGenres, setIsNet} from 'redux/store/actionCreator/actionCreator';
import {COLORS} from '../../../../constants/colors';
import {MOVIE_ICON, TV_SERIES_ICON} from '../../../../constants/images';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {TypeGenres} from '../type';

interface CategoriesProps {
  navigation?: any;
}

export const Categories: FC<CategoriesProps> = ({navigation}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {isNet} = useAppSelector(reducer => reducer.internetReducer);

  const dispatch = useAppDispatch();
  const onPressMV = () => {
    dispatch(fetchGenres('movie'));
    navigation.navigate('Genres', {type: 'movie'});
  };
  const onPressTV = () => {
    dispatch(fetchGenres('tv'));
    navigation.navigate('Genres', {type: 'tv'});
  };

  const setNetInfo = () => {
    dispatch(setIsNet());
  };

  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      {isNet ? (
        <View>
          <TypeGenres
            placeHolder={'Movie'}
            isTheme={isTheme}
            image={MOVIE_ICON}
            onPress={onPressMV}
          />
          <TypeGenres
            placeHolder={'TV Series'}
            isTheme={isTheme}
            image={TV_SERIES_ICON}
            onPress={onPressTV}
          />
        </View>
      ) : (
        <ErrorContainer
          text={'No internet connection'}
          isTheme={isTheme}
          isButton={true}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
});
