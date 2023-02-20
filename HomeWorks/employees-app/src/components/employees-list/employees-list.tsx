import {EmployeesListItem} from "../employees-list-item/employees-list-item";
import "./employees-list.css";
import { EmployeeListTypes } from "../../interfaces/interfaces";

interface EmployeesListProps {
  employeeDB: EmployeeListTypes[];
  setDBState: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
  setDBBackup: React.Dispatch<React.SetStateAction<EmployeeListTypes[]>>;
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
