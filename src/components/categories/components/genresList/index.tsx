import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../../../constants/colors';
import {useAppSelector} from '../../../../hooks/redux';
import {dw} from '../../../../utils/dimensions';
import {ListEllement} from './listEllement';

export const GenresList: FC = (props: any) => {
  const {genres} = useAppSelector(reducer => reducer.genresReducer);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const onPress = (genreType: string) => {
    props.navigation.navigate('Category', {
      genreType: genreType,
      type: props.route.params.type,
    });
  };

  return (
    <ScrollView
      style={[styles.container, isTheme && styles.containerActive]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.containerMain}>
        {genres &&
          genres.map(el => {
            return (
              <ListEllement
                state={el}
                isTheme={isTheme}
                onPress={onPress}
                key={el.name + el.id}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    margin: dw(10),
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
