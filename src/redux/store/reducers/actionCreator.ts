import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {appKey} from '../../../constants/common';

import {AppDispatch} from '../store';
import {GenresSlice} from './genresSlice';
import {PagesSlice} from './pagesSlice';
import {SearchSlice} from './searchSlice';

export const fetchMovies = createAsyncThunk(
  'fetchMovies',
  async function (
    payload: {type: string; curentPage: number; currentGenre: string},
    thunkAPI,
  ) {
    try {
      const {data} = await axios.get<Object>(
        `https://api.themoviedb.org/3/discover/${payload.type}?api_key=${appKey}&with_genres=${payload.currentGenre}&page=${payload.curentPage}`,
      );
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchGenres = createAsyncThunk(
  'genres',
  async function (type: string, thunkAPI) {
    try {
      const {data} = await axios.get<Object>(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${appKey}&language=en-US`,
      );
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchTrending = createAsyncThunk(
  'trending',
  async function (payload: {type: string; curentPage: number}, thunkAPI) {
    try {
      const {data} = await axios.get<Object>(
        `https://api.themoviedb.org/3/trending/${payload.type}/day?api_key=${appKey}&page=${payload.curentPage}`,
      );
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchSearch = createAsyncThunk(
  'search',
  async function (
    payload: {type: string; text: string; curentPage: number},
    thunkAPI,
  ) {
    try {
      const {data} = await axios.get<Object>(
        `https://api.themoviedb.org/3/search/${payload.type}?api_key=${appKey}&query=${payload.text}&page=${payload.curentPage}`,
      );
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const setGenre = (genre: string) => (dispatch: AppDispatch) => {
  dispatch(GenresSlice.actions.setGenre(genre));
};

export const incrementPage = (allPage: number) => (dispatch: AppDispatch) => {
  dispatch(PagesSlice.actions.incrementPage(allPage));
};

export const decrementPage = () => (dispatch: AppDispatch) => {
  dispatch(PagesSlice.actions.decrementPage());
};

export const setCurrentPage = (page: number) => (dispatch: AppDispatch) => {
  dispatch(PagesSlice.actions.currentPage(page));
};

export const setSearchText = (text: string) => (dispatch: AppDispatch) => {
  dispatch(SearchSlice.actions.searchText(text));
};

export const nullSearchText = () => (dispatch: AppDispatch) => {
  dispatch(SearchSlice.actions.nullText());
};
