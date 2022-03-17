import {createSlice} from '@reduxjs/toolkit';

interface PagesState {
  currentPage: number;
}

const initialState: PagesState = {
  currentPage: 1,
};

export const PagesSlice = createSlice({
  name: 'pages',
  initialState: initialState,
  reducers: {
    incrementPage(state, action) {
      if (state.currentPage < action.payload) {
        state.currentPage = state.currentPage + 1;
      }
    },
    decrementPage(state) {
      if (state.currentPage >= 2) {
        state.currentPage = state.currentPage - 1;
      }
    },
    currentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export default PagesSlice.reducer;
