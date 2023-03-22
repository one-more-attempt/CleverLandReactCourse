import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { randomCharSliceReducer } from "./slices/randomCharSlice";

const rootReducer = combineReducers({
  randomCharSliceReducer,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export * as stateSelectors from './selectors'