import { employeeInitialState } from "../../constants/employeeInitialState";
import type { EmployeeListTypes } from "../../types/types";
import { FetchReducerActions } from "../action-types";

export type FetchReducerStateTypes = {
  employeesData: EmployeeListTypes[];
  employeesDataCopy: EmployeeListTypes[];
  dataFromServerIsReady: boolean;
  errorMessage: string;
  isDataloading: boolean;
};

export type FetchReducerActionType = {
  type: FetchReducerActions;
  payload?: any;
  // payload?: EmployeeListTypes[] | string
};

export const INITIAL_STATE: FetchReducerStateTypes = {
  employeesData: employeeInitialState,
  employeesDataCopy: employeeInitialState,
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
        dataFromServerIsReady: false,
      };
    case FetchReducerActions.FETCH_SUCCESS:
      return {
        ...state,
        employeesData: action.payload,
        employeesDataCopy: action.payload,
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

    case FetchReducerActions.UPDATE_LOCAL:
      return {
        ...state,
        employeesData: action.payload,
      };
    default:
      return state;
  }
};
