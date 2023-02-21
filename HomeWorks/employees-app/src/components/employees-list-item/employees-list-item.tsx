import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-list-item.css";

interface EmployeesListItemProps {
  listItem: EmployeeListTypes;
  employeeDB: EmployeeListTypes[];
  setDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  setDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
}

export const EmployeesListItem = ({
  listItem,
  employeeDB,
  setDBState,
  setDBBackup,
}: EmployeesListItemProps) => {
  const increaseHandler = () => {
    const newList: EmployeeListTypes[] = employeeDB.map((elem) => {
      if (elem.id === listItem.id) {
        elem.increase = !elem.increase;
      }
      return elem;
    });

    setDBState(newList);
  };

  const deleteItemHandler = () => {
    console.log(`delete`);
    const newList: EmployeeListTypes[] = employeeDB.filter(
      (elem) => elem.id !== listItem.id
    );
    setDBState(newList);
  };

  const itemStyle = classNames(
    "list-group-item d-flex justify-content-between",
    {
      increase: listItem.increase === true,
    }
  );

  return (
    <li className={itemStyle}>
      <span className="list-group-item-label">{listItem.name}</span>
      <input
        type="text"
        className="list-group-item-input"
        defaultValue={`${listItem.salary}$`}
      />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm "
          onClick={increaseHandler}
        >
          <i className="fas fa-cookie"></i>
        </button>

        <button
          type="button"
          className="btn-trash btn-sm "
          onClick={deleteItemHandler}
        >
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>
    </li>
  );
};
