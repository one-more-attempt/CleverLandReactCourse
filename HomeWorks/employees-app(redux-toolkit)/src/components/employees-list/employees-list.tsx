import { useAppSelector } from "../../store/hooks/redux-hooks";
import { EmployeesListItem } from "../employees-list-item/employees-list-item";
import "./employees-list.css";

export const EmployeesList = () => {
  const globalState = useAppSelector((state) => state.employeesReducer);
  return (
    <ul className="app-list list-group">
      {globalState.employeesData.map((item) => (
        <EmployeesListItem listItem={item} key={item.id} />
      ))}
    </ul>
  );
};
