import type { EmployeeListTypes } from "../../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FetchReducerStateTypes = {
  employeesData: EmployeeListTypes[];
  employeesDataCopy: EmployeeListTypes[];
  dataFromServerIsReady: boolean;
  errorMessage: string;
  isDataloading: boolean;
};

const INITIAL_STATE: FetchReducerStateTypes = {
  employeesData: [],
  employeesDataCopy: [],
  dataFromServerIsReady: false,
  errorMessage: "",
  isDataloading: false,
};

export const employeesDataSlice = createSlice({
  name: "employees",
  initialState: INITIAL_STATE,
  reducers: {
    fetchStart(state) {
      state.isDataloading = true;
      state.dataFromServerIsReady = false;
    },
    fetchSuccess(state, action: PayloadAction<EmployeeListTypes[]>) {
      state.employeesData = action.payload;
      state.employeesDataCopy = action.payload;
      state.dataFromServerIsReady = true;
      state.isDataloading = false;
    },

    fetchError(state, action: PayloadAction<any>) {
      state.errorMessage = action.payload;
      state.isDataloading = false;
      state.dataFromServerIsReady = false;
    },
    updateLocal(state, action: PayloadAction<EmployeeListTypes[]>) {
      state.employeesData = action.payload;
    },
  },
});
export default employeesDataSlice.reducer;
