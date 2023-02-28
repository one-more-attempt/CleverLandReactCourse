import { Dispatch, SetStateAction } from "react";
import { EmployeesListItem } from "../employees-list-item/employees-list-item";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-list.css";

type EmployeesListProps = {
  employeesDBState: EmployeeListTypes[];
  setEmployeesDBState: Dispatch<SetStateAction<EmployeeListTypes[]>>;
  setEmployeesDBBackup: Dispatch<SetStateAction<EmployeeListTypes[]>>;
};

export const EmployeesList = ({
  employeesDBState,
  setEmployeesDBBackup,
  setEmployeesDBState,
}: EmployeesListProps) => {
  return (
    <ul className="app-list list-group">
      {employeesDBState.map((item) => (
        <EmployeesListItem
          setEmployeesDBBackup={setEmployeesDBBackup}
          setEmployeesDBState={setEmployeesDBState}
          employeeDB={employeesDBState}
          listItem={item}
          key={item.id}
        />
      ))}
    </ul>
  );
};
