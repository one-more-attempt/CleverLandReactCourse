import axios from "axios";
import { AppDispatch } from ".";
import { employeesDataSlice } from "./reducers/employees-data-slice";
import { serverURL } from "../constants/server-urls";
import type { EmployeeListTypes } from "../types/types";

export const getInitialDataFromServer = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(employeesDataSlice.actions.fetchStart());
    const response = await axios.get<EmployeeListTypes[]>(
      serverURL.allEmployees
    );
    dispatch(employeesDataSlice.actions.fetchSuccess(response.data));
  } catch ({ message }) {
    dispatch(employeesDataSlice.actions.fetchError(message));
  }
};

export const onDeleteItemFromServer =
  (currentItem: EmployeeListTypes) => async (dispatch: AppDispatch) => {
    try {
      dispatch(employeesDataSlice.actions.fetchStart());
      await axios.delete(serverURL.employee(currentItem.id));
      await axios.get(serverURL.allEmployees).then((response) => {
        dispatch(employeesDataSlice.actions.fetchSuccess(response.data));
      });
    } catch ({ message }) {
      dispatch(employeesDataSlice.actions.fetchError(message));
    }
  };

export const onCreateNewItemOnServer =
  (newEmployeeItem: EmployeeListTypes) => async (dispatch: AppDispatch) => {
    try {
      dispatch(employeesDataSlice.actions.fetchStart());
      await axios.post(serverURL.allEmployees, newEmployeeItem);
      await axios.get(serverURL.allEmployees).then((response) => {
        dispatch(employeesDataSlice.actions.fetchSuccess(response.data));
      });
    } catch ({ message }) {
      dispatch(employeesDataSlice.actions.fetchError(message));
    }
  };

export const onChangeSalaryBonusOnServer =
  (currentItem: EmployeeListTypes) => async (dispatch: AppDispatch) => {
    try {
      dispatch(employeesDataSlice.actions.fetchStart());
      await axios.patch(serverURL.employee(currentItem.id), {
        isHaveSalaryBonus: !currentItem.isHaveSalaryBonus,
      });
      await axios.get(serverURL.allEmployees).then((response) => {
        dispatch(employeesDataSlice.actions.fetchSuccess(response.data));
      });
    } catch ({ message }) {
      dispatch(employeesDataSlice.actions.fetchError(message));
    }
  };

export const onChangeRiseStatusOnServer =
  (currentItem: EmployeeListTypes) => async (dispatch: AppDispatch) => {
    try {
      dispatch(employeesDataSlice.actions.fetchStart());
      await axios.patch(serverURL.employee(currentItem.id), {
        onRise: !currentItem.onRise,
      });
      await axios.get(serverURL.allEmployees).then((response) => {
        dispatch(employeesDataSlice.actions.fetchSuccess(response.data));
      });
    } catch ({ message }) {
      dispatch(employeesDataSlice.actions.fetchError(message));
    }
  };

export const onUpdateDataLocalyWhenUseFilter =
  (newDataList: EmployeeListTypes[]) => async (dispatch: AppDispatch) => {
    dispatch(employeesDataSlice.actions.updateLocal(newDataList));
    console.log(newDataList);
    
  };
