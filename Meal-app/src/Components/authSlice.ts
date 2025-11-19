import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loggedIn: boolean;
  username?: string;
  email?: string;
}


const initialState: AuthState = {
  loggedIn: false,
  username: undefined,
  email: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; email: string }>) {
      state.loggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout(state) {
      state.loggedIn = false;
      state.username = undefined;
      state.email = undefined;
    },
    
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
