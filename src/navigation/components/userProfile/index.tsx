import React, {FC} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {setTheme} from '../../../redux/store/reducers/actionCreator';
import {dh, dw} from '../../../utils/dimensions';

interface UserProfileProps {
  userIcon?: ImageSourcePropType;

  userName?: string;
  navigation?: any;
}

export const UserProfile: FC<UserProfileProps> = ({
  userIcon,
  userName,
  navigation,
}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const dispatch = useAppDispatch();

  const onPressPhoto = () => {
    navigation.navigate('Profile Page');
  };

  const onPressTheme = () => {
    dispatch(setTheme());
  };

  return (
    <View style={[styles.container, isTheme && styles.containerDark]}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={onPressPhoto}>
          <Image
            source={userIcon ? userIcon : DEFAULT_PERSON_ICON}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTheme}>
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
