import React, {FC} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {
  DARK_THEME_ICON,
  DEFAULT_PERSON_ICON,
  LIGHT_THEME_ICON,
} from '../../../constants/images';
import {dh, dw} from '../../../utils/dimensions';

interface UserProfileProps {
  userName?: string;
  navigation?: any;
  isTheme?: boolean;
  imageUrl?: string;
  onPressTheme: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({
  userName,
  navigation,
  isTheme,
  imageUrl,
  onPressTheme,
}) => {
  const onPressPhoto = () => {
    navigation.navigate('Profile Page');
  };

  return (
    <View style={[styles.container, isTheme && styles.containerDark]}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={onPressPhoto}>
          <Image
            source={imageUrl !== '' ? {uri: imageUrl} : DEFAULT_PERSON_ICON}
            style={imageUrl !== '' ? styles.imageUser : styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTheme} style={styles.containerImage}>
          <Image
            source={isTheme ? DARK_THEME_ICON : LIGHT_THEME_ICON}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerFooter}>
        <Text style={styles.text}>{userName ? userName : 'User name'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.STEEL_BLUE,
    top: dh(-5),
    padding: dw(20),
  },
  containerDark: {
    backgroundColor: COLORS.CLOUD_BURST,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dh(20),
  },
  containerFooter: {
    flexDirection: 'row',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUser: {
    width: dw(50),
    height: dw(50),
    borderRadius: dw(50),
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.WHITE,
  },
  text: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
});
