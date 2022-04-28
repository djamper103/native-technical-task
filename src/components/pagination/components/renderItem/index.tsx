import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {Count} from '../../../../types/pagination';
import {dh, dw} from '../../../../utils/dimensions';

interface RenderItemProps {
  data: any;
  page: number;
  onPressItem: (value: Count) => void;
}

export const RenderItem: FC<RenderItemProps> = ({data, page, onPressItem}) => {
  const onPressPage = () => {
    onPressItem(data.item.page);
  };
  return (
    <Pressable
      style={[
        styles.containerPage,
        data.item.page === page && styles.containerPageActive,
      ]}
      onPress={onPressPage}>
      <Text style={[styles.text, data.item.page === page && styles.textActive]}>
        {data.item.page}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerPage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dw(50),
    height: dh(50),
  },
  containerPageActive: {
    backgroundColor: COLORS.STEEL_BLUE,
  },
  text: {
    fontSize: 16,
    color: COLORS.ALUMINIUM,
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
