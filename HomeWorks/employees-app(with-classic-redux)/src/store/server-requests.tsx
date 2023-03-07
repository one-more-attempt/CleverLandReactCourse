import { Dispatch } from "react";
import axios from "axios";
import type { FetchReducerActionType } from "./fetch-reducer";
import type { EmployeeListTypes } from "../types/types";
import { serverURL } from "../constants/server-urls";
import { fetchStart, fetchError, fetchSuccess } from "../store/actions";

export const onDeleteItemFromServer = async (
  dispatchToReducer: Dispatch<FetchReducerActionType>,
  currentItem: EmployeeListTypes
) => {
  dispatchToReducer(fetchStart());
  try {
    await axios.delete(serverURL.employee(currentItem.id));
    await axios.get(serverURL.allEmployees).then((response) => {
      dispatchToReducer(fetchSuccess(response.data));
    });
  } catch ({ message }) {
    dispatchToReducer(fetchError(message));
  }
};

export const onChangeSalaryBonusOnServer = async (
  dispatchToReducer: Dispatch<FetchReducerActionType>,
  currentItem: EmployeeListTypes
) => {
  dispatchToReducer(fetchStart());
  try {
    await axios.patch(serverURL.employee(currentItem.id), {
      isHaveSalaryBonus: !currentItem.isHaveSalaryBonus,
    });
    await axios.get(serverURL.allEmployees).then((response) => {
      dispatchToReducer(fetchSuccess(response.data));
    });
  } catch ({ message }) {
    dispatchToReducer(fetchError(message));
  }
};

export const onChangeRiseStatusOnServer = async (
  dispatchToReducer: Dispatch<FetchReducerActionType>,
  currentItem: EmployeeListTypes
) => {
  dispatchToReducer(fetchStart());
  try {
    await axios.patch(serverURL.employee(currentItem.id), {
      onRise: !currentItem.onRise,
    });
    await axios.get(serverURL.allEmployees).then((response) => {
      dispatchToReducer(fetchSuccess(response.data));
    });
  } catch ({ message }) {
    dispatchToReducer(fetchError(message));
  }
};

export const getInitialDataFromServer = async (
  dispatchToReducer: Dispatch<FetchReducerActionType>
) => {
  dispatchToReducer(fetchStart());
  try {
    await axios.get(serverURL.allEmployees).then((response) => {
      dispatchToReducer(fetchSuccess(response.data));
    });
  } catch ({ message }) {
    dispatchToReducer(fetchError(message));
  }
};
