import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../../../constants/colors';
import {useAppSelector} from '../../../../hooks/redux';
import {ListEllement} from './listEllement';

export const GenresList: FC = (props: any) => {
  const {genres} = useAppSelector(reducer => reducer.genresReducer);

  const onPress = (genreType: string) => {
    props.navigation.navigate('Categories Render', {
      genreType: genreType,
      type: props.route.params.type,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {genres &&
        genres.map(el => {
          return (
            <ListEllement state={el} onPress={onPress} key={el.name + el.id} />
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
});
