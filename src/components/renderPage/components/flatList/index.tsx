import {ErrorContainer} from 'components/common/errorContainer';
import React, {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {MovieData} from '../../../../types/movieData';
import {dh, dw} from '../../../../utils/dimensions';
import {Pagination} from '../../../pagination';
import {Search} from '../../../search';
import {ListItem} from './listItem/item';

interface HomePageListProps {
  state?: MovieData[];
  currentPage?: any;
  allPageCurrent?: any;
  navigation?: any;
  type?: any;
  error?: string;
  pageType?: string;
  isTheme?: boolean;
  onSearch: (value: string) => void;
  prevPage: () => void;
  nextPage: () => void;
  installationCurrentPage: (value: any) => void;
  checkFavorite: (value: MovieData) => void;
  onPressFavorite: (value: MovieData) => void;
  uploadData?: () => void;
}

export const HomePageList: FC<HomePageListProps> = ({
  state,
  currentPage,
  allPageCurrent,
  navigation,
  type,
  error,
  pageType,
  isTheme,
  onSearch,
  prevPage,
  nextPage,
  installationCurrentPage,
  checkFavorite,
  onPressFavorite,
  uploadData,
}) => {
  const renderItem: any = ({item}: {item: MovieData}) => {
    return (
      <ListItem
        data={item}
        navigation={navigation}
        type={type}
        checkFavorite={checkFavorite}
        onPressFavorite={onPressFavorite}
      />
    );
  };
  return (
    <>
      {error ? (
        <View>
          <Search onSearch={onSearch} />
          <View style={styles.container}>
            <Text style={styles.text}>{error}</Text>
          </View>
        </View>
      ) : (
        <FlatList<MovieData>
          data={state}
          bounces={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            pageType === 'favorite' ? null : allPageCurrent ? (
              <Search onSearch={onSearch} />
            ) : null
          }
          ListFooterComponent={
            pageType === 'favorite' ? null : allPageCurrent ? (
              <Pagination
                page={currentPage}
                allPages={allPageCurrent}
                onLeftPress={prevPage}
                onRightPress={nextPage}
                onPressItem={installationCurrentPage}
              />
            ) : (
              <ErrorContainer
                onPress={uploadData}
                text={'No internet connection'}
                isTheme={isTheme}
                containerStyle={styles.containerStyle}
              />
            )
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: dh(10),
  },
  containerStyle: {
    marginVertical: dw(15),
  },
  text: {
    fontSize: 24,
    color: COLORS.BLACK,
  },
});
