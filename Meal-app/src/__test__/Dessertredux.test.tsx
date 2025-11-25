import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dessertsreducer from '../redux/dessertsreducer';
import {
  fetchDesserts,
  fetchDessertsRequest,
  fetchDessertsSuccess,
  fetchDessertsFailure,
} from '../redux/dessertsactions';
import {
  FETCH_DESSERTS_REQUEST,
  FETCH_DESSERTS_SUCCESS,
  FETCH_DESSERTS_FAILURE,
} from '../redux/dessertsTypes';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

const mockAxios = new MockAdapter(axios);

describe('Desserts Actions', () => {
  test('fetch', () => {
    expect(fetchDessertsRequest()).toEqual({ type: FETCH_DESSERTS_REQUEST });
  });

  test('success', () => {
    const mockDesserts = [{ idMeal: '1', strMeal: 'Cake' }];
    expect(fetchDessertsSuccess(mockDesserts)).toEqual({
      type: FETCH_DESSERTS_SUCCESS,
      payload: mockDesserts,
    });
  });

  test('error', () => {
    const errorMessage = 'Error';
    expect(fetchDessertsFailure(errorMessage)).toEqual({
      type: FETCH_DESSERTS_FAILURE,
      payload: errorMessage,
    });
  });
});

describe('Desserts Reducer', () => {
  const initialState = {
    loading:false,
    desserts:[],
    error:'',
  };

  test('initial state', () => {
    expect(dessertsreducer(undefined, {})).toEqual(initialState);
  });

  test('FETCH_DESSERTS_REQUEST', () => {
    const expectedState = { ...initialState, loading: true };
    expect(dessertsreducer(initialState, fetchDessertsRequest())).toEqual(expectedState);
  });

  test('FETCH_DESSERTS_SUCCESS', () => {
    const mockDesserts = [{ idMeal: '1', strMeal: 'Pudding' }];
    const RequestState = { ...initialState, loading: true, error: 'error' };
    const expectedState = { loading: false, desserts: mockDesserts, error: '' };
    expect(dessertsreducer(RequestState, fetchDessertsSuccess(mockDesserts))).toEqual(expectedState);
  });

  test('FETCH_DESSERTS_FAILURE', () => {
    const errorMessage = 'API failed';
    const RequestState = { ...initialState, loading: true, desserts: [{ idMeal: '1' }] };
    const expectedState = { loading: false, desserts: [], error: errorMessage };
    expect(dessertsreducer(RequestState, fetchDessertsFailure(errorMessage))).toEqual(expectedState);
  });
});

describe('fetchDesserts Thunk', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('REQUEST and SUCCESS', async () => {
    const Responsedata = { meals: [{ idMeal: '1', strMeal: 'TestData' }] };
    mockAxios.onGet(API_URL).reply(200, Responsedata);

    const expectedActions = [
      { type: FETCH_DESSERTS_REQUEST },
      { type: FETCH_DESSERTS_SUCCESS, payload: Responsedata.meals },
    ];
    const store = mockStore({ loading: false, desserts: [], error: '' });
    await store.dispatch(fetchDesserts());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('REQUEST and FAILURE', async () => {
    mockAxios.onGet(API_URL).networkError();

    const expectedActions = [
      { type: FETCH_DESSERTS_REQUEST },
      { type: FETCH_DESSERTS_FAILURE ,payload:"Network Error"},
    ];
    const store = mockStore({ loading: false, desserts: [], error: '' });

    await store.dispatch(fetchDesserts());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
