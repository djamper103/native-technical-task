import {createSlice} from '@reduxjs/toolkit';

interface RegistrationState {
  isRegistration: boolean;
  registrationError?: string;
}

const initialState: RegistrationState = {
  isRegistration: false,
  registrationError: '',
};

export const RegistrationSlice = createSlice({
  name: 'registration',
  initialState: initialState,
  reducers: {
    setRegistration(state, action) {
      if (action.payload === '') {
        state.isRegistration = true;
      } else {
        state.registrationError = action.payload;
      }
    },
    deleteError(state) {
      state.registrationError = '';
    },
  },
});

export default RegistrationSlice.reducer;
