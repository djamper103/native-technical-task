import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {dh, dw} from '../../../../utils/dimensions';

interface TypeGenresProps {
  placeHolder: string;
  isTheme?: boolean;
  image: ImageSourcePropType;
  onPress: () => void;
}

export const TypeGenres: FC<TypeGenresProps> = ({
  placeHolder,
  isTheme,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isTheme && styles.containerActive]}>
      <Image style={styles.image} source={image} />
      <Text style={[styles.text, isTheme && styles.textActive]}>
        {placeHolder}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLOUD_BURST,
    marginBottom: dw(30),
    borderRadius: dw(15),
  },
  containerActive: {
    backgroundColor: COLORS.WHITE,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: dw(10),
  },
  textActive: {
    color: COLORS.BLACK,
  },
  image: {
    borderRadius: dw(10),
    width: dw(370),
    height: dh(180),
  },
});
