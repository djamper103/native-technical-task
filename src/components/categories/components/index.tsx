import React, {FC} from 'react';
import {useAppSelector} from '../../../hooks/redux';
import {fetchMovies} from '../../../redux/store/reducers/actionCreator';
import {RenderPage} from '../../renderPage';

export const CategoriesRenderPage: FC = (props: any) => {
  const {moviesState} = useAppSelector(reducer => reducer.moviesReducer);
  const {allPages} = useAppSelector(reducer => reducer.moviesReducer);
  const {error} = useAppSelector(reducer => reducer.moviesReducer);
  const {isLoading} = useAppSelector(reducer => reducer.moviesReducer);
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
