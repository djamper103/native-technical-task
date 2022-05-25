import React, {FC, useEffect} from 'react';
import {
  fetchMovies,
  setCurrentPage,
} from 'redux/store/actionCreator/actionCreator';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {RenderPage} from '../../renderPage';

export const CategoriesRenderPage: FC = (props: any) => {
  const {moviesState} = useAppSelector(reducer => reducer.moviesReducer);
  const {allPages} = useAppSelector(reducer => reducer.moviesReducer);
  const {error} = useAppSelector(reducer => reducer.moviesReducer);
  const {isLoading} = useAppSelector(reducer => reducer.moviesReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  return (
    <RenderPage
      navigation={props.navigation}
      type={props.route.params.type}
      renderState={moviesState}
      renderAllPage={allPages}
      currentFetch={fetchMovies}
      genreType={props.route.params.genreType}
      currentError={error}
      currentIsLoading={isLoading}
    />
  );
};
