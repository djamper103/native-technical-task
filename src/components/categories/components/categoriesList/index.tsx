import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch} from '../../../../hooks/redux';
import {fetchGenres} from '../../../../redux/store/reducers/actionCreator';
import {dw} from '../../../../utils/dimensions';
import {TypeGenres} from '../type';

interface CategoriesProps {
  navigation?: any;
}

export const Categories: FC<CategoriesProps> = ({navigation}) => {
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
    <View style={styles.container}>
      <TypeGenres onPress={onPressMV} placeHolder={'Movie'} />
      <TypeGenres onPress={onPressTV} placeHolder={'TV Series'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: dw(50),
    // backgroundColor: COLORS.OXFORD_BLUE,
  },
});
