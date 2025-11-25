import authreducer from '../redux/authreducer';
import { login, logout} from '../redux/actions'; 
import { LOGIN,LOGOUT } from '../redux/actionTypes';

describe('Auth Actions', () => {
  test('login action', () => {
    const payload = {
      username: 'user',
      email: 'adad@gmail.com',
    };
    const expectedAction = {
      type: LOGIN,
      payload,
    };
    expect(login(payload)).toEqual(expectedAction);
  });

  test('logout action', () => {
    const expectedAction = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
  });
});

describe('Auth Reducer', () => {
  const initialState = {
    loggedIn: false,
    username: undefined,
    email: undefined,
  };

  test('initial state', () => {
    expect(authreducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  test('state update', () => {
    const loginAction = login({
      username: 'user1',
      email: 'adad@gmail.com',
    });

    const expectedState = {
      loggedIn: true,
      username: 'user1',
      email: 'adad@gmail.com',
    };

    expect(authreducer(initialState, loginAction)).toEqual(expectedState);
  });

  test('logout state', () => {
    const loggedInState = {
        loggedIn: true,
        username: 'user1',
        email: 'adad@gmail.com',
    };

    const logoutAction = logout();

    const expectedState = {
      loggedIn: false,
      username: undefined,
      email: undefined,
    };

    expect(authreducer(loggedInState, logoutAction)).toEqual(expectedState);
  });
});
