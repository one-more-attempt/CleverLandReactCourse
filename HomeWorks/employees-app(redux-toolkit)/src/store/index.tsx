import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./reducers/employees-data-slice";

const rootReducer = combineReducers({
  employeesReducer,
});

export const setupStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
