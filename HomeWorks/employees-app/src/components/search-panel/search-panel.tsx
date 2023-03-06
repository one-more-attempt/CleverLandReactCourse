import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { FetchReducerActions } from "../../store/action-types";
import {
  FetchReducerActionType,
  FetchReducerStateTypes,
} from "../../store/main-page";
import { updadateLocal } from "../../store/main-page/actions";
import type { EmployeeListTypes } from "../../types/types";

import "./search-panel.css";

type SearchPanelProps = {
  globalState: FetchReducerStateTypes;
  dispatchToReducer: Dispatch<FetchReducerActionType>;
};

export const SearchPanel = ({
  globalState,
  dispatchToReducer,
}: SearchPanelProps) => {
  const [inputSearchParam, setInputSearchParam] = useState("");

  const findEmployee = (event: React.FormEvent<HTMLInputElement>) => {
    const currentParam: string = event.currentTarget.value;
    setInputSearchParam(currentParam);
    const newList = globalState.employeesDataCopy.filter(({ name }) =>
      name.toLocaleLowerCase().includes(currentParam.toLowerCase())
    );
    dispatchToReducer(updadateLocal(newList));
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
