import {COLORS} from 'constants/colors';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MovieData} from 'types/movieData';
import {dw} from 'utils/dimensions';

interface MainTextProps {
  data: MovieData;
  mediaType: string;
  title: string;
}

export const MainText: FC<MainTextProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, title.length > 30 && styles.textLong]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: dw(110),
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  textLong: {
    fontSize: 16,
  },
});
