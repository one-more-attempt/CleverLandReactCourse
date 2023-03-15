import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks/redux-hooks";
import { employeesDataSlice } from "../../store/reducers/employees-data-slice";
import "./search-panel.css";

export const SearchPanel = () => {
  const globalState = useAppSelector((state) => state.employeesReducer);
  const dispatch = useAppDispatch();
  const [inputSearchParam, setInputSearchParam] = useState("");

  const findEmployee = (event: React.FormEvent<HTMLInputElement>) => {
    const currentParam: string = event.currentTarget.value;
    setInputSearchParam(currentParam);
    const newList = globalState.employeesDataCopy.filter(({ name }) =>
      name.toLocaleLowerCase().includes(currentParam.toLowerCase())
    );
    dispatch(employeesDataSlice.actions.updateLocal(newList));
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
