import { createStore } from "redux";
import { fetchReducer } from "./fetch-reducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = createStore(fetchReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
type DispatchFunc = () => AppDispatch;

export const useTypedDispatch: DispatchFunc = useDispatch;
export const useTypedAppSelector: TypedUseSelectorHook<RootState> = useSelector;
