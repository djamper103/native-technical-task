import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../../../../constants/colors';
import {GenresType} from '../../../../types/genres';
import {dw} from '../../../../utils/dimensions';

interface ListEllementProps {
  state: GenresType;
  isTheme?: boolean;
  onPress: (value: string) => void;
}

export const ListEllement: FC<ListEllementProps> = ({
  state,
  isTheme,
  onPress,
}) => {
  const onPressItem = () => {
    onPress(`${state.id}`);
  };
  return (
    <TouchableOpacity
      onPress={onPressItem}
      style={[styles.container, isTheme && styles.containerActive]}>
      <Text
        style={[
          styles.text,
          isTheme && styles.textActive,
          state.name.length > 15 && styles.textLong,
        ]}>
        {state.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CLOUD_BURST,
    width: dw(180),
    paddingVertical: dw(18),
    paddingHorizontal: dw(5),
    borderRadius: dw(15),
    justifyContent: 'center',
    margin: dw(5),
  },
  containerActive: {
    backgroundColor: COLORS.WHITE,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 22,
    textAlign: 'center',
  },
  textActive: {
    color: COLORS.BLACK,
  },
  textLong: {
    fontSize: 18,
  },
});
