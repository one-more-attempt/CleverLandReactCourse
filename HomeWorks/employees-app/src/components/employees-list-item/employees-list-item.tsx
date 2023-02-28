import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-list-item.css";

type EmployeesListItemProps = {
  listItem: EmployeeListTypes;
  employeeDB: EmployeeListTypes[];
  setEmployeesDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  setEmployeesDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
};

export const EmployeesListItem = ({
  listItem,
  employeeDB,
  setEmployeesDBState,
  setEmployeesDBBackup,
}: EmployeesListItemProps) => {
  const increaseEmployee = () => {
    const newList: EmployeeListTypes[] = employeeDB.map((elem) => {
      if (elem.id === listItem.id) {
        elem.increase = !elem.increase;
      }
      return elem;
    });

    setEmployeesDBState(newList);
  };

  const deleteEmployee = () => {
    const newList: EmployeeListTypes[] = employeeDB.filter(
      ({ id }) => id !== listItem.id
    );
    setEmployeesDBState(newList);
  };

  const itemStyle = classNames(
    "list-group-item d-flex justify-content-between",
    {
      increase: listItem.increase,
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
          onClick={increaseEmployee}
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
