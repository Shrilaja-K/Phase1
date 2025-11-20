
import { LOGIN, LOGOUT } from './actionTypes';
import type { actions } from './actions';

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

const authreducer = (state: AuthState = initialState, action: actions): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        email: action.payload.email,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        username: undefined,
        email: undefined,
      };
    default:
      return state;
  }
};

export default authreducer;