import { employeeDB as employeeMockedinitialState } from "../constants/employeeDB";
import type { EmployeeListTypes } from "../types/types";
import { FetchReducerActions } from "../enums/fetchReducerActions";

type FetchReducerStateTypes = {
  employeesData: EmployeeListTypes[];
  dataFromServerIsReady: boolean;
  errorMessage: string;
  isDataloading: boolean;
};

type FetchReducerActionType = {
  type: FetchReducerActions;
  payload?: any;
  // payload?: EmployeeListTypes[] | string 
};

export const INITIAL_STATE = {
  employeesData: employeeMockedinitialState,
  dataFromServerIsReady: false,
  errorMessage: "",
  isDataloading: false,
};

export const fetchReducer = (
  state: FetchReducerStateTypes,
  action: FetchReducerActionType
) => {
  switch (action.type) {
    case FetchReducerActions.FETCH_START:
      return {
        ...state,
        isDataloading: true,
      };
    case FetchReducerActions.FETCH_SUCCESS:
      return {
        ...state,
        employeesData: action.payload,
        dataFromServerIsReady: true,
        isDataloading: false,
      };
    case FetchReducerActions.FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        isDataloading: false,
        dataFromServerIsReady: false,
      };
    default:
      return state;
  }
};
