import { Component } from "react";
import classNames from "classnames";
import { FilterStates } from "../../enums/filterStates";
import type { EmployeeListTypes } from "../../types/types";
import "./app-filter.css";

type AppFilterProps = {
  employeesDBState: EmployeeListTypes[];
  employeesDBStateCopy: EmployeeListTypes[];
  setEmployeesDBState: (value: EmployeeListTypes[]) => void;
  setEmployeesDBStateCopy: (value: EmployeeListTypes[]) => void;
};

type AppFilterState = {
  activeButton: FilterStates;
};

export class AppFilter extends Component<AppFilterProps, AppFilterState> {
  constructor(props: AppFilterProps) {
    super(props);
    this.state = {
      activeButton: FilterStates.All,
    };
  }
  setActiveButton = (value: FilterStates) => {
    this.setState({ activeButton: value });
  };

  render() {
    const { activeButton } = this.state;
    const { setActiveButton } = this;
    const {
      employeesDBState,
      employeesDBStateCopy,
      setEmployeesDBState,
      setEmployeesDBStateCopy,
    } = this.props;
    const checkButtonStatus = (status: FilterStates) =>
      classNames("btn", {
        "btn-light": activeButton === status,
        "btn-outline-light": activeButton !== status,
      });

    const showAllEmploees = () => {
      setEmployeesDBState(employeesDBStateCopy);
      setActiveButton(FilterStates.All);
    };

    const showEmployeesWhoOnRise = () => {
      const newList = employeesDBStateCopy.filter(
        ({ onRise }) => onRise === true
      );
      setEmployeesDBState(newList);
      setActiveButton(FilterStates.OnlyEncreased);
    };

    const showOnlyHighSalary = () => {
      const newList = employeesDBStateCopy.filter(
        ({ salary }) => salary >= 1000
      );
      setEmployeesDBState(newList);
      setActiveButton(FilterStates.OnlyHigh);
    };

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
          onClick={showEmployeesWhoOnRise}
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
  }
}
