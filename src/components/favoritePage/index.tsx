import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';

interface FavoritePageProps {}

export const FavoritePage: FC<FavoritePageProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Favorite Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.OXFORD_BLUE,
  },
});
