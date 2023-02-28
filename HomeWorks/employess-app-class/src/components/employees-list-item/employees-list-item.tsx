import { Component } from "react";
import "./employees-list-item.css";
import type { EmployeeListTypes } from "../../types/types";
import classNames from "classnames";

type EmployeesListItemProps = {
  employeesDBState: EmployeeListTypes[];
  listItem: EmployeeListTypes;
  setEmployeesDBState: (value: any) => any;
};

type EmployeesListItemState = {
  employeesDBState: EmployeeListTypes[];
};

export class EmployeesListItem extends Component<EmployeesListItemProps, any> {
  constructor(props: EmployeesListItemProps) {
    super(props);
  }

  render() {
    const { setEmployeesDBState, employeesDBState } = this.props;
    const { id, name, salaryBonus, salary, onRise } = this.props.listItem;
    const listItem = this.props.listItem;

    const itemStyle = classNames(
      "list-group-item d-flex justify-content-between ",
      {
        increase: salaryBonus,
        like: onRise,
      }
    );

    const riseCurrentEmployee = () => {
      const newList = employeesDBState.map((elem) => {
        if (elem.id === listItem.id) {
          elem.onRise = !elem.onRise;
        }
        return elem;
      });
      setEmployeesDBState(newList);
    };

    const giveSalaryBonusToCurrentEmployee = () => {
      const newList = employeesDBState.map((elem) => {
        if (elem.id === listItem.id) {
          elem.salaryBonus = !elem.salaryBonus;
        }
        return elem;
      });

      setEmployeesDBState(newList);
    };

    const deleteCurrentEmployee = () => {
      const newList = employeesDBState.filter(
        (elem) => elem.id !== listItem.id
      );
      setEmployeesDBState(newList);
    };

    return (
      <li className={itemStyle}>
        <span className="list-group-item-label" onClick={riseCurrentEmployee}>
          {name}
        </span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={`${salary} $`}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-cookie btn-sm "
            onClick={giveSalaryBonusToCurrentEmployee}
          >
            <i className="fas fa-cookie"></i>
          </button>

          <button
            type="button"
            className="btn-trash btn-sm "
            onClick={deleteCurrentEmployee}
          >
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    );
  }
}
