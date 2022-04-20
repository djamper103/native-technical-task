import {createSlice} from '@reduxjs/toolkit';

interface ThemeState {
  isTheme: boolean;
}

const initialState: ThemeState = {
  isTheme: false,
};

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setTheme(state) {
      state.isTheme = !state.isTheme;
    },
  },
});

export default ThemeSlice.reducer;
