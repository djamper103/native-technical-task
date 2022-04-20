import {createSlice} from '@reduxjs/toolkit';

interface LoginState {
  signIn: boolean;
}

const initialState: LoginState = {
  signIn: false,
};

export const LoginSlice = createSlice({
  name: 'singIn',
  initialState: initialState,
  reducers: {
    signIn(state) {
      state.signIn = !state.signIn;
    },
  },
});

export default LoginSlice.reducer;
