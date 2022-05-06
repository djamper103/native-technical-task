import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchVideo} from '../actionCreator/actionCreator';

interface VideoState {
  videoUrl: string;
  isLoading: boolean;
  error: string;
}

const initialState: VideoState = {
  videoUrl: '',
  isLoading: false,
  error: '',
};

export const MoviesSlice = createSlice({
  name: 'video',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchVideo.fulfilled.type]: (state, action) => {
      let url = action.payload.results.filter(
        (item: any) => item.name === 'Official Trailer',
      );
      state.isLoading = false;
      state.error = '';
      state.videoUrl = url[0].key;
    },
    [fetchVideo.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchVideo.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default MoviesSlice.reducer;
