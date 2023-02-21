import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import "./app-filter.css";

interface AppFilterProps {
  employeeDB: EmployeeListTypes[];
  setDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  DBBackup: EmployeeListTypes[];
  setDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
}

export const AppFilter = ({
  DBBackup,
  setDBBackup,
  employeeDB,
  setDBState,
}: AppFilterProps) => {
  enum filterState {
    "all",
    "encreased",
    "high",
  }
  const [activeBtn, setActiveBtn] = useState<filterState>(filterState.all);

  const ShowAllEmploees = () => {
    setDBState(DBBackup);
    setActiveBtn(filterState.all);
  };
  const ShowOnlyIncreasedEmployes = () => {
    const newList = DBBackup.filter(({ increase }) => increase === true);
    setDBState(newList);
    setActiveBtn(filterState.encreased);
  };

  const ShowOnlyHighSalary = () => {
    const newList = DBBackup.filter((elem) => elem.salary >= 1000);
    setDBState(newList);
    setActiveBtn(filterState.high);
  };

  return (
    <div className="btn-group">
      <button
        type="button"
        className={`btn ${
          activeBtn === filterState.all ? "btn-light" : "btn-outline-light"
        }      
          `}
        onClick={ShowAllEmploees}
      >
        Все сотрудники
      </button>
      <button
        type="button"
        className={`btn ${
          activeBtn === filterState.encreased
            ? "btn-light"
            : "btn-outline-light"
        }      
          `}
        onClick={ShowOnlyIncreasedEmployes}
      >
        На повышение
      </button>
      <button
        type="button"
        className={`btn ${
          activeBtn === filterState.high ? "btn-light" : "btn-outline-light"
        }      
          `}
        onClick={ShowOnlyHighSalary}
      >
        З/П больше 1000$
      </button>
    </div>
  );
};
