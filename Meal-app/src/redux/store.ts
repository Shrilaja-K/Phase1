import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 

import { composeWithDevTools } from '@redux-devtools/extension';
import authreducer from './authreducer';
import favreducer from './favreducer'; 
import dessertsreducer from './dessertsreducer';

const rootReducer = combineReducers({
  auth: authreducer,
  favorites: favreducer,
  desserts: dessertsreducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
