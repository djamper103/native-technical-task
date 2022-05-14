import {createSlice} from '@reduxjs/toolkit';

interface NetState {
  isNet: boolean;
}

const initialState: NetState = {
  isNet: false,
};

export const InternetSlice = createSlice({
  name: 'net',
  initialState: initialState,
  reducers: {
    setIsNet(state, action) {
      state.isNet = action.payload;
    },
  },
});

export default InternetSlice.reducer;
