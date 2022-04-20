import React, {FC, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {ARROW_LEFT_ICON, ARROW_RIGHT_ICON} from '../../constants/images';
import {Count} from '../../types/pagination';
import {dh, dw} from '../../utils/dimensions';

interface PaginationProps {
  page: number;
  allPages: number;
  onPressItem: (value: Count) => void;
  onLeftPress: () => void;
  onRightPress: () => void;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  allPages,
  onPressItem,
  onLeftPress,
  onRightPress,
}) => {
  const [errayCount, setErrayCount] = useState<Count[]>([]);
  const ref = useRef<FlatList>(null);
  useEffect(() => {
    const count = [];
    if (allPages > 0) {
      for (let i = 1; i <= allPages; i++) {
        count.push({page: i, name: `name${i}`});
      }
      setErrayCount(count);
    }
  }, [errayCount.length, allPages]);

  useEffect(() => {
    setTimeout(() => {
      ref.current?.scrollToIndex({
        animated: true,
        index: page - 1,
        viewOffset: 1,
        viewPosition: 1,
      });
    }, 100);
  }, [page]);

  const scrollToIndexFailed = () => {
    if (allPages > 0) {
      setTimeout(() => {
        ref.current?.scrollToIndex({
          animated: true,
          index: page - 1,
          viewOffset: 10,
          viewPosition: 1,
        });
      }, 100);
    }
  };

  const renderItem: any = (item: any) => {
    const onPressPage = () => {
      onPressItem(item.item.page);
    };
    return (
      <TouchableOpacity
        style={[
          styles.containerPage,
          item.item.page === page && styles.containerPageActive,
        ]}
        onPress={onPressPage}>
        <Text
          style={[styles.text, item.item.page === page && styles.textActive]}>
          {item.item.page}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerButton} onPress={onLeftPress}>
        <Image source={ARROW_LEFT_ICON} style={styles.image} />
      </TouchableOpacity>
      {errayCount.length > 1 && (
        <FlatList<Count>
          ref={ref}
          data={errayCount}
          keyExtractor={item => item.name}
          renderItem={renderItem}
          onScrollToIndexFailed={scrollToIndexFailed.bind(this)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
      <TouchableOpacity style={styles.containerButton} onPress={onRightPress}>
        <Image source={ARROW_RIGHT_ICON} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: dw(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderRadius: dw(10),
    // borderWidth: dw(0.2),
    // borderColor: COLORS.ALUMINIUM,
    padding: dw(10),
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dw(50),
    height: dh(50),
  },
  containerPageActive: {
    backgroundColor: COLORS.STEEL_BLUE,
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.STEEL_BLUE,
    marginHorizontal: dw(10),
  },
  text: {
    fontSize: 16,
    color: COLORS.ALUMINIUM,
  },
  textActive: {
    color: COLORS.WHITE,
  },
});
