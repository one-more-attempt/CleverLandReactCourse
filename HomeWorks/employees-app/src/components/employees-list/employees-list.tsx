import { Dispatch, SetStateAction } from "react";
import { EmployeesListItem } from "../employees-list-item/employees-list-item";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-list.css";

interface EmployeesListProps {
  employeeDB: EmployeeListTypes[];
  setDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  setDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
}

export const EmployeesList = ({
  employeeDB,
  setDBBackup,
  setDBState,
}: EmployeesListProps) => {
  console.log(employeeDB);

  return (
    <ul className="app-list list-group">
      {employeeDB.map((item) => {
        return (
          <EmployeesListItem
            setDBBackup={setDBBackup}
            setDBState={setDBState}
            employeeDB={employeeDB}
            listItem={item}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};
