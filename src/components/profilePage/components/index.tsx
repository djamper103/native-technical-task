import {ButtonContainer} from 'components/common/button';
import {COLORS} from 'constants/colors';
import {
  CAMERA_ICON,
  DATE_ICON,
  DEFAULT_PERSON_ICON,
  MAIL_ICON,
} from 'constants/images';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {dw} from 'utils/dimensions';
import {ChangeNameContainer} from './changeName';
import {ProfileContent} from './content';
import {ProfilePageHeader} from './header';

interface ProfilePageMainContentProps {
  imageUrl?: string;
  userName?: string;
  email?: string;
  date?: string;
  isTheme?: boolean;
  isChangeName?: boolean;
  logout?: () => void;
  changePhoto?: () => void;
  changeName: (value: string) => void;
  setIsChangeName: (value: boolean) => void;
}

export const ProfilePageMainContent: FC<ProfilePageMainContentProps> = ({
  imageUrl,
  userName,
  email,
  date,
  isTheme,
  isChangeName,
  logout,
  changePhoto,
  changeName,
  setIsChangeName,
}) => {
  const onPress = () => {
    setIsChangeName(!isChangeName);
  };
  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      <ProfilePageHeader
        imageUrl={imageUrl}
        icon={CAMERA_ICON}
        isTheme={isTheme}
        onPress={changePhoto}
      />
      <View style={styles.containerMain}>
        <ProfileContent
          isTheme={isTheme}
          textHeader={'Name'}
          textBottom={userName}
          containerStyle={styles.containerStyle}
          containerIconStyle={styles.containerStyleName}
          icon={DEFAULT_PERSON_ICON}
          imageStyle={styles.imageStyleName}
          onPress={onPress}
        />
        {isChangeName && <ChangeNameContainer onPress={changeName} />}
        <ProfileContent
          isTheme={isTheme}
          textHeader={'Email'}
          textBottom={email}
          containerStyle={styles.containerStyle}
          containerIconStyle={styles.containerStyleName}
          icon={MAIL_ICON}
          imageStyle={styles.imageStyleName}
        />
        <ProfileContent
          isTheme={isTheme}
          textHeader={'Registration date'}
          textBottom={date}
          containerStyle={styles.containerStyle}
          containerIconStyle={styles.containerStyleName}
          icon={DATE_ICON}
          imageStyle={styles.imageStyleName}
        />
        <ButtonContainer
          text="Sign Out"
          onPress={logout}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerMain: {
    paddingHorizontal: dw(20),
  },
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStyle: {
    flexDirection: 'row',
    marginBottom: dw(20),
  },
  containerStyleName: {
    marginRight: dw(20),
    backgroundColor: COLORS.STEEL_BLUE,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: dw(20),
  },
  imageStyleName: {
    tintColor: COLORS.WHITE,
  },
});
