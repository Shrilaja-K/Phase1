import {
  FETCH_DESSERTS_REQUEST,
  FETCH_DESSERTS_SUCCESS,
  FETCH_DESSERTS_FAILURE,
} from './dessertsTypes';

const initialState = {
  loading: false,
  desserts: [],
  error: '',
};

const dessertsreducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DESSERTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DESSERTS_SUCCESS:
      return {
        loading: false,
        desserts: action.payload,
        error: '',
      };
    case FETCH_DESSERTS_FAILURE:
      return {
        loading: false,
        desserts: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dessertsreducer;
