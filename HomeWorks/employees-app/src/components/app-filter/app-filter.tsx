import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import classNames from "classnames";
import type { EmployeeListTypes } from "../../types/types";
import { FetchReducerActions } from "../../enums/fetchReducerActions";
import {
  FetchReducerActionType,
  FetchReducerStateTypes,
} from "../../reducer/reducer";
import { FilterStates } from "../../enums/filterStates";
import "./app-filter.css";

type AppFilterProps = {
  globalState: FetchReducerStateTypes;
  dispatchToFetchReducer: Dispatch<FetchReducerActionType>;
};

export const AppFilter = ({
  globalState,
  dispatchToFetchReducer,
}: AppFilterProps) => {
  const [activeBtn, setActiveBtn] = useState(FilterStates.All);

  const showAllEmploees = () => {
    dispatchToFetchReducer({
      type: FetchReducerActions.UPDATE_LOCAL,
      payload: globalState.employeesDataCopy,
    });
    setActiveBtn(FilterStates.All);
  };

  const showOnlyIncreasedEmployes = () => {
    const newList = globalState.employeesDataCopy.filter(
      ({ isHaveSalaryBonus }) => isHaveSalaryBonus === true
    );
    dispatchToFetchReducer({
      type: FetchReducerActions.UPDATE_LOCAL,
      payload: newList,
    });
    setActiveBtn(FilterStates.OnlyEncreased);
  };

  const showOnlyHighSalary = () => {
    const newList = globalState.employeesDataCopy.filter(
      ({ salary }) => salary >= 1000
    );
    dispatchToFetchReducer({
      type: FetchReducerActions.UPDATE_LOCAL,
      payload: newList,
    });
    setActiveBtn(FilterStates.OnlyHigh);
  };

  const checkButtonStatus = (status: FilterStates) =>
    classNames("btn", {
      "btn-light": activeBtn === status,
      "btn-outline-light": activeBtn !== status,
    });

  return (
    <div className="btn-group">
      <button
        type="button"
        className={checkButtonStatus(FilterStates.All)}
        onClick={showAllEmploees}
      >
        Все сотрудники
      </button>
      <button
        type="button"
        className={checkButtonStatus(FilterStates.OnlyEncreased)}
        onClick={showOnlyIncreasedEmployes}
      >
        На повышение
      </button>
      <button
        type="button"
        className={checkButtonStatus(FilterStates.OnlyHigh)}
        onClick={showOnlyHighSalary}
      >
        З/П больше 1000$
      </button>
    </div>
  );
};
