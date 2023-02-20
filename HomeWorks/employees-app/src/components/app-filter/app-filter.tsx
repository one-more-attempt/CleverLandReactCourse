import "./app-filter.css";
import { EmployeeListTypes } from "../../interfaces/interfaces";
import classNames from "classnames";
import { useState } from "react";
import React from "react";

interface AppFilterProps {
  employeeDB: EmployeeListTypes[];
  setDBState: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
  DBBackup: EmployeeListTypes[];
  setDBBackup: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
}

export const AppFilter = ({
  DBBackup,
  setDBBackup,
  employeeDB,
  setDBState,
}: AppFilterProps) => {
  const [activeBtn, setActiveBtn] = useState<string>("all");

  const ShowAllEmploees = () => {
    const newList = DBBackup;
    setDBState(newList);
    setActiveBtn("all");
  };
  const ShowOnlyIncreasedEmployes = () => {
    const newList = DBBackup.filter((elem) => elem.increase === true);
    console.log(DBBackup);
    setDBState(newList);
    setActiveBtn("encreased");
  };

  const ShowOnlyHighSalary = () => {
    const newList = DBBackup.filter((elem) => elem.salary >= 1000);
    setDBState(newList);
    setActiveBtn("high");
  };

  return (
    <div className="btn-group">
      <button
        type="button"
        className={
          activeBtn === "all" ? `btn btn-light` : `btn btn-outline-light`
        }
        onClick={ShowAllEmploees}
      >
        Все сотрудники
      </button>
      <button
        type="button"
        className={
          activeBtn === "encreased" ? `btn btn-light` : `btn btn-outline-light`
        }
        onClick={ShowOnlyIncreasedEmployes}
      >
        На повышение
      </button>
      <button
        type="button"
        className={
          activeBtn === "high" ? `btn btn-light` : `btn btn-outline-light`
        }
        onClick={ShowOnlyHighSalary}
      >
        З/П больше 1000$
      </button>
    </div>
  );
};
