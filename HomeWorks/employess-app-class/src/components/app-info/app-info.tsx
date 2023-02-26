import { Component } from "react";
import type { EmployeeListTypes } from "../../types/types";
import "./app-info.css";

type AppInfoProps = {
  employeesDBStateCopy: EmployeeListTypes[];
  setEmployeesDBStateCopy: (value: EmployeeListTypes[]) => void;
};

type AppInfoState = {
  employeesDBState: EmployeeListTypes[];
};

export class AppInfo extends Component<AppInfoProps, AppInfoState> {
  constructor(props: AppInfoProps) {
    super(props);
  }

  render() {
    const { employeesDBStateCopy, setEmployeesDBStateCopy } = this.props;
    const quantityOfAllEmployees = employeesDBStateCopy.length;
    const quantityOfEmployeesWhoWillBeAwarded = employeesDBStateCopy.filter(
      ({ salaryBonus }) => salaryBonus === true
    ).length;

    return (
      <div className="app-info">
        <h1>Учет сотрудников в компании</h1>
        <h2>Общее число сотрудников: {quantityOfAllEmployees}</h2>
        <h2>Премию получат: {quantityOfEmployeesWhoWillBeAwarded}</h2>
      </div>
    );
  }
}
