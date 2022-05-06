import React, {FC} from 'react';
import {fetchTrending} from 'redux/store/actionCreator/actionCreator';
import {useAppSelector} from '../../hooks/redux';
import {RenderPage} from '../renderPage';

interface HomePageProps {
  navigation?: any;
}

export const HomePage: FC<HomePageProps> = ({navigation}) => {
  const {trendingState} = useAppSelector(reducer => reducer.trendingReducer);
  const {allTrendingPage} = useAppSelector(reducer => reducer.trendingReducer);
  const {error} = useAppSelector(reducer => reducer.trendingReducer);
  const {isLoading} = useAppSelector(reducer => reducer.trendingReducer);
  return (
    <RenderPage
      navigation={navigation}
      type={'movie'}
      renderState={trendingState}
      renderAllPage={allTrendingPage}
      currentFetch={fetchTrending}
      currentError={error}
      currentIsLoading={isLoading}
    />
  );
};
