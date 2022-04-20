import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {MOVIE_ICON} from '../../../../constants/images';
import {dh, dw} from '../../../../utils/dimensions';

interface TypeGenresProps {
  placeHolder: string;
  onPress: () => void;
}

export const TypeGenres: FC<TypeGenresProps> = ({placeHolder, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={placeHolder === 'Movie' ? MOVIE_ICON : MOVIE_ICON}
      />
      <Text style={styles.text}>{placeHolder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLOUD_BURST,
  },
  text: {
    color: COLORS.WHITE,
  },
  image: {
    width: dw(300),
    height: dh(200),
  },
});
