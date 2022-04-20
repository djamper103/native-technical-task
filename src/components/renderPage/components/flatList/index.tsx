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
  type: string;
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
  type,
  onSearch,
  prevPage,
  nextPage,
  installationCurrentPage,
}) => {
  const renderItem: any = ({item}: {item: MovieData}) => {
    return <ListItem data={item} navigation={navigation} type={type} />;
  };
  return (
    <FlatList<MovieData>
      data={state}
      bounces={false}
      keyExtractor={item =>
        type === 'movie' ? item.title : item.name + item.release_date
      }
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
