import React, {FC, useEffect, useState} from 'react';
import {HomePageList} from './components/flatList';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  decrementPage,
  fetchSearch,
  incrementPage,
  setCurrentPage,
  setSearchText,
} from '../../redux/store/reducers/actionCreator';
import {MovieData} from '../../types/movieData';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dh, dw} from '../../utils/dimensions';

interface RenderPageProps {
  navigation?: any;
  type: string;
  renderState: any;
  renderAllPage: number;
  currentFetch: any;
  genreType?: string;
  currentError: any;
  currentIsLoading: any;
}

export const RenderPage: FC<RenderPageProps> = ({
  navigation,
  type,
  renderState,
  renderAllPage,
  currentFetch,
  genreType,
  currentError,
  currentIsLoading,
}) => {
  const [state, setState] = useState<MovieData[]>([]);
  const [allPageCurrent, setAllPageCurrent] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>();

  const dispatch = useAppDispatch();

  const {currentPage} = useAppSelector(reducer => reducer.pagesReducer);

  const {searchText} = useAppSelector(reducer => reducer.searchReducer);
  const {searchError} = useAppSelector(reducer => reducer.searchReducer);
  const {searchIsLoading} = useAppSelector(reducer => reducer.searchReducer);

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  useEffect(() => {
    setError('Enter valid text to search');
    setIsLoading(searchIsLoading);
  }, [searchError, searchIsLoading]);

  useEffect(() => {
    setError(currentError);
    setIsLoading(currentIsLoading);
  }, [currentError, currentIsLoading]);

  useEffect(() => {
    if (state?.length === 0) {
      dispatch(
        currentFetch({
          type: type,
          curentPage: currentPage,
          currentGenre: genreType,
        }),
      ).then((el: any) => {
        setAllPageCurrent(el.payload.total_pages);
        setState(el.payload.results);
      });
    }
  }, [
    renderAllPage,
    currentPage,
    dispatch,
    state?.length,
    renderState,
    type,
    currentFetch,
    genreType,
  ]);

  const nextPage = () => {
    if (searchText === '') {
      dispatch(incrementPage(renderAllPage));
      dispatch(
        currentFetch({
          type: type,
          curentPage: currentPage + 1,
          currentGenre: genreType,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    } else {
      dispatch(incrementPage(renderAllPage));
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
        currentFetch({
          type: type,
          curentPage: currentPage >= 2 ? currentPage - 1 : currentPage,
          currentGenre: genreType,
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
        currentFetch({
          type: type,
          curentPage: item,
          currentGenre: genreType,
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
        currentFetch({
          type: type,
          curentPage: currentPage,
        }),
      ).then((el: any) => {
        setAllPageCurrent(el.payload.total_pages);
        setState(el.payload.results);
        dispatch(setCurrentPage(1));
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
        dispatch(setCurrentPage(1));
      });
    }
  };

  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      {error ? (
        <HomePageList
          state={state && state}
          navigation={navigation}
          currentPage={currentPage}
          allPageCurrent={allPageCurrent}
          type={type}
          onSearch={onSearch}
          nextPage={nextPage}
          prevPage={prevPage}
          installationCurrentPage={installationCurrentPage}
          error={error}
        />
      ) : isLoading ? (
        <View style={styles.containerLoader}>
          <ActivityIndicator size={dw(150)} color={COLORS.STEEL_BLUE} />
        </View>
      ) : (
        <HomePageList
          state={state && state}
          navigation={navigation}
          currentPage={currentPage}
          allPageCurrent={allPageCurrent}
          type={type}
          onSearch={onSearch}
          nextPage={nextPage}
          prevPage={prevPage}
          installationCurrentPage={installationCurrentPage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
  containerLoader: {
    marginTop: dh(150),
  },
});
