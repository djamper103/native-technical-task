import {IconContainer} from 'components/common/iconContainer';
import {TextIconContainer} from 'components/common/textPlusIconContainer';
import {COLORS} from 'constants/colors';
import {PENCIL_ICON} from 'constants/images';
import React, {FC} from 'react';
import {ImageSourcePropType, StyleSheet, View, ViewStyle} from 'react-native';
import {dw} from 'utils/dimensions';

interface ProfileContentProps {
  icon?: ImageSourcePropType;
  isTheme?: boolean;
  textHeader?: string;
  textBottom?: string;
  imageStyle?: any;
  containerStyle?: ViewStyle;
  containerIconStyle?: ViewStyle;
  onPress?: () => void;
}

export const ProfileContent: FC<ProfileContentProps> = ({
  icon,
  isTheme,
  textHeader,
  textBottom,
  imageStyle,
  containerStyle,
  containerIconStyle,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TextIconContainer
        isTheme={isTheme}
        textHeader={textHeader}
        textBottom={textBottom}
        containerStyle={containerStyle}
        containerIconStyle={containerIconStyle}
        icon={icon}
        imageStyle={imageStyle}
      />
      {onPress && (
        <IconContainer
          icon={PENCIL_ICON}
          containerStyle={styles.containerPencil}
          imageStyle={[styles.pencil, isTheme && styles.pencilActive]}
          onPress={onPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStyle: {
    flexDirection: 'row',
  },
  containerIconStyle: {
    marginRight: dw(20),
    backgroundColor: COLORS.STEEL_BLUE,
  },
  containerPencil: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  pencil: {
    tintColor: COLORS.STEEL_BLUE,
  },
  pencilActive: {
    tintColor: COLORS.WHITE,
  },
});
