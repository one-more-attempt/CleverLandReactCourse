import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import { FilterStates } from "../../enums/filterStates";
import "./app-filter.css";

type AppFilterProps = {
  employeesDBState: EmployeeListTypes[];
  setEmployeesDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  employeesDBBackup: EmployeeListTypes[];
  setEmployeesDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
};

export const AppFilter = ({
  employeesDBBackup,
  setEmployeesDBBackup,
  employeesDBState,
  setEmployeesDBState,
}: AppFilterProps) => {
  const [activeBtn, setActiveBtn] = useState(FilterStates.All);

  const showAllEmploees = () => {
    setEmployeesDBState(employeesDBBackup);
    setActiveBtn(FilterStates.All);
  };
  const showOnlyIncreasedEmployes = () => {
    const newList = employeesDBBackup.filter(
      ({ increase }) => increase === true
    );
    setEmployeesDBState(newList);
    setActiveBtn(FilterStates.OnlyEncreased);
  };

  const showOnlyHighSalary = () => {
    const newList = employeesDBBackup.filter(({ salary }) => salary >= 1000);
    setEmployeesDBState(newList);
    setActiveBtn(FilterStates.OnlyHigh);
  };

  const checkButtonStatus = (status: FilterStates) =>
    classNames("btn", {
      "btn-light": activeBtn === status,
      "btn-outline-light": activeBtn !== status,
    });

  return (
    <div className="btn-group">
      <button
        type="button"
        className={checkButtonStatus(FilterStates.All)}
        onClick={showAllEmploees}
      >
        Все сотрудники
      </button>
      <button
        type="button"
        className={checkButtonStatus(FilterStates.OnlyEncreased)}
        onClick={showOnlyIncreasedEmployes}
      >
        На повышение
      </button>
      <button
        type="button"
        className={checkButtonStatus(FilterStates.OnlyHigh)}
        onClick={showOnlyHighSalary}
      >
        З/П больше 1000$
      </button>
    </div>
  );
};
