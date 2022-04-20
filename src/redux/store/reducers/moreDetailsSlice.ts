import {fetchMoreDetails} from './actionCreator';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MoreDetailsState {
  detailsData: [];
  isLoading: boolean;
  error: string;
}

const initialState: MoreDetailsState = {
  detailsData: [],
  isLoading: false,
  error: '',
};

export const MoviesSlice = createSlice({
  name: 'details',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchMoreDetails.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.detailsData = action.payload;
    },
    [fetchMoreDetails.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchMoreDetails.rejected.type]: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default MoviesSlice.reducer;
