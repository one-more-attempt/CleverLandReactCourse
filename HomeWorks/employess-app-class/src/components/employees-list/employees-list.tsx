import { Component } from "react";
import {EmployeesListItem} from "../employees-list-item/employees-list-item";
import type { EmployeeListTypes } from "../../types/types";
import "./employees-list.css";
type EmployeesListProps = {
  employeesDBState: EmployeeListTypes[];
  setEmployeesDBState: (value: EmployeeListTypes[]) => void;
};

type EmployeesListState = {
  employeesDBState: EmployeeListTypes[];
};

export class EmployeesList extends Component<
  EmployeesListProps,
  EmployeesListState
> {
  constructor(props: EmployeesListProps) {
    super(props);
  }
  render() {
    const { employeesDBState, setEmployeesDBState } = this.props;
    return (
      <ul className="app-list list-group">
        {employeesDBState.map((item) => (
          <EmployeesListItem
            setEmployeesDBState={setEmployeesDBState}
            employeesDBState={employeesDBState}
            listItem={item}
            key={item.id}
          />
        ))}
      </ul>
    );
  }
}


