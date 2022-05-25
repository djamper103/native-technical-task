import React, {FC, useCallback, useEffect, useState} from 'react';
import {HomePageList} from './components/flatList';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {MovieData} from '../../types/movieData';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {checkFavoriteItem} from '../functions/favorite';
import {ErrorContainer} from '../common/errorContainer';
import {
  decrementPage,
  fetchSearch,
  incrementPage,
  setCurrentPage,
  setIsNet,
  setSearchText,
} from 'redux/store/actionCreator/actionCreator';
import {
  addFavorite,
  deleteFavorite,
  setFavorite,
} from 'redux/store/actionCreator/actionCreatorFavorite';
import {LoaderContainer} from 'components/common/loader';

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

  const {favoriteState} = useAppSelector(reducer => reducer.favoriteReducer);
  const {isSignIn} = useAppSelector(reducer => reducer.loginReducer);

  const uploadData = useCallback(() => {
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
    dispatch(setIsNet());
  }, [currentFetch, currentPage, dispatch, genreType, type]);

  useEffect(() => {
    dispatch(setFavorite(isSignIn));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  useEffect(() => {
    if (searchError) {
      setError('Enter valid text to search');
      setIsLoading(searchIsLoading);
    }
  }, [searchError, searchIsLoading]);

  useEffect(() => {
    setError(currentError);
    setIsLoading(currentIsLoading);
  }, [currentError, currentIsLoading]);

  useEffect(() => {
    if (state?.length === 0) {
      uploadData();
    }
  }, [state?.length, uploadData]);

  const setPage = (
    func: any,
    initialPage: any,
    funcItem?: any,
    initialType?: any,
  ) => {
    if (searchText === '') {
      funcItem ? dispatch(func(initialPage)) : dispatch(func());
      dispatch(
        currentFetch({
          type: type,
          curentPage: initialPage,
          currentGenre: genreType,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    } else {
      initialType ? dispatch(func(initialPage)) : dispatch(func());
      dispatch(
        fetchSearch({
          type: type,
          text: searchText,
          curentPage: initialPage,
        }),
      ).then((el: any) => {
        setState(el.payload.results);
      });
    }
  };

  const nextPage = () => {
    setPage(incrementPage, currentPage + 1, renderAllPage);
  };

  const prevPage = () => {
    setPage(decrementPage, currentPage >= 2 ? currentPage - 1 : currentPage);
  };

  const installationCurrentPage = (item: any) => {
    setPage(setCurrentPage, item, true, true);
  };

  const onSearch = (text: string) => {
    if (text === '') {
      dispatch(
        currentFetch({
          type: type,
          curentPage: currentPage,
          currentGenre: genreType,
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

  const checkFavorite = (data: MovieData) => {
    return checkFavoriteItem(data, favoriteState);
  };

  const onPressFavorite = (data: MovieData) => {
    checkFavoriteItem(data, favoriteState)
      ? dispatch(deleteFavorite(data))
      : dispatch(addFavorite(data));
  };

  return (
    <View style={[styles.container, isTheme && styles.containerActive]}>
      {error === '' ? (
        isLoading ? (
          <LoaderContainer />
        ) : (
          <HomePageList
            state={state && state}
            navigation={navigation}
            currentPage={currentPage}
            allPageCurrent={allPageCurrent}
            type={type}
            isTheme={isTheme}
            onSearch={onSearch}
            nextPage={nextPage}
            prevPage={prevPage}
            installationCurrentPage={installationCurrentPage}
            checkFavorite={checkFavorite}
            onPressFavorite={onPressFavorite}
            uploadData={uploadData}
          />
        )
      ) : (
        <ErrorContainer isTheme={isTheme} text={error} onPress={uploadData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  containerActive: {
    backgroundColor: COLORS.OXFORD_BLUE,
  },
});
