import { Dispatch } from "react";
import { useState } from "react";
import classNames from "classnames";

import {
  FetchReducerActionType,
  FetchReducerStateTypes,
} from "../../store/fetch-reducer";
import { FilterStates } from "../../enums/filterStates";
import { updateLocal } from "../../store/actions";

import "./app-filter.css";

type AppFilterProps = {
  globalState: FetchReducerStateTypes;
  dispatchToReducer: Dispatch<FetchReducerActionType>;
};

export const AppFilter = ({
  globalState,
  dispatchToReducer,
}: AppFilterProps) => {
  const [activeBtn, setActiveBtn] = useState(FilterStates.All);

  const showAllEmploees = () => {
    dispatchToReducer(updateLocal(globalState.employeesDataCopy));
    setActiveBtn(FilterStates.All);
  };

  const showOnlyIncreasedEmployes = () => {
    const newList = globalState.employeesDataCopy.filter(
      ({ isHaveSalaryBonus }) => isHaveSalaryBonus === true
    );
    dispatchToReducer(updateLocal(newList));
    setActiveBtn(FilterStates.OnlyEncreased);
  };

  const showOnlyHighSalary = () => {
    const newList = globalState.employeesDataCopy.filter(
      ({ salary }) => salary >= 1000
    );
    dispatchToReducer(updateLocal(newList));
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
