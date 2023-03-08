import { Dispatch } from "react";
import { Action, createStore, applyMiddleware } from "redux";
import { fetchReducer } from "./fetch-reducer";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { FetchReducerStateTypes } from "./fetch-reducer";
export interface DispatchAction extends Action {
  payload: Partial<FetchReducerStateTypes>;
}
export type AppDispatch = Dispatch<any>;
export const useTypedSelector: TypedUseSelectorHook<FetchReducerStateTypes> =
  useSelector;
export const useTypedDispatch: () => AppDispatch = useDispatch;

export const store = createStore(
  fetchReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const dispatchToStore = store.dispatch;
