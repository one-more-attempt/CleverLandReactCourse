import type { EmployeeListTypes } from "../../types/types";
import "./app-info.css";


type AppInfoProps =  {
  employeesDBState: EmployeeListTypes[];
  employeesDBBackup: EmployeeListTypes[];
}

export const AppInfo = ({ employeesDBState, employeesDBBackup }: AppInfoProps) => {
  const quantityOfAllEmployees = employeesDBBackup.length;
  const quantityOfEmployeesWhoWillBeAwarded = employeesDBBackup.filter(
    ({increase}) => increase === true
  ).length;

  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании:</h1>
      <h2>Общее число сотрудников: {quantityOfAllEmployees}</h2>
      <h2>Премию получат: {quantityOfEmployeesWhoWillBeAwarded}</h2>
    </div>
  );
};
