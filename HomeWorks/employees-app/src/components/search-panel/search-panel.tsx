import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import type { EmployeeListTypes } from "../../types/types";
import "./search-panel.css";

interface SearchPanelProps {
  employeeDB: EmployeeListTypes[];
  setDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  DBBackup: EmployeeListTypes[];
  setDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
}

export const SearchPanel = ({
  employeeDB,
  setDBBackup,
  DBBackup,
  setDBState,
}: SearchPanelProps) => {
  const [inputSearchParam, setInputSearchParam] = useState<string>("");

  const searchHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const currentParam: string = event.currentTarget.value;
    setInputSearchParam(currentParam);
    const newList = DBBackup.filter((elem) =>
      elem.name.toLocaleLowerCase().includes(currentParam.toLowerCase())
    );
    setDBState(newList);
    console.log(newList);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Найти сотрудника"
      value={inputSearchParam}
      onChange={searchHandler}
    />
  );
};
