import "./app-info.css";
import React from "react";
import { EmployeeListTypes } from "../../interfaces/interfaces";

interface AppInfoProps {
  employeeDB: EmployeeListTypes[];
  DBBackup: EmployeeListTypes[];
}

export const AppInfo = ({ employeeDB, DBBackup }: AppInfoProps) => {
  const employeeCount: number = DBBackup.length;
  const EmployeeWhoHaveBonus: number = DBBackup.filter(
    (elem) => elem.increase === true
  ).length;

  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании:</h1>
      <h2>Общее число сотрудников: {employeeCount}</h2>
      <h2>Премию получат: {EmployeeWhoHaveBonus}</h2>
    </div>
  );
};