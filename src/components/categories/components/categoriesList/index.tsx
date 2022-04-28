import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {MOVIE_ICON, TV_SERIES_ICON} from '../../../../constants/images';
import {useAppDispatch, useAppSelector} from '../../../../hooks/redux';
import {fetchGenres} from '../../../../redux/store/reducers/actionCreator';
import {TypeGenres} from '../type';

interface CategoriesProps {
  navigation?: any;
}

export const Categories: FC<CategoriesProps> = ({navigation}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();
  const onPressMV = () => {
    dispatch(fetchGenres('movie'));
    navigation.navigate('Genres', {type: 'movie'});
  };
  const onPressTV = () => {
    dispatch(fetchGenres('tv'));
    navigation.navigate('Genres', {type: 'tv'});
  };
  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
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
