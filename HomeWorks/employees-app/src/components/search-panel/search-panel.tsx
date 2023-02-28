import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import type { EmployeeListTypes } from "../../types/types";
import "./search-panel.css";

type SearchPanelProps = {
  employeesDBState: EmployeeListTypes[];
  setEmployeesDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  employeesDBBackup: EmployeeListTypes[];
  setEmployeesDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
};

export const SearchPanel = ({
  employeesDBState,
  setEmployeesDBBackup,
  employeesDBBackup,
  setEmployeesDBState,
}: SearchPanelProps) => {
  const [inputSearchParam, setInputSearchParam] = useState("");

  const findEmployee = (event: React.FormEvent<HTMLInputElement>) => {
    const currentParam: string = event.currentTarget.value;
    setInputSearchParam(currentParam);
    const newList = employeesDBBackup.filter(({ name }) =>
      name.toLocaleLowerCase().includes(currentParam.toLowerCase())
    );
    setEmployeesDBState(newList);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Найти сотрудника"
      value={inputSearchParam}
      onChange={findEmployee}
    />
  );
};
