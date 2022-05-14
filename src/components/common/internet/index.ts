import NetInfo from '@react-native-community/netinfo';

export const netInfo = async () => {
  return await NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
