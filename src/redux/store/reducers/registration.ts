import {createSlice} from '@reduxjs/toolkit';

interface RegistrationState {
  isRegistration: boolean;
}

const initialState: RegistrationState = {
  isRegistration: false,
};

export const RegistrationSlice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    setTheme(state) {
      state.isRegistration = !state.isRegistration;
    },
  },
});

export default RegistrationSlice.reducer;
