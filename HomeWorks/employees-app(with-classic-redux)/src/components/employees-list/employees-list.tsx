import { Dispatch} from "react";
import { EmployeesListItem } from "../employees-list-item/employees-list-item";
import type {
  FetchReducerStateTypes,
  FetchReducerActionType,
} from "../../store/fetch-reducer";

import "./employees-list.css";

type EmployeesListProps = {
  globalState: FetchReducerStateTypes;
  dispatchToReducer: Dispatch<FetchReducerActionType>;
};

export const EmployeesList = ({
  globalState,
  dispatchToReducer,
}: EmployeesListProps) => {
  return (
    <ul className="app-list list-group">
      {globalState.employeesData.map((item) => (
        <EmployeesListItem
          listItem={item}
          key={item.id}
          globalState={globalState}
          dispatchToReducer={dispatchToReducer}
        />
      ))}
    </ul>
  );
};
