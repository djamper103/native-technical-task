import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../../../constants/colors';
import {GenresType} from '../../../../types/genres';

interface ListEllementProps {
  state: GenresType;
  onPress: (value: string) => void;
}

export const ListEllement: FC<ListEllementProps> = ({state, onPress}) => {
  const onPressItem = () => {
    onPress(`${state.id}`);
  };
  return (
    <TouchableOpacity onPress={onPressItem} style={styles.container}>
      <Text>{state.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: COLORS.OXFORD_BLUE,
  },
});
