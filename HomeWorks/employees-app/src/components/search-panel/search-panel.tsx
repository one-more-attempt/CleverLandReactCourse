import "./search-panel.css";
import { EmployeeListTypes } from "../../interfaces/interfaces";
import { useState } from "react";

interface SearchPanelProps {
  employeeDB: EmployeeListTypes[];
  setDBState: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
  DBBackup: EmployeeListTypes[];
  setDBBackup: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
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