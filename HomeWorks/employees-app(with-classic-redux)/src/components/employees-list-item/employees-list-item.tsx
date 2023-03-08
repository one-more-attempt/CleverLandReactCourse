import { Dispatch } from "react";

import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import type {
  FetchReducerStateTypes,
  FetchReducerActionType,
} from "../../store/fetch-reducer";
import {
  onDeleteItemFromServer,
  onChangeSalaryBonusOnServer,
  onChangeRiseStatusOnServer,
} from "../../store/server-requests-middleware";

import "./employees-list-item.css";

type EmployeesListItemProps = {
  listItem: EmployeeListTypes;
  globalState: FetchReducerStateTypes;
  dispatchToReducer: Dispatch<FetchReducerActionType>;
};

export const EmployeesListItem = ({
  listItem,
  globalState,
  dispatchToReducer,
}: EmployeesListItemProps) => {
  const giveSalaryBonusToEmployee = () => {
    const ItemToFind = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );
    if (ItemToFind) {
      onChangeSalaryBonusOnServer(dispatchToReducer, ItemToFind);
    }
  };

  const deleteEmployee = () => {
    const ItemToFind = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );
    if (ItemToFind) {
      onDeleteItemFromServer(dispatchToReducer, ItemToFind);
    }
  };

  const riseEmployee = () => {
    const ItemToFind = globalState.employeesData.find(
      ({ id }) => id === listItem.id
    );
    if (ItemToFind) onChangeRiseStatusOnServer(dispatchToReducer, ItemToFind);
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
