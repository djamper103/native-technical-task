import React, {FC} from 'react';
import {useAppSelector} from '../../hooks/redux';
import {fetchTrending} from '../../redux/store/reducers/actionCreator';
import {RenderPage} from '../renderPage';

interface HomePageProps {
  navigation?: any;
}

export const HomePage: FC<HomePageProps> = ({navigation}) => {
  const {trendingState} = useAppSelector(reducer => reducer.trendingReducer);
  const {allTrendingPage} = useAppSelector(reducer => reducer.trendingReducer);
  return (
    <RenderPage
      navigation={navigation}
      type={'movie'}
      renderState={trendingState}
      renderAllPage={allTrendingPage}
      currentFetch={fetchTrending}
    />
  );
};
