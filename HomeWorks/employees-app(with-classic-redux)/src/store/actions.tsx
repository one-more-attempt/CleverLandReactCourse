import { FetchReducerActions } from "./action-types";
import type { EmployeeListTypes } from "../types/types";

export const fetchStart = () => ({
  type: FetchReducerActions.FETCH_START,
});

export const fetchSuccess = (inputData: EmployeeListTypes[]) => ({
  type: FetchReducerActions.FETCH_SUCCESS,
  payload: inputData,
});

export const fetchError = (inputData: any) => ({
  type: FetchReducerActions.FETCH_ERROR,
  payload: inputData,
});

export const updateLocal = (inputData: EmployeeListTypes[]) => ({
  type: FetchReducerActions.UPDATE_LOCAL,
  payload: inputData,
});
