import {combineReducers, configureStore} from '@reduxjs/toolkit';
import moviesReducer from './reducers/moviesSlice';
import pagesReducer from './reducers/pagesSlice';
import genresReducer from './reducers/genresSlice';
import trendingReducer from './reducers/trendingSlice';
import searchReducer from './reducers/searchSlice';

const rootReducer = combineReducers({
  moviesReducer,
  pagesReducer,
  genresReducer,
  trendingReducer,
  searchReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
