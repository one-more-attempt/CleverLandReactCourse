import { useState } from "react";
import { Dispatch } from "react";
import {
  FetchReducerActionType,
  FetchReducerStateTypes,
} from "../../store/fetch-reducer";
import { updateLocal } from "../../store/actions";
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
    dispatchToReducer(updateLocal(newList));
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
