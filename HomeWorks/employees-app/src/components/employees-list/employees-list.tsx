import { Dispatch, SetStateAction } from "react";
import { EmployeesListItem } from "../employees-list-item/employees-list-item";
import type { EmployeeListTypes } from "../../types/types";
import type {
  FetchReducerStateTypes,
  FetchReducerActionType,
} from "../../reducer/reducer";

import "./employees-list.css";

type EmployeesListProps = {
  globalState: FetchReducerStateTypes;
  dispatchToFetchReducer: Dispatch<FetchReducerActionType>;
};

export const EmployeesList = ({
  globalState,
  dispatchToFetchReducer,
}: EmployeesListProps) => {
  return (
    <ul className="app-list list-group">
      {globalState.employeesData.map((item) => (
        <EmployeesListItem
          listItem={item}
          key={item.id}
          globalState={globalState}
          dispatchToFetchReducer={dispatchToFetchReducer}
        />
      ))}
    </ul>
  );
};
