import {combineReducers, configureStore} from '@reduxjs/toolkit';
import moviesReducer from './reducers/moviesSlice';
import pagesReducer from './reducers/pagesSlice';
import genresReducer from './reducers/genresSlice';
import trendingReducer from './reducers/trendingSlice';
import searchReducer from './reducers/searchSlice';
import loginReducer from './reducers/loginSlice';
import themeReducer from './reducers/themeSlice';
import videoReducer from './reducers/videoSlice';
import detailsReducer from './reducers/moreDetailsSlice';
import favoriteReducer from './reducers/favoriteSlice';
import registrationReducer from './reducers/registration';

const rootReducer = combineReducers({
  moviesReducer,
  pagesReducer,
  genresReducer,
  trendingReducer,
  searchReducer,
  loginReducer,
  themeReducer,
  videoReducer,
  detailsReducer,
  favoriteReducer,
  registrationReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
