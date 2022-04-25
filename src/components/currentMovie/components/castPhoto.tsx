import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {imagePath} from '../../../constants/common';
import {NO_PICTURE_ICON} from '../../../constants/images';
import {CastPhotoType} from '../../../types/cast';
import {dh, dw} from '../../../utils/dimensions';

interface CastPhotoProps {
  data: CastPhotoType;
  isTheme?: boolean;
}

export const CastPhoto: FC<CastPhotoProps> = ({data, isTheme}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          data.profile_path === null
            ? NO_PICTURE_ICON
            : {
                uri: `${imagePath}${data.profile_path}`,
              }
        }
      />
      <View style={styles.containerText}>
        <Text style={[styles.text, isTheme && styles.textActive]}>
          {data.name}
        </Text>
        <Text style={[styles.text, styles.textCharacter]}>
          {data.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dw(315),
    width: dw(150),
  },
  image: {
    resizeMode: 'contain',
    width: dw(150),
    height: dh(200),
    borderRadius: dw(10),
  },
  containerText: {
    marginTop: dw(10),
  },
  text: {
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: 16,
  },
  textCharacter: {
    color: COLORS.ALUMINIUM,
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
