import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { FetchReducerActions } from "../../enums/fetchReducerActions";
import {
  FetchReducerActionType,
  FetchReducerStateTypes,
} from "../../reducer/reducer";
import type { EmployeeListTypes } from "../../types/types";
import "./search-panel.css";

type SearchPanelProps = {
  globalState: FetchReducerStateTypes;
  dispatchToFetchReducer: Dispatch<FetchReducerActionType>;
};

export const SearchPanel = ({
  globalState,
  dispatchToFetchReducer,
}: SearchPanelProps) => {
  const [inputSearchParam, setInputSearchParam] = useState("");

  const findEmployee = (event: React.FormEvent<HTMLInputElement>) => {
    const currentParam: string = event.currentTarget.value;
    setInputSearchParam(currentParam);
    const newList = globalState.employeesDataCopy.filter(({ name }) =>
      name.toLocaleLowerCase().includes(currentParam.toLowerCase())
    );
    dispatchToFetchReducer({
      type: FetchReducerActions.UPDATE_LOCAL,
      payload: newList,
    });
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Найти сотрудника"
      value={inputSearchParam}
      onChange={findEmployee}
    />
  );
};
