import {Alert, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const uploadPhoto = (type: string) => {
  return new Promise(resolve => {
    resolve(
      (type === 'image' ? launchImageLibrary : launchCamera)(
        {
          mediaType: 'photo',
        },
        (response: any) => {
          if (!response?.didCancel) {
            return Platform.OS === 'ios'
              ? response.assets[0].uri.replace('file://', '')
              : response.assets[0].uri;
          } else {
            Alert.alert('Something went wrong please try again');
          }
        },
      ),
    );
  });
};
