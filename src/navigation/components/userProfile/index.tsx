import React, {FC, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {
  DARK_THEME_ICON,
  DEFAULT_PERSON_ICON,
  LIGHT_THEME_ICON,
} from '../../../constants/images';
import {dh, dw} from '../../../utils/dimensions';

interface UserProfileProps {
  userIcon?: ImageSourcePropType;
  isDarkTheme?: boolean;
  userName?: string;
  navigation?: any;
  onPressTheme: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({
  userIcon,
  // isDarkTheme = false,
  userName,
  navigation,
  onPressTheme,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const onPressPhoto = () => {
    navigation.navigate('ProfilePage');
  };
  const pressTheme = () => {
    onPressTheme();
    setIsDarkTheme(!isDarkTheme);
  };
  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={onPressPhoto}>
          <Image
            source={userIcon ? userIcon : DEFAULT_PERSON_ICON}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pressTheme}>
          <Image
            source={isDarkTheme ? DARK_THEME_ICON : LIGHT_THEME_ICON}
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
    margin: 0,
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
