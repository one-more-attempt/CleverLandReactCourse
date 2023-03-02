import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

import classNames from "classnames";
import axios from "axios";

import { serverURL } from "../../constants/server-urls";
import { FetchReducerActions } from "../../enums/fetchReducerActions";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-list-item.css";

import type {
  FetchReducerStateTypes,
  FetchReducerActionType,
} from "../../reducer/reducer";

type EmployeesListItemProps = {
  listItem: EmployeeListTypes;
  globalState: FetchReducerStateTypes;
  dispatchToFetchReducer: Dispatch<FetchReducerActionType>;
};

export const EmployeesListItem = ({
  listItem,
  globalState,
  dispatchToFetchReducer,
}: EmployeesListItemProps) => {
  const giveSalaryBonusToEmployee = () => {
    const ItemToDelete = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );
    if (!ItemToDelete) return;

    dispatchToFetchReducer({ type: FetchReducerActions.FETCH_START });
    axios
      .patch(serverURL.employee(ItemToDelete.id), {
        isHaveSalaryBonus: !listItem.isHaveSalaryBonus,
      })

      .then(() => {
        axios.get(serverURL.allEmployees).then((response) => {
          const dataFromServer = response.data;
          dispatchToFetchReducer({
            type: FetchReducerActions.FETCH_SUCCESS,
            payload: dataFromServer,
          });
        });
      })
      .catch(function (error) {
        const errorMessage: string = error.message;
        dispatchToFetchReducer({
          type: FetchReducerActions.FETCH_ERROR,
          payload: errorMessage,
        });
      });
  };

  const deleteEmployee = () => {
    const ItemToDelete = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );

    if (!ItemToDelete) return;

    dispatchToFetchReducer({ type: FetchReducerActions.FETCH_START });

    axios
      .delete(serverURL.employee(ItemToDelete.id))
      .then(() => {
        axios.get(serverURL.allEmployees).then((response) => {
          const dataFromServer = response.data;
          dispatchToFetchReducer({
            type: FetchReducerActions.FETCH_SUCCESS,
            payload: dataFromServer,
          });
        });
      })
      .catch(function (error) {
        const errorMessage: string = error.message;
        dispatchToFetchReducer({
          type: FetchReducerActions.FETCH_ERROR,
          payload: errorMessage,
        });
      });
  };
  const riseEmployee = () => {
    const ItemToDelete = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );
    if (!ItemToDelete) return;

    dispatchToFetchReducer({ type: FetchReducerActions.FETCH_START });
    axios
      .patch(serverURL.employee(ItemToDelete.id), {
        onRise: !listItem.onRise,
      })

      .then(() => {
        axios.get(serverURL.allEmployees).then((response) => {
          const dataFromServer = response.data;
          dispatchToFetchReducer({
            type: FetchReducerActions.FETCH_SUCCESS,
            payload: dataFromServer,
          });
        });
      })
      .catch(function (error) {
        const errorMessage: string = error.message;
        dispatchToFetchReducer({
          type: FetchReducerActions.FETCH_ERROR,
          payload: errorMessage,
        });
      });
  };

  const itemStyle = classNames(
    "list-group-item d-flex justify-content-between ",
    {
      increase: listItem.isHaveSalaryBonus,
      like: listItem.onRise,
    }
  );

  return (
    <li className={itemStyle}>
      <span className="list-group-item-label" onClick={riseEmployee}>
        {listItem.name}{" "}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={`${listItem.salary}$`}
      />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm "
          onClick={giveSalaryBonusToEmployee}
        >
          <i className="fas fa-cookie"></i>
        </button>

        <button
          type="button"
          className="btn-trash btn-sm "
          onClick={deleteEmployee}
        >
          <i className="fas fa-trash"></i>
        </button>

        <i className="fas fa-star"></i>
      </div>
    </li>
  );
};
