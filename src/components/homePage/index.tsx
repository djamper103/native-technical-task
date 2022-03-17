import React, {FC, useEffect, useState} from 'react';
import {HomePageList} from './components/flatList';
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  decrementPage,
  fetchSearch,
  fetchTrending,
  incrementPage,
  setCurrentPage,
  setSearchText,
} from '../../redux/store/reducers/actionCreator';
import {MovieData} from '../../types/movieData';

interface HomePageProps {
  navigation?: any;
}

export const HomePage: FC<HomePageProps> = ({navigation}) => {
  const [state, setState] = useState<MovieData[]>([]);
  const [allPageCurrent, setAllPageCurrent] = useState(0);
  const [type] = useState('movie');

  const dispatch = useAppDispatch();

  const {currentPage} = useAppSelector(reducer => reducer.pagesReducer);

  const {trendingState} = useAppSelector(reducer => reducer.trendingReducer);
  const {allTrendingPage} = useAppSelector(reducer => reducer.trendingReducer);

  const {searchText} = useAppSelector(reducer => reducer.searchReducer);

  useEffect(() => {
    if (state?.length === 0) {
      dispatch(
        fetchTrending({
          type: type,
          curentPage: currentPage,
        }),
      ).then(() => {
        setAllPageCurrent(allTrendingPage);
        setState(trendingState);
      });
    }
  }, [
    allTrendingPage,
    currentPage,
    dispatch,
    state?.length,
    trendingState,
    type,
  ]);

  const nextPage = () => {
    if (searchText === '') {
      dispatch(incrementPage(allTrendingPage));
      dispatch(
        fetchTrending({
          type: type,
          curentPage: currentPage + 1,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    } else {
      dispatch(incrementPage(allTrendingPage));
      dispatch(
        fetchSearch({
          type: type,
          text: searchText,
          curentPage: currentPage + 1,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    }
  };

  const prevPage = () => {
    if (searchText === '') {
      dispatch(decrementPage());
      dispatch(
        fetchTrending({
          type: type,
          curentPage: currentPage >= 2 ? currentPage - 1 : currentPage,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    } else {
      dispatch(decrementPage());
      dispatch(
        fetchSearch({
          type: type,
          text: searchText,
          curentPage: currentPage >= 2 ? currentPage - 1 : currentPage,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    }
  };

  const installationCurrentPage = (item: any) => {
    if (searchText === '') {
      dispatch(setCurrentPage(item));
      dispatch(
        fetchTrending({
          type: type,
          curentPage: item,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    } else {
      dispatch(setCurrentPage(item));
      dispatch(
        fetchSearch({
          type: type,
          text: searchText,
          curentPage: item,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    }
  };

  const onSearch = (text: string) => {
    if (text === '') {
      dispatch(
        fetchTrending({
          type: type,
          curentPage: currentPage,
        }),
      ).then((el: any) => {
        setAllPageCurrent(el.payload.total_pages);
        setState(el.payload.results);
      });
    } else {
      dispatch(setSearchText(text));
      dispatch(
        fetchSearch({
          type: type,
          text: text,
          curentPage: 1,
        }),
      ).then((el: any) => {
        setAllPageCurrent(el.payload.total_pages);
        setState(el.payload.results);
      });
    }
  };

  return (
    <HomePageList
      state={state.length > 0 ? state : []}
      navigation={navigation}
      onPressItem={_.noop}
      onSearch={onSearch}
      currentPage={currentPage}
      allPageCurrent={allPageCurrent}
      nextPage={nextPage}
      prevPage={prevPage}
      installationCurrentPage={installationCurrentPage}
    />
  );
};

// const styles = StyleSheet.create({});
