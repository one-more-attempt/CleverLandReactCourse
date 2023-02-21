import type { EmployeeListTypes } from "../../types/types";
import "./app-info.css";


interface AppInfoProps {
  employeeDB: EmployeeListTypes[];
  DBBackup: EmployeeListTypes[];
}

export const AppInfo = ({ employeeDB, DBBackup }: AppInfoProps) => {
  const employeeCount = DBBackup.length;
  const EmployeeWhoHaveBonus = DBBackup.filter(
    ({increase}) => increase === true
  ).length;

  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании:</h1>
      <h2>Общее число сотрудников: {employeeCount}</h2>
      <h2>Премию получат: {EmployeeWhoHaveBonus}</h2>
    </div>
  );
};
