import { useAppSelector } from "../../store/hooks/redux-hooks";
import "./app-info.css";

export const AppInfo = () => {
  const globalState = useAppSelector((state) => state.employeesReducer);
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
