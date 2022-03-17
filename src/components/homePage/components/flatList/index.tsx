import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {MovieData} from '../../../../types/movieData';
import {Pagination} from '../../../pagination';
import {Search} from '../../../search';
import {ListItem} from './listItem/item';

interface HomePageListProps {
  state?: MovieData[];
  currentPage: number;
  allPageCurrent: number;
  navigation?: any;
  onPressItem: (value: MovieData) => void;
  onSearch: (value: string) => void;
  prevPage: () => void;
  nextPage: () => void;
  installationCurrentPage: (value: any) => void;
}

export const HomePageList: FC<HomePageListProps> = ({
  state,
  currentPage,
  allPageCurrent,
  navigation,
  onPressItem,
  onSearch,
  prevPage,
  nextPage,
  installationCurrentPage,
}) => {
  const renderItem: any = ({item}: {item: MovieData}) => {
    return (
      <ListItem data={item} onPressItem={onPressItem} navigation={navigation} />
    );
  };
  return (
    <FlatList<MovieData>
      data={state}
      bounces={false}
      keyExtractor={item => item.original_title + item.release_date}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      ListHeaderComponent={<Search onSearch={onSearch} />}
      ListFooterComponent={
        <Pagination
          page={currentPage}
          allPages={allPageCurrent}
          onLeftPress={prevPage}
          onRightPress={nextPage}
          onPressItem={installationCurrentPage}
        />
      }
    />
  );
};
