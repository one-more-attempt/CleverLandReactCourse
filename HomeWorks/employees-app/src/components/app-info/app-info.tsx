import { Dispatch } from "react";
import type { EmployeeListTypes } from "../../types/types";
import type {
  FetchReducerStateTypes,
  FetchReducerActionType,
} from "../../store/main-page";
import "./app-info.css";

type AppInfoProps = {
  globalState: FetchReducerStateTypes;
  dispatchToReducer: Dispatch<FetchReducerActionType>;
};

export const AppInfo = ({ globalState }: AppInfoProps) => {
  const quantityOfAllEmployees = globalState.employeesDataCopy.length;
  const quantityOfEmployeesWhoWillBeAwarded =
    globalState.employeesDataCopy.filter(
      ({ isHaveSalaryBonus }) => isHaveSalaryBonus === true
    ).length;

  return (
    <div className="app-info">
      <h1>Учет сотрудников в компании:</h1>
      <h2>Общее число сотрудников: {quantityOfAllEmployees}</h2>
      <h2>Премию получат: {quantityOfEmployeesWhoWillBeAwarded}</h2>
    </div>
  );
};
