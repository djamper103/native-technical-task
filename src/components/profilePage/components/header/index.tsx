import {COLORS} from 'constants/colors';
import React, {FC} from 'react';
import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {dh, dw} from 'utils/dimensions';
import {UserImage} from './userImage';

interface ProfilePageHeaderProps {
  imageUrl?: string;
  icon?: ImageSourcePropType;
  isTheme?: boolean;
  onPress?: () => void;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
  imageUrl,
  icon,
  isTheme,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerBox} />
      <UserImage
        imageUrl={imageUrl}
        containerStyle={styles.containerStyle}
        icon={icon}
        isTheme={isTheme}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerStyle: {
    bottom: dw(55),
  },
  containerBox: {
    backgroundColor: COLORS.CLOUD_BURST,
    height: dh(180),
    borderBottomLeftRadius: dw(25),
    borderBottomRightRadius: dw(25),
  },
});
