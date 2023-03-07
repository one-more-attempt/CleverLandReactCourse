import { createStore, compose } from "redux";
import { fetchReducer } from "./fetch-reducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(fetchReducer, composeWithDevTools());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
type DispatchFunc = () => AppDispatch;

export const useTypedDispatch: DispatchFunc = useDispatch;
export const useTypedAppSelector: TypedUseSelectorHook<RootState> = useSelector;
