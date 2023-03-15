import { Dispatch } from "react";
import { useState } from "react";
import classNames from "classnames";
import { FetchReducerStateTypes } from "../../store/reducers/employees-data-slice";
import { FilterStates } from "../../enums/filterStates";
import "./app-filter.css";
import { onUpdateDataLocalyWhenUseFilter } from "../../store/server-requests-dispatch";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";

export const AppFilter = () => {
  const [activeBtn, setActiveBtn] = useState(FilterStates.All);
  const globalState = useAppSelector((state) => state.employeesReducer);
  const dispatch = useAppDispatch();

  const showAllEmploees = () => {
    dispatch(
      onUpdateDataLocalyWhenUseFilter(globalState.employeesDataCopy)
    );
    setActiveBtn(FilterStates.All);
  };

  const showOnlyIncreasedEmployes = () => {
    const newList = globalState.employeesDataCopy.filter(
      ({ isHaveSalaryBonus }) => isHaveSalaryBonus === true
    );
    dispatch(onUpdateDataLocalyWhenUseFilter(newList));
    setActiveBtn(FilterStates.OnlyEncreased);
  };

  const showOnlyHighSalary = () => {
    const newList = globalState.employeesDataCopy.filter(
      ({ salary }) => salary >= 1000
    );
    dispatch(onUpdateDataLocalyWhenUseFilter(newList));
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
