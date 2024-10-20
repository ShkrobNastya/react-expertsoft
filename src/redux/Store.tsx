import { Reducer } from "./Reducers";
import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = createStore(
  Reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
