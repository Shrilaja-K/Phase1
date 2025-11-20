import {
  FETCH_DESSERTS_REQUEST,
  FETCH_DESSERTS_SUCCESS,
  FETCH_DESSERTS_FAILURE,
} from './dessertsTypes';

export const fetchDessertsRequest = () => ({
  type: FETCH_DESSERTS_REQUEST,
});

export const fetchDessertsSuccess = (desserts) => ({
  type: FETCH_DESSERTS_SUCCESS,
  payload: desserts,
});

export const fetchDessertsFailure = (error) => ({
  type: FETCH_DESSERTS_FAILURE,
  payload: error,
});


export const fetchDesserts = () => {
  return async (dispatch, getState) => {
    const state = getState();
   
    dispatch(fetchDessertsRequest());
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
      const data = await response.json();
      const desserts = data.meals || [];
      dispatch(fetchDessertsSuccess(desserts));
    } catch (error) {
      dispatch(fetchDessertsFailure(error.message));
    }
  };
};
